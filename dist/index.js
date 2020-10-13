(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/nanoid/index.browser.js":
/*!**********************************************!*\
  !*** ./node_modules/nanoid/index.browser.js ***!
  \**********************************************/
/*! exports provided: nanoid, customAlphabet, customRandom, urlAlphabet, random */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"nanoid\", function() { return nanoid; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"customAlphabet\", function() { return customAlphabet; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"customRandom\", function() { return customRandom; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"random\", function() { return random; });\n/* harmony import */ var _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./url-alphabet/index.js */ \"./node_modules/nanoid/url-alphabet/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"urlAlphabet\", function() { return _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__[\"urlAlphabet\"]; });\n\n// This file replaces `index.js` in bundlers like webpack or Rollup,\n// according to `browser` config in `package.json`.\n\n\n\nif (true) {\n  // All bundlers will remove this block in the production bundle.\n  if (\n    typeof navigator !== 'undefined' &&\n    navigator.product === 'ReactNative' &&\n    typeof crypto === 'undefined'\n  ) {\n    throw new Error(\n      'React Native does not have a built-in secure random generator. ' +\n        'If you don’t need unpredictable IDs use `nanoid/non-secure`. ' +\n        'For secure IDs, import `react-native-get-random-values` ' +\n        'before Nano ID. If you use Expo, install `expo-random` ' +\n        'and use `nanoid/async`.'\n    )\n  }\n  if (typeof msCrypto !== 'undefined' && typeof crypto === 'undefined') {\n    throw new Error(\n      'Import file with `if (!window.crypto) window.crypto = window.msCrypto`' +\n        ' before importing Nano ID to fix IE 11 support'\n    )\n  }\n  if (typeof crypto === 'undefined') {\n    throw new Error(\n      'Your browser does not have secure random generator. ' +\n        'If you don’t need unpredictable IDs, you can use nanoid/non-secure.'\n    )\n  }\n}\n\nlet random = bytes => crypto.getRandomValues(new Uint8Array(bytes))\n\nlet customRandom = (alphabet, size, getRandom) => {\n  // First, a bitmask is necessary to generate the ID. The bitmask makes bytes\n  // values closer to the alphabet size. The bitmask calculates the closest\n  // `2^31 - 1` number, which exceeds the alphabet size.\n  // For example, the bitmask for the alphabet size 30 is 31 (00011111).\n  // `Math.clz32` is not used, because it is not available in browsers.\n  let mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1\n  // Though, the bitmask solution is not perfect since the bytes exceeding\n  // the alphabet size are refused. Therefore, to reliably generate the ID,\n  // the random bytes redundancy has to be satisfied.\n\n  // Note: every hardware random generator call is performance expensive,\n  // because the system call for entropy collection takes a lot of time.\n  // So, to avoid additional system calls, extra bytes are requested in advance.\n\n  // Next, a step determines how many random bytes to generate.\n  // The number of random bytes gets decided upon the ID size, mask,\n  // alphabet size, and magic number 1.6 (using 1.6 peaks at performance\n  // according to benchmarks).\n\n  // `-~f => Math.ceil(f)` if f is a float\n  // `-~i => i + 1` if i is an integer\n  let step = -~((1.6 * mask * size) / alphabet.length)\n\n  return () => {\n    let id = ''\n    while (true) {\n      let bytes = getRandom(step)\n      // A compact alternative for `for (var i = 0; i < step; i++)`.\n      let j = step\n      while (j--) {\n        // Adding `|| ''` refuses a random byte that exceeds the alphabet size.\n        id += alphabet[bytes[j] & mask] || ''\n        // `id.length + 1 === size` is a more compact option.\n        if (id.length === +size) return id\n      }\n    }\n  }\n}\n\nlet customAlphabet = (alphabet, size) => customRandom(alphabet, size, random)\n\nlet nanoid = (size = 21) => {\n  let id = ''\n  let bytes = crypto.getRandomValues(new Uint8Array(size))\n\n  // A compact alternative for `for (var i = 0; i < step; i++)`.\n  while (size--) {\n    // It is incorrect to use bytes exceeding the alphabet size.\n    // The following mask reduces the random byte in the 0-255 value\n    // range to the 0-63 value range. Therefore, adding hacks, such\n    // as empty string fallback or magic numbers, is unneccessary because\n    // the bitmask trims bytes down to the alphabet size.\n    let byte = bytes[size] & 63\n    if (byte < 36) {\n      // `0-9a-z`\n      id += byte.toString(36)\n    } else if (byte < 62) {\n      // `A-Z`\n      id += (byte - 26).toString(36).toUpperCase()\n    } else if (byte < 63) {\n      id += '_'\n    } else {\n      id += '-'\n    }\n  }\n  return id\n}\n\n\n\n\n//# sourceURL=webpack:///./node_modules/nanoid/index.browser.js?");

/***/ }),

/***/ "./node_modules/nanoid/url-alphabet/index.js":
/*!***************************************************!*\
  !*** ./node_modules/nanoid/url-alphabet/index.js ***!
  \***************************************************/
/*! exports provided: urlAlphabet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"urlAlphabet\", function() { return urlAlphabet; });\n// This alphabet uses `A-Za-z0-9_-` symbols. The genetic algorithm helped\n// optimize the gzip compression for this alphabet.\nlet urlAlphabet =\n  'ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW'\n\n\n\n\n//# sourceURL=webpack:///./node_modules/nanoid/url-alphabet/index.js?");

/***/ }),

/***/ "./src/Layer.ts":
/*!**********************!*\
  !*** ./src/Layer.ts ***!
  \**********************/
