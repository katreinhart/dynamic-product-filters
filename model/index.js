const Validator = require('jsonschema').Validator

class DynamicFilter {
  // Schema is the JSONSchema for the individual product. This gets plugged into a generic
  // products object schema.
  constructor(schema, data, exclude) {
    if(!schema || !data) {
      throw new Error('Please provide schema and data')
    }
    this.schema = schema
    this.data = data
    if(exclude) {
      this.exclude = exclude
    } else {
      this.exclude = ['id', 'name', 'description', 'image']
    }
  }

  validateData () {
    const v = new Validator()

    const productsSchema = {
      "$schema": "http://json-schema.org/schema#",
      "id": "/productsSchema",
      "type": "object",
      "properties": {
        "products": {
          "type": "array",
          "items" : [
              {"$ref": "/singleProduct"}
          ],
          "required": true
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

      for(let i=0; i < this.data.length; i++) {
        const hasFields = Object.keys(this.data[i])
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
    return this.filterKeys
  }

  filters() {
    this.generateFilters()
    const filterObject = {}
    this.filterKeys.forEach(function(filter) {
      filterObject[filter] = ""
    })
    return filterObject
  }
}

module.exports = DynamicFilter
