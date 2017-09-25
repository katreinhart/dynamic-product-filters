const data = require ('../data/products.json')

const filterDiv = document.getElementById('filters')
const filtersList = document.createElement('ul')

const keys = Object.keys(data.products[0])
console.log(keys)

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

console.log(tagList)

filterDiv.append(filtersList)
