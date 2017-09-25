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
      "required": true
    },
    "name": {
      "type": "string"
    },
    "price": {
      "type": "number"
    },
    "description": {
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
  "id": "/product-schema",
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


v.addSchema(productSchema, '/product-schema')
v.addSchema(customProduct, '/customProduct')
console.log(v.validate(products, productSchema))
