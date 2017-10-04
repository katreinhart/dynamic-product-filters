# Product Filter Utility #
Dynamically generated product filters for online shopping sites of all types.

### Description ###

What problem or need does your project solve?

- Online shopping sites sometimes have problems with filtering. For example, on many online shopping sites, four filters are shown on every category page: e.g. Size, Color, Price, and Brand. However, for many categories of item, these categories are not relevant or not informative. For example, when I am shopping in the Home category, the Size filter usually only has "OS" (one size) which is not informative. What if these filters were populated dynamically, directly from the JSON file containing the products to be displayed on the page? This is a tool that will read in a JSON file of products, validate it against a JSONSchema (either provided by the user or the included boilerplate version), and dynamically append these filter categories to a page.

<!-- Additionally, I will use local storage to retain a user's filter information. Currently, when you move on to a different category of item, that size is not retained when you go back to it. For example, if I search for women's jeans for myself, then go look for men's jeans for my partner, then go back to women's jeans, I would like the size filter to persist within a single session and across sessions. A user can remove this information easily by un-checking the filter. (This info could also be sent back to the server & stored for better user behavior tracking! I.e. if there is a closeout event and my favorite brand/size of jeans is included, I would love to have an email notification.) -->

## Installation ##

```
npm install dynamic-product-filter
```

#### Dependencies ####
```
json-schema
```
Additionally, use of this library requires a bundler - the example is running Webpack, but your favorite bundler should work.

#### Setup  ####
```
const DynamicFilter = require('dynamic-filters')
const df = new DynamicFilter(productSchema, data[, exclude, priceBuckets])
```
productSchema is a [JSON-schema](http://json-schema.org) describing the structure of your data. A default option is included, which has ID, name, and price as required fields and an array of optional fields.

data is a JSON object with a single key-value pair, where the key is "products" and the value is an array of product objects.

Exclude is an array of properties to be excluded from the filters object. By default it is set to ['id', 'name', 'description', 'image']. If you want to not exclude these items, pass in an empty array. 

priceBuckets is an integer number of "buckets" you want your prices to be filterable by. By default it is set to 4. Allowable values are between 3 and 10 (inclusive).

#### API ####

Once the object is instantiated, the only necessary method to call is:
```
df.getFilters()
```
This will return the filter object (keys are the names of the categories and values are the arrays of values.)

The first time it is called, ```getFilters``` will call the validation & generation methods. Invalid/schema-nonconforming data or incorrect arguments will throw console errors.