/*! exports provided: Layer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Layer\", function() { return Layer; });\n/* harmony import */ var _MapElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MapElement */ \"./src/MapElement.ts\");\n\nclass Layer extends _MapElement__WEBPACK_IMPORTED_MODULE_0__[\"MapElement\"] {\n  constructor() {\n    super();\n    this.offscreen = false;\n    this.offscreenAlpha = 1;\n    this.offscreenCanvas = null; // offScreenImgData: ImageBitmap = null\n\n    this.offScreenImg = null;\n    this.renderBounds = [];\n    this.dataChangedFlag = false;\n    this.type = 'layer';\n  }\n\n  setOffScreen(val, alpha) {\n    this.offscreen = val;\n\n    if (val) {\n      if (!this.offscreenCanvas) {\n        this.offscreenCanvas = document.createElement('canvas');\n      }\n\n      console.log(alpha, typeof alpha);\n\n      if (alpha !== undefined && typeof alpha == 'number') {\n        this.offscreenAlpha = alpha;\n      }\n    } else {\n      this.offscreenCanvas = null;\n    }\n  }\n\n  setPreRender(val, alpha) {\n    this.preRender = val;\n\n    if (val) {\n      this.setOffScreen(true, alpha);\n    }\n  }\n\n  async render(rctx) {\n    this.eachChildren(ele => {\n      ele.render(rctx);\n    });\n    return super.render(rctx);\n  }\n\n  contain(pos) {\n    let result = false;\n    this.eachChildren(ele => {\n      if (ele.contain(pos)) {\n        result = true;\n        return false;\n      }\n    });\n    return result;\n  }\n\n  makeBounds() {\n    let min = [180, 90],\n        max = [-180, -90];\n    this.eachChildren(ele => {\n      min[0] = Math.min(min[0], ele.bounds[0][0]);\n      min[1] = Math.min(min[1], ele.bounds[0][1]);\n      max[0] = Math.max(max[0], ele.bounds[1][0]);\n      max[1] = Math.max(max[1], ele.bounds[1][1]);\n    });\n    return [min, max];\n  }\n\n}\n\n//# sourceURL=webpack:///./src/Layer.ts?");

/***/ }),

/***/ "./src/Layers/MarkerLayer.ts":
/*!***********************************!*\
  !*** ./src/Layers/MarkerLayer.ts ***!
  \***********************************/
/*! exports provided: MarkerLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MarkerLayer\", function() { return MarkerLayer; });\n/* harmony import */ var _Shapes_Marker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/Shapes/Marker */ \"./src/Shapes/Marker.ts\");\n/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/Utils */ \"./src/Utils/index.ts\");\n/* harmony import */ var _Layer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Layer */ \"./src/Layer.ts\");\n\n\n\n\nclass GroupMarker extends _Shapes_Marker__WEBPACK_IMPORTED_MODULE_0__[\"Marker\"] {\n  constructor(marker) {\n    super(marker.location, marker.style, marker.image);\n    this.markers = [];\n    this.offset = {\n      x: 0,\n      y: 0\n    };\n    this.numOffset = {\n      x: 0,\n      y: 0\n    };\n    this.textStyle = {\n      fontSize: 16,\n      color: 'black'\n    };\n    this.pixel = marker.pixel;\n  }\n\n  async render(rctx) {\n    let ctx = rctx.ctx;\n\n    if (this.style.opacity) {\n      ctx.globalAlpha = this.style.opacity;\n    }\n\n    let pixel = this.pixel;\n\n    if (this.image) {\n      let height = this.image.height || this.image.imgData.height;\n      let width = this.image.width || this.image.imgData.width;\n      ctx.drawImage(this.image.imgData, pixel.x - width / 2 + this.offset.x, pixel.y - height / 2, width + this.offset.y, height);\n    }\n\n    let num = this.markers.length.toString();\n    ctx.font = `${this.textStyle.fontSize}px ${this.textStyle.color}`;\n    let textMeasure = ctx.measureText(num);\n    textMeasure.width;\n    ctx.fillText(num, pixel.x - textMeasure.width / 2 + this.offset.x, pixel.y - this.textStyle.fontSize / 2 + this.offset.y);\n    return super.render(rctx);\n  }\n\n}\n\nclass MarkerLayer extends _Layer__WEBPACK_IMPORTED_MODULE_2__[\"Layer\"] {\n  constructor() {\n    super(...arguments);\n    this.groupedMarkers = [];\n    this.groupThreshold = 0;\n  }\n\n  async render(rctx) {\n    let gmarkers = [];\n    let markers = [];\n    this.eachChildren(ele => {\n      let minDist = Number.MAX_VALUE;\n      let nearMarker = null;\n      ele.pixel = this.view.lnglatToPixel(ele.location);\n\n      const checkMerge = m => {\n        let gm = m;\n\n        if (this.canMerge) {\n          if (gm.markers) {\n            if (gm.markers.find(om => !this.canMerge(ele, om, this.view.zoomLevel))) {\n              return;\n            }\n          } else {\n            if (!this.canMerge(ele, m, this.view.zoomLevel)) {\n              return;\n            }\n          }\n        }\n\n        let dist = Object(_Utils__WEBPACK_IMPORTED_MODULE_1__[\"distance\"])(ele.pixel, m.pixel);\n\n        if (dist < minDist) {\n          minDist = dist;\n          nearMarker = m;\n        }\n      };\n\n      gmarkers.forEach(checkMerge);\n      markers.forEach(checkMerge);\n\n      if (minDist < this.groupThreshold && nearMarker) {\n        let gm = nearMarker;\n\n        if (gm.markers) {\n          gm.markers.push(ele);\n          ele.visible = false;\n        } else {\n          gm = new GroupMarker(ele);\n          gm.markers.push(ele);\n          gm.markers.push(nearMarker);\n          nearMarker.visible = false;\n          ele.visible = false;\n          markers.splice(markers.indexOf(nearMarker));\n          gmarkers.push(gm);\n        }\n      } else {\n        markers.push(ele);\n      } // ele.render(rctx)\n\n    });\n    gmarkers.forEach(m => {\n      if (this.beforeRender) {\n        this.beforeRender(m);\n      }\n\n      m.render(rctx);\n    });\n    markers.forEach(m => {\n      m.render(rctx);\n    });\n    return super.render(rctx);\n  }\n\n  addChildren(el) {\n    if (el instanceof _Shapes_Marker__WEBPACK_IMPORTED_MODULE_0__[\"Marker\"]) {\n      super.addChildren(el);\n    } else {\n      console.warn('marker layer can only add marker');\n    }\n  }\n\n}\n\n//# sourceURL=webpack:///./src/Layers/MarkerLayer.ts?");

