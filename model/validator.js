const Validator = require('jsonschema').Validator
const v = new Validator()

// const productSchema = require('./products.schema.json')
const products = require('../data/products.json')

var customProduct = {
  "id": "/customProduct",
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "required": true,
    },
    "name": {
      "type": "string",
      "required": true
    },
    "price": {
      "type": "string",
      "required": true
    },
    "description": {
      "type": "string"
    },
    "size": {
      "type": "string"
    },
    "color": {
      "type": "string"
    },
    "brand": {
      "type": "string"
    },
    "tags":  {
      "type": "array",
      "items": [
        {
          "type": "string"
        }
      ]
    },
    "image": {
      "type": "string"
    }
  }
}

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
