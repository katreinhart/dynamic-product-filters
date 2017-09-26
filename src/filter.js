const Product = function () {
  // constructor function for a Product
  // do I need this???
}

// Product has properties: name, id, description, price, tags, dimesnions....
// Not all products will have all properties. Some may have size, color, brand.
// Others may have style, dimensions, material.

const Filter = function (data) {
  // validate data against schema
  // generate filters for the data and make them available
  // How many types of filters do we need?
  // Single-match filters (i.e. item type)
  // One of many filters (i.e. tags)
  // Range filters (i.e. price)
  // dimensional filters??? 

  this.filters = [] // would return ['price', 'tags', 'style', 'color'] e.g.

  this.filterCount = this.filters.length

  this.generateFilters = function (data) {

  }

  this.applyFilter = function (data, filter) {
    const filteredData = data.filter()
    return filteredData
  }
}