/***/ }),

/***/ "./src/MapElement.ts":
/*!***************************!*\
  !*** ./src/MapElement.ts ***!
  \***************************/
/*! exports provided: MapElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MapElement\", function() { return MapElement; });\n/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nanoid */ \"./node_modules/nanoid/index.browser.js\");\n/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ \"./src/Utils/index.ts\");\n/* harmony import */ var _Utils_sortedMap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utils/sortedMap */ \"./src/Utils/sortedMap.ts\");\n\n\n\n\nclass RankLayer {\n  constructor(zIndex) {\n    this.elements = {};\n    this.zIndex = zIndex;\n  }\n\n}\n\nclass MapElement {\n  constructor() {\n    this.id = Object(nanoid__WEBPACK_IMPORTED_MODULE_0__[\"nanoid\"])();\n    this.childrenCollection = new _Utils_sortedMap__WEBPACK_IMPORTED_MODULE_2__[\"SortedMap\"]();\n    this.zIndex = 0;\n    this.listeners = new Map();\n    this.visible = true;\n    this.tiles = [];\n    this.dataset = {};\n    this.style = {\n      strokeColor: 'transparent',\n      strokeWidth: 1\n    }; // this is a key property\n\n    this._preRender = false;\n  }\n\n  get preRender() {\n    return this._preRender;\n  }\n\n  set preRender(val) {\n    this._preRender = val;\n\n    if (val && !this.canvas) {\n      this.canvas = document.createElement('canvas');\n      this.canvas.height = 1000;\n      this.canvas.width = 1000;\n    }\n  }\n\n  async render(rctx) {\n    if (rctx.offScreen) {\n      let data = rctx.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);\n      let bitmap = await createImageBitmap(data);\n      return bitmap;\n    }\n\n    return null;\n  }\n\n  addChildren(el) {\n    el.parent = this;\n    el.view = this.view;\n    let layer = this.childrenCollection.get(el.zIndex);\n\n    if (!layer) {\n      layer = new RankLayer(el.zIndex);\n      this.childrenCollection.set(el.zIndex, layer);\n    }\n\n    layer.elements[el.id] = el;\n\n    if (this.view) {\n      this.view.render();\n    }\n  }\n\n  setChildren(els) {\n    this.childrenCollection.forEach(l => {\n      l.elements = {};\n    });\n    els.forEach(ele => {\n      this.addChildren(ele);\n    });\n  }\n\n  clear() {\n    this.childrenCollection.forEach(l => {\n      l.elements = {};\n    });\n\n    if (this.view) {\n      this.view.render();\n    }\n  }\n\n  setZIndex(zIndex) {\n    if (this.parent) {\n      let originCollection = this.parent.childrenCollection.get(this.zIndex);\n\n      if (originCollection) {\n        delete originCollection.elements[this.id];\n      }\n\n      this.zIndex = zIndex;\n      let newCollection = this.parent.childrenCollection.get(this.zIndex);\n\n      if (!newCollection) {\n        newCollection = new RankLayer(zIndex);\n        this.parent.childrenCollection.set(zIndex, newCollection);\n      }\n\n      newCollection.elements[this.id] = this;\n    }\n  }\n\n  getZIndex() {\n    return this.zIndex;\n  }\n\n  setView(view) {\n    this.view = view;\n    view.render();\n  }\n\n  eachChildren(cb) {\n    this.childrenCollection.forEach(layer => {\n      let keys = Object.keys(layer.elements);\n\n      for (let key of keys) {\n        let flag = cb(layer.elements[key]);\n\n        if (flag === false) {\n          break;\n        }\n      }\n    });\n  }\n\n  on(eventName, handler) {\n    let evList = this.listeners.get(eventName);\n\n    if (!evList) {\n      evList = [];\n      this.listeners.set(eventName, evList);\n    }\n\n    if (evList.indexOf(handler) < 0) {\n      evList.push(handler);\n    }\n  }\n\n  off(eventName, handler) {\n    let evList = this.listeners.get(eventName);\n\n    if (evList) {\n      if (handler) {\n        let index = evList.indexOf(handler);\n\n        if (index >= 0) {\n          evList.splice(index, 1);\n        }\n      } else {\n        this.listeners.delete(eventName);\n      }\n    }\n  }\n\n  trigger(eventName, ev) {\n    const triggerSelf = () => {\n      ev.mapElement = this;\n      let evList = this.listeners.get(eventName);\n\n      if (evList) {\n        evList.forEach(h => h(ev));\n      }\n    }; // 如果是layer节点，先看子节点有没有触发事件\n\n\n    if (this.type === 'layer') {\n      let triggerFlag = false;\n      this.eachChildren(c => {\n        if (c.trigger(eventName, ev)) {\n          triggerFlag = true;\n          return false;\n        }\n      });\n\n      if (triggerFlag) {\n        triggerSelf();\n        return true;\n      }\n    } else if (this.contain(ev.pos, {\n      x: ev.offsetX,\n      y: ev.offsetY\n    })) {\n      triggerSelf();\n      return true;\n    }\n\n    return false;\n  }\n\n  renderOffScreen() {\n    if (Object(_Utils__WEBPACK_IMPORTED_MODULE_1__[\"isShape\"])(this)) {}\n  }\n\n  async renderSingle(z, x, y) {\n    let span = _Utils__WEBPACK_IMPORTED_MODULE_1__[\"zoomLevels\"][z];\n    let bounds = [[span * x, span * y], [span * (x + 1), span * (y + 1)]];\n    this.canvas.height = 1000;\n    this.canvas.width = 1000;\n    let ctx = this.canvas.getContext('2d');\n    let data = await this.render({\n      mapBounds: bounds,\n      ctx,\n      offScreen: true\n    });\n    this.bitmap = data;\n  }\n\n}\n\n//# sourceURL=webpack:///./src/MapElement.ts?");

