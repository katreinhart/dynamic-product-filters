const data = require ('../data/products.json')

const filterDiv = document.getElementById('filters')
const productDiv = document.getElementById('products')

const keys = Object.keys(data.products[0])
const filtersList = document.createElement('ul')
const filterNames = keys.filter(item => {
  // don't filter by these types
  return ((item !== 'id') && (item !== "name") && (item !== "description") && (item !== "image"))
})

const filters = {}
filterNames.forEach(filterType => {
  filters[filterType] = []

  data.products.forEach(item => {
    if(!filters[filterType].includes(item[filterType])){
      filters[filterType].push(item[filterType])
    }
  })
})

// get tag list & count
const tagList = {}

data.products.forEach(item => {
  item.tags.forEach(tag => {
    if(!tagList[tag]) {
      tagList[tag] = 1
    } else {
      tagList[tag]++
    }
  })
})

filterNames.forEach(name => {
    const listItem = document.createElement('LI')
    listItem.textContent = name
    listItem.addEventListener('click', e => {
      console.log(filters[name])
    })
    filtersList.append(listItem)
})

filterDiv.append(filtersList)

// apply products to page
