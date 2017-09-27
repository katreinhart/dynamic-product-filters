const data = require ('../data/test-products.json')
const products = data.products

const productSchema = require('../model/validator')
const detectAllFields = require('../model/detectCustomFields')

const filterDiv = document.getElementById('filters')
const filterDetailDiv = document.getElementById('filter-detail')
const productDiv = document.getElementById('products')
const clearButton = document.getElementById('clearButton')

const keys = detectAllFields(productSchema, products)

const dontFilterBy = ['id', 'name', 'description', 'image']
const filtersList = document.createElement('ul')
let filterNames = keys

filterNames = keys.filter(item => {
  // we don't need to be able to filter by these. todo: tag them as filterable: false?
  // console.log(item)
  return (!dontFilterBy.includes(item))
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
  if(filters[filterType].length <= 2) {
    // If there are less than 2 options in the list - it's probably not worth displaying at least not giving priority to
    dontFilterBy.push(filterType)
  }
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

  // filters.price = { "labels": [`Under \$${bucket1}`, `\$${bucket1} to \$${bucket2}`, `\$${bucket2} to \$${bucket3}`, `Over \$${bucket3}`],
  //                   "buckets": [bucket1, bucket2, bucket3] }

  filters.price = [ { "label": `Under \$${bucket1}`,
                      "bucket": [0, bucket1] },
                    { "label": `\$${bucket1} to \$${bucket2}`,
                      "bucket": [bucket1, bucket2] },
                    { "label": `\$${bucket2} to \$${bucket3}`,
                      "bucket": [bucket2, bucket3] },
                    { "label": `Over \$${bucket3}`,
                      "bucket": [bucket3, bucket4] }
                  ]
}
generatePriceBuckets()

// Display Filter Details
// Called on click of filter title
// Generates UL & LIs for the filter details & appends to FilterDetailDiv

function displayFilterDetails(filterDetail) {
  filterDetailDiv.innerHTML = "" // clear out the current contents
  const itemList = document.createElement('UL') // create a new UL

  filterDetail.forEach(detailedFilter => { // for each filter detail
    const listItem = document.createElement('LI') // create a new LI
    if(activeFilter === 'price') {
      listItem.textContent = detailedFilter.label
    } else {
      listItem.textContent = detailedFilter // LI text content is name of detail
    }

    listItem.addEventListener('click', e => { // Add event listener to detail item
      filteredProducts = products.filter(product => {
        if(activeFilter === 'price') { // bucket filtering
          return  ((parseFloat(product.price) >  detailedFilter.bucket[0])
                && (parseFloat(product.price) <= detailedFilter.bucket[1]))
        } else if ((activeFilter === 'tags') || (activeFilter === 'keywords')) { // one-of-many filtering
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
  if(!dontFilterBy.includes(name)) {
    const listItem = document.createElement('LI')
    listItem.textContent = name

    listItem.addEventListener('click', e => {
      activeFilter = name
      displayFilterDetails(filters[name])
    })
    filtersList.append(listItem)
  }
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