/***/ }),

/***/ "./src/MapView.ts":
/*!************************!*\
  !*** ./src/MapView.ts ***!
  \************************/
/*! exports provided: MapView, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MapView\", function() { return MapView; });\n/* harmony import */ var _MapElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MapElement */ \"./src/MapElement.ts\");\n/* harmony import */ var _Models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Models */ \"./src/Models.ts\");\n\n\nconst AMap = window.AMap;\nclass MapView extends _MapElement__WEBPACK_IMPORTED_MODULE_0__[\"MapElement\"] {\n  constructor(el, config) {\n    super();\n    this.h3HexagonStyle = {\n      fillColor: 'rgba(0,44,222,.3)',\n      strokeWeight: 0,\n      // strokeColor: 'rgba(0,44,222,.3)', // 线条颜色\n      strokeColor: 'rgba(0,44,222,0)'\n    };\n    this.ready = 0;\n    this.readyPromise = null;\n    this.mapBounds = [[0, 0], [0, 0]];\n    this.renderFlag = false; // 当发生交互事件时，置为true，之后触发一次渲染，并在渲染时触发事件处理\n\n    this.canvasEvent = null; // 事件相关\n\n    this.mouseDown = false;\n    this.mouseDownTime = null;\n    this.zoomLayers = [5, 10];\n    this.extraData = {};\n    this.view = this;\n\n    if (el) {\n      this.init(el, config);\n    }\n  }\n\n  async init(el, config, plugins = ['AMap.MouseTool']) {\n    this.map = new AMap.Map(el, config);\n    return new Promise((resolve, reject) => {\n      this.readyPromise = {\n        resolve,\n        reject\n      };\n      this.map.plugin(plugins, () => {\n        // this.pixiApp = new PIXI.Application({\n        //     transparent:true,\n        // })\n        let canvas = document.createElement('canvas');\n        this.canvas = canvas;\n        let layer = new AMap.CustomLayer(canvas, {\n          // alwaysRender: true,\n          map: this.map,\n          zIndex: 100\n        });\n\n        layer.render = rctx => {\n          let size = this.map.getSize(); //resize\n\n          let width = size.getWidth();\n          let height = size.getHeight();\n          let retina = AMap.Browser.retina;\n          canvas.width = width;\n          canvas.height = height; //清除画布\n\n          canvas.style.width = width + 'px';\n          canvas.style.height = height + 'px';\n\n          if (!rctx) {\n            rctx = {// callByMap: true\n            };\n          }\n\n          if (rctx.callByMap === undefined) {\n            rctx.callByMap = true;\n          }\n\n          rctx.ctx = canvas.getContext('2d');\n          rctx.retina = retina;\n          rctx.canvas = canvas;\n          let bounds = this.map.getBounds();\n          let latRange = [],\n              lngRange = [];\n          let ne = bounds.getNorthEast(),\n              sw = bounds.getSouthWest();\n          this.bounds = [[sw.getLng(), sw.getLat()], [ne.getLng(), ne.getLat()]];\n          this.zoomLevel = this.map.getZoom();\n          rctx.mapBounds = this.mapBounds; // if (!this.latRange) {\n          //     this.latRange = latRange\n          //     this.lngRange = lngRange\n          // }\n          // // 如果已经有了渲染好的图形，只是做缩放平移\n          // const calcCenter = (range: any[]) => {\n          //     return (range[0] + range[1]) / 2\n          // }\n          // const calcOffset = (range1, range2) => {\n          //     return calcCenter(range1) - calcCenter(range2)\n          // }\n          // if (this.renderedImg) {\n          //     let scale = Math.abs( (this.latRange[1] - this.latRange[0]) / (latRange[1] - latRange[0]))\n          //     let offsetX = calcOffset(lngRange, this.lngRange)\n          //     let offsetY = calcOffset(latRange, this.latRange)\n          //     console.log(scale, offsetX, offsetY)\n          //     rctx.ctx.translate(offsetX, offsetY)\n          //     rctx.ctx.scale(scale,scale)\n          //     this.latRange = latRange\n          //     this.lngRange = lngRange\n          // } else {\n          //     this.layers.sort((l1,l2)=>l1.zIndex - l2.zIndex).forEach(layer => {\n          //         if (layer.visible) {\n          //             layer.render(rctx)\n          //         }\n          //     })\n          //     this.renderedImg = true\n          // }\n          // if (rctx.callByMap) {\n          //     // this.pixiApp.stage.setTransform(Math.random() * 100, Math.random()*100)\n          //     // console.log('map transform')\n          // } else {\n          //     console.log('update data')\n          //     // this.pixiApp.stage.removeChildren()\n          //     this.layers.sort((l1,l2)=>l1.zIndex - l2.zIndex).forEach(layer => {\n          //         if (layer.visible) {\n          //             layer.render(rctx)\n          //         }\n          //     })\n          // }\n\n          this.eachChildren(ele => {\n            // console.log('each ch of view', ele)\n            ele.render(rctx);\n          }); // this.layers.sort((l1,l2)=>l1.zIndex - l2.zIndex).forEach(layer => {\n          //     if (layer.visible) {\n          //         layer.render(rctx)\n          //     }\n          // })\n        };\n\n        ['click', 'dblclick', 'mousemove'].forEach(ename => {\n          canvas.addEventListener(ename, event => {\n            let dur = Date.now() - this.mouseDownTime;\n\n            if (ename === 'click' && dur > 300) {\n              return;\n            } // 鼠标按下时不响应事件\n\n\n            if (this.mouseDown) {\n              return;\n            }\n\n            let lnglat = this.pixelToLngLat(event.offsetX, event.offsetY); // console.log(lnglat, event)\n\n            const mapEvent = _Models__WEBPACK_IMPORTED_MODULE_1__[\"MapEvent\"].create(event, lnglat);\n            this.eachChildren(ele => {\n              ele.trigger(ename, mapEvent);\n            });\n          });\n        });\n        canvas.addEventListener('mousedown', ev => {\n          this.mouseDownTime = Date.now();\n          this.mouseDown = true;\n        });\n        canvas.addEventListener('mouseup', ev => {\n          this.mouseDown = false;\n        });\n        this.customCanvasLayer = layer;\n        this.ready = 1;\n        resolve();\n      });\n    });\n  }\n\n  async render() {\n    this.renderFlag = true;\n    setTimeout(() => {\n      if (this.renderFlag) {\n        this.renderFlag = false;\n        this.renderedImg = null;\n        this.customCanvasLayer.render({\n          callByMap: false\n        });\n      }\n    });\n  }\n\n  contain(pos) {\n    return false;\n  }\n\n  makeBounds() {\n    return null;\n  }\n\n  pixelToLngLat(x, y) {\n    let [sw, ne] = this.bounds;\n    let lngRatio = x / this.canvas.width;\n    let latRatio = y / this.canvas.height;\n    let lng = (ne[0] - sw[0]) * lngRatio + sw[0];\n    let lat = (ne[1] - sw[1]) * (1 - latRatio) + sw[1];\n    return [lng, lat];\n  }\n\n  lnglatToPixel(lnglat) {\n    let [sw, ne] = this.bounds;\n    let lngRatio = (lnglat[0] - sw[0]) / (ne[0] - sw[0]);\n    let latRatio = (lnglat[1] - sw[1]) / (ne[1] - sw[1]); // let x = Math.round(lngRatio * this.canvas.width)\n    // let y = Math.round((1 - latRatio) * this.canvas.height)\n\n    let x = lngRatio * this.canvas.width;\n    let y = (1 - latRatio) * this.canvas.height;\n    return {\n      x,\n      y\n    };\n  }\n\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (new MapView());\n\n//# sourceURL=webpack:///./src/MapView.ts?");

