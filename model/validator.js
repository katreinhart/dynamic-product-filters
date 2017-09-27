const Validator = require('jsonschema').Validator
const v = new Validator()

const products = require('../data/products.json')
var customProduct = require('./product.schema.json')

var productSchema = {
  "$schema": "http://json-schema.org/schema#",
  "id": "/productSchema",
  "type": "object",
  "properties": {
    "products": {
      "type": "array",
      "items" : [
          {"$ref": "/customProduct"}
      ]
    }
  }
}

v.addSchema(productSchema, '/productSchema')
v.addSchema(customProduct, '/customProduct')
// console.log(v.validate(products, productSchema))

module.exports = {
  customProduct: customProduct
}
