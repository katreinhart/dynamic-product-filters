const Validator = require('jsonschema').Validator
const v = new Validator()

const products = require('../data/products.json')
const productsSchema = require('./product.schema.json')

// const productsSchema = {
//   "$schema": "http://json-schema.org/schema#",
//   "id": "/productsSchema",
//   "type": "object",
//   "properties": {
//     "products": {
//       "type": "array",
//       "items" : [
//           {"$ref": "/singleProduct"}
//       ]
//     }
//   }
// }

v.addSchema(productsSchema, '/productsSchema')
// v.addSchema(singleProduct, '/singleProduct')
console.log(v.validate(products, productsSchema))

module.exports = {
  productsSchema: productsSchema
}
