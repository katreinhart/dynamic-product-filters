
function detectAllFields (schema, data) {
    const standardFields = Object.keys(schema.customProduct.properties)
    const customFields = []

    for(let i=0; i < data.length; i++) {
      const hasFields = Object.keys(data[i])
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

module.exports = detectAllFields
