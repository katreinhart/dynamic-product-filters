const data = require ('../data/test-products-2.json')
const products = data.products
const productSchema = require('../model/product.schema.json')
const DynamicFilter = require('../model')

const df = new DynamicFilter(productSchema, data, null, 5)

const filterObject = df.getFilters()
const filters = Object.keys(filterObject)

// getting all the divs you need
const filterDiv = document.getElementById('filters')
const productDiv = document.getElementById('products')

// create the UL that will hold the list
const filtersList = document.createElement('ul')
filtersList.className = "list-group" // bootstrap


// Active Filter Display - holds the name of the currently active filter.
const activeFilterDisplay = document.getElementById('activeFilterDisplay')
// would be nice to eventually have dismissable pills with each filter on it
// but for now, it's just one clear button.
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

function displayFilterDetails(filterName, filterDetail, parentDiv) {
  // only display filter details if not already displayedd.
  if(parentDiv.childNodes.length <= 1) {
    // Create a new list with class name "list-group"
    const itemList = document.createElement('UL')
    itemList.className = "list-group"

    // filterDetail is an array of values to be displayed.
    filterDetail.forEach(detailedFilter => {
      // create a new LI and give it class names "list-group-item" and "detail-item"
      const listItem = document.createElement('LI')
      listItem.className = "list-group-item detail-item"
      // if it is the price, we only want to display the "label" property, not the object.
      if(filters.activeFilter === 'price') {
        listItem.textContent = detailedFilter.label
      }  else {
        listItem.textContent = detailedFilter // LI text content is name of detail
      }

      // Add a click event listener that will actually do the filtering.
      // Each list item gets the click handler.
      listItem.addEventListener('click', e => {
        filters.activeFilter = filterName
        activeFilterDisplay.textContent = `${filters.activeFilter}: ${detailedFilter}`
        // filter the products and display the results
        filters.filteredProducts = products.filter(product => {
          // 3 options for filtering.
          // Price is filtered by "buckets", i.e. over X but under Y.
          if(filters.activeFilter === 'price') { // bucket filtering
            activeFilterDisplay.textContent = `${filters.activeFilter}: ${detailedFilter.label}`
            return  ((parseFloat(product.price) >  detailedFilter.bucket[0])
                  && (parseFloat(product.price) <= detailedFilter.bucket[1]))
          } // Tags or keywords are "one-of-many" type, ie we want to filter for products
            // that include the tag or keyword in an array.
          else if ((filters.activeFilter === 'tags') || (filters.activeFilter === 'keywords')) {
            return product[filters.activeFilter].includes(detailedFilter)
          } else { // Otherwise it is an exact-match filtering, so just check for strict equality.
            return (product[filters.activeFilter] === detailedFilter)
          }
        })
        // Call to displayProducts clears out the current display and updates it to the filteredProducts.
        displayProducts(filters.filteredProducts)
      })
      // End event listener.
      // Append the item (filter detail) to the list.
      itemList.append(listItem)
    })
    // Append the item List to the parent div.
    parentDiv.append(itemList)
  }
}

function collapseFilterDetails(name, listItem) {
  listItem.innerHTML = name
  listItem.classList.remove('detail-opened')
}


// Display Filter Names generates the top-level filter list (ie. what is shown before any clicks.)
function displayFilterNames() {
  // filters is the Object.keys from the filterObject.
  filters.forEach(name => {
    // create an LI and give it "list-group-item" bootstrap class & content of name
    const listItem = document.createElement('LI')
    listItem.className = "list-group-item"
    listItem.textContent = name

    // click event listener will display or collapse the filter details
    listItem.addEventListener('click', e => {
      // set activeFilter to name, so we know what we are filtering by

      if(e.target.className.includes("detail-opened")){
        filters.activeFilter = ""
        collapseFilterDetails(name, listItem)
      } else {
        filters.activeFilter = name
        displayFilterDetails(name, filterObject[name], listItem)
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
