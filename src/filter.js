const Filter = {}

Filter.generateFilters = function (data) {
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
  }
}

Filter.applyFilter = function (data, filterCallback) {
    const filteredData = data.filter(filterCallback)
    return filteredData
}

Filter.filterCount = function() {
  return Object.keys(this.filters).length
}
