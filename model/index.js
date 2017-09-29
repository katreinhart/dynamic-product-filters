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

    // this.allFields = this.detectFields()
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
          ]
        }
      }
    }

    v.addSchema(productsSchema, '/productsSchema')
    v.addSchema(this.schema, '/singleProduct')
    this.validatorResult = v.validate(this.data, productsSchema)
    return this.validatorResult
  }

  detectFields () {
    if((!this.schema) || (!this.data)) {
      throw new Error('Please provide data and schema')
    } else {
      this.validateData()
      if (this.validatorResult.errors.length > 0) {
        throw new Error(this.validatorResult.throwError)
      } else {
        const standardFields = Object.keys(this.schema.properties)
        const customFields = []

        for(let i=0; i < this.data.length; i++) {
          const hasFields = Object.keys(this.data[i])
          for(let j=0; j<hasFields.length; j++) {
            let field = hasFields[j]
            if(!standardFields.includes(field)) {
              if(!customFields.includes(field)) {
                customFields.push(field)
              }
            }
          }
        }

        return standardFields.concat(customFields)
      }
      return standardFields.concat(customFields)
    }
  }
}

module.exports = DynamicFilter
