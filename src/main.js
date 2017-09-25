const data = require ('../data/products.json')
const products = data.products

const filterDiv = document.getElementById('filters')
const filterDetailDiv = document.getElementById('filter-detail')
const productDiv = document.getElementById('products')

const keys = Object.keys(data.products[0])
const filtersList = document.createElement('ul')
const filterNames = keys.filter(item => {
  // we don't need to be able to filter by these. todo: tag them as filterable: false?
  return ((item !== 'id') && (item !== "name") && (item !== "description") && (item !== "image"))
})

let filteredProducts = products

// Generate a filters object which contains the key-value pairs of all the available properties.
const filters = {}
filterNames.forEach(filterType => {
  filters[filterType] = []

  products.forEach(item => {
    if(!filters[filterType].includes(item[filterType])){
      filters[filterType].push(item[filterType])
    }
  })
})

// get tag list & count
const tagList = []

products.forEach(item => {
  item.tags.forEach(tag => {
    if(!tagList.includes(tag)) {
      tagList.push([tag, 1])
    } else {
      let index = tagList.find(tag)
      tagList[index][1] ++
    }
  })
})

filters.tags = tagList

function displayOptions(filterItem) {
  filterDetailDiv.innerHTML = ""
  const itemList = document.createElement('UL')
  filterItem.forEach(item => {
    const listItem = document.createElement('LI')
    listItem.textContent = item
    listItem.addEventListener('click', e => {
      filteredProducts = products.filter(product => {
        //return product.hasProperty(filterItem, listItem)
        console.log(product, filterItem, item)
      })
    })
    itemList.append(listItem)
  })
  filterDetailDiv.append(itemList)
}

filterNames.forEach(name => {
  const listItem = document.createElement('LI')
  listItem.textContent = name
  listItem.addEventListener('click', e => {
    displayOptions(filters[name])
  })
  filtersList.append(listItem)
})

filterDiv.append(filtersList)


// apply products to page
const productList = document.createElement('ul')
products.forEach(item => {
  const productItem = document.createElement('li')
  productItem.textContent = item.name
  productList.append(productItem)
})
productDiv.append(productList)
