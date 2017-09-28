
const data = require ('../data/products.json')
const products = data.products

const productSchema = require('../model/validator')
const detectFields = require('../model/detectFields')
const roundUpToNearest25 = require("./helpers")

const filters = {
  keys: detectFields(productSchema, products),
  dontFilterBy: ['id', 'name', 'description', 'image'],
  filteredProducts: [],
  activeFilter: "",

  generateFilters: function() {
    filters.keys.forEach(filterType => {
      filters[filterType] = []

      products.forEach(item => {
        if(!filters[filterType].includes(item[filterType])){
          filters[filterType].push(item[filterType])
        }
      })
      if(filters[filterType].length <= 2) {
        // If there are less than 2 options in the list - it's probably not worth displaying at least not giving priority to
        filters.dontFilterBy.push(filterType)
      }
    })
  },

  generateTagList: function () {
    const tagList = []
    products.forEach(item => {
      item.tags.forEach(tag => {
        if(!tagList.includes(tag)) {
          tagList.push([tag, 1])
        } else {
          let index = tagList.find(tag)

          tagList[index][1]+=1
        }
      })
    })
    this.tags = tagList
  },

  generatePriceBuckets: function () {
    let min = Infinity
    let max = 0
    products.forEach(item => {
      if(parseFloat(item.price) < min) {
        min = parseFloat(item.price)
      }
      if(parseFloat(item.price) > max) {
        max = parseFloat(item.price)
      }
    })

    let bucket1 = roundUpToNearest25(Math.floor((parseFloat(max) + parseFloat(min)) / 4))
    let bucket2 = roundUpToNearest25(Math.floor((parseFloat(max) + parseFloat(min)) / 2))
    let bucket3 = roundUpToNearest25(Math.floor((parseFloat(max) + parseFloat(min)) * 3 / 4))
    let bucket4 = roundUpToNearest25(parseFloat(max))

    filters.price = [ { "label": `Under \$${bucket1}`,
                        "bucket": [0, bucket1] },
                      { "label": `\$${bucket1} to \$${bucket2}`,
                        "bucket": [bucket1, bucket2] },
                      { "label": `\$${bucket2} to \$${bucket3}`,
                        "bucket": [bucket2, bucket3] },
                      { "label": `Over \$${bucket3}`,
                        "bucket": [bucket3, bucket4] }
                    ]
  },

  init: function() {
    this.generateFilters()
    this.generateTagList()
    this.generatePriceBuckets()
  }
}

module.exports = filters