/***/ }),

/***/ "./src/Models.ts":
/*!***********************!*\
  !*** ./src/Models.ts ***!
  \***********************/
/*! exports provided: MapEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MapEvent\", function() { return MapEvent; });\nclass MapEvent extends MouseEvent {\n  static create(mouseEv, pos, extData) {\n    let mapEv = mouseEv;\n    mapEv.extData = extData;\n    mapEv.pos = pos;\n    return mapEv;\n  }\n\n}\n\n//# sourceURL=webpack:///./src/Models.ts?");

/***/ }),

/***/ "./src/Shapes/Circle.ts":
/*!******************************!*\
  !*** ./src/Shapes/Circle.ts ***!
  \******************************/
/*! exports provided: Circle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Circle\", function() { return Circle; });\n/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils */ \"./src/Utils/index.ts\");\n/* harmony import */ var _MapElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../MapElement */ \"./src/MapElement.ts\");\n\n\nclass Circle extends _MapElement__WEBPACK_IMPORTED_MODULE_1__[\"MapElement\"] {\n  constructor(center, radius, style) {\n    super();\n    this.type = 'circle';\n    this.center = center;\n    this.radius = radius;\n    this.style = Object.assign({}, this.style, style); // this.setStyle(style)\n  }\n\n  async render(rctx) {\n    const {\n      ctx\n    } = rctx;\n    let style = this.style;\n    ctx.fillStyle = style.fillColor;\n    ctx.strokeStyle = style.strokeColor;\n    ctx.lineWidth = style.strokeWidth;\n    ctx.beginPath(); // let center = this.map.lngLatToContainer(new AMap.LngLat(shape.center[0], shape.center[1]))\n\n    let centerPixel = this.view.lnglatToPixel(this.center); // 计算一个比例，将实际距离转换为页面距离。由于纬度是均匀的，使用纬度\n\n    let loc1 = this.center;\n    let p1 = centerPixel;\n    let loc2 = this.center.map(v => v);\n\n    if (loc2[1] >= 89) {\n      loc2[1] -= 1;\n    } else {\n      loc2[1] += 1;\n    }\n\n    let p2 = this.view.lnglatToPixel(loc2);\n    let locDistance = Object(_Utils__WEBPACK_IMPORTED_MODULE_0__[\"mapDistance\"])(loc1, loc2);\n    let pDistance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));\n    let ratio = pDistance / locDistance;\n    let r = this.radius * ratio;\n    ctx.arc(centerPixel.x, centerPixel.y, r, 0, 2 * Math.PI);\n    ctx.closePath();\n    ctx.stroke();\n    ctx.fill();\n    return super.render(rctx);\n  }\n\n  contain(pos) {\n    let [x, y] = pos;\n    return Object(_Utils__WEBPACK_IMPORTED_MODULE_0__[\"mapDistance\"])(pos, this.center) < this.radius;\n  }\n\n  makeBounds() {\n    return [[this.center[0] - this.radius, this.center[1] - this.radius], [this.center[0] + this.radius, this.center[1] + this.radius]];\n  }\n\n}\n\n//# sourceURL=webpack:///./src/Shapes/Circle.ts?");

