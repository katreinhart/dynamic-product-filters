const Validator = require('jsonschema').Validator
const v = new Validator()

const productSchema = require('./products.schema.json')
const products = require('../data/products.json')

v.addSchema(productSchema, '/product-schema')
console.log(v.validate(products, productSchema))
