const request = require('request')
const fs = require('fs')

let styles = ["modern", "sartorial", "transitional", "traditional", "retro"]
let types = ["jeans", "T-shirt", "chair", "table", "wall art", "coffee", "beer", "accessory"]
// let itemTypes = ["shirt", "shorts", "socks", "pants", "jackets", "accessories"]
let sizes = ["small", "medium", "large", "xl", "xs"]
// let ages = ["Under 2", "2-4", "4-6", "6-8", "8 and Up"]


const products = []
createProductsArray()

function createProductsArray() {
  // const products = []
  for(let i=0; i<10; i++) {
    createRandomProduct()
  }
  // const JSONString = `{"products":${products}}`
  console.log(JSON.stringify(products))
}

function createRandomProduct() {
  request('http://hipsterjesus.com/api', (err, body, res) => {
    const product = {}
    if(err) {
      console.log('error:', err)
      return
    }
    else {
      // console.log('body: ', body.body)
      let jsonRes = {}
      jsonRes = JSON.stringify(JSON.parse(body.body))
      // console.log(jsonRes.text)
      const text = jsonRes.split(' ')

      // start building a random product
      let nameLength = Math.floor(Math.random() * 5)
      let descriptionLength = Math.floor(Math.random() * 15) + 8
      let numberTags = Math.floor(Math.random() * 3) + 4

      product.id = getNextID().toString()
      product.name = randomString(text, nameLength)
      product.description = randomString(text, descriptionLength)
      product.tags = []
      for(let i=0; i<numberTags; i++) {
        let index = Math.floor(Math.random() * text.length)
        product.tags.push(text[index])
      }
      product.style = styles[Math.floor(Math.random() * styles.length)]
      product.type = types[Math.floor(Math.random() * types.length)]
      product.size = sizes[Math.floor(Math.random() * sizes.length)]
      // product.age = ages[Math.floor(Math.random() * ages.length)]
      product.price = ((Math.random() * 20000)/100).toFixed(2)
      product.image = "https://unsplash.it/400/200?image=" + Math.floor(Math.random() * 1084)
      console.log(JSON.stringify(product))
      // products.push(product)
    }
  })
}

function randomString(data, length) {
  let answer = ""

  for(let i=0; i < length-1; i++) {
    let index = Math.floor(Math.random() * data.length)
    answer += data[index] + " "
  }
  let index = Math.floor(Math.random() * data.length)
  answer += data[index]

  return answer
}

function getNextID() {
  return Date.now()
}