/***/ }),

/***/ "./src/Shapes/Marker.ts":
/*!******************************!*\
  !*** ./src/Shapes/Marker.ts ***!
  \******************************/
/*! exports provided: Marker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Marker\", function() { return Marker; });\n/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/Utils */ \"./src/Utils/index.ts\");\n/* harmony import */ var _MapElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../MapElement */ \"./src/MapElement.ts\");\n\n\nclass Marker extends _MapElement__WEBPACK_IMPORTED_MODULE_1__[\"MapElement\"] {\n  constructor(location, style, image) {\n    super();\n    this.pixel = {\n      x: 0,\n      y: 0\n    };\n    this.type = 'marker';\n    this.location = location;\n    this.style = Object.assign({}, this.style, style);\n    this.image = image;\n  }\n\n  async render(rctx) {\n    if (!this.visible) {\n      return null;\n    }\n\n    let ctx = rctx.ctx;\n    ctx.fillStyle = this.style.fillColor;\n    ctx.strokeStyle = this.style.strokeColor;\n    ctx.lineWidth = this.style.strokeWidth;\n\n    if (this.style.opacity) {\n      ctx.globalAlpha = this.style.opacity;\n    }\n\n    let pixel = this.view.lnglatToPixel(this.location);\n    this.pixel = pixel;\n    let ratio = 1;\n\n    if (this.scale) {\n      ratio = this.scale(this.view.zoomLevel);\n    }\n\n    if (this.image) {\n      let height = this.image.height || this.image.imgData.height;\n      let width = this.image.width || this.image.imgData.width;\n      ctx.drawImage(this.image.imgData, pixel.x - width / 2, pixel.y - height / 2, width * ratio, height * ratio);\n    } else {\n      ctx.beginPath();\n      ctx.arc(pixel.x, pixel.y, this.style.strokeWidth * ratio, 0, 2 * Math.PI);\n      ctx.stroke();\n    }\n\n    return super.render(rctx);\n  }\n\n  contain(pos, pixel) {\n    return Object(_Utils__WEBPACK_IMPORTED_MODULE_0__[\"distance\"])(pixel, this.pixel) < this.style.strokeWidth;\n  }\n\n  makeBounds() {\n    return null;\n  }\n\n}\n\n//# sourceURL=webpack:///./src/Shapes/Marker.ts?");

/***/ }),

/***/ "./src/Shapes/PolyLine.ts":
/*!********************************!*\
  !*** ./src/Shapes/PolyLine.ts ***!
  \********************************/
/*! exports provided: Line */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Line\", function() { return Line; });\n/* harmony import */ var _MapElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../MapElement */ \"./src/MapElement.ts\");\n/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utils */ \"./src/Utils/index.ts\");\n\n\nclass Line extends _MapElement__WEBPACK_IMPORTED_MODULE_0__[\"MapElement\"] {\n  constructor(path, style) {\n    super();\n    this.path = [];\n    this.containerPath = [];\n    this.pixelPath = [];\n    this.path = path;\n    this.type = 'line';\n    this.style = Object.assign({}, this.style, style); // this.setStyle(style)\n  }\n\n  async render(rctx) {\n    let ctx = rctx.ctx;\n    ctx.fillStyle = this.style.fillColor;\n    ctx.strokeStyle = this.style.strokeColor;\n    ctx.lineWidth = this.style.strokeWidth;\n\n    if (this.style.opacity) {\n      ctx.globalAlpha = this.style.opacity;\n    }\n\n    ctx.beginPath();\n\n    for (let i = 0; i < this.path.length; i++) {\n      let p = this.path[i];\n      let pixel = this.view.lnglatToPixel(p);\n      let screenPos = [pixel.x, pixel.y];\n      this.pixelPath.push(screenPos);\n      ctx.lineTo(pixel.x, pixel.y);\n    }\n\n    ctx.stroke();\n    return super.render(rctx);\n  }\n\n  contain(pos) {\n    return false;\n  }\n\n  makeBounds() {\n    return Object(_Utils__WEBPACK_IMPORTED_MODULE_1__[\"makePolyBounds\"])(this.path);\n  }\n\n}\n\n//# sourceURL=webpack:///./src/Shapes/PolyLine.ts?");

/***/ }),

/***/ "./src/Shapes/Polygon.ts":
/*!*******************************!*\
  !*** ./src/Shapes/Polygon.ts ***!
  \*******************************/
