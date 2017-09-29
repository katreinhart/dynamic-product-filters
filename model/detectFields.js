
function detectFields (schema, data) {
  if((!schema) || (!data)) {
    throw new Error('Please provide valid data')
  } else {
    console.log(schema)
    const standardFields = Object.keys(schema.productsSchema.properties)
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

}

module.exports = detectFields
