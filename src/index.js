const data = require ('../data/test-products-2.json')
const products = data.products
const productSchema = require('../model/product.schema.json')

const DynamicFilter = require('../model')
const df = new DynamicFilter(productSchema, data)

// const filters = require('./filters')
// // Generate a filters object which contains the key-value pairs of all the available properties.
// filters.init() // runs all the initialization & setup functions inside of filters

const filterObject = df.getFilters()
const filters = Object.keys(filterObject)

// getting all the divs you need
const filterDiv = document.getElementById('filters')
const productDiv = document.getElementById('products')

// create the UL that will hold the list
const filtersList = document.createElement('ul')
filtersList.className = "list-group" // bootstrap

const activeFilterDisplay = document.getElementById('activeFilterDisplay')

// would be nice to eventually have dismissable pills with each filter on it
// but for now, it's just one clear button
const clearButton = document.getElementById('clearButton')
clearButton.addEventListener('click', e => {
  filters.filteredProducts = []
  filters.activeFilter = ""
  activeFilterDisplay.textContent = ""
  displayProducts(products)
})


// Display Filter Details
// Called on click of filter title
// Generates UL & LIs for the filter details & appends to FilterDetailDiv

function displayFilterDetails(filterDetail, parentDiv) {
  // filterDetailDiv.innerHTML = "" // clear out the current contents
  console.log(filterDetail, parentDiv)
  if(parentDiv.childNodes.length > 1) {
    // parentDiv.innerHTML = filters.activeFilter
    // console.log('has children')
  } else {
    const itemList = document.createElement('UL') // create a new UL
    itemList.className = "list-group"
    filterDetail.forEach(detailedFilter => { // for each filter detail
      const listItem = document.createElement('LI') // create a new LI
      listItem.className = "list-group-item detail-item"
      if(filters.activeFilter === 'price') {
        listItem.textContent = detailedFilter.label
      }  else {
        listItem.textContent = detailedFilter // LI text content is name of detail
      }

      listItem.addEventListener('click', e => { // Add event listener to detail item
        activeFilterDisplay.textContent = `${filters.activeFilter}: ${detailedFilter}`
        filters.filteredProducts = products.filter(product => {
          if(filters.activeFilter === 'price') { // bucket filtering
            return  ((parseFloat(product.price) >  detailedFilter.bucket[0])
                  && (parseFloat(product.price) <= detailedFilter.bucket[1]))
          } else if ((filters.activeFilter === 'tags') || (filters.activeFilter === 'keywords')) { // one-of-many filtering
            return product[filters.activeFilter].includes(detailedFilter)
          } else { // exact-match filtering (easiest case)
            return (product[filters.activeFilter] === detailedFilter)
          }
        })
        displayProducts(filters.filteredProducts)
      })
      itemList.append(listItem)
    })

    parentDiv.append(itemList)
  }
}

function collapseFilterDetails(name, listItem) {
  listItem.innerHTML = name
  listItem.classList.remove('detail-opened')
}

function displayFilterNames() {
  filters.forEach(name => {
    const listItem = document.createElement('LI')
    listItem.className = "list-group-item"
    listItem.textContent = name

    listItem.addEventListener('click', e => {
      filters.activeFilter = name
      if(e.target.className.includes("detail-opened")){
        collapseFilterDetails(name, listItem)
      } else {
        displayFilterDetails(filterObject[name], listItem)
        e.target.classList.add("detail-opened")
      }

    })
    filtersList.append(listItem)
  })
  filterDiv.append(filtersList)
}

displayFilterNames()



// apply products to page
function displayProducts(productsToDisplay) {
  productDiv.innerHTML = ""
  const productList = document.createElement('div')
  productList.className = "card-deck"
  productsToDisplay.forEach(product => {
    const newEl = document.createElement('DIV')
    newEl.innerHTML = `<div class="card">`
        + `<img class="card-img-top" src="${product.image}" alt="an image of ${product.name}">`
        + `<div class="card-block"><h3 class="card-title">${product.name} <span class="price">${product.price}</span></h3>`
        + `<p class="card-text">${product.description}</p>`
        + `<a href="#" class="btn btn-info">Add to Cart</a>`
        + `</div></div>`
    productList.append(newEl)
  })
  productDiv.append(productList)
}

displayProducts(products)

// UI STUFF FOR SMALL SCREENS
const displaySidebarButton = document.getElementById('showSidebar')
const sidebar = document.getElementById('menuSidebar')
const mainContent = document.getElementById('mainContent')

displaySidebarButton.addEventListener('click', e => {
  sidebar.classList.toggle('hidden')
  mainContent.classList.toggle('slide-over')
})