/*! exports provided: Polygon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Polygon\", function() { return Polygon; });\n/* harmony import */ var _Utils_windingLine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils/windingLine */ \"./src/Utils/windingLine.ts\");\n/* harmony import */ var _MapElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../MapElement */ \"./src/MapElement.ts\");\n/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utils */ \"./src/Utils/index.ts\");\n\n\n\nconst EPSILON = 1e-8;\n\nfunction isAroundEqual(a, b) {\n  return Math.abs(a - b) < EPSILON;\n}\n\nclass Polygon extends _MapElement__WEBPACK_IMPORTED_MODULE_1__[\"MapElement\"] {\n  constructor(path, style) {\n    super();\n    this.path = [];\n    this.h3Index = '';\n    this.path = path;\n    this.type = 'polygon';\n    this.style = Object.assign({}, this.style, style); // this.setStyle(style)\n  }\n\n  async render(rctx) {\n    let ctx = rctx.ctx;\n    ctx.fillStyle = this.style.fillColor;\n    ctx.strokeStyle = this.style.strokeColor;\n    ctx.lineWidth = this.style.strokeWidth;\n\n    if (this.style.opacity) {\n      ctx.globalAlpha = this.style.opacity;\n    }\n\n    ctx.beginPath();\n\n    for (let i = 0; i < this.path.length; i++) {\n      let p = this.path[i];\n      let pixel = this.view.lnglatToPixel(p);\n      let screenPos = [pixel.x, pixel.y];\n      ctx.lineTo(pixel.x, pixel.y);\n    }\n\n    ctx.closePath();\n    ctx.fill();\n    ctx.stroke();\n    return super.render(rctx);\n  }\n\n  contain(pos) {\n    // console.log(pos, this.path)\n    let x = pos[0],\n        y = pos[1];\n    var w = 0;\n    let points = this.path;\n    var p = points[0];\n\n    if (!p) {\n      return false;\n    }\n\n    for (var i = 1; i < points.length; i++) {\n      var p2 = points[i];\n      w += Object(_Utils_windingLine__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(p[0], p[1], p2[0], p2[1], x, y);\n      p = p2;\n    } // Close polygon\n\n\n    var p0 = points[0];\n\n    if (!isAroundEqual(p[0], p0[0]) || !isAroundEqual(p[1], p0[1])) {\n      w += Object(_Utils_windingLine__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(p[0], p[1], p0[0], p0[1], x, y);\n    }\n\n    return w !== 0;\n  }\n\n  makeBounds() {\n    return Object(_Utils__WEBPACK_IMPORTED_MODULE_2__[\"makePolyBounds\"])(this.path);\n  }\n\n}\n\n//# sourceURL=webpack:///./src/Shapes/Polygon.ts?");

/***/ }),

/***/ "./src/Utils/color.ts":
/*!****************************!*\
  !*** ./src/Utils/color.ts ***!
  \****************************/
/*! exports provided: hex2rgb, rgb2hex, toRGBA, generateColor, generateColors, lighter, calcColorLevel, colorUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hex2rgb\", function() { return hex2rgb; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"rgb2hex\", function() { return rgb2hex; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toRGBA\", function() { return toRGBA; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generateColor\", function() { return generateColor; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generateColors\", function() { return generateColors; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"lighter\", function() { return lighter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"calcColorLevel\", function() { return calcColorLevel; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"colorUtils\", function() { return colorUtils; });\nconst hex2rgb = (hex, alpha = 1) => {\n  if (hex.length === 4) {\n    hex = '#' + hex.charAt(1) + hex.charAt(1) + hex.charAt(2) + hex.charAt(2) + hex.charAt(3) + hex.charAt(3);\n  }\n\n  return `rgba(${parseInt(hex.substr(1, 2), 16)},${parseInt(hex.substr(3, 2), 16)},${parseInt(hex.substr(5, 2), 16)},${alpha})`;\n};\nconst rgb2hex = rgb => {\n  let values = rgb.substring(rgb.indexOf('(') + 1, rgb.length - 1).split(',');\n\n  const convert = v => Number(v).toString(16).padStart(2, '0');\n\n  return `#${convert(values[0])}${convert(values[1])}${convert(values[2])}`;\n};\nconst toRGBA = (val, alpha = 1) => {\n  if (val.indexOf('#') === 0) {\n    return hex2rgb(val, alpha);\n  } else if (val.indexOf('rgb') === 0) {\n    return hex2rgb(rgb2hex(val), alpha);\n  }\n};\nconst generateColor = (alpha = 1) => {\n  const hue = 199;\n  return `rgba(${Math.round(Math.random() * hue)},${Math.round(Math.random() * hue)},${Math.round(Math.random() * hue)}, ${alpha})`;\n};\nconst generateColors = (num = 1, alpha = 1) => {\n  let arr = [];\n\n  for (let i = 1; i < num; i++) {\n    arr.push(generateColor());\n  }\n\n  return arr;\n};\nconst lighter = (color, deg) => {\n  let rgb = toRGBA(color);\n  let values = rgb.substring(rgb.indexOf('(') + 1, rgb.length - 1).split(',');\n  let lvalues = values.map(vstr => {\n    let v = Number(vstr);\n    v *= deg;\n\n    if (v > 255) {\n      v = 255;\n    }\n\n    return v;\n  });\n  return `rgba(${lvalues[0]},${lvalues[1]},${lvalues[2]},${values[3]})`;\n};\nconst calcColorLevel = (val, max, calcType = 'linear', base = Math.E) => {\n  let ratio;\n\n  if (calcType === 'linear') {\n    return val / max;\n  }\n\n  if (calcType === 'log10') {\n    ratio = val / max * 9 + 1;\n    return Math.log10(ratio);\n  } else if (calcType === 'log2') {\n    ratio = val / max + 1;\n    return Math.log2(ratio);\n  } else if (calcType === 'ln') {\n    ratio = val / max * (Math.E - 1) + 1;\n    return Math.log(ratio);\n  } else if (calcType === 'logx') {\n    ratio = val / max * (base - 1) + 1;\n    return Math.log(ratio) / Math.log(base);\n  }\n};\nconst colorUtils = {\n  calcColorLevel,\n  generateColor,\n  hex2rgb,\n  rgb2hex,\n  toRGBA,\n  lighter\n};\n\n//# sourceURL=webpack:///./src/Utils/color.ts?");

/***/ }),

/***/ "./src/Utils/index.ts":
/*!****************************!*\
  !*** ./src/Utils/index.ts ***!
  \****************************/
