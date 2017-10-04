# Dynamic Product Filters #
by: [katreinhart](mailto:kat@reinhart.digital)
Dynamically generated product filters for online shopping sites of all types.

### Description ###
- Online shopping sites sometimes have problems with filtering. For example, on many online shopping sites, the same 3 or 4 filters are shown on every category page: e.g. Size, Color, Price, and Brand. However, for many categories of item, these categories are not relevant or not informative. For example, when I am shopping in the Home category, the Size filter usually only has "OS" (one size) which is not informative. What if these filters were populated dynamically, directly from the JSON file containing the products to be displayed on the page? This is a tool that will read in a JSON file of products, validate it against a JSONSchema (either provided by the user or the included boilerplate version), and dynamically append these filter categories to a page.

## Installation ##

```
npm install dynamic-product-filter
```
or fork & clone [the repo](https://github.com/katreinhart/dynamic-product-filters) :)

### Run the Example ###
`npm run webpack-example` and (in a new terminal tab) `npm run live-server-example` (requires [live-server](https://www.npmjs.com/package/live-server) to be installed globally to work)

#### Dependencies ####
```
jsonschema
```
Additionally, use of this library requires a bundler - the example is running Webpack, but your favorite bundler should work just fine.

#### Setup  ####
```
const DynamicFilter = require('dynamic-product-filter')
const df = new DynamicFilter(productSchema, data[, exclude, priceBuckets])
```
productSchema is a [JSON-schema](http://json-schema.org) describing the structure of your data. A default option is included in the example, which has ID, name, and price as required fields and an array of optional fields.

If you want your own randomly-generated content like the data in the example, check out the sister package [hipster-product-creator](https://www.npmjs.com/package/hipster-product-creator).

#### Arguments ####
--
`data` is a JSON object with a single key-value pair, where the key is "products" and the value is an array of product objects.

`exclude` is an array of properties to be excluded from the filters object. By default it is set to `['id', 'name', 'description', 'image']`. If you want to not exclude these items, pass in an empty array (`[]`).

`priceBuckets` is an integer number of "buckets" you want your prices to be filterable by. By default it is set to 4. Allowable values are between 3 and 10 (inclusive).

#### API ####

Once the object is instantiated, the only necessary method to call is:
```
df.getFilters()
```
This will return the filter object (keys are the names of the categories and values are the arrays of values.)

The first time it is called, ```getFilters``` will call the validation & generation methods. Invalid/schema-nonconforming data or incorrect arguments will throw console errors.

See the `example/src/index.js` for more information on how to implement in your project.

#### Troubleshooting ####
This skeleton index.js file will test to make sure everything is working properly:
```js
const DynamicFilter = require('dynamic-product-filter')
const schema = require('dynamic-product-filter/lib/product.schema.json')
const data = require('./products.json')

const df = new DynamicFilter(schema, data)
const filterObject = df.getFilters()
console.log(filterObject)
```
If this file runs and outputs a filter object, you are good to go and use it in your project.
