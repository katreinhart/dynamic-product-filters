const data = require ('../data/products.json')
const products = data.products

const filters = require('./filters')
// Generate a filters object which contains the key-value pairs of all the available properties.
filters.init() // runs all the initialization & setup functions inside of filters

// getting all the divs you need
const filterDiv = document.getElementById('filters')
const productDiv = document.getElementById('products')

// create the UL that will hold the list
const filtersList = document.createElement('ul')
filtersList.className = "list-group" // bootstrap

// would be nice to eventually have dismissable pills with each filter on it
// but for now, it's just one clear button
const clearButton = document.getElementById('clearButton')
clearButton.addEventListener('click', e => {
  filters.filteredProducts = []
  filters.activeFilter = ""
  displayProducts(products)
})

// Display Filter Details
// Called on click of filter title
// Generates UL & LIs for the filter details & appends to FilterDetailDiv

function displayFilterDetails(filterDetail, parentDiv) {
  // filterDetailDiv.innerHTML = "" // clear out the current contents
  if(parentDiv.childNodes.length > 1) {
    parentDiv.innerHTML = filters.activeFilter
  } else {
    const itemList = document.createElement('UL') // create a new UL
    itemList.className = "list-group"
    filterDetail.forEach(detailedFilter => { // for each filter detail
      const listItem = document.createElement('LI') // create a new LI
      listItem.className = "list-group-item"
      if(filters.activeFilter === 'price') {
        listItem.textContent = detailedFilter.label
      } else if ((filters.activeFilter === 'tags') || (filters.activeFilter === 'keywords')){
        listItem.textContent = `${detailedFilter[0]} (${detailedFilter[1]})`
      } else {
        listItem.textContent = detailedFilter // LI text content is name of detail
      }

      listItem.addEventListener('click', e => { // Add event listener to detail item
        filters.filteredProducts = products.filter(product => {
          if(filters.activeFilter === 'price') { // bucket filtering
            return  ((parseFloat(product.price) >  detailedFilter.bucket[0])
                  && (parseFloat(product.price) <= detailedFilter.bucket[1]))
          } else if ((filters.activeFilter === 'tags') || (filters.activeFilter === 'keywords')) { // one-of-many filtering
            return product[filters.activeFilter].includes(detailedFilter[0])
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


function displayFilterNames() {
  filters.keys.forEach(name => {
    if(!filters.dontFilterBy.includes(name)) {
      const listItem = document.createElement('LI')
      listItem.className = "list-group-item"
      listItem.textContent = name

      listItem.addEventListener('click', e => {
        filters.activeFilter = name
        // BUG: Clicking on a filter detail collapses the menu
        displayFilterDetails(filters[name], listItem)
      })
      filtersList.append(listItem)
    }
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

// UI STUFF

const displaySidebarButton = document.getElementById('showSidebar')
const sidebar = document.getElementById('menuSidebar')
const mainContent = document.getElementById('mainContent')
displaySidebarButton.addEventListener('click', e => {
  sidebar.classList.toggle('hidden')
  mainContent.classList.toggle('slide-over')
})


// console.log(filters)