/*! exports provided: mapDistance, distance, zoomLevels, makePolyBounds, isShape */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mapDistance\", function() { return mapDistance; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"distance\", function() { return distance; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"zoomLevels\", function() { return zoomLevels; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"makePolyBounds\", function() { return makePolyBounds; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isShape\", function() { return isShape; });\nconst mapDistance = (p1, p2) => {\n  const Pu = 0.017453292519943295;\n  const TQ = 6378137;\n  var d = Pu,\n      e = Math.cos,\n      f = p1[0] * d,\n      h = p2[0] * d,\n      k = 2 * TQ,\n      d = p1[1] * d - p2[1] * d;\n  let ee = (1 - e(h - f) + (1 - e(d)) * e(f) * e(h)) / 2;\n  return k * Math.asin(Math.sqrt(ee));\n};\nfunction distance(p1, p2) {\n  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));\n}\nconst zoomLevels = [];\nlet rad = 180;\n\nfor (let i = 0; i < 15; i++) {\n  zoomLevels.push(rad);\n  rad /= 3;\n}\n\nfunction makePolyBounds(path) {\n  let min = [180, 90],\n      max = [-180, -90];\n  path.forEach(p => {\n    min[0] = Math.min(p[0], min[0]);\n    min[1] = Math.min(p[1], min[1]);\n    max[0] = Math.max(p[0], max[0]);\n    max[1] = Math.max(p[1], max[1]);\n  });\n  return [min, max];\n}\nfunction isShape(ele) {\n  return ele.type == 'polygon' || ele.type == 'circle' || ele.type == 'line' || ele.type == 'marker';\n}\n\n//# sourceURL=webpack:///./src/Utils/index.ts?");

/***/ }),

/***/ "./src/Utils/sortedMap.ts":
/*!********************************!*\
  !*** ./src/Utils/sortedMap.ts ***!
  \********************************/
/*! exports provided: SortedMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SortedMap\", function() { return SortedMap; });\nclass SortedMap {\n  constructor() {\n    this.obj = {};\n  }\n\n  set(k, v) {\n    this.obj[k] = v;\n  }\n\n  get(k) {\n    return this.obj[k];\n  }\n\n  forEach(cb) {\n    for (let k in this.obj) {\n      let flag = cb(this.obj[k], k);\n\n      if (flag === false) {\n        break;\n      }\n    }\n  }\n\n  map(cb) {\n    let res = [];\n\n    for (let k in this.obj) {\n      res.push(cb(this.obj[k], k));\n    }\n\n    return res;\n  }\n\n}\n\n//# sourceURL=webpack:///./src/Utils/sortedMap.ts?");

/***/ }),

/***/ "./src/Utils/windingLine.ts":
/*!**********************************!*\
  !*** ./src/Utils/windingLine.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return windingLine; });\nfunction windingLine(x0, y0, x1, y1, x, y) {\n  if (y > y0 && y > y1 || y < y0 && y < y1) {\n    return 0;\n  } // Ignore horizontal line\n\n\n  if (y1 === y0) {\n    return 0;\n  }\n\n  var dir = y1 < y0 ? 1 : -1;\n  var t = (y - y0) / (y1 - y0); // Avoid winding error when intersection point is the connect point of two line of polygon\n\n  if (t === 1 || t === 0) {\n    dir = y1 < y0 ? 0.5 : -0.5;\n  }\n\n  var x_ = t * (x1 - x0) + x0; // If (x, y) on the line, considered as \"contain\".\n\n  return x_ === x ? Infinity : x_ > x ? dir : 0;\n}\n\n//# sourceURL=webpack:///./src/Utils/windingLine.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: MapEvent, MapView, Circle, Line, Marker, Polygon, Layer, MarkerLayer, colorUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _MapView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MapView */ \"./src/MapView.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"MapView\", function() { return _MapView__WEBPACK_IMPORTED_MODULE_0__[\"MapView\"]; });\n\n/* harmony import */ var _Shapes_Circle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Shapes/Circle */ \"./src/Shapes/Circle.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Circle\", function() { return _Shapes_Circle__WEBPACK_IMPORTED_MODULE_1__[\"Circle\"]; });\n\n/* harmony import */ var _Shapes_PolyLine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Shapes/PolyLine */ \"./src/Shapes/PolyLine.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Line\", function() { return _Shapes_PolyLine__WEBPACK_IMPORTED_MODULE_2__[\"Line\"]; });\n\n/* harmony import */ var _Shapes_Marker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Shapes/Marker */ \"./src/Shapes/Marker.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Marker\", function() { return _Shapes_Marker__WEBPACK_IMPORTED_MODULE_3__[\"Marker\"]; });\n\n/* harmony import */ var _Shapes_Polygon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Shapes/Polygon */ \"./src/Shapes/Polygon.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Polygon\", function() { return _Shapes_Polygon__WEBPACK_IMPORTED_MODULE_4__[\"Polygon\"]; });\n\n/* harmony import */ var _Utils_color__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Utils/color */ \"./src/Utils/color.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"colorUtils\", function() { return _Utils_color__WEBPACK_IMPORTED_MODULE_5__[\"colorUtils\"]; });\n\n/* harmony import */ var _Models__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Models */ \"./src/Models.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"MapEvent\", function() { return _Models__WEBPACK_IMPORTED_MODULE_6__[\"MapEvent\"]; });\n\n/* harmony import */ var _Layer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Layer */ \"./src/Layer.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Layer\", function() { return _Layer__WEBPACK_IMPORTED_MODULE_7__[\"Layer\"]; });\n\n/* harmony import */ var _Layers_MarkerLayer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Layers/MarkerLayer */ \"./src/Layers/MarkerLayer.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"MarkerLayer\", function() { return _Layers_MarkerLayer__WEBPACK_IMPORTED_MODULE_8__[\"MarkerLayer\"]; });\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });
});