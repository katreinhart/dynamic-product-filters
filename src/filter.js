const Filter = function () {
  // validate data against schema?
  // generate filters for the data and make them available
  // How many types of filters do we need?
  // Single-match filters (i.e. item type)
  // One of many filters (i.e. tags)
  // Range filters (i.e. price)
  // dimensional filters???

  this.filters = {
    "price": {
      "type": "range"
    },
    "size": {
      "type": "single-match"
    },
    "tags": {
      "type": "of-many"
    },
    "color": {
      "type": "single-match"
    },
    "style": {
      "type": "single-match"
    },
    "brand": {
      "type": "single-match"
    }
  } // would return ['price', 'tags', 'style', 'color'] e.g.



  this.filterCount = Object.keys(this.filters).length

  this.generateFilters = function (data) {

  }

  this.applyFilter = function (data, filter) {
    const filteredData = data.filter()
    return filteredData
  }

  console.log('Filter obect loaded')
}
