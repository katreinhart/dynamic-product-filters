/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var data = __webpack_require__(1);
console.log(data);
var products = data.products;

var filterDiv = document.getElementById('filters');
var filterDetailDiv = document.getElementById('filter-detail');
var productDiv = document.getElementById('products');

var keys = Object.keys(data.products[0]);
var filtersList = document.createElement('ul');
var filterNames = keys.filter(function (item) {
  // we don't need to be able to filter by these. todo: tag them as filterable: false?
  return item !== 'id' && item !== "name" && item !== "description" && item !== "image";
});

var filteredProducts = products;

// Generate a filters object which contains the key-value pairs of all the available properties.
var filters = {};
filterNames.forEach(function (filterType) {
  filters[filterType] = [];

  products.forEach(function (item) {
    if (!filters[filterType].includes(item[filterType])) {
      filters[filterType].push(item[filterType]);
    }
  });
});

// get tag list & count
var tagList = [];

products.forEach(function (item) {
  item.tags.forEach(function (tag) {
    if (!tagList.includes(tag)) {
      tagList.push([tag, 1]);
    } else {
      var index = tagList.find(tag);
      tagList[index][1]++;
    }
  });
});

filters.tags = tagList;

function displayOptions(filterItem) {
  filterDetailDiv.innerHTML = "";
  var itemList = document.createElement('UL');
  filterItem.forEach(function (item) {
    var listItem = document.createElement('LI');
    listItem.textContent = item;
    listItem.addEventListener('click', function (e) {
      filteredProducts = products.filter(function (product) {
        //return product.hasProperty(filterItem, listItem)
        console.log(product, filterItem, item);
      });
    });
    itemList.append(listItem);
  });
  filterDetailDiv.append(itemList);
}

filterNames.forEach(function (name) {
  var listItem = document.createElement('LI');
  listItem.textContent = name;
  listItem.addEventListener('click', function (e) {
    displayOptions(filters[name]);
  });
  filtersList.append(listItem);
});

filterDiv.append(filtersList);

