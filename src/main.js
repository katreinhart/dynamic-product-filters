const data = require ('../data/products.json')

const filterDiv = document.getElementById('filters')
const filterDetailDiv = document.getElementById('filter-detail')
const productDiv = document.getElementById('products')

const keys = Object.keys(data.products[0])
const filtersList = document.createElement('ul')
const filterNames = keys.filter(item => {
  // we don't want to be able to filter by these. todo: tag them as filterable: false
  return ((item !== 'id') && (item !== "name") && (item !== "description") && (item !== "image"))
})

// Generate a filters object which contains the key-value pairs of all the available properties.
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
const tagList = []

data.products.forEach(item => {
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

console.log(filters)

function displayOptions(filterItem) {
  console.log('display options', filterItem)
  filterDetailDiv.innerHTML = ""
  const itemList = document.createElement('UL')
  filterItem.forEach(item => {
    const listItem = document.createElement('LI')
    listItem.textContent = item
    itemList.append(listItem)
  })
  filterDetailDiv.append(itemList)
}

filterNames.forEach(name => {
    const listItem = document.createElement('LI')
    listItem.textContent = name
    listItem.addEventListener('click', e => {
      // console.log(filters[name])
      displayOptions(filters[name])
    })
    filtersList.append(listItem)
})

filterDiv.append(filtersList)



// apply products to page
