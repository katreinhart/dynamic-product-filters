const data = require ('../data/products.json')

const filterDiv = document.getElementById('filters')
const filtersList = document.createElement('ul')


data.products.forEach(item => {
    const newItem = document.createElement('li')
    newItem.textContent = item.name
    filtersList.append(newItem)
})

filterDiv.append(filtersList)
