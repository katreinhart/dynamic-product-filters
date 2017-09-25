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


var _products = __webpack_require__(1);

var _products2 = _interopRequireDefault(_products);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('sanity check!');


var filterDiv = document.getElementById('filters');
var filtersList = document.createElement('ul');

_products2.default.products.forEach(function (item) {
    var newItem = document.createElement('li');
    newItem.textContent = item.name;
    filtersList.append(newItem);
});

filterDiv.append(filtersList);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "products": [{
    "id": "123",
    "name": "Heirloom Banana",
    "price": 1.29,
    "tags": ["fruit", "berry", "yellow", "tropical"],
    "description": "An artisinal heirloom banana from Williamsburg",
    "style": "modern",
    "dimensions": ["23cm", "44cm", "100cm"],
    "image": "https://unsplash.it/400/200"
  }, {
    "id": "124",
    "name": "Meggings vegan",
    "price": 0.39,
    "tags": ["pitchfork", "neutra", "wayfarers"],
    "description": "Single-origin coffee squid hoodie raw denim",
    "style": "traditional",
    "dimensions": ["18in", "23in", "1in"],
    "image": "https://unsplash.it/400/200"
  }, {
    "id": "125",
    "name": "Vaporware iPhone",
    "price": 4.99,
    "tags": ["chicharrones", "small batch", "mumblecore", "cardigan"],
    "description": "Activated charcoal waistcoat seitan cred semiotics",
    "style": "traditional",
    "dimensions": ["", "", ""],
    "image": "https://unsplash.it/400/200"
  }, {
    "id": "126",
    "name": "Activated Charcoal Pabst",
    "price": 11.29,
    "tags": ["meggings", "selfies", "brunch", "cardigan"],
    "description": "Hella lomo chartreuse wayfarers readymade whatever hot chicken",
    "style": "contemporary",
    "dimensions": ["", "", ""],
    "image": "https://unsplash.it/400/200"
  }, {
    "id": "127",
    "name": "Thundercats",
    "price": 0.99,
    "tags": ["intelligentsia", "heirloom", "lumbersexual", "artisan"],
    "description": "Shabby chic taiyaki craft beer, vexillologist heirloom intelligentsia",
    "style": "modern",
    "dimensions": ["", "", ""],
    "image": "https://unsplash.it/400/200"
  }, {
    "id": "128",
    "name": "Unicorn pour-over",
    "price": 0.29,
    "tags": ["actually", "affogato", "meh", "helvetica"],
    "description": "Adaptogen four loko cardigan, pitchfork art party neutra la croix.",
    "style": "country",
    "dimensions": ["", "", ""],
    "image": "https://unsplash.it/400/200"
  }, {
    "id": "129",
    "name": "snackwave air plant",
    "price": 3.05,
    "tags": ["hella", "cred", "scenester", "kitsch"],
    "description": "Vinyl flexitarian dreamcatcher fashion axe.",
    "style": "modern",
    "dimensions": ["", "", ""],
    "image": "https://unsplash.it/400/200"
  }, {
    "id": "130",
    "name": "Craft beer enamel pin",
    "price": 10.99,
    "tags": ["actually", "affogato", "activated charcoal", "sartorial"],
    "description": "Shoreditch schlitz selfies gochujang. Irony air plant mumblecore",
    "style": "transitional",
    "dimensions": ["", "", ""],
    "image": "https://unsplash.it/400/200"
  }, {
    "id": "131",
    "name": "gentrify fashion",
    "price": 3.29,
    "tags": ["hella", "sartorial", "gastropub", "affogato"],
    "description": "Venmo offal twee, cliche post-ironic swag kitsch. ",
    "style": "transitional",
    "dimensions": ["", "", ""],
    "image": "https://unsplash.it/400/200"
  }, {
    "id": "132",
    "name": "bespoke heirloom coloring book ",
    "price": 0.23,
    "tags": ["aesthetic", "snackwave", "actually", "raclette"],
    "description": "Chillwave +1 kogi, neutra slow-carb banjo humblebrag",
    "style": "modern",
    "dimensions": ["", "", ""],
    "image": "https://unsplash.it/400/200"
  }]
};

/***/ })
/******/ ]);