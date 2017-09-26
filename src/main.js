const data = require ('../data/products.json')
const products = data.products

const productSchema = require('../model/validator')
const detectAllFields = require('../model/detectCustomFields')

const filterDiv = document.getElementById('filters')
const filterDetailDiv = document.getElementById('filter-detail')
const productDiv = document.getElementById('products')
const clearButton = document.getElementById('clearButton')

const keys = detectAllFields(productSchema, products)

const filtersList = document.createElement('ul')
const filterNames = keys.filter(item => {
  // we don't need to be able to filter by these. todo: tag them as filterable: false?
  return ((item !== 'id') && (item !== "name") && (item !== "description") && (item !== "image"))
  // also filter out any keys without values???
})

clearButton.addEventListener('click', e => {
  filteredProducts = []
  activeFilter = ""
  displayProducts(products)
})

let filteredProducts = []
let activeFilter = ""

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

// TAGS
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

// PRICE
// dynamically generate buckets based on range of prices in data.

// helper function
function roundUpToNearest25(number) {
  return (Math.ceil(number/25) * 25)
}

function generatePriceBuckets() {
  let min = Infinity, max = 0
  products.forEach(item => {
    if(item.price < min) min = item.price
    if(item.price > max) max = item.price
  })

  let bucket1 = roundUpToNearest25(Math.floor((parseFloat(max) + parseFloat(min)) / 4))
  let bucket2 = roundUpToNearest25(Math.floor((parseFloat(max) + parseFloat(min)) / 2))
  let bucket3 = roundUpToNearest25(Math.floor((parseFloat(max) + parseFloat(min)) * 3 / 4))

  filters.price = [`Under \$${bucket1}`, `\$${bucket1} to \$${bucket2}`, `\$${bucket2} to \$${bucket3}`, `Over \$${bucket3}`]
  // console.log(filters.price)
}
generatePriceBuckets()
console.log(filters)

// Display Filter Details
// Called on click of filter title
// Generates UL & LIs for the filter details & appends to FilterDetailDiv

function displayFilterDetails(filterDetail) {
  filterDetailDiv.innerHTML = "" // clear out the current contents
  const itemList = document.createElement('UL') // create a new UL

  filterDetail.forEach(detailedFilter => { // for each filter detail
    const listItem = document.createElement('LI') // create a new LI
    listItem.textContent = detailedFilter // LI text content is name of detail
    listItem.addEventListener('click', e => { // Add event listener to detail item
      filteredProducts = products.filter(product => {
        if(activeFilter === 'price') { // bucket filtering
          // hard coding this in right now, not the right way to do it
          if(detailedFilter === 'Under $25') {
            return (parseFloat(product.price) < 25)
          } else if (detailedFilter === '$25 to $50') {
            return ((parseFloat(product.price) >= 25) && (parseFloat(product.price) < 50))
          } else if (detailedFilter === '$50 to $75') {
            return ((parseFloat(product.price) >= 50) && (parseFloat(product.price) < 75))
          } else {
            return (parseFloat(product.price) >= 75)
          }
        } else if (activeFilter === 'tags') { // one-of-many filtering
          return product[activeFilter].includes(detailedFilter[0])
        } else { // exact-match filtering (easiest case)
          return (product[activeFilter] === detailedFilter)
        }

      })
      displayProducts(filteredProducts)
    })
    itemList.append(listItem)
  })

  filterDetailDiv.append(itemList)
}

filterNames.forEach(name => {
  const listItem = document.createElement('LI')
  listItem.textContent = name

  listItem.addEventListener('click', e => {
    displayFilterDetails(filters[name])
    activeFilter = name
    console.log('active filter is', name)
  })
  filtersList.append(listItem)
})

filterDiv.append(filtersList)


// apply products to page
function displayProducts(productsToDisplay) {
  productDiv.innerHTML = ""
  const productList = document.createElement('div')
  productList.className = "card-deck"
  productsToDisplay.forEach(product => {
    const newEl = document.createElement('DIV')
    newEl.innerHTML = `<div class="card" style="width: 20rem;">`
        + `<img class="card-img-top" src="${product.image}" alt="an image of ${product.name}">`
        + `<div class="card-block"><h3 class="card-title">${product.name} <span class="price">${product.price}</span></h3>`
        + `<p class="card-text">${product.description}</p>`
        + `<a href="#" class="btn btn-primary">Add to Cart</a>`
        + `</div></div>`
    productList.append(newEl)
  })
  productDiv.append(productList)
}

displayProducts(products)
