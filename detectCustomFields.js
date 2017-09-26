// const customProductSchema = require ('./model/validator')
// const productData = require('./data/products.json')

function detectAllFields (schema, data) {
    // compare data to existing schema
    const standardFields = Object.keys(schema.customProduct.properties)
    console.log(standardFields)

    const customFields = []

    // for each product in the array
    // this is going to run at O(m * n) where m is the number of products & n is the number of fields.
    // this could probably be optimized. Thoughts: Do we need to check every product, or do random sample?
    // data.products.forEach(item => {
    //   const hasFields = Object.keys(item)
    //   console.log(hasFields)
    //   hasFields.forEach(field => {
    //     if(!standardFields.includes(field)){
    //       if(!customFields.includes(field)){
    //         customFields.push(field)
    //       }
    //     }
    //   })
    // })
    // console.log("data:", data)
    // console.log("schema:", schema)
    // console.log(Object.keys(data.properties))

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

    console.log(customFields)

    return standardFields.concat(customFields)
}
// console.log(customProduct)
// detectCustomFields(customProductSchema, productData)
module.exports = detectAllFields
