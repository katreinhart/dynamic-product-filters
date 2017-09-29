const DynamicFilter = require('../model')
const expect = require('chai').expect

const testSchema = require('./fixtures/schema.json')
// const testSingleProductSchema = require('./fixtures/singleProduct.json')
const testProducts = require('./fixtures/test-products.json')

describe('DynamicFilter', function () {
  before(function () {
    this.schema = testSchema
    this.products = testProducts
  })

  describe('new DynamicFilter', function () {
    it('should return a new instance of DynamicFilter', function() {
      const newFilter = new DynamicFilter(this.schema, this.products)
      expect(newFilter).to.be.an.instanceof(DynamicFilter)
    })
    it('should throw an error if either the schema or the products are not provided', function() {
      const badFilter = () => { new DynamicFilter() }
      expect(badFilter).to.throw()
    })
    it('should allow for an exclude option', function () {
      const newFilter = new DynamicFilter(this.schema, this.products, ['id'])
      expect(newFilter.exclude).to.deep.equal(['id'])
    })
  })

  describe('.detectFields', function () {
    xit('should validate the data against the schema', function () {
      const newFilter = new DynamicFilter(this.schema, this.products)
      expect(newFilter.detectFields()).to.be.a('array')
    })
    it('should not validate bad data', function() {
      const newFilter = () => { new DynamicFilter(this.schema, {}) }
      expect(newFilter).to.throw()
    })
  })

  describe('.generateFilters', function () {
    xit('should do something', function () {

    })
  })

  describe('.filters', function () {
    it('should return an object with all the keys of those properties that are filterable')
    it('should exclude properties if an option of exclude is provided that includes the property name')
    it('should exclude properties which only have 0-1 options')

    xit('??? something about tags/keywords (array values) and checking for multiple values')
    xit('??? something about price range (number values)')
  })
})
