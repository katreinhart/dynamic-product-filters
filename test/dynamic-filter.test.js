const DynamicFilter = require('../model')
const expect = require('chai').expect

describe('DynamicFilter', function () {
  describe('new DynamicFilter', function () {
    it('should return a new instance of DynamicFilter')
    it('should throw an error if either the schema or the products are not provided')
    it('should allow for an exclude option')
  })

  describe('.data', function () {
    it('should return an object with all the keys of those properties that are filterable')
    it('should exclude properties if an option of exclude is provided that includes the property name')
    it('should exclude properties which only have 0-1 options')

    xit('??? something about tags/keywords (array values) and checking for multiple values')
    xit('??? something about price range (number values)')
  })
})
