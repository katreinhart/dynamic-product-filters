const DynamicFilter = require('../model')
const expect = require('chai').expect

const testSchema = require('./fixtures/singleProductSchema.json')
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

  describe('.validateData', function () {
    it('should return an empty error array for valid data', function () {
      const newFilter = new DynamicFilter(this.schema, this.products)
      const valid = newFilter.validateData()
      expect(valid.errors.length).to.equal(0)
    })

    it('should throw an error for invalid data', function () {
      const badFilter = new DynamicFilter(this.schema, {"asdf":"asdf"})
      const validate = () => {
        badFilter.validateData()
      }
      expect(validate).to.throw()
    })
  })

  describe('.detectFields', function () {
    it('should validate the data against the schema', function () {
      const newFilter = new DynamicFilter(this.schema, this.products)
      const fields = newFilter.detectFields()
      expect(fields).to.be.a('array')
      expect(fields).to.contain('price')
      expect(fields).to.contain('name')
    })
    it('should not validate bad data', function() {
      const newFilter = () => { new DynamicFilter(this.schema, null) }
      expect(newFilter).to.throw()
    })
  })

  describe('.generateFilters', function () {
    it('should return an array', function () {
      const newFilter = new DynamicFilter(this.schema, this.products)
      const filters = newFilter.generateFilters()
      expect(filters).to.be.a('array')
    })
    it('should contain expected items but not contain excluded items', function() {
      const newFilter = new DynamicFilter(this.schema, this.products)
      const filters = newFilter.generateFilters()
      expect(filters).to.contain('price')
      expect(filters).not.to.contain('id')
    })
  })

  describe('.filters', function () {
    it('should return an object with all the keys of those properties that are filterable', function() {
      const newFilter = new DynamicFilter(this.schema, this.products)
      const filterObject = newFilter.getFilters()
      const filterKeys = Object.keys(filterObject)

      expect(filterObject).to.be.a('object')
      expect(filterKeys).to.not.include('id')
      expect(filterKeys).to.include('price')
    })

    it('should not exclude properties if an empty array is provided', function () {
      const newFilter = new DynamicFilter(this.schema, this.products, []) // empty array excludes nothing
      const filterObject = newFilter.getFilters()
      const filterKeys = Object.keys(filterObject)

      expect(filterKeys).to.include('id')
      expect(filterKeys).to.include('image')
    })

    it('should exclude properties if a non-empty array is provided', function () {
      const newFilter = new DynamicFilter(this.schema, this.products, ["id", "image", "price", "tags"])
      const filterObject = newFilter.getFilters()
      const filterKeys = Object.keys(filterObject)

      expect(filterKeys).to.not.include('id')
      expect(filterKeys).to.not.include('image')
      expect(filterKeys).to.not.include('price')
      expect(filterKeys).to.include('description')
    })

    it('should exclude properties which only have 0-1 options', function () {
      const newFilter = new DynamicFilter(this.schema, this.products)
      const filterObject = newFilter.getFilters()
      const filterKeys = Object.keys(filterObject)
      expect(filterKeys).to.not.include('color')
    })
  })

  describe('price buckets', function () {
    it('should default to 4', function () {
      const newFilter = new DynamicFilter(this.schema, this.products)
      expect(newFilter.priceBuckets).to.eq(4)
    })
    it('should accept an integer value', function () {
      const newFilter = new DynamicFilter(this.schema, this.products, null, 3)
      expect(newFilter.priceBuckets).to.eq(3)
    })
    it('should throw an error for a non-integer value', function () {
      const newFilter = () => { new DynamicFilter(this.schema, this.products, null, 3.4) }
      expect(newFilter).to.throw()
    })

    it('should create 4 price buckets when no value is passed', function () {
      const newFilter = new DynamicFilter(this.schema, this.products)
      expect(newFilter.getFilters().price.length).to.eq(4)
    })
    xit('should create the proper number of price buckets', function () {
      const newFilter = new DynamicFilter(this.schema, this.products, null, 3)
      expect(newFilter.getFilters().price.length).to.eq(3)
    })
  })

  describe('tag lists', function () {
    it('should generate a list of tags present in the data', function () {
      const newFilter = new DynamicFilter(this.schema, this.products)
      expect(newFilter.getFilters().tags).to.be.a('array')
      expect(newFilter.getFilters().tags).to.include('kale')
      expect(newFilter.getFilters().tags).to.not.include('javascript')
    })
  })
})