// apply products to page
var productList = document.createElement('div');
productList.className = "card-deck";
products.forEach(function (product) {
  var newEl = document.createElement('DIV');
  newEl.innerHTML = '<div class="card" style="width: 20rem;">' + ('<img class="card-img-top" src="' + product.image + '" alt="an image of ' + product.name + '">') + ('<div class="card-block"><h3 class="card-title">' + product.name + ' <span class="price">' + product.price + '</span></h3>') + ('<p class="card-text">' + product.description + '</p>') + '<a href="#" class="btn btn-primary">Add to Cart</a>' + '</div></div>';
  productList.append(newEl);
});
productDiv.append(productList);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {"products":[{"id":"1506445881315","name":"readymade shorts swag hoodie","description":"Schlitz party occupy OSS! Marfa mixtape church-key skateboard sold crucifix lo-fi fix lo-fi","tags":["fund","shabby","kitsch","chillwave","photo","actually"],"style":"modern","type":"wall art","price":"94.63","image":"https://unsplash.it/400/200?image=279"},{"id":"1506445881326","name":"before","description":"Vice Tumblr belly beer Internal Future semiotics single-origin narwhal High chambray loko ugh art","tags":["post-ironic","haven't","Server","jean","sold"],"style":"traditional","type":"accessory","price":"63.66","image":"https://unsplash.it/400/200?image=966"},{"id":"1506445881327","name":"party Apparel whatever","description":"Neutra meh vegan mixtape Intelligentsia viral being slow-carb messenger","tags":["tattooed","VHS","McSweeney's","stumptown","polaroid","being"],"style":"modern","type":"jeans","price":"26.36","image":"https://unsplash.it/400/200?image=241"},{"id":"1506445881327","name":"chia","description":"synth VHS flexitarian swag scenester moon lomo cray gastropub swag art deep vinyl PBR","tags":["shabby","booth","yr","art","lomo","master"],"style":"traditional","type":"accessory","price":"62.35","image":"https://unsplash.it/400/200?image=768"},{"id":"1506445881344","name":"bicycle dreamcatcher Wes","description":"vinyl put in mi post-ironic out mumblecore artisan are cornhole trade scenester Brooklyn PBR&B four party master sriracha","tags":["butcher","scenester","bag","flannel"],"style":"retro","type":"beer","price":"22.26","image":"https://unsplash.it/400/200?image=990"},{"id":"1506445881347","name":"OSS!","description":"banjo ethical Intelligentsia Carles viral fashion Austin keffiyeh kitsch","tags":["kale","wolf","Truffaut","chic"],"style":"traditional","type":"jeans","price":"76.98","image":"https://unsplash.it/400/200?image=299"},{"id":"1506445881350","name":"biodiesel","description":"towards scenester belly Pitchfork selvage party axe farm-to-table selfies Pitchfork batch photo Shoreditch 2017-07-02; Tumblr","tags":["Bushwick","still","blog","{\"text\":\"kogi"],"style":"retro","type":"T-shirt","price":"53.69","image":"https://unsplash.it/400/200?image=603"},{"id":"1506445881357","name":"Bottle cleanse master","description":"ethical hoodie Park whatever flexitarian bitters Bushwick street level on single-origin cred bag","tags":["Apparel","chambray","Pinterest","twee"],"style":"kitsch","type":"beer","price":"72.36","image":"https://unsplash.it/400/200?image=39"},{"id":"1506445881357","name":"fixie","description":"place salvia pork cardigan asymmetrical salvia butcher slow-carb chia put 2017-06-23; Williamsburg","tags":["direct","bicycle","out","twee","biodiesel","Quick"],"style":"sartorial","type":"beer","price":"77.70","image":"https://unsplash.it/400/200?image=744"},{"id":"1506445881358","name":"letterpress","description":"iPhone probably polaroid v 3 shabby +1 pickled fixie Bottle Cosby retro Godard NOT chips pack selvage Progress","tags":["art","keffiyeh","church-key","Thundercats","leggings"],"style":"transitional","type":"coffee","price":"36.84","image":"https://unsplash.it/400/200?image=252"},{"id":"1506445931918","name":"Neutra Echo","description":"Odd Anderson it locavore blog they street Anderson fix raw","tags":["pork","Marfa","Brooklyn","chic"],"style":"modern","type":"beer","price":"50.51","image":"https://unsplash.it/400/200?image=595"},{"id":"1506445931921","name":"wayfarers party Wes Progress","description":"Tonx selvage NOT booth sweater drinking retro before sustainable umami before sweater loko tattooed 90's","tags":["mi","stumptown","normcore","flannel","sold","lo-fi"],"style":"kitsch","type":"table","price":"0.39","image":"https://unsplash.it/400/200?image=695"},{"id":"1506445931922","name":"aesthetic","description":"mi vinegar wayfarers mustache retro party salvia banh Intelligentsia 2017-06-23; Future disrupt cleanse place fixie level on","tags":["pug","pour-over","street","craft","Server"],"style":"retro","type":"jeans","price":"55.28","image":"https://unsplash.it/400/200?image=278"},{"id":"1506445931922","name":"pour-over before level","description":"vinyl salvia master PBR&B salvia cray Godard chia umami cornhole cardigan viral brunch axe roof aesthetic shabby","tags":["honored","sold","authentic","8-bit","food"],"style":"kitsch","type":"wall art","price":"33.46","image":"https://unsplash.it/400/200?image=1024"},{"id":"1506445931923","name":"mumblecore","description":"wolf polaroid bicycle vinyl bespoke lo-fi American biodiesel brunch","tags":["trade","authentic","tousled","sustainable"],"style":"sartorial","type":"beer","price":"6.28","image":"https://unsplash.it/400/200?image=554"},{"id":"1506445931923","name":"meh","description":"Williamsburg party twee hella retro Brooklyn tofu sartorial bird cleanse chia keffiyeh heirloom church-key","tags":["meggings","blog","hella","haven't"],"style":"transitional","type":"wall art","price":"72.69","image":"https://unsplash.it/400/200?image=335"},{"id":"1506445931924","name":"cornhole a","description":"them paleo forage tofu 2017-07-02; try-hard tattooed place Pinterest letterpress XOXO occupy twee stumptown Apparel put wolf place whatever flannel","tags":["honored","put","party","salvia","forage"],"style":"retro","type":"T-shirt","price":"84.36","image":"https://unsplash.it/400/200?image=429"},{"id":"1506445931925","name":"post-ironic","description":"place Kickstarter booth DIY being pour-over trade ennui Godard small roof it leggings Blue","tags":["heirloom","in","messenger","cred"],"style":"kitsch","type":"beer","price":"68.72","image":"https://unsplash.it/400/200?image=700"},{"id":"1506445931926","name":"squid sriracha","description":"Cosby bespoke fixie Vice them try-hard food narwhal tousled are Truffaut fingerstache sartorial","tags":["stumptown","on","loko","Error\",\"message\":\"Work"],"style":"transitional","type":"table","price":"85.22","image":"https://unsplash.it/400/200?image=771"},{"id":"1506445931935","name":"forage","description":"wolf banjo honore retro disrupt master salvia mi Portland in","tags":["narwhal","leggings","fixie","put","trust"],"style":"hella","type":"chair","price":"80.20","image":"https://unsplash.it/400/200?image=600"}]}

/***/ })
/******/ ]);