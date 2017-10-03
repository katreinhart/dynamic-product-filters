const Validator = require('jsonschema').Validator

class DynamicFilter {
  // Schema is the JSONSchema for the individual product.
  // This gets plugged into a generic products object schema.
  constructor(schema, data, exclude, buckets) {
    if(!schema || !data) {
      throw new Error('Please provide schema and data')
    }
    this.schema = schema
    this.data = data
    if(exclude) {
      this.exclude = exclude
    } else {
      this.exclude = [ 'id'
                     , 'name'
                     , 'description'
                     , 'image'
                     ]
    }
    if((buckets) && !Number.isInteger(buckets)) {
      throw new Error('Please provide a number of price buckets')
    } else if ((buckets > 10) || (buckets < 2)) {
      throw new Error('Please provide a number between 3 and 10')
    } else if (buckets) {
      this.priceBuckets = buckets
    } else {
      this.priceBuckets = 4
    }
  }

  validateData () {
    const v = new Validator()

    const productsSchema = {  "$schema": "http://json-schema.org/schema#"
                            , "id": "/productsSchema"
                            , "type": "object"
                            , "properties": {
                              "products": {  "type": "array"
                                          ,   "items" : [
                                                        { "$ref": "/singleProduct" }
                                                        ]
                                          , "required": true
                              }
                            }
                          }

    v.addSchema(productsSchema, '/productsSchema') // schema for products object
    v.addSchema(this.schema, '/singleProduct')     // schema for individual product
    this.validatorResult = v.validate(this.data, productsSchema)
    if(this.validatorResult.errors.length > 0) {
      this.valid = false
      throw new Error("Validator failed: ", this.validatorResult.errors)
    } else {
      this.valid = true
      return this.validatorResult
    }
  }

  detectFields () {
    this.validateData()
    if (this.validatorResult.errors.length > 0) {
      throw new Error("Errors were found: ", this.validatorResult.errors)
    } else {
      this.standardFields = Object.keys(this.schema.properties)
      this.customFields = []

      for(let i=0; i < this.data.products.length; i++) {
        const hasFields = Object.keys(this.data.products[i])
        for(let j=0; j<hasFields.length; j++) {
          let field = hasFields[j]
          if(!this.standardFields.includes(field)) {
            if(!this.customFields.includes(field)) {
              this.customFields.push(field)
            }
          }
        }
      }
      return this.standardFields.concat(this.customFields)
    }
  }

  generateFilters() {
    this.allFields = this.detectFields()
    this.filterKeys = this.allFields.filter(field => {
      return (!this.exclude.includes(field))
    })

    const tempFilterObject = {}
    this.filterObject = {}

    const _this = this

    this.filterKeys.forEach(function(key) {
      tempFilterObject[key] = []
      _this.data.products.forEach(item => {
        if (!tempFilterObject[key].includes(item[key])) {
          // if it isn't already in there, push it in there
          tempFilterObject[key].push(item[key])
        }
      })
    })
    this.filterKeys.forEach(function(key) {
      if (tempFilterObject[key].length < 2) {
        // don't display filters with 0 or 1 options
        _this.exclude.push(key)
      }
    })

    this.filterKeys = this.filterKeys.filter(key => !this.exclude.includes(key))

    this.filterKeys.forEach(function (key) {
      _this.filterObject[key] = tempFilterObject[key]
      if(key === 'price') {
        _this.generatePriceBuckets()
      }
      if(key === 'tags') {
        _this.generateTagList()
      }
    })
    return this.filterKeys
  }

  // helper function
  roundUpToNearest(roundTo, number) {
    return (Math.ceil(number/roundTo) * roundTo)
  }

  generatePriceBuckets () {
    // Generates the different options for sorting by price.
    // take the number of buckets indicated and generate buckets
    // (under X, X to Y, Y to Z, over Z)

    // Determine min and max values for individual prices.
    let min = Infinity
    let max = 0 // assumed no prices will have zero or negative values
    this.data.products.forEach(item => {
      if(parseFloat(item.price) < min) {
        min = parseFloat(item.price)
      }
      if(parseFloat(item.price) > max) {
        max = parseFloat(item.price)
      }
    })

    // create new array to hold the "buckets", i.e. the dividing values.
    // This array is scoped to this generating function, as it is not necessary
    // once the price object is created.

    const buckets = []
    let roundTo
    let n = this.priceBuckets // number of buckets to divide prices into

    switch(n) {
      // These are somewhat arbitrary; however it is assumed that if you have more buckets
      // you will want more granularity, i.e. smaller buckets.
      case 3: case 4: case 5:
        roundTo = 25; break
      case 6: case 7: case 8:
        roundTo = 10; break
      case 9: case 10:
        roundTo = 5;  break
    }

    buckets[0] = this.roundUpToNearest(roundTo, Math.floor(parseFloat(min)))

    for (let i=1; i < n - 1; i++) {
      buckets[i] = this.roundUpToNearest(roundTo,
          Math.floor((parseFloat(max) + parseFloat(min)) * (i + 1)
          / n ))
    }

    buckets[n - 1] = this.roundUpToNearest(roundTo, parseFloat(max))

    // this.filterObject.price will be the object exposed in the API.
    // It is itself an array of objects. Each object in the array has a label,
    // which will be displayed in the list, and a "bucket",
    // which is an array of two numbers, the min and max price.

    this.filterObject.price = []
    this.filterObject.price[0] = {
                                     "label": `Under \$${buckets[0]}`
                                  ,  "bucket": [0, buckets[0]]
                                  }
    for(let i=1; i < n - 1; i++) {
      this.filterObject.price[i] = {
                                      "label": `\$${buckets[i-1]} to \$${buckets[i]}`
                                    , "bucket": [buckets[i-1], buckets[i]]
                                    }
    }
    this.filterObject.price[n - 1] = {
                                        "label": `Over \$${buckets[n - 2]}`
                                      , "bucket": [buckets[n - 2], buckets[n - 1]]
                                      }
  }

  generateTagList() {
    const tagList = []
    this.data.products.forEach(item => {
      item.tags.forEach(tag => {
        if(!tagList.includes(tag)) {
          tagList.push(tag)
        }
      })
    })
    this.filterObject.tags = tagList
  }

  getFilters() {
    if(!this.filterObject) {
      // if generateFilters has not been run yet, run it
      this.generateFilters()
    }
    // return the object
    return this.filterObject
  }
}

module.exports = DynamicFilter
