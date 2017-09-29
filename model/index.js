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
    this.allFields = this.detectFields()
  }

  detectFields () {
    const standardFields = Object.keys(this.schema.properties)
    // console.log(standardFields)
    const customFields = []

    for(let i=0; i < this.data.products.length; i++) {
      const hasFields = Object.keys(this.data.products[i])
      // console.log(hasFields)
      for(let j=0; j<hasFields.length; j++) {
        let field = hasFields[j]
        if(!standardFields.includes(field)) {
            if(!customFields.includes(field)) {
              customFields.push(field)
            }
          }
        }

        return standardFields.concat(customFields)
      }
    }
    validate () {
      const productsSchema = {
        "$schema": "http://json-schema.org/schema#",
        "id": "/productsSchema",
        "type": "object",
        "properties": {
          "products": {
            "type": "array",
            "items" : [
                {"$ref": "/singleProductSchema"}
            ]
          }
        }
      }
      const v = new Validator()

      v.addSchema(productsSchema, '/productschema')
      v.addSchema(this.schema, '/singleProductSchema')

      return v.validate(this.data, productsSchema)
    }

}

module.exports = DynamicFilter
