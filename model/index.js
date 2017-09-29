const Validator = require('jsonschema').Validator

class DynamicFilter {
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

  validateData () {
    const v = new Validator()

    v.addSchema(productsSchema, '/productsSchema')
    v.addSchema(singleProduct, '/singleProduct')
    this.validatorResult = v.validate(this.data, this.schema)
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
      }
      return standardFields.concat(customFields)
    }
  }
}

module.exports = DynamicFilter
