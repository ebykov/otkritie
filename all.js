var Otkritie =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * Configuration
 */

var secure = window.location.protocol === 'https:';

module.exports = {
    name: 'likely',
    prefix: 'likely__',
    secure: secure,
    protocol: secure ? 'https:' : 'http:',
    storageKey: 'likelyServices',
    breakpoint: 680
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var config = __webpack_require__(0);

var div = document.createElement('div'),
    gid = 0;

var dom = module.exports = {
    /**
     * Wrap SVG coords from data object into SVG tag
     *
     * @param {String} coords
     */
    wrapSVG: function (coords) {
        return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" ' + 'viewBox="0 0 16 16"><path d="M' + coords + 'z"/></svg>';
    },

    /**
     * Create node from HTML
     *
     * @param {String} html
     */
    createNode: function (html) {
        div.innerHTML = html;

        return div.children[0];
    },

    /**
     * Load script
     *
     * @param {String} url
     */
    getScript: function (url) {
        var script = document.createElement('script'),
            head   = document.head;

        script.type = 'text/javascript';
        script.src  = url;

        head.appendChild(script);
        head.removeChild(script);
    },

    /**
     * Get JSON
     *
     * @param {String} url
     * @param {Function} callback
     */
    getJSON: function (url, callback) {
        var name = encodeURIComponent('random_fun_' + (++gid));

        url = url.replace(
            /callback=(\?)/,
            'callback=' + name
        );

        window[name] = callback;

        dom.getScript(url);
    },

    /**
     * Find first node by selector
     *
     * @param {String} selector
     * @param {Node} node
     * @return {Node}
     */
    find: function (selector, node) {
        return (node || document).querySelector(selector);
    },

    /**
     * Find all nodes by selector
     *
     * @param {String} selector
     * @param {Node} node
     * @return {NodeList}
     */
    findAll: function (selector, node) {
        return (node || document).querySelectorAll(selector);
    },

    /**
     * Check mobile media query
     */
    isMobile: function() {
        return !window.matchMedia('(min-width: ' + config.breakpoint + 'px)').matches;
    },

    /**
     * Open the popup
     *
     * @param {String} url
     * @param {String} winId
     * @param {Number} width,
     * @param {Number} height
     */
    openPopup: function (url, winId, width, height) {
        var left = Math.round(screen.width / 2 - width / 2),
            top  = 0;

        if (screen.height > height) {
            top = Math.round(screen.height / 3 - height / 2);
        }

        var options = 'left='    + left +
                      ',top='    + top +
                      ',width='  + width +
                      ',height=' + height +
                      ',personalbar=0,toolbar=0,scrollbars=1,resizable=1';

        var win = window.open(url, winId, options);

        // if (!win) {
        //     location.href = url;
        //     return location.href;
        // }

        // win.focus();

        return win;
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var bool = {yes: true, no: false},
    rUrl = /(https?|ftp):\/\/[^\s\/$.?#].[^\s]*/gi;

/**
 * @internal
 */
var utils = {
    /**
     * Simple $.each, only for objects
     *
     * @param {Object} object
     * @param {Function} callback
     */
    each: function (object, callback) {
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                callback(object[key], key);
            }
        }
    },

    /**
     * Convert array-like object to array
     *
     * @param {Object} arrayLike
     * @return {Array}
     */
    toArray: function (arrayLike) {
        return Array.prototype.slice.call(arrayLike);
    },

    /**
     * Merge given dictionaries (objects) into one object
     *
     * @param {Object} ...objects
     * @return {Object}
     */
    merge: function () {
        var result = {};

        for (var i = 0; i < arguments.length; i ++) {
            var arg = arguments[i];

            if (arg) {
                for (var key in arg) {
                    result[key] = arg[key];
                }
            }
        }

        return result;
    },

    /**
     * Extend one (target) object by other (subject)
     *
     * @param {Object} target
     * @param {Object} subject
     */
    extend: function (target, subject) {
        for (var key in subject) {
            target[key] = subject[key];
        }
    },

    /**
     * Check new flexbox syntax support
     */
    flexboxSupport: function(element, name){
        var d = document, f = 'flex', fw = '-webkit-'+f, e = d.createElement('b'), c;

        try {
            e.style.display = fw;
            e.style.display = f;
            c = (e.style.display == f || e.style.display == fw) ? f : 'no-'+f;
        } catch(e) {
            c = 'no-'+f;
        }

        element.className += ' ' + name + '--' + c;
    },

    /**
     * Return node.dataset or plain object for IE 10without setters
     * based on https://gist.github.com/brettz9/4093766#file_html5_dataset.js
     *
     * @param {Node} node
     * @return {Object}
     */
    getDataset: function (node) {
        if (typeof node.dataset === 'object') {
            return node.dataset;
        }

        var i,
            dataset = {},
            attributes = node.attributes,
            attribute,
            attributeName;

        var toUpperCase = function (n0) {
            return n0.charAt(1).toUpperCase();
        };

        for (i = attributes.length - 1; i >= 0; i--) {
            attribute = attributes[i];
            if (attribute && attribute.name &&
                (/^data-\w[\w\-]*$/).test(attribute.name)) {
                    attributeName = attribute.name.substr(5).replace(/-./g, toUpperCase);
                    dataset[attributeName] = attribute.value;
                }
        }

        return dataset;
    },

    /**
     * Convert "yes" and "no" to true and false.
     *
     * @param {Node} node
     */
    bools: function (node) {
        var result = {},
            data   = utils.getDataset(node);

        for (var key in data) {
            var value = data[key];

            result[key] = bool[value] || value;
        }

        return result;
    },

    /**
     * Map object keys in string to its values
     *
     * @param {String} text
     * @param {Object} data
     * @return {String}
     */
    template: function (text, data) {
        return !text ? '' : text.replace(/\{([^\}]+)\}/g, function (value, key) {
            return key in data ? data[key] : value;
        });
    },

    /**
     * Map object keys in URL to its values
     *
     * @param {String} text
     * @param {Object} data
     * @return {String}
     */
    makeUrl: function (text, data) {
        for (var key in data) {
            data[key] = encodeURIComponent(data[key]);
        }

        return utils.template(text, data);
    },

    /**
     * Create query string out of data
     *
     * @param {Object} data
     * @return {String}
     */
    query: function (data) {
        var filter = encodeURIComponent,
            query  = [];

        for (var key in data) {
            if (typeof data[key] === 'object') continue;

            query.push(filter(key) + '=' + filter(data[key]));
        }

        return query.join('&');
    },

    /**
     * Set value in object using dot-notation
     *
     * @param {Object} object
     * @param {String} key
     * @param {Object} value
     */
    set: function (object, key, value) {
        var frags = key.split('.'),
            last  = null;

        frags.forEach(function (key, index) {
            if (typeof object[key] === 'undefined') {
                object[key] = {};
            }

            if (index !== frags.length - 1) {
                object = object[key];
            }

            last = key;
        });

        object[last] = value;
    }
};

module.exports = utils;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sendPageView = exports.sendEvent = undefined;

var _config = __webpack_require__(5);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONSOLE_STYLE = 'color: #E87E04';

/**
 * Send analytics events via GTM
 * @param {String} label - event label
 * @param {String} action - event action ("Click" by default)
 */
var sendEvent = exports.sendEvent = function sendEvent(label) {
    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Click';

    var value = _config2.default.analyticsCategory + ' \u2014 ' + label + ' \u2014 ' + action;

    if (false) {}

    if (window.dataLayer !== undefined && _config2.default.analyticsCategory) {
        window.dataLayer.push({
            event: 'data_event',
            data_description: value
        });
    }
};

/**
 * Send pageview event via GTM
 */
var sendPageView = exports.sendPageView = function sendPageView() {
    if (false) {}

    if (window.dataLayer !== undefined) {
        window.dataLayer.push({
            event: 'Page — View',
            post_details: {},
            section: 'special',
            tags: [],
            title: document.title,
            url: window.location.pathname
        });
    }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Social network services
 */

var Service = __webpack_require__(20),
    utils   = __webpack_require__(2),
    svg     = __webpack_require__(21);

var services = {
    odnoklassniki: __webpack_require__(22),
    vkontakte:     __webpack_require__(23),
    facebook:      __webpack_require__(24),
    twitter:       __webpack_require__(25),
    gplus:         __webpack_require__(26),
    pocket:        __webpack_require__(27),
    telegram:      __webpack_require__(28),
    whatsapp:      __webpack_require__(29),
    viber:         __webpack_require__(30),
    email:         __webpack_require__(31),
    more:          __webpack_require__(32)
};

utils.each(services, function (service, key) {
    Service(service);

    service.svgi = svg[key];
    service.name = key;
});

module.exports = services;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'Otkritie', // уникальное имя спецпроекта. Оно же — название главного класса. Используется на странице, куда интегрируется спецпроект
  analyticsCategory: 'Bank Otkritie',
  sendPageView: false, // отключаем, если спецпроект не на отдельной странице
  listenedEvents: ['click'] // слушаем события (click, input, change, etc.). Обычно нужен только click
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Make html element
 * @param {String} tagName
 * @param {Array|String} classNames - array of classnames or string for single classname
 * @param {Object} attributes - object with html attributes
 */
var makeElement = exports.makeElement = function makeElement(tagName) {
    var classNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    tagName = tagName.toLowerCase();

    var element = document.createElement(tagName);

    if (classNames) {
        if ((typeof classNames === 'undefined' ? 'undefined' : _typeof(classNames)) === 'object') {
            classNames.forEach(function (cname) {
                element.classList.add(cname);
            });
        } else if (typeof classNames === 'string') {
            element.classList.add(classNames);
        }
    }

    for (var attr in attributes) {
        if (attr === 'data') {
            var dataAttributes = attributes[attr];

            for (var _attr in dataAttributes) {
                element.dataset[_attr] = dataAttributes[_attr];
            }
        } else {
            element[attr] = attributes[attr];
        }
    }

    return element;
};

/**
 * Cache elements with [data-view] attribute and put them in given object
 * @param {Object} obj - object
 */
var cacheElements = exports.cacheElements = function cacheElements(obj) {
    var attr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'view';

    var newObj = {},
        elements = document.querySelectorAll('[data-' + attr + ']');

    Array.prototype.forEach.call(elements, function (el) {
        var name = el.dataset[attr];
        newObj[name] = el;
    });

    Object.assign(obj, newObj);
};

/**
 * Get all siblings of specified element, excluding this element
 * @param {Element} element
 */
var getSiblings = exports.getSiblings = function getSiblings(element) {
    var siblings = [],
        sibling = element.parentNode.firstChild;

    for (; sibling; sibling = sibling.nextSibling) {
        if (sibling.nodeType !== 1 || sibling === element) continue;
        siblings.push(sibling);
    }

    return siblings;
};

/**
 * Remove all children from element
 * @param {Element} parent
 */
var removeChildren = exports.removeChildren = function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};

/**
 * Remove specified element from its parent
 * @param {Element} element
 */
var removeElement = exports.removeElement = function removeElement(element) {
    if (element) {
        element.parentNode.removeChild(element);
    }
};

/**
 * Transform html string to node
 * @param {String} html
 */
var htmlStringToNode = exports.htmlStringToNode = function htmlStringToNode(html) {
    var el = document.createElement('div');

    el.innerHTML = html;

    return el.firstChild;
};

/**
 * Prepend source element before first child of target element
 * @param {Element} parent
 * @param {Element} el
 */
var prepend = exports.prepend = function prepend(parent, el) {
    parent.insertBefore(el, parent.firstChild);
};

/** Quick check if element is in DOM */
var isElementInDom = exports.isElementInDom = function isElementInDom(el) {
    return el.parentNode;
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var isAvailable = function() {

    try {
        window.localStorage.setItem('isStorageAvailable', 1);
        window.localStorage.removeItem('isStorageAvailable');
        return true;
    } catch (e) {
        return false;
    }

};

var storage = {

    /**
     * Get item from localStorage
     * @param {String} key
     */
    getItem: function(key){

        if (isAvailable()) {

            var item = window.localStorage.getItem(key);

            try {
                JSON.parse(item);
            } catch (e) {
                return item;
            }

            return JSON.parse(item);

        }

    },

    /**
     * Save item in localStorage
     * @param {String} key
     * @param {String} value
     */
    setItem: function(key, value) {

        value = (typeof value === 'string') ? value : JSON.stringify(value);

        if (isAvailable()) {
            window.localStorage.setItem(key, value);
        }

    },

    /**
     * Remove item from localStorage
     * @param {String} key
     */
    removeItem: function(key) {

        if (isAvailable()) {
            window.localStorage.removeItem(key);
        }

    }

};

module.exports = storage;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function requestAnimate(options) {

    var start = performance.now();

    requestAnimationFrame(function animate(time) {
        var timeFraction = (time - start) / options.duration;
        if (timeFraction > 1) timeFraction = 1;

        var progress = options.timing(timeFraction);

        options.draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}

function one(node, type, callback) {
    type = type.split(' ');

    var _loop = function _loop(i) {
        var func = function func(e) {
            for (var j = 0; j < type.length; j++) {
                e.currentTarget.removeEventListener(type[j], func);
            }
            return callback(e);
        };
        node.addEventListener(type[i], func, false);
    };

    for (var i = 0; i < type.length; i++) {
        _loop(i);
    }
}

function animate(elem, className) {
    var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var delay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    return new Promise(function (resolve, reject) {
        one(elem, 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            if (duration) {
                elem.style.animationDuration = '';
            }
            if (delay) {
                elem.style.animationDelay = '';
            }
            elem.classList.remove(className);
            elem.classList.remove('animated');

            resolve();
        });

        if (duration) {
            elem.style.animationDuration = duration;
        }
        if (delay) {
            elem.style.animationDelay = delay;
        }

        elem.classList.add(className);
        elem.classList.add('animated');
    });
}

exports.animate = animate;
exports.requestAnimate = requestAnimate;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _special = __webpack_require__(10);

var _special2 = _interopRequireDefault(_special);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports.Special = _special2.default; /**
                                             * Entry point
                                             */

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(11);

var _base = __webpack_require__(13);

var _base2 = _interopRequireDefault(_base);

var _data = __webpack_require__(14);

var _data2 = _interopRequireDefault(_data);

var _svg = __webpack_require__(15);

var _svg2 = _interopRequireDefault(_svg);

var _dom = __webpack_require__(6);

var _share = __webpack_require__(16);

var Share = _interopRequireWildcard(_share);

var _animate = __webpack_require__(8);

var _swipe = __webpack_require__(35);

var _swipe2 = _interopRequireDefault(_swipe);

var _analytics = __webpack_require__(3);

var Analytics = _interopRequireWildcard(_analytics);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CSS = {
  main: 'otkritie'
};

var EL = {};
var IMAGES = {};

var Special = function (_BaseSpecial) {
  _inherits(Special, _BaseSpecial);

  function Special() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Special);

    var _this = _possibleConstructorReturn(this, (Special.__proto__ || Object.getPrototypeOf(Special)).call(this));

    Object.assign(_this.params, params);
    _this.saveParams();

    if (_data2.default && params.data) {
      Object.assign(_data2.default, params.data);
    }

    _this.keyUpHandler = _this.keyUpHandler.bind(_this);

    if (_this.params.css) {
      _this.loadStyles(_this.params.css).then(function () {
        return _this.init();
      });
    } else {
      _this.init();
    }
    return _this;
  }

  _createClass(Special, [{
    key: 'createElements',
    value: function createElements() {
      var _this2 = this;

      EL.logo = (0, _dom.makeElement)('a', CSS.main + '__logo', {
        href: 'https://www.open.ru/',
        target: '_blank',
        innerHTML: _svg2.default.logo
      });

      EL.q = (0, _dom.makeElement)('div', CSS.main + '__question');

      EL.controls = (0, _dom.makeElement)('div', CSS.main + '__controls');
      EL.optionL = (0, _dom.makeElement)('div', CSS.main + '__option', {
        innerHTML: '<button class="' + CSS.main + '__btn">' + _svg2.default.no + '</button>',
        data: {
          type: 'left'
        }
      });
      EL.optionR = (0, _dom.makeElement)('div', CSS.main + '__option', {
        innerHTML: '<button class="' + CSS.main + '__btn">' + _svg2.default.yes + '</button>',
        data: {
          type: 'right'
        }
      });

      EL.nextBtn = (0, _dom.makeElement)('button', CSS.main + '__btn', {
        textContent: 'Далее',
        data: {
          click: 'continue'
        }
      });

      EL.optionL.addEventListener('click', function () {
        _this2.answer('left');
      });
      EL.optionR.addEventListener('click', function () {
        _this2.answer('right');
      });

      EL.cards = (0, _dom.makeElement)('div', CSS.main + '__cards');
      EL.nextCards = (0, _dom.makeElement)('div', CSS.main + '__next-cards');

      EL.cardWrapper = (0, _dom.makeElement)('div', CSS.main + '__card-wrapper');
      EL.cardInner = (0, _dom.makeElement)('div', CSS.main + '__card-inner');

      EL.card = (0, _dom.makeElement)('div', CSS.main + '-card');
      EL.cPages = (0, _dom.makeElement)('div', CSS.main + '-card__pages');
      EL.cHead = (0, _dom.makeElement)('div', CSS.main + '-card__head');
      EL.cBottom = (0, _dom.makeElement)('div', CSS.main + '-card__bottom');
      EL.cTextFrom = (0, _dom.makeElement)('div', CSS.main + '-card__text-from');
      EL.cTextTo = (0, _dom.makeElement)('div', CSS.main + '-card__text-to');
      EL.cImgFrom = (0, _dom.makeElement)('img', CSS.main + '-card__img-from');
      EL.cImgTo = (0, _dom.makeElement)('img', CSS.main + '-card__img-to');

      EL.cHead.appendChild(EL.cTextFrom);
      EL.cHead.appendChild(EL.cImgFrom);
      EL.cBottom.appendChild(EL.cTextTo);
      EL.cBottom.appendChild(EL.cImgTo);

      EL.card.appendChild(EL.cPages);
      EL.card.appendChild(EL.cHead);
      EL.card.appendChild(EL.cBottom);

      EL.backCard = (0, _dom.makeElement)('div', [CSS.main + '-card', CSS.main + '-card--back']);
      EL.bcHead = (0, _dom.makeElement)('div', CSS.main + '-card__head');
      EL.bcBottom = (0, _dom.makeElement)('div', CSS.main + '-card__bottom');
      EL.bcAnswer = (0, _dom.makeElement)('div', CSS.main + '-card__answer');
      EL.bcAnswerTitle = (0, _dom.makeElement)('div', CSS.main + '-card__answer-title');
      EL.bcAnswerText = (0, _dom.makeElement)('div', CSS.main + '-card__answer-text');
      EL.bcAnswerImg = (0, _dom.makeElement)('img', CSS.main + '-card__answer-img');
      EL.bcSign = (0, _dom.makeElement)('div', CSS.main + '-card__sign');

      EL.bcAnswer.appendChild(EL.bcAnswerTitle);
      EL.bcAnswer.appendChild(EL.bcAnswerText);

      EL.bcHead.appendChild(EL.bcAnswerImg);
      EL.bcBottom.appendChild(EL.bcAnswer);

      EL.backCard.appendChild(EL.bcHead);
      EL.backCard.appendChild(EL.bcBottom);

      EL.cardInner.appendChild(EL.card);
      EL.cardInner.appendChild(EL.backCard);

      EL.cardWrapper.appendChild(EL.cardInner);

      EL.cards.appendChild(EL.nextCards);
      EL.cards.appendChild(EL.cardWrapper);

      if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        EL.card.style.webkitBackfaceVisibility = 'hidden';
        EL.backCard.style.webkitBackfaceVisibility = 'hidden';
      }

      EL.q.appendChild(EL.cards);
      EL.q.appendChild(EL.controls);

      (0, _swipe2.default)(EL.cardWrapper, function (t) {
        _this2.answer(t, 'Swipe');
      });

      EL.result = (0, _dom.makeElement)('div', CSS.main + '-result');
      EL.rHead = (0, _dom.makeElement)('div', CSS.main + '-result__head');
      EL.rHeadInner = (0, _dom.makeElement)('div', CSS.main + '-result__head-inner');
      EL.rBottom = (0, _dom.makeElement)('div', CSS.main + '-result__bottom');
      EL.rImg = (0, _dom.makeElement)('img', CSS.main + '-result__img');
      EL.rResult = (0, _dom.makeElement)('div', CSS.main + '-result__result');
      EL.rTitle = (0, _dom.makeElement)('div', CSS.main + '-result__title');
      EL.rShare = (0, _dom.makeElement)('div', CSS.main + '-result__share');
      EL.rRestartBtn = (0, _dom.makeElement)('div', CSS.main + '-result__restart-btn', {
        innerHTML: '<span>\u041F\u0440\u043E\u0439\u0442\u0438 \u0435\u0449\u0435 \u0440\u0430\u0437</span>' + _svg2.default.refresh,
        data: {
          click: 'restart'
        }
      });
      EL.rText = (0, _dom.makeElement)('div', CSS.main + '-result__text', {
        innerHTML: _data2.default.result.text
      });
      EL.rTextImg = (0, _dom.makeElement)('img', CSS.main + '-result__text-img', {
        src: _data2.default.result.img,
        srcset: _data2.default.result.img2x + ' 2x'
      });

      EL.rHeadInner.appendChild(EL.rResult);
      EL.rHeadInner.appendChild(EL.rTitle);
      EL.rHeadInner.appendChild(EL.rShare);
      EL.rHeadInner.appendChild(EL.rRestartBtn);

      EL.rHead.appendChild(EL.rImg);
      EL.rHead.appendChild(EL.rHeadInner);
      EL.rBottom.appendChild(EL.rTextImg);
      EL.rBottom.appendChild(EL.rText);

      EL.result.appendChild(EL.rHead);
      EL.result.appendChild(EL.rBottom);

      EL.help = (0, _dom.makeElement)('div', CSS.main + '-help');
      EL.hInner = (0, _dom.makeElement)('div', CSS.main + '-help__inner');
      EL.hIcon = (0, _dom.makeElement)('div', CSS.main + '-help__icon', {
        innerHTML: _svg2.default.swipe
      });
      EL.hText = (0, _dom.makeElement)('div', CSS.main + '-help__text', {
        innerHTML: '<p>Свайпайте карточку влево, если считаете, что можно.</p><p>Вправо — если нет.</p>'
      });
      EL.hBtn = (0, _dom.makeElement)('button', CSS.main + '-help__btn', {
        textContent: 'Понятно',
        data: {
          click: 'hideHelp'
        }
      });

      EL.hInner.appendChild(EL.hIcon);
      EL.hInner.appendChild(EL.hText);
      EL.hInner.appendChild(EL.hBtn);

      EL.help.appendChild(EL.hInner);

      EL.nextCard = (0, _dom.makeElement)('div', [CSS.main + '-card', CSS.main + '-card--next']);
      EL.ncHead = (0, _dom.makeElement)('div', CSS.main + '-card__head');
      EL.ncBottom = (0, _dom.makeElement)('div', CSS.main + '-card__bottom');

      EL.ncTextFrom = (0, _dom.makeElement)('div', CSS.main + '-card__text-from');
      EL.ncTextTo = (0, _dom.makeElement)('div', CSS.main + '-card__text-to');

      EL.ncImgFrom = (0, _dom.makeElement)('img', CSS.main + '-card__img-from');
      EL.ncImgTo = (0, _dom.makeElement)('img', CSS.main + '-card__img-to');

      EL.ncHead.appendChild(EL.ncTextFrom);
      EL.ncHead.appendChild(EL.ncImgFrom);

      EL.ncBottom.appendChild(EL.ncTextTo);
      EL.ncBottom.appendChild(EL.ncImgTo);

      EL.nextCard.appendChild(EL.ncHead);
      EL.nextCard.appendChild(EL.ncBottom);
    }
  }, {
    key: 'hideHelp',
    value: function hideHelp() {
      var _this3 = this;

      (0, _animate.animate)(EL.help, 'fadeOut', '200ms').then(function () {
        _this3.container.removeChild(EL.help);
      });
    }
  }, {
    key: 'showCount',
    value: function showCount() {
      var index = this.activeIndex + 1;
      (0, _dom.removeChildren)(EL.nextCards);

      if (index === _data2.default.questions.length) {
        return;
      }

      var nextCard = Special.makeNextCard(index);

      if (index === _data2.default.questions.length - 1) {
        EL.nextCards.innerHTML = '<div></div>';
        EL.nextCards.firstChild.appendChild(nextCard);
      } else if (index > _data2.default.questions.length / 2) {
        EL.nextCards.innerHTML = '<div></div><div></div>';
        EL.nextCards.firstChild.appendChild(nextCard);
      } else if (index > _data2.default.questions.length / 4) {
        EL.nextCards.innerHTML = '<div></div><div></div><div></div>';
        EL.nextCards.firstChild.appendChild(nextCard);
      } else {
        EL.nextCards.innerHTML = '<div></div><div></div><div></div><div></div>';
        EL.nextCards.firstChild.appendChild(nextCard);
      }
    }
  }, {
    key: 'onOptionHover',
    value: function onOptionHover(e) {
      if (this.isAnswered || this.activeIndex > 0) return;

      var el = e.currentTarget;
      var t = el.dataset.type;
      var hint = (0, _dom.makeElement)('div', [CSS.main + '__option-hint', CSS.main + '__option-hint--' + t], {
        innerHTML: t === 'left' ? '<div>\u0418\u043B\u0438 \u0441\u0432\u0430\u0439\u043F\u043D\u0438 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u0432\u043B\u0435\u0432\u043E</div>' + _svg2.default.swipeL : _svg2.default.swipeR + '<div>\u0418\u043B\u0438 \u0441\u0432\u0430\u0439\u043F\u043D\u0438 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u0432\u043F\u0440\u0430\u0432\u043E</div>'
      });

      el.appendChild(hint);

      var onOptionLeave = function onOptionLeave() {
        el.removeEventListener('mouseout', onOptionLeave);
        el.removeEventListener('click', onOptionLeave);
        el.removeChild(hint);
      };
      el.addEventListener('mouseout', onOptionLeave);
      el.addEventListener('click', onOptionLeave);
    }
  }, {
    key: 'start',
    value: function start() {
      // this.container.classList.add('is-testing');

      this.makeNextQuestion();

      if (/Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 768) {
        this.container.appendChild(EL.help);
        (0, _animate.animate)(EL.help, 'fadeIn', '200ms', '400ms');
      } else {
        EL.optionL.addEventListener('mouseover', this.onOptionHover.bind(this));
        EL.optionR.addEventListener('mouseover', this.onOptionHover.bind(this));
      }

      this.initCardEvents();

      Analytics.sendEvent('Start', 'Show');
    }
  }, {
    key: 'restart',
    value: function restart() {
      this.container.classList.remove('is-result');
      this.container.removeChild(EL.result);
      this.container.appendChild(EL.q);

      EL.nextBtn.textContent = 'Далее';
      EL.nextBtn.dataset.click = 'continue';

      this.setInitialParams();
      this.initCardEvents();
      this.makeNextQuestion();
    }
  }, {
    key: 'continue',
    value: function _continue() {
      var _this4 = this;

      this.activeIndex += 1;

      var animationClassName = this.lastAnsweredType === 'left' ? 'fadeOutLeft' : 'fadeOutRight';

      (0, _animate.animate)(EL.cardWrapper, animationClassName).then(function () {
        _this4.container.classList.remove('is-answered');

        EL.cards.removeChild(EL.cardWrapper);
        EL.cardInner.style.transform = '';

        EL.backCard.classList.remove('is-correct');
        EL.backCard.classList.remove('is-incorrect');

        if (EL.bcHead.contains(EL.bcSign)) {
          EL.bcHead.removeChild(EL.bcSign);
        }

        _this4.makeNextQuestion();
      });

      Analytics.sendEvent('Next');
    }
  }, {
    key: 'makeNextQuestion',
    value: function makeNextQuestion() {
      var question = _data2.default.questions[this.activeIndex];

      this.isAnswered = false;

      (0, _dom.removeChildren)(EL.controls);
      EL.controls.appendChild(EL.optionL);
      EL.controls.appendChild(EL.optionR);

      EL.cPages.innerHTML = this.activeIndex + 1 + '/' + _data2.default.questions.length;

      EL.cTextFrom.innerHTML = '\u0425\u0432\u0430\u0442\u0438\u0442 \u043B\u0438 \u043A\u044D\u0448\u0431\u0435\u043A\u0430<br>\u043E\u0442 \u043F\u043E\u043A\u0443\u043F\u043A\u0438<br><b>' + question.from.text + '</b>';
      EL.cTextTo.innerHTML = '\u041D\u0430 <b>' + question.to.text + '?</b>';

      EL.cImgFrom.dataset.id = this.activeIndex + 1;
      EL.cImgFrom.src = question.from.img;
      EL.cImgFrom.srcset = question.from.img2x + ' 2x';
      EL.cImgTo.dataset.id = this.activeIndex + 1;
      EL.cImgTo.src = question.to.img;
      EL.cImgTo.srcset = question.to.img2x + ' 2x';

      this.showCount();

      EL.cards.appendChild(EL.cardWrapper);
      (0, _animate.animate)(EL.cardWrapper, 'cardZoomIn', '200ms');
    }
  }, {
    key: 'answer',
    value: function answer(t) {
      var trigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Click';

      if (this.isAnswered) {
        return;
      }
      this.isAnswered = true;

      var question = _data2.default.questions[this.activeIndex];

      this.lastAnsweredType = t;

      this.makeAnswer(question, t);

      Analytics.sendEvent('Option - ' + t, trigger);
    }
  }, {
    key: 'makeAnswer',
    value: function makeAnswer(question, type) {
      this.container.classList.add('is-answered');

      EL.cardInner.style.transform = 'translate3d(0,0,0) rotateY(-180deg)';

      (0, _dom.removeChildren)(EL.controls);
      EL.controls.appendChild(EL.nextBtn);

      if (question.correct === type) {
        this.correctAnswers += 1;
        EL.backCard.classList.add('is-correct');
        EL.bcAnswerTitle.textContent = question.answer.title.correct;

        if (question.sign) {
          EL.bcSign.innerHTML = _svg2.default[question.sign];
          EL.bcHead.appendChild(EL.bcSign);
        }
      } else {
        EL.backCard.classList.add('is-incorrect');
        EL.bcAnswerTitle.textContent = question.answer.title.incorrect;
      }

      EL.bcAnswerImg.dataset.id = this.activeIndex + 1;
      EL.bcAnswerImg.src = question.answer.img;
      EL.bcAnswerImg.srcset = question.answer.img2x + ' 2x';
      EL.bcAnswerText.innerHTML = question.answer.text;

      if (this.activeIndex === _data2.default.questions.length - 1) {
        EL.nextBtn.innerHTML = 'Результат';
        EL.nextBtn.dataset.click = 'result';
      }
    }
  }, {
    key: 'result',
    value: function result() {
      var _Special$getResult = Special.getResult(this.correctAnswers),
          result = _Special$getResult.result,
          index = _Special$getResult.index;

      EL.cards.removeChild(EL.cardWrapper);
      EL.cardInner.style.transform = '';

      EL.backCard.classList.remove('is-correct');
      EL.backCard.classList.remove('is-incorrect');

      this.container.classList.remove('is-answered');
      this.container.classList.add('is-result');
      this.container.removeChild(EL.q);
      this.container.appendChild(EL.result);

      EL.rResult.innerHTML = this.correctAnswers + ' \u0438\u0437 ' + _data2.default.questions.length + ' \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0445 \u043E\u0442\u0432\u0435\u0442\u043E\u0432';
      EL.rTitle.innerHTML = result.title;
      EL.rImg.dataset.id = index + 1;
      EL.rImg.src = result.img;
      EL.rImg.srcset = result.img2x + ' 2x';

      (0, _dom.removeChildren)(EL.rShare);
      Share.make(EL.rShare, {
        url: this.params.share.url + this.correctAnswers,
        title: this.correctAnswers + ' \u0438\u0437 ' + _data2.default.questions.length + ' \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0445 \u043E\u0442\u0432\u0435\u0442\u043E\u0432',
        twitter: this.correctAnswers + ' \u0438\u0437 ' + _data2.default.questions.length + ' \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0445 \u043E\u0442\u0432\u0435\u0442\u043E\u0432'
      });

      this.destroyCardEvents();

      Analytics.sendEvent('Result');
    }
  }, {
    key: 'setInitialParams',
    value: function setInitialParams() {
      this.activeIndex = 0;
      this.correctAnswers = 0;
    }
  }, {
    key: 'keyUpHandler',
    value: function keyUpHandler(e) {
      if (e.keyCode === 37 || e.keyCode === 39) {
        this.answer(e.keyCode === 37 ? 'left' : 'right', 'KeyUp');
      }
    }
  }, {
    key: 'initCardEvents',
    value: function initCardEvents() {
      document.addEventListener('keyup', this.keyUpHandler);
    }
  }, {
    key: 'destroyCardEvents',
    value: function destroyCardEvents() {
      document.removeEventListener('keyup', this.keyUpHandler);
    }
  }, {
    key: 'init',
    value: function init() {
      this.setInitialParams();
      this.createElements();
      (0, _dom.removeChildren)(this.container);
      this.container.appendChild(EL.logo);
      this.container.appendChild(EL.q);

      this.params.isFeed ? this.container.classList.add('is-feed') : '';

      Special.loadImages();

      this.start();
    }
  }], [{
    key: 'makeNextCard',
    value: function makeNextCard(index) {
      var q = _data2.default.questions[index];

      EL.ncTextFrom.innerHTML = '\u0425\u0432\u0430\u0442\u0438\u0442 \u043B\u0438 \u043A\u044D\u0448\u0431\u0435\u043A\u0430<br>\u043E\u0442 \u043F\u043E\u043A\u0443\u043F\u043A\u0438<br><b>' + q.from.text + '</b>';
      EL.ncTextTo.innerHTML = '\u041D\u0430 <b>' + q.to.text + '?</b>';

      EL.ncImgFrom.dataset.id = index + 1;
      EL.ncImgFrom.src = q.from.img;
      EL.ncImgFrom.srcset = q.from.img2x + ' 2x';

      EL.ncImgTo.dataset.id = index + 1;
      EL.ncImgTo.src = q.to.img;
      EL.ncImgTo.srcset = q.to.img2x + ' 2x';

      return EL.nextCard;
    }
  }, {
    key: 'getResult',
    value: function getResult(score) {
      var index = Math.floor(Math.random() * _data2.default.results.length);
      var result = _data2.default.results[index];

      return { result: result, index: index };
    }
  }, {
    key: 'loadImages',
    value: function loadImages() {
      _data2.default.questions.forEach(function (q, i) {
        IMAGES[i] = (0, _dom.makeElement)('img', null, {
          src: q.answer.img,
          srcset: q.answer.img + ' 2x'
        });
      });
    }
  }]);

  return Special;
}(_base2.default);

exports.default = Special;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(5);

var _config2 = _interopRequireDefault(_config);

var _analytics = __webpack_require__(3);

var Analytics = _interopRequireWildcard(_analytics);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Base special constructor with common methods
 */
var BaseSpecial = function () {
    function BaseSpecial() {
        _classCallCheck(this, BaseSpecial);

        this.keyCodes = {
            enter: 13
        };
        this.params = {
            container: document.body
        };

        if (_config2.default.sendPageView) {
            Analytics.sendPageView();
        }
    }

    /**
     * Save custom params
     * @param {Object} params - params object with custom values
     */


    _createClass(BaseSpecial, [{
        key: 'saveParams',
        value: function saveParams() {
            Object.assign(this.params, _config2.default);
            this.container = this.params.container;

            this.addEventListeners();
        }

        /**
         * Load css file
         * @param {String} path
         */

    }, {
        key: 'loadStyles',
        value: function loadStyles(path) {
            return new Promise(function (resolve, reject) {
                var link = document.createElement('link');

                link.rel = 'stylesheet';
                link.href = path;

                link.onload = function () {
                    return resolve();
                };
                link.onerror = function () {
                    return reject();
                };

                document.body.appendChild(link);
            });
        }

        /**
         * Add event listeners to document
         */

    }, {
        key: 'addEventListeners',
        value: function addEventListeners() {
            var _this = this;

            this.params.listenedEvents.forEach(function (eventName) {
                _this.container.addEventListener(eventName, function (event) {
                    return _this.defaultEventHandler(event, eventName);
                });
            });
        }

        /**
         * Default events handler
         * @param {Object} event
         * @param {String} eventName
         */

    }, {
        key: 'defaultEventHandler',
        value: function defaultEventHandler(event, eventName) {
            var target = event.target;
            var action = void 0;

            while (target.parentNode && target !== event.currentTarget) {
                action = target.dataset[eventName];

                /** Send all links clicks to analytics */
                if (eventName === 'click' && target.tagName.toLowerCase() === 'a') {
                    Analytics.sendEvent(target.href);
                }

                if (action) break;
                target = target.parentNode;
            }

            action = target.dataset[eventName];

            if (action && this[action]) {
                this[action](event.target, event);
            }
        }
    }]);

    return BaseSpecial;
}();

exports.default = BaseSpecial;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  title: '',
  questions: [{
    from: {
      text: 'аквариумной акулы',
      img: 'https://leonardo.osnova.io/431f9654-4f40-ce93-ed2e-bdd5973130a7/',
      img2x: 'https://leonardo.osnova.io/fb2b3e70-e317-e051-079e-6fc15c2a9432/'
    },
    to: {
      text: 'плюшевую акулу',
      img: 'https://leonardo.osnova.io/4b5068b4-a3a0-7d6e-e4c7-a11eca497a27/',
      img2x: 'https://leonardo.osnova.io/7f7c88e7-306b-00fa-482a-0b3772fecd48/'
    },
    answer: {
      title: {
        correct: 'Вы правы.',
        incorrect: 'Вы не правы.'
      },
      text: 'Акула <a href="https://www.aqua-shop.ru/live/morskie_ryby/hryashchevyue_ugreobraznyue_ievrigalinnyue/prod_H0e10_M" target="_blank">может</a> обойтись в несколько сотен тысяч рублей — кэшбека хватит и на плюшевую версию.',
      img: 'https://leonardo.osnova.io/137b1cef-d07d-9886-89cf-e38a35fb6325/',
      img2x: 'https://leonardo.osnova.io/921c9795-95e8-6586-c3be-2c5779d2e8ea/'
    },
    correct: 'right',
    sign: 'match'
  }, {
    from: {
      text: 'космического<br>скафандра',
      img: 'https://leonardo.osnova.io/0eab816e-1b00-73d5-6dfb-78fb9a24f048/',
      img2x: 'https://leonardo.osnova.io/4b775e2c-44c2-7a6e-00cf-ce2690679236/'
    },
    to: {
      text: 'обломок челябинского метеорита',
      img: 'https://leonardo.osnova.io/73ce374f-56f4-5f42-a061-902b7773e9cc/',
      img2x: 'https://leonardo.osnova.io/7aec86b9-1367-7ed5-e783-90207997d45f/'
    },
    answer: {
      title: {
        correct: 'Точно!',
        incorrect: 'Не угадали.'
      },
      text: 'Цена костюма для выхода в открытый космос <a href="https://www.kommersant.ru/doc/3598831" target="_blank">достигает</a> $12 млн долларов, а кусочек метеорита можно <a href="https://www.chel.kp.ru/daily/26793/3828119/" target="_blank">приобрести</a> даже за 500 рублей. Опасайтесь подделок.',
      img: 'https://leonardo.osnova.io/8486ab61-577e-a7d0-1a6e-0c7c669cd428/',
      img2x: 'https://leonardo.osnova.io/a592ea72-6d1b-4036-210b-6cab1aec3640/'
    },
    correct: 'right',
    sign: 'match'
  }, {
    from: {
      text: 'шины для<br>болида «Формулы 1»',
      img: 'https://leonardo.osnova.io/477a381c-b706-4d2c-25c8-ca81519634d7/',
      img2x: 'https://leonardo.osnova.io/99525118-70a8-f85c-12ac-b6f2291d1eb7/'
    },
    to: {
      text: 'ящик<br>шампанского',
      img: 'https://leonardo.osnova.io/70e52ece-0cef-568a-b1d4-3f0ffe70f7a9/',
      img2x: 'https://leonardo.osnova.io/19e3a0c2-347c-8cf8-6f05-46a46d75683e/'
    },
    answer: {
      title: {
        correct: 'Правильно.',
        incorrect: 'Неправильно.'
      },
      text: 'Шина не такая дорогая — 25 тысяч рублей, зато на один сезон команде нужно больше семиста штук. ',
      img: 'https://leonardo.osnova.io/e0506495-d8fd-71e4-dc09-a16e8b72adb9/',
      img2x: 'https://leonardo.osnova.io/573c9a2e-144c-8f0b-0825-fff75f1b2694/'
    },
    correct: 'left'
  }, {
    from: {
      text: 'космической ручки',
      img: 'https://leonardo.osnova.io/b7243b7a-79e3-7647-65ca-5de4cf91dec1/',
      img2x: 'https://leonardo.osnova.io/1aa92240-c976-ee96-5e0f-bc75691b9465/'
    },
    to: {
      text: 'коробку восковых<br>карандашей',
      img: 'https://leonardo.osnova.io/244de9e0-22eb-c22a-349a-ffaaf6ae8b8c/',
      img2x: 'https://leonardo.osnova.io/f05614e9-a2e2-e63a-ae6d-db7cc704e936/'
    },
    answer: {
      title: {
        correct: 'Всё правильно.',
        incorrect: 'Не угадали.'
      },
      text: 'Про эту пару есть миф: пока NASA разрабатывало дорогую ручку, советские космонавты пользовались карандашами. На самом деле, все сначала писали карандашами, а затем распробовали антигравитационную ручку — всего $6-10 за штуку.',
      img: 'https://leonardo.osnova.io/031e5f2a-41b0-6391-dee0-65544145133c/',
      img2x: 'https://leonardo.osnova.io/74aa00d0-fee0-3ac9-b5ab-266c23d610a3/'
    },
    correct: 'left'
  }, {
    from: {
      text: 'автомобиля с тысячью лошадиных сил',
      img: 'https://leonardo.osnova.io/78119dcd-333c-4ff4-fa26-661ab7c56fd2/',
      img2x: 'https://leonardo.osnova.io/0b9f0c73-1231-cef0-5a31-2ac896fb2f10/'
    },
    to: {
      text: 'тысячу лошадей',
      img: 'https://leonardo.osnova.io/9e7b4c5e-0c3b-a2b5-64ff-a3f060ce52df/',
      img2x: 'https://leonardo.osnova.io/5d7dc311-cdd2-1484-107f-d5e6c7a19ab0/'
    },
    answer: {
      title: {
        correct: 'Верно.',
        incorrect: 'Неверно.'
      },
      text: 'Суперкаров такой мощности достаточно много, но кэшбека от них всё равно не хватит на огромный табун — его цена может <a href="https://journal.tinkoff.ru/horse/" target="_blank">составить</a> полмиллиона долларов.',
      img: 'https://leonardo.osnova.io/045addb1-11c4-2d1f-9bc2-1e777f1687c5/',
      img2x: 'https://leonardo.osnova.io/ddcdde89-ee57-b330-29d5-49daee34d048/'
    },
    correct: 'left'
  }, {
    from: {
      text: 'связки бананов<br>в России',
      img: 'https://leonardo.osnova.io/3aa2ad93-aaf7-e9a9-2c12-aeb335ba1639/',
      img2x: 'https://leonardo.osnova.io/dac9ba80-0691-b7ea-aa8c-d2ca318b72b7/'
    },
    to: {
      text: 'связку бананов<br>в Эквадоре',
      img: 'https://leonardo.osnova.io/19f73ce4-b481-1044-5884-0e7f0cbdcefa/',
      img2x: 'https://leonardo.osnova.io/e09fe6e7-53d2-a2ba-a94e-6098569eab90/'
    },
    answer: {
      title: {
        correct: 'Угадали.',
        incorrect: 'Увы, ошиблись.'
      },
      text: 'Российские <a href="https://www.marketing.spb.ru/mr/food/banana.htm" target="_blank">супермаркеты</a> почти не зарабатывают на бананах, но их наличие на полках — важный фактор для посетителей.',
      img: 'https://leonardo.osnova.io/ecbceac6-7479-9029-4265-7896422e2202/',
      img2x: 'https://leonardo.osnova.io/3ee4a470-0ceb-bb61-2009-04649c636d6c/'
    },
    correct: 'left'
  }, {
    from: {
      text: 'сумки<br>Balenciaga',
      img: 'https://leonardo.osnova.io/3d8c7fa0-3151-f52e-9b70-bb164dfb7e2e/',
      img2x: 'https://leonardo.osnova.io/599cbca9-20b3-a580-82e2-25c563258b2a/'
    },
    to: {
      text: 'сумку IKEA',
      img: 'https://leonardo.osnova.io/a3b76441-12f9-a408-423b-09f56e918170/',
      img2x: 'https://leonardo.osnova.io/32df3916-7270-3df1-2a4f-d9ec53fc0c9d/'
    },
    answer: {
      title: {
        correct: 'Конечно!',
        incorrect: 'Не совсем.'
      },
      text: 'На этот счёт IKEA выпустила ироничную методичку — как отличить одну сумку от другой, но запутаться сложно: у Balenciaga она <a href="https://www.kp.ru/daily/26671/3693382/" target="_blank">дороже</a> в пару тысяч раз.',
      img: 'https://leonardo.osnova.io/8c8307f0-4611-a4f6-0610-68d5c292505a/',
      img2x: 'https://leonardo.osnova.io/22b0fe9e-59fd-88c2-eee3-9b6a7ca00aef/'
    },
    correct: 'right',
    sign: 'batch'
  },
  //   {
  //   from: {
  //     text: 'грамма<br>антиводорода',
  //     img: 'https://leonardo.osnova.io/f8caa44c-97cf-66b7-3603-4b13efdbd825/',
  //     img2x: 'https://leonardo.osnova.io/027ae3ba-f9bb-7c52-f6af-6f924be04155/',
  //   },
  //   to: {
  //     text: 'метровый куб золота',
  //     img: 'https://leonardo.osnova.io/8128206f-d409-7a20-8dee-f0da4893680e/',
  //     img2x: 'https://leonardo.osnova.io/575388d4-3574-87e3-2eed-39f603fe6062/',
  //   },
  //   answer: {
  //     title: {
  //       correct: 'Запросто.',
  //       incorrect: 'Всё не так.',
  //     },
  //     text: 'Грамм антивещества <a href="https://www.kp.by/daily/24593.4/761647/" target="_blank">оценивается</a> в сумму с 13 нулями, и это можно сравнить с деньгами всего мира.',
  //     img: 'https://leonardo.osnova.io/8477ce80-dcf4-2519-c399-60334b99555f/',
  //     img2x: 'https://leonardo.osnova.io/0f36f8e9-094f-c3f2-5335-e3642a0c4f3a/',
  //   },
  //   correct: 'right',
  //   sign: 'snatch',
  // },
  {
    from: {
      text: 'редкой<br>10-рублёвой<br>монеты',
      img: 'https://leonardo.osnova.io/d069bc99-206d-5b0d-bd66-cccecde61756/',
      img2x: 'https://leonardo.osnova.io/f0a50662-7a71-2a21-dbd3-3c491835f942/'
    },
    to: {
      text: 'бракованную<br>10-рублёвую монету',
      img: 'https://leonardo.osnova.io/34ba867b-f69f-3a53-8fc7-63e64eb81a2b/',
      img2x: 'https://leonardo.osnova.io/5f24e729-c508-1929-d555-83ba0bc3cb12/'
    },
    answer: {
      title: {
        correct: 'Точно!',
        incorrect: 'Мимо!'
      },
      text: 'Если чеканка дала сбой, это может поднять стоимость монеты в <a href="http://moneta-russia.ru/library/monetnyy-brak-povorot-shtempelya.php" target="_blank">сотню</a> раз, но цена редких монет <a href="https://grosh-blog.ru/%D1%81%D0%B0%D0%BC%D1%8B%D0%B5-%D0%B4%D0%BE%D1%80%D0%BE%D0%B3%D0%B8%D0%B5-%D0%BC%D0%BE%D0%BD%D0%B5%D1%82%D1%8B-10-%D1%80%D1%83%D0%B1%D0%BB%D0%B5%D0%B9-%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D1%8B%D0%B5/" target="_blank">превышает</a> номинал в десять тысяч раз, хотя они почти не отличаются от обычных.',
      img: 'https://leonardo.osnova.io/9a90bb66-bf79-39a9-39d2-d0f57e8e1712/',
      img2x: 'https://leonardo.osnova.io/27054532-dbef-b327-ebe6-5d94c110d4f2/'
    },
    correct: 'right',
    sign: 'sdacha'
  }, {
    from: {
      text: 'парковочного места<br>в Москве',
      img: 'https://leonardo.osnova.io/a5bfdb3e-da59-2ecb-e6ed-c8f99b0c7a1c/',
      img2x: 'https://leonardo.osnova.io/d7d34c74-a395-aa10-08d4-379e54cc4eb7/'
    },
    to: {
      text: 'гектар российской<br>земли',
      img: 'https://leonardo.osnova.io/8fb9d705-ce6c-c255-82e2-0e4c98fde6fe/',
      img2x: 'https://leonardo.osnova.io/779624c3-7917-597f-2201-ce4f93b81ba9/'
    },
    answer: {
      title: {
        correct: 'Вы правы.',
        incorrect: 'Неверно.'
      },
      text: 'Цена на машиноместо в Москве может <a href="https://www.zr.ru/content/news/913545-samoe-dorogoe-parkovochnoe-mest/" target="_blank">доходить</a> до стоимости трёхкомнатной квартиры, но хватит и достаточно рядового.',
      img: 'https://leonardo.osnova.io/5aef771c-e213-f3db-2ca3-5140f4a7224f/',
      img2x: 'https://leonardo.osnova.io/8be8ec4a-8fc2-1566-7cac-c5b9116b82b9/'
    },
    correct: 'right',
    sign: 'dacha'
  }],
  result: {
    text: '<p>Три процента — максимальный кэшбек на новой дебетовой карте банка «Открытие». Чтобы его получить, нужно выполнить три условия, каждое из которых добавит процент:</p><ul><li>Тратить с карты больше пяти тысяч рублей в месяц.</li><li>Тысячу из них — в мобильном банке.</li><li>Хранить на счету больше 100 тысяч рублей.</li></ul>',
    img: 'https://leonardo.osnova.io/bf6a6456-bf12-eb7d-3115-664b29e67933/',
    img2x: 'https://leonardo.osnova.io/bf6a6456-bf12-eb7d-3115-664b29e67933/'
  },
  results: [{
    title: 'Рублёвая монета дорожает<br>в сто раз, если её гравировку<br><i>п</i>ерекосило',
    img: 'https://leonardo.osnova.io/ccddc38e-0ba9-0815-0cda-3b84a1f1ff09/',
    img2x: 'https://leonardo.osnova.io/8b907491-8101-44d3-9e9a-3746ccabd6b5/'
  }, {
    title: 'Проверить метеорит<br>на подлинность стоит<br>три тысячи рублей',
    img: 'https://leonardo.osnova.io/55158df9-a2fc-4e57-b56b-bb224e846142/',
    img2x: 'https://leonardo.osnova.io/7136b697-26bf-c735-7d97-d49a2785f192/'
  }, {
    title: 'Грамм антиводорода<br>стоит<br>$10000000000000',
    img: 'https://leonardo.osnova.io/3ff55bc0-16c2-ba84-f55c-1c4436497157/',
    img2x: 'https://leonardo.osnova.io/49c60bab-546d-e228-b616-c8bffad2ad69/'
  }, {
    title: 'На космической станции<br>нельзя писать<br>графитовым карандашом',
    img: 'https://leonardo.osnova.io/9fe6db55-1272-e242-18a6-4d1ee3f5d9d3/',
    img2x: 'https://leonardo.osnova.io/a04e6ea7-d719-093c-cf0f-8a88e7567891/'
  }, {
    title: 'Если сумка шуршит —<br>это IKEA,<br>а не Balenciaga',
    img: 'https://leonardo.osnova.io/4654d98d-2b0d-9e67-d9f3-752781d540e3/',
    img2x: 'https://leonardo.osnova.io/7450c0de-1482-9c4e-a0c3-2f6ff5095fe0/'
  }]
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  logo: '<svg viewBox="0 0 283.46 74.62"><path d="M207.81 15.67h20.66v4.6h-1.5a2.63 2.63 0 0 0-2.61-2.36h-3.61v21.28h-5.11V17.92h-3.73a2.57 2.57 0 0 0-2.61 2.36h-1.49v-4.6zM250.98 15.67h3.73v23.52h-5V22.77l-12.29 16.42h-3.74V20.03a3 3 0 0 0-2.36-3.11v-1.25h7.34v16.55zM142.98 39.19h-6.47l-4.61-8.71s-1.37-2.61-2.86-2.61h-1.86v11.32h-5.07V20.03a2.83 2.83 0 0 0-2.49-3v-1.36h7.59v9.83h2.24a4 4 0 0 0 2.66-2.11c4-6.47 3.48-7.72 5.23-7.72h5v1.62c-3.48 0-4.48 7.09-7.84 9.33 1.62.62 2.24 2.11 5.85 8.71 0 0 .87 2.23 2.62 2.23v1.62zM281.97 34.12a12.61 12.61 0 0 1-10.45 5.48c-6.22 0-12.2-4.86-12.2-11.2V27c0-6.85 5.48-11.7 12.2-11.7a12 12 0 0 1 11.95 12.07h-18v3.86c0 3.35 2.74 6.1 6.72 6.1a10.05 10.05 0 0 0 7.72-3.49zm-16.55-9.08h12.19v-1.28a6.1 6.1 0 0 0-12.19 0v1.25zM165.28 31.12a5.78 5.78 0 0 1-5.35 6h-.49c-2.86 0-5.35-2.12-5.72-4.36V22.65a5.91 5.91 0 0 1 5.72-5h1s4.73.25 4.85 6v7.47zm-4.73-15.8c-2.87 0-5.6 1.24-6.84 3v-2.65h-7.47v1.37a2.9 2.9 0 0 1 2.36 3v29.87h5.11V36.7a8.43 8.43 0 0 0 6.47 2.87c6.59-.13 11.07-5.23 11.07-11.58v-1.5c0-6.84-4.23-11.19-10.7-11.19M89.48 30.97a6.32 6.32 0 0 1-6.47 6.35 6.21 6.21 0 0 1-6.35-6.35v-7.46a6.42 6.42 0 0 1 12.82.13v7.34zM83.01 15.3c-8.84 0-12.45 6.84-12.45 11.33v2c0 5.23 5.11 11 12.45 11 6.84 0 12.57-5.1 12.57-11.08v-1.68c0-6-4.73-11.57-12.57-11.57M204.32 15.67h-7.47v1.37a3 3 0 0 1 2.49 3.08v19h5V15.67zM182.41 36.83V27h4.36a4.29 4.29 0 0 1 4.23 4.6v1a4.47 4.47 0 0 1-4.35 4.23h-4.24zm0-12.19v-9h-7.47v1.37a2.71 2.71 0 0 1 2.24 3v19.18h11.57c4.48 0 7.72-2.74 7.72-6.59v-1.12c0-4.24-3.11-6.84-8-6.84h-6.1zM96.45 15.67h20.66v4.6h-1.5a2.63 2.63 0 0 0-2.61-2.36h-3.61v21.28h-5.1V17.92h-3.73a2.56 2.56 0 0 0-2.61 2.36h-1.49v-4.6z" fill="#58595b"/><path d="M46.03 28.81a17.49 17.49 0 0 1-9.07 15.63l-1.28.6a3.23 3.23 0 0 1-1.34.31 2.21 2.21 0 0 1-2-1 2.59 2.59 0 0 1-.3-1.85 2.37 2.37 0 0 1 1.16-1.55 9.39 9.39 0 0 0 5.42-8.59v-9.79A9.35 9.35 0 0 0 33.24 14a2.42 2.42 0 0 1-1.21-1.58 2.57 2.57 0 0 1 .3-1.85 2.22 2.22 0 0 1 2-1 3.16 3.16 0 0 1 1.34.3l1.26.59a17.52 17.52 0 0 1 9.1 15.65v2.75zM21.67 40.9a2.37 2.37 0 0 1 1.17 1.55 2.56 2.56 0 0 1-.3 1.85 2.21 2.21 0 0 1-2 1 3.22 3.22 0 0 1-1.34-.31l-1.29-.6a17.5 17.5 0 0 1-9.07-15.63v-2.7a17.52 17.52 0 0 1 9.1-15.65l1.26-.59a3.16 3.16 0 0 1 1.33-.3 2.22 2.22 0 0 1 2 1 2.54 2.54 0 0 1 .3 1.85 2.39 2.39 0 0 1-1.21 1.58 9.35 9.35 0 0 0-5.38 8.57v9.74a9.39 9.39 0 0 0 5.42 8.59m5.78-40.9a27.44 27.44 0 1 0 27.44 27.44A27.44 27.44 0 0 0 27.44-.05" fill="#00bbe4"/><path d="M76.25 74.46h-3.79V58.78h8.11l.32 2h-6.3v4.34h2c3.31 0 5.32 1.61 5.32 4.52 0 3.2-2.27 4.8-5.68 4.8m.25-7.43h-1.91v5.55h1.77c2.14 0 3.42-.89 3.42-2.84 0-1.8-1.14-2.71-3.28-2.71M90.42 58.71h2.14l6 15.45-2.11.45-1.85-4.86h-6.38l-1.75 4.71h-2.23zm-1.48 9.16h5l-2.5-6.66zM112.15 74.47v-7.23h-7.92v7.23h-2.15V58.79h2.15v6.49h7.92v-6.49h2.13v15.68h-2.13zM128.32 74.62l-7.24-8.11v7.95h-2.14V58.78h2.14v7.05l6.49-7.05h2.73l-6.91 7.37 7.3 7.97-2.37.5z" fill="#58595b"/></svg>',
  match: '<svg viewBox="0 0 76 18"><path d="M5.508 7.914c-.013.17-.02.293-.02.371.013.078.04.137.078.176 0 .17.013.3.04.39.039.079.045.15.019.215.065.105.091.163.078.176-.013 0-.02.013-.02.04.04.064.06.13.06.195a.34.34 0 0 0 .097.175c.013.196.032.313.058.352-.026.104-.032.176-.02.215.014.039.027.071.04.097 0 .118.013.202.039.254.013.04.02.078.02.117 0 .04.006.079.02.118.038.143.051.221.038.234v.02a.39.39 0 0 1 0 .175.19.19 0 0 0 .04.098c.012.026.019.065.019.117.013.052.02.091.02.117a.4.4 0 0 1 0 .176.84.84 0 0 0-.02.156v.41a.957.957 0 0 1 0 .274c-.013.091-.02.143-.02.156a.15.15 0 0 0 .02.059c-.026.104-.04.17-.04.195a.15.15 0 0 0 .02.059.82.82 0 0 0-.078.37c0 .183-.013.313-.039.392-.013.065-.02.136-.02.214a.906.906 0 0 1-.117.196c-.026.013-.039.026-.039.039-.026.13-.045.208-.058.234-.013.013-.02.04-.02.078a1.148 1.148 0 0 0-.098.254c.013.026.02.052.02.078a.256.256 0 0 0-.117.117.247.247 0 0 1-.137.118l-.078.156a.227.227 0 0 1-.059.039 20.6 20.6 0 0 1-.175.273c-.013.026-.013.066 0 .118a.255.255 0 0 0-.118.117.492.492 0 0 1-.058.117c-.117.039-.176.065-.176.078 0 .013-.006.026-.02.04a2.97 2.97 0 0 0-.449.214.926.926 0 0 1-.254.137.446.446 0 0 1-.254.097 1.322 1.322 0 0 0-.214.059c-.026.026-.052.039-.079.039l-.312.04c-.156.051-.247.07-.273.058-.013-.013-.033-.02-.059-.02-.17.026-.26.033-.273.02a.43.43 0 0 1-.176-.078.278.278 0 0 0-.156-.04c-.196-.078-.313-.169-.352-.273a1.664 1.664 0 0 1-.234-.156c-.026-.013-.033-.04-.02-.078-.078 0-.13-.026-.156-.078a.295.295 0 0 0-.117-.098c.013-.065 0-.098-.04-.098-.039-.013-.058-.052-.058-.117a.972.972 0 0 0-.137-.098l-.078-.078c-.078-.182-.104-.293-.078-.332.026-.039.033-.09.02-.156.065-.065.13-.085.195-.059.078.026.17.026.273 0 .183-.026.274.02.274.137 0 .104-.033.176-.098.215.104.208.202.325.293.351.091.105.15.17.176.196a.757.757 0 0 0 .097.039c.118.065.176.11.176.137.065.013.104.026.117.039a.956.956 0 0 1 .098.058c.104.04.24.052.41.04a.37.37 0 0 1 .117-.02c.04 0 .072-.007.098-.02a.19.19 0 0 1 .098-.039.37.37 0 0 0 .117-.02c.078-.025.15-.051.215-.078a.775.775 0 0 0 .195-.117c.117-.013.182-.026.195-.039l.079-.078c.117 0 .182-.013.195-.039a.228.228 0 0 1 .039-.059c.091-.117.143-.169.156-.156.013 0 .02-.006.02-.02.078-.051.123-.097.136-.136a.131.131 0 0 1 .118-.059l.078-.195a.236.236 0 0 1 .136-.137c0-.039.007-.071.02-.097a.491.491 0 0 0 .059-.117.755.755 0 0 1 .078-.215c.039-.104.065-.183.078-.235a.388.388 0 0 1 .117-.136c.013-.066.02-.137.02-.215a.315.315 0 0 1 .078-.176c.052-.182.078-.28.078-.293a.435.435 0 0 0 .039-.195v-.254c.013-.078.02-.156.02-.235a.394.394 0 0 0-.02-.214c.039-.13.052-.209.039-.235a56.824 56.824 0 0 0-.04-.078.649.649 0 0 0 .06-.254 1.62 1.62 0 0 1-.04-.176.083.083 0 0 0 0-.078c-.026-.09-.032-.143-.02-.156.014-.013.014-.033 0-.059a.21.21 0 0 0-.038-.117.642.642 0 0 1-.02-.156v-.117a.313.313 0 0 0 0-.156 1.377 1.377 0 0 1-.078-.293c.013-.04.013-.072 0-.098-.039-.182-.065-.3-.078-.352a.522.522 0 0 0-.04-.195 2.294 2.294 0 0 0-.077-.45.24.24 0 0 0-.04-.136c0-.156-.006-.234-.019-.234s-.02-.007-.02-.02a1.133 1.133 0 0 1-.058-.293l-.059-.273c-.039-.104-.052-.163-.039-.176.013-.026.013-.059 0-.098-.039-.065-.058-.11-.058-.136.013-.04.006-.065-.02-.079a.639.639 0 0 0-.058-.37.424.424 0 0 1-.04-.313c-.038-.17-.071-.254-.097-.254a.227.227 0 0 0-.059-.04c.026-.194.013-.318-.039-.37a.21.21 0 0 1-.02-.195.948.948 0 0 1-.116-.293 1.042 1.042 0 0 0-.079-.235V6.06c.013-.092.013-.15 0-.176l-.039-.117v-.137a.574.574 0 0 0 .02-.137.523.523 0 0 1-.02-.234.164.164 0 0 0-.02-.137c-.051 0-.09.013-.116.04a.605.605 0 0 1-.117.038.248.248 0 0 1-.06.117c-.025.026-.038.072-.038.137a.64.64 0 0 1-.098.078c-.026.013-.032.052-.02.117a.286.286 0 0 0-.136.098l-.078.078a.794.794 0 0 0-.176.196.247.247 0 0 0-.137.117c-.026.039-.058.09-.097.156a1.165 1.165 0 0 1-.176.215.659.659 0 0 0-.117.176c0 .026-.02.045-.059.058a2.79 2.79 0 0 1-.078.196.306.306 0 0 1-.059.078c.013.065-.006.13-.058.195-.04.052-.078.098-.117.137-.105.143-.19.228-.254.254a.541.541 0 0 1-.254.332c-.026.156-.065.26-.117.312a.369.369 0 0 0-.02.117c0 .04-.006.072-.02.098-.09.13-.143.215-.156.254 0 .039-.02.071-.058.098-.013.143-.033.22-.059.234-.013 0-.02.013-.02.039-.038.104-.052.163-.038.176.013.013.019.026.019.039a.685.685 0 0 0-.078.195c.013.026.006.052-.02.078-.013.143-.02.235-.02.274.014.026.014.058 0 .097-.051.091-.07.15-.058.176.026.013.026.033 0 .059.013.09.02.175.02.254a.684.684 0 0 0-.04.214.243.243 0 0 0 0 .137.21.21 0 0 1 .04.117c-.04.144-.059.228-.059.254.026.13.033.202.02.215v.02c0 .156-.007.254-.02.293a.18.18 0 0 0 0 .117c0 .026.013.071.04.136.025.053.038.098.038.137a.822.822 0 0 1-.02.137c0 .065.014.117.04.156.026.143.045.228.058.254a.226.226 0 0 1 .04.059c.052.156.104.254.156.293a.24.24 0 0 1 .117.175.462.462 0 0 1 .176.059.43.43 0 0 0 .136.02c.183-.118.352-.209.508-.274.078-.13.13-.215.156-.254.04-.039.053-.104.04-.195.078-.195.123-.3.136-.313.026-.143.033-.26.02-.351a1.102 1.102 0 0 1 0-.293c.013-.078.02-.156.02-.235a.26.26 0 0 0-.098-.214.604.604 0 0 1 .039-.118.436.436 0 0 0 .058-.156c.065.013.111-.006.137-.058.04-.053.085-.072.137-.059.104.078.169.117.195.117.04 0 .065.02.078.059.026.091.033.15.02.176v.078a1.097 1.097 0 0 1-.04.254v.058a.788.788 0 0 1-.019.293 3.383 3.383 0 0 1-.039.274 2.13 2.13 0 0 0-.039.449l-.078.293a.835.835 0 0 1-.137.254.248.248 0 0 0-.058.117.493.493 0 0 1-.059.117.575.575 0 0 1-.176.137.307.307 0 0 0-.078.058c-.065-.026-.11-.013-.137.04a.295.295 0 0 1-.117.097.928.928 0 0 1-.254.059c-.052.026-.162.039-.332.039a.39.39 0 0 0-.176 0 .32.32 0 0 1-.097-.02c-.13-.039-.202-.071-.215-.097a.245.245 0 0 0-.059-.098c-.09-.117-.15-.17-.175-.156-.013 0-.026-.007-.04-.02a.791.791 0 0 0-.195-.312 3.255 3.255 0 0 0-.117-.293.43.43 0 0 0-.078-.176c.026-.091.032-.143.02-.156-.014-.013-.02-.033-.02-.059a.474.474 0 0 0 0-.195c0-.04.013-.072.039-.098a.953.953 0 0 1-.059-.098.432.432 0 0 1-.02-.136c0-.04.007-.072.02-.098.013-.026.007-.065-.02-.117 0-.13-.006-.202-.019-.215v-.059l.04-.253-.02-.215c0-.026.006-.065.02-.117a.534.534 0 0 0 .019-.118.708.708 0 0 1 0-.234l.058-.176c.027-.065.033-.182.02-.351-.013-.183.02-.306.098-.371.026-.105.039-.19.039-.254 0-.079.006-.15.02-.215a1.63 1.63 0 0 1 .116-.215c.053-.065.079-.11.079-.137a.321.321 0 0 0 .02-.097.471.471 0 0 0 .058-.157.369.369 0 0 0 .02-.117c.077-.182.136-.293.175-.332a.35.35 0 0 0 .059-.215c.117-.117.188-.208.214-.273a.236.236 0 0 1 .137-.137c.04-.117.065-.176.078-.176a.306.306 0 0 0 .078-.058c.066-.091.098-.15.098-.176a.757.757 0 0 1 .04-.098.606.606 0 0 0 .175-.215l.098-.195a3.2 3.2 0 0 1 .195-.254.297.297 0 0 0 .078-.156.306.306 0 0 0 .078-.059.64.64 0 0 0 .098-.078c.052-.104.104-.169.156-.195a.49.49 0 0 1 .117-.195.35.35 0 0 0 .098-.196c.117-.065.176-.11.176-.136.013-.026.039-.033.078-.02 0-.065.02-.104.058-.117a.183.183 0 0 0 .098-.137c.117-.091.182-.143.195-.156l.079-.078c.09-.065.143-.104.156-.117a.64.64 0 0 1 .097-.079.64.64 0 0 0 .04-.156c0-.026.006-.045.019-.058a.83.83 0 0 0 .02-.293v-.157l.039-.156c.013-.052.026-.11.039-.176.052-.169.078-.26.078-.273.013-.156.032-.247.058-.274a.136.136 0 0 0 .04-.136.297.297 0 0 0 .078-.156.25.25 0 0 1 .097-.157c.013-.117.026-.195.04-.234a.434.434 0 0 0 .058-.137.412.412 0 0 0 .137-.195.577.577 0 0 1 .156-.195.389.389 0 0 0 .098-.254.245.245 0 0 1 .097-.059.248.248 0 0 0 .117-.059c.118-.09.183-.136.196-.136a.173.173 0 0 0 .078-.02.436.436 0 0 1 .156-.058.445.445 0 0 0 .176-.098c.13-.04.24-.046.332-.02.091.013.17.013.234 0l.117.079c.04.013.092.02.157.02.117.103.182.175.195.214a.306.306 0 0 1 .059.078c.065.208.058.43-.02.664-.065.13-.124.228-.176.293a.765.765 0 0 0-.097.176.672.672 0 0 0-.235.234c-.078.117-.143.183-.195.196 0 .065-.02.11-.059.136-.039.026-.065.072-.078.137a1.171 1.171 0 0 0-.195.098 2.125 2.125 0 0 1-.117.156c-.013.013-.02.032-.02.058-.091.013-.15.072-.176.176-.13.091-.221.163-.273.215a.256.256 0 0 0-.117.117c-.026.04-.078.065-.157.078a.49.49 0 0 1-.117.196c-.09.065-.15.11-.175.136a.227.227 0 0 1-.06.04c-.012.065-.032.13-.058.195a.822.822 0 0 0-.02.195c0 .182-.006.32-.019.41-.013.091 0 .17.04.235-.04.117-.053.182-.04.195.026 0 .046.013.059.039a.594.594 0 0 1 0 .215c0 .065.006.137.02.215.025.104.045.176.058.215.013.039.033.09.059.156.039.104.052.182.039.234 0 .04.013.085.039.137.039.065.065.117.078.156.013.04.026.072.039.098a.48.48 0 0 1 .02.234c0 .065.025.124.078.176 0 .052.006.098.02.137.012.026.012.065 0 .117l.136.117zm-.313-4.297c.209-.182.352-.312.43-.39l.234-.274.079-.078.078-.117.175-.117a.186.186 0 0 0 .079-.157.521.521 0 0 0 .136-.097.316.316 0 0 0 .078-.176.175.175 0 0 0 .098-.117.269.269 0 0 1 .059-.137c.065-.143.09-.234.078-.273.013-.079.013-.13 0-.157a.306.306 0 0 0-.059-.078.45.45 0 0 1-.156-.039c-.065-.026-.117-.006-.156.059a.508.508 0 0 0-.157.02.217.217 0 0 0-.097.019 1.356 1.356 0 0 0-.293.176.521.521 0 0 1-.137.097.297.297 0 0 1-.078.157c-.04.039-.052.09-.04.156-.103.117-.162.202-.175.254a.245.245 0 0 1-.059.097.882.882 0 0 1-.078.118c-.039.039-.045.065-.02.078.014.013 0 .052-.038.117-.026.052-.026.084 0 .097-.065.13-.098.215-.098.254 0 .04-.006.072-.02.098a.685.685 0 0 0-.078.195c.013.026.02.059.02.098a.53.53 0 0 0-.078.176c.013.026.02.052.02.078.065.013.11 0 .136-.04a.295.295 0 0 1 .117-.097zM10.117 7.113c-.026.157-.058.254-.098.293-.039.04-.052.11-.039.215-.104.13-.156.215-.156.254a.083.083 0 0 1 0 .078.842.842 0 0 1-.136.234c0 .092-.014.144-.04.157a.227.227 0 0 0-.039.058 5.926 5.926 0 0 0-.078.371 1.757 1.757 0 0 0 0 .372.523.523 0 0 0 .235.02.994.994 0 0 1 .195-.02c.221-.013.358-.013.41 0 .117.013.195.02.234.02a.117.117 0 0 0 .079-.08c.013.027.052.047.117.06.065 0 .11-.013.136-.04.066.066.124.111.176.137.052.182.046.287-.02.313a.523.523 0 0 0-.136.097c-.234.078-.371.078-.41 0a6.928 6.928 0 0 0-.371-.058.974.974 0 0 0-.371.039 5.586 5.586 0 0 0-.293.039c-.078 0-.137.02-.176.058 0 .079-.013.15-.04.215a.284.284 0 0 0 .02.176 7.668 7.668 0 0 1-.097.215v.137a.605.605 0 0 0-.04.117c0 .039-.019.072-.058.098a.38.38 0 0 1 0 .292c.052.118.059.176.02.176-.026-.013-.04 0-.04.04.014.051.02.09.02.117 0 .025.007.071.02.136 0 .156-.007.267-.02.332a.726.726 0 0 0-.02.176.771.771 0 0 1 0 .254v.352c.014.09.027.162.04.214a.37.37 0 0 1 .02.118.18.18 0 0 1 0 .117v.117l.038.156a.864.864 0 0 1 .078.156.322.322 0 0 1-.02.098c-.012.04-.006.085.02.137.065.182.091.3.078.351 0 .04.013.091.04.157a.615.615 0 0 1 .078.214c0 .04.006.079.02.118l.077.195c.04.052.072.104.098.156a.315.315 0 0 0 .02.195l.117.157c.117.13.169.195.156.195a.576.576 0 0 0 .176.137c.039.013.058.052.058.117.13.039.248.098.352.176.065-.052.117-.072.156-.059.04.013.072.033.098.059l.078.078a.605.605 0 0 0 .117.039v.137c.013.052.04.078.078.078-.13.09-.215.13-.254.117h-.058c-.117.143-.202.202-.254.176a.267.267 0 0 0-.176-.02c-.078-.09-.137-.143-.176-.156-.026-.013-.045-.04-.058-.078-.183-.13-.326-.195-.43-.195a3.22 3.22 0 0 0-.273-.254 1.458 1.458 0 0 1-.157-.137c0-.13-.013-.195-.039-.195a.307.307 0 0 1-.078-.059.9.9 0 0 1-.078-.313.26.26 0 0 0-.098-.214c.013-.091 0-.157-.039-.196a.458.458 0 0 1-.097-.156.4.4 0 0 1 0-.176.285.285 0 0 0-.02-.175 1.38 1.38 0 0 0-.098-.254c-.013-.013-.02-.026-.02-.04a.307.307 0 0 0-.038-.214.361.361 0 0 1 0-.235 2.688 2.688 0 0 1-.078-.312 1.314 1.314 0 0 1-.02-.215v-.098a.368.368 0 0 0 .02-.117 4.375 4.375 0 0 1-.04-.234v-.293-.117c.014-.04.027-.085.04-.137.013-.143.013-.221 0-.234v-.04-.136a.605.605 0 0 1 .039-.117.307.307 0 0 1-.04-.215.737.737 0 0 0 .04-.235v-.136a.272.272 0 0 0-.02-.118.485.485 0 0 0-.02-.175c0-.026.014-.052.04-.079.039-.156.052-.234.039-.234v-.02c0-.038.006-.09.02-.156a.356.356 0 0 0 .019-.195.486.486 0 0 0-.215.059c-.078.039-.143.032-.195-.02a.245.245 0 0 1-.098.059.574.574 0 0 0-.137.02c-.13.038-.234.07-.312.097a.6.6 0 0 1-.254-.02 1.747 1.747 0 0 0-.176-.234c-.026-.052-.026-.117 0-.195a.573.573 0 0 1 .215-.04c.091-.012.156-.045.195-.097.065.013.13.02.196.02.065-.014.143-.027.234-.04.026-.052.085-.071.176-.058a.548.548 0 0 0 .254-.02c.169-.078.26-.136.273-.175.013-.053.033-.118.059-.196.039-.104.052-.163.039-.176-.013-.026-.013-.058 0-.097a.88.88 0 0 0 .039-.176c.013-.04.006-.065-.02-.078.078-.104.111-.163.098-.176v-.059c.065-.09.098-.15.098-.175 0-.04.02-.065.058-.078-.013-.092 0-.157.04-.196a.908.908 0 0 0 .136-.176c.013-.117.033-.24.059-.37.104-.144.162-.215.175-.215.026 0 .052-.013.079-.04a.605.605 0 0 0 .175-.058.173.173 0 0 1 .078-.02c.052.079.079.137.079.176.013.026.045.052.097.078zM12.793 7.367l-.117.078a.245.245 0 0 0-.098.059.277.277 0 0 0-.156.039c-.026.013-.065.013-.117 0-.143-.104-.228-.182-.254-.234.026-.052.032-.098.02-.137a.18.18 0 0 1 0-.117c.13-.065.201-.111.214-.137a.131.131 0 0 1 .117-.059.164.164 0 0 1 .02-.136.437.437 0 0 0 .058-.137.71.71 0 0 0 0-.234.307.307 0 0 1 .04-.215.241.241 0 0 1-.04-.137l.04-.156c-.066-.065-.13-.072-.196-.02a.777.777 0 0 1-.195.117 1.594 1.594 0 0 1-.274-.039c-.026-.026-.071-.032-.136-.02a3.715 3.715 0 0 1-.215-.35.36.36 0 0 1 0-.235c.091-.143.156-.221.195-.234a.175.175 0 0 0 .117-.098l.352.039c.078.039.124.059.137.059a.173.173 0 0 1 .078-.02c.039.026.078.059.117.098.052.026.11.032.176.02.013.064.071.11.176.136a.48.48 0 0 0 .058.137.227.227 0 0 1 .04.058c.025.156.045.254.058.293a.307.307 0 0 0 .058.078c.013.144.013.228 0 .254v.04c-.026.182-.039.299-.039.35a.397.397 0 0 1 0 .177.646.646 0 0 0-.078.097c-.013.026-.013.072 0 .137a.19.19 0 0 0-.078.117.248.248 0 0 1-.059.117v.118c0 .039-.006.071-.019.097zM14.96 9.516a1.88 1.88 0 0 0-.038.136c0 .052-.026.091-.078.118-.117.22-.156.423-.117.605.052.195.078.319.078.371 0 .04.013.085.039.137.039.039.058.078.058.117.013.04.04.059.079.059 0 .104.039.175.117.214 0 .053.02.092.058.118.04.013.059.052.059.117a.255.255 0 0 1 .117.117c.026.04.072.072.137.098.052.065.09.11.117.136.039.026.072.053.098.079l.175.156.235.234c.039.117.123.222.254.313.143.13.234.214.273.254.04.026.078.065.117.117-.013.117.033.195.137.234a.496.496 0 0 0 .098.254l.195.195c0 .078.02.143.059.196.039.039.078.084.117.136.026.144.045.228.058.254l.059.059a3.163 3.163 0 0 1 .078.703c-.026.117-.032.195-.02.234.014.026.02.052.02.079-.039.195-.085.332-.137.41-.013.039-.032.084-.058.136a.434.434 0 0 0-.02.137c-.17.17-.26.287-.273.352-.182.078-.287.143-.313.195l-.097.098a.636.636 0 0 1-.078.097 1.64 1.64 0 0 0-.215.117c0 .014-.013.014-.04 0-.117.066-.22.111-.312.137-.156.026-.24.046-.254.059-.013.013-.026.02-.039.02a.595.595 0 0 0-.215 0 .207.207 0 0 1-.175 0c-.118-.079-.202-.118-.254-.118a.218.218 0 0 1-.098-.02c-.091-.064-.15-.097-.176-.097a.174.174 0 0 1-.078-.02 1.209 1.209 0 0 0-.195-.195c-.026 0-.046-.006-.059-.02a3.16 3.16 0 0 1-.137-.234.183.183 0 0 0-.136-.098 3.82 3.82 0 0 0-.04-.175.19.19 0 0 0-.078-.117 2.727 2.727 0 0 0-.058-.313c0-.039.006-.085.02-.137v-.312a.284.284 0 0 0-.02-.176c.052-.039.078-.124.078-.254.065 0 .098-.02.098-.058l.039-.157a.97.97 0 0 0 .195-.136l.156-.118c.078-.09.13-.136.157-.136.039 0 .052-.013.039-.04.078.014.13.014.156 0 .039-.012.065-.032.078-.058a.84.84 0 0 0 .215.04.27.27 0 0 0 .137-.06c.026.04.052.06.078.06a.333.333 0 0 1 .136-.02l.215.117c.026 0 .04.013.04.039.064.09.136.176.214.254a.558.558 0 0 1 .195.234.495.495 0 0 1-.117.234c-.039.053-.09.111-.156.176a.494.494 0 0 1-.195 0 2.242 2.242 0 0 0-.215-.039.586.586 0 0 1-.137-.332.535.535 0 0 1-.117-.02c-.04-.025-.098-.032-.176-.019a.518.518 0 0 0-.273.117.595.595 0 0 1-.196.137 4.35 4.35 0 0 0-.078.332.892.892 0 0 0 .04.508.19.19 0 0 1 .038.098.247.247 0 0 0 .098.058c.04.013.052.052.04.117a.524.524 0 0 1 .136.098c.039.039.078.072.117.098.17.065.28.117.332.156a.363.363 0 0 0 .234.078c.183-.04.287-.065.313-.078a.3.3 0 0 0 .117-.04.977.977 0 0 1 .137-.097c.026 0 .052-.013.078-.039.052-.078.085-.117.098-.117a.174.174 0 0 0 .078-.02c.052-.039.09-.071.117-.097a.64.64 0 0 0 .098-.078c0-.053.013-.092.039-.118a.64.64 0 0 0 .078-.097c.065-.104.091-.183.078-.235 0-.052.02-.09.059-.117.013-.156.02-.306.02-.45a.633.633 0 0 0-.118-.39c-.013-.13-.026-.201-.04-.215l-.058-.058a2.198 2.198 0 0 1-.02-.156.173.173 0 0 0-.019-.079 2.848 2.848 0 0 0-.215-.273.428.428 0 0 1-.078-.176c-.065-.09-.104-.136-.117-.136a.228.228 0 0 1-.04-.06 1.192 1.192 0 0 0-.097-.155.228.228 0 0 1-.039-.059c-.065 0-.11-.065-.137-.195-.104-.065-.162-.11-.175-.137-.157-.195-.287-.319-.39-.371a2.135 2.135 0 0 0-.157-.176.739.739 0 0 0-.195-.137c-.013-.09-.053-.15-.118-.175a.263.263 0 0 1-.097-.176 2.469 2.469 0 0 1-.371-.45 2.291 2.291 0 0 0-.215-.35 2.206 2.206 0 0 0-.04-.274 3.82 3.82 0 0 1-.038-.176c0-.13-.007-.202-.02-.215-.013-.013-.02-.032-.02-.059l.02-.234c.013 0 .02-.013.02-.039a1.352 1.352 0 0 0-.04-.156.26.26 0 0 1 .06-.156.74.74 0 0 1 .077-.196c.026-.039.026-.071 0-.097a.64.64 0 0 1 .098-.079c.039-.026.052-.071.039-.136.234-.104.397-.228.488-.371a.864.864 0 0 0 .157-.079.441.441 0 0 1 .195-.078.897.897 0 0 0 .234-.117c.04-.039.072-.045.098-.02.104-.025.17-.038.195-.038.04 0 .072.013.098.039.117.013.176.013.176 0 .013-.026.032-.033.058-.02.17.013.28.033.332.059.065.013.13.02.196.02.026.038.09.07.195.097.104.078.17.137.195.176.026.039.065.071.117.097.052.078.085.124.098.137l.078.04c.052.168.091.266.117.292.04.026.046.046.02.059a.349.349 0 0 1 .098.097l.117.118c-.013.117-.013.182 0 .195.013 0 .02.013.02.039 0 .065-.02.137-.06.215 0 .09-.006.15-.019.176l-.039.078a1.79 1.79 0 0 0-.059.214.25.25 0 0 1-.097.157c-.078.13-.15.215-.215.254-.065.039-.13.084-.195.136a5.875 5.875 0 0 1-.254.059c-.065.013-.13.033-.196.059-.117 0-.182.006-.195.02a.15.15 0 0 1-.058-.02.246.246 0 0 1-.098-.059.247.247 0 0 0-.117-.059.38.38 0 0 1 0-.293.361.361 0 0 1 .195-.175c.091.013.143.02.156.02a.173.173 0 0 1 .078-.02c.118-.013.19-.02.215-.02l.078-.039c.117-.104.17-.156.157-.156-.013-.013-.007-.033.02-.059.064-.13.103-.195.116-.195.013-.013.02-.026.02-.04a.245.245 0 0 0-.04-.194l-.077-.196a.314.314 0 0 1-.04-.137.218.218 0 0 0-.019-.097c-.091-.13-.17-.209-.234-.235a.661.661 0 0 1-.176-.156c-.13 0-.202-.006-.215-.02 0-.025-.013-.038-.039-.038a.338.338 0 0 0-.195-.02h-.176c-.195 0-.32.013-.371.04a1.07 1.07 0 0 0-.137.058 1.073 1.073 0 0 0-.273.156c-.04.026-.052.059-.04.098h-.097zM30.547 15.492c-.065.104-.11.156-.137.156-.013 0-.026.014-.039.04-.104.078-.17.123-.195.136-.13.013-.195.026-.195.04h-.04c-.182-.066-.3-.092-.351-.079a.22.22 0 0 1-.156-.02l-.235-.078a.762.762 0 0 1-.176-.097.146.146 0 0 0-.156-.059c-.065-.143-.17-.221-.312-.234a1.287 1.287 0 0 1-.117-.215c-.014-.039-.046-.059-.098-.059-.091.105-.15.17-.176.196a.31.31 0 0 1-.059.078c-.117.091-.188.137-.214.137a5.323 5.323 0 0 1-.313.254 1.38 1.38 0 0 1-.371.156.19.19 0 0 1-.117.078.188.188 0 0 0-.098.078c-.13-.013-.228.013-.293.078-.052-.026-.097-.032-.137-.02a.435.435 0 0 1-.136.06c-.091-.014-.15-.014-.176 0-.013.012-.033.019-.059.019a1.469 1.469 0 0 1-.253-.059h-.079c-.156 0-.26-.013-.312-.039-.04-.013-.085-.006-.137.02-.078-.079-.137-.118-.176-.118a1.053 1.053 0 0 1-.136-.058 1.19 1.19 0 0 1-.215-.117.607.607 0 0 0-.254-.098 4.281 4.281 0 0 0-.195-.254.348.348 0 0 0-.098-.098.522.522 0 0 1-.098-.136.596.596 0 0 1-.156-.137c-.013-.026-.046-.046-.098-.059a.277.277 0 0 0-.039-.156.782.782 0 0 0-.097-.117l-.078-.234a.309.309 0 0 0-.118-.196.186.186 0 0 0-.058-.176.609.609 0 0 1-.078-.214c0-.144-.013-.228-.04-.254a.366.366 0 0 1-.019-.117c.026-.157.033-.248.02-.274a.32.32 0 0 1-.02-.098c0-.065.006-.117.02-.156a.605.605 0 0 1 .039-.117c.013-.065.02-.137.02-.215 0-.078.019-.143.058-.195v-.195a.309.309 0 0 1 .058-.079.76.76 0 0 0 .059-.156c.013-.052.033-.11.059-.176.104-.169.169-.3.195-.39a.74.74 0 0 1 .156-.235c.078-.104.13-.175.156-.214a.298.298 0 0 1 .157-.079c.078-.117.13-.182.156-.195.026-.013.032-.033.02-.059a.49.49 0 0 0 .195-.117l.156-.156a.439.439 0 0 0 .156-.059c.052-.039.098-.071.137-.097.143-.013.221-.026.234-.04.026-.025.052-.025.078 0 .066-.064.15-.084.254-.058.104.013.228.013.371 0 .196-.052.346-.065.45-.039.117.013.234.033.351.059.143.078.267.13.371.156.091.078.15.13.176.156.026.013.059.02.098.02.026.065.065.104.117.117.052 0 .084.033.098.098.117.065.182.104.195.117.013.013.026.02.039.02a1.61 1.61 0 0 0 .176-.196.94.94 0 0 0 .058-.098c.026-.026.072-.039.137-.039a.278.278 0 0 0 .156-.039c.117-.039.183-.045.196-.02.026.014.065.02.117.02.143.117.234.221.273.313a.62.62 0 0 0 .176.234c.026.065.046.143.059.234.026.079.039.17.039.274.013.143.02.24.02.293l-.02.37c0 .131-.007.255-.02.372 0 .117-.013.228-.039.332-.039.17-.065.267-.078.293a2.44 2.44 0 0 0-.156.352c-.04.117-.072.182-.098.195a.228.228 0 0 0-.039.059.432.432 0 0 0-.059.136c-.013.04-.045.072-.097.098a3.926 3.926 0 0 0-.117.273c-.014.04-.014.072 0 .098.078.143.117.234.117.273.013.04.032.072.058.098a.247.247 0 0 0 .098.059.245.245 0 0 1 .098.058c.104.078.156.124.156.137h.039a.475.475 0 0 0 .156.117.607.607 0 0 1 .117.04c.144.025.222.045.235.058a.322.322 0 0 0 .097-.02c.105-.013.176-.026.215-.039.04-.026.091-.026.157 0 .13.104.195.176.195.215 0 .026.013.052.039.078zm-2.95-4.258a2.219 2.219 0 0 0-.214-.195.808.808 0 0 0-.156-.117 2.34 2.34 0 0 1-.332-.195 2.523 2.523 0 0 0-.235-.059 2.021 2.021 0 0 0-.137-.059c-.065-.026-.104-.026-.117 0-.104.013-.162.02-.175.02-.014-.013-.033-.013-.06 0a8.172 8.172 0 0 0-.37.059.596.596 0 0 1-.215 0c-.065.039-.137.078-.215.117a.52.52 0 0 0-.176.117c-.156.091-.273.17-.351.234a.469.469 0 0 0-.176.235c-.078.09-.13.156-.156.195a1.06 1.06 0 0 1-.059.137.434.434 0 0 0-.058.136c-.014.04-.046.072-.098.098a.437.437 0 0 1-.059.156.496.496 0 0 1-.058.117l-.04.157c0 .039-.012.071-.038.097a.21.21 0 0 1-.02.196.518.518 0 0 0-.02.254c-.039.143-.058.254-.058.332a.83.83 0 0 1 0 .254c.052.182.091.299.117.351a.32.32 0 0 1 .04.176c.103.13.188.3.253.508a.537.537 0 0 1 .156.136c.04.04.072.105.098.196.104.09.163.143.176.156.078.078.117.13.117.156a.23.23 0 0 0 .059.04c.13.064.208.097.234.097.026 0 .052.02.078.059.091.013.17.039.234.078.079.039.15.084.215.136.13-.026.209-.026.235 0 .039.013.071.033.097.059a.299.299 0 0 1 .117-.04c.04 0 .092.007.157.02.078 0 .13-.006.156-.02a.94.94 0 0 0 .098-.058c.039-.013.11-.02.215-.02a.642.642 0 0 0 .195-.097c.026-.039.052-.045.078-.02.104-.104.176-.156.215-.156.039 0 .071-.013.097-.039.091-.104.157-.156.196-.156l.175-.176a.173.173 0 0 0 .02-.078.2.2 0 0 0 .156-.176.532.532 0 0 1 .137-.234l-.078-.273c-.04-.027-.059-.06-.059-.098a.366.366 0 0 0-.02-.117c-.025-.117-.051-.19-.077-.215a1.239 1.239 0 0 1-.078-.352.549.549 0 0 0-.02-.254 1.359 1.359 0 0 1-.059-.234c.013-.026.013-.072 0-.137 0-.09-.006-.175-.02-.254v-.254-.234a.523.523 0 0 0-.038-.195c.065-.13.09-.209.078-.235-.013-.026-.013-.058 0-.097-.052-.143-.104-.222-.156-.235zm.645.489c0 .052-.006.15-.02.293 0 .13.014.221.04.273-.026.052-.033.098-.02.137.013.039.02.078.02.117.013.052.026.098.039.137a.133.133 0 0 1 .039.097.666.666 0 0 0 0 .235.6.6 0 0 1 .039.117.49.49 0 0 0 0 .195c.013.065.02.11.02.137a.245.245 0 0 1 .058.098.247.247 0 0 1 .059.117c.065.013.097-.007.097-.059 0-.065.033-.104.098-.117-.026-.065-.02-.117.02-.156a.34.34 0 0 0 .097-.176c0-.143.013-.234.04-.273a.492.492 0 0 0 .058-.118c.039-.169.058-.3.058-.39v-.176c0-.117-.006-.182-.02-.195v-.079c0-.13-.006-.227-.019-.292a.434.434 0 0 0-.039-.196.258.258 0 0 0-.039-.234l-.137-.156c0-.013-.006-.02-.02-.02-.025.04-.058.059-.097.059-.026-.013-.065.02-.117.097a.387.387 0 0 1-.117.137c-.052.04-.065.091-.04.156l-.097.235zM46.133 15.57c-.156.091-.254.137-.293.137-.04-.013-.085-.007-.137.02a1.179 1.179 0 0 1-.098.195c-.182.039-.299.045-.351.02a.211.211 0 0 0-.156-.06 3.957 3.957 0 0 0-.04-.175.187.187 0 0 0-.058-.137c.117-.13.195-.215.234-.254.078-.143.118-.22.118-.234 0-.026.006-.052.02-.078.064-.026.123-.052.175-.078a.266.266 0 0 1 .176-.02c0-.065.013-.117.039-.156a.164.164 0 0 0 .02-.137.263.263 0 0 0 .097-.175c.013-.092.046-.157.098-.196a.164.164 0 0 1 .02-.137.496.496 0 0 0 .058-.117c0-.065.006-.123.02-.175l.038-.157c.04-.169.059-.273.059-.312a.76.76 0 0 1 .059-.156.416.416 0 0 1-.02-.215.307.307 0 0 0-.04-.215.671.671 0 0 0 .04-.274 2.401 2.401 0 0 1-.04-.312v-.235c0-.156-.032-.273-.097-.351.013-.117.007-.189-.02-.215-.025-.039-.025-.072 0-.098a.815.815 0 0 0-.077-.175c-.013-.026-.013-.065 0-.118a2.161 2.161 0 0 1-.157-.214.173.173 0 0 0-.02-.079.913.913 0 0 0-.136-.175 1.358 1.358 0 0 1-.098-.196l-.195-.136c.013-.013.013-.04 0-.078a.56.56 0 0 1-.254-.059.625.625 0 0 0-.273-.098.905.905 0 0 0-.176.02c-.052.013-.098-.007-.137-.059a.21.21 0 0 0-.117.04.21.21 0 0 1-.117.038h-.234a4.526 4.526 0 0 0-.372.079c-.13.025-.208.045-.234.058a3.33 3.33 0 0 1-.234.098.173.173 0 0 1-.078.02.295.295 0 0 0-.118.097c-.013.026-.045.032-.097.02a.25.25 0 0 1-.098.156c-.039.026-.072.078-.098.156a.25.25 0 0 0-.156.098.87.87 0 0 0-.078.156c-.143.104-.221.176-.234.215a.49.49 0 0 1-.059.117l.098.254c.039.13.058.202.058.215.026.143.059.24.098.293.013.09.026.15.039.175.013.026.02.052.02.079l.058.234c.013.039.033.072.059.098.026.117.052.188.078.214.013.222.02.365.02.43.012.065.032.137.058.215.039.091.052.156.039.195v.098c.026.117.033.182.02.195v.059c.026.17.039.293.039.37 0 .079-.007.15-.02.216v.136a.643.643 0 0 1-.02.157c-.038.156-.058.247-.058.273-.013.182-.04.293-.078.332-.04.026-.065.085-.078.176a.64.64 0 0 1-.293.215.431.431 0 0 1-.137.058.64.64 0 0 0-.195.04c-.078.012-.15.025-.215.039-.065.026-.163.026-.293 0a1.218 1.218 0 0 0-.195-.196.218.218 0 0 1-.02-.097.433.433 0 0 0-.137-.176c0-.078-.02-.137-.058-.176a1.02 1.02 0 0 0-.098-.156.387.387 0 0 0-.039-.176.207.207 0 0 1 0-.176.377.377 0 0 1-.059-.195c.013-.078.02-.156.02-.235.013-.143.013-.22 0-.234a.172.172 0 0 1-.02-.078c.04-.143.066-.228.079-.254v-.488c0-.13.026-.235.078-.313.026-.143.032-.215.02-.215-.014 0-.02-.013-.02-.039.013-.104.026-.156.039-.156a.128.128 0 0 0 .058-.058.217.217 0 0 0 .02-.098c0-.04.006-.085.02-.137a.766.766 0 0 0 .078-.234c0-.04.006-.078.02-.117.064-.157.103-.248.116-.274.026-.026.033-.071.02-.137a5.34 5.34 0 0 0 .097-.312.266.266 0 0 0 .02-.176.387.387 0 0 0-.117-.137c-.04-.052-.052-.11-.04-.175-.064-.104-.11-.163-.136-.176l-.078-.078a2.095 2.095 0 0 0-.098-.117.213.213 0 0 0-.078-.04c-.078-.13-.137-.208-.176-.234a.776.776 0 0 1-.097-.117.987.987 0 0 1-.235-.117c-.065-.052-.143-.052-.234 0a.556.556 0 0 0-.293-.04.758.758 0 0 0-.098.04c-.013.013-.052.013-.117 0-.104-.026-.176-.033-.215-.02l-.078.04a2.146 2.146 0 0 0-.254.038.285.285 0 0 1-.176-.02.526.526 0 0 1-.351.196.498.498 0 0 0-.195.254.19.19 0 0 0-.118.078c-.013.026-.039.072-.078.137a2.73 2.73 0 0 0-.175.234 1.11 1.11 0 0 0-.118.352c.026.104.033.17.02.195v.04l.058.253c0 .026.007.059.02.098.026.026.032.065.02.117.026.156.051.273.078.352.026.078.013.13-.04.156.04.065.053.13.04.195 0 .065.006.137.02.215l.038.293c.026.156.033.254.02.293a.218.218 0 0 0-.02.098c.052.169.072.319.059.449 0 .13-.007.247-.02.351.013.117.007.183-.02.196-.012 0-.019.013-.019.039.026.104.026.162 0 .175-.013.013-.02.033-.02.06a.718.718 0 0 1-.038.175l-.04.078a.727.727 0 0 0-.019.176.727.727 0 0 1-.02.176c-.052.143-.11.24-.175.293a.355.355 0 0 0-.117.156l-.118.078a.49.49 0 0 0-.117.058.29.29 0 0 1-.137.079.247.247 0 0 0-.117.058.21.21 0 0 0-.195.02.243.243 0 0 1-.176.078 1.741 1.741 0 0 0-.234-.098c0 .013-.013.013-.04 0-.117-.065-.175-.104-.175-.117 0-.026-.013-.04-.04-.04-.025-.13-.064-.22-.116-.273 0-.104-.013-.201-.04-.292a16.903 16.903 0 0 1-.038-.293.32.32 0 0 1 .02-.098.37.37 0 0 0 .019-.117c0-.196-.007-.306-.02-.332-.013-.026-.013-.072 0-.137a.273.273 0 0 0 .02-.117c.013-.065.026-.117.039-.156-.013-.13-.013-.202 0-.215a.174.174 0 0 0 .02-.078.318.318 0 0 0 0-.157v-.136a.999.999 0 0 1 .058-.313.419.419 0 0 1 .078-.137.133.133 0 0 1-.04-.097.53.53 0 0 0 .02-.117c.04-.079.072-.137.098-.176a.285.285 0 0 0 .059-.176c.065-.104.104-.163.117-.176.026-.026.032-.052.02-.078a2.956 2.956 0 0 1 .35-.664c.079-.13.125-.221.138-.273.013-.066.039-.111.078-.137l-.059-.274a3.525 3.525 0 0 0-.097-.273c0-.026-.014-.046-.04-.059a.455.455 0 0 0-.097-.332l-.176-.254-.254-.214a1.518 1.518 0 0 0-.195-.079.448.448 0 0 0-.137-.039c-.091.013-.143.033-.156.059 0 .026-.013.04-.04.04a.927.927 0 0 1-.214-.02.666.666 0 0 1-.137-.137.315.315 0 0 0 .04-.137.612.612 0 0 1 .038-.117c.13-.104.209-.163.235-.176.039-.026.097-.026.175 0h.293a.284.284 0 0 1 .176.02c.13.039.196.078.196.117.078.026.123.052.136.078.013.013.033.02.059.02a.295.295 0 0 0 .097.117c.04.026.066.071.079.136.104.105.169.157.195.157.026 0 .039.006.039.02a.87.87 0 0 1 .078.214c0 .013.007.033.02.059.026.052.052.097.078.136.026.04.045.085.058.137a.348.348 0 0 1 .098-.098c.04-.026.059-.078.059-.156l.195-.176a.577.577 0 0 1 .195-.156l.215-.137.293-.156c.117-.013.182-.026.195-.039.026-.026.059-.026.098 0 .065-.026.124-.045.176-.059a.698.698 0 0 0 .176-.058.513.513 0 0 0 .449-.059.771.771 0 0 1 .254 0c.039.013.071.02.097.02h.118c.039 0 .071.013.097.039.065-.026.11-.033.137-.02.039.013.085.033.137.059.09.026.15.052.175.078.026.026.059.04.098.04.117.103.182.168.195.194a.307.307 0 0 0 .059.079c.13.09.202.15.215.175.013.013.039.02.078.02 0 .052.013.091.039.117.04.026.072.052.098.078.104.17.195.293.273.371.052-.013.085-.032.098-.058a.188.188 0 0 1 .097-.078c.066-.079.111-.137.137-.176a.35.35 0 0 1 .176-.117c.052-.079.085-.124.098-.137a.226.226 0 0 1 .058-.04c.156-.116.26-.188.313-.214.065-.026.13-.046.195-.059.182-.065.306-.104.371-.117a.765.765 0 0 0 .176-.097c.13.052.208.078.234.078.04 0 .072-.013.098-.04.17-.064.319-.104.45-.117a.876.876 0 0 1 .41.059c.117-.013.182-.026.195-.039.013-.013.026-.02.039-.02.143.053.221.079.234.079.026-.013.046-.013.059 0a.295.295 0 0 1 .117.097c.039.026.091.04.156.04.117.09.182.143.195.156.052.078.091.13.118.156.026.026.039.052.039.078l.156.156a.245.245 0 0 1 .098.059c.012.104.039.202.078.293.039.078.09.15.156.215.065.169.091.286.078.351 0 .065.033.13.098.195.013.066.02.118.02.157 0 .039.012.084.038.136 0 .13.013.222.04.274.051.195.071.338.058.43v.214a.575.575 0 0 1-.02.137c0 .04.007.078.02.117.026.196.026.339 0 .43a2.037 2.037 0 0 1-.059.273c-.039.13-.052.209-.039.235.013.026.013.058 0 .097-.065.118-.097.196-.097.235 0 .026-.02.045-.059.058a.216.216 0 0 1-.039.215c-.04.052-.046.13-.02.235a5.283 5.283 0 0 0-.136.254c-.04.104-.065.169-.078.195a.607.607 0 0 0-.04.137.481.481 0 0 1-.078.195.306.306 0 0 1-.058.078v.195zm-4.375-3.203l-.098.293a.772.772 0 0 1-.039.098c-.026.065-.046.13-.059.195a.35.35 0 0 1-.058.176c-.026.195-.04.338-.04.43 0 .09.014.188.04.293-.065.065-.085.156-.059.273a.387.387 0 0 1-.02.273c.014.157.027.274.04.352.026.065.045.124.058.176.013.065.02.11.02.136 0 .014.013.04.039.079.065-.013.104.006.117.058l.04.156c.103.066.162.092.175.079.026-.026.052-.04.078-.04a.968.968 0 0 0 .098-.136c.013-.026.032-.04.058-.04.052-.168.072-.266.059-.292v-.117a.604.604 0 0 1 .04-.118c.012-.039.006-.071-.02-.097a1.53 1.53 0 0 0 .039-.215.322.322 0 0 0 .02-.098 3.631 3.631 0 0 0-.06-.332.654.654 0 0 1 .02-.293.618.618 0 0 1-.078-.312.19.19 0 0 1-.04-.098.825.825 0 0 0-.019-.137c-.065-.117-.09-.195-.078-.234.013-.04.013-.072 0-.098a1.628 1.628 0 0 1-.078-.214 2.018 2.018 0 0 1-.078-.235l-.117.04zm-4.375-.234c-.013.117-.026.182-.04.195-.012 0-.032.013-.058.04-.039.103-.058.162-.058.175.013.013.013.033 0 .059-.092.156-.137.227-.137.214a2.34 2.34 0 0 1-.078.215c-.013.026-.013.072 0 .137-.065.039-.098.104-.098.195 0 .091-.013.17-.039.235v.254a.665.665 0 0 1 0 .234c-.013.026-.007.059.02.098-.079.065-.111.143-.098.234.026.091.039.17.039.234 0 .157.006.254.02.293.012.026.019.052.019.078v.196a.32.32 0 0 1-.02.078c.04.143.072.228.098.254a.244.244 0 0 1 .059.097c.13-.078.208-.11.234-.097a.19.19 0 0 0 .098-.04c.065-.116.104-.182.117-.195a.232.232 0 0 1 .059-.039.943.943 0 0 0 .078-.254.245.245 0 0 1 .058-.097v-.235a3.88 3.88 0 0 0 .04-.37c0-.066.006-.13.019-.196 0-.143-.007-.287-.02-.43 0-.143-.013-.286-.039-.43a1.714 1.714 0 0 1-.02-.43.39.39 0 0 0-.077-.331.338.338 0 0 0 .02-.195.459.459 0 0 0-.06-.176h-.136zM55.156 15.492c-.065.104-.11.156-.136.156-.014 0-.027.014-.04.04-.104.078-.169.123-.195.136-.13.013-.195.026-.195.04h-.04c-.181-.066-.299-.092-.35-.079a.22.22 0 0 1-.157-.02l-.234-.078a.762.762 0 0 1-.176-.097.146.146 0 0 0-.156-.059c-.066-.143-.17-.221-.313-.234a1.287 1.287 0 0 1-.117-.215c-.013-.039-.046-.059-.098-.059-.09.105-.15.17-.176.196a.305.305 0 0 1-.058.078c-.117.091-.189.137-.215.137a5.357 5.357 0 0 1-.313.254 1.383 1.383 0 0 1-.37.156.19.19 0 0 1-.118.078.188.188 0 0 0-.097.078c-.13-.013-.228.013-.293.078-.052-.026-.098-.032-.137-.02a.436.436 0 0 1-.137.06c-.091-.014-.15-.014-.176 0-.013.012-.032.019-.058.019a1.466 1.466 0 0 1-.254-.059h-.078c-.157 0-.26-.013-.313-.039-.039-.013-.084-.006-.136.02-.079-.079-.137-.118-.176-.118a1.065 1.065 0 0 1-.137-.058 1.193 1.193 0 0 1-.215-.117.607.607 0 0 0-.254-.098 4.281 4.281 0 0 0-.195-.254.348.348 0 0 0-.098-.098.52.52 0 0 1-.097-.136.596.596 0 0 1-.157-.137c-.013-.026-.045-.046-.097-.059a.278.278 0 0 0-.04-.156.783.783 0 0 0-.097-.117l-.078-.234a.309.309 0 0 0-.117-.196.186.186 0 0 0-.059-.176.609.609 0 0 1-.078-.214c0-.144-.013-.228-.04-.254a.369.369 0 0 1-.019-.117c.026-.157.033-.248.02-.274a.322.322 0 0 1-.02-.098c0-.065.007-.117.02-.156a.61.61 0 0 1 .039-.117c.013-.065.02-.137.02-.215 0-.078.02-.143.058-.195v-.195a.306.306 0 0 1 .059-.079.76.76 0 0 0 .058-.156c.013-.052.033-.11.059-.176.104-.169.17-.3.195-.39a.74.74 0 0 1 .157-.235c.078-.104.13-.175.156-.214a.298.298 0 0 1 .156-.079c.078-.117.13-.182.156-.195.026-.013.033-.033.02-.059a.49.49 0 0 0 .195-.117l.156-.156a.439.439 0 0 0 .157-.059 3.04 3.04 0 0 1 .136-.097c.144-.013.222-.026.235-.04.026-.025.052-.025.078 0 .065-.064.15-.084.254-.058.104.013.227.013.37 0 .196-.052.346-.065.45-.039.117.013.234.033.352.059.143.078.267.13.37.156.092.078.15.13.176.156.026.013.059.02.098.02.026.065.065.104.117.117.052 0 .085.033.098.098.117.065.182.104.195.117.013.013.026.02.04.02.09-.092.149-.157.175-.196a.957.957 0 0 0 .059-.098c.026-.026.071-.039.136-.039a.278.278 0 0 0 .157-.039c.117-.039.182-.045.195-.02.026.014.065.02.117.02.143.117.235.221.274.313.039.09.097.169.175.234.026.065.046.143.059.234.026.079.039.17.039.274.013.143.02.24.02.293l-.02.37c0 .131-.007.255-.02.372 0 .117-.012.228-.039.332a2.27 2.27 0 0 1-.078.293 2.44 2.44 0 0 0-.156.352c-.039.117-.072.182-.098.195a.23.23 0 0 0-.039.059.437.437 0 0 0-.058.136c-.013.04-.046.072-.098.098a3.926 3.926 0 0 0-.117.273c-.013.04-.013.072 0 .098.078.143.117.234.117.273.013.04.033.072.059.098a.246.246 0 0 0 .097.059c.04.013.072.032.098.058.104.078.156.124.156.137h.04a.475.475 0 0 0 .156.117.606.606 0 0 1 .117.04c.143.025.221.045.234.058a.322.322 0 0 0 .098-.02 1.3 1.3 0 0 0 .215-.039c.039-.026.09-.026.156 0 .13.104.195.176.195.215 0 .026.013.052.04.078zm-2.949-4.258a2.209 2.209 0 0 0-.215-.195.81.81 0 0 0-.156-.117 2.337 2.337 0 0 1-.332-.195 2.52 2.52 0 0 0-.234-.059 1.99 1.99 0 0 0-.137-.059c-.065-.026-.104-.026-.117 0-.105.013-.163.02-.176.02-.013-.013-.033-.013-.059 0a8.185 8.185 0 0 0-.37.059.596.596 0 0 1-.216 0c-.065.039-.136.078-.215.117a.52.52 0 0 0-.175.117c-.157.091-.274.17-.352.234a.47.47 0 0 0-.176.235c-.078.09-.13.156-.156.195-.013.039-.032.085-.059.137a.434.434 0 0 0-.058.136c-.013.04-.046.072-.098.098a.437.437 0 0 1-.058.156.5.5 0 0 1-.059.117 89.09 89.09 0 0 0-.039.157c0 .039-.013.071-.04.097a.21.21 0 0 1-.019.196.517.517 0 0 0-.02.254c-.038.143-.058.254-.058.332a.83.83 0 0 1 0 .254c.052.182.091.299.117.351a.32.32 0 0 1 .04.176c.104.13.188.3.253.508a.537.537 0 0 1 .157.136c.039.04.071.105.097.196.105.09.163.143.176.156.078.078.117.13.117.156a.228.228 0 0 0 .059.04c.13.064.208.097.234.097.026 0 .052.02.078.059.091.013.17.039.235.078.078.039.15.084.215.136.13-.026.208-.026.234 0 .04.013.072.033.098.059a.299.299 0 0 1 .117-.04c.039 0 .091.007.156.02.078 0 .13-.006.156-.02a.94.94 0 0 0 .098-.058c.04-.013.11-.02.215-.02a.642.642 0 0 0 .195-.097c.026-.039.052-.045.078-.02.104-.104.176-.156.215-.156.04 0 .072-.013.098-.039.09-.104.156-.156.195-.156l.176-.176a.173.173 0 0 0 .02-.078.2.2 0 0 0 .156-.176.532.532 0 0 1 .136-.234l-.078-.273c-.039-.027-.058-.06-.058-.098a.369.369 0 0 0-.02-.117c-.026-.117-.052-.19-.078-.215a1.239 1.239 0 0 1-.078-.352.548.548 0 0 0-.02-.254 1.37 1.37 0 0 1-.058-.234c.013-.026.013-.072 0-.137 0-.09-.007-.175-.02-.254v-.254-.234a.523.523 0 0 0-.039-.195c.065-.13.091-.209.078-.235-.013-.026-.013-.058 0-.097-.052-.143-.104-.222-.156-.235zm.645.489c0 .052-.007.15-.02.293 0 .13.013.221.04.273-.027.052-.033.098-.02.137.013.039.02.078.02.117.012.052.025.098.038.137a.133.133 0 0 1 .04.097.666.666 0 0 0 0 .235.606.606 0 0 1 .038.117.49.49 0 0 0 0 .195c.013.065.02.11.02.137a.246.246 0 0 1 .058.098.248.248 0 0 1 .059.117c.065.013.098-.007.098-.059 0-.065.032-.104.097-.117-.026-.065-.02-.117.02-.156a.34.34 0 0 0 .097-.176c0-.143.014-.234.04-.273a.492.492 0 0 0 .058-.118c.04-.169.059-.3.059-.39v-.176c0-.117-.007-.182-.02-.195v-.079c0-.13-.006-.227-.02-.292a.434.434 0 0 0-.038-.196.258.258 0 0 0-.04-.234l-.136-.156c0-.013-.007-.02-.02-.02-.026.04-.058.059-.097.059-.026-.013-.066.02-.117.097a.387.387 0 0 1-.118.137c-.052.04-.065.091-.039.156l-.097.235zM58.105 7.113c-.026.157-.058.254-.097.293-.04.04-.052.11-.04.215-.103.13-.156.215-.156.254a.083.083 0 0 1 0 .078.844.844 0 0 1-.136.234c0 .092-.013.144-.04.157a.23.23 0 0 0-.038.058 6 6 0 0 0-.078.371 1.76 1.76 0 0 0 0 .372.523.523 0 0 0 .234.02.994.994 0 0 1 .195-.02c.222-.013.358-.013.41 0 .118.013.196.02.235.02a.118.118 0 0 0 .078-.08c.013.027.052.047.117.06.065 0 .11-.013.137-.04.065.066.123.111.176.137.052.182.045.287-.02.313a.522.522 0 0 0-.137.097c-.234.078-.37.078-.41 0a6.91 6.91 0 0 0-.37-.058.974.974 0 0 0-.372.039 5.583 5.583 0 0 0-.293.039c-.078 0-.137.02-.176.058 0 .079-.013.15-.039.215a.284.284 0 0 0 .02.176 7.711 7.711 0 0 1-.098.215v.137a.606.606 0 0 0-.039.117c0 .039-.02.072-.059.098a.381.381 0 0 1 0 .292c.052.118.059.176.02.176-.026-.013-.04 0-.04.04.014.051.02.09.02.117 0 .025.007.071.02.136 0 .156-.007.267-.02.332a.722.722 0 0 0-.02.176.766.766 0 0 1 0 .254v.352c.014.09.027.162.04.214a.37.37 0 0 1 .02.118.18.18 0 0 1 0 .117v.117l.038.156a.864.864 0 0 1 .079.156.322.322 0 0 1-.02.098c-.013.04-.006.085.02.137.065.182.09.3.078.351 0 .04.013.091.039.157a.614.614 0 0 1 .078.214c0 .04.006.079.02.118l.078.195c.039.052.071.104.097.156a.315.315 0 0 0 .02.195l.117.157c.117.13.17.195.156.195a.574.574 0 0 0 .176.137c.04.013.059.052.059.117.13.039.247.098.351.176.065-.052.117-.072.156-.059.04.013.072.033.098.059l.078.078a.605.605 0 0 0 .117.039v.137c.013.052.04.078.078.078-.13.09-.214.13-.253.117h-.059c-.117.143-.202.202-.254.176a.267.267 0 0 0-.176-.02c-.078-.09-.136-.143-.175-.156-.027-.013-.046-.04-.06-.078-.181-.13-.325-.195-.429-.195a3.217 3.217 0 0 0-.273-.254 1.448 1.448 0 0 1-.156-.137c0-.13-.013-.195-.04-.195a.306.306 0 0 1-.078-.059.9.9 0 0 1-.078-.313.26.26 0 0 0-.097-.214c.013-.091 0-.157-.04-.196a.458.458 0 0 1-.097-.156.397.397 0 0 1 0-.176.284.284 0 0 0-.02-.175 1.378 1.378 0 0 0-.097-.254c-.013-.013-.02-.026-.02-.04a.307.307 0 0 0-.039-.214.36.36 0 0 1 0-.235 2.675 2.675 0 0 1-.078-.312 1.306 1.306 0 0 1-.02-.215v-.098a.366.366 0 0 0 .02-.117 4.274 4.274 0 0 1-.04-.234v-.293-.117c.014-.04.027-.085.04-.137.013-.143.013-.221 0-.234v-.04-.136a.606.606 0 0 1 .039-.117.307.307 0 0 1-.039-.215.738.738 0 0 0 .039-.235v-.136a.273.273 0 0 0-.02-.118.485.485 0 0 0-.019-.175c0-.026.013-.052.039-.079.04-.156.052-.234.04-.234v-.02c0-.038.006-.09.019-.156a.355.355 0 0 0 .02-.195.486.486 0 0 0-.216.059c-.078.039-.143.032-.195-.02a.245.245 0 0 1-.098.059.574.574 0 0 0-.136.02c-.13.038-.235.07-.313.097a.6.6 0 0 1-.254-.02 1.74 1.74 0 0 0-.176-.234c-.026-.052-.026-.117 0-.195a.573.573 0 0 1 .215-.04c.091-.012.157-.045.196-.097.065.013.13.02.195.02a4.36 4.36 0 0 1 .234-.04c.026-.052.085-.071.176-.058a.548.548 0 0 0 .254-.02c.17-.078.26-.136.273-.175a2.76 2.76 0 0 1 .059-.196c.04-.104.052-.163.04-.176-.014-.026-.014-.058 0-.097a.88.88 0 0 0 .038-.176c.013-.04.007-.065-.02-.078.079-.104.111-.163.098-.176v-.059c.065-.09.098-.15.098-.175 0-.04.02-.065.059-.078-.014-.092 0-.157.039-.196a.913.913 0 0 0 .136-.176 4.31 4.31 0 0 1 .059-.37c.104-.144.163-.215.176-.215.026 0 .052-.013.078-.04a.608.608 0 0 0 .176-.058.173.173 0 0 1 .078-.02c.052.079.078.137.078.176.013.026.045.052.097.078zM63.281 16l-.41.059c.013-.013 0-.02-.039-.02h-.234c-.04 0-.059-.013-.059-.039a.394.394 0 0 0-.215-.02.878.878 0 0 1-.234-.039l-.235-.078a.492.492 0 0 0-.117-.058c-.169-.091-.286-.137-.351-.137a1.627 1.627 0 0 1-.215-.117.149.149 0 0 0-.02-.059 5.836 5.836 0 0 0-.234-.137l-.078-.078c-.052-.065-.098-.104-.137-.117l-.078-.078c-.078-.13-.13-.202-.156-.215a.247.247 0 0 1-.059-.098 2.25 2.25 0 0 0-.176-.214.685.685 0 0 1-.097-.196c-.078-.09-.117-.162-.117-.214a.89.89 0 0 1-.137-.274.972.972 0 0 1-.02-.332 1.593 1.593 0 0 0-.039-.273.575.575 0 0 0-.02-.137c.014-.104.014-.163 0-.176a.174.174 0 0 1-.019-.078c.04-.117.052-.195.04-.234 0-.04.012-.072.038-.098a.82.82 0 0 1 0-.254l.04-.195c.051-.026.078-.11.078-.254.09-.13.143-.202.156-.215.026-.013.032-.046.02-.098.103-.13.188-.214.253-.254a.316.316 0 0 0 .137-.195l.176-.176c.117-.09.188-.156.215-.195.169-.117.273-.202.312-.254a.54.54 0 0 0 .293-.117c.065.026.13.013.195-.04.078-.051.15-.064.215-.038.104-.065.163-.091.176-.078a.083.083 0 0 0 .078 0l.215-.02c.156-.026.254-.045.293-.058a.346.346 0 0 1 .273-.02.164.164 0 0 0 .137-.02c.04.053.085.079.137.079a.494.494 0 0 1 .351.058.4.4 0 0 0 .176 0c.13.091.202.15.215.176.026.013.058.02.098.02.143.065.247.15.312.253a.836.836 0 0 0 .332.254c.04.091.091.176.156.254.04.091.072.156.098.196a.419.419 0 0 1 .078.136c.052.104.072.176.059.215-.013.04-.013.072 0 .098.052.104.09.208.117.312a.289.289 0 0 0-.078.137.345.345 0 0 1-.04.156c-.025.04-.058.085-.097.137a.457.457 0 0 0-.098.156.678.678 0 0 1-.136.137.307.307 0 0 0-.078.117 1.88 1.88 0 0 0-.47.137.732.732 0 0 1-.331.078h-.254a.21.21 0 0 1-.117-.04.098.098 0 0 0-.117 0 .432.432 0 0 0-.176-.136 2.293 2.293 0 0 0-.176-.078l-.078-.078a.94.94 0 0 0-.059-.098 1.326 1.326 0 0 1-.136-.37c0-.092-.033-.144-.098-.157a.479.479 0 0 0 .039-.176c.013-.065.032-.13.059-.195a.44.44 0 0 0 .156-.156c.182-.079.306-.118.37-.118l.196.176-.039.274c-.013.078-.072.123-.176.136-.039.091-.039.163 0 .215.052.052.111.091.176.117.091.053.15.098.176.137.039.04.072.033.098-.02.182 0 .306.007.37.02.066.013.13.007.196-.02a.295.295 0 0 0 .098-.117c.039-.052.09-.065.156-.039.065-.13.097-.221.097-.273 0-.065.014-.117.04-.156a.133.133 0 0 0-.04-.098.278.278 0 0 1-.039-.156.452.452 0 0 1-.097-.196.188.188 0 0 0-.078-.097c-.026-.026-.04-.072-.04-.137a.642.642 0 0 0-.097-.078.19.19 0 0 1-.078-.117 3.914 3.914 0 0 1-.215-.078.304.304 0 0 1-.156-.157c-.157-.078-.235-.13-.235-.156a1.471 1.471 0 0 1-.254-.059.173.173 0 0 0-.078-.019.18.18 0 0 0-.117 0c-.026.013-.065.013-.117 0-.143-.013-.228-.013-.254 0h-.098a.244.244 0 0 1-.136 0 .366.366 0 0 0-.117-.02c-.04.014-.092.027-.157.04a.642.642 0 0 0-.156.019 2.039 2.039 0 0 1-.234.078c-.196.078-.313.13-.352.156l-.078.079a.987.987 0 0 0-.098.058c-.13.065-.195.11-.195.137l-.234.156a1.227 1.227 0 0 0-.254.293.77.77 0 0 1-.098.117.307.307 0 0 0-.059.078.635.635 0 0 1-.117.235c-.026.026-.045.078-.058.156a.694.694 0 0 1-.059.176c.026.039.033.09.02.156l-.04.156c.014.117.02.19.02.215 0 .013-.013.033-.039.059a.65.65 0 0 1 .039.312.289.289 0 0 0 .078.254c.026.143.059.222.098.235.039.156.071.24.097.253.027.013.046.046.06.098a.447.447 0 0 1 .136.254c.09.091.13.143.117.156l.02.02c.026.039.058.078.097.117a.247.247 0 0 1 .117.137c.144.104.248.169.313.195a.233.233 0 0 1 .156.117.95.95 0 0 1 .215.078c.026.013.059.013.098 0 .182.065.306.104.37.117.079.013.15.033.215.06a.689.689 0 0 0 .313.038.454.454 0 0 1 .234.02.35.35 0 0 1 .176-.059c.052-.013.117-.032.196-.059.117-.065.208-.104.273-.117.078-.013.124-.052.137-.117a.754.754 0 0 0 .254-.45.269.269 0 0 0 .136-.058c.026-.026.065-.039.118-.039.13-.039.22-.052.273-.039a.296.296 0 0 1 .156.078.315.315 0 0 1 0 .157c0 .039.007.078.02.117a.636.636 0 0 0-.078.097.455.455 0 0 1-.118.079c-.13.13-.201.208-.215.234a1.3 1.3 0 0 1-.195.195l-.078.04c-.104.103-.176.168-.215.195a2.098 2.098 0 0 1-.136.058c-.196.104-.32.15-.372.137l-.117.078zM67.695 9.398a.53.53 0 0 0-.078.176c.013.013.013.04 0 .078 0 .04-.013.085-.039.137a.606.606 0 0 1-.039.117c0 .04.007.085.02.137.013.039.02.078.02.117l-.079.235c0 .039.007.071.02.097.013.143.013.228 0 .254-.013.013 0 .033.039.059-.04.143-.059.247-.059.312a.772.772 0 0 1 .04.098.607.607 0 0 1 .038.117.433.433 0 0 1-.02.137c-.012.026-.012.058 0 .097.066.144.085.215.06.215-.027-.013-.046-.006-.06.02a.595.595 0 0 1 0 .215c-.012.065 0 .13.04.195a.487.487 0 0 0 0 .273c.039.079.045.17.02.274a.448.448 0 0 1 .058.234c0 .091.02.17.058.235a3.68 3.68 0 0 1 .157-.293.434.434 0 0 0 .039-.196.455.455 0 0 0 .078-.117c.026-.052.026-.098 0-.137.065-.052.104-.136.117-.254.026-.117.078-.195.156-.234 0-.117.033-.195.098-.234-.013-.052-.007-.091.02-.117a.64.64 0 0 0 .078-.098.133.133 0 0 0 .039-.098.435.435 0 0 1 .058-.136c.013-.04.046-.111.098-.215a.772.772 0 0 1 .097-.118.315.315 0 0 0 .079-.175.51.51 0 0 0 .234-.235.525.525 0 0 1 .215-.254c.078-.065.117-.13.117-.195.065.013.11-.006.137-.059a.387.387 0 0 1 .136-.117c.118-.039.19-.058.215-.058a.19.19 0 0 0 .098-.04l.195-.019c.013-.013.026-.02.04-.02.286-.025.514-.025.683 0 .13.04.221.06.273.06l.157.155.156.176c.078.091.117.156.117.196a.305.305 0 0 0 .059.078.164.164 0 0 0-.02.136.431.431 0 0 1 .059.137c.078.221.11.378.097.469-.013.091-.02.189-.02.293a.37.37 0 0 1 .02.117c0 .04.007.085.02.137.026.156.026.24 0 .254-.026.013-.033.039-.02.078 0 .065.007.143.02.234.026.091.02.15-.02.176-.026.143-.032.221-.02.234.014 0 .014.013 0 .04-.038.169-.077.292-.116.37-.026.144-.033.228-.02.254.013.013.02.033.02.059a.868.868 0 0 0-.078.215c.013.013.013.032 0 .058-.066.196-.092.326-.079.391.013.052-.006.104-.058.156.039.078.045.176.02.293a2.53 2.53 0 0 1-.06.332c.014.052.02.104.02.156a.164.164 0 0 1-.02.137c.04.091.053.15.04.176-.013.013-.013.033 0 .059.013.065.032.13.058.195a.166.166 0 0 1 0 .156l.196.195c.09.026.156.02.195-.02a.211.211 0 0 1 .156-.058c.144-.09.235-.117.274-.078.052.04.117.072.195.098a.786.786 0 0 1-.02.215c0 .039-.013.084-.038.136-.053.105-.111.163-.176.176a.34.34 0 0 0-.176.098.338.338 0 0 0-.195.02.517.517 0 0 1-.254.019.21.21 0 0 1-.118-.04c-.026-.025-.065-.032-.117-.019-.143-.065-.234-.123-.273-.175a.496.496 0 0 0-.117-.118 3.337 3.337 0 0 1-.137-.293.133.133 0 0 0-.04-.097.207.207 0 0 0 0-.176 3.957 3.957 0 0 1-.038-.176.76.76 0 0 1-.04-.098c0-.039-.019-.071-.058-.097.04-.04.052-.078.04-.117a.313.313 0 0 1 0-.157.562.562 0 0 0 0-.214c0-.04.012-.092.038-.157.052-.143.072-.24.059-.293a.243.243 0 0 1 0-.136v-.176l.039-.195.078-.254a.889.889 0 0 1 .04-.215.31.31 0 0 0 0-.156c.038-.13.064-.222.077-.274.013-.052.033-.11.059-.176.013-.143.026-.221.039-.234.013-.013.02-.033.02-.059v-.254c.013-.052.026-.097.038-.136a2.957 2.957 0 0 1-.019-.215.173.173 0 0 0 .02-.078.92.92 0 0 1 0-.274c.013-.052 0-.11-.04-.175.013-.092.007-.144-.02-.157a.64.64 0 0 1-.077-.097c.013-.183 0-.3-.04-.352a.49.49 0 0 1-.058-.254.49.49 0 0 0-.117-.058c-.026-.013-.04-.052-.04-.118-.13-.013-.207-.013-.234 0-.026 0-.045-.013-.058-.039-.04.026-.091.033-.156.02-.065-.013-.111 0-.137.039-.104-.026-.17-.026-.195 0a.127.127 0 0 1-.059.059 1.149 1.149 0 0 1-.254.097c-.013 0-.032.013-.058.04-.105.103-.157.162-.157.175a1.366 1.366 0 0 0-.195.195.347.347 0 0 1-.098.098.463.463 0 0 0-.175.352.57.57 0 0 0-.176.351.255.255 0 0 0-.117.117 3 3 0 0 1-.059.157 2.452 2.452 0 0 1-.234.488 2.708 2.708 0 0 0-.079.312c-.013.04-.032.085-.058.137a.321.321 0 0 0-.02.098 1.73 1.73 0 0 1-.039.293.94.94 0 0 1-.058.097.667.667 0 0 1-.02.215c0 .013-.013.033-.039.059.013.104.013.17 0 .195-.013.013-.02.046-.02.098a1.35 1.35 0 0 0-.039.273.433.433 0 0 1-.019.137c-.013.143-.013.24 0 .293.013.039.02.078.02.117-.013.156-.02.248-.02.274 0 .012.013.032.04.058a.817.817 0 0 0-.02.137v.117c.039.3.097.488.175.566a.45.45 0 0 0-.039.137.311.311 0 0 1 0 .156 1.657 1.657 0 0 0-.195.118c-.013.026-.046.026-.098 0-.039.065-.078.09-.117.078-.039 0-.078-.02-.117-.059a.813.813 0 0 1-.117-.156 1.067 1.067 0 0 1-.059-.137c.04-.065.04-.124 0-.176a.207.207 0 0 1 0-.175c-.039-.144-.052-.222-.039-.235.013-.013.013-.032 0-.058a.774.774 0 0 0-.039-.098v-.117c-.026-.143-.046-.222-.059-.235a.23.23 0 0 1-.039-.058 3.082 3.082 0 0 1-.039-.313.132.132 0 0 0-.039-.097c.04-.066.052-.118.04-.157a.686.686 0 0 1-.02-.195 9.365 9.365 0 0 1-.098-.43c-.052-.143-.072-.214-.058-.214a.747.747 0 0 1-.06-.235c.014-.052 0-.11-.038-.176.026-.065.026-.117 0-.156l-.04-.117c0-.143-.006-.228-.019-.254a.369.369 0 0 1-.02-.117c0-.156-.006-.241-.019-.254v-.078c.013-.235.013-.365 0-.39a.243.243 0 0 1 0-.138.17.17 0 0 0-.02-.175.437.437 0 0 0-.038-.274c0-.065.006-.136.02-.215a.455.455 0 0 0-.02-.234.764.764 0 0 0 .058-.156c.013-.065.007-.11-.02-.137 0-.234.014-.443.04-.625.039-.13.039-.189 0-.176-.04 0-.046-.02-.02-.058-.208 0-.43-.04-.664-.117a2.477 2.477 0 0 1-.273-.137.4.4 0 0 0 0-.176c0-.052.013-.104.039-.156a.433.433 0 0 1 .254-.137.85.85 0 0 0 .175.117.15.15 0 0 1 .059.02.34.34 0 0 0 .137.058.083.083 0 0 1 .078 0c.13.04.208.052.234.04a.19.19 0 0 1 .098-.04c0-.052.006-.097.02-.136l.038-.157c.04-.09.053-.143.04-.156V8.52c.039-.144.052-.228.039-.254 0-.026.006-.052.02-.079.025-.169.045-.26.058-.273a.127.127 0 0 0 .058-.059c.052-.195.079-.325.079-.39a.44.44 0 0 1 .078-.195.685.685 0 0 1 .097-.254.29.29 0 0 0 .078-.215l.118-.235a.493.493 0 0 1 .058-.117c.078-.117.117-.189.117-.215a.19.19 0 0 1 .04-.097c.052-.117.09-.202.117-.254.078-.104.117-.176.117-.215.013-.052.032-.11.058-.176.026-.052.059-.104.098-.156a.34.34 0 0 0 .098-.176c.09-.13.156-.202.195-.215.052-.026.085-.078.098-.156.052 0 .084-.02.097-.059a.348.348 0 0 1 .098-.097c.156-.104.24-.176.254-.215a.217.217 0 0 0 .097-.02.642.642 0 0 0 .098-.078c.17-.065.254-.09.254-.078a2.28 2.28 0 0 0 .215-.117.347.347 0 0 1 .156-.04c.117 0 .189-.012.215-.038.143.026.234.039.274.039.052 0 .09.006.117.02l.215.097c.117.078.182.124.195.137.117.091.176.143.176.156h.02c.09.13.149.228.175.293-.013.156-.013.254 0 .293.013.04.02.072.02.098-.027.169-.053.319-.079.449a.37.37 0 0 1-.156.273c0 .105-.039.196-.117.274a.683.683 0 0 1-.176.39.729.729 0 0 0-.176.313.236.236 0 0 0-.136.137 1.028 1.028 0 0 1-.098.156c-.091.117-.15.176-.176.176a1.194 1.194 0 0 1-.097.156c-.014 0-.014.013 0 .039l-.118.078c-.026.013-.045.052-.058.117a.263.263 0 0 0-.176.098.355.355 0 0 1-.156.117 3.37 3.37 0 0 1-.274.332.7.7 0 0 1-.254.156c-.078.105-.123.157-.136.157-.013 0-.033.013-.059.039-.117.078-.176.123-.176.136l-.02.02c-.117.039-.175.065-.175.078 0 .013-.007.02-.02.02l-.136.136c-.013.013-.02.033-.02.059-.13.052-.202.078-.215.078-.013 0-.026.007-.039.02a7.818 7.818 0 0 0-.215.097c-.143.052-.228.091-.254.117-.013.013-.052.013-.117 0zm.606-.78l.195-.098a.128.128 0 0 0 .059-.06c.143-.09.221-.142.234-.155.052 0 .091-.013.117-.04a.964.964 0 0 1 .098-.058c.13-.143.202-.228.215-.254.156-.117.228-.176.215-.176l.293-.293c.065-.065.117-.13.156-.195.065-.039.104-.072.117-.098l.04-.078a.601.601 0 0 0 .194-.215 4.62 4.62 0 0 0 .235-.332.675.675 0 0 1 .175-.214 3.9 3.9 0 0 1 .098-.254l.078-.078c0-.066.013-.118.04-.157a1.26 1.26 0 0 1 .078-.136c0-.079.006-.144.019-.196a.435.435 0 0 1 .059-.136.278.278 0 0 1-.04-.157c0-.065.014-.117.04-.156-.079-.104-.118-.176-.118-.215a.133.133 0 0 0-.039-.097.522.522 0 0 1-.136-.098.634.634 0 0 0-.079-.098 1.859 1.859 0 0 1-.312-.039 1.864 1.864 0 0 1-.137.04.218.218 0 0 0-.097.019 1.289 1.289 0 0 0-.137.078c-.026.013-.072.013-.137 0a.19.19 0 0 1-.078.117.304.304 0 0 0-.078.059.583.583 0 0 0-.293.156.968.968 0 0 0-.176.254c-.117.221-.221.37-.312.449a.55.55 0 0 0-.176.332c-.104.078-.176.221-.215.43a.757.757 0 0 0-.039.097.37.37 0 0 0-.02.118l-.117.156a.695.695 0 0 0-.058.195c-.091.143-.137.241-.137.293 0 .04-.013.085-.04.137a.53.53 0 0 0-.077.176.15.15 0 0 1-.02.058.738.738 0 0 0-.078.254c0 .04-.006.091-.02.156a3.93 3.93 0 0 1-.097.254l-.04.078a.92.92 0 0 1 0 .274c0 .052.014.104.04.156a.517.517 0 0 0 .293-.078c.078-.052.15-.11.215-.176zM74.063 1.762c.025.169.052.286.078.351a.692.692 0 0 1 .058.196.247.247 0 0 1 .059.117c.026.039.058.071.098.097-.04.053-.046.098-.02.137.039.026.046.052.02.078.052.17.071.267.058.293a.76.76 0 0 0 .04.098.244.244 0 0 1 .058.098c0 .156.006.253.02.293.025.039.064.071.116.097v.176c.013.039.026.091.04.156.039.104.052.163.039.176-.014 0-.014.02 0 .059a.93.93 0 0 1 .058.253c.013.04.033.072.059.098.026.17.039.28.039.332.013.04.032.072.058.098.026.039.04.11.04.215 0 .104.013.175.038.215A.509.509 0 0 0 75 5.55c.013.065.007.117-.02.156a.95.95 0 0 0 .079.215c.013.013.006.032-.02.058.026.027.04.066.04.118 0 .052.006.11.019.175.039.144.052.222.039.235v.02c-.013.025-.007.104.02.234 0 .078.006.156.019.234.026.078.032.15.02.215-.014.26 0 .443.038.547.013.208.026.351.04.43.012.078.019.156.019.234 0 .117-.007.202-.02.254a.24.24 0 0 0 .04.136c0 .157-.007.274-.02.352 0 .065.013.143.039.234a.133.133 0 0 0-.039.098v.137c-.026.156-.033.234-.02.234.013 0 .02.007.02.02-.026.104-.04.175-.04.215.014.09.014.143 0 .156v.058a.39.39 0 0 1 0 .176c0 .026.014.072.04.137a.586.586 0 0 0-.098.312c-.026.026-.032.059-.02.098.014.04.02.078.02.117l-.078.469c-.026.143-.052.293-.078.45 0 .168-.007.305-.02.41l-.038.253c.013.157.006.254-.02.293-.013.04-.026.091-.04.156a.442.442 0 0 1-.155.157.183.183 0 0 0-.098.136c-.104.04-.182.027-.234-.039a.662.662 0 0 0-.157-.175v-.254a.24.24 0 0 1 .098-.196.977.977 0 0 1-.02-.117c.013-.026.013-.058 0-.097.052-.014.079-.059.079-.137 0-.078.013-.143.039-.195a.27.27 0 0 0 .02-.118c0-.052.006-.104.019-.156.039-.13.052-.202.039-.215-.013-.026-.013-.065 0-.117 0-.065.006-.143.02-.234.025-.091.045-.176.058-.254v-.215c0-.078.006-.17.02-.274a.788.788 0 0 0 .019-.292c-.013-.105-.013-.17 0-.196a.321.321 0 0 0 .02-.097.218.218 0 0 0-.02-.098v-.117a.37.37 0 0 1 .02-.117c.025-.053.025-.098 0-.137v-.43c.013-.117.019-.234.019-.351 0-.183-.006-.306-.02-.372a1.1 1.1 0 0 0-.019-.214 7.114 7.114 0 0 1-.02-.508 3.06 3.06 0 0 0 0-.488c0-.105-.006-.209-.02-.313a.735.735 0 0 0-.058-.293.4.4 0 0 0 0-.176.692.692 0 0 0-.058-.195.18.18 0 0 0 0-.117c-.013-.052-.007-.091.02-.117a6.87 6.87 0 0 0-.079-.274V5.63l-.039-.195c.013-.013.02-.033.02-.059a1.164 1.164 0 0 1-.04-.156c.013-.013.02-.033.02-.059-.065-.13-.091-.208-.078-.234.013-.04.006-.072-.02-.098l-.058-.195c.013-.013.006-.02-.02-.02a.417.417 0 0 0-.02-.215 1.28 1.28 0 0 0-.077-.214c0-.144-.013-.215-.04-.215l-.038-.04a2.89 2.89 0 0 1-.06-.292.394.394 0 0 0-.077-.254c.013-.13 0-.241-.04-.332a2.881 2.881 0 0 0-.097-.313 1.293 1.293 0 0 0-.098-.234.174.174 0 0 1-.02-.078.318.318 0 0 1-.155-.137.45.45 0 0 1-.04-.156.452.452 0 0 1 .079-.117c.039-.026.058-.072.058-.137.13-.078.196-.13.196-.156a.164.164 0 0 1 .136.02c.04.012.078.019.118.019zm.742 13.36c.026.038.045.084.058.136.026.039.046.084.059.137.039.09.052.156.039.195a.434.434 0 0 0-.02.137l-.195.195c-.117.091-.215.15-.293.176a.867.867 0 0 1-.273.039.21.21 0 0 1-.118-.04.098.098 0 0 0-.117 0 .978.978 0 0 1-.293-.312.791.791 0 0 1 .04-.37 5.92 5.92 0 0 0 .156-.294c.065.013.11.007.136-.02a.244.244 0 0 1 .098-.058c.091.052.17.046.234-.02h.157a.244.244 0 0 1 .136 0 .738.738 0 0 0 .157.079c.013-.014.026-.007.039.02z"/></svg>',
  batch: '<svg viewBox="0 0 70 18"><path d="M5.508 7.914c-.013.17-.02.293-.02.371.013.078.04.137.078.176 0 .17.013.3.04.39.039.079.045.15.019.215.065.105.091.163.078.176-.013 0-.02.013-.02.04.04.064.06.13.06.195a.34.34 0 0 0 .097.175c.013.196.032.313.058.352-.026.104-.032.176-.02.215.014.039.027.071.04.097 0 .118.013.202.039.254.013.04.02.078.02.117 0 .04.006.079.02.118.038.143.051.221.038.234v.02a.39.39 0 0 1 0 .175.19.19 0 0 0 .04.098c.012.026.019.065.019.117.013.052.02.091.02.117a.4.4 0 0 1 0 .176.84.84 0 0 0-.02.156v.41a.957.957 0 0 1 0 .274c-.013.091-.02.143-.02.156a.15.15 0 0 0 .02.059c-.026.104-.04.17-.04.195a.15.15 0 0 0 .02.059.82.82 0 0 0-.078.37c0 .183-.013.313-.039.392-.013.065-.02.136-.02.214a.906.906 0 0 1-.117.196c-.026.013-.039.026-.039.039-.026.13-.045.208-.058.234-.013.013-.02.04-.02.078a1.148 1.148 0 0 0-.098.254c.013.026.02.052.02.078a.256.256 0 0 0-.117.117.247.247 0 0 1-.137.118l-.078.156a.227.227 0 0 1-.059.039 20.6 20.6 0 0 1-.175.273c-.013.026-.013.066 0 .118a.255.255 0 0 0-.118.117.492.492 0 0 1-.058.117c-.117.039-.176.065-.176.078 0 .013-.006.026-.02.04a2.97 2.97 0 0 0-.449.214.926.926 0 0 1-.254.137.446.446 0 0 1-.254.097 1.322 1.322 0 0 0-.214.059c-.026.026-.052.039-.079.039l-.312.04c-.156.051-.247.07-.273.058-.013-.013-.033-.02-.059-.02-.17.026-.26.033-.273.02a.43.43 0 0 1-.176-.078.278.278 0 0 0-.156-.04c-.196-.078-.313-.169-.352-.273a1.664 1.664 0 0 1-.234-.156c-.026-.013-.033-.04-.02-.078-.078 0-.13-.026-.156-.078a.295.295 0 0 0-.117-.098c.013-.065 0-.098-.04-.098-.039-.013-.058-.052-.058-.117a.972.972 0 0 0-.137-.098l-.078-.078c-.078-.182-.104-.293-.078-.332.026-.039.033-.09.02-.156.065-.065.13-.085.195-.059.078.026.17.026.273 0 .183-.026.274.02.274.137 0 .104-.033.176-.098.215.104.208.202.325.293.351.091.105.15.17.176.196a.757.757 0 0 0 .097.039c.118.065.176.11.176.137.065.013.104.026.117.039a.956.956 0 0 1 .098.058c.104.04.24.052.41.04a.37.37 0 0 1 .117-.02c.04 0 .072-.007.098-.02a.19.19 0 0 1 .098-.039.37.37 0 0 0 .117-.02c.078-.025.15-.051.215-.078a.775.775 0 0 0 .195-.117c.117-.013.182-.026.195-.039l.079-.078c.117 0 .182-.013.195-.039a.228.228 0 0 1 .039-.059c.091-.117.143-.169.156-.156.013 0 .02-.006.02-.02.078-.051.123-.097.136-.136a.131.131 0 0 1 .118-.059l.078-.195a.236.236 0 0 1 .136-.137c0-.039.007-.071.02-.097a.491.491 0 0 0 .059-.117.755.755 0 0 1 .078-.215c.039-.104.065-.183.078-.235a.388.388 0 0 1 .117-.136c.013-.066.02-.137.02-.215a.315.315 0 0 1 .078-.176c.052-.182.078-.28.078-.293a.435.435 0 0 0 .039-.195v-.254c.013-.078.02-.156.02-.235a.394.394 0 0 0-.02-.214c.039-.13.052-.209.039-.235a56.824 56.824 0 0 0-.04-.078.649.649 0 0 0 .06-.254 1.62 1.62 0 0 1-.04-.176.083.083 0 0 0 0-.078c-.026-.09-.032-.143-.02-.156.014-.013.014-.033 0-.059a.21.21 0 0 0-.038-.117.642.642 0 0 1-.02-.156v-.117a.313.313 0 0 0 0-.156 1.377 1.377 0 0 1-.078-.293c.013-.04.013-.072 0-.098-.039-.182-.065-.3-.078-.352a.522.522 0 0 0-.04-.195 2.294 2.294 0 0 0-.077-.45.24.24 0 0 0-.04-.136c0-.156-.006-.234-.019-.234s-.02-.007-.02-.02a1.133 1.133 0 0 1-.058-.293l-.059-.273c-.039-.104-.052-.163-.039-.176.013-.026.013-.059 0-.098-.039-.065-.058-.11-.058-.136.013-.04.006-.065-.02-.079a.639.639 0 0 0-.058-.37.424.424 0 0 1-.04-.313c-.038-.17-.071-.254-.097-.254a.227.227 0 0 0-.059-.04c.026-.194.013-.318-.039-.37a.21.21 0 0 1-.02-.195.948.948 0 0 1-.116-.293 1.042 1.042 0 0 0-.079-.235V6.06c.013-.092.013-.15 0-.176l-.039-.117v-.137a.574.574 0 0 0 .02-.137.523.523 0 0 1-.02-.234.164.164 0 0 0-.02-.137c-.051 0-.09.013-.116.04a.605.605 0 0 1-.117.038.248.248 0 0 1-.06.117c-.025.026-.038.072-.038.137a.64.64 0 0 1-.098.078c-.026.013-.032.052-.02.117a.286.286 0 0 0-.136.098l-.078.078a.794.794 0 0 0-.176.196.247.247 0 0 0-.137.117c-.026.039-.058.09-.097.156a1.165 1.165 0 0 1-.176.215.659.659 0 0 0-.117.176c0 .026-.02.045-.059.058a2.79 2.79 0 0 1-.078.196.306.306 0 0 1-.059.078c.013.065-.006.13-.058.195-.04.052-.078.098-.117.137-.105.143-.19.228-.254.254a.541.541 0 0 1-.254.332c-.026.156-.065.26-.117.312a.369.369 0 0 0-.02.117c0 .04-.006.072-.02.098-.09.13-.143.215-.156.254 0 .039-.02.071-.058.098-.013.143-.033.22-.059.234-.013 0-.02.013-.02.039-.038.104-.052.163-.038.176.013.013.019.026.019.039a.685.685 0 0 0-.078.195c.013.026.006.052-.02.078-.013.143-.02.235-.02.274.014.026.014.058 0 .097-.051.091-.07.15-.058.176.026.013.026.033 0 .059.013.09.02.175.02.254a.684.684 0 0 0-.04.214.243.243 0 0 0 0 .137.21.21 0 0 1 .04.117c-.04.144-.059.228-.059.254.026.13.033.202.02.215v.02c0 .156-.007.254-.02.293a.18.18 0 0 0 0 .117c0 .026.013.071.04.136.025.053.038.098.038.137a.822.822 0 0 1-.02.137c0 .065.014.117.04.156.026.143.045.228.058.254a.226.226 0 0 1 .04.059c.052.156.104.254.156.293a.24.24 0 0 1 .117.175.462.462 0 0 1 .176.059.43.43 0 0 0 .136.02c.183-.118.352-.209.508-.274.078-.13.13-.215.156-.254.04-.039.053-.104.04-.195.078-.195.123-.3.136-.313.026-.143.033-.26.02-.351a1.102 1.102 0 0 1 0-.293c.013-.078.02-.156.02-.235a.26.26 0 0 0-.098-.214.604.604 0 0 1 .039-.118.436.436 0 0 0 .058-.156c.065.013.111-.006.137-.058.04-.053.085-.072.137-.059.104.078.169.117.195.117.04 0 .065.02.078.059.026.091.033.15.02.176v.078a1.097 1.097 0 0 1-.04.254v.058a.788.788 0 0 1-.019.293 3.383 3.383 0 0 1-.039.274 2.13 2.13 0 0 0-.039.449l-.078.293a.835.835 0 0 1-.137.254.248.248 0 0 0-.058.117.493.493 0 0 1-.059.117.575.575 0 0 1-.176.137.307.307 0 0 0-.078.058c-.065-.026-.11-.013-.137.04a.295.295 0 0 1-.117.097.928.928 0 0 1-.254.059c-.052.026-.162.039-.332.039a.39.39 0 0 0-.176 0 .32.32 0 0 1-.097-.02c-.13-.039-.202-.071-.215-.097a.245.245 0 0 0-.059-.098c-.09-.117-.15-.17-.175-.156-.013 0-.026-.007-.04-.02a.791.791 0 0 0-.195-.312 3.255 3.255 0 0 0-.117-.293.43.43 0 0 0-.078-.176c.026-.091.032-.143.02-.156-.014-.013-.02-.033-.02-.059a.474.474 0 0 0 0-.195c0-.04.013-.072.039-.098a.953.953 0 0 1-.059-.098.432.432 0 0 1-.02-.136c0-.04.007-.072.02-.098.013-.026.007-.065-.02-.117 0-.13-.006-.202-.019-.215v-.059l.04-.253-.02-.215c0-.026.006-.065.02-.117a.534.534 0 0 0 .019-.118.708.708 0 0 1 0-.234l.058-.176c.027-.065.033-.182.02-.351-.013-.183.02-.306.098-.371.026-.105.039-.19.039-.254 0-.079.006-.15.02-.215a1.63 1.63 0 0 1 .116-.215c.053-.065.079-.11.079-.137a.321.321 0 0 0 .02-.097.471.471 0 0 0 .058-.157.369.369 0 0 0 .02-.117c.077-.182.136-.293.175-.332a.35.35 0 0 0 .059-.215c.117-.117.188-.208.214-.273a.236.236 0 0 1 .137-.137c.04-.117.065-.176.078-.176a.306.306 0 0 0 .078-.058c.066-.091.098-.15.098-.176a.757.757 0 0 1 .04-.098.606.606 0 0 0 .175-.215l.098-.195a3.2 3.2 0 0 1 .195-.254.297.297 0 0 0 .078-.156.306.306 0 0 0 .078-.059.64.64 0 0 0 .098-.078c.052-.104.104-.169.156-.195a.49.49 0 0 1 .117-.195.35.35 0 0 0 .098-.196c.117-.065.176-.11.176-.136.013-.026.039-.033.078-.02 0-.065.02-.104.058-.117a.183.183 0 0 0 .098-.137c.117-.091.182-.143.195-.156l.079-.078c.09-.065.143-.104.156-.117a.64.64 0 0 1 .097-.079.64.64 0 0 0 .04-.156c0-.026.006-.045.019-.058a.83.83 0 0 0 .02-.293v-.157l.039-.156c.013-.052.026-.11.039-.176.052-.169.078-.26.078-.273.013-.156.032-.247.058-.274a.136.136 0 0 0 .04-.136.297.297 0 0 0 .078-.156.25.25 0 0 1 .097-.157c.013-.117.026-.195.04-.234a.434.434 0 0 0 .058-.137.412.412 0 0 0 .137-.195.577.577 0 0 1 .156-.195.389.389 0 0 0 .098-.254.245.245 0 0 1 .097-.059.248.248 0 0 0 .117-.059c.118-.09.183-.136.196-.136a.173.173 0 0 0 .078-.02.436.436 0 0 1 .156-.058.445.445 0 0 0 .176-.098c.13-.04.24-.046.332-.02.091.013.17.013.234 0l.117.079c.04.013.092.02.157.02.117.103.182.175.195.214a.306.306 0 0 1 .059.078c.065.208.058.43-.02.664-.065.13-.124.228-.176.293a.765.765 0 0 0-.097.176.672.672 0 0 0-.235.234c-.078.117-.143.183-.195.196 0 .065-.02.11-.059.136-.039.026-.065.072-.078.137a1.171 1.171 0 0 0-.195.098 2.125 2.125 0 0 1-.117.156c-.013.013-.02.032-.02.058-.091.013-.15.072-.176.176-.13.091-.221.163-.273.215a.256.256 0 0 0-.117.117c-.026.04-.078.065-.157.078a.49.49 0 0 1-.117.196c-.09.065-.15.11-.175.136a.227.227 0 0 1-.06.04c-.012.065-.032.13-.058.195a.822.822 0 0 0-.02.195c0 .182-.006.32-.019.41-.013.091 0 .17.04.235-.04.117-.053.182-.04.195.026 0 .046.013.059.039a.594.594 0 0 1 0 .215c0 .065.006.137.02.215.025.104.045.176.058.215.013.039.033.09.059.156.039.104.052.182.039.234 0 .04.013.085.039.137.039.065.065.117.078.156.013.04.026.072.039.098a.48.48 0 0 1 .02.234c0 .065.025.124.078.176 0 .052.006.098.02.137.012.026.012.065 0 .117l.136.117zm-.313-4.297c.209-.182.352-.312.43-.39l.234-.274.079-.078.078-.117.175-.117a.186.186 0 0 0 .079-.157.521.521 0 0 0 .136-.097.316.316 0 0 0 .078-.176.175.175 0 0 0 .098-.117.269.269 0 0 1 .059-.137c.065-.143.09-.234.078-.273.013-.079.013-.13 0-.157a.306.306 0 0 0-.059-.078.45.45 0 0 1-.156-.039c-.065-.026-.117-.006-.156.059a.508.508 0 0 0-.157.02.217.217 0 0 0-.097.019 1.356 1.356 0 0 0-.293.176.521.521 0 0 1-.137.097.297.297 0 0 1-.078.157c-.04.039-.052.09-.04.156-.103.117-.162.202-.175.254a.245.245 0 0 1-.059.097.882.882 0 0 1-.078.118c-.039.039-.045.065-.02.078.014.013 0 .052-.038.117-.026.052-.026.084 0 .097-.065.13-.098.215-.098.254 0 .04-.006.072-.02.098a.685.685 0 0 0-.078.195c.013.026.02.059.02.098a.53.53 0 0 0-.078.176c.013.026.02.052.02.078.065.013.11 0 .136-.04a.295.295 0 0 1 .117-.097zM10.117 7.113c-.026.157-.058.254-.098.293-.039.04-.052.11-.039.215-.104.13-.156.215-.156.254a.083.083 0 0 1 0 .078.842.842 0 0 1-.136.234c0 .092-.014.144-.04.157a.227.227 0 0 0-.039.058 5.926 5.926 0 0 0-.078.371 1.757 1.757 0 0 0 0 .372.523.523 0 0 0 .235.02.994.994 0 0 1 .195-.02c.221-.013.358-.013.41 0 .117.013.195.02.234.02a.117.117 0 0 0 .079-.08c.013.027.052.047.117.06.065 0 .11-.013.136-.04.066.066.124.111.176.137.052.182.046.287-.02.313a.523.523 0 0 0-.136.097c-.234.078-.371.078-.41 0a6.928 6.928 0 0 0-.371-.058.974.974 0 0 0-.371.039 5.586 5.586 0 0 0-.293.039c-.078 0-.137.02-.176.058 0 .079-.013.15-.04.215a.284.284 0 0 0 .02.176 7.668 7.668 0 0 1-.097.215v.137a.605.605 0 0 0-.04.117c0 .039-.019.072-.058.098a.38.38 0 0 1 0 .292c.052.118.059.176.02.176-.026-.013-.04 0-.04.04.014.051.02.09.02.117 0 .025.007.071.02.136 0 .156-.007.267-.02.332a.726.726 0 0 0-.02.176.771.771 0 0 1 0 .254v.352c.014.09.027.162.04.214a.37.37 0 0 1 .02.118.18.18 0 0 1 0 .117v.117l.038.156a.864.864 0 0 1 .078.156.322.322 0 0 1-.02.098c-.012.04-.006.085.02.137.065.182.091.3.078.351 0 .04.013.091.04.157a.615.615 0 0 1 .078.214c0 .04.006.079.02.118l.077.195c.04.052.072.104.098.156a.315.315 0 0 0 .02.195l.117.157c.117.13.169.195.156.195a.576.576 0 0 0 .176.137c.039.013.058.052.058.117.13.039.248.098.352.176.065-.052.117-.072.156-.059.04.013.072.033.098.059l.078.078a.605.605 0 0 0 .117.039v.137c.013.052.04.078.078.078-.13.09-.215.13-.254.117h-.058c-.117.143-.202.202-.254.176a.267.267 0 0 0-.176-.02c-.078-.09-.137-.143-.176-.156-.026-.013-.045-.04-.058-.078-.183-.13-.326-.195-.43-.195a3.22 3.22 0 0 0-.273-.254 1.458 1.458 0 0 1-.157-.137c0-.13-.013-.195-.039-.195a.307.307 0 0 1-.078-.059.9.9 0 0 1-.078-.313.26.26 0 0 0-.098-.214c.013-.091 0-.157-.039-.196a.458.458 0 0 1-.097-.156.4.4 0 0 1 0-.176.285.285 0 0 0-.02-.175 1.38 1.38 0 0 0-.098-.254c-.013-.013-.02-.026-.02-.04a.307.307 0 0 0-.038-.214.361.361 0 0 1 0-.235 2.688 2.688 0 0 1-.078-.312 1.314 1.314 0 0 1-.02-.215v-.098a.368.368 0 0 0 .02-.117 4.375 4.375 0 0 1-.04-.234v-.293-.117c.014-.04.027-.085.04-.137.013-.143.013-.221 0-.234v-.04-.136a.605.605 0 0 1 .039-.117.307.307 0 0 1-.04-.215.737.737 0 0 0 .04-.235v-.136a.272.272 0 0 0-.02-.118.485.485 0 0 0-.02-.175c0-.026.014-.052.04-.079.039-.156.052-.234.039-.234v-.02c0-.038.006-.09.02-.156a.356.356 0 0 0 .019-.195.486.486 0 0 0-.215.059c-.078.039-.143.032-.195-.02a.245.245 0 0 1-.098.059.574.574 0 0 0-.137.02c-.13.038-.234.07-.312.097a.6.6 0 0 1-.254-.02 1.747 1.747 0 0 0-.176-.234c-.026-.052-.026-.117 0-.195a.573.573 0 0 1 .215-.04c.091-.012.156-.045.195-.097.065.013.13.02.196.02.065-.014.143-.027.234-.04.026-.052.085-.071.176-.058a.548.548 0 0 0 .254-.02c.169-.078.26-.136.273-.175.013-.053.033-.118.059-.196.039-.104.052-.163.039-.176-.013-.026-.013-.058 0-.097a.88.88 0 0 0 .039-.176c.013-.04.006-.065-.02-.078.078-.104.111-.163.098-.176v-.059c.065-.09.098-.15.098-.175 0-.04.02-.065.058-.078-.013-.092 0-.157.04-.196a.908.908 0 0 0 .136-.176c.013-.117.033-.24.059-.37.104-.144.162-.215.175-.215.026 0 .052-.013.079-.04a.605.605 0 0 0 .175-.058.173.173 0 0 1 .078-.02c.052.079.079.137.079.176.013.026.045.052.097.078zM12.793 7.367l-.117.078a.245.245 0 0 0-.098.059.277.277 0 0 0-.156.039c-.026.013-.065.013-.117 0-.143-.104-.228-.182-.254-.234.026-.052.032-.098.02-.137a.18.18 0 0 1 0-.117c.13-.065.201-.111.214-.137a.131.131 0 0 1 .117-.059.164.164 0 0 1 .02-.136.437.437 0 0 0 .058-.137.71.71 0 0 0 0-.234.307.307 0 0 1 .04-.215.241.241 0 0 1-.04-.137l.04-.156c-.066-.065-.13-.072-.196-.02a.777.777 0 0 1-.195.117 1.594 1.594 0 0 1-.274-.039c-.026-.026-.071-.032-.136-.02a3.715 3.715 0 0 1-.215-.35.36.36 0 0 1 0-.235c.091-.143.156-.221.195-.234a.175.175 0 0 0 .117-.098l.352.039c.078.039.124.059.137.059a.173.173 0 0 1 .078-.02c.039.026.078.059.117.098.052.026.11.032.176.02.013.064.071.11.176.136a.48.48 0 0 0 .058.137.227.227 0 0 1 .04.058c.025.156.045.254.058.293a.307.307 0 0 0 .058.078c.013.144.013.228 0 .254v.04c-.026.182-.039.299-.039.35a.397.397 0 0 1 0 .177.646.646 0 0 0-.078.097c-.013.026-.013.072 0 .137a.19.19 0 0 0-.078.117.248.248 0 0 1-.059.117v.118c0 .039-.006.071-.019.097zM14.96 9.516a1.88 1.88 0 0 0-.038.136c0 .052-.026.091-.078.118-.117.22-.156.423-.117.605.052.195.078.319.078.371 0 .04.013.085.039.137.039.039.058.078.058.117.013.04.04.059.079.059 0 .104.039.175.117.214 0 .053.02.092.058.118.04.013.059.052.059.117a.255.255 0 0 1 .117.117c.026.04.072.072.137.098.052.065.09.11.117.136.039.026.072.053.098.079l.175.156.235.234c.039.117.123.222.254.313.143.13.234.214.273.254.04.026.078.065.117.117-.013.117.033.195.137.234a.496.496 0 0 0 .098.254l.195.195c0 .078.02.143.059.196.039.039.078.084.117.136.026.144.045.228.058.254l.059.059a3.163 3.163 0 0 1 .078.703c-.026.117-.032.195-.02.234.014.026.02.052.02.079-.039.195-.085.332-.137.41-.013.039-.032.084-.058.136a.434.434 0 0 0-.02.137c-.17.17-.26.287-.273.352-.182.078-.287.143-.313.195l-.097.098a.636.636 0 0 1-.078.097 1.64 1.64 0 0 0-.215.117c0 .014-.013.014-.04 0-.117.066-.22.111-.312.137-.156.026-.24.046-.254.059-.013.013-.026.02-.039.02a.595.595 0 0 0-.215 0 .207.207 0 0 1-.175 0c-.118-.079-.202-.118-.254-.118a.218.218 0 0 1-.098-.02c-.091-.064-.15-.097-.176-.097a.174.174 0 0 1-.078-.02 1.209 1.209 0 0 0-.195-.195c-.026 0-.046-.006-.059-.02a3.16 3.16 0 0 1-.137-.234.183.183 0 0 0-.136-.098 3.82 3.82 0 0 0-.04-.175.19.19 0 0 0-.078-.117 2.727 2.727 0 0 0-.058-.313c0-.039.006-.085.02-.137v-.312a.284.284 0 0 0-.02-.176c.052-.039.078-.124.078-.254.065 0 .098-.02.098-.058l.039-.157a.97.97 0 0 0 .195-.136l.156-.118c.078-.09.13-.136.157-.136.039 0 .052-.013.039-.04.078.014.13.014.156 0 .039-.012.065-.032.078-.058a.84.84 0 0 0 .215.04.27.27 0 0 0 .137-.06c.026.04.052.06.078.06a.333.333 0 0 1 .136-.02l.215.117c.026 0 .04.013.04.039.064.09.136.176.214.254a.558.558 0 0 1 .195.234.495.495 0 0 1-.117.234c-.039.053-.09.111-.156.176a.494.494 0 0 1-.195 0 2.242 2.242 0 0 0-.215-.039.586.586 0 0 1-.137-.332.535.535 0 0 1-.117-.02c-.04-.025-.098-.032-.176-.019a.518.518 0 0 0-.273.117.595.595 0 0 1-.196.137 4.35 4.35 0 0 0-.078.332.892.892 0 0 0 .04.508.19.19 0 0 1 .038.098.247.247 0 0 0 .098.058c.04.013.052.052.04.117a.524.524 0 0 1 .136.098c.039.039.078.072.117.098.17.065.28.117.332.156a.363.363 0 0 0 .234.078c.183-.04.287-.065.313-.078a.3.3 0 0 0 .117-.04.977.977 0 0 1 .137-.097c.026 0 .052-.013.078-.039.052-.078.085-.117.098-.117a.174.174 0 0 0 .078-.02c.052-.039.09-.071.117-.097a.64.64 0 0 0 .098-.078c0-.053.013-.092.039-.118a.64.64 0 0 0 .078-.097c.065-.104.091-.183.078-.235 0-.052.02-.09.059-.117.013-.156.02-.306.02-.45a.633.633 0 0 0-.118-.39c-.013-.13-.026-.201-.04-.215l-.058-.058a2.198 2.198 0 0 1-.02-.156.173.173 0 0 0-.019-.079 2.848 2.848 0 0 0-.215-.273.428.428 0 0 1-.078-.176c-.065-.09-.104-.136-.117-.136a.228.228 0 0 1-.04-.06 1.192 1.192 0 0 0-.097-.155.228.228 0 0 1-.039-.059c-.065 0-.11-.065-.137-.195-.104-.065-.162-.11-.175-.137-.157-.195-.287-.319-.39-.371a2.135 2.135 0 0 0-.157-.176.739.739 0 0 0-.195-.137c-.013-.09-.053-.15-.118-.175a.263.263 0 0 1-.097-.176 2.469 2.469 0 0 1-.371-.45 2.291 2.291 0 0 0-.215-.35 2.206 2.206 0 0 0-.04-.274 3.82 3.82 0 0 1-.038-.176c0-.13-.007-.202-.02-.215-.013-.013-.02-.032-.02-.059l.02-.234c.013 0 .02-.013.02-.039a1.352 1.352 0 0 0-.04-.156.26.26 0 0 1 .06-.156.74.74 0 0 1 .077-.196c.026-.039.026-.071 0-.097a.64.64 0 0 1 .098-.079c.039-.026.052-.071.039-.136.234-.104.397-.228.488-.371a.864.864 0 0 0 .157-.079.441.441 0 0 1 .195-.078.897.897 0 0 0 .234-.117c.04-.039.072-.045.098-.02.104-.025.17-.038.195-.038.04 0 .072.013.098.039.117.013.176.013.176 0 .013-.026.032-.033.058-.02.17.013.28.033.332.059.065.013.13.02.196.02.026.038.09.07.195.097.104.078.17.137.195.176.026.039.065.071.117.097.052.078.085.124.098.137l.078.04c.052.168.091.266.117.292.04.026.046.046.02.059a.349.349 0 0 1 .098.097l.117.118c-.013.117-.013.182 0 .195.013 0 .02.013.02.039 0 .065-.02.137-.06.215 0 .09-.006.15-.019.176l-.039.078a1.79 1.79 0 0 0-.059.214.25.25 0 0 1-.097.157c-.078.13-.15.215-.215.254-.065.039-.13.084-.195.136a5.875 5.875 0 0 1-.254.059c-.065.013-.13.033-.196.059-.117 0-.182.006-.195.02a.15.15 0 0 1-.058-.02.246.246 0 0 1-.098-.059.247.247 0 0 0-.117-.059.38.38 0 0 1 0-.293.361.361 0 0 1 .195-.175c.091.013.143.02.156.02a.173.173 0 0 1 .078-.02c.118-.013.19-.02.215-.02l.078-.039c.117-.104.17-.156.157-.156-.013-.013-.007-.033.02-.059.064-.13.103-.195.116-.195.013-.013.02-.026.02-.04a.245.245 0 0 0-.04-.194l-.077-.196a.314.314 0 0 1-.04-.137.218.218 0 0 0-.019-.097c-.091-.13-.17-.209-.234-.235a.661.661 0 0 1-.176-.156c-.13 0-.202-.006-.215-.02 0-.025-.013-.038-.039-.038a.338.338 0 0 0-.195-.02h-.176c-.195 0-.32.013-.371.04a1.07 1.07 0 0 0-.137.058 1.073 1.073 0 0 0-.273.156c-.04.026-.052.059-.04.098h-.097zM30.547 15.492c-.065.104-.11.156-.137.156-.013 0-.026.014-.039.04-.104.078-.17.123-.195.136-.13.013-.195.026-.195.04h-.04c-.182-.066-.3-.092-.351-.079a.22.22 0 0 1-.156-.02l-.235-.078a.762.762 0 0 1-.176-.097.146.146 0 0 0-.156-.059c-.065-.143-.17-.221-.312-.234a1.287 1.287 0 0 1-.117-.215c-.014-.039-.046-.059-.098-.059-.091.105-.15.17-.176.196a.31.31 0 0 1-.059.078c-.117.091-.188.137-.214.137a5.323 5.323 0 0 1-.313.254 1.38 1.38 0 0 1-.371.156.19.19 0 0 1-.117.078.188.188 0 0 0-.098.078c-.13-.013-.228.013-.293.078-.052-.026-.097-.032-.137-.02a.435.435 0 0 1-.136.06c-.091-.014-.15-.014-.176 0-.013.012-.033.019-.059.019a1.469 1.469 0 0 1-.253-.059h-.079c-.156 0-.26-.013-.312-.039-.04-.013-.085-.006-.137.02-.078-.079-.137-.118-.176-.118a1.053 1.053 0 0 1-.136-.058 1.19 1.19 0 0 1-.215-.117.607.607 0 0 0-.254-.098 4.281 4.281 0 0 0-.195-.254.348.348 0 0 0-.098-.098.522.522 0 0 1-.098-.136.596.596 0 0 1-.156-.137c-.013-.026-.046-.046-.098-.059a.277.277 0 0 0-.039-.156.782.782 0 0 0-.097-.117l-.078-.234a.309.309 0 0 0-.118-.196.186.186 0 0 0-.058-.176.609.609 0 0 1-.078-.214c0-.144-.013-.228-.04-.254a.366.366 0 0 1-.019-.117c.026-.157.033-.248.02-.274a.32.32 0 0 1-.02-.098c0-.065.006-.117.02-.156a.605.605 0 0 1 .039-.117c.013-.065.02-.137.02-.215 0-.078.019-.143.058-.195v-.195a.309.309 0 0 1 .058-.079.76.76 0 0 0 .059-.156c.013-.052.033-.11.059-.176.104-.169.169-.3.195-.39a.74.74 0 0 1 .156-.235c.078-.104.13-.175.156-.214a.298.298 0 0 1 .157-.079c.078-.117.13-.182.156-.195.026-.013.032-.033.02-.059a.49.49 0 0 0 .195-.117l.156-.156a.439.439 0 0 0 .156-.059c.052-.039.098-.071.137-.097.143-.013.221-.026.234-.04.026-.025.052-.025.078 0 .066-.064.15-.084.254-.058.104.013.228.013.371 0 .196-.052.346-.065.45-.039.117.013.234.033.351.059.143.078.267.13.371.156.091.078.15.13.176.156.026.013.059.02.098.02.026.065.065.104.117.117.052 0 .084.033.098.098.117.065.182.104.195.117.013.013.026.02.039.02a1.61 1.61 0 0 0 .176-.196.94.94 0 0 0 .058-.098c.026-.026.072-.039.137-.039a.278.278 0 0 0 .156-.039c.117-.039.183-.045.196-.02.026.014.065.02.117.02.143.117.234.221.273.313a.62.62 0 0 0 .176.234c.026.065.046.143.059.234.026.079.039.17.039.274.013.143.02.24.02.293l-.02.37c0 .131-.007.255-.02.372 0 .117-.013.228-.039.332-.039.17-.065.267-.078.293a2.44 2.44 0 0 0-.156.352c-.04.117-.072.182-.098.195a.228.228 0 0 0-.039.059.432.432 0 0 0-.059.136c-.013.04-.045.072-.097.098a3.926 3.926 0 0 0-.117.273c-.014.04-.014.072 0 .098.078.143.117.234.117.273.013.04.032.072.058.098a.247.247 0 0 0 .098.059.245.245 0 0 1 .098.058c.104.078.156.124.156.137h.039a.475.475 0 0 0 .156.117.607.607 0 0 1 .117.04c.144.025.222.045.235.058a.322.322 0 0 0 .097-.02c.105-.013.176-.026.215-.039.04-.026.091-.026.157 0 .13.104.195.176.195.215 0 .026.013.052.039.078zm-2.95-4.258a2.219 2.219 0 0 0-.214-.195.808.808 0 0 0-.156-.117 2.34 2.34 0 0 1-.332-.195 2.523 2.523 0 0 0-.235-.059 2.021 2.021 0 0 0-.137-.059c-.065-.026-.104-.026-.117 0-.104.013-.162.02-.175.02-.014-.013-.033-.013-.06 0a8.172 8.172 0 0 0-.37.059.596.596 0 0 1-.215 0c-.065.039-.137.078-.215.117a.52.52 0 0 0-.176.117c-.156.091-.273.17-.351.234a.469.469 0 0 0-.176.235c-.078.09-.13.156-.156.195a1.06 1.06 0 0 1-.059.137.434.434 0 0 0-.058.136c-.014.04-.046.072-.098.098a.437.437 0 0 1-.059.156.496.496 0 0 1-.058.117l-.04.157c0 .039-.012.071-.038.097a.21.21 0 0 1-.02.196.518.518 0 0 0-.02.254c-.039.143-.058.254-.058.332a.83.83 0 0 1 0 .254c.052.182.091.299.117.351a.32.32 0 0 1 .04.176c.103.13.188.3.253.508a.537.537 0 0 1 .156.136c.04.04.072.105.098.196.104.09.163.143.176.156.078.078.117.13.117.156a.23.23 0 0 0 .059.04c.13.064.208.097.234.097.026 0 .052.02.078.059.091.013.17.039.234.078.079.039.15.084.215.136.13-.026.209-.026.235 0 .039.013.071.033.097.059a.299.299 0 0 1 .117-.04c.04 0 .092.007.157.02.078 0 .13-.006.156-.02a.94.94 0 0 0 .098-.058c.039-.013.11-.02.215-.02a.642.642 0 0 0 .195-.097c.026-.039.052-.045.078-.02.104-.104.176-.156.215-.156.039 0 .071-.013.097-.039.091-.104.157-.156.196-.156l.175-.176a.173.173 0 0 0 .02-.078.2.2 0 0 0 .156-.176.532.532 0 0 1 .137-.234l-.078-.273c-.04-.027-.059-.06-.059-.098a.366.366 0 0 0-.02-.117c-.025-.117-.051-.19-.077-.215a1.239 1.239 0 0 1-.078-.352.549.549 0 0 0-.02-.254 1.359 1.359 0 0 1-.059-.234c.013-.026.013-.072 0-.137 0-.09-.006-.175-.02-.254v-.254-.234a.523.523 0 0 0-.038-.195c.065-.13.09-.209.078-.235-.013-.026-.013-.058 0-.097-.052-.143-.104-.222-.156-.235zm.645.489c0 .052-.006.15-.02.293 0 .13.014.221.04.273-.026.052-.033.098-.02.137.013.039.02.078.02.117.013.052.026.098.039.137a.133.133 0 0 1 .039.097.666.666 0 0 0 0 .235.6.6 0 0 1 .039.117.49.49 0 0 0 0 .195c.013.065.02.11.02.137a.245.245 0 0 1 .058.098.247.247 0 0 1 .059.117c.065.013.097-.007.097-.059 0-.065.033-.104.098-.117-.026-.065-.02-.117.02-.156a.34.34 0 0 0 .097-.176c0-.143.013-.234.04-.273a.492.492 0 0 0 .058-.118c.039-.169.058-.3.058-.39v-.176c0-.117-.006-.182-.02-.195v-.079c0-.13-.006-.227-.019-.292a.434.434 0 0 0-.039-.196.258.258 0 0 0-.039-.234l-.137-.156c0-.013-.006-.02-.02-.02-.025.04-.058.059-.097.059-.026-.013-.065.02-.117.097a.387.387 0 0 1-.117.137c-.052.04-.065.091-.04.156l-.097.235zM40.195 5.61c-.026.104-.006.188.059.253l-.04.235c0 .065.007.136.02.215v.175c.013 0 .02.013.02.04.013.038 0 .09-.04.156a.827.827 0 0 1-.077.117.278.278 0 0 1-.04.156c-.025.026-.038.052-.038.078-.066.117-.118.182-.157.195-.104.13-.182.222-.234.274a.909.909 0 0 0-.137.176.492.492 0 0 1-.117.058c-.039.013-.072.046-.098.098a1.605 1.605 0 0 0-.234.137c-.091.104-.143.156-.156.156-.013 0-.026.006-.04.02a2.65 2.65 0 0 0-.39.195c-.17.078-.28.13-.332.156-.039.013-.085.026-.137.04-.13.051-.234.097-.312.136-.065.039-.13.071-.196.097-.143.013-.234.02-.273.02-.026 0-.052.013-.078.039a.994.994 0 0 0-.195-.02.266.266 0 0 0-.176.02c-.013.13-.033.24-.059.332a.316.316 0 0 0 .02.195c-.026.13-.04.202-.04.215 0 .078.02.156.06.235a1.606 1.606 0 0 0-.06.351c0 .065.027.117.079.156a.692.692 0 0 0-.059.196.32.32 0 0 0 .04.175c-.027.118-.027.202 0 .254 0 .13-.007.196-.02.196-.013 0-.02.006-.02.02.013.103.02.195.02.273 0 .078.006.15.02.215.025.09.032.156.019.195-.013.026-.007.058.02.098.038.143.051.24.038.292 0 .053.02.092.06.118a.891.891 0 0 1 0 .37.34.34 0 0 0 .058.294.311.311 0 0 0 0 .156.306.306 0 0 0 .058.078c.013.117.02.189.02.215 0 .013.013.026.039.039.078-.13.13-.202.156-.215a.13.13 0 0 1 .02-.117.863.863 0 0 0 .078-.156.758.758 0 0 0 .058-.157.295.295 0 0 1 .098-.117.685.685 0 0 0 .078-.195c0-.026.013-.046.04-.059.025-.065.051-.123.077-.175a.451.451 0 0 0 .04-.157.247.247 0 0 0 .136-.117.522.522 0 0 1 .098-.137c.026-.117.071-.195.136-.234.118-.065.176-.104.176-.117 0-.013.013-.033.04-.059.117-.117.182-.188.195-.215.169-.065.267-.11.293-.136a.19.19 0 0 1 .117-.078c.13-.026.208-.066.234-.118.13.013.228 0 .293-.039.052 0 .085.007.098.02a.3.3 0 0 0 .117-.04.479.479 0 0 0 .234.02c.091.04.176.079.254.118.078.039.163.071.254.097.078.104.13.156.156.156.026-.013.04-.006.04.02a.132.132 0 0 1 .058.117c.013.04.059.065.137.078a.429.429 0 0 0 .078.176c.039.04.065.091.078.156l.098.196c.013 0 .02.013.02.039.012.078.032.175.058.293.039.09.052.15.039.175-.013.027 0 .046.039.059.013.143.013.254 0 .332 0 .078.02.163.059.254-.027.17-.027.267 0 .293a1.404 1.404 0 0 0-.06.176v.175a.886.886 0 0 1-.038.215.227.227 0 0 0-.04.059c-.038.143-.051.234-.038.273.013.04.013.072 0 .098l-.137.273a.452.452 0 0 0-.059.118c-.052.182-.104.3-.156.351a.297.297 0 0 0-.078.156.348.348 0 0 0-.098.098c-.026.04-.071.059-.136.059-.052.143-.085.215-.098.215-.013-.014-.026-.014-.039 0l-.176.136a.42.42 0 0 1-.136.078.294.294 0 0 0-.118.098.35.35 0 0 0-.215.059.245.245 0 0 1-.097.058l-.078.078c-.13.052-.202.085-.215.098a.223.223 0 0 1-.059.04h-.195c-.013.012-.026.019-.04.019a.716.716 0 0 1-.214-.059 1.099 1.099 0 0 0-.215-.02.572.572 0 0 1-.215-.039c-.143.014-.215 0-.215-.039s-.032-.052-.097-.039a.19.19 0 0 0-.078-.117.49.49 0 0 1-.117-.058.848.848 0 0 1-.176.117c-.013.013-.046.006-.098-.02-.065.104-.17.137-.312.098-.04-.143-.085-.228-.137-.254a14.892 14.892 0 0 1-.098-.274.37.37 0 0 1-.02-.117c-.012-.195-.032-.306-.058-.332l-.078-.117a.177.177 0 0 0 0-.195l-.078-.196a.417.417 0 0 0 .02-.214 1.031 1.031 0 0 0-.06-.215c-.051-.143-.084-.215-.097-.215v-.04a.648.648 0 0 0-.078-.097.216.216 0 0 1-.02-.097c-.013-.183-.039-.313-.078-.391l-.078-.234v-.196c.013-.013.02-.026.02-.039-.052-.039-.072-.084-.059-.137.013-.065.007-.11-.02-.136a3.597 3.597 0 0 1-.038-.235.174.174 0 0 0-.02-.078v-.254a.243.243 0 0 0 0-.136l-.059-.235c.013 0 .013-.006 0-.02a2.197 2.197 0 0 1-.039-.195c.013-.026.007-.052-.02-.078.04-.117.046-.182.02-.195-.013-.013-.02-.04-.02-.078.066-.052.092-.124.079-.215a2.84 2.84 0 0 1-.04-.215.174.174 0 0 0 .02-.078 1.289 1.289 0 0 0-.039-.215.433.433 0 0 0-.02-.137c.027-.026.033-.058.02-.097a.43.43 0 0 1 .02-.137c-.065-.13-.085-.202-.059-.215.026-.013.04-.026.04-.039.012-.156.012-.24 0-.254 0-.013.006-.032.019-.058.026-.104.032-.176.02-.215a.535.535 0 0 1-.02-.117.772.772 0 0 0 0-.254l-.04-.117a.269.269 0 0 1 .06-.137c.025-.026.025-.065 0-.117a5.068 5.068 0 0 0-.255-.157.306.306 0 0 1-.078-.058l-.078-.078c-.013-.026-.045-.046-.097-.059a.254.254 0 0 0-.137-.234.254.254 0 0 0 0-.196.338.338 0 0 1 .02-.195.454.454 0 0 1 .078-.117.35.35 0 0 0 .097-.098c.065.026.117.046.156.059a.45.45 0 0 1 .157.039c.052.13.071.215.058.254a.083.083 0 0 0 0 .078l.196.215c.039 0 .065-.033.078-.098a.207.207 0 0 0 0-.176c.104-.13.15-.208.136-.234 0-.026.007-.052.02-.078a.452.452 0 0 1 .078-.117.457.457 0 0 0 .098-.157c.039-.156.071-.247.097-.273.04-.04.059-.098.059-.176.091-.091.124-.143.098-.156-.013-.026-.007-.046.02-.059.025-.052.045-.097.058-.136.026-.052.052-.111.078-.176a.837.837 0 0 1 .078-.117.127.127 0 0 0 .059-.059c.078-.104.13-.17.156-.195.065-.026.104-.052.117-.078.026-.026.052-.033.078-.02a.684.684 0 0 0 .098-.156l.058-.059c.092-.052.137-.084.137-.097 0-.013.013-.026.04-.04.142-.09.227-.13.253-.117l.078-.078a.637.637 0 0 0 .098-.078c.143-.065.221-.091.234-.078a.173.173 0 0 0 .078-.02c.118-.052.222-.084.313-.097.156.013.24.026.254.039.026 0 .045-.007.058-.02a.245.245 0 0 0 .098.059.245.245 0 0 1 .098.059c.065 0 .11.006.136.019.04 0 .085.02.137.059.078.065.11.11.098.136 0 .013.026.026.078.04.013.117.091.214.234.292zm-2.578 2.656a.795.795 0 0 0 .196-.04.245.245 0 0 0 .097-.058.41.41 0 0 0 .215-.137c.052.013.091.007.117-.02a.211.211 0 0 1 .156-.058c.118-.078.183-.124.196-.137a.218.218 0 0 1 .097-.02.348.348 0 0 1 .098-.097.52.52 0 0 1 .137-.097l.117-.079a.297.297 0 0 1 .156-.078c.091-.104.137-.162.137-.175a.23.23 0 0 1 .039-.06.778.778 0 0 0 .098-.116.348.348 0 0 1 .097-.098c0-.065.02-.11.059-.137a.35.35 0 0 0 .098-.097 1.2 1.2 0 0 0 .02-.157.772.772 0 0 0 .038-.097.322.322 0 0 0-.02-.098.535.535 0 0 1-.019-.117c.026-.104.033-.176.02-.215l-.04-.117c0-.078-.012-.13-.038-.156a.322.322 0 0 1-.02-.098 3.066 3.066 0 0 1-.137-.098.777.777 0 0 1-.097-.117.944.944 0 0 0-.254-.078h-.157a1.347 1.347 0 0 0-.156.04.335.335 0 0 1-.136.019.909.909 0 0 1-.176.136.304.304 0 0 0-.157.157.665.665 0 0 1-.175.078c-.04.013-.066.045-.078.097a.132.132 0 0 0-.118.059.635.635 0 0 1-.078.098 2.962 2.962 0 0 0-.195.175.905.905 0 0 0-.137.176c-.039.078-.065.137-.078.176-.013.04-.032.059-.059.059a.389.389 0 0 1-.097.253.42.42 0 0 0-.117.254 1.7 1.7 0 0 0-.215.508.81.81 0 0 1-.059.254c-.026.156-.045.241-.058.254-.013.013-.02.052-.02.117.104.04.228.059.371.059.156-.013.267-.052.332-.117zm2.246 3.164a.514.514 0 0 0-.312-.02 2.635 2.635 0 0 0-.313.059.247.247 0 0 1-.117.058c-.039.013-.091.026-.156.04a.64.64 0 0 1-.098.078.217.217 0 0 1-.097.02c-.027.051-.06.084-.098.097-.026.013-.04.052-.04.117a.35.35 0 0 0-.234.195.594.594 0 0 1-.175.254.278.278 0 0 1-.04.156.268.268 0 0 0-.058.137c-.04 0-.065.026-.078.078 0 .04-.007.078-.02.117-.143.118-.208.19-.195.215.013.026.013.072 0 .137a2.03 2.03 0 0 0-.176.352c0 .052-.026.09-.078.117-.026.13-.046.208-.059.234 0 .013-.012.033-.038.059a.318.318 0 0 1 0 .156.9.9 0 0 1-.02.176c.013.065.006.11-.02.136a.174.174 0 0 0-.02.079c0 .065.02.123.06.175.038.04.071.085.097.137.104.013.17.059.195.137-.013.065-.006.11.02.136a.309.309 0 0 1 .059.079c.052.182.117.293.195.332a.634.634 0 0 1 .098.078c.039.013.058.045.058.097a.481.481 0 0 0 .215.079c.052 0 .104.013.156.039.183.065.313.084.39.058a.976.976 0 0 0 .235-.097c.143-.027.235-.059.274-.098a.52.52 0 0 1 .175-.117c.13-.091.215-.137.254-.137.052 0 .091-.013.117-.04.027-.077.06-.13.098-.155.04-.04.078-.085.117-.137-.013-.026-.006-.065.02-.117.039-.052.072-.078.098-.078a.129.129 0 0 1 .02-.118.166.166 0 0 0 0-.156c.09-.156.13-.247.116-.273.04-.026.059-.052.059-.078v-.137c.039-.156.059-.254.059-.293a.76.76 0 0 1 .038-.098c-.012-.13-.012-.202 0-.215.014-.013.02-.032.02-.058a.574.574 0 0 0-.02-.137.164.164 0 0 1 .02-.137.314.314 0 0 1-.039-.136.643.643 0 0 0 .02-.157 2.401 2.401 0 0 1-.04-.312.636.636 0 0 1-.058-.176c.013-.039.013-.071 0-.098-.104-.117-.156-.188-.156-.214-.013-.13-.04-.202-.078-.215l-.079-.078c-.078-.117-.123-.176-.136-.176-.013 0-.02-.013-.02-.04a.24.24 0 0 1-.137-.038l-.078-.078zM49.453 15.492c-.065.104-.11.156-.137.156-.013 0-.026.014-.039.04a1.98 1.98 0 0 1-.195.136c-.13.013-.195.026-.195.04h-.04c-.182-.066-.299-.092-.35-.079a.22.22 0 0 1-.157-.02l-.235-.078a.762.762 0 0 1-.175-.097.146.146 0 0 0-.157-.059c-.065-.143-.169-.221-.312-.234a1.295 1.295 0 0 1-.117-.215c-.013-.039-.046-.059-.098-.059-.091.105-.15.17-.176.196a.305.305 0 0 1-.058.078c-.117.091-.19.137-.215.137a5.39 5.39 0 0 1-.313.254 1.383 1.383 0 0 1-.37.156.19.19 0 0 1-.118.078.188.188 0 0 0-.098.078c-.13-.013-.227.013-.293.078-.052-.026-.097-.032-.136-.02a.434.434 0 0 1-.137.06c-.091-.014-.15-.014-.176 0-.013.012-.032.019-.058.019a1.47 1.47 0 0 1-.254-.059h-.078c-.157 0-.26-.013-.313-.039-.039-.013-.085-.006-.137.02-.078-.079-.136-.118-.175-.118a1.065 1.065 0 0 1-.137-.058 1.193 1.193 0 0 1-.215-.117.607.607 0 0 0-.254-.098 4.324 4.324 0 0 0-.195-.254.348.348 0 0 0-.098-.098.522.522 0 0 1-.097-.136.597.597 0 0 1-.157-.137c-.013-.026-.045-.046-.097-.059a.278.278 0 0 0-.04-.156.783.783 0 0 0-.097-.117l-.078-.234a.309.309 0 0 0-.117-.196.186.186 0 0 0-.059-.176.607.607 0 0 1-.078-.214c0-.144-.013-.228-.04-.254a.369.369 0 0 1-.019-.117c.026-.157.033-.248.02-.274a.322.322 0 0 1-.02-.098c0-.065.007-.117.02-.156a.597.597 0 0 1 .039-.117c.013-.065.02-.137.02-.215 0-.078.019-.143.058-.195v-.195a.304.304 0 0 1 .059-.079.766.766 0 0 0 .058-.156c.013-.052.033-.11.059-.176.104-.169.169-.3.195-.39a.74.74 0 0 1 .156-.235c.078-.104.13-.175.157-.214a.297.297 0 0 1 .156-.079c.078-.117.13-.182.156-.195.026-.013.033-.033.02-.059a.49.49 0 0 0 .195-.117l.156-.156a.437.437 0 0 0 .156-.059c.052-.039.098-.071.137-.097.143-.013.222-.026.235-.04.026-.025.052-.025.078 0 .065-.064.15-.084.254-.058.104.013.227.013.37 0 .196-.052.346-.065.45-.039.117.013.234.033.351.059.144.078.267.13.371.156.092.078.15.13.176.156.026.013.059.02.098.02.026.065.065.104.117.117.052 0 .085.033.098.098.117.065.182.104.195.117.013.013.026.02.04.02.09-.092.149-.157.175-.196a.976.976 0 0 0 .059-.098c.026-.026.071-.039.136-.039a.278.278 0 0 0 .157-.039c.117-.039.182-.045.195-.02.026.014.065.02.117.02.143.117.234.221.273.313.04.09.098.169.176.234.026.065.046.143.059.234.026.079.039.17.039.274.013.143.02.24.02.293l-.02.37c0 .131-.007.255-.02.372 0 .117-.013.228-.039.332-.039.17-.065.267-.078.293-.091.182-.143.3-.156.352-.04.117-.072.182-.098.195a.228.228 0 0 0-.039.059.435.435 0 0 0-.058.136c-.013.04-.046.072-.098.098a3.926 3.926 0 0 0-.117.273c-.013.04-.013.072 0 .098.078.143.117.234.117.273.013.04.032.072.059.098a.246.246 0 0 0 .097.059c.04.013.072.032.098.058.104.078.156.124.156.137h.04a.476.476 0 0 0 .155.117.605.605 0 0 1 .118.04c.143.025.221.045.234.058a.322.322 0 0 0 .098-.02c.104-.013.175-.026.215-.039.039-.026.09-.026.156 0 .13.104.195.176.195.215 0 .026.013.052.04.078zm-2.95-4.258a2.22 2.22 0 0 0-.214-.195.81.81 0 0 0-.156-.117 2.337 2.337 0 0 1-.332-.195 2.529 2.529 0 0 0-.235-.059 1.99 1.99 0 0 0-.136-.059c-.065-.026-.105-.026-.117 0-.105.013-.163.02-.176.02-.013-.013-.033-.013-.059 0a8.172 8.172 0 0 0-.371.059.595.595 0 0 1-.215 0c-.065.039-.136.078-.215.117a.518.518 0 0 0-.175.117c-.157.091-.274.17-.352.234a.47.47 0 0 0-.176.235c-.078.09-.13.156-.156.195-.013.039-.033.085-.059.137a.431.431 0 0 0-.058.136c-.013.04-.046.072-.098.098a.435.435 0 0 1-.059.156.492.492 0 0 1-.058.117l-.04.157c0 .039-.012.071-.038.097a.21.21 0 0 1-.02.196.517.517 0 0 0-.02.254 1.368 1.368 0 0 0-.058.332.83.83 0 0 1 0 .254c.052.182.091.299.117.351a.32.32 0 0 1 .04.176c.104.13.188.3.253.508a.537.537 0 0 1 .157.136c.039.04.071.105.097.196.104.09.163.143.176.156.078.078.117.13.117.156a.226.226 0 0 0 .059.04c.13.064.208.097.234.097.026 0 .052.02.078.059.091.013.17.039.235.078.078.039.15.084.215.136.13-.026.208-.026.234 0a.244.244 0 0 1 .098.059.3.3 0 0 1 .117-.04c.039 0 .09.007.156.02.078 0 .13-.006.156-.02a.94.94 0 0 0 .098-.058.786.786 0 0 1 .215-.02.64.64 0 0 0 .195-.097c.026-.039.052-.045.078-.02.104-.104.176-.156.215-.156.04 0 .072-.013.098-.039.09-.104.156-.156.195-.156l.176-.176a.172.172 0 0 0 .02-.078.2.2 0 0 0 .156-.176.533.533 0 0 1 .136-.234l-.078-.273c-.039-.027-.059-.06-.059-.098a.369.369 0 0 0-.019-.117c-.026-.117-.052-.19-.078-.215a1.24 1.24 0 0 1-.078-.352.546.546 0 0 0-.02-.254 1.37 1.37 0 0 1-.058-.234c.013-.026.013-.072 0-.137 0-.09-.007-.175-.02-.254v-.254-.234a.521.521 0 0 0-.039-.195c.065-.13.091-.209.078-.235-.013-.026-.013-.058 0-.097-.052-.143-.104-.222-.156-.235zm.645.489c0 .052-.006.15-.02.293 0 .13.014.221.04.273-.026.052-.033.098-.02.137.013.039.02.078.02.117.013.052.026.098.039.137.026.026.04.058.04.097a.666.666 0 0 0 0 .235.613.613 0 0 1 .038.117.485.485 0 0 0 0 .195c.013.065.02.11.02.137a.246.246 0 0 1 .058.098.249.249 0 0 1 .059.117c.065.013.098-.007.098-.059 0-.065.032-.104.097-.117-.026-.065-.02-.117.02-.156a.34.34 0 0 0 .097-.176c0-.143.013-.234.04-.273a.488.488 0 0 0 .058-.118c.04-.169.059-.3.059-.39v-.176c0-.117-.007-.182-.02-.195v-.079c0-.13-.006-.227-.02-.292a.435.435 0 0 0-.038-.196.258.258 0 0 0-.04-.234l-.136-.156c0-.013-.007-.02-.02-.02-.026.04-.058.059-.097.059-.027-.013-.066.02-.118.097a.387.387 0 0 1-.117.137c-.052.04-.065.091-.039.156l-.098.235zM52.402 7.113c-.026.157-.058.254-.097.293-.04.04-.052.11-.04.215-.104.13-.156.215-.156.254a.083.083 0 0 1 0 .078.844.844 0 0 1-.136.234c0 .092-.013.144-.04.157a.227.227 0 0 0-.038.058 5.927 5.927 0 0 0-.079.371 1.76 1.76 0 0 0 0 .372.523.523 0 0 0 .235.02.994.994 0 0 1 .195-.02c.221-.013.358-.013.41 0 .117.013.196.02.235.02a.117.117 0 0 0 .078-.08c.013.027.052.047.117.06.065 0 .11-.013.137-.04.065.066.123.111.175.137.052.182.046.287-.02.313a.52.52 0 0 0-.136.097c-.234.078-.37.078-.41 0a6.897 6.897 0 0 0-.371-.058.975.975 0 0 0-.371.039 5.592 5.592 0 0 0-.293.039c-.078 0-.137.02-.176.058 0 .079-.013.15-.039.215a.284.284 0 0 0 .02.176 7.711 7.711 0 0 1-.098.215v.137a.612.612 0 0 0-.04.117c0 .039-.019.072-.058.098a.38.38 0 0 1 0 .292c.052.118.059.176.02.176-.026-.013-.04 0-.04.04.014.051.02.09.02.117 0 .025.007.071.02.136 0 .156-.007.267-.02.332a.728.728 0 0 0-.02.176.772.772 0 0 1 0 .254v.352c.014.09.027.162.04.214a.37.37 0 0 1 .02.118.181.181 0 0 1 0 .117v.117l.038.156a.864.864 0 0 1 .078.156.322.322 0 0 1-.019.098c-.013.04-.007.085.02.137.065.182.09.3.078.351 0 .04.013.091.039.157a.614.614 0 0 1 .078.214c0 .04.006.079.02.118l.078.195c.038.052.071.104.097.156a.315.315 0 0 0 .02.195l.117.157c.117.13.17.195.156.195a.574.574 0 0 0 .176.137c.039.013.059.052.059.117.13.039.247.098.351.176.065-.052.117-.072.156-.059a.245.245 0 0 1 .098.059l.078.078a.606.606 0 0 0 .117.039v.137c.013.052.04.078.078.078-.13.09-.215.13-.254.117h-.058c-.117.143-.202.202-.254.176a.267.267 0 0 0-.176-.02c-.078-.09-.136-.143-.176-.156-.026-.013-.045-.04-.058-.078-.183-.13-.326-.195-.43-.195a3.217 3.217 0 0 0-.273-.254 1.458 1.458 0 0 1-.157-.137c0-.13-.013-.195-.039-.195a.307.307 0 0 1-.078-.059.902.902 0 0 1-.078-.313.26.26 0 0 0-.098-.214c.014-.091 0-.157-.039-.196a.458.458 0 0 1-.097-.156.4.4 0 0 1 0-.176.284.284 0 0 0-.02-.175 1.386 1.386 0 0 0-.097-.254c-.013-.013-.02-.026-.02-.04a.307.307 0 0 0-.039-.214.36.36 0 0 1 0-.235 2.7 2.7 0 0 1-.078-.312 1.316 1.316 0 0 1-.02-.215v-.098a.369.369 0 0 0 .02-.117 4.383 4.383 0 0 1-.04-.234v-.293-.117c.014-.04.027-.085.04-.137.013-.143.013-.221 0-.234v-.04-.136a.612.612 0 0 1 .039-.117.307.307 0 0 1-.04-.215.735.735 0 0 0 .04-.235v-.136a.273.273 0 0 0-.02-.118.482.482 0 0 0-.02-.175c0-.026.014-.052.04-.079.039-.156.052-.234.039-.234v-.02c0-.038.007-.09.02-.156a.357.357 0 0 0 .019-.195.486.486 0 0 0-.215.059c-.078.039-.143.032-.195-.02a.245.245 0 0 1-.098.059.574.574 0 0 0-.136.02c-.13.038-.235.07-.313.097a.6.6 0 0 1-.254-.02 1.74 1.74 0 0 0-.176-.234c-.026-.052-.026-.117 0-.195a.573.573 0 0 1 .215-.04c.091-.012.156-.045.196-.097.065.013.13.02.195.02a4.36 4.36 0 0 1 .234-.04c.026-.052.085-.071.176-.058a.548.548 0 0 0 .254-.02c.17-.078.26-.136.273-.175.013-.053.033-.118.059-.196.039-.104.052-.163.039-.176-.013-.026-.013-.058 0-.097a.876.876 0 0 0 .039-.176c.013-.04.007-.065-.02-.078.079-.104.111-.163.098-.176v-.059c.065-.09.098-.15.098-.175 0-.04.02-.065.058-.078-.013-.092 0-.157.04-.196a.91.91 0 0 0 .136-.176c.013-.117.033-.24.059-.37.104-.144.163-.215.175-.215.027 0 .053-.013.079-.04a.605.605 0 0 0 .175-.058.174.174 0 0 1 .079-.02c.052.079.078.137.078.176.013.026.045.052.097.078zM57.578 16l-.41.059c.013-.013 0-.02-.04-.02h-.233c-.04 0-.06-.013-.06-.039a.394.394 0 0 0-.214-.02.878.878 0 0 1-.234-.039l-.235-.078a.488.488 0 0 0-.117-.058c-.17-.091-.286-.137-.351-.137a1.64 1.64 0 0 1-.215-.117.15.15 0 0 0-.02-.059 5.729 5.729 0 0 0-.234-.137l-.078-.078c-.052-.065-.098-.104-.137-.117l-.078-.078c-.078-.13-.13-.202-.156-.215a.246.246 0 0 1-.059-.098 2.23 2.23 0 0 0-.176-.214.685.685 0 0 1-.097-.196c-.078-.09-.118-.162-.118-.214a.887.887 0 0 1-.136-.274.97.97 0 0 1-.02-.332 1.597 1.597 0 0 0-.039-.273.575.575 0 0 0-.02-.137c.014-.104.014-.163 0-.176a.172.172 0 0 1-.019-.078c.04-.117.052-.195.04-.234 0-.04.012-.072.038-.098a.82.82 0 0 1 0-.254l.04-.195c.051-.026.077-.11.077-.254a3.46 3.46 0 0 1 .157-.215c.026-.013.032-.046.02-.098.103-.13.188-.214.253-.254a.316.316 0 0 0 .137-.195l.175-.176c.118-.09.19-.156.215-.195.17-.117.274-.202.313-.254a.538.538 0 0 0 .293-.117c.065.026.13.013.195-.04.078-.051.15-.064.215-.038.104-.065.163-.091.176-.078a.083.083 0 0 0 .078 0l.215-.02c.156-.026.254-.045.293-.058a.346.346 0 0 1 .273-.02.164.164 0 0 0 .137-.02c.039.053.085.079.137.079a.494.494 0 0 1 .351.058.4.4 0 0 0 .176 0c.13.091.202.15.215.176.026.013.058.02.097.02.144.065.248.15.313.253a.836.836 0 0 0 .332.254c.039.091.091.176.156.254.04.091.072.156.098.196a.419.419 0 0 1 .078.136c.052.104.072.176.059.215-.013.04-.013.072 0 .098.052.104.09.208.117.312a.29.29 0 0 0-.078.137.347.347 0 0 1-.04.156c-.026.04-.058.085-.097.137a.458.458 0 0 0-.098.156.681.681 0 0 1-.136.137.309.309 0 0 0-.079.117c-.208.04-.364.085-.468.137a.733.733 0 0 1-.332.078h-.254a.21.21 0 0 1-.117-.04.098.098 0 0 0-.118 0 .432.432 0 0 0-.175-.136 2.293 2.293 0 0 0-.176-.078l-.078-.078a.957.957 0 0 0-.059-.098 1.326 1.326 0 0 1-.137-.37c0-.092-.032-.144-.097-.157a.479.479 0 0 0 .039-.176c.013-.065.032-.13.058-.195a.442.442 0 0 0 .157-.156c.182-.079.306-.118.37-.118l.196.176-.039.274c-.013.078-.072.123-.176.136-.039.091-.039.163 0 .215.052.052.11.091.176.117a.54.54 0 0 1 .176.137c.039.04.071.033.097-.02.183 0 .306.007.371.02.066.013.13.007.196-.02a.295.295 0 0 0 .097-.117c.04-.052.092-.065.157-.039.065-.13.097-.221.097-.273 0-.065.013-.117.04-.156a.133.133 0 0 0-.04-.098.277.277 0 0 1-.039-.156.452.452 0 0 1-.097-.196.188.188 0 0 0-.078-.097c-.027-.026-.04-.072-.04-.137a.642.642 0 0 0-.097-.078.19.19 0 0 1-.078-.117 3.92 3.92 0 0 1-.215-.078.303.303 0 0 1-.156-.157c-.157-.078-.235-.13-.235-.156a1.469 1.469 0 0 1-.254-.059.173.173 0 0 0-.078-.019.18.18 0 0 0-.117 0c-.026.013-.065.013-.117 0-.143-.013-.228-.013-.254 0h-.098a.243.243 0 0 1-.136 0 .366.366 0 0 0-.118-.02 1.326 1.326 0 0 1-.156.04.643.643 0 0 0-.156.019 2.034 2.034 0 0 1-.235.078 2.8 2.8 0 0 0-.351.156l-.078.079a.976.976 0 0 0-.098.058c-.13.065-.195.11-.195.137l-.235.156a1.227 1.227 0 0 0-.254.293.776.776 0 0 1-.097.117.305.305 0 0 0-.059.078.636.636 0 0 1-.117.235c-.026.026-.046.078-.059.156a.698.698 0 0 1-.058.176c.026.039.032.09.02.156l-.04.156c.013.117.02.19.02.215 0 .013-.013.033-.04.059a.65.65 0 0 1 .04.312.289.289 0 0 0 .078.254c.026.143.059.222.098.235.039.156.071.24.097.253.026.013.046.046.059.098a.447.447 0 0 1 .137.254c.09.091.13.143.117.156l.02.02c.025.039.058.078.097.117a.247.247 0 0 1 .117.137c.143.104.248.169.313.195a.233.233 0 0 1 .156.117.95.95 0 0 1 .215.078c.026.013.058.013.097 0 .183.065.306.104.372.117.078.013.15.033.214.06a.689.689 0 0 0 .313.038.454.454 0 0 1 .234.02.35.35 0 0 1 .176-.059 2.84 2.84 0 0 0 .195-.059c.118-.065.209-.104.274-.117.078-.013.123-.052.136-.117a.754.754 0 0 0 .254-.45.268.268 0 0 0 .137-.058c.026-.026.065-.039.117-.039.13-.039.222-.052.274-.039a.296.296 0 0 1 .156.078.318.318 0 0 1 0 .157c0 .039.007.078.02.117a.642.642 0 0 0-.079.097.454.454 0 0 1-.117.079c-.13.13-.202.208-.215.234-.09.104-.156.17-.195.195l-.078.04c-.104.103-.176.168-.215.195a2.098 2.098 0 0 1-.137.058c-.195.104-.319.15-.37.137l-.118.078zM61.992 9.398a.53.53 0 0 0-.078.176c.013.013.013.04 0 .078 0 .04-.013.085-.039.137a.598.598 0 0 1-.04.117c0 .04.007.085.02.137.014.039.02.078.02.117-.04.117-.065.195-.078.235 0 .039.006.071.02.097.012.143.012.228 0 .254-.014.013 0 .033.038.059-.039.143-.058.247-.058.312a.759.759 0 0 1 .039.098.6.6 0 0 1 .039.117.433.433 0 0 1-.02.137c-.013.026-.013.058 0 .097.066.144.085.215.06.215-.027-.013-.047-.006-.06.02a.595.595 0 0 1 0 .215c-.013.065 0 .13.04.195a.487.487 0 0 0 0 .273c.039.079.045.17.02.274a.448.448 0 0 1 .058.234c0 .091.02.17.058.235.078-.157.13-.254.157-.293a.435.435 0 0 0 .039-.196.458.458 0 0 0 .078-.117c.026-.052.026-.098 0-.137.065-.052.104-.136.117-.254.026-.117.078-.195.156-.234 0-.117.033-.195.098-.234-.013-.052-.007-.091.02-.117a.64.64 0 0 0 .077-.098.132.132 0 0 0 .04-.098.432.432 0 0 1 .058-.136c.013-.04.046-.111.098-.215a.773.773 0 0 1 .097-.118.315.315 0 0 0 .078-.175.51.51 0 0 0 .235-.235.525.525 0 0 1 .215-.254c.078-.065.117-.13.117-.195.065.013.11-.006.137-.059a.388.388 0 0 1 .136-.117c.118-.039.19-.058.215-.058a.19.19 0 0 0 .098-.04l.195-.019c.013-.013.026-.02.04-.02.286-.025.514-.025.683 0 .13.04.221.06.273.06l.156.155.157.176c.078.091.117.156.117.196a.305.305 0 0 0 .059.078.164.164 0 0 0-.02.136.431.431 0 0 1 .059.137c.078.221.11.378.097.469-.013.091-.02.189-.02.293.014.039.02.078.02.117 0 .04.007.085.02.137.026.156.026.24 0 .254-.026.013-.033.039-.02.078 0 .065.007.143.02.234.026.091.02.15-.02.176-.026.143-.032.221-.02.234.014 0 .014.013 0 .04-.038.169-.077.292-.116.37-.026.144-.033.228-.02.254.013.013.02.033.02.059a.87.87 0 0 0-.079.215c.014.013.014.032 0 .058-.065.196-.09.326-.078.391.013.052-.006.104-.058.156.039.078.045.176.02.293a2.498 2.498 0 0 1-.06.332c.014.052.02.104.02.156a.164.164 0 0 1-.02.137c.04.091.053.15.04.176-.013.013-.013.033 0 .059.013.065.032.13.058.195a.166.166 0 0 1 0 .156l.196.195c.09.026.156.02.195-.02a.212.212 0 0 1 .156-.058c.143-.09.235-.117.274-.078.052.04.117.072.195.098a.787.787 0 0 1-.02.215c0 .039-.013.084-.039.136-.052.105-.11.163-.175.176a.34.34 0 0 0-.176.098.338.338 0 0 0-.195.02.517.517 0 0 1-.254.019.21.21 0 0 1-.118-.04c-.026-.025-.065-.032-.117-.019-.143-.065-.234-.123-.273-.175a.496.496 0 0 0-.117-.118 3.351 3.351 0 0 1-.137-.293.133.133 0 0 0-.04-.097.207.207 0 0 0 0-.176 3.82 3.82 0 0 1-.038-.176.774.774 0 0 1-.04-.098c0-.039-.019-.071-.058-.097.04-.04.052-.078.04-.117a.313.313 0 0 1 0-.157.566.566 0 0 0 0-.214.45.45 0 0 1 .038-.157c.052-.143.072-.24.059-.293a.243.243 0 0 1 0-.136v-.176l.039-.195.078-.254a.889.889 0 0 1 .039-.215.313.313 0 0 0 0-.156c.04-.13.065-.222.078-.274.013-.052.033-.11.059-.176.013-.143.026-.221.039-.234.013-.013.02-.033.02-.059v-.254c.012-.052.025-.097.038-.136a2.957 2.957 0 0 1-.02-.215.173.173 0 0 0 .02-.078.92.92 0 0 1 0-.274c.013-.052 0-.11-.039-.175.013-.092.007-.144-.02-.157a.64.64 0 0 1-.077-.097c.013-.183 0-.3-.04-.352a.49.49 0 0 1-.058-.254.488.488 0 0 0-.117-.058c-.026-.013-.04-.052-.04-.118-.13-.013-.208-.013-.234 0-.026 0-.045-.013-.058-.039-.04.026-.091.033-.156.02-.066-.013-.111 0-.137.039-.104-.026-.17-.026-.196 0a.127.127 0 0 1-.058.059 1.147 1.147 0 0 1-.254.097c-.013 0-.032.013-.059.04-.104.103-.156.162-.156.175a1.355 1.355 0 0 0-.195.195.348.348 0 0 1-.098.098.463.463 0 0 0-.176.352.57.57 0 0 0-.175.351.256.256 0 0 0-.117.117c-.014.04-.033.091-.06.157a2.458 2.458 0 0 1-.233.488 2.708 2.708 0 0 0-.079.312c-.013.04-.032.085-.058.137a.322.322 0 0 0-.02.098 1.723 1.723 0 0 1-.039.293.957.957 0 0 1-.058.097.667.667 0 0 1-.02.215c0 .013-.013.033-.039.059.013.104.013.17 0 .195-.013.013-.02.046-.02.098a1.35 1.35 0 0 0-.039.273.433.433 0 0 1-.02.137c-.012.143-.012.24 0 .293.014.039.02.078.02.117-.013.156-.02.248-.02.274 0 .012.014.032.04.058a.825.825 0 0 0-.02.137v.117c.04.3.098.488.176.566a.447.447 0 0 0-.039.137.313.313 0 0 1 0 .156 1.637 1.637 0 0 0-.195.118c-.013.026-.046.026-.098 0-.039.065-.078.09-.117.078-.04 0-.078-.02-.117-.059a.81.81 0 0 1-.117-.156 1.053 1.053 0 0 1-.059-.137c.04-.065.04-.124 0-.176a.207.207 0 0 1 0-.175c-.04-.144-.052-.222-.04-.235.014-.013.014-.032 0-.058a.76.76 0 0 0-.038-.098v-.117c-.026-.143-.046-.222-.059-.235a.228.228 0 0 1-.039-.058 3.096 3.096 0 0 1-.039-.313.133.133 0 0 0-.039-.097c.04-.066.052-.118.04-.157a.687.687 0 0 1-.02-.195 9.365 9.365 0 0 1-.098-.43c-.052-.143-.072-.214-.059-.214a.747.747 0 0 1-.058-.235c.013-.052 0-.11-.04-.176.027-.065.027-.117 0-.156l-.038-.117c0-.143-.007-.228-.02-.254a.369.369 0 0 1-.02-.117c0-.156-.006-.241-.019-.254v-.078c.013-.235.013-.365 0-.39a.241.241 0 0 1 0-.138.17.17 0 0 0-.02-.175.438.438 0 0 0-.038-.274c0-.065.006-.136.019-.215a.455.455 0 0 0-.02-.234.77.77 0 0 0 .06-.156c.012-.065.006-.11-.02-.137 0-.234.012-.443.039-.625.039-.13.039-.189 0-.176-.04 0-.046-.02-.02-.058-.208 0-.43-.04-.664-.117a2.477 2.477 0 0 1-.273-.137.4.4 0 0 0 0-.176c0-.052.013-.104.039-.156a.433.433 0 0 1 .254-.137.85.85 0 0 0 .175.117.15.15 0 0 1 .059.02.34.34 0 0 0 .137.058.083.083 0 0 1 .078 0c.13.04.208.052.234.04a.19.19 0 0 1 .098-.04c0-.052.006-.097.02-.136l.038-.157c.04-.09.052-.143.04-.156V8.52c.038-.144.051-.228.038-.254 0-.026.007-.052.02-.079.026-.169.046-.26.059-.273a.127.127 0 0 0 .058-.059c.052-.195.078-.325.078-.39a.441.441 0 0 1 .078-.195.685.685 0 0 1 .098-.254.29.29 0 0 0 .078-.215l.117-.235a.497.497 0 0 1 .059-.117c.078-.117.117-.189.117-.215a.19.19 0 0 1 .04-.097c.051-.117.09-.202.117-.254.078-.104.117-.176.117-.215.013-.052.032-.11.058-.176.026-.052.059-.104.098-.156a.34.34 0 0 0 .098-.176c.09-.13.156-.202.195-.215.052-.026.085-.078.098-.156.052 0 .084-.02.097-.059a.349.349 0 0 1 .098-.097c.156-.104.24-.176.254-.215.039 0 .071-.007.097-.02a.642.642 0 0 0 .098-.078c.17-.065.254-.09.254-.078.104-.052.176-.091.215-.117a.347.347 0 0 1 .156-.04c.117 0 .189-.012.215-.038.143.026.234.039.273.039.052 0 .091.006.117.02l.215.097c.118.078.183.124.196.137.117.091.175.143.175.156h.02c.091.13.15.228.176.293-.013.156-.013.254 0 .293.013.04.02.072.02.098-.027.169-.053.319-.079.449a.37.37 0 0 1-.156.273.374.374 0 0 1-.117.274.682.682 0 0 1-.176.39.727.727 0 0 0-.176.313.236.236 0 0 0-.136.137 1.028 1.028 0 0 1-.098.156c-.091.117-.15.176-.176.176a1.206 1.206 0 0 1-.098.156c-.013 0-.013.013 0 .039l-.117.078c-.026.013-.045.052-.058.117a.263.263 0 0 0-.176.098.356.356 0 0 1-.156.117 3.37 3.37 0 0 1-.274.332.7.7 0 0 1-.254.156c-.078.105-.123.157-.136.157-.014 0-.033.013-.06.039-.116.078-.175.123-.175.136l-.02.02c-.117.039-.175.065-.175.078 0 .013-.007.02-.02.02l-.136.136c-.013.013-.02.033-.02.059-.13.052-.202.078-.215.078-.013 0-.026.007-.039.02a7.668 7.668 0 0 0-.215.097c-.143.052-.228.091-.254.117-.013.013-.052.013-.117 0zm.606-.78l.195-.098a.128.128 0 0 0 .059-.06 3.06 3.06 0 0 0 .234-.155c.052 0 .091-.013.117-.04a.953.953 0 0 1 .098-.058c.13-.143.202-.228.215-.254.156-.117.227-.176.215-.176l.292-.293c.066-.065.118-.13.157-.195.065-.039.104-.072.117-.098l.039-.078a.6.6 0 0 0 .195-.215c.117-.156.196-.266.235-.332a.675.675 0 0 1 .175-.214c.052-.144.085-.228.098-.254l.078-.078c0-.066.013-.118.04-.157.025-.052.051-.097.077-.136 0-.079.007-.144.02-.196a.435.435 0 0 1 .058-.136.278.278 0 0 1-.039-.157c0-.065.014-.117.04-.156-.079-.104-.118-.176-.118-.215a.132.132 0 0 0-.039-.097.523.523 0 0 1-.137-.098.64.64 0 0 0-.078-.098 1.857 1.857 0 0 1-.312-.039c-.04.013-.085.026-.137.04a.218.218 0 0 0-.098.019 1.279 1.279 0 0 0-.136.078c-.026.013-.072.013-.137 0a.19.19 0 0 1-.078.117.306.306 0 0 0-.078.059.583.583 0 0 0-.293.156.968.968 0 0 0-.176.254c-.117.221-.221.37-.312.449a.55.55 0 0 0-.176.332c-.104.078-.176.221-.215.43a.743.743 0 0 0-.04.097.37.37 0 0 0-.019.118l-.117.156a.692.692 0 0 0-.058.195c-.092.143-.137.241-.137.293 0 .04-.013.085-.04.137a.53.53 0 0 0-.077.176.149.149 0 0 1-.02.058.74.74 0 0 0-.078.254c0 .04-.007.091-.02.156a3.838 3.838 0 0 1-.097.254l-.04.078a.92.92 0 0 1 0 .274c0 .052.014.104.04.156a.517.517 0 0 0 .293-.078c.078-.052.15-.11.215-.176zM68.36 1.762c.025.169.052.286.078.351a.695.695 0 0 1 .058.196.248.248 0 0 1 .059.117c.026.039.058.071.097.097-.039.053-.045.098-.02.137.04.026.046.052.02.078.052.17.072.267.059.293.013.04.026.072.039.098a.245.245 0 0 1 .059.098c0 .156.006.253.02.293.025.039.064.071.116.097v.176c.013.039.026.091.04.156.038.104.052.163.038.176-.013 0-.013.02 0 .059.04.117.059.201.059.253.013.04.033.072.059.098.026.17.039.28.039.332.013.04.032.072.058.098.026.039.04.11.04.215 0 .104.012.175.038.215a.509.509 0 0 0-.02.156c.014.065.007.117-.019.156.04.13.065.202.079.215.013.013.006.032-.02.058.026.027.039.066.039.118 0 .052.007.11.02.175.039.144.052.222.039.235v.02c-.013.025-.007.104.02.234 0 .078.006.156.019.234.026.078.032.15.02.215-.014.26 0 .443.038.547.013.208.026.351.04.43.012.078.019.156.019.234 0 .117-.007.202-.02.254a.24.24 0 0 0 .04.136c0 .157-.007.274-.02.352 0 .065.013.143.039.234a.133.133 0 0 0-.04.098v.137c-.025.156-.032.234-.019.234.013 0 .02.007.02.02a1.078 1.078 0 0 0-.04.215c.014.09.014.143 0 .156v.058a.39.39 0 0 1 0 .176c0 .026.014.072.04.137a.586.586 0 0 0-.098.312c-.026.026-.032.059-.02.098.014.04.02.078.02.117l-.078.469c-.026.143-.052.293-.078.45 0 .168-.007.305-.02.41l-.039.253c.013.157.007.254-.02.293-.012.04-.025.091-.038.156a.44.44 0 0 1-.156.157.183.183 0 0 0-.098.136c-.104.04-.183.027-.234-.039a.662.662 0 0 0-.157-.175v-.254a.24.24 0 0 1 .098-.196.965.965 0 0 1-.02-.117c.013-.026.013-.058 0-.097.052-.014.079-.059.079-.137 0-.078.013-.143.038-.195a.272.272 0 0 0 .02-.118c0-.052.007-.104.02-.156.039-.13.052-.202.039-.215-.013-.026-.013-.065 0-.117 0-.065.006-.143.02-.234.025-.091.045-.176.058-.254v-.215c0-.078.006-.17.02-.274a.787.787 0 0 0 .019-.292c-.013-.105-.013-.17 0-.196a.319.319 0 0 0 .02-.097.216.216 0 0 0-.02-.098v-.117c0-.04.006-.078.02-.117.025-.053.025-.098 0-.137v-.43c.012-.117.019-.234.019-.351 0-.183-.007-.306-.02-.372 0-.078-.006-.15-.02-.214a7.17 7.17 0 0 1-.019-.508 3.06 3.06 0 0 0 0-.488c0-.105-.006-.209-.02-.313a.737.737 0 0 0-.058-.293.4.4 0 0 0 0-.176.695.695 0 0 0-.058-.195.18.18 0 0 0 0-.117c-.013-.052-.007-.091.02-.117a6.87 6.87 0 0 0-.079-.274V5.63l-.04-.195c.014-.013.02-.033.02-.059a1.164 1.164 0 0 1-.039-.156c.013-.013.02-.033.02-.059-.065-.13-.091-.208-.078-.234.013-.04.006-.072-.02-.098l-.058-.195c.013-.013.006-.02-.02-.02a.415.415 0 0 0-.02-.215 1.29 1.29 0 0 0-.078-.214c0-.144-.013-.215-.039-.215l-.039-.04a2.89 2.89 0 0 1-.058-.292.394.394 0 0 0-.078-.254c.013-.13 0-.241-.04-.332a2.882 2.882 0 0 0-.097-.313 1.297 1.297 0 0 0-.098-.234.174.174 0 0 1-.02-.078.317.317 0 0 1-.156-.137.451.451 0 0 1-.039-.156.455.455 0 0 1 .079-.117c.039-.026.058-.072.058-.137.13-.078.196-.13.196-.156a.164.164 0 0 1 .136.02c.04.012.078.019.117.019zm.742 13.36c.026.038.045.084.058.136.026.039.046.084.059.137.039.09.052.156.039.195a.434.434 0 0 0-.02.137l-.195.195c-.117.091-.215.15-.293.176a.867.867 0 0 1-.273.039.21.21 0 0 1-.118-.04.098.098 0 0 0-.117 0 .978.978 0 0 1-.293-.312.791.791 0 0 1 .04-.37c.051-.092.103-.19.155-.294.066.013.111.007.137-.02a.245.245 0 0 1 .098-.058c.091.052.17.046.234-.02h.156a.243.243 0 0 1 .137 0 .74.74 0 0 0 .156.079c.014-.014.026-.007.04.02z"/></svg>',
  snatch: '<svg viewBox="0 0 76 18"><path d="M5.508 7.914c-.013.17-.02.293-.02.371.013.078.04.137.078.176 0 .17.013.3.04.39.039.079.045.15.019.215.065.105.091.163.078.176-.013 0-.02.013-.02.04.04.064.06.13.06.195a.34.34 0 0 0 .097.175c.013.196.032.313.058.352-.026.104-.032.176-.02.215.014.039.027.071.04.097 0 .118.013.202.039.254.013.04.02.078.02.117 0 .04.006.079.02.118.038.143.051.221.038.234v.02a.39.39 0 0 1 0 .175.19.19 0 0 0 .04.098c.012.026.019.065.019.117.013.052.02.091.02.117a.4.4 0 0 1 0 .176.84.84 0 0 0-.02.156v.41a.957.957 0 0 1 0 .274c-.013.091-.02.143-.02.156a.15.15 0 0 0 .02.059c-.026.104-.04.17-.04.195a.15.15 0 0 0 .02.059.82.82 0 0 0-.078.37c0 .183-.013.313-.039.392-.013.065-.02.136-.02.214a.906.906 0 0 1-.117.196c-.026.013-.039.026-.039.039-.026.13-.045.208-.058.234-.013.013-.02.04-.02.078a1.148 1.148 0 0 0-.098.254c.013.026.02.052.02.078a.256.256 0 0 0-.117.117.247.247 0 0 1-.137.118l-.078.156a.227.227 0 0 1-.059.039 20.6 20.6 0 0 1-.175.273c-.013.026-.013.066 0 .118a.255.255 0 0 0-.118.117.492.492 0 0 1-.058.117c-.117.039-.176.065-.176.078 0 .013-.006.026-.02.04a2.97 2.97 0 0 0-.449.214.926.926 0 0 1-.254.137.446.446 0 0 1-.254.097 1.322 1.322 0 0 0-.214.059c-.026.026-.052.039-.079.039l-.312.04c-.156.051-.247.07-.273.058-.013-.013-.033-.02-.059-.02-.17.026-.26.033-.273.02a.43.43 0 0 1-.176-.078.278.278 0 0 0-.156-.04c-.196-.078-.313-.169-.352-.273a1.664 1.664 0 0 1-.234-.156c-.026-.013-.033-.04-.02-.078-.078 0-.13-.026-.156-.078a.295.295 0 0 0-.117-.098c.013-.065 0-.098-.04-.098-.039-.013-.058-.052-.058-.117a.972.972 0 0 0-.137-.098l-.078-.078c-.078-.182-.104-.293-.078-.332.026-.039.033-.09.02-.156.065-.065.13-.085.195-.059.078.026.17.026.273 0 .183-.026.274.02.274.137 0 .104-.033.176-.098.215.104.208.202.325.293.351.091.105.15.17.176.196a.757.757 0 0 0 .097.039c.118.065.176.11.176.137.065.013.104.026.117.039a.956.956 0 0 1 .098.058c.104.04.24.052.41.04a.37.37 0 0 1 .117-.02c.04 0 .072-.007.098-.02a.19.19 0 0 1 .098-.039.37.37 0 0 0 .117-.02c.078-.025.15-.051.215-.078a.775.775 0 0 0 .195-.117c.117-.013.182-.026.195-.039l.079-.078c.117 0 .182-.013.195-.039a.228.228 0 0 1 .039-.059c.091-.117.143-.169.156-.156.013 0 .02-.006.02-.02.078-.051.123-.097.136-.136a.131.131 0 0 1 .118-.059l.078-.195a.236.236 0 0 1 .136-.137c0-.039.007-.071.02-.097a.491.491 0 0 0 .059-.117.755.755 0 0 1 .078-.215c.039-.104.065-.183.078-.235a.388.388 0 0 1 .117-.136c.013-.066.02-.137.02-.215a.315.315 0 0 1 .078-.176c.052-.182.078-.28.078-.293a.435.435 0 0 0 .039-.195v-.254c.013-.078.02-.156.02-.235a.394.394 0 0 0-.02-.214c.039-.13.052-.209.039-.235a56.824 56.824 0 0 0-.04-.078.649.649 0 0 0 .06-.254 1.62 1.62 0 0 1-.04-.176.083.083 0 0 0 0-.078c-.026-.09-.032-.143-.02-.156.014-.013.014-.033 0-.059a.21.21 0 0 0-.038-.117.642.642 0 0 1-.02-.156v-.117a.313.313 0 0 0 0-.156 1.377 1.377 0 0 1-.078-.293c.013-.04.013-.072 0-.098-.039-.182-.065-.3-.078-.352a.522.522 0 0 0-.04-.195 2.294 2.294 0 0 0-.077-.45.24.24 0 0 0-.04-.136c0-.156-.006-.234-.019-.234s-.02-.007-.02-.02a1.133 1.133 0 0 1-.058-.293l-.059-.273c-.039-.104-.052-.163-.039-.176.013-.026.013-.059 0-.098-.039-.065-.058-.11-.058-.136.013-.04.006-.065-.02-.079a.639.639 0 0 0-.058-.37.424.424 0 0 1-.04-.313c-.038-.17-.071-.254-.097-.254a.227.227 0 0 0-.059-.04c.026-.194.013-.318-.039-.37a.21.21 0 0 1-.02-.195.948.948 0 0 1-.116-.293 1.042 1.042 0 0 0-.079-.235V6.06c.013-.092.013-.15 0-.176l-.039-.117v-.137a.574.574 0 0 0 .02-.137.523.523 0 0 1-.02-.234.164.164 0 0 0-.02-.137c-.051 0-.09.013-.116.04a.605.605 0 0 1-.117.038.248.248 0 0 1-.06.117c-.025.026-.038.072-.038.137a.64.64 0 0 1-.098.078c-.026.013-.032.052-.02.117a.286.286 0 0 0-.136.098l-.078.078a.794.794 0 0 0-.176.196.247.247 0 0 0-.137.117c-.026.039-.058.09-.097.156a1.165 1.165 0 0 1-.176.215.659.659 0 0 0-.117.176c0 .026-.02.045-.059.058a2.79 2.79 0 0 1-.078.196.306.306 0 0 1-.059.078c.013.065-.006.13-.058.195-.04.052-.078.098-.117.137-.105.143-.19.228-.254.254a.541.541 0 0 1-.254.332c-.026.156-.065.26-.117.312a.369.369 0 0 0-.02.117c0 .04-.006.072-.02.098-.09.13-.143.215-.156.254 0 .039-.02.071-.058.098-.013.143-.033.22-.059.234-.013 0-.02.013-.02.039-.038.104-.052.163-.038.176.013.013.019.026.019.039a.685.685 0 0 0-.078.195c.013.026.006.052-.02.078-.013.143-.02.235-.02.274.014.026.014.058 0 .097-.051.091-.07.15-.058.176.026.013.026.033 0 .059.013.09.02.175.02.254a.684.684 0 0 0-.04.214.243.243 0 0 0 0 .137.21.21 0 0 1 .04.117c-.04.144-.059.228-.059.254.026.13.033.202.02.215v.02c0 .156-.007.254-.02.293a.18.18 0 0 0 0 .117c0 .026.013.071.04.136.025.053.038.098.038.137a.822.822 0 0 1-.02.137c0 .065.014.117.04.156.026.143.045.228.058.254a.226.226 0 0 1 .04.059c.052.156.104.254.156.293a.24.24 0 0 1 .117.175.462.462 0 0 1 .176.059.43.43 0 0 0 .136.02c.183-.118.352-.209.508-.274.078-.13.13-.215.156-.254.04-.039.053-.104.04-.195.078-.195.123-.3.136-.313.026-.143.033-.26.02-.351a1.102 1.102 0 0 1 0-.293c.013-.078.02-.156.02-.235a.26.26 0 0 0-.098-.214.604.604 0 0 1 .039-.118.436.436 0 0 0 .058-.156c.065.013.111-.006.137-.058.04-.053.085-.072.137-.059.104.078.169.117.195.117.04 0 .065.02.078.059.026.091.033.15.02.176v.078a1.097 1.097 0 0 1-.04.254v.058a.788.788 0 0 1-.019.293 3.383 3.383 0 0 1-.039.274 2.13 2.13 0 0 0-.039.449l-.078.293a.835.835 0 0 1-.137.254.248.248 0 0 0-.058.117.493.493 0 0 1-.059.117.575.575 0 0 1-.176.137.307.307 0 0 0-.078.058c-.065-.026-.11-.013-.137.04a.295.295 0 0 1-.117.097.928.928 0 0 1-.254.059c-.052.026-.162.039-.332.039a.39.39 0 0 0-.176 0 .32.32 0 0 1-.097-.02c-.13-.039-.202-.071-.215-.097a.245.245 0 0 0-.059-.098c-.09-.117-.15-.17-.175-.156-.013 0-.026-.007-.04-.02a.791.791 0 0 0-.195-.312 3.255 3.255 0 0 0-.117-.293.43.43 0 0 0-.078-.176c.026-.091.032-.143.02-.156-.014-.013-.02-.033-.02-.059a.474.474 0 0 0 0-.195c0-.04.013-.072.039-.098a.953.953 0 0 1-.059-.098.432.432 0 0 1-.02-.136c0-.04.007-.072.02-.098.013-.026.007-.065-.02-.117 0-.13-.006-.202-.019-.215v-.059l.04-.253-.02-.215c0-.026.006-.065.02-.117a.534.534 0 0 0 .019-.118.708.708 0 0 1 0-.234l.058-.176c.027-.065.033-.182.02-.351-.013-.183.02-.306.098-.371.026-.105.039-.19.039-.254 0-.079.006-.15.02-.215a1.63 1.63 0 0 1 .116-.215c.053-.065.079-.11.079-.137a.321.321 0 0 0 .02-.097.471.471 0 0 0 .058-.157.369.369 0 0 0 .02-.117c.077-.182.136-.293.175-.332a.35.35 0 0 0 .059-.215c.117-.117.188-.208.214-.273a.236.236 0 0 1 .137-.137c.04-.117.065-.176.078-.176a.306.306 0 0 0 .078-.058c.066-.091.098-.15.098-.176a.757.757 0 0 1 .04-.098.606.606 0 0 0 .175-.215l.098-.195a3.2 3.2 0 0 1 .195-.254.297.297 0 0 0 .078-.156.306.306 0 0 0 .078-.059.64.64 0 0 0 .098-.078c.052-.104.104-.169.156-.195a.49.49 0 0 1 .117-.195.35.35 0 0 0 .098-.196c.117-.065.176-.11.176-.136.013-.026.039-.033.078-.02 0-.065.02-.104.058-.117a.183.183 0 0 0 .098-.137c.117-.091.182-.143.195-.156l.079-.078c.09-.065.143-.104.156-.117a.64.64 0 0 1 .097-.079.64.64 0 0 0 .04-.156c0-.026.006-.045.019-.058a.83.83 0 0 0 .02-.293v-.157l.039-.156c.013-.052.026-.11.039-.176.052-.169.078-.26.078-.273.013-.156.032-.247.058-.274a.136.136 0 0 0 .04-.136.297.297 0 0 0 .078-.156.25.25 0 0 1 .097-.157c.013-.117.026-.195.04-.234a.434.434 0 0 0 .058-.137.412.412 0 0 0 .137-.195.577.577 0 0 1 .156-.195.389.389 0 0 0 .098-.254.245.245 0 0 1 .097-.059.248.248 0 0 0 .117-.059c.118-.09.183-.136.196-.136a.173.173 0 0 0 .078-.02.436.436 0 0 1 .156-.058.445.445 0 0 0 .176-.098c.13-.04.24-.046.332-.02.091.013.17.013.234 0l.117.079c.04.013.092.02.157.02.117.103.182.175.195.214a.306.306 0 0 1 .059.078c.065.208.058.43-.02.664-.065.13-.124.228-.176.293a.765.765 0 0 0-.097.176.672.672 0 0 0-.235.234c-.078.117-.143.183-.195.196 0 .065-.02.11-.059.136-.039.026-.065.072-.078.137a1.171 1.171 0 0 0-.195.098 2.125 2.125 0 0 1-.117.156c-.013.013-.02.032-.02.058-.091.013-.15.072-.176.176-.13.091-.221.163-.273.215a.256.256 0 0 0-.117.117c-.026.04-.078.065-.157.078a.49.49 0 0 1-.117.196c-.09.065-.15.11-.175.136a.227.227 0 0 1-.06.04c-.012.065-.032.13-.058.195a.822.822 0 0 0-.02.195c0 .182-.006.32-.019.41-.013.091 0 .17.04.235-.04.117-.053.182-.04.195.026 0 .046.013.059.039a.594.594 0 0 1 0 .215c0 .065.006.137.02.215.025.104.045.176.058.215.013.039.033.09.059.156.039.104.052.182.039.234 0 .04.013.085.039.137.039.065.065.117.078.156.013.04.026.072.039.098a.48.48 0 0 1 .02.234c0 .065.025.124.078.176 0 .052.006.098.02.137.012.026.012.065 0 .117l.136.117zm-.313-4.297c.209-.182.352-.312.43-.39l.234-.274.079-.078.078-.117.175-.117a.186.186 0 0 0 .079-.157.521.521 0 0 0 .136-.097.316.316 0 0 0 .078-.176.175.175 0 0 0 .098-.117.269.269 0 0 1 .059-.137c.065-.143.09-.234.078-.273.013-.079.013-.13 0-.157a.306.306 0 0 0-.059-.078.45.45 0 0 1-.156-.039c-.065-.026-.117-.006-.156.059a.508.508 0 0 0-.157.02.217.217 0 0 0-.097.019 1.356 1.356 0 0 0-.293.176.521.521 0 0 1-.137.097.297.297 0 0 1-.078.157c-.04.039-.052.09-.04.156-.103.117-.162.202-.175.254a.245.245 0 0 1-.059.097.882.882 0 0 1-.078.118c-.039.039-.045.065-.02.078.014.013 0 .052-.038.117-.026.052-.026.084 0 .097-.065.13-.098.215-.098.254 0 .04-.006.072-.02.098a.685.685 0 0 0-.078.195c.013.026.02.059.02.098a.53.53 0 0 0-.078.176c.013.026.02.052.02.078.065.013.11 0 .136-.04a.295.295 0 0 1 .117-.097zM10.117 7.113c-.026.157-.058.254-.098.293-.039.04-.052.11-.039.215-.104.13-.156.215-.156.254a.083.083 0 0 1 0 .078.842.842 0 0 1-.136.234c0 .092-.014.144-.04.157a.227.227 0 0 0-.039.058 5.926 5.926 0 0 0-.078.371 1.757 1.757 0 0 0 0 .372.523.523 0 0 0 .235.02.994.994 0 0 1 .195-.02c.221-.013.358-.013.41 0 .117.013.195.02.234.02a.117.117 0 0 0 .079-.08c.013.027.052.047.117.06.065 0 .11-.013.136-.04.066.066.124.111.176.137.052.182.046.287-.02.313a.523.523 0 0 0-.136.097c-.234.078-.371.078-.41 0a6.928 6.928 0 0 0-.371-.058.974.974 0 0 0-.371.039 5.586 5.586 0 0 0-.293.039c-.078 0-.137.02-.176.058 0 .079-.013.15-.04.215a.284.284 0 0 0 .02.176 7.668 7.668 0 0 1-.097.215v.137a.605.605 0 0 0-.04.117c0 .039-.019.072-.058.098a.38.38 0 0 1 0 .292c.052.118.059.176.02.176-.026-.013-.04 0-.04.04.014.051.02.09.02.117 0 .025.007.071.02.136 0 .156-.007.267-.02.332a.726.726 0 0 0-.02.176.771.771 0 0 1 0 .254v.352c.014.09.027.162.04.214a.37.37 0 0 1 .02.118.18.18 0 0 1 0 .117v.117l.038.156a.864.864 0 0 1 .078.156.322.322 0 0 1-.02.098c-.012.04-.006.085.02.137.065.182.091.3.078.351 0 .04.013.091.04.157a.615.615 0 0 1 .078.214c0 .04.006.079.02.118l.077.195c.04.052.072.104.098.156a.315.315 0 0 0 .02.195l.117.157c.117.13.169.195.156.195a.576.576 0 0 0 .176.137c.039.013.058.052.058.117.13.039.248.098.352.176.065-.052.117-.072.156-.059.04.013.072.033.098.059l.078.078a.605.605 0 0 0 .117.039v.137c.013.052.04.078.078.078-.13.09-.215.13-.254.117h-.058c-.117.143-.202.202-.254.176a.267.267 0 0 0-.176-.02c-.078-.09-.137-.143-.176-.156-.026-.013-.045-.04-.058-.078-.183-.13-.326-.195-.43-.195a3.22 3.22 0 0 0-.273-.254 1.458 1.458 0 0 1-.157-.137c0-.13-.013-.195-.039-.195a.307.307 0 0 1-.078-.059.9.9 0 0 1-.078-.313.26.26 0 0 0-.098-.214c.013-.091 0-.157-.039-.196a.458.458 0 0 1-.097-.156.4.4 0 0 1 0-.176.285.285 0 0 0-.02-.175 1.38 1.38 0 0 0-.098-.254c-.013-.013-.02-.026-.02-.04a.307.307 0 0 0-.038-.214.361.361 0 0 1 0-.235 2.688 2.688 0 0 1-.078-.312 1.314 1.314 0 0 1-.02-.215v-.098a.368.368 0 0 0 .02-.117 4.375 4.375 0 0 1-.04-.234v-.293-.117c.014-.04.027-.085.04-.137.013-.143.013-.221 0-.234v-.04-.136a.605.605 0 0 1 .039-.117.307.307 0 0 1-.04-.215.737.737 0 0 0 .04-.235v-.136a.272.272 0 0 0-.02-.118.485.485 0 0 0-.02-.175c0-.026.014-.052.04-.079.039-.156.052-.234.039-.234v-.02c0-.038.006-.09.02-.156a.356.356 0 0 0 .019-.195.486.486 0 0 0-.215.059c-.078.039-.143.032-.195-.02a.245.245 0 0 1-.098.059.574.574 0 0 0-.137.02c-.13.038-.234.07-.312.097a.6.6 0 0 1-.254-.02 1.747 1.747 0 0 0-.176-.234c-.026-.052-.026-.117 0-.195a.573.573 0 0 1 .215-.04c.091-.012.156-.045.195-.097.065.013.13.02.196.02.065-.014.143-.027.234-.04.026-.052.085-.071.176-.058a.548.548 0 0 0 .254-.02c.169-.078.26-.136.273-.175.013-.053.033-.118.059-.196.039-.104.052-.163.039-.176-.013-.026-.013-.058 0-.097a.88.88 0 0 0 .039-.176c.013-.04.006-.065-.02-.078.078-.104.111-.163.098-.176v-.059c.065-.09.098-.15.098-.175 0-.04.02-.065.058-.078-.013-.092 0-.157.04-.196a.908.908 0 0 0 .136-.176c.013-.117.033-.24.059-.37.104-.144.162-.215.175-.215.026 0 .052-.013.079-.04a.605.605 0 0 0 .175-.058.173.173 0 0 1 .078-.02c.052.079.079.137.079.176.013.026.045.052.097.078zM12.793 7.367l-.117.078a.245.245 0 0 0-.098.059.277.277 0 0 0-.156.039c-.026.013-.065.013-.117 0-.143-.104-.228-.182-.254-.234.026-.052.032-.098.02-.137a.18.18 0 0 1 0-.117c.13-.065.201-.111.214-.137a.131.131 0 0 1 .117-.059.164.164 0 0 1 .02-.136.437.437 0 0 0 .058-.137.71.71 0 0 0 0-.234.307.307 0 0 1 .04-.215.241.241 0 0 1-.04-.137l.04-.156c-.066-.065-.13-.072-.196-.02a.777.777 0 0 1-.195.117 1.594 1.594 0 0 1-.274-.039c-.026-.026-.071-.032-.136-.02a3.715 3.715 0 0 1-.215-.35.36.36 0 0 1 0-.235c.091-.143.156-.221.195-.234a.175.175 0 0 0 .117-.098l.352.039c.078.039.124.059.137.059a.173.173 0 0 1 .078-.02c.039.026.078.059.117.098.052.026.11.032.176.02.013.064.071.11.176.136a.48.48 0 0 0 .058.137.227.227 0 0 1 .04.058c.025.156.045.254.058.293a.307.307 0 0 0 .058.078c.013.144.013.228 0 .254v.04c-.026.182-.039.299-.039.35a.397.397 0 0 1 0 .177.646.646 0 0 0-.078.097c-.013.026-.013.072 0 .137a.19.19 0 0 0-.078.117.248.248 0 0 1-.059.117v.118c0 .039-.006.071-.019.097zM14.96 9.516a1.88 1.88 0 0 0-.038.136c0 .052-.026.091-.078.118-.117.22-.156.423-.117.605.052.195.078.319.078.371 0 .04.013.085.039.137.039.039.058.078.058.117.013.04.04.059.079.059 0 .104.039.175.117.214 0 .053.02.092.058.118.04.013.059.052.059.117a.255.255 0 0 1 .117.117c.026.04.072.072.137.098.052.065.09.11.117.136.039.026.072.053.098.079l.175.156.235.234c.039.117.123.222.254.313.143.13.234.214.273.254.04.026.078.065.117.117-.013.117.033.195.137.234a.496.496 0 0 0 .098.254l.195.195c0 .078.02.143.059.196.039.039.078.084.117.136.026.144.045.228.058.254l.059.059a3.163 3.163 0 0 1 .078.703c-.026.117-.032.195-.02.234.014.026.02.052.02.079-.039.195-.085.332-.137.41-.013.039-.032.084-.058.136a.434.434 0 0 0-.02.137c-.17.17-.26.287-.273.352-.182.078-.287.143-.313.195l-.097.098a.636.636 0 0 1-.078.097 1.64 1.64 0 0 0-.215.117c0 .014-.013.014-.04 0-.117.066-.22.111-.312.137-.156.026-.24.046-.254.059-.013.013-.026.02-.039.02a.595.595 0 0 0-.215 0 .207.207 0 0 1-.175 0c-.118-.079-.202-.118-.254-.118a.218.218 0 0 1-.098-.02c-.091-.064-.15-.097-.176-.097a.174.174 0 0 1-.078-.02 1.209 1.209 0 0 0-.195-.195c-.026 0-.046-.006-.059-.02a3.16 3.16 0 0 1-.137-.234.183.183 0 0 0-.136-.098 3.82 3.82 0 0 0-.04-.175.19.19 0 0 0-.078-.117 2.727 2.727 0 0 0-.058-.313c0-.039.006-.085.02-.137v-.312a.284.284 0 0 0-.02-.176c.052-.039.078-.124.078-.254.065 0 .098-.02.098-.058l.039-.157a.97.97 0 0 0 .195-.136l.156-.118c.078-.09.13-.136.157-.136.039 0 .052-.013.039-.04.078.014.13.014.156 0 .039-.012.065-.032.078-.058a.84.84 0 0 0 .215.04.27.27 0 0 0 .137-.06c.026.04.052.06.078.06a.333.333 0 0 1 .136-.02l.215.117c.026 0 .04.013.04.039.064.09.136.176.214.254a.558.558 0 0 1 .195.234.495.495 0 0 1-.117.234c-.039.053-.09.111-.156.176a.494.494 0 0 1-.195 0 2.242 2.242 0 0 0-.215-.039.586.586 0 0 1-.137-.332.535.535 0 0 1-.117-.02c-.04-.025-.098-.032-.176-.019a.518.518 0 0 0-.273.117.595.595 0 0 1-.196.137 4.35 4.35 0 0 0-.078.332.892.892 0 0 0 .04.508.19.19 0 0 1 .038.098.247.247 0 0 0 .098.058c.04.013.052.052.04.117a.524.524 0 0 1 .136.098c.039.039.078.072.117.098.17.065.28.117.332.156a.363.363 0 0 0 .234.078c.183-.04.287-.065.313-.078a.3.3 0 0 0 .117-.04.977.977 0 0 1 .137-.097c.026 0 .052-.013.078-.039.052-.078.085-.117.098-.117a.174.174 0 0 0 .078-.02c.052-.039.09-.071.117-.097a.64.64 0 0 0 .098-.078c0-.053.013-.092.039-.118a.64.64 0 0 0 .078-.097c.065-.104.091-.183.078-.235 0-.052.02-.09.059-.117.013-.156.02-.306.02-.45a.633.633 0 0 0-.118-.39c-.013-.13-.026-.201-.04-.215l-.058-.058a2.198 2.198 0 0 1-.02-.156.173.173 0 0 0-.019-.079 2.848 2.848 0 0 0-.215-.273.428.428 0 0 1-.078-.176c-.065-.09-.104-.136-.117-.136a.228.228 0 0 1-.04-.06 1.192 1.192 0 0 0-.097-.155.228.228 0 0 1-.039-.059c-.065 0-.11-.065-.137-.195-.104-.065-.162-.11-.175-.137-.157-.195-.287-.319-.39-.371a2.135 2.135 0 0 0-.157-.176.739.739 0 0 0-.195-.137c-.013-.09-.053-.15-.118-.175a.263.263 0 0 1-.097-.176 2.469 2.469 0 0 1-.371-.45 2.291 2.291 0 0 0-.215-.35 2.206 2.206 0 0 0-.04-.274 3.82 3.82 0 0 1-.038-.176c0-.13-.007-.202-.02-.215-.013-.013-.02-.032-.02-.059l.02-.234c.013 0 .02-.013.02-.039a1.352 1.352 0 0 0-.04-.156.26.26 0 0 1 .06-.156.74.74 0 0 1 .077-.196c.026-.039.026-.071 0-.097a.64.64 0 0 1 .098-.079c.039-.026.052-.071.039-.136.234-.104.397-.228.488-.371a.864.864 0 0 0 .157-.079.441.441 0 0 1 .195-.078.897.897 0 0 0 .234-.117c.04-.039.072-.045.098-.02.104-.025.17-.038.195-.038.04 0 .072.013.098.039.117.013.176.013.176 0 .013-.026.032-.033.058-.02.17.013.28.033.332.059.065.013.13.02.196.02.026.038.09.07.195.097.104.078.17.137.195.176.026.039.065.071.117.097.052.078.085.124.098.137l.078.04c.052.168.091.266.117.292.04.026.046.046.02.059a.349.349 0 0 1 .098.097l.117.118c-.013.117-.013.182 0 .195.013 0 .02.013.02.039 0 .065-.02.137-.06.215 0 .09-.006.15-.019.176l-.039.078a1.79 1.79 0 0 0-.059.214.25.25 0 0 1-.097.157c-.078.13-.15.215-.215.254-.065.039-.13.084-.195.136a5.875 5.875 0 0 1-.254.059c-.065.013-.13.033-.196.059-.117 0-.182.006-.195.02a.15.15 0 0 1-.058-.02.246.246 0 0 1-.098-.059.247.247 0 0 0-.117-.059.38.38 0 0 1 0-.293.361.361 0 0 1 .195-.175c.091.013.143.02.156.02a.173.173 0 0 1 .078-.02c.118-.013.19-.02.215-.02l.078-.039c.117-.104.17-.156.157-.156-.013-.013-.007-.033.02-.059.064-.13.103-.195.116-.195.013-.013.02-.026.02-.04a.245.245 0 0 0-.04-.194l-.077-.196a.314.314 0 0 1-.04-.137.218.218 0 0 0-.019-.097c-.091-.13-.17-.209-.234-.235a.661.661 0 0 1-.176-.156c-.13 0-.202-.006-.215-.02 0-.025-.013-.038-.039-.038a.338.338 0 0 0-.195-.02h-.176c-.195 0-.32.013-.371.04a1.07 1.07 0 0 0-.137.058 1.073 1.073 0 0 0-.273.156c-.04.026-.052.059-.04.098h-.097zM30.547 15.492c-.065.104-.11.156-.137.156-.013 0-.026.014-.039.04-.104.078-.17.123-.195.136-.13.013-.195.026-.195.04h-.04c-.182-.066-.3-.092-.351-.079a.22.22 0 0 1-.156-.02l-.235-.078a.762.762 0 0 1-.176-.097.146.146 0 0 0-.156-.059c-.065-.143-.17-.221-.312-.234a1.287 1.287 0 0 1-.117-.215c-.014-.039-.046-.059-.098-.059-.091.105-.15.17-.176.196a.31.31 0 0 1-.059.078c-.117.091-.188.137-.214.137a5.323 5.323 0 0 1-.313.254 1.38 1.38 0 0 1-.371.156.19.19 0 0 1-.117.078.188.188 0 0 0-.098.078c-.13-.013-.228.013-.293.078-.052-.026-.097-.032-.137-.02a.435.435 0 0 1-.136.06c-.091-.014-.15-.014-.176 0-.013.012-.033.019-.059.019a1.469 1.469 0 0 1-.253-.059h-.079c-.156 0-.26-.013-.312-.039-.04-.013-.085-.006-.137.02-.078-.079-.137-.118-.176-.118a1.053 1.053 0 0 1-.136-.058 1.19 1.19 0 0 1-.215-.117.607.607 0 0 0-.254-.098 4.281 4.281 0 0 0-.195-.254.348.348 0 0 0-.098-.098.522.522 0 0 1-.098-.136.596.596 0 0 1-.156-.137c-.013-.026-.046-.046-.098-.059a.277.277 0 0 0-.039-.156.782.782 0 0 0-.097-.117l-.078-.234a.309.309 0 0 0-.118-.196.186.186 0 0 0-.058-.176.609.609 0 0 1-.078-.214c0-.144-.013-.228-.04-.254a.366.366 0 0 1-.019-.117c.026-.157.033-.248.02-.274a.32.32 0 0 1-.02-.098c0-.065.006-.117.02-.156a.605.605 0 0 1 .039-.117c.013-.065.02-.137.02-.215 0-.078.019-.143.058-.195v-.195a.309.309 0 0 1 .058-.079.76.76 0 0 0 .059-.156c.013-.052.033-.11.059-.176.104-.169.169-.3.195-.39a.74.74 0 0 1 .156-.235c.078-.104.13-.175.156-.214a.298.298 0 0 1 .157-.079c.078-.117.13-.182.156-.195.026-.013.032-.033.02-.059a.49.49 0 0 0 .195-.117l.156-.156a.439.439 0 0 0 .156-.059c.052-.039.098-.071.137-.097.143-.013.221-.026.234-.04.026-.025.052-.025.078 0 .066-.064.15-.084.254-.058.104.013.228.013.371 0 .196-.052.346-.065.45-.039.117.013.234.033.351.059.143.078.267.13.371.156.091.078.15.13.176.156.026.013.059.02.098.02.026.065.065.104.117.117.052 0 .084.033.098.098.117.065.182.104.195.117.013.013.026.02.039.02a1.61 1.61 0 0 0 .176-.196.94.94 0 0 0 .058-.098c.026-.026.072-.039.137-.039a.278.278 0 0 0 .156-.039c.117-.039.183-.045.196-.02.026.014.065.02.117.02.143.117.234.221.273.313a.62.62 0 0 0 .176.234c.026.065.046.143.059.234.026.079.039.17.039.274.013.143.02.24.02.293l-.02.37c0 .131-.007.255-.02.372 0 .117-.013.228-.039.332-.039.17-.065.267-.078.293a2.44 2.44 0 0 0-.156.352c-.04.117-.072.182-.098.195a.228.228 0 0 0-.039.059.432.432 0 0 0-.059.136c-.013.04-.045.072-.097.098a3.926 3.926 0 0 0-.117.273c-.014.04-.014.072 0 .098.078.143.117.234.117.273.013.04.032.072.058.098a.247.247 0 0 0 .098.059.245.245 0 0 1 .098.058c.104.078.156.124.156.137h.039a.475.475 0 0 0 .156.117.607.607 0 0 1 .117.04c.144.025.222.045.235.058a.322.322 0 0 0 .097-.02c.105-.013.176-.026.215-.039.04-.026.091-.026.157 0 .13.104.195.176.195.215 0 .026.013.052.039.078zm-2.95-4.258a2.219 2.219 0 0 0-.214-.195.808.808 0 0 0-.156-.117 2.34 2.34 0 0 1-.332-.195 2.523 2.523 0 0 0-.235-.059 2.021 2.021 0 0 0-.137-.059c-.065-.026-.104-.026-.117 0-.104.013-.162.02-.175.02-.014-.013-.033-.013-.06 0a8.172 8.172 0 0 0-.37.059.596.596 0 0 1-.215 0c-.065.039-.137.078-.215.117a.52.52 0 0 0-.176.117c-.156.091-.273.17-.351.234a.469.469 0 0 0-.176.235c-.078.09-.13.156-.156.195a1.06 1.06 0 0 1-.059.137.434.434 0 0 0-.058.136c-.014.04-.046.072-.098.098a.437.437 0 0 1-.059.156.496.496 0 0 1-.058.117l-.04.157c0 .039-.012.071-.038.097a.21.21 0 0 1-.02.196.518.518 0 0 0-.02.254c-.039.143-.058.254-.058.332a.83.83 0 0 1 0 .254c.052.182.091.299.117.351a.32.32 0 0 1 .04.176c.103.13.188.3.253.508a.537.537 0 0 1 .156.136c.04.04.072.105.098.196.104.09.163.143.176.156.078.078.117.13.117.156a.23.23 0 0 0 .059.04c.13.064.208.097.234.097.026 0 .052.02.078.059.091.013.17.039.234.078.079.039.15.084.215.136.13-.026.209-.026.235 0 .039.013.071.033.097.059a.299.299 0 0 1 .117-.04c.04 0 .092.007.157.02.078 0 .13-.006.156-.02a.94.94 0 0 0 .098-.058c.039-.013.11-.02.215-.02a.642.642 0 0 0 .195-.097c.026-.039.052-.045.078-.02.104-.104.176-.156.215-.156.039 0 .071-.013.097-.039.091-.104.157-.156.196-.156l.175-.176a.173.173 0 0 0 .02-.078.2.2 0 0 0 .156-.176.532.532 0 0 1 .137-.234l-.078-.273c-.04-.027-.059-.06-.059-.098a.366.366 0 0 0-.02-.117c-.025-.117-.051-.19-.077-.215a1.239 1.239 0 0 1-.078-.352.549.549 0 0 0-.02-.254 1.359 1.359 0 0 1-.059-.234c.013-.026.013-.072 0-.137 0-.09-.006-.175-.02-.254v-.254-.234a.523.523 0 0 0-.038-.195c.065-.13.09-.209.078-.235-.013-.026-.013-.058 0-.097-.052-.143-.104-.222-.156-.235zm.645.489c0 .052-.006.15-.02.293 0 .13.014.221.04.273-.026.052-.033.098-.02.137.013.039.02.078.02.117.013.052.026.098.039.137a.133.133 0 0 1 .039.097.666.666 0 0 0 0 .235.6.6 0 0 1 .039.117.49.49 0 0 0 0 .195c.013.065.02.11.02.137a.245.245 0 0 1 .058.098.247.247 0 0 1 .059.117c.065.013.097-.007.097-.059 0-.065.033-.104.098-.117-.026-.065-.02-.117.02-.156a.34.34 0 0 0 .097-.176c0-.143.013-.234.04-.273a.492.492 0 0 0 .058-.118c.039-.169.058-.3.058-.39v-.176c0-.117-.006-.182-.02-.195v-.079c0-.13-.006-.227-.019-.292a.434.434 0 0 0-.039-.196.258.258 0 0 0-.039-.234l-.137-.156c0-.013-.006-.02-.02-.02-.025.04-.058.059-.097.059-.026-.013-.065.02-.117.097a.387.387 0 0 1-.117.137c-.052.04-.065.091-.04.156l-.097.235zM36.816 9.516c-.013.039-.026.084-.039.136 0 .052-.026.091-.078.118-.117.22-.156.423-.117.605.052.195.078.319.078.371 0 .04.013.085.04.137.038.039.058.078.058.117.013.04.039.059.078.059 0 .104.039.175.117.214 0 .053.02.092.059.118.039.013.058.052.058.117a.255.255 0 0 1 .117.117c.027.04.072.072.137.098.052.065.091.11.117.136.04.026.072.053.098.079l.176.156.234.234c.04.117.124.222.254.313.143.13.234.214.274.254a.498.498 0 0 1 .117.117c-.013.117.032.195.136.234a.496.496 0 0 0 .098.254l.195.195c0 .078.02.143.059.196.04.039.078.084.117.136.026.144.046.228.059.254l.058.059a3.187 3.187 0 0 1 .078.703c-.026.117-.032.195-.019.234.013.026.02.052.02.079-.04.195-.085.332-.137.41-.013.039-.033.084-.059.136a.434.434 0 0 0-.02.137c-.169.17-.26.287-.273.352-.182.078-.286.143-.312.195l-.098.098a.642.642 0 0 1-.078.097c-.13.065-.202.104-.215.117 0 .014-.013.014-.039 0-.117.066-.221.111-.312.137-.157.026-.241.046-.254.059-.013.013-.026.02-.04.02a.596.596 0 0 0-.214 0 .207.207 0 0 1-.176 0c-.117-.079-.202-.118-.254-.118a.218.218 0 0 1-.098-.02c-.09-.064-.15-.097-.175-.097a.173.173 0 0 1-.078-.02 1.218 1.218 0 0 0-.196-.195c-.026 0-.045-.006-.058-.02a3.16 3.16 0 0 1-.137-.234.183.183 0 0 0-.137-.098 3.957 3.957 0 0 0-.039-.175.19.19 0 0 0-.078-.117 2.75 2.75 0 0 0-.059-.313c0-.039.007-.085.02-.137v-.312a.285.285 0 0 0-.02-.176c.052-.039.078-.124.078-.254.066 0 .098-.02.098-.058l.04-.157a.966.966 0 0 0 .194-.136l.157-.118c.078-.09.13-.136.156-.136.04 0 .052-.013.04-.04.077.014.13.014.155 0 .04-.012.065-.032.078-.058a.84.84 0 0 0 .215.04.27.27 0 0 0 .137-.06c.026.04.052.06.078.06a.333.333 0 0 1 .137-.02c.117.065.189.104.215.117.026 0 .039.013.039.039.065.09.136.176.215.254a.556.556 0 0 1 .195.234.494.494 0 0 1-.117.234c-.04.053-.091.111-.157.176a.494.494 0 0 1-.195 0 2.24 2.24 0 0 0-.215-.039.587.587 0 0 1-.136-.332.536.536 0 0 1-.118-.02c-.039-.025-.097-.032-.175-.019a.518.518 0 0 0-.274.117.595.595 0 0 1-.195.137 4.302 4.302 0 0 0-.078.332.889.889 0 0 0 .039.508.19.19 0 0 1 .039.098.246.246 0 0 0 .098.058c.039.013.052.052.039.117a.52.52 0 0 1 .136.098c.04.039.078.072.117.098.17.065.28.117.333.156a.363.363 0 0 0 .234.078c.182-.04.286-.065.312-.078a.299.299 0 0 0 .118-.04.983.983 0 0 1 .136-.097c.026 0 .052-.013.078-.039.053-.078.085-.117.098-.117a.173.173 0 0 0 .078-.02c.052-.039.091-.071.117-.097a.642.642 0 0 0 .098-.078c0-.053.013-.092.04-.118a.647.647 0 0 0 .077-.097c.065-.104.091-.183.078-.235 0-.052.02-.09.059-.117.013-.156.02-.306.02-.45a.632.632 0 0 0-.118-.39c-.013-.13-.026-.201-.039-.215l-.058-.058a2.198 2.198 0 0 1-.02-.156.174.174 0 0 0-.02-.079 2.853 2.853 0 0 0-.214-.273.428.428 0 0 1-.078-.176c-.066-.09-.105-.136-.117-.136a.223.223 0 0 1-.04-.06 1.187 1.187 0 0 0-.097-.155.228.228 0 0 1-.04-.059c-.064 0-.11-.065-.136-.195-.104-.065-.163-.11-.176-.137-.156-.195-.286-.319-.39-.371a2.135 2.135 0 0 0-.157-.176.742.742 0 0 0-.195-.137c-.013-.09-.052-.15-.117-.175a.263.263 0 0 1-.098-.176 2.469 2.469 0 0 1-.37-.45 2.299 2.299 0 0 0-.216-.35 2.206 2.206 0 0 0-.039-.274 3.693 3.693 0 0 1-.039-.176c0-.13-.006-.202-.02-.215-.012-.013-.019-.032-.019-.059l.02-.234c.013 0 .02-.013.02-.039a1.35 1.35 0 0 0-.04-.156.26.26 0 0 1 .059-.156.747.747 0 0 1 .078-.196c.026-.039.026-.071 0-.097a.642.642 0 0 1 .097-.079c.04-.026.052-.071.04-.136.234-.104.397-.228.488-.371a.87.87 0 0 0 .156-.079.441.441 0 0 1 .195-.078.901.901 0 0 0 .235-.117c.039-.039.071-.045.097-.02.105-.025.17-.038.196-.038.039 0 .071.013.097.039.117.013.176.013.176 0 .013-.026.033-.033.059-.02.169.013.28.033.332.059.065.013.13.02.195.02.026.038.091.07.195.097a.94.94 0 0 1 .196.176c.026.039.065.071.117.097.052.078.084.124.097.137l.079.04c.052.168.09.266.117.292.039.026.045.046.02.059.038.026.071.058.097.097l.117.118c-.013.117-.013.182 0 .195.013 0 .02.013.02.039 0 .065-.02.137-.059.215 0 .09-.006.15-.02.176l-.038.078c-.027.078-.046.15-.06.214a.25.25 0 0 1-.097.157c-.078.13-.15.215-.215.254-.065.039-.13.084-.195.136a5.876 5.876 0 0 1-.254.059c-.065.013-.13.033-.195.059-.117 0-.182.006-.195.02a.15.15 0 0 1-.059-.02.247.247 0 0 1-.098-.059.247.247 0 0 0-.117-.059.38.38 0 0 1 0-.293.36.36 0 0 1 .196-.175c.09.013.143.02.156.02a.173.173 0 0 1 .078-.02c.117-.013.189-.02.215-.02l.078-.039c.117-.104.17-.156.156-.156-.013-.013-.007-.033.02-.059.065-.13.104-.195.117-.195.013-.013.02-.026.02-.04a.245.245 0 0 0-.04-.194l-.078-.196a.315.315 0 0 1-.039-.137.218.218 0 0 0-.02-.097c-.09-.13-.169-.209-.234-.235a.66.66 0 0 1-.176-.156c-.13 0-.202-.006-.215-.02 0-.025-.012-.038-.038-.038a.338.338 0 0 0-.196-.02h-.176c-.195 0-.319.013-.37.04-.04.012-.085.032-.137.058a1.075 1.075 0 0 0-.274.156c-.039.026-.052.059-.039.098h-.098zM47.11 14.848c.13.013.201.006.214-.02.013-.026.033-.039.059-.039.065.013.11.033.136.059.04.026.092.039.157.039.104.13.15.201.136.215v.058a.355.355 0 0 1 .118.156.535.535 0 0 0 .156.137 3.38 3.38 0 0 1-.098.293c-.013.013-.02.04-.02.078a.35.35 0 0 0-.097.098 1.252 1.252 0 0 0-.078.137.66.66 0 0 1-.176.156c-.052.039-.11.091-.176.156-.143.013-.26.04-.351.078-.091.04-.183.007-.274-.097-.13.013-.201.013-.214 0 0-.014-.013-.02-.04-.02-.195-.052-.305-.098-.331-.137-.04-.078-.072-.117-.098-.117-.026 0-.052-.013-.078-.039a.485.485 0 0 1-.078-.195.434.434 0 0 0-.02-.137 1.604 1.604 0 0 0-.117-.273c.026-.144.013-.254-.04-.332a.181.181 0 0 0 0-.118c0-.039.014-.071.04-.097.013-.17.006-.267-.02-.293a.217.217 0 0 1-.02-.098c.04-.13.053-.208.04-.234v-.078c.039-.248.058-.424.058-.528 0-.104.007-.176.02-.215a.21.21 0 0 0 .039-.117.475.475 0 0 1 0-.195.166.166 0 0 0 0-.156c.04-.144.065-.241.078-.293.013-.052.026-.098.04-.137a.48.48 0 0 0 .019-.234c0-.079.026-.163.078-.254-.026-.026-.033-.078-.02-.157.013-.078-.006-.123-.058-.136.026-.026.039-.065.039-.117 0-.066-.013-.111-.04-.137a2.561 2.561 0 0 1 0-.45.502.502 0 0 0-.058-.312 5.824 5.824 0 0 1-.02-.273c0-.026-.025-.04-.078-.04.027-.078.027-.123 0-.136a28.488 28.488 0 0 0-.039-.078c-.026-.117-.052-.176-.078-.176a.172.172 0 0 1-.078-.02.647.647 0 0 0-.078-.097.598.598 0 0 1-.039-.117.46.46 0 0 1-.156-.098c-.026-.052-.078-.072-.157-.059a.51.51 0 0 0-.136-.078.493.493 0 0 0-.117-.058.318.318 0 0 0-.157 0c-.052 0-.09-.013-.117-.04a.315.315 0 0 1-.137.04.217.217 0 0 0-.097-.02c-.13.026-.215.04-.254.04l-.195.038a.179.179 0 0 0-.137.117c-.17-.026-.287.026-.352.157a.89.89 0 0 0-.215.117.756.756 0 0 0-.039.098c-.104.039-.156.071-.156.097 0 .013-.013.026-.039.04l-.117.195c-.104.065-.176.11-.215.136-.026.013-.046.04-.059.078a1.99 1.99 0 0 1-.058.137c0 .026-.013.052-.04.078l-.097.196a.657.657 0 0 1-.098.156.172.172 0 0 0-.02.078c.066.195.099.325.099.39.013.053.032.111.058.176.026.091.046.157.059.196.013.039.032.071.058.097-.026.026-.039.065-.039.117.013.053.007.085-.02.098.027.104.053.222.079.352.026.104.032.162.02.175a.15.15 0 0 0 .019.06c.026.09.039.168.039.233a.765.765 0 0 0 .059.157.677.677 0 0 1 .02.273c.038.104.045.176.019.215a.395.395 0 0 1 .02.215c-.014.065-.007.117.019.156-.052.117-.072.182-.059.195.013.013.02.026.02.04a.842.842 0 0 0-.02.156c.013.026.02.071.02.136 0 .13.006.202.02.215.012.04.006.085-.02.137a.433.433 0 0 0-.02.137v.175a.337.337 0 0 1-.02.196l-.117.234c-.013.104-.032.17-.058.195a.759.759 0 0 0-.04.098.76.76 0 0 1-.155.059.295.295 0 0 0-.098.117.13.13 0 0 0-.117.02.49.49 0 0 1-.117.058.415.415 0 0 0-.176.156.267.267 0 0 0-.176.02.098.098 0 0 1-.117 0c-.104-.104-.157-.163-.157-.176.014-.013.014-.026 0-.039l-.214-.234c-.091-.157-.137-.26-.137-.313a.136.136 0 0 0-.04-.137c.027-.078.027-.143 0-.195a.988.988 0 0 1-.019-.195c.013-.104.013-.163 0-.176-.013-.013-.02-.033-.02-.059 0-.026.007-.071.02-.136l.04-.215a.508.508 0 0 0-.02-.156c0-.053.006-.111.02-.176v-.235a2.52 2.52 0 0 1 .038-.195 1.1 1.1 0 0 0 .02-.215v-.215c.052-.078.072-.136.059-.175 0-.053.006-.098.02-.137.038-.065.064-.11.077-.137a.19.19 0 0 0 .04-.098.574.574 0 0 0 .019-.136.43.43 0 0 1 .02-.137.841.841 0 0 1 .156-.41c0-.13.006-.189.02-.176.012 0 .019-.013.019-.039.078-.17.117-.273.117-.312 0-.052.006-.105.02-.157.025-.117.032-.195.019-.234v-.098c-.026-.104-.065-.175-.117-.215-.04-.039-.046-.078-.02-.117-.052-.143-.097-.228-.136-.254a.241.241 0 0 1-.04-.136.565.565 0 0 1-.136-.235.211.211 0 0 0-.059-.156 1.361 1.361 0 0 0-.176-.156c-.078-.052-.136-.072-.175-.059a.083.083 0 0 1-.079 0c-.169.091-.306.124-.41.098-.09-.026-.15-.078-.175-.156.026-.17.058-.26.097-.274a.286.286 0 0 0 .098-.137c.091.013.156.007.195-.02.04-.025.091-.032.156-.019.157-.052.274-.065.352-.039.078.026.176.046.293.059.104.078.17.13.195.156.026.026.072.04.137.04.013.13.026.214.039.253a.245.245 0 0 1 .059.098c.026.182.071.312.136.39.052.144.078.209.078.196.013-.013.026-.007.04.02a4.93 4.93 0 0 0 .156-.137c.026-.013.032-.033.02-.06.117-.077.175-.123.175-.136 0-.013-.007-.02-.02-.02.053-.038.098-.077.137-.117.04-.039.085-.078.137-.117.13-.182.24-.312.332-.39.13-.104.247-.19.352-.254a.66.66 0 0 1 .175-.117.294.294 0 0 0 .117-.098c.13.026.241.02.333-.02a.964.964 0 0 1 .312-.097.942.942 0 0 1 .43-.02c.143.04.234.059.273.059a.317.317 0 0 1 .156 0 .435.435 0 0 1 .137.058c.052.013.11.02.176.02.104.052.17.091.195.117.04.026.072.052.098.078.17.117.267.209.293.274a.905.905 0 0 0 .137.175c.039.027.058.06.058.098 0 .04.033.065.098.078.039.143.071.235.097.274.04.143.066.267.079.37.039.144.052.222.039.235-.013.013-.02.033-.02.059.052.182.078.28.078.293 0 .117.007.182.02.195.013.013.02.026.02.04a1.104 1.104 0 0 0 0 .292.245.245 0 0 1-.04.195c.013.118.02.19.02.215.013.026.02.052.02.078-.053.183-.072.287-.06.313a.326.326 0 0 0-.058.254.263.263 0 0 1-.078.234c.013.026.013.059 0 .098v.136c0 .105-.007.163-.02.176 0 .013-.006.026-.019.04a1.312 1.312 0 0 1-.04.214v.137c0 .156-.012.273-.038.351.013.13.006.222-.02.274v.215c0 .039.007.071.02.097-.013.066-.02.144-.02.235a.475.475 0 0 0 0 .195.306.306 0 0 1 .059.078c0 .143.006.235.02.274a.43.43 0 0 1 .019.136.256.256 0 0 1 .117.118.256.256 0 0 0 .117.117.4.4 0 0 1 .176 0c.052.013.11.026.176.039.143-.052.208-.078.195-.078l.02-.02a.859.859 0 0 0 .097-.176c.013-.039.007-.071-.02-.097-.103-.104-.188-.163-.253-.176-.052-.026-.085-.085-.098-.176.04-.117.046-.182.02-.195-.013-.026-.007-.065.02-.117zm-5.157-2.207a1.02 1.02 0 0 1-.059.488.498.498 0 0 0-.058.117.605.605 0 0 0-.04.137.53.53 0 0 1-.019.117v.098c0 .09-.006.15-.02.175a.15.15 0 0 1-.019.059c-.026.117-.039.182-.039.195.013 0 .02.02.02.059-.04.17-.052.28-.04.332a.243.243 0 0 1 0 .137c-.025.13-.032.215-.019.254a.759.759 0 0 1 .04.097c0 .078-.007.163-.02.254a.963.963 0 0 0 0 .274c.052.156.078.247.078.273a.225.225 0 0 0 .058.04.45.45 0 0 1 .04.136c.012.026.038.045.078.058.052 0 .09-.013.117-.039a.246.246 0 0 1 .097-.058.249.249 0 0 1 .059-.117.35.35 0 0 0 .098-.098c.026-.17.039-.287.039-.352a.988.988 0 0 0 .02-.195c-.014-.143-.033-.215-.06-.215-.025 0-.032-.013-.019-.039a7.24 7.24 0 0 0 .078-.273.643.643 0 0 0 .02-.157 7.214 7.214 0 0 1-.02-.43c0-.09.007-.175.02-.253-.052-.104-.072-.17-.059-.195.013-.027.013-.06 0-.098-.039-.104-.052-.156-.039-.156.026-.013.033-.033.02-.059a4.773 4.773 0 0 0-.098-.234c-.013-.04 0-.079.04-.118-.053-.026-.072-.065-.06-.117.027-.052.027-.097 0-.136-.065-.118-.11-.176-.136-.176a.488.488 0 0 0-.059.117.132.132 0 0 1-.039.098zM55.664 15.492c-.065.104-.11.156-.137.156-.013 0-.026.014-.039.04-.104.078-.169.123-.195.136-.13.013-.195.026-.195.04h-.04c-.182-.066-.299-.092-.351-.079a.22.22 0 0 1-.156-.02l-.235-.078a.762.762 0 0 1-.175-.097.146.146 0 0 0-.157-.059c-.065-.143-.169-.221-.312-.234a1.287 1.287 0 0 1-.117-.215c-.013-.039-.046-.059-.098-.059-.091.105-.15.17-.176.196a.306.306 0 0 1-.058.078c-.117.091-.19.137-.215.137a5.357 5.357 0 0 1-.313.254 1.383 1.383 0 0 1-.37.156.19.19 0 0 1-.118.078.188.188 0 0 0-.098.078c-.13-.013-.227.013-.293.078-.052-.026-.097-.032-.136-.02a.436.436 0 0 1-.137.06c-.091-.014-.15-.014-.176 0-.013.012-.032.019-.058.019a1.469 1.469 0 0 1-.254-.059h-.078c-.157 0-.26-.013-.313-.039-.039-.013-.085-.006-.137.02-.078-.079-.136-.118-.175-.118a1.06 1.06 0 0 1-.137-.058 1.193 1.193 0 0 1-.215-.117.607.607 0 0 0-.254-.098 4.281 4.281 0 0 0-.195-.254.348.348 0 0 0-.098-.098.522.522 0 0 1-.098-.136.596.596 0 0 1-.156-.137c-.013-.026-.045-.046-.097-.059a.278.278 0 0 0-.04-.156.777.777 0 0 0-.097-.117l-.078-.234a.309.309 0 0 0-.117-.196.186.186 0 0 0-.06-.176.609.609 0 0 1-.077-.214c0-.144-.013-.228-.04-.254a.369.369 0 0 1-.019-.117c.026-.157.033-.248.02-.274a.322.322 0 0 1-.02-.098c0-.065.007-.117.02-.156a.61.61 0 0 1 .039-.117c.013-.065.02-.137.02-.215 0-.078.019-.143.058-.195v-.195a.309.309 0 0 1 .059-.079.76.76 0 0 0 .058-.156c.013-.052.033-.11.059-.176.104-.169.169-.3.195-.39a.74.74 0 0 1 .156-.235c.078-.104.13-.175.157-.214a.298.298 0 0 1 .156-.079c.078-.117.13-.182.156-.195.026-.013.033-.033.02-.059a.49.49 0 0 0 .195-.117l.156-.156a.439.439 0 0 0 .156-.059c.052-.039.098-.071.137-.097.143-.013.221-.026.234-.04.027-.025.053-.025.079 0 .065-.064.15-.084.254-.058.104.013.227.013.37 0 .196-.052.346-.065.45-.039.117.013.234.033.351.059.144.078.267.13.371.156.092.078.15.13.176.156.026.013.059.02.098.02.026.065.065.104.117.117.052 0 .085.033.098.098.117.065.182.104.195.117.013.013.026.02.04.02a1.61 1.61 0 0 0 .175-.196.957.957 0 0 0 .059-.098c.026-.026.071-.039.136-.039a.278.278 0 0 0 .157-.039c.117-.039.182-.045.195-.02.026.014.065.02.117.02.143.117.234.221.273.313a.62.62 0 0 0 .176.234c.026.065.046.143.059.234.026.079.039.17.039.274.013.143.02.24.02.293l-.02.37c0 .131-.007.255-.02.372 0 .117-.013.228-.039.332a2.27 2.27 0 0 1-.078.293 2.44 2.44 0 0 0-.156.352c-.04.117-.072.182-.098.195a.23.23 0 0 0-.039.059.435.435 0 0 0-.058.136c-.013.04-.046.072-.098.098a3.926 3.926 0 0 0-.117.273c-.013.04-.013.072 0 .098.078.143.117.234.117.273.013.04.032.072.059.098a.246.246 0 0 0 .097.059c.04.013.072.032.098.058.104.078.156.124.156.137h.04a.475.475 0 0 0 .155.117.607.607 0 0 1 .118.04c.143.025.22.045.234.058a.322.322 0 0 0 .098-.02c.104-.013.175-.026.214-.039.04-.026.092-.026.157 0 .13.104.195.176.195.215 0 .026.013.052.04.078zm-2.95-4.258a2.209 2.209 0 0 0-.214-.195.81.81 0 0 0-.156-.117 2.343 2.343 0 0 1-.332-.195 2.511 2.511 0 0 0-.235-.059 1.99 1.99 0 0 0-.136-.059c-.066-.026-.105-.026-.118 0-.104.013-.162.02-.175.02-.013-.013-.033-.013-.059 0a8.172 8.172 0 0 0-.371.059.596.596 0 0 1-.215 0c-.065.039-.137.078-.215.117a.52.52 0 0 0-.175.117c-.157.091-.274.17-.352.234a.469.469 0 0 0-.176.235 2.44 2.44 0 0 0-.156.195c-.013.039-.033.085-.059.137a.434.434 0 0 0-.058.136c-.013.04-.046.072-.098.098a.439.439 0 0 1-.059.156.5.5 0 0 1-.058.117 89.09 89.09 0 0 0-.04.157c0 .039-.012.071-.038.097a.21.21 0 0 1-.02.196.518.518 0 0 0-.02.254c-.038.143-.058.254-.058.332a.83.83 0 0 1 0 .254c.052.182.091.299.117.351a.32.32 0 0 1 .04.176c.104.13.188.3.253.508a.537.537 0 0 1 .157.136c.039.04.071.105.097.196.104.09.163.143.176.156.078.078.117.13.117.156a.228.228 0 0 0 .059.04c.13.064.208.097.234.097.026 0 .052.02.078.059.091.013.17.039.235.078.078.039.15.084.214.136.13-.026.209-.026.235 0 .039.013.071.033.097.059a.298.298 0 0 1 .118-.04c.039 0 .09.007.156.02.078 0 .13-.006.156-.02a.95.95 0 0 0 .098-.058c.039-.013.11-.02.215-.02a.642.642 0 0 0 .195-.097c.026-.039.052-.045.078-.02.104-.104.176-.156.215-.156.039 0 .072-.013.098-.039.09-.104.156-.156.195-.156l.176-.176a.173.173 0 0 0 .02-.078.2.2 0 0 0 .155-.176.532.532 0 0 1 .137-.234l-.078-.273c-.039-.027-.059-.06-.059-.098a.366.366 0 0 0-.02-.117c-.025-.117-.051-.19-.077-.215a1.239 1.239 0 0 1-.078-.352.549.549 0 0 0-.02-.254 1.359 1.359 0 0 1-.058-.234c.013-.026.013-.072 0-.137 0-.09-.007-.175-.02-.254v-.254-.234a.523.523 0 0 0-.039-.195c.065-.13.091-.209.078-.235-.013-.026-.013-.058 0-.097-.052-.143-.104-.222-.156-.235zm.645.489c0 .052-.006.15-.02.293 0 .13.014.221.04.273-.026.052-.033.098-.02.137.013.039.02.078.02.117.013.052.026.098.039.137a.133.133 0 0 1 .039.097.666.666 0 0 0 0 .235.606.606 0 0 1 .04.117.49.49 0 0 0 0 .195c.012.065.019.11.019.137a.245.245 0 0 1 .058.098.247.247 0 0 1 .059.117c.065.013.097-.007.097-.059 0-.065.033-.104.098-.117-.026-.065-.02-.117.02-.156a.34.34 0 0 0 .097-.176c0-.143.013-.234.04-.273a.496.496 0 0 0 .058-.118c.039-.169.059-.3.059-.39v-.176c0-.117-.007-.182-.02-.195v-.079c0-.13-.007-.227-.02-.292a.434.434 0 0 0-.039-.196.258.258 0 0 0-.039-.234l-.136-.156c0-.013-.007-.02-.02-.02-.026.04-.059.059-.098.059-.026-.013-.065.02-.117.097a.387.387 0 0 1-.117.137c-.052.04-.065.091-.039.156l-.098.235zM58.613 7.113c-.026.157-.058.254-.097.293-.04.04-.052.11-.04.215-.104.13-.156.215-.156.254a.083.083 0 0 1 0 .078.844.844 0 0 1-.136.234c0 .092-.013.144-.04.157a.227.227 0 0 0-.038.058 5.92 5.92 0 0 0-.079.371 1.76 1.76 0 0 0 0 .372.523.523 0 0 0 .235.02.994.994 0 0 1 .195-.02c.221-.013.358-.013.41 0 .117.013.196.02.235.02a.117.117 0 0 0 .078-.08c.013.027.052.047.117.06.065 0 .11-.013.137-.04.065.066.123.111.175.137.052.182.046.287-.02.313a.523.523 0 0 0-.136.097c-.234.078-.371.078-.41 0a6.928 6.928 0 0 0-.371-.058.974.974 0 0 0-.371.039 5.583 5.583 0 0 0-.293.039c-.078 0-.137.02-.176.058 0 .079-.013.15-.039.215a.284.284 0 0 0 .02.176 7.401 7.401 0 0 1-.098.215v.137a.606.606 0 0 0-.04.117c0 .039-.019.072-.058.098a.381.381 0 0 1 0 .292c.052.118.059.176.02.176-.026-.013-.04 0-.04.04.014.051.02.09.02.117 0 .025.007.071.02.136 0 .156-.007.267-.02.332a.727.727 0 0 0-.02.176.766.766 0 0 1 0 .254v.352c.014.09.027.162.04.214a.37.37 0 0 1 .02.118.18.18 0 0 1 0 .117v.117l.038.156a.864.864 0 0 1 .078.156.322.322 0 0 1-.02.098c-.012.04-.006.085.02.137.066.182.092.3.079.351 0 .04.013.091.039.157a.614.614 0 0 1 .078.214c0 .04.006.079.02.118l.077.195c.04.052.072.104.098.156a.314.314 0 0 0 .02.195l.117.157c.117.13.169.195.156.195a.574.574 0 0 0 .176.137c.039.013.058.052.058.117.13.039.248.098.352.176.065-.052.117-.072.156-.059.04.013.072.033.098.059l.078.078a.605.605 0 0 0 .117.039v.137c.013.052.04.078.078.078-.13.09-.215.13-.254.117h-.058c-.117.143-.202.202-.254.176a.267.267 0 0 0-.176-.02c-.078-.09-.137-.143-.176-.156-.026-.013-.045-.04-.058-.078-.183-.13-.326-.195-.43-.195a3.23 3.23 0 0 0-.273-.254 1.457 1.457 0 0 1-.157-.137c0-.13-.013-.195-.039-.195a.306.306 0 0 1-.078-.059.9.9 0 0 1-.078-.313.26.26 0 0 0-.098-.214c.013-.091 0-.157-.039-.196a.458.458 0 0 1-.097-.156.4.4 0 0 1 0-.176.284.284 0 0 0-.02-.175 1.378 1.378 0 0 0-.097-.254c-.014-.013-.02-.026-.02-.04a.307.307 0 0 0-.04-.214.362.362 0 0 1 0-.235 2.675 2.675 0 0 1-.077-.312 1.317 1.317 0 0 1-.02-.215v-.098a.366.366 0 0 0 .02-.117 4.372 4.372 0 0 1-.04-.234v-.293-.117c.014-.04.027-.085.04-.137.013-.143.013-.221 0-.234v-.04-.136a.606.606 0 0 1 .039-.117.307.307 0 0 1-.04-.215.738.738 0 0 0 .04-.235v-.136a.273.273 0 0 0-.02-.118.485.485 0 0 0-.02-.175c0-.026.014-.052.04-.079.039-.156.052-.234.039-.234v-.02c0-.038.006-.09.02-.156a.356.356 0 0 0 .019-.195.486.486 0 0 0-.215.059c-.078.039-.143.032-.195-.02a.245.245 0 0 1-.098.059.574.574 0 0 0-.137.02c-.13.038-.234.07-.312.097a.6.6 0 0 1-.254-.02 1.74 1.74 0 0 0-.176-.234c-.026-.052-.026-.117 0-.195a.574.574 0 0 1 .215-.04c.091-.012.156-.045.195-.097.066.013.13.02.196.02a4.36 4.36 0 0 1 .234-.04c.026-.052.085-.071.176-.058a.548.548 0 0 0 .254-.02c.169-.078.26-.136.273-.175a2.76 2.76 0 0 1 .059-.196c.039-.104.052-.163.039-.176-.013-.026-.013-.058 0-.097a.88.88 0 0 0 .039-.176c.013-.04.006-.065-.02-.078.078-.104.111-.163.098-.176v-.059c.065-.09.098-.15.098-.175 0-.04.02-.065.058-.078-.013-.092 0-.157.04-.196a.909.909 0 0 0 .136-.176 4.31 4.31 0 0 1 .059-.37c.104-.144.162-.215.175-.215.027 0 .053-.013.079-.04a.606.606 0 0 0 .175-.058.173.173 0 0 1 .078-.02c.053.079.079.137.079.176.013.026.045.052.097.078zM63.79 16l-.411.059c.013-.013 0-.02-.04-.02h-.233c-.04 0-.06-.013-.06-.039a.394.394 0 0 0-.214-.02.878.878 0 0 1-.234-.039l-.235-.078a.492.492 0 0 0-.117-.058c-.17-.091-.286-.137-.352-.137a1.627 1.627 0 0 1-.214-.117.149.149 0 0 0-.02-.059 5.836 5.836 0 0 0-.234-.137l-.078-.078c-.052-.065-.098-.104-.137-.117l-.078-.078c-.078-.13-.13-.202-.156-.215a.245.245 0 0 1-.059-.098 2.262 2.262 0 0 0-.176-.214.685.685 0 0 1-.097-.196c-.079-.09-.118-.162-.118-.214a.892.892 0 0 1-.136-.274.972.972 0 0 1-.02-.332 1.593 1.593 0 0 0-.039-.273.575.575 0 0 0-.02-.137c.014-.104.014-.163 0-.176a.173.173 0 0 1-.019-.078c.039-.117.052-.195.039-.234 0-.04.013-.072.04-.098a.82.82 0 0 1 0-.254l.038-.195c.052-.026.078-.11.078-.254.091-.13.144-.202.157-.215.026-.013.032-.046.02-.098a1.13 1.13 0 0 1 .253-.254.317.317 0 0 0 .137-.195l.175-.176a1.15 1.15 0 0 0 .215-.195c.17-.117.274-.202.313-.254a.54.54 0 0 0 .293-.117c.065.026.13.013.195-.04.078-.051.15-.064.215-.038.104-.065.163-.091.176-.078a.083.083 0 0 0 .078 0l.215-.02c.156-.026.254-.045.293-.058a.346.346 0 0 1 .273-.02.164.164 0 0 0 .137-.02c.039.053.084.079.136.079a.494.494 0 0 1 .352.058.4.4 0 0 0 .176 0c.13.091.202.15.215.176.026.013.058.02.097.02.144.065.248.15.313.253a.836.836 0 0 0 .332.254c.039.091.091.176.156.254.04.091.072.156.098.196a.419.419 0 0 1 .078.136c.052.104.072.176.058.215-.013.04-.013.072 0 .098.053.104.092.208.118.312a.289.289 0 0 0-.078.137.345.345 0 0 1-.04.156c-.026.04-.058.085-.097.137a.458.458 0 0 0-.098.156.678.678 0 0 1-.136.137.307.307 0 0 0-.079.117 1.88 1.88 0 0 0-.468.137.732.732 0 0 1-.332.078h-.254a.21.21 0 0 1-.118-.04.098.098 0 0 0-.117 0 .432.432 0 0 0-.175-.136 2.293 2.293 0 0 0-.176-.078l-.078-.078a.94.94 0 0 0-.059-.098 1.326 1.326 0 0 1-.137-.37c0-.092-.032-.144-.097-.157a.479.479 0 0 0 .039-.176c.013-.065.032-.13.058-.195a.442.442 0 0 0 .157-.156c.182-.079.306-.118.37-.118l.196.176-.04.274c-.012.078-.07.123-.175.136-.039.091-.039.163 0 .215.052.052.11.091.176.117.091.053.15.098.176.137.039.04.071.033.097-.02.183 0 .306.007.371.02.066.013.13.007.196-.02a.295.295 0 0 0 .097-.117c.04-.052.091-.065.157-.039.065-.13.097-.221.097-.273 0-.065.013-.117.04-.156a.133.133 0 0 0-.04-.098.278.278 0 0 1-.039-.156.452.452 0 0 1-.097-.196.189.189 0 0 0-.078-.097c-.027-.026-.04-.072-.04-.137a.637.637 0 0 0-.097-.078.19.19 0 0 1-.078-.117 3.914 3.914 0 0 1-.215-.078.304.304 0 0 1-.157-.157c-.156-.078-.234-.13-.234-.156a1.471 1.471 0 0 1-.254-.059.173.173 0 0 0-.078-.019.18.18 0 0 0-.117 0c-.026.013-.065.013-.117 0-.144-.013-.228-.013-.254 0h-.098a.243.243 0 0 1-.136 0 .367.367 0 0 0-.118-.02c-.039.014-.09.027-.156.04a.643.643 0 0 0-.156.019 2.039 2.039 0 0 1-.235.078c-.195.078-.312.13-.351.156l-.078.079a.976.976 0 0 0-.098.058c-.13.065-.195.11-.195.137l-.235.156a1.224 1.224 0 0 0-.254.293.777.777 0 0 1-.097.117.307.307 0 0 0-.059.078.635.635 0 0 1-.117.235c-.026.026-.046.078-.059.156a.694.694 0 0 1-.058.176c.026.039.032.09.02.156l-.04.156c.013.117.02.19.02.215 0 .013-.013.033-.04.059a.65.65 0 0 1 .04.312.289.289 0 0 0 .078.254c.026.143.059.222.098.235.039.156.071.24.097.253.026.013.046.046.059.098a.447.447 0 0 1 .137.254c.09.091.13.143.117.156l.02.02c.025.039.058.078.097.117a.247.247 0 0 1 .117.137c.143.104.248.169.313.195a.232.232 0 0 1 .156.117.95.95 0 0 1 .215.078c.026.013.058.013.097 0 .183.065.306.104.371.117.079.013.15.033.215.06a.689.689 0 0 0 .313.038.454.454 0 0 1 .234.02.35.35 0 0 1 .176-.059c.052-.013.117-.032.195-.059.117-.065.209-.104.274-.117.078-.013.123-.052.137-.117a.755.755 0 0 0 .253-.45.269.269 0 0 0 .137-.058c.026-.026.065-.039.117-.039.13-.039.222-.052.274-.039a.297.297 0 0 1 .156.078.318.318 0 0 1 0 .157c0 .039.006.078.02.117a.642.642 0 0 0-.079.097.455.455 0 0 1-.117.079 1.83 1.83 0 0 0-.215.234 1.3 1.3 0 0 1-.195.195l-.078.04c-.104.103-.176.168-.215.195a2.133 2.133 0 0 1-.137.058c-.195.104-.319.15-.37.137l-.118.078zM68.203 9.398a.53.53 0 0 0-.078.176c.013.013.013.04 0 .078 0 .04-.013.085-.04.137a.606.606 0 0 1-.038.117c0 .04.006.085.02.137.012.039.019.078.019.117-.04.117-.065.195-.078.235 0 .039.006.071.02.097.012.143.012.228 0 .254-.014.013 0 .033.038.059-.039.143-.058.247-.058.312a.772.772 0 0 1 .039.098.607.607 0 0 1 .039.117.433.433 0 0 1-.02.137c-.013.026-.013.058 0 .097.066.144.085.215.059.215-.026-.013-.046-.006-.059.02a.595.595 0 0 1 0 .215c-.013.065 0 .13.04.195a.485.485 0 0 0 0 .273c.038.079.045.17.019.274.04.065.059.143.059.234 0 .091.02.17.058.235a3.68 3.68 0 0 1 .156-.293.434.434 0 0 0 .04-.196.455.455 0 0 0 .078-.117c.026-.052.026-.098 0-.137.065-.052.104-.136.117-.254.026-.117.078-.195.156-.234 0-.117.033-.195.098-.234-.013-.052-.007-.091.02-.117a.64.64 0 0 0 .077-.098.133.133 0 0 0 .04-.098.437.437 0 0 1 .058-.136c.013-.04.046-.111.098-.215a.772.772 0 0 1 .097-.118.316.316 0 0 0 .079-.175.51.51 0 0 0 .234-.235.525.525 0 0 1 .215-.254c.078-.065.117-.13.117-.195.065.013.11-.006.137-.059a.387.387 0 0 1 .136-.117c.118-.039.19-.058.215-.058a.19.19 0 0 0 .098-.04l.195-.019c.013-.013.026-.02.04-.02.286-.025.514-.025.683 0 .13.04.221.06.273.06l.157.155.156.176c.078.091.117.156.117.196a.305.305 0 0 0 .058.078.164.164 0 0 0-.019.136.436.436 0 0 1 .059.137c.078.221.11.378.097.469-.013.091-.02.189-.02.293a.37.37 0 0 1 .02.117c0 .04.007.085.02.137.026.156.026.24 0 .254-.026.013-.033.039-.02.078 0 .065.007.143.02.234.026.091.02.15-.02.176-.026.143-.032.221-.02.234.014 0 .014.013 0 .04-.038.169-.077.292-.117.37-.026.144-.032.228-.019.254.013.013.02.033.02.059a.868.868 0 0 0-.079.215c.013.013.013.032 0 .058-.065.196-.09.326-.078.391.013.052-.006.104-.058.156.039.078.045.176.02.293a2.514 2.514 0 0 1-.06.332c.014.052.02.104.02.156a.164.164 0 0 1-.02.137c.04.091.053.15.04.176-.013.013-.013.033 0 .059.013.065.032.13.058.195a.166.166 0 0 1 0 .156l.196.195c.09.026.156.02.195-.02a.211.211 0 0 1 .156-.058c.143-.09.234-.117.274-.078.052.04.117.072.195.098a.782.782 0 0 1-.02.215c0 .039-.013.084-.039.136-.052.105-.11.163-.175.176a.34.34 0 0 0-.176.098.338.338 0 0 0-.196.02.517.517 0 0 1-.254.019.21.21 0 0 1-.117-.04c-.026-.025-.065-.032-.117-.019-.143-.065-.234-.123-.273-.175a.496.496 0 0 0-.118-.118 3.337 3.337 0 0 1-.136-.293.132.132 0 0 0-.04-.097.206.206 0 0 0 0-.176 3.957 3.957 0 0 1-.038-.176.76.76 0 0 1-.04-.098c0-.039-.019-.071-.058-.097.04-.04.052-.078.04-.117a.311.311 0 0 1 0-.157.566.566 0 0 0 0-.214.45.45 0 0 1 .038-.157c.052-.143.072-.24.059-.293a.243.243 0 0 1 0-.136v-.176l.039-.195.078-.254a.881.881 0 0 1 .039-.215.313.313 0 0 0 0-.156c.039-.13.065-.222.078-.274.013-.052.033-.11.059-.176.013-.143.026-.221.039-.234.013-.013.02-.033.02-.059v-.254c.012-.052.025-.097.038-.136a2.957 2.957 0 0 1-.02-.215.173.173 0 0 0 .02-.078.92.92 0 0 1 0-.274c.013-.052 0-.11-.039-.175.013-.092.007-.144-.02-.157a.647.647 0 0 1-.077-.097c.013-.183 0-.3-.04-.352a.488.488 0 0 1-.058-.254.492.492 0 0 0-.117-.058c-.026-.013-.04-.052-.04-.118-.13-.013-.208-.013-.234 0-.026 0-.045-.013-.058-.039-.04.026-.091.033-.156.02-.066-.013-.111 0-.137.039-.104-.026-.17-.026-.195 0a.128.128 0 0 1-.06.059 1.151 1.151 0 0 1-.253.097c-.013 0-.033.013-.059.04-.104.103-.156.162-.156.175a1.366 1.366 0 0 0-.195.195.347.347 0 0 1-.098.098.463.463 0 0 0-.176.352.57.57 0 0 0-.175.351.255.255 0 0 0-.118.117 3 3 0 0 1-.058.157 2.447 2.447 0 0 1-.235.488 2.708 2.708 0 0 0-.078.312 1.06 1.06 0 0 1-.058.137.321.321 0 0 0-.02.098 1.719 1.719 0 0 1-.039.293.94.94 0 0 1-.059.097.667.667 0 0 1-.019.215c0 .013-.013.033-.04.059.014.104.014.17 0 .195-.012.013-.019.046-.019.098-.026.117-.039.208-.039.273a.433.433 0 0 1-.02.137c-.012.143-.012.24 0 .293.014.039.02.078.02.117-.013.156-.02.248-.02.274 0 .012.014.032.04.058a.817.817 0 0 0-.02.137v.117c.04.3.098.488.176.566a.449.449 0 0 0-.039.137.313.313 0 0 1 0 .156 1.653 1.653 0 0 0-.195.118c-.013.026-.046.026-.098 0-.039.065-.078.09-.117.078-.04 0-.078-.02-.117-.059a.813.813 0 0 1-.118-.156 1.082 1.082 0 0 1-.058-.137c.039-.065.039-.124 0-.176a.207.207 0 0 1 0-.175c-.04-.144-.052-.222-.04-.235.014-.013.014-.032 0-.058a.774.774 0 0 0-.038-.098v-.117c-.026-.143-.046-.222-.059-.235a.23.23 0 0 1-.039-.058 3.082 3.082 0 0 1-.039-.313.132.132 0 0 0-.039-.097c.04-.066.052-.118.04-.157a.687.687 0 0 1-.02-.195c-.04-.156-.072-.3-.098-.43-.052-.143-.072-.214-.059-.214a.747.747 0 0 1-.058-.235c.013-.052 0-.11-.04-.176.027-.065.027-.117 0-.156l-.038-.117c0-.143-.007-.228-.02-.254a.366.366 0 0 1-.02-.117c0-.156-.006-.241-.019-.254v-.078c.013-.235.013-.365 0-.39a.243.243 0 0 1 0-.138.17.17 0 0 0-.02-.175.437.437 0 0 0-.039-.274c0-.065.007-.136.02-.215a.454.454 0 0 0-.02-.234.764.764 0 0 0 .059-.156c.013-.065.007-.11-.02-.137 0-.234.013-.443.04-.625.039-.13.039-.189 0-.176-.04 0-.046-.02-.02-.058-.208 0-.43-.04-.664-.117a2.486 2.486 0 0 1-.273-.137.4.4 0 0 0 0-.176c0-.052.013-.104.039-.156a.433.433 0 0 1 .254-.137.849.849 0 0 0 .175.117.15.15 0 0 1 .059.02c.065.039.11.058.137.058a.083.083 0 0 1 .078 0c.13.04.208.052.234.04a.19.19 0 0 1 .098-.04c0-.052.006-.097.02-.136l.038-.157c.04-.09.052-.143.04-.156V8.52c.038-.144.052-.228.038-.254 0-.026.007-.052.02-.079.026-.169.045-.26.059-.273a.128.128 0 0 0 .058-.059c.052-.195.078-.325.078-.39a.44.44 0 0 1 .078-.195.683.683 0 0 1 .098-.254.29.29 0 0 0 .078-.215l.117-.235a.49.49 0 0 1 .059-.117c.078-.117.117-.189.117-.215a.19.19 0 0 1 .04-.097c.051-.117.09-.202.116-.254.078-.104.118-.176.118-.215.013-.052.032-.11.058-.176.026-.052.059-.104.098-.156a.34.34 0 0 0 .097-.176c.092-.13.157-.202.196-.215.052-.026.084-.078.098-.156.052 0 .084-.02.097-.059a.35.35 0 0 1 .098-.097c.156-.104.24-.176.254-.215a.217.217 0 0 0 .097-.02A.637.637 0 0 0 70 4.32c.17-.065.254-.09.254-.078a2.28 2.28 0 0 0 .215-.117.347.347 0 0 1 .156-.04c.117 0 .189-.012.215-.038.143.026.234.039.273.039.052 0 .091.006.118.02l.214.097c.118.078.183.124.196.137.117.091.175.143.175.156h.02c.091.13.15.228.176.293-.013.156-.013.254 0 .293.013.04.02.072.02.098-.027.169-.053.319-.079.449a.37.37 0 0 1-.156.273c0 .105-.04.196-.117.274a.683.683 0 0 1-.176.39.729.729 0 0 0-.176.313.236.236 0 0 0-.137.137 1.02 1.02 0 0 1-.097.156c-.091.117-.15.176-.176.176a1.2 1.2 0 0 1-.098.156c-.013 0-.013.013 0 .039l-.117.078c-.026.013-.046.052-.059.117a.263.263 0 0 0-.175.098.355.355 0 0 1-.156.117 3.372 3.372 0 0 1-.274.332.701.701 0 0 1-.254.156c-.078.105-.123.157-.137.157-.013 0-.032.013-.058.039-.117.078-.176.123-.176.136l-.02.02c-.117.039-.175.065-.175.078 0 .013-.007.02-.02.02l-.136.136c-.014.013-.02.033-.02.059-.13.052-.202.078-.215.078-.013 0-.026.007-.039.02a7.889 7.889 0 0 0-.215.097c-.143.052-.228.091-.254.117-.013.013-.052.013-.117 0zm.606-.78l.195-.098a.128.128 0 0 0 .058-.06c.144-.09.222-.142.235-.155.052 0 .091-.013.117-.04a.953.953 0 0 1 .098-.058c.13-.143.201-.228.215-.254.156-.117.227-.176.214-.176l.293-.293c.066-.065.118-.13.157-.195.065-.039.104-.072.117-.098l.039-.078a.601.601 0 0 0 .195-.215c.117-.156.195-.266.235-.332a.673.673 0 0 1 .175-.214 3.9 3.9 0 0 1 .098-.254l.078-.078c0-.066.013-.118.04-.157.025-.052.051-.097.077-.136 0-.079.007-.144.02-.196a.437.437 0 0 1 .058-.136.278.278 0 0 1-.039-.157c0-.065.013-.117.04-.156-.079-.104-.118-.176-.118-.215a.133.133 0 0 0-.039-.097.52.52 0 0 1-.136-.098.64.64 0 0 0-.079-.098 1.859 1.859 0 0 1-.312-.039 1.864 1.864 0 0 1-.137.04.217.217 0 0 0-.097.019 1.28 1.28 0 0 0-.137.078c-.026.013-.072.013-.137 0a.19.19 0 0 1-.078.117.306.306 0 0 0-.078.059.583.583 0 0 0-.293.156.968.968 0 0 0-.176.254c-.117.221-.221.37-.313.449a.55.55 0 0 0-.175.332c-.104.078-.176.221-.215.43a.772.772 0 0 0-.04.097.37.37 0 0 0-.019.118l-.117.156a.695.695 0 0 0-.059.195c-.09.143-.136.241-.136.293 0 .04-.013.085-.04.137a.532.532 0 0 0-.077.176.15.15 0 0 1-.02.058.737.737 0 0 0-.078.254c0 .04-.007.091-.02.156a3.93 3.93 0 0 1-.097.254l-.04.078a.92.92 0 0 1 0 .274c0 .052.014.104.04.156a.517.517 0 0 0 .293-.078c.078-.052.15-.11.215-.176zM74.57 1.762c.026.169.052.286.078.351a.692.692 0 0 1 .059.196.247.247 0 0 1 .059.117.35.35 0 0 0 .097.097c-.039.053-.045.098-.02.137.04.026.046.052.02.078.052.17.072.267.059.293a.76.76 0 0 0 .039.098.244.244 0 0 1 .058.098c0 .156.007.253.02.293.026.039.065.071.117.097v.176c.013.039.026.091.04.156.038.104.051.163.038.176-.013 0-.013.02 0 .059a.932.932 0 0 1 .059.253c.013.04.032.072.059.098.026.17.039.28.039.332.013.04.032.072.058.098.026.039.04.11.04.215 0 .104.012.175.038.215a.509.509 0 0 0-.02.156c.014.065.007.117-.019.156a.95.95 0 0 0 .078.215c.013.013.007.032-.02.058.027.027.04.066.04.118a.9.9 0 0 0 .02.175c.038.144.052.222.038.235v.02c-.013.025-.006.104.02.234 0 .078.007.156.02.234.026.078.032.15.02.215-.014.26 0 .443.038.547.013.208.026.351.04.43.012.078.019.156.019.234 0 .117-.007.202-.02.254 0 .052.013.097.04.136 0 .157-.007.274-.02.352 0 .065.013.143.039.234a.133.133 0 0 0-.04.098v.137c-.025.156-.032.234-.019.234.013 0 .02.007.02.02-.026.104-.04.175-.04.215.014.09.014.143 0 .156v.058a.39.39 0 0 1 0 .176c0 .026.014.072.04.137a.586.586 0 0 0-.098.312c-.026.026-.032.059-.02.098.014.04.02.078.02.117l-.078.469c-.026.143-.052.293-.078.45 0 .168-.007.305-.02.41l-.039.253c.013.157.007.254-.02.293-.012.04-.025.091-.038.156a.442.442 0 0 1-.157.157.183.183 0 0 0-.097.136c-.104.04-.183.027-.235-.039a.66.66 0 0 0-.156-.175v-.254a.24.24 0 0 1 .098-.196.977.977 0 0 1-.02-.117c.013-.026.013-.058 0-.097.052-.014.078-.059.078-.137 0-.078.013-.143.04-.195a.272.272 0 0 0 .019-.118c0-.052.007-.104.02-.156.039-.13.052-.202.039-.215-.013-.026-.013-.065 0-.117 0-.065.006-.143.02-.234.025-.091.045-.176.058-.254v-.215c0-.078.006-.17.02-.274a.788.788 0 0 0 .019-.292c-.013-.105-.013-.17 0-.196a.321.321 0 0 0 .02-.097.218.218 0 0 0-.02-.098v-.117a.37.37 0 0 1 .02-.117c.025-.053.025-.098 0-.137v-.43c.012-.117.019-.234.019-.351 0-.183-.007-.306-.02-.372a1.1 1.1 0 0 0-.02-.214 7.173 7.173 0 0 1-.019-.508c.013-.17.013-.332 0-.488 0-.105-.006-.209-.02-.313a.735.735 0 0 0-.058-.293.4.4 0 0 0 0-.176.692.692 0 0 0-.059-.195.18.18 0 0 0 0-.117c-.013-.052-.006-.091.02-.117a6.987 6.987 0 0 0-.078-.274V5.63l-.04-.195c.014-.013.02-.033.02-.059a1.182 1.182 0 0 1-.039-.156c.013-.013.02-.033.02-.059-.065-.13-.091-.208-.078-.234.013-.04.006-.072-.02-.098l-.058-.195c.013-.013.006-.02-.02-.02a.418.418 0 0 0-.02-.215 1.288 1.288 0 0 0-.078-.214c0-.144-.013-.215-.039-.215a14.406 14.406 0 0 1-.039-.04 2.917 2.917 0 0 1-.058-.292.394.394 0 0 0-.078-.254c.013-.13 0-.241-.04-.332a2.881 2.881 0 0 0-.097-.313 1.293 1.293 0 0 0-.098-.234.174.174 0 0 1-.02-.078.318.318 0 0 1-.156-.137.45.45 0 0 1-.039-.156.452.452 0 0 1 .079-.117c.039-.026.058-.072.058-.137.13-.078.195-.13.195-.156a.164.164 0 0 1 .137.02c.04.012.078.019.117.019zm.743 13.36c.025.038.045.084.058.136.026.039.046.084.059.137.039.09.052.156.039.195a.434.434 0 0 0-.02.137l-.195.195c-.117.091-.215.15-.293.176a.866.866 0 0 1-.273.039.21.21 0 0 1-.118-.04.098.098 0 0 0-.117 0 .978.978 0 0 1-.293-.312.791.791 0 0 1 .04-.37c.051-.092.103-.19.156-.294.065.013.11.007.136-.02a.244.244 0 0 1 .098-.058c.091.052.17.046.234-.02h.157a.243.243 0 0 1 .136 0 .738.738 0 0 0 .156.079c.013-.014.026-.007.04.02z"/></svg>',
  sdacha: '<svg viewBox="0 0 79 18"><path d="M5.508 7.914c-.013.17-.02.293-.02.371.013.078.04.137.078.176 0 .17.013.3.04.39.039.079.045.15.019.215.065.105.091.163.078.176-.013 0-.02.013-.02.04.04.064.06.13.06.195a.34.34 0 0 0 .097.175c.013.196.032.313.058.352-.026.104-.032.176-.02.215.014.039.027.071.04.097 0 .118.013.202.039.254.013.04.02.078.02.117 0 .04.006.079.02.118.038.143.051.221.038.234v.02a.39.39 0 0 1 0 .175.19.19 0 0 0 .04.098c.012.026.019.065.019.117.013.052.02.091.02.117a.4.4 0 0 1 0 .176.84.84 0 0 0-.02.156v.41a.957.957 0 0 1 0 .274c-.013.091-.02.143-.02.156a.15.15 0 0 0 .02.059c-.026.104-.04.17-.04.195a.15.15 0 0 0 .02.059.82.82 0 0 0-.078.37c0 .183-.013.313-.039.392-.013.065-.02.136-.02.214a.906.906 0 0 1-.117.196c-.026.013-.039.026-.039.039-.026.13-.045.208-.058.234-.013.013-.02.04-.02.078a1.148 1.148 0 0 0-.098.254c.013.026.02.052.02.078a.256.256 0 0 0-.117.117.247.247 0 0 1-.137.118l-.078.156a.227.227 0 0 1-.059.039 20.6 20.6 0 0 1-.175.273c-.013.026-.013.066 0 .118a.255.255 0 0 0-.118.117.492.492 0 0 1-.058.117c-.117.039-.176.065-.176.078 0 .013-.006.026-.02.04a2.97 2.97 0 0 0-.449.214.926.926 0 0 1-.254.137.446.446 0 0 1-.254.097 1.322 1.322 0 0 0-.214.059c-.026.026-.052.039-.079.039l-.312.04c-.156.051-.247.07-.273.058-.013-.013-.033-.02-.059-.02-.17.026-.26.033-.273.02a.43.43 0 0 1-.176-.078.278.278 0 0 0-.156-.04c-.196-.078-.313-.169-.352-.273a1.664 1.664 0 0 1-.234-.156c-.026-.013-.033-.04-.02-.078-.078 0-.13-.026-.156-.078a.295.295 0 0 0-.117-.098c.013-.065 0-.098-.04-.098-.039-.013-.058-.052-.058-.117a.972.972 0 0 0-.137-.098l-.078-.078c-.078-.182-.104-.293-.078-.332.026-.039.033-.09.02-.156.065-.065.13-.085.195-.059.078.026.17.026.273 0 .183-.026.274.02.274.137 0 .104-.033.176-.098.215.104.208.202.325.293.351.091.105.15.17.176.196a.757.757 0 0 0 .097.039c.118.065.176.11.176.137.065.013.104.026.117.039a.956.956 0 0 1 .098.058c.104.04.24.052.41.04a.37.37 0 0 1 .117-.02c.04 0 .072-.007.098-.02a.19.19 0 0 1 .098-.039.37.37 0 0 0 .117-.02c.078-.025.15-.051.215-.078a.775.775 0 0 0 .195-.117c.117-.013.182-.026.195-.039l.079-.078c.117 0 .182-.013.195-.039a.228.228 0 0 1 .039-.059c.091-.117.143-.169.156-.156.013 0 .02-.006.02-.02.078-.051.123-.097.136-.136a.131.131 0 0 1 .118-.059l.078-.195a.236.236 0 0 1 .136-.137c0-.039.007-.071.02-.097a.491.491 0 0 0 .059-.117.755.755 0 0 1 .078-.215c.039-.104.065-.183.078-.235a.388.388 0 0 1 .117-.136c.013-.066.02-.137.02-.215a.315.315 0 0 1 .078-.176c.052-.182.078-.28.078-.293a.435.435 0 0 0 .039-.195v-.254c.013-.078.02-.156.02-.235a.394.394 0 0 0-.02-.214c.039-.13.052-.209.039-.235a56.824 56.824 0 0 0-.04-.078.649.649 0 0 0 .06-.254 1.62 1.62 0 0 1-.04-.176.083.083 0 0 0 0-.078c-.026-.09-.032-.143-.02-.156.014-.013.014-.033 0-.059a.21.21 0 0 0-.038-.117.642.642 0 0 1-.02-.156v-.117a.313.313 0 0 0 0-.156 1.377 1.377 0 0 1-.078-.293c.013-.04.013-.072 0-.098-.039-.182-.065-.3-.078-.352a.522.522 0 0 0-.04-.195 2.294 2.294 0 0 0-.077-.45.24.24 0 0 0-.04-.136c0-.156-.006-.234-.019-.234s-.02-.007-.02-.02a1.133 1.133 0 0 1-.058-.293l-.059-.273c-.039-.104-.052-.163-.039-.176.013-.026.013-.059 0-.098-.039-.065-.058-.11-.058-.136.013-.04.006-.065-.02-.079a.639.639 0 0 0-.058-.37.424.424 0 0 1-.04-.313c-.038-.17-.071-.254-.097-.254a.227.227 0 0 0-.059-.04c.026-.194.013-.318-.039-.37a.21.21 0 0 1-.02-.195.948.948 0 0 1-.116-.293 1.042 1.042 0 0 0-.079-.235V6.06c.013-.092.013-.15 0-.176l-.039-.117v-.137a.574.574 0 0 0 .02-.137.523.523 0 0 1-.02-.234.164.164 0 0 0-.02-.137c-.051 0-.09.013-.116.04a.605.605 0 0 1-.117.038.248.248 0 0 1-.06.117c-.025.026-.038.072-.038.137a.64.64 0 0 1-.098.078c-.026.013-.032.052-.02.117a.286.286 0 0 0-.136.098l-.078.078a.794.794 0 0 0-.176.196.247.247 0 0 0-.137.117c-.026.039-.058.09-.097.156a1.165 1.165 0 0 1-.176.215.659.659 0 0 0-.117.176c0 .026-.02.045-.059.058a2.79 2.79 0 0 1-.078.196.306.306 0 0 1-.059.078c.013.065-.006.13-.058.195-.04.052-.078.098-.117.137-.105.143-.19.228-.254.254a.541.541 0 0 1-.254.332c-.026.156-.065.26-.117.312a.369.369 0 0 0-.02.117c0 .04-.006.072-.02.098-.09.13-.143.215-.156.254 0 .039-.02.071-.058.098-.013.143-.033.22-.059.234-.013 0-.02.013-.02.039-.038.104-.052.163-.038.176.013.013.019.026.019.039a.685.685 0 0 0-.078.195c.013.026.006.052-.02.078-.013.143-.02.235-.02.274.014.026.014.058 0 .097-.051.091-.07.15-.058.176.026.013.026.033 0 .059.013.09.02.175.02.254a.684.684 0 0 0-.04.214.243.243 0 0 0 0 .137.21.21 0 0 1 .04.117c-.04.144-.059.228-.059.254.026.13.033.202.02.215v.02c0 .156-.007.254-.02.293a.18.18 0 0 0 0 .117c0 .026.013.071.04.136.025.053.038.098.038.137a.822.822 0 0 1-.02.137c0 .065.014.117.04.156.026.143.045.228.058.254a.226.226 0 0 1 .04.059c.052.156.104.254.156.293a.24.24 0 0 1 .117.175.462.462 0 0 1 .176.059.43.43 0 0 0 .136.02c.183-.118.352-.209.508-.274.078-.13.13-.215.156-.254.04-.039.053-.104.04-.195.078-.195.123-.3.136-.313.026-.143.033-.26.02-.351a1.102 1.102 0 0 1 0-.293c.013-.078.02-.156.02-.235a.26.26 0 0 0-.098-.214.604.604 0 0 1 .039-.118.436.436 0 0 0 .058-.156c.065.013.111-.006.137-.058.04-.053.085-.072.137-.059.104.078.169.117.195.117.04 0 .065.02.078.059.026.091.033.15.02.176v.078a1.097 1.097 0 0 1-.04.254v.058a.788.788 0 0 1-.019.293 3.383 3.383 0 0 1-.039.274 2.13 2.13 0 0 0-.039.449l-.078.293a.835.835 0 0 1-.137.254.248.248 0 0 0-.058.117.493.493 0 0 1-.059.117.575.575 0 0 1-.176.137.307.307 0 0 0-.078.058c-.065-.026-.11-.013-.137.04a.295.295 0 0 1-.117.097.928.928 0 0 1-.254.059c-.052.026-.162.039-.332.039a.39.39 0 0 0-.176 0 .32.32 0 0 1-.097-.02c-.13-.039-.202-.071-.215-.097a.245.245 0 0 0-.059-.098c-.09-.117-.15-.17-.175-.156-.013 0-.026-.007-.04-.02a.791.791 0 0 0-.195-.312 3.255 3.255 0 0 0-.117-.293.43.43 0 0 0-.078-.176c.026-.091.032-.143.02-.156-.014-.013-.02-.033-.02-.059a.474.474 0 0 0 0-.195c0-.04.013-.072.039-.098a.953.953 0 0 1-.059-.098.432.432 0 0 1-.02-.136c0-.04.007-.072.02-.098.013-.026.007-.065-.02-.117 0-.13-.006-.202-.019-.215v-.059l.04-.253-.02-.215c0-.026.006-.065.02-.117a.534.534 0 0 0 .019-.118.708.708 0 0 1 0-.234l.058-.176c.027-.065.033-.182.02-.351-.013-.183.02-.306.098-.371.026-.105.039-.19.039-.254 0-.079.006-.15.02-.215a1.63 1.63 0 0 1 .116-.215c.053-.065.079-.11.079-.137a.321.321 0 0 0 .02-.097.471.471 0 0 0 .058-.157.369.369 0 0 0 .02-.117c.077-.182.136-.293.175-.332a.35.35 0 0 0 .059-.215c.117-.117.188-.208.214-.273a.236.236 0 0 1 .137-.137c.04-.117.065-.176.078-.176a.306.306 0 0 0 .078-.058c.066-.091.098-.15.098-.176a.757.757 0 0 1 .04-.098.606.606 0 0 0 .175-.215l.098-.195a3.2 3.2 0 0 1 .195-.254.297.297 0 0 0 .078-.156.306.306 0 0 0 .078-.059.64.64 0 0 0 .098-.078c.052-.104.104-.169.156-.195a.49.49 0 0 1 .117-.195.35.35 0 0 0 .098-.196c.117-.065.176-.11.176-.136.013-.026.039-.033.078-.02 0-.065.02-.104.058-.117a.183.183 0 0 0 .098-.137c.117-.091.182-.143.195-.156l.079-.078c.09-.065.143-.104.156-.117a.64.64 0 0 1 .097-.079.64.64 0 0 0 .04-.156c0-.026.006-.045.019-.058a.83.83 0 0 0 .02-.293v-.157l.039-.156c.013-.052.026-.11.039-.176.052-.169.078-.26.078-.273.013-.156.032-.247.058-.274a.136.136 0 0 0 .04-.136.297.297 0 0 0 .078-.156.25.25 0 0 1 .097-.157c.013-.117.026-.195.04-.234a.434.434 0 0 0 .058-.137.412.412 0 0 0 .137-.195.577.577 0 0 1 .156-.195.389.389 0 0 0 .098-.254.245.245 0 0 1 .097-.059.248.248 0 0 0 .117-.059c.118-.09.183-.136.196-.136a.173.173 0 0 0 .078-.02.436.436 0 0 1 .156-.058.445.445 0 0 0 .176-.098c.13-.04.24-.046.332-.02.091.013.17.013.234 0l.117.079c.04.013.092.02.157.02.117.103.182.175.195.214a.306.306 0 0 1 .059.078c.065.208.058.43-.02.664-.065.13-.124.228-.176.293a.765.765 0 0 0-.097.176.672.672 0 0 0-.235.234c-.078.117-.143.183-.195.196 0 .065-.02.11-.059.136-.039.026-.065.072-.078.137a1.171 1.171 0 0 0-.195.098 2.125 2.125 0 0 1-.117.156c-.013.013-.02.032-.02.058-.091.013-.15.072-.176.176-.13.091-.221.163-.273.215a.256.256 0 0 0-.117.117c-.026.04-.078.065-.157.078a.49.49 0 0 1-.117.196c-.09.065-.15.11-.175.136a.227.227 0 0 1-.06.04c-.012.065-.032.13-.058.195a.822.822 0 0 0-.02.195c0 .182-.006.32-.019.41-.013.091 0 .17.04.235-.04.117-.053.182-.04.195.026 0 .046.013.059.039a.594.594 0 0 1 0 .215c0 .065.006.137.02.215.025.104.045.176.058.215.013.039.033.09.059.156.039.104.052.182.039.234 0 .04.013.085.039.137.039.065.065.117.078.156.013.04.026.072.039.098a.48.48 0 0 1 .02.234c0 .065.025.124.078.176 0 .052.006.098.02.137.012.026.012.065 0 .117l.136.117zm-.313-4.297c.209-.182.352-.312.43-.39l.234-.274.079-.078.078-.117.175-.117a.186.186 0 0 0 .079-.157.521.521 0 0 0 .136-.097.316.316 0 0 0 .078-.176.175.175 0 0 0 .098-.117.269.269 0 0 1 .059-.137c.065-.143.09-.234.078-.273.013-.079.013-.13 0-.157a.306.306 0 0 0-.059-.078.45.45 0 0 1-.156-.039c-.065-.026-.117-.006-.156.059a.508.508 0 0 0-.157.02.217.217 0 0 0-.097.019 1.356 1.356 0 0 0-.293.176.521.521 0 0 1-.137.097.297.297 0 0 1-.078.157c-.04.039-.052.09-.04.156-.103.117-.162.202-.175.254a.245.245 0 0 1-.059.097.882.882 0 0 1-.078.118c-.039.039-.045.065-.02.078.014.013 0 .052-.038.117-.026.052-.026.084 0 .097-.065.13-.098.215-.098.254 0 .04-.006.072-.02.098a.685.685 0 0 0-.078.195c.013.026.02.059.02.098a.53.53 0 0 0-.078.176c.013.026.02.052.02.078.065.013.11 0 .136-.04a.295.295 0 0 1 .117-.097zM10.117 7.113c-.026.157-.058.254-.098.293-.039.04-.052.11-.039.215-.104.13-.156.215-.156.254a.083.083 0 0 1 0 .078.842.842 0 0 1-.136.234c0 .092-.014.144-.04.157a.227.227 0 0 0-.039.058 5.926 5.926 0 0 0-.078.371 1.757 1.757 0 0 0 0 .372.523.523 0 0 0 .235.02.994.994 0 0 1 .195-.02c.221-.013.358-.013.41 0 .117.013.195.02.234.02a.117.117 0 0 0 .079-.08c.013.027.052.047.117.06.065 0 .11-.013.136-.04.066.066.124.111.176.137.052.182.046.287-.02.313a.523.523 0 0 0-.136.097c-.234.078-.371.078-.41 0a6.928 6.928 0 0 0-.371-.058.974.974 0 0 0-.371.039 5.586 5.586 0 0 0-.293.039c-.078 0-.137.02-.176.058 0 .079-.013.15-.04.215a.284.284 0 0 0 .02.176 7.668 7.668 0 0 1-.097.215v.137a.605.605 0 0 0-.04.117c0 .039-.019.072-.058.098a.38.38 0 0 1 0 .292c.052.118.059.176.02.176-.026-.013-.04 0-.04.04.014.051.02.09.02.117 0 .025.007.071.02.136 0 .156-.007.267-.02.332a.726.726 0 0 0-.02.176.771.771 0 0 1 0 .254v.352c.014.09.027.162.04.214a.37.37 0 0 1 .02.118.18.18 0 0 1 0 .117v.117l.038.156a.864.864 0 0 1 .078.156.322.322 0 0 1-.02.098c-.012.04-.006.085.02.137.065.182.091.3.078.351 0 .04.013.091.04.157a.615.615 0 0 1 .078.214c0 .04.006.079.02.118l.077.195c.04.052.072.104.098.156a.315.315 0 0 0 .02.195l.117.157c.117.13.169.195.156.195a.576.576 0 0 0 .176.137c.039.013.058.052.058.117.13.039.248.098.352.176.065-.052.117-.072.156-.059.04.013.072.033.098.059l.078.078a.605.605 0 0 0 .117.039v.137c.013.052.04.078.078.078-.13.09-.215.13-.254.117h-.058c-.117.143-.202.202-.254.176a.267.267 0 0 0-.176-.02c-.078-.09-.137-.143-.176-.156-.026-.013-.045-.04-.058-.078-.183-.13-.326-.195-.43-.195a3.22 3.22 0 0 0-.273-.254 1.458 1.458 0 0 1-.157-.137c0-.13-.013-.195-.039-.195a.307.307 0 0 1-.078-.059.9.9 0 0 1-.078-.313.26.26 0 0 0-.098-.214c.013-.091 0-.157-.039-.196a.458.458 0 0 1-.097-.156.4.4 0 0 1 0-.176.285.285 0 0 0-.02-.175 1.38 1.38 0 0 0-.098-.254c-.013-.013-.02-.026-.02-.04a.307.307 0 0 0-.038-.214.361.361 0 0 1 0-.235 2.688 2.688 0 0 1-.078-.312 1.314 1.314 0 0 1-.02-.215v-.098a.368.368 0 0 0 .02-.117 4.375 4.375 0 0 1-.04-.234v-.293-.117c.014-.04.027-.085.04-.137.013-.143.013-.221 0-.234v-.04-.136a.605.605 0 0 1 .039-.117.307.307 0 0 1-.04-.215.737.737 0 0 0 .04-.235v-.136a.272.272 0 0 0-.02-.118.485.485 0 0 0-.02-.175c0-.026.014-.052.04-.079.039-.156.052-.234.039-.234v-.02c0-.038.006-.09.02-.156a.356.356 0 0 0 .019-.195.486.486 0 0 0-.215.059c-.078.039-.143.032-.195-.02a.245.245 0 0 1-.098.059.574.574 0 0 0-.137.02c-.13.038-.234.07-.312.097a.6.6 0 0 1-.254-.02 1.747 1.747 0 0 0-.176-.234c-.026-.052-.026-.117 0-.195a.573.573 0 0 1 .215-.04c.091-.012.156-.045.195-.097.065.013.13.02.196.02.065-.014.143-.027.234-.04.026-.052.085-.071.176-.058a.548.548 0 0 0 .254-.02c.169-.078.26-.136.273-.175.013-.053.033-.118.059-.196.039-.104.052-.163.039-.176-.013-.026-.013-.058 0-.097a.88.88 0 0 0 .039-.176c.013-.04.006-.065-.02-.078.078-.104.111-.163.098-.176v-.059c.065-.09.098-.15.098-.175 0-.04.02-.065.058-.078-.013-.092 0-.157.04-.196a.908.908 0 0 0 .136-.176c.013-.117.033-.24.059-.37.104-.144.162-.215.175-.215.026 0 .052-.013.079-.04a.605.605 0 0 0 .175-.058.173.173 0 0 1 .078-.02c.052.079.079.137.079.176.013.026.045.052.097.078zM12.793 7.367l-.117.078a.245.245 0 0 0-.098.059.277.277 0 0 0-.156.039c-.026.013-.065.013-.117 0-.143-.104-.228-.182-.254-.234.026-.052.032-.098.02-.137a.18.18 0 0 1 0-.117c.13-.065.201-.111.214-.137a.131.131 0 0 1 .117-.059.164.164 0 0 1 .02-.136.437.437 0 0 0 .058-.137.71.71 0 0 0 0-.234.307.307 0 0 1 .04-.215.241.241 0 0 1-.04-.137l.04-.156c-.066-.065-.13-.072-.196-.02a.777.777 0 0 1-.195.117 1.594 1.594 0 0 1-.274-.039c-.026-.026-.071-.032-.136-.02a3.715 3.715 0 0 1-.215-.35.36.36 0 0 1 0-.235c.091-.143.156-.221.195-.234a.175.175 0 0 0 .117-.098l.352.039c.078.039.124.059.137.059a.173.173 0 0 1 .078-.02c.039.026.078.059.117.098.052.026.11.032.176.02.013.064.071.11.176.136a.48.48 0 0 0 .058.137.227.227 0 0 1 .04.058c.025.156.045.254.058.293a.307.307 0 0 0 .058.078c.013.144.013.228 0 .254v.04c-.026.182-.039.299-.039.35a.397.397 0 0 1 0 .177.646.646 0 0 0-.078.097c-.013.026-.013.072 0 .137a.19.19 0 0 0-.078.117.248.248 0 0 1-.059.117v.118c0 .039-.006.071-.019.097zM14.96 9.516a1.88 1.88 0 0 0-.038.136c0 .052-.026.091-.078.118-.117.22-.156.423-.117.605.052.195.078.319.078.371 0 .04.013.085.039.137.039.039.058.078.058.117.013.04.04.059.079.059 0 .104.039.175.117.214 0 .053.02.092.058.118.04.013.059.052.059.117a.255.255 0 0 1 .117.117c.026.04.072.072.137.098.052.065.09.11.117.136.039.026.072.053.098.079l.175.156.235.234c.039.117.123.222.254.313.143.13.234.214.273.254.04.026.078.065.117.117-.013.117.033.195.137.234a.496.496 0 0 0 .098.254l.195.195c0 .078.02.143.059.196.039.039.078.084.117.136.026.144.045.228.058.254l.059.059a3.163 3.163 0 0 1 .078.703c-.026.117-.032.195-.02.234.014.026.02.052.02.079-.039.195-.085.332-.137.41-.013.039-.032.084-.058.136a.434.434 0 0 0-.02.137c-.17.17-.26.287-.273.352-.182.078-.287.143-.313.195l-.097.098a.636.636 0 0 1-.078.097 1.64 1.64 0 0 0-.215.117c0 .014-.013.014-.04 0-.117.066-.22.111-.312.137-.156.026-.24.046-.254.059-.013.013-.026.02-.039.02a.595.595 0 0 0-.215 0 .207.207 0 0 1-.175 0c-.118-.079-.202-.118-.254-.118a.218.218 0 0 1-.098-.02c-.091-.064-.15-.097-.176-.097a.174.174 0 0 1-.078-.02 1.209 1.209 0 0 0-.195-.195c-.026 0-.046-.006-.059-.02a3.16 3.16 0 0 1-.137-.234.183.183 0 0 0-.136-.098 3.82 3.82 0 0 0-.04-.175.19.19 0 0 0-.078-.117 2.727 2.727 0 0 0-.058-.313c0-.039.006-.085.02-.137v-.312a.284.284 0 0 0-.02-.176c.052-.039.078-.124.078-.254.065 0 .098-.02.098-.058l.039-.157a.97.97 0 0 0 .195-.136l.156-.118c.078-.09.13-.136.157-.136.039 0 .052-.013.039-.04.078.014.13.014.156 0 .039-.012.065-.032.078-.058a.84.84 0 0 0 .215.04.27.27 0 0 0 .137-.06c.026.04.052.06.078.06a.333.333 0 0 1 .136-.02l.215.117c.026 0 .04.013.04.039.064.09.136.176.214.254a.558.558 0 0 1 .195.234.495.495 0 0 1-.117.234c-.039.053-.09.111-.156.176a.494.494 0 0 1-.195 0 2.242 2.242 0 0 0-.215-.039.586.586 0 0 1-.137-.332.535.535 0 0 1-.117-.02c-.04-.025-.098-.032-.176-.019a.518.518 0 0 0-.273.117.595.595 0 0 1-.196.137 4.35 4.35 0 0 0-.078.332.892.892 0 0 0 .04.508.19.19 0 0 1 .038.098.247.247 0 0 0 .098.058c.04.013.052.052.04.117a.524.524 0 0 1 .136.098c.039.039.078.072.117.098.17.065.28.117.332.156a.363.363 0 0 0 .234.078c.183-.04.287-.065.313-.078a.3.3 0 0 0 .117-.04.977.977 0 0 1 .137-.097c.026 0 .052-.013.078-.039.052-.078.085-.117.098-.117a.174.174 0 0 0 .078-.02c.052-.039.09-.071.117-.097a.64.64 0 0 0 .098-.078c0-.053.013-.092.039-.118a.64.64 0 0 0 .078-.097c.065-.104.091-.183.078-.235 0-.052.02-.09.059-.117.013-.156.02-.306.02-.45a.633.633 0 0 0-.118-.39c-.013-.13-.026-.201-.04-.215l-.058-.058a2.198 2.198 0 0 1-.02-.156.173.173 0 0 0-.019-.079 2.848 2.848 0 0 0-.215-.273.428.428 0 0 1-.078-.176c-.065-.09-.104-.136-.117-.136a.228.228 0 0 1-.04-.06 1.192 1.192 0 0 0-.097-.155.228.228 0 0 1-.039-.059c-.065 0-.11-.065-.137-.195-.104-.065-.162-.11-.175-.137-.157-.195-.287-.319-.39-.371a2.135 2.135 0 0 0-.157-.176.739.739 0 0 0-.195-.137c-.013-.09-.053-.15-.118-.175a.263.263 0 0 1-.097-.176 2.469 2.469 0 0 1-.371-.45 2.291 2.291 0 0 0-.215-.35 2.206 2.206 0 0 0-.04-.274 3.82 3.82 0 0 1-.038-.176c0-.13-.007-.202-.02-.215-.013-.013-.02-.032-.02-.059l.02-.234c.013 0 .02-.013.02-.039a1.352 1.352 0 0 0-.04-.156.26.26 0 0 1 .06-.156.74.74 0 0 1 .077-.196c.026-.039.026-.071 0-.097a.64.64 0 0 1 .098-.079c.039-.026.052-.071.039-.136.234-.104.397-.228.488-.371a.864.864 0 0 0 .157-.079.441.441 0 0 1 .195-.078.897.897 0 0 0 .234-.117c.04-.039.072-.045.098-.02.104-.025.17-.038.195-.038.04 0 .072.013.098.039.117.013.176.013.176 0 .013-.026.032-.033.058-.02.17.013.28.033.332.059.065.013.13.02.196.02.026.038.09.07.195.097.104.078.17.137.195.176.026.039.065.071.117.097.052.078.085.124.098.137l.078.04c.052.168.091.266.117.292.04.026.046.046.02.059a.349.349 0 0 1 .098.097l.117.118c-.013.117-.013.182 0 .195.013 0 .02.013.02.039 0 .065-.02.137-.06.215 0 .09-.006.15-.019.176l-.039.078a1.79 1.79 0 0 0-.059.214.25.25 0 0 1-.097.157c-.078.13-.15.215-.215.254-.065.039-.13.084-.195.136a5.875 5.875 0 0 1-.254.059c-.065.013-.13.033-.196.059-.117 0-.182.006-.195.02a.15.15 0 0 1-.058-.02.246.246 0 0 1-.098-.059.247.247 0 0 0-.117-.059.38.38 0 0 1 0-.293.361.361 0 0 1 .195-.175c.091.013.143.02.156.02a.173.173 0 0 1 .078-.02c.118-.013.19-.02.215-.02l.078-.039c.117-.104.17-.156.157-.156-.013-.013-.007-.033.02-.059.064-.13.103-.195.116-.195.013-.013.02-.026.02-.04a.245.245 0 0 0-.04-.194l-.077-.196a.314.314 0 0 1-.04-.137.218.218 0 0 0-.019-.097c-.091-.13-.17-.209-.234-.235a.661.661 0 0 1-.176-.156c-.13 0-.202-.006-.215-.02 0-.025-.013-.038-.039-.038a.338.338 0 0 0-.195-.02h-.176c-.195 0-.32.013-.371.04a1.07 1.07 0 0 0-.137.058 1.073 1.073 0 0 0-.273.156c-.04.026-.052.059-.04.098h-.097zM30.547 15.492c-.065.104-.11.156-.137.156-.013 0-.026.014-.039.04-.104.078-.17.123-.195.136-.13.013-.195.026-.195.04h-.04c-.182-.066-.3-.092-.351-.079a.22.22 0 0 1-.156-.02l-.235-.078a.762.762 0 0 1-.176-.097.146.146 0 0 0-.156-.059c-.065-.143-.17-.221-.312-.234a1.287 1.287 0 0 1-.117-.215c-.014-.039-.046-.059-.098-.059-.091.105-.15.17-.176.196a.31.31 0 0 1-.059.078c-.117.091-.188.137-.214.137a5.323 5.323 0 0 1-.313.254 1.38 1.38 0 0 1-.371.156.19.19 0 0 1-.117.078.188.188 0 0 0-.098.078c-.13-.013-.228.013-.293.078-.052-.026-.097-.032-.137-.02a.435.435 0 0 1-.136.06c-.091-.014-.15-.014-.176 0-.013.012-.033.019-.059.019a1.469 1.469 0 0 1-.253-.059h-.079c-.156 0-.26-.013-.312-.039-.04-.013-.085-.006-.137.02-.078-.079-.137-.118-.176-.118a1.053 1.053 0 0 1-.136-.058 1.19 1.19 0 0 1-.215-.117.607.607 0 0 0-.254-.098 4.281 4.281 0 0 0-.195-.254.348.348 0 0 0-.098-.098.522.522 0 0 1-.098-.136.596.596 0 0 1-.156-.137c-.013-.026-.046-.046-.098-.059a.277.277 0 0 0-.039-.156.782.782 0 0 0-.097-.117l-.078-.234a.309.309 0 0 0-.118-.196.186.186 0 0 0-.058-.176.609.609 0 0 1-.078-.214c0-.144-.013-.228-.04-.254a.366.366 0 0 1-.019-.117c.026-.157.033-.248.02-.274a.32.32 0 0 1-.02-.098c0-.065.006-.117.02-.156a.605.605 0 0 1 .039-.117c.013-.065.02-.137.02-.215 0-.078.019-.143.058-.195v-.195a.309.309 0 0 1 .058-.079.76.76 0 0 0 .059-.156c.013-.052.033-.11.059-.176.104-.169.169-.3.195-.39a.74.74 0 0 1 .156-.235c.078-.104.13-.175.156-.214a.298.298 0 0 1 .157-.079c.078-.117.13-.182.156-.195.026-.013.032-.033.02-.059a.49.49 0 0 0 .195-.117l.156-.156a.439.439 0 0 0 .156-.059c.052-.039.098-.071.137-.097.143-.013.221-.026.234-.04.026-.025.052-.025.078 0 .066-.064.15-.084.254-.058.104.013.228.013.371 0 .196-.052.346-.065.45-.039.117.013.234.033.351.059.143.078.267.13.371.156.091.078.15.13.176.156.026.013.059.02.098.02.026.065.065.104.117.117.052 0 .084.033.098.098.117.065.182.104.195.117.013.013.026.02.039.02a1.61 1.61 0 0 0 .176-.196.94.94 0 0 0 .058-.098c.026-.026.072-.039.137-.039a.278.278 0 0 0 .156-.039c.117-.039.183-.045.196-.02.026.014.065.02.117.02.143.117.234.221.273.313a.62.62 0 0 0 .176.234c.026.065.046.143.059.234.026.079.039.17.039.274.013.143.02.24.02.293l-.02.37c0 .131-.007.255-.02.372 0 .117-.013.228-.039.332-.039.17-.065.267-.078.293a2.44 2.44 0 0 0-.156.352c-.04.117-.072.182-.098.195a.228.228 0 0 0-.039.059.432.432 0 0 0-.059.136c-.013.04-.045.072-.097.098a3.926 3.926 0 0 0-.117.273c-.014.04-.014.072 0 .098.078.143.117.234.117.273.013.04.032.072.058.098a.247.247 0 0 0 .098.059.245.245 0 0 1 .098.058c.104.078.156.124.156.137h.039a.475.475 0 0 0 .156.117.607.607 0 0 1 .117.04c.144.025.222.045.235.058a.322.322 0 0 0 .097-.02c.105-.013.176-.026.215-.039.04-.026.091-.026.157 0 .13.104.195.176.195.215 0 .026.013.052.039.078zm-2.95-4.258a2.219 2.219 0 0 0-.214-.195.808.808 0 0 0-.156-.117 2.34 2.34 0 0 1-.332-.195 2.523 2.523 0 0 0-.235-.059 2.021 2.021 0 0 0-.137-.059c-.065-.026-.104-.026-.117 0-.104.013-.162.02-.175.02-.014-.013-.033-.013-.06 0a8.172 8.172 0 0 0-.37.059.596.596 0 0 1-.215 0c-.065.039-.137.078-.215.117a.52.52 0 0 0-.176.117c-.156.091-.273.17-.351.234a.469.469 0 0 0-.176.235c-.078.09-.13.156-.156.195a1.06 1.06 0 0 1-.059.137.434.434 0 0 0-.058.136c-.014.04-.046.072-.098.098a.437.437 0 0 1-.059.156.496.496 0 0 1-.058.117l-.04.157c0 .039-.012.071-.038.097a.21.21 0 0 1-.02.196.518.518 0 0 0-.02.254c-.039.143-.058.254-.058.332a.83.83 0 0 1 0 .254c.052.182.091.299.117.351a.32.32 0 0 1 .04.176c.103.13.188.3.253.508a.537.537 0 0 1 .156.136c.04.04.072.105.098.196.104.09.163.143.176.156.078.078.117.13.117.156a.23.23 0 0 0 .059.04c.13.064.208.097.234.097.026 0 .052.02.078.059.091.013.17.039.234.078.079.039.15.084.215.136.13-.026.209-.026.235 0 .039.013.071.033.097.059a.299.299 0 0 1 .117-.04c.04 0 .092.007.157.02.078 0 .13-.006.156-.02a.94.94 0 0 0 .098-.058c.039-.013.11-.02.215-.02a.642.642 0 0 0 .195-.097c.026-.039.052-.045.078-.02.104-.104.176-.156.215-.156.039 0 .071-.013.097-.039.091-.104.157-.156.196-.156l.175-.176a.173.173 0 0 0 .02-.078.2.2 0 0 0 .156-.176.532.532 0 0 1 .137-.234l-.078-.273c-.04-.027-.059-.06-.059-.098a.366.366 0 0 0-.02-.117c-.025-.117-.051-.19-.077-.215a1.239 1.239 0 0 1-.078-.352.549.549 0 0 0-.02-.254 1.359 1.359 0 0 1-.059-.234c.013-.026.013-.072 0-.137 0-.09-.006-.175-.02-.254v-.254-.234a.523.523 0 0 0-.038-.195c.065-.13.09-.209.078-.235-.013-.026-.013-.058 0-.097-.052-.143-.104-.222-.156-.235zm.645.489c0 .052-.006.15-.02.293 0 .13.014.221.04.273-.026.052-.033.098-.02.137.013.039.02.078.02.117.013.052.026.098.039.137a.133.133 0 0 1 .039.097.666.666 0 0 0 0 .235.6.6 0 0 1 .039.117.49.49 0 0 0 0 .195c.013.065.02.11.02.137a.245.245 0 0 1 .058.098.247.247 0 0 1 .059.117c.065.013.097-.007.097-.059 0-.065.033-.104.098-.117-.026-.065-.02-.117.02-.156a.34.34 0 0 0 .097-.176c0-.143.013-.234.04-.273a.492.492 0 0 0 .058-.118c.039-.169.058-.3.058-.39v-.176c0-.117-.006-.182-.02-.195v-.079c0-.13-.006-.227-.019-.292a.434.434 0 0 0-.039-.196.258.258 0 0 0-.039-.234l-.137-.156c0-.013-.006-.02-.02-.02-.025.04-.058.059-.097.059-.026-.013-.065.02-.117.097a.387.387 0 0 1-.117.137c-.052.04-.065.091-.04.156l-.097.235zM36.816 9.516c-.013.039-.026.084-.039.136 0 .052-.026.091-.078.118-.117.22-.156.423-.117.605.052.195.078.319.078.371 0 .04.013.085.04.137.038.039.058.078.058.117.013.04.039.059.078.059 0 .104.039.175.117.214 0 .053.02.092.059.118.039.013.058.052.058.117a.255.255 0 0 1 .117.117c.027.04.072.072.137.098.052.065.091.11.117.136.04.026.072.053.098.079l.176.156.234.234c.04.117.124.222.254.313.143.13.234.214.274.254a.498.498 0 0 1 .117.117c-.013.117.032.195.136.234a.496.496 0 0 0 .098.254l.195.195c0 .078.02.143.059.196.04.039.078.084.117.136.026.144.046.228.059.254l.058.059a3.187 3.187 0 0 1 .078.703c-.026.117-.032.195-.019.234.013.026.02.052.02.079-.04.195-.085.332-.137.41-.013.039-.033.084-.059.136a.434.434 0 0 0-.02.137c-.169.17-.26.287-.273.352-.182.078-.286.143-.312.195l-.098.098a.642.642 0 0 1-.078.097c-.13.065-.202.104-.215.117 0 .014-.013.014-.039 0-.117.066-.221.111-.312.137-.157.026-.241.046-.254.059-.013.013-.026.02-.04.02a.596.596 0 0 0-.214 0 .207.207 0 0 1-.176 0c-.117-.079-.202-.118-.254-.118a.218.218 0 0 1-.098-.02c-.09-.064-.15-.097-.175-.097a.173.173 0 0 1-.078-.02 1.218 1.218 0 0 0-.196-.195c-.026 0-.045-.006-.058-.02a3.16 3.16 0 0 1-.137-.234.183.183 0 0 0-.137-.098 3.957 3.957 0 0 0-.039-.175.19.19 0 0 0-.078-.117 2.75 2.75 0 0 0-.059-.313c0-.039.007-.085.02-.137v-.312a.285.285 0 0 0-.02-.176c.052-.039.078-.124.078-.254.066 0 .098-.02.098-.058l.04-.157a.966.966 0 0 0 .194-.136l.157-.118c.078-.09.13-.136.156-.136.04 0 .052-.013.04-.04.077.014.13.014.155 0 .04-.012.065-.032.078-.058a.84.84 0 0 0 .215.04.27.27 0 0 0 .137-.06c.026.04.052.06.078.06a.333.333 0 0 1 .137-.02c.117.065.189.104.215.117.026 0 .039.013.039.039.065.09.136.176.215.254a.556.556 0 0 1 .195.234.494.494 0 0 1-.117.234c-.04.053-.091.111-.157.176a.494.494 0 0 1-.195 0 2.24 2.24 0 0 0-.215-.039.587.587 0 0 1-.136-.332.536.536 0 0 1-.118-.02c-.039-.025-.097-.032-.175-.019a.518.518 0 0 0-.274.117.595.595 0 0 1-.195.137 4.302 4.302 0 0 0-.078.332.889.889 0 0 0 .039.508.19.19 0 0 1 .039.098.246.246 0 0 0 .098.058c.039.013.052.052.039.117a.52.52 0 0 1 .136.098c.04.039.078.072.117.098.17.065.28.117.333.156a.363.363 0 0 0 .234.078c.182-.04.286-.065.312-.078a.299.299 0 0 0 .118-.04.983.983 0 0 1 .136-.097c.026 0 .052-.013.078-.039.053-.078.085-.117.098-.117a.173.173 0 0 0 .078-.02c.052-.039.091-.071.117-.097a.642.642 0 0 0 .098-.078c0-.053.013-.092.04-.118a.647.647 0 0 0 .077-.097c.065-.104.091-.183.078-.235 0-.052.02-.09.059-.117.013-.156.02-.306.02-.45a.632.632 0 0 0-.118-.39c-.013-.13-.026-.201-.039-.215l-.058-.058a2.198 2.198 0 0 1-.02-.156.174.174 0 0 0-.02-.079 2.853 2.853 0 0 0-.214-.273.428.428 0 0 1-.078-.176c-.066-.09-.105-.136-.117-.136a.223.223 0 0 1-.04-.06 1.187 1.187 0 0 0-.097-.155.228.228 0 0 1-.04-.059c-.064 0-.11-.065-.136-.195-.104-.065-.163-.11-.176-.137-.156-.195-.286-.319-.39-.371a2.135 2.135 0 0 0-.157-.176.742.742 0 0 0-.195-.137c-.013-.09-.052-.15-.117-.175a.263.263 0 0 1-.098-.176 2.469 2.469 0 0 1-.37-.45 2.299 2.299 0 0 0-.216-.35 2.206 2.206 0 0 0-.039-.274 3.693 3.693 0 0 1-.039-.176c0-.13-.006-.202-.02-.215-.012-.013-.019-.032-.019-.059l.02-.234c.013 0 .02-.013.02-.039a1.35 1.35 0 0 0-.04-.156.26.26 0 0 1 .059-.156.747.747 0 0 1 .078-.196c.026-.039.026-.071 0-.097a.642.642 0 0 1 .097-.079c.04-.026.052-.071.04-.136.234-.104.397-.228.488-.371a.87.87 0 0 0 .156-.079.441.441 0 0 1 .195-.078.901.901 0 0 0 .235-.117c.039-.039.071-.045.097-.02.105-.025.17-.038.196-.038.039 0 .071.013.097.039.117.013.176.013.176 0 .013-.026.033-.033.059-.02.169.013.28.033.332.059.065.013.13.02.195.02.026.038.091.07.195.097a.94.94 0 0 1 .196.176c.026.039.065.071.117.097.052.078.084.124.097.137l.079.04c.052.168.09.266.117.292.039.026.045.046.02.059.038.026.071.058.097.097l.117.118c-.013.117-.013.182 0 .195.013 0 .02.013.02.039 0 .065-.02.137-.059.215 0 .09-.006.15-.02.176l-.038.078c-.027.078-.046.15-.06.214a.25.25 0 0 1-.097.157c-.078.13-.15.215-.215.254-.065.039-.13.084-.195.136a5.876 5.876 0 0 1-.254.059c-.065.013-.13.033-.195.059-.117 0-.182.006-.195.02a.15.15 0 0 1-.059-.02.247.247 0 0 1-.098-.059.247.247 0 0 0-.117-.059.38.38 0 0 1 0-.293.36.36 0 0 1 .196-.175c.09.013.143.02.156.02a.173.173 0 0 1 .078-.02c.117-.013.189-.02.215-.02l.078-.039c.117-.104.17-.156.156-.156-.013-.013-.007-.033.02-.059.065-.13.104-.195.117-.195.013-.013.02-.026.02-.04a.245.245 0 0 0-.04-.194l-.078-.196a.315.315 0 0 1-.039-.137.218.218 0 0 0-.02-.097c-.09-.13-.169-.209-.234-.235a.66.66 0 0 1-.176-.156c-.13 0-.202-.006-.215-.02 0-.025-.012-.038-.038-.038a.338.338 0 0 0-.196-.02h-.176c-.195 0-.319.013-.37.04-.04.012-.085.032-.137.058a1.075 1.075 0 0 0-.274.156c-.039.026-.052.059-.039.098h-.098zM47.578 15.922a2.02 2.02 0 0 0-.098.215c0 .039-.013.071-.039.097.026.04.026.072 0 .098a.241.241 0 0 0-.039.137.189.189 0 0 0-.097.078.245.245 0 0 1-.059.098.845.845 0 0 0-.234.136 3.957 3.957 0 0 0-.176.04 1.241 1.241 0 0 1-.176.038c-.065 0-.143.007-.234.02-.091.026-.163.02-.215-.02-.065-.065-.11-.09-.137-.078-.026.013-.052.007-.078-.02a.909.909 0 0 1-.234-.155.458.458 0 0 0-.157-.098c-.13-.13-.214-.195-.253-.195-.052-.26-.137-.437-.254-.528-.026-.117-.066-.195-.117-.234l-.118-.254c-.039-.13-.078-.215-.117-.254a1.029 1.029 0 0 0-.098-.156c-.13.039-.195.065-.195.078 0 .013-.013.02-.039.02a.538.538 0 0 1-.156.136c-.065.026-.13.059-.196.098a1.098 1.098 0 0 1-.234.176c-.078.039-.156.084-.234.136-.104.026-.176.065-.215.117-.026.053-.065.066-.117.04a8.787 8.787 0 0 0-.586.214c-.104-.026-.17-.032-.196-.02a.606.606 0 0 1-.117.04.479.479 0 0 1-.175-.04c-.053-.025-.098-.025-.137 0a1.71 1.71 0 0 0-.352-.194.317.317 0 0 1-.156-.137c-.13.013-.202.006-.215-.02a.133.133 0 0 0-.039-.097l-.312-.313a3.24 3.24 0 0 0-.196-.215.66.66 0 0 0-.136-.273.178.178 0 0 1 0-.195 14.192 14.192 0 0 1-.118-.333.216.216 0 0 1 .04-.214.697.697 0 0 0-.02-.371c-.026-.118 0-.19.078-.215a.369.369 0 0 1 .02-.215c.026-.052.058-.104.097-.156a.962.962 0 0 0 .059-.235.247.247 0 0 1 .058-.117c.026-.039.052-.085.078-.137l.079-.156a.46.46 0 0 1 .097-.156.186.186 0 0 0 .059-.176c.104-.117.189-.189.254-.215a.236.236 0 0 0 .136-.137c.092 0 .157-.02.196-.058.039-.052.104-.078.195-.078a.774.774 0 0 1 .234-.176l.254-.078c.13-.052.202-.072.215-.059a.15.15 0 0 0 .059-.02c.091-.025.15-.045.176-.058a.76.76 0 0 0 .097-.039.397.397 0 0 1 .176 0c.065 0 .124-.02.176-.059a.524.524 0 0 0 .234.02.313.313 0 0 1 .157 0l.234.04c-.026-.157-.033-.235-.02-.235.026 0 .04-.013.04-.04a89.09 89.09 0 0 1-.04-.156.164.164 0 0 1 .02-.136.448.448 0 0 1-.059-.235c0-.09.013-.169.04-.234a.786.786 0 0 1-.06-.313v-.254a.322.322 0 0 0 .02-.097.322.322 0 0 0-.02-.098v-.117c-.025-.091-.032-.143-.019-.156l.04-.078c-.066-.183-.092-.32-.079-.41.013-.105.013-.17 0-.196a.18.18 0 0 1 0-.117c.052-.13.085-.202.098-.215.026-.026.026-.052 0-.078l.058-.215.04-.117a.387.387 0 0 0 .038-.176c.014-.156.04-.254.079-.293a.285.285 0 0 0 .058-.176.47.47 0 0 0 .059-.156.245.245 0 0 1 .058-.097c-.026-.053-.02-.092.02-.118.039-.026.052-.071.039-.136a.247.247 0 0 0 .137-.118c.039-.052.078-.11.117-.175.052 0 .085-.013.098-.04A.248.248 0 0 1 44.844 6L45 5.922l.078-.078c.156.013.254.026.293.039.04.013.065.039.078.078.078-.013.124 0 .137.039.026.04.065.059.117.059.04.078.065.123.078.136.026 0 .046.013.059.04.052.182.084.312.097.39.014.078.053.13.118.156.039.143.065.215.078.215.039.117.052.182.039.195l-.02.04c.065.143.085.22.059.234-.026 0-.04.02-.04.058a.305.305 0 0 1 0 .215.245.245 0 0 0 .04.196c-.026.169-.026.267 0 .293.039.013.032.032-.02.058.04.156.059.28.059.371.013.078.02.15.02.215a.313.313 0 0 0 0 .156c.012.04.02.072.02.098a.322.322 0 0 1-.02.098.18.18 0 0 0 0 .117c.026.039.032.084.02.137v.097c-.04.156-.053.248-.04.274.013.026.007.058-.02.097-.013.117-.026.176-.039.176v.04c.013.103.007.168-.02.194-.012.013-.019.033-.019.06a.218.218 0 0 0-.02.097c.014.026.02.065.02.117a.322.322 0 0 1-.02.098.369.369 0 0 0-.019.117c0 .117-.032.189-.097.215a.284.284 0 0 1 .02.175c0 .053.006.104.019.157-.052.09-.072.143-.059.156.013.013.013.032 0 .058a.132.132 0 0 0-.039.098.37.37 0 0 1-.02.117c-.065.157-.097.241-.097.254-.04.156-.059.241-.059.254.013.013.02.033.02.059-.065.13-.104.221-.117.273a.436.436 0 0 1-.059.137 1.207 1.207 0 0 1-.059.312 2.753 2.753 0 0 1-.058.196.297.297 0 0 1-.078.156.419.419 0 0 0-.078.098 1.54 1.54 0 0 0-.059.195c.013 0 .013.006 0 .02a1.131 1.131 0 0 0-.098.195c.013 0 .013.013 0 .039l-.156.195c0 .117.026.195.078.235 0 .065.013.117.04.156a.642.642 0 0 1 .077.097.34.34 0 0 0 .02.254c.039.065.091.111.156.137a.873.873 0 0 1 .078.215c0 .026.026.045.078.058.091.196.157.345.196.45a.568.568 0 0 0 .215.215l.097.097a.642.642 0 0 0 .098.078.879.879 0 0 1 .215.137.13.13 0 0 1 .117-.02c.052.026.098.04.137.04l.234-.098a1.077 1.077 0 0 1 .02-.371c.026-.091.11-.137.253-.137a.248.248 0 0 0 .118-.059c.039-.025.084-.025.136 0 .026.105.052.163.078.176a.244.244 0 0 1 .098.059zm-3.184-7.344c.027.078.033.13.02.156-.013.013-.02.033-.02.059 0 .104.007.215.02.332.013.104.02.202.02.293-.013.143-.007.273.02.39a.478.478 0 0 1 0 .274c.025.091.038.156.038.195 0 .026-.013.052-.039.079.026.09.046.15.059.175.013.026.006.065-.02.117.026.118.046.196.059.235a.642.642 0 0 1 .078.098c.052.156.11.26.176.312.078.039.156.085.234.137.04.117.052.188.04.215a.15.15 0 0 0-.02.058.636.636 0 0 1-.098.078.64.64 0 0 1-.098.078c-.156.04-.234.072-.234.098a.48.48 0 0 0-.04.176c.014.039.033.084.06.137.026.065.045.123.058.175.013.04 0 .085-.039.137.052.156.091.267.117.332.04.065.052.13.04.195l.155.157c.027-.104.04-.202.04-.293.052-.144.09-.222.117-.235.039-.013.052-.052.039-.117.065-.039.097-.104.097-.195a1.34 1.34 0 0 0-.02-.254c.092-.17.138-.293.138-.371a.35.35 0 0 1 .097-.196 1.01 1.01 0 0 1-.02-.253.31.31 0 0 1 .06-.079.21.21 0 0 0 .038-.117.394.394 0 0 0 .02-.215v-.214c.013-.066.026-.118.039-.157a.166.166 0 0 0 0-.156c.04-.104.052-.17.04-.195a.216.216 0 0 1-.02-.098c.052-.104.071-.163.058-.176v-.078c.052-.156.072-.267.059-.332V9.36c.013-.09.013-.15 0-.175a.083.083 0 0 1 0-.079 4.138 4.138 0 0 1-.02-.273.486.486 0 0 0-.02-.176.172.172 0 0 1-.019-.078c.026-.026.033-.065.02-.117-.013-.065-.007-.11.02-.137-.053-.039-.079-.11-.079-.215a.316.316 0 0 1-.059-.195.574.574 0 0 0-.039-.215c.066-.065.085-.136.059-.215a6.138 6.138 0 0 1-.078-.254v-.175c.013-.04.013-.072 0-.098a2.554 2.554 0 0 0-.137-.195c0-.026-.013-.046-.039-.059.013-.104-.006-.17-.059-.195a1.466 1.466 0 0 1-.156-.137.175.175 0 0 0-.117.098.35.35 0 0 1-.098.097 1.075 1.075 0 0 0-.058.137.244.244 0 0 1-.059.098c0 .065-.02.117-.058.156-.04.026-.04.065 0 .117-.052.13-.091.215-.118.254a.249.249 0 0 0-.058.117.347.347 0 0 0-.04.157.9.9 0 0 1-.019.175 1.08 1.08 0 0 0-.097.215.296.296 0 0 0 .02.235.338.338 0 0 0-.02.195c.013.052 0 .104-.04.156zm-.097 5.762a.584.584 0 0 0 .059-.078 1.94 1.94 0 0 0 .136-.157 2.299 2.299 0 0 0-.097-.273.505.505 0 0 1-.02-.234.435.435 0 0 1-.059-.137.436.436 0 0 0-.058-.137 3.686 3.686 0 0 1-.04-.293.083.083 0 0 0 0-.078.698.698 0 0 0-.058-.176.988.988 0 0 1-.02-.195v-.215a1.382 1.382 0 0 0-.058-.234v-.156c-.026-.027-.046-.085-.059-.176a1.935 1.935 0 0 1-.02-.274.315.315 0 0 1-.155 0c-.04-.026-.091-.026-.157 0a.64.64 0 0 1-.156-.039c-.065-.039-.11-.052-.137-.039a1.772 1.772 0 0 0-.312.098.977.977 0 0 0-.234.098c-.052-.027-.092-.027-.118 0-.026.013-.058.006-.097-.02a.463.463 0 0 1-.215.078c-.091.091-.15.13-.176.117-.013-.013-.046-.02-.098-.02l-.117.118a.297.297 0 0 1-.156.078.293.293 0 0 1-.176.176.185.185 0 0 1-.078.156.307.307 0 0 0-.078.117.432.432 0 0 0-.059.137c-.013.04-.045.072-.097.098a.263.263 0 0 1-.078.234.418.418 0 0 0-.137.234.99.99 0 0 1-.04.332.347.347 0 0 0-.038.157c.026.182.032.325.02.43 0 .104.012.208.038.312l.078.078.079.078c.026.078.052.124.078.137.039.013.058.032.058.058.04.118.072.19.098.215a.451.451 0 0 0 .117.078.249.249 0 0 1 .117.059c.196.078.313.15.352.215.065 0 .117.013.156.039a.57.57 0 0 0 .137.02.83.83 0 0 0 .254 0c.078-.014.163-.027.254-.04.065-.039.11-.065.136-.078a.304.304 0 0 1 .078-.058.79.79 0 0 0 .235-.078.434.434 0 0 1 .156-.059.772.772 0 0 1 .352-.195c.013-.065.039-.111.078-.137a.294.294 0 0 0 .097-.117.446.446 0 0 0 .137-.117.643.643 0 0 1 .078-.098l.02-.04zM54.766 15.492c-.066.104-.111.156-.137.156-.013 0-.026.014-.04.04a1.98 1.98 0 0 1-.194.136c-.13.013-.196.026-.196.04h-.039c-.182-.066-.3-.092-.351-.079a.22.22 0 0 1-.157-.02l-.234-.078a.762.762 0 0 1-.176-.097.146.146 0 0 0-.156-.059c-.065-.143-.17-.221-.313-.234a1.295 1.295 0 0 1-.117-.215c-.013-.039-.045-.059-.097-.059-.092.105-.15.17-.176.196a.305.305 0 0 1-.059.078c-.117.091-.189.137-.215.137a5.39 5.39 0 0 1-.312.254 1.383 1.383 0 0 1-.371.156.19.19 0 0 1-.117.078.188.188 0 0 0-.098.078c-.13-.013-.228.013-.293.078-.052-.026-.098-.032-.137-.02a.434.434 0 0 1-.136.06c-.092-.014-.15-.014-.176 0-.013.012-.033.019-.059.019a1.47 1.47 0 0 1-.254-.059h-.078c-.156 0-.26-.013-.312-.039-.04-.013-.085-.006-.137.02-.078-.079-.137-.118-.176-.118a1.065 1.065 0 0 1-.137-.058 1.193 1.193 0 0 1-.214-.117.607.607 0 0 0-.254-.098 4.324 4.324 0 0 0-.196-.254.348.348 0 0 0-.097-.098.522.522 0 0 1-.098-.136.597.597 0 0 1-.156-.137c-.013-.026-.046-.046-.098-.059a.278.278 0 0 0-.039-.156.783.783 0 0 0-.098-.117l-.078-.234a.309.309 0 0 0-.117-.196.186.186 0 0 0-.059-.176.607.607 0 0 1-.078-.214c0-.144-.013-.228-.039-.254a.369.369 0 0 1-.02-.117c.027-.157.033-.248.02-.274a.322.322 0 0 1-.02-.098c0-.065.007-.117.02-.156a.597.597 0 0 1 .04-.117c.012-.065.019-.137.019-.215 0-.078.02-.143.059-.195v-.195a.304.304 0 0 1 .058-.079.766.766 0 0 0 .059-.156c.013-.052.032-.11.058-.176.104-.169.17-.3.196-.39a.74.74 0 0 1 .156-.235c.078-.104.13-.175.156-.214a.297.297 0 0 1 .156-.079c.078-.117.13-.182.157-.195.026-.013.032-.033.02-.059a.49.49 0 0 0 .194-.117l.157-.156a.437.437 0 0 0 .156-.059c.052-.039.098-.071.137-.097.143-.013.221-.026.234-.04.026-.025.052-.025.078 0 .065-.064.15-.084.254-.058.104.013.228.013.371 0 .196-.052.345-.065.45-.039.117.013.234.033.35.059.144.078.268.13.372.156.091.078.15.13.176.156.026.013.058.02.097.02.027.065.066.104.118.117.052 0 .084.033.097.098.117.065.183.104.196.117.013.013.026.02.039.02.09-.092.15-.157.175-.196a.976.976 0 0 0 .06-.098c.025-.026.07-.039.136-.039a.278.278 0 0 0 .156-.039c.117-.039.182-.045.195-.02.026.014.065.02.117.02.144.117.235.221.274.313.039.09.098.169.176.234.026.065.045.143.058.234.026.079.04.17.04.274.012.143.019.24.019.293l-.02.37c0 .131-.006.255-.02.372 0 .117-.012.228-.038.332-.04.17-.065.267-.078.293-.091.182-.144.3-.157.352-.039.117-.071.182-.097.195a.228.228 0 0 0-.04.059.435.435 0 0 0-.058.136c-.013.04-.046.072-.098.098a3.926 3.926 0 0 0-.117.273c-.013.04-.013.072 0 .098.078.143.117.234.117.273.014.04.033.072.06.098a.246.246 0 0 0 .097.059c.039.013.071.032.097.058.105.078.157.124.157.137h.039a.476.476 0 0 0 .156.117.605.605 0 0 1 .117.04c.143.025.221.045.234.058a.321.321 0 0 0 .098-.02c.104-.013.176-.026.215-.039.04-.026.091-.026.156 0 .13.104.196.176.196.215 0 .026.013.052.039.078zm-2.95-4.258a2.22 2.22 0 0 0-.214-.195.81.81 0 0 0-.157-.117 2.337 2.337 0 0 1-.332-.195 2.529 2.529 0 0 0-.234-.059 1.99 1.99 0 0 0-.137-.059c-.065-.026-.104-.026-.117 0-.104.013-.163.02-.176.02-.013-.013-.032-.013-.058 0a8.172 8.172 0 0 0-.371.059.595.595 0 0 1-.215 0c-.065.039-.137.078-.215.117a.518.518 0 0 0-.176.117c-.156.091-.273.17-.352.234a.47.47 0 0 0-.175.235c-.078.09-.13.156-.157.195-.013.039-.032.085-.058.137a.431.431 0 0 0-.059.136c-.013.04-.045.072-.097.098a.435.435 0 0 1-.059.156.492.492 0 0 1-.059.117l-.039.157c0 .039-.013.071-.039.097a.21.21 0 0 1-.02.196.517.517 0 0 0-.019.254 1.368 1.368 0 0 0-.058.332.83.83 0 0 1 0 .254c.052.182.09.299.117.351a.32.32 0 0 1 .039.176c.104.13.189.3.254.508a.537.537 0 0 1 .156.136c.04.04.072.105.098.196.104.09.163.143.175.156.079.078.118.13.118.156a.226.226 0 0 0 .058.04c.13.064.209.097.235.097.026 0 .052.02.078.059.09.013.169.039.234.078.078.039.15.084.215.136.13-.026.208-.026.234 0a.244.244 0 0 1 .098.059.3.3 0 0 1 .117-.04c.04 0 .091.007.157.02.078 0 .13-.006.156-.02a.94.94 0 0 0 .097-.058.786.786 0 0 1 .215-.02.64.64 0 0 0 .196-.097c.026-.039.052-.045.078-.02.104-.104.175-.156.215-.156.039 0 .071-.013.097-.039.091-.104.156-.156.196-.156l.175-.176a.172.172 0 0 0 .02-.078.2.2 0 0 0 .156-.176.533.533 0 0 1 .137-.234l-.078-.273c-.04-.027-.059-.06-.059-.098a.369.369 0 0 0-.02-.117c-.026-.117-.052-.19-.078-.215a1.24 1.24 0 0 1-.078-.352.546.546 0 0 0-.02-.254 1.37 1.37 0 0 1-.058-.234c.013-.026.013-.072 0-.137 0-.09-.006-.175-.02-.254v-.254-.234a.521.521 0 0 0-.038-.195c.065-.13.09-.209.078-.235-.013-.026-.013-.058 0-.097-.052-.143-.105-.222-.157-.235zm.645.489c0 .052-.007.15-.02.293 0 .13.013.221.04.273-.027.052-.033.098-.02.137.013.039.02.078.02.117.012.052.026.098.038.137.027.026.04.058.04.097a.666.666 0 0 0 0 .235.613.613 0 0 1 .039.117.485.485 0 0 0 0 .195c.013.065.02.11.02.137a.246.246 0 0 1 .058.098.249.249 0 0 1 .058.117c.066.013.098-.007.098-.059 0-.065.033-.104.098-.117-.026-.065-.02-.117.02-.156a.34.34 0 0 0 .097-.176c0-.143.013-.234.039-.273a.488.488 0 0 0 .059-.118c.039-.169.058-.3.058-.39v-.176c0-.117-.006-.182-.02-.195v-.079c0-.13-.006-.227-.019-.292a.435.435 0 0 0-.039-.196.258.258 0 0 0-.04-.234l-.136-.156c0-.013-.006-.02-.02-.02-.025.04-.058.059-.097.059-.026-.013-.065.02-.117.097a.387.387 0 0 1-.117.137c-.052.04-.066.091-.04.156l-.097.235zM58.77 16l-.41.059c.012-.013 0-.02-.04-.02h-.234c-.04 0-.059-.013-.059-.039a.394.394 0 0 0-.215-.02.878.878 0 0 1-.234-.039l-.234-.078a.49.49 0 0 0-.117-.058c-.17-.091-.287-.137-.352-.137a1.64 1.64 0 0 1-.215-.117.15.15 0 0 0-.02-.059 5.729 5.729 0 0 0-.234-.137l-.078-.078c-.052-.065-.098-.104-.137-.117l-.078-.078c-.078-.13-.13-.202-.156-.215a.247.247 0 0 1-.059-.098 2.23 2.23 0 0 0-.175-.214.685.685 0 0 1-.098-.196c-.078-.09-.117-.162-.117-.214a.887.887 0 0 1-.137-.274.967.967 0 0 1-.02-.332 1.604 1.604 0 0 0-.038-.273.575.575 0 0 0-.02-.137c.013-.104.013-.163 0-.176a.172.172 0 0 1-.02-.078c.04-.117.052-.195.04-.234 0-.04.012-.072.039-.098a.814.814 0 0 1 0-.254l.039-.195c.052-.026.078-.11.078-.254a3.46 3.46 0 0 1 .156-.215c.026-.013.032-.046.02-.098.104-.13.188-.214.253-.254a.316.316 0 0 0 .137-.195l.176-.176c.117-.09.189-.156.215-.195.169-.117.273-.202.312-.254a.538.538 0 0 0 .293-.117c.065.026.13.013.196-.04.078-.051.15-.064.214-.038.105-.065.163-.091.176-.078a.083.083 0 0 0 .078 0l.215-.02c.156-.026.254-.045.293-.058a.346.346 0 0 1 .274-.02.164.164 0 0 0 .136-.02c.04.053.085.079.137.079a.494.494 0 0 1 .352.058.4.4 0 0 0 .175 0c.13.091.202.15.215.176.026.013.059.02.098.02.143.065.247.15.312.253a.836.836 0 0 0 .332.254c.04.091.091.176.157.254.039.091.071.156.097.196a.419.419 0 0 1 .078.136c.052.104.072.176.059.215-.013.04-.013.072 0 .098.052.104.091.208.117.312a.289.289 0 0 0-.078.137.347.347 0 0 1-.039.156c-.026.04-.059.085-.098.137a.458.458 0 0 0-.097.156.681.681 0 0 1-.137.137.309.309 0 0 0-.078.117 1.88 1.88 0 0 0-.469.137.733.733 0 0 1-.332.078h-.254a.21.21 0 0 1-.117-.04.098.098 0 0 0-.117 0 .432.432 0 0 0-.176-.136 2.293 2.293 0 0 0-.176-.078l-.078-.078a.957.957 0 0 0-.059-.098 1.326 1.326 0 0 1-.136-.37c0-.092-.033-.144-.098-.157a.479.479 0 0 0 .04-.176c.012-.065.032-.13.058-.195a.442.442 0 0 0 .156-.156c.182-.079.306-.118.371-.118l.195.176-.039.274c-.013.078-.071.123-.175.136-.04.091-.04.163 0 .215.052.052.11.091.175.117a.54.54 0 0 1 .176.137c.04.04.072.033.098-.02.182 0 .306.007.37.02.066.013.131.007.196-.02a.295.295 0 0 0 .098-.117c.039-.052.091-.065.156-.039.065-.13.098-.221.098-.273 0-.065.013-.117.039-.156a.133.133 0 0 0-.04-.098.277.277 0 0 1-.038-.156.451.451 0 0 1-.098-.196.189.189 0 0 0-.078-.097c-.026-.026-.04-.072-.04-.137a.642.642 0 0 0-.097-.078.19.19 0 0 1-.078-.117 3.92 3.92 0 0 1-.215-.078.304.304 0 0 1-.156-.157c-.156-.078-.234-.13-.234-.156a1.471 1.471 0 0 1-.254-.059.173.173 0 0 0-.078-.019.18.18 0 0 0-.118 0c-.026.013-.065.013-.117 0-.143-.013-.228-.013-.254 0h-.097a.243.243 0 0 1-.137 0 .366.366 0 0 0-.117-.02 1.326 1.326 0 0 1-.157.04.643.643 0 0 0-.156.019 2.034 2.034 0 0 1-.234.078c-.195.078-.313.13-.352.156l-.078.079a.976.976 0 0 0-.097.058c-.13.065-.196.11-.196.137l-.234.156a1.227 1.227 0 0 0-.254.293.776.776 0 0 1-.098.117.305.305 0 0 0-.058.078.635.635 0 0 1-.117.235c-.027.026-.046.078-.06.156a.698.698 0 0 1-.058.176c.026.039.033.09.02.156l-.04.156c.014.117.02.19.02.215 0 .013-.013.033-.039.059a.65.65 0 0 1 .04.312.289.289 0 0 0 .077.254c.026.143.059.222.098.235.04.156.072.24.098.253.026.013.045.046.058.098a.447.447 0 0 1 .137.254c.091.091.13.143.117.156l.02.02c.026.039.058.078.097.117a.247.247 0 0 1 .118.137c.143.104.247.169.312.195a.233.233 0 0 1 .156.117.95.95 0 0 1 .215.078c.026.013.059.013.098 0 .182.065.306.104.371.117.078.013.15.033.215.06a.689.689 0 0 0 .312.038.454.454 0 0 1 .235.02.35.35 0 0 1 .175-.059 2.84 2.84 0 0 0 .196-.059c.117-.065.208-.104.273-.117.078-.013.124-.052.137-.117a.754.754 0 0 0 .254-.45.27.27 0 0 0 .137-.058c.026-.026.065-.039.117-.039.13-.039.221-.052.273-.039a.296.296 0 0 1 .156.078.315.315 0 0 1 0 .157c0 .039.007.078.02.117a.642.642 0 0 0-.078.097.454.454 0 0 1-.117.079c-.13.13-.202.208-.215.234a1.3 1.3 0 0 1-.196.195l-.078.04c-.104.103-.175.168-.215.195a2.098 2.098 0 0 1-.136.058c-.196.104-.32.15-.371.137L58.77 16zM63.184 9.398a.53.53 0 0 0-.078.176c.012.013.012.04 0 .078 0 .04-.014.085-.04.137a.598.598 0 0 1-.039.117c0 .04.007.085.02.137.013.039.02.078.02.117l-.079.235c0 .039.007.071.02.097.013.143.013.228 0 .254-.013.013 0 .033.039.059-.04.143-.059.247-.059.312a.759.759 0 0 1 .04.098.6.6 0 0 1 .038.117.433.433 0 0 1-.02.137c-.012.026-.012.058 0 .097.066.144.086.215.06.215-.027-.013-.046-.006-.06.02a.595.595 0 0 1 0 .215c-.012.065 0 .13.04.195a.487.487 0 0 0 0 .273c.039.079.046.17.02.274a.448.448 0 0 1 .058.234c0 .091.02.17.059.235.078-.157.13-.254.156-.293a.435.435 0 0 0 .039-.196.458.458 0 0 0 .078-.117c.026-.052.026-.098 0-.137.065-.052.104-.136.117-.254.026-.117.078-.195.157-.234 0-.117.032-.195.097-.234-.013-.052-.006-.091.02-.117a.634.634 0 0 0 .078-.098.132.132 0 0 0 .039-.098.435.435 0 0 1 .058-.136c.014-.04.046-.111.098-.215a.773.773 0 0 1 .098-.118.315.315 0 0 0 .078-.175.51.51 0 0 0 .234-.235.525.525 0 0 1 .215-.254c.078-.065.117-.13.117-.195.065.013.111-.006.137-.059a.387.387 0 0 1 .137-.117c.117-.039.189-.058.215-.058a.19.19 0 0 0 .097-.04l.196-.019c.013-.013.026-.02.039-.02.286-.025.514-.025.683 0 .13.04.222.06.274.06l.156.155.156.176c.078.091.117.156.117.196a.305.305 0 0 0 .059.078.164.164 0 0 0-.02.136.431.431 0 0 1 .059.137c.078.221.11.378.098.469-.013.091-.02.189-.02.293.013.039.02.078.02.117 0 .04.006.085.02.137.025.156.025.24 0 .254-.027.013-.033.039-.02.078 0 .065.006.143.02.234.025.091.019.15-.02.176-.026.143-.033.221-.02.234.013 0 .013.013 0 .04-.039.169-.078.292-.117.37-.026.144-.033.228-.02.254.014.013.02.033.02.059a.87.87 0 0 0-.078.215c.013.013.013.032 0 .058-.065.196-.091.326-.078.391.013.052-.007.104-.059.156.04.078.046.176.02.293a2.514 2.514 0 0 1-.059.332c.013.052.02.104.02.156a.164.164 0 0 1-.02.137c.04.091.052.15.04.176-.014.013-.014.033 0 .059.012.065.032.13.058.195a.166.166 0 0 1 0 .156l.195.195c.091.026.156.02.195-.02a.212.212 0 0 1 .157-.058c.143-.09.234-.117.273-.078.052.04.117.072.195.098a.787.787 0 0 1-.02.215c0 .039-.012.084-.038.136-.052.105-.11.163-.176.176a.34.34 0 0 0-.176.098.338.338 0 0 0-.195.02.517.517 0 0 1-.254.019.21.21 0 0 1-.117-.04c-.026-.025-.065-.032-.117-.019-.144-.065-.235-.123-.274-.175a.496.496 0 0 0-.117-.118 3.351 3.351 0 0 1-.137-.293.133.133 0 0 0-.039-.097.207.207 0 0 0 0-.176 3.82 3.82 0 0 1-.039-.176.76.76 0 0 1-.039-.098c0-.039-.02-.071-.058-.097.038-.04.052-.078.038-.117a.313.313 0 0 1 0-.157.566.566 0 0 0 0-.214.45.45 0 0 1 .04-.157c.052-.143.071-.24.058-.293a.243.243 0 0 1 0-.136v-.176l.04-.195.077-.254a.889.889 0 0 1 .04-.215.31.31 0 0 0 0-.156l.078-.274c.013-.052.032-.11.058-.176.013-.143.026-.221.04-.234.012-.013.019-.033.019-.059v-.254c.013-.052.026-.097.039-.136a2.957 2.957 0 0 1-.02-.215.173.173 0 0 0 .02-.078.92.92 0 0 1 0-.274c.013-.052 0-.11-.04-.175.014-.092.007-.144-.019-.157a.64.64 0 0 1-.078-.097c.013-.183 0-.3-.039-.352a.49.49 0 0 1-.059-.254.488.488 0 0 0-.117-.058c-.026-.013-.039-.052-.039-.118-.13-.013-.208-.013-.234 0-.026 0-.046-.013-.059-.039-.039.026-.09.033-.156.02-.065-.013-.11 0-.137.039-.104-.026-.169-.026-.195 0a.127.127 0 0 1-.059.059 1.147 1.147 0 0 1-.254.097c-.013 0-.032.013-.058.04-.104.103-.156.162-.156.175a1.355 1.355 0 0 0-.196.195.348.348 0 0 1-.097.098.463.463 0 0 0-.176.352.57.57 0 0 0-.176.351.255.255 0 0 0-.117.117c-.013.04-.033.091-.059.157a2.458 2.458 0 0 1-.234.488 2.708 2.708 0 0 0-.078.312c-.013.04-.033.085-.059.137a.322.322 0 0 0-.02.098 1.723 1.723 0 0 1-.038.293.957.957 0 0 1-.059.097.667.667 0 0 1-.02.215c0 .013-.013.033-.039.059.013.104.013.17 0 .195-.013.013-.02.046-.02.098a1.35 1.35 0 0 0-.038.273.433.433 0 0 1-.02.137c-.013.143-.013.24 0 .293.013.039.02.078.02.117-.013.156-.02.248-.02.274 0 .012.013.032.04.058a.825.825 0 0 0-.02.137v.117c.039.3.097.488.176.566a.447.447 0 0 0-.04.137.313.313 0 0 1 0 .156 1.637 1.637 0 0 0-.195.118c-.013.026-.045.026-.097 0-.04.065-.079.09-.118.078-.039 0-.078-.02-.117-.059a.813.813 0 0 1-.117-.156 1.067 1.067 0 0 1-.059-.137c.04-.065.04-.124 0-.176a.207.207 0 0 1 0-.175c-.039-.144-.052-.222-.039-.235.013-.013.013-.032 0-.058a.76.76 0 0 0-.039-.098v-.117c-.026-.143-.045-.222-.058-.235a.228.228 0 0 1-.04-.058 3.082 3.082 0 0 1-.038-.313.133.133 0 0 0-.04-.097c.04-.066.053-.118.04-.157a.682.682 0 0 1-.02-.195 9.365 9.365 0 0 1-.098-.43c-.052-.143-.071-.214-.058-.214a.747.747 0 0 1-.059-.235c.013-.052 0-.11-.039-.176.026-.065.026-.117 0-.156l-.039-.117c0-.143-.007-.228-.02-.254a.369.369 0 0 1-.019-.117c0-.156-.007-.241-.02-.254v-.078c.014-.235.014-.365 0-.39a.241.241 0 0 1 0-.138.17.17 0 0 0-.02-.175.437.437 0 0 0-.038-.274c0-.065.006-.136.02-.215a.455.455 0 0 0-.02-.234.77.77 0 0 0 .059-.156c.012-.065.006-.11-.02-.137 0-.234.013-.443.039-.625.04-.13.04-.189 0-.176-.04 0-.046-.02-.02-.058-.208 0-.43-.04-.664-.117a2.477 2.477 0 0 1-.273-.137.4.4 0 0 0 0-.176c0-.052.013-.104.039-.156a.433.433 0 0 1 .254-.137.85.85 0 0 0 .176.117.15.15 0 0 1 .058.02.34.34 0 0 0 .137.058.083.083 0 0 1 .078 0c.13.04.209.052.235.04a.19.19 0 0 1 .097-.04c0-.052.007-.097.02-.136l.039-.157c.039-.09.052-.143.039-.156V8.52c.039-.144.052-.228.039-.254 0-.026.006-.052.02-.079.026-.169.045-.26.058-.273a.127.127 0 0 0 .059-.059c.052-.195.078-.325.078-.39a.441.441 0 0 1 .078-.195.685.685 0 0 1 .098-.254.29.29 0 0 0 .078-.215l.117-.235a.497.497 0 0 1 .058-.117c.079-.117.118-.189.118-.215a.19.19 0 0 1 .039-.097c.052-.117.09-.202.117-.254.078-.104.117-.176.117-.215.013-.052.033-.11.059-.176.026-.052.058-.104.097-.156a.34.34 0 0 0 .098-.176c.091-.13.156-.202.195-.215.052-.026.085-.078.098-.156.052 0 .085-.02.098-.059a.349.349 0 0 1 .097-.097c.156-.104.241-.176.254-.215.04 0 .072-.007.098-.02a.642.642 0 0 0 .098-.078c.169-.065.253-.09.253-.078.105-.052.176-.091.215-.117a.347.347 0 0 1 .157-.04c.117 0 .188-.012.214-.038.144.026.235.039.274.039.052 0 .09.006.117.02l.215.097c.117.078.182.124.195.137.117.091.176.143.176.156h.02c.09.13.15.228.175.293-.013.156-.013.254 0 .293.013.04.02.072.02.098-.026.169-.052.319-.078.449a.37.37 0 0 1-.157.273.374.374 0 0 1-.117.274.682.682 0 0 1-.176.39.727.727 0 0 0-.175.313.236.236 0 0 0-.137.137 1.028 1.028 0 0 1-.098.156c-.09.117-.15.176-.176.176a1.206 1.206 0 0 1-.097.156c-.013 0-.013.013 0 .039l-.117.078c-.026.013-.046.052-.059.117a.263.263 0 0 0-.176.098.356.356 0 0 1-.156.117 3.37 3.37 0 0 1-.274.332.7.7 0 0 1-.253.156c-.079.105-.124.157-.137.157-.013 0-.033.013-.059.039-.117.078-.175.123-.175.136l-.02.02c-.117.039-.176.065-.176.078 0 .013-.006.02-.02.02l-.136.136c-.013.013-.02.033-.02.059-.13.052-.201.078-.214.078-.013 0-.026.007-.04.02a7.668 7.668 0 0 0-.214.097c-.144.052-.228.091-.254.117-.013.013-.052.013-.117 0zm.605-.78l.195-.098a.128.128 0 0 0 .059-.06 3.06 3.06 0 0 0 .234-.155c.052 0 .091-.013.117-.04a.953.953 0 0 1 .098-.058c.13-.143.202-.228.215-.254.156-.117.228-.176.215-.176l.293-.293c.065-.065.117-.13.156-.195.065-.039.104-.072.117-.098l.04-.078a.6.6 0 0 0 .195-.215c.117-.156.195-.266.234-.332a.675.675 0 0 1 .176-.214c.052-.144.084-.228.098-.254l.078-.078c0-.066.013-.118.039-.157.026-.052.052-.097.078-.136 0-.079.006-.144.02-.196a.435.435 0 0 1 .058-.136.278.278 0 0 1-.04-.157c0-.065.014-.117.04-.156-.078-.104-.117-.176-.117-.215a.132.132 0 0 0-.04-.097.523.523 0 0 1-.136-.098.64.64 0 0 0-.078-.098 1.857 1.857 0 0 1-.313-.039c-.039.013-.084.026-.136.04a.218.218 0 0 0-.098.019 1.279 1.279 0 0 0-.137.078c-.026.013-.071.013-.136 0a.19.19 0 0 1-.079.117.306.306 0 0 0-.078.059.583.583 0 0 0-.293.156.968.968 0 0 0-.175.254c-.118.221-.222.37-.313.449a.55.55 0 0 0-.176.332c-.104.078-.176.221-.215.43a.743.743 0 0 0-.039.097.37.37 0 0 0-.02.118l-.116.156a.692.692 0 0 0-.059.195c-.091.143-.137.241-.137.293 0 .04-.013.085-.039.137a.53.53 0 0 0-.078.176.15.15 0 0 1-.02.058.738.738 0 0 0-.078.254c0 .04-.006.091-.02.156a3.838 3.838 0 0 1-.097.254l-.039.078a.92.92 0 0 1 0 .274c0 .052.013.104.04.156a.517.517 0 0 0 .292-.078c.078-.052.15-.11.215-.176zM76.055 15.492c-.065.104-.111.156-.137.156-.013 0-.026.014-.04.04-.103.078-.168.123-.194.136-.13.013-.196.026-.196.04h-.039c-.182-.066-.3-.092-.351-.079a.22.22 0 0 1-.157-.02l-.234-.078a.762.762 0 0 1-.176-.097.146.146 0 0 0-.156-.059c-.065-.143-.17-.221-.313-.234a1.287 1.287 0 0 1-.117-.215c-.013-.039-.045-.059-.097-.059-.091.105-.15.17-.176.196a.31.31 0 0 1-.059.078c-.117.091-.189.137-.215.137a5.323 5.323 0 0 1-.312.254 1.38 1.38 0 0 1-.371.156.19.19 0 0 1-.117.078.188.188 0 0 0-.098.078c-.13-.013-.228.013-.293.078-.052-.026-.098-.032-.137-.02a.435.435 0 0 1-.136.06c-.092-.014-.15-.014-.176 0-.013.012-.033.019-.059.019a1.469 1.469 0 0 1-.254-.059h-.078c-.156 0-.26-.013-.312-.039-.04-.013-.085-.006-.137.02-.078-.079-.137-.118-.176-.118a1.053 1.053 0 0 1-.136-.058 1.193 1.193 0 0 1-.215-.117.606.606 0 0 0-.254-.098 4.281 4.281 0 0 0-.196-.254.347.347 0 0 0-.097-.098.522.522 0 0 1-.098-.136.598.598 0 0 1-.156-.137c-.013-.026-.046-.046-.098-.059a.277.277 0 0 0-.039-.156.782.782 0 0 0-.097-.117l-.079-.234a.308.308 0 0 0-.117-.196.186.186 0 0 0-.058-.176.609.609 0 0 1-.079-.214c0-.144-.013-.228-.039-.254a.366.366 0 0 1-.02-.117c.027-.157.033-.248.02-.274a.32.32 0 0 1-.02-.098c0-.065.007-.117.02-.156a.605.605 0 0 1 .04-.117 1.09 1.09 0 0 0 .019-.215c0-.078.02-.143.059-.195v-.195a.306.306 0 0 1 .058-.079.76.76 0 0 0 .059-.156c.013-.052.032-.11.058-.176.105-.169.17-.3.196-.39a.74.74 0 0 1 .156-.235c.078-.104.13-.175.156-.214a.298.298 0 0 1 .156-.079c.078-.117.13-.182.157-.195.026-.013.032-.033.02-.059a.49.49 0 0 0 .195-.117l.156-.156a.439.439 0 0 0 .156-.059c.052-.039.098-.071.137-.097.143-.013.221-.026.234-.04.026-.025.052-.025.078 0 .065-.064.15-.084.254-.058.104.013.228.013.371 0 .195-.052.345-.065.45-.039.117.013.234.033.351.059.143.078.267.13.371.156.091.078.15.13.176.156.026.013.059.02.097.02.027.065.066.104.118.117.052 0 .084.033.097.098.118.065.183.104.196.117.013.013.026.02.039.02a1.61 1.61 0 0 0 .175-.196.94.94 0 0 0 .06-.098c.025-.026.07-.039.136-.039a.278.278 0 0 0 .156-.039c.117-.039.182-.045.195-.02.026.014.066.02.118.02.143.117.234.221.273.313a.62.62 0 0 0 .176.234c.026.065.045.143.058.234.026.079.04.17.04.274.013.143.019.24.019.293l-.02.37c0 .131-.006.255-.02.372 0 .117-.012.228-.038.332-.04.17-.065.267-.078.293a2.44 2.44 0 0 0-.156.352c-.04.117-.072.182-.098.195a.228.228 0 0 0-.04.059.432.432 0 0 0-.058.136c-.013.04-.045.072-.098.098a3.98 3.98 0 0 0-.117.273c-.013.04-.013.072 0 .098.079.143.117.234.117.273.013.04.033.072.06.098a.247.247 0 0 0 .097.059.245.245 0 0 1 .097.058c.105.078.157.124.157.137h.039a.475.475 0 0 0 .156.117.607.607 0 0 1 .117.04c.143.025.221.045.235.058a.322.322 0 0 0 .097-.02c.104-.013.176-.026.215-.039.04-.026.091-.026.156 0 .13.104.196.176.196.215 0 .026.013.052.039.078zm-2.95-4.258a2.219 2.219 0 0 0-.214-.195.805.805 0 0 0-.157-.117 2.348 2.348 0 0 1-.332-.195 2.523 2.523 0 0 0-.234-.059 2.021 2.021 0 0 0-.137-.059c-.065-.026-.104-.026-.117 0-.104.013-.163.02-.176.02-.013-.013-.032-.013-.058 0a8.172 8.172 0 0 0-.371.059.596.596 0 0 1-.215 0c-.065.039-.137.078-.215.117a.52.52 0 0 0-.176.117c-.156.091-.273.17-.351.234a.468.468 0 0 0-.176.235c-.078.09-.13.156-.157.195a1.06 1.06 0 0 1-.058.137.436.436 0 0 0-.059.136c-.013.04-.045.072-.097.098a.437.437 0 0 1-.059.156.496.496 0 0 1-.058.117 89.09 89.09 0 0 1-.04.157c0 .039-.013.071-.039.097a.21.21 0 0 1-.02.196.518.518 0 0 0-.019.254c-.039.143-.058.254-.058.332a.83.83 0 0 1 0 .254c.052.182.09.299.117.351a.32.32 0 0 1 .039.176c.104.13.189.3.254.508a.535.535 0 0 1 .156.136c.04.04.072.105.098.196.104.09.162.143.176.156.078.078.117.13.117.156a.23.23 0 0 0 .058.04c.13.064.209.097.235.097.026 0 .052.02.078.059.091.013.17.039.234.078.078.039.15.084.215.136.13-.026.208-.026.234 0 .04.013.072.033.098.059a.299.299 0 0 1 .117-.04c.04 0 .091.007.156.02.079 0 .13-.006.157-.02a.94.94 0 0 0 .097-.058c.04-.013.111-.02.215-.02a.642.642 0 0 0 .196-.097c.026-.039.052-.045.078-.02.104-.104.175-.156.215-.156a.133.133 0 0 0 .097-.039c.091-.104.157-.156.195-.156l.176-.176a.173.173 0 0 0 .02-.078.2.2 0 0 0 .156-.176.532.532 0 0 1 .137-.234l-.078-.273c-.04-.027-.059-.06-.059-.098a.369.369 0 0 0-.02-.117c-.025-.117-.052-.19-.078-.215a1.239 1.239 0 0 1-.078-.352.549.549 0 0 0-.02-.254 1.359 1.359 0 0 1-.058-.234c.013-.026.013-.072 0-.137 0-.09-.006-.175-.02-.254v-.254-.234a.523.523 0 0 0-.038-.195c.065-.13.09-.209.078-.235-.013-.026-.013-.058 0-.097-.052-.143-.105-.222-.156-.235zm.645.489c0 .052-.007.15-.02.293 0 .13.013.221.04.273-.026.052-.033.098-.02.137.013.039.02.078.02.117.013.052.026.098.039.137a.133.133 0 0 1 .039.097.666.666 0 0 0 0 .235.6.6 0 0 1 .039.117.49.49 0 0 0 0 .195c.013.065.02.11.02.137a.245.245 0 0 1 .058.098.247.247 0 0 1 .058.117c.066.013.098-.007.098-.059 0-.065.033-.104.098-.117-.026-.065-.02-.117.02-.156a.34.34 0 0 0 .097-.176c0-.143.013-.234.039-.273a.492.492 0 0 0 .059-.118c.039-.169.058-.3.058-.39v-.176c0-.117-.006-.182-.02-.195v-.079c0-.13-.006-.227-.019-.292a.435.435 0 0 0-.039-.196.258.258 0 0 0-.039-.234l-.137-.156c0-.013-.006-.02-.02-.02-.025.04-.058.059-.097.059-.026-.013-.065.02-.117.097a.386.386 0 0 1-.117.137c-.052.04-.065.091-.04.156l-.097.235zM77.031 1.762c.026.169.052.286.078.351a.698.698 0 0 1 .059.196.249.249 0 0 1 .059.117c.026.039.058.071.097.097-.039.053-.045.098-.02.137.04.026.046.052.02.078.052.17.072.267.059.293.013.04.026.072.039.098a.247.247 0 0 1 .059.098c0 .156.006.253.019.293.026.039.065.071.117.097v.176c.013.039.026.091.04.156.038.104.051.163.038.176-.013 0-.013.02 0 .059.04.117.059.201.059.253.013.04.032.072.058.098.026.17.04.28.04.332.013.04.032.072.058.098.026.039.04.11.04.215 0 .104.012.175.038.215a.508.508 0 0 0-.02.156c.014.065.007.117-.019.156.04.13.065.202.078.215.013.013.007.032-.02.058.027.027.04.066.04.118 0 .052.006.11.02.175.039.144.052.222.039.235v.02c-.014.025-.007.104.019.234 0 .078.007.156.02.234.026.078.032.15.02.215-.014.26 0 .443.038.547.013.208.026.351.04.43.012.078.019.156.019.234 0 .117-.007.202-.02.254 0 .052.013.097.04.136 0 .157-.007.274-.02.352 0 .065.013.143.039.234a.132.132 0 0 0-.04.098v.137c-.025.156-.032.234-.019.234.013 0 .02.007.02.02a1.08 1.08 0 0 0-.04.215c.014.09.014.143 0 .156v.058a.388.388 0 0 1 0 .176.45.45 0 0 0 .04.137.586.586 0 0 0-.098.312c-.026.026-.032.059-.02.098.013.04.02.078.02.117l-.078.469c-.026.143-.052.293-.078.45 0 .168-.007.305-.02.41l-.039.253c.013.157.007.254-.02.293-.012.04-.025.091-.038.156a.443.443 0 0 1-.157.157.183.183 0 0 0-.097.136c-.105.04-.183.027-.235-.039a.66.66 0 0 0-.156-.175v-.254a.24.24 0 0 1 .098-.196.977.977 0 0 1-.02-.117c.013-.026.013-.058 0-.097.052-.014.078-.059.078-.137 0-.078.013-.143.04-.195a.272.272 0 0 0 .019-.118c0-.052.006-.104.02-.156.038-.13.052-.202.038-.215-.013-.026-.013-.065 0-.117 0-.065.007-.143.02-.234.026-.091.046-.176.059-.254v-.215c0-.078.006-.17.02-.274a.79.79 0 0 0 .019-.292c-.013-.105-.013-.17 0-.196a.321.321 0 0 0 .02-.097.218.218 0 0 0-.02-.098v-.117a.37.37 0 0 1 .02-.117c.025-.053.025-.098 0-.137v-.43c.012-.117.019-.234.019-.351 0-.183-.007-.306-.02-.372a1.1 1.1 0 0 0-.02-.214 7.17 7.17 0 0 1-.019-.508 3.06 3.06 0 0 0 0-.488c0-.105-.006-.209-.02-.313a.737.737 0 0 0-.058-.293.4.4 0 0 0 0-.176.698.698 0 0 0-.058-.195.18.18 0 0 0 0-.117c-.014-.052-.007-.091.019-.117a7.057 7.057 0 0 0-.078-.274V5.63l-.04-.195c.014-.013.02-.033.02-.059a1.172 1.172 0 0 1-.039-.156c.013-.013.02-.033.02-.059-.065-.13-.091-.208-.078-.234.013-.04.006-.072-.02-.098l-.058-.195c.013-.013.006-.02-.02-.02a.418.418 0 0 0-.02-.215 1.298 1.298 0 0 0-.078-.214c0-.144-.013-.215-.039-.215l-.039-.04a2.945 2.945 0 0 1-.058-.292.394.394 0 0 0-.079-.254.67.67 0 0 0-.038-.332 2.882 2.882 0 0 0-.098-.313 1.285 1.285 0 0 0-.098-.234.174.174 0 0 1-.02-.078.317.317 0 0 1-.156-.137.45.45 0 0 1-.039-.156.455.455 0 0 1 .078-.117c.04-.026.059-.072.059-.137.13-.078.195-.13.195-.156a.165.165 0 0 1 .137.02c.04.012.078.019.117.019zm.742 13.36c.026.038.046.084.059.136.026.039.046.084.059.137.039.09.052.156.039.195a.434.434 0 0 0-.02.137l-.195.195c-.117.091-.215.15-.293.176a.867.867 0 0 1-.274.039.21.21 0 0 1-.117-.04.097.097 0 0 0-.117 0 .976.976 0 0 1-.293-.312.793.793 0 0 1 .04-.37c.051-.092.103-.19.155-.294.066.013.111.007.137-.02a.245.245 0 0 1 .098-.058c.09.052.169.046.234-.02h.156a.243.243 0 0 1 .137 0 .737.737 0 0 0 .156.079c.013-.014.026-.007.04.02z"/></svg>',
  dacha: '<svg viewBox="0 0 74 18"><path d="M5.508 7.914c-.013.17-.02.293-.02.371.013.078.04.137.078.176 0 .17.013.3.04.39.039.079.045.15.019.215.065.105.091.163.078.176-.013 0-.02.013-.02.04.04.064.06.13.06.195a.34.34 0 0 0 .097.175c.013.196.032.313.058.352-.026.104-.032.176-.02.215.014.039.027.071.04.097 0 .118.013.202.039.254.013.04.02.078.02.117 0 .04.006.079.02.118.038.143.051.221.038.234v.02a.39.39 0 0 1 0 .175.19.19 0 0 0 .04.098c.012.026.019.065.019.117.013.052.02.091.02.117a.4.4 0 0 1 0 .176.84.84 0 0 0-.02.156v.41a.957.957 0 0 1 0 .274c-.013.091-.02.143-.02.156a.15.15 0 0 0 .02.059c-.026.104-.04.17-.04.195a.15.15 0 0 0 .02.059.82.82 0 0 0-.078.37c0 .183-.013.313-.039.392-.013.065-.02.136-.02.214a.906.906 0 0 1-.117.196c-.026.013-.039.026-.039.039-.026.13-.045.208-.058.234-.013.013-.02.04-.02.078a1.148 1.148 0 0 0-.098.254c.013.026.02.052.02.078a.256.256 0 0 0-.117.117.247.247 0 0 1-.137.118l-.078.156a.227.227 0 0 1-.059.039 20.6 20.6 0 0 1-.175.273c-.013.026-.013.066 0 .118a.255.255 0 0 0-.118.117.492.492 0 0 1-.058.117c-.117.039-.176.065-.176.078 0 .013-.006.026-.02.04a2.97 2.97 0 0 0-.449.214.928.928 0 0 1-.254.137.446.446 0 0 1-.254.097 1.322 1.322 0 0 0-.214.059c-.026.026-.052.039-.079.039l-.312.04c-.156.051-.247.07-.273.058-.013-.013-.033-.02-.059-.02-.17.026-.26.033-.273.02a.43.43 0 0 1-.176-.078.278.278 0 0 0-.156-.04c-.196-.078-.313-.169-.352-.273a1.664 1.664 0 0 1-.234-.156c-.026-.013-.033-.04-.02-.078-.078 0-.13-.026-.156-.078a.295.295 0 0 0-.117-.098c.013-.065 0-.098-.04-.098-.039-.013-.058-.052-.058-.117a.972.972 0 0 0-.137-.098l-.078-.078c-.078-.182-.104-.293-.078-.332.026-.039.033-.09.02-.156.065-.065.13-.085.195-.059.078.026.17.026.273 0 .183-.026.274.02.274.137 0 .104-.033.176-.098.215.104.208.202.325.293.351.091.105.15.17.176.196a.757.757 0 0 0 .097.039c.118.065.176.11.176.137.065.013.104.026.117.039a.956.956 0 0 1 .098.058c.104.04.24.052.41.04a.37.37 0 0 1 .117-.02c.04 0 .072-.007.098-.02a.19.19 0 0 1 .098-.039.37.37 0 0 0 .117-.02c.078-.025.15-.051.215-.078a.775.775 0 0 0 .195-.117c.117-.013.182-.026.195-.039l.079-.078c.117 0 .182-.013.195-.039a.226.226 0 0 1 .039-.059c.091-.117.143-.169.156-.156.013 0 .02-.006.02-.02.078-.051.123-.097.136-.136a.131.131 0 0 1 .118-.059l.078-.195a.236.236 0 0 1 .136-.137c0-.039.007-.071.02-.097a.491.491 0 0 0 .059-.117.755.755 0 0 1 .078-.215c.039-.104.065-.183.078-.235a.388.388 0 0 1 .117-.136c.013-.066.02-.137.02-.215a.315.315 0 0 1 .078-.176c.052-.182.078-.28.078-.293a.435.435 0 0 0 .039-.195v-.254c.013-.078.02-.156.02-.235a.394.394 0 0 0-.02-.214c.039-.13.052-.209.039-.235a56.824 56.824 0 0 0-.04-.078.649.649 0 0 0 .06-.254 1.62 1.62 0 0 1-.04-.176.083.083 0 0 0 0-.078c-.026-.09-.032-.143-.02-.156.014-.013.014-.033 0-.059a.21.21 0 0 0-.038-.117.642.642 0 0 1-.02-.156v-.117a.313.313 0 0 0 0-.156 1.377 1.377 0 0 1-.078-.293c.013-.04.013-.072 0-.098-.039-.182-.065-.3-.078-.352a.522.522 0 0 0-.04-.195 2.294 2.294 0 0 0-.077-.45.24.24 0 0 0-.04-.136c0-.156-.006-.234-.019-.234s-.02-.007-.02-.02a1.133 1.133 0 0 1-.058-.293l-.059-.273c-.039-.104-.052-.163-.039-.176.013-.026.013-.059 0-.098-.039-.065-.058-.11-.058-.136.013-.04.006-.065-.02-.079a.639.639 0 0 0-.058-.37.424.424 0 0 1-.04-.313c-.038-.17-.071-.254-.097-.254a.227.227 0 0 0-.059-.04c.026-.194.013-.318-.039-.37a.21.21 0 0 1-.02-.195.948.948 0 0 1-.116-.293 1.042 1.042 0 0 0-.079-.235V6.06c.013-.092.013-.15 0-.176l-.039-.117v-.137a.574.574 0 0 0 .02-.137.523.523 0 0 1-.02-.234.164.164 0 0 0-.02-.137c-.051 0-.09.013-.116.04a.605.605 0 0 1-.117.038.248.248 0 0 1-.06.117c-.025.026-.038.072-.038.137a.64.64 0 0 1-.098.078c-.026.013-.032.052-.02.117a.286.286 0 0 0-.136.098l-.078.078a.794.794 0 0 0-.176.196.247.247 0 0 0-.137.117c-.026.039-.058.09-.097.156a1.165 1.165 0 0 1-.176.215.659.659 0 0 0-.117.176c0 .026-.02.045-.059.058a2.79 2.79 0 0 1-.078.196.306.306 0 0 1-.059.078c.013.065-.006.13-.058.195-.04.052-.078.098-.117.137-.105.143-.19.228-.254.254a.541.541 0 0 1-.254.332c-.026.156-.065.26-.117.312a.369.369 0 0 0-.02.117c0 .04-.006.072-.02.098-.09.13-.143.215-.156.254 0 .039-.02.071-.058.098-.013.143-.033.22-.059.234-.013 0-.02.013-.02.039-.038.104-.052.163-.038.176.013.013.019.026.019.039a.685.685 0 0 0-.078.195c.013.026.006.052-.02.078-.013.143-.02.235-.02.274.014.026.014.058 0 .097-.051.091-.07.15-.058.176.026.013.026.033 0 .059.013.09.02.175.02.254a.684.684 0 0 0-.04.214.243.243 0 0 0 0 .137.21.21 0 0 1 .04.117c-.04.144-.059.228-.059.254.026.13.033.202.02.215v.02c0 .156-.007.254-.02.293a.18.18 0 0 0 0 .117c0 .026.013.071.04.136.025.053.038.098.038.137a.822.822 0 0 1-.02.137c0 .065.014.117.04.156.026.143.045.228.058.254a.226.226 0 0 1 .04.059c.052.156.104.254.156.293a.24.24 0 0 1 .117.175.462.462 0 0 1 .176.059.43.43 0 0 0 .136.02c.183-.118.352-.209.508-.274.078-.13.13-.215.156-.254.04-.039.053-.104.04-.195.078-.195.123-.3.136-.313.026-.143.033-.26.02-.351a1.102 1.102 0 0 1 0-.293c.013-.078.02-.156.02-.235a.26.26 0 0 0-.098-.214.604.604 0 0 1 .039-.118.436.436 0 0 0 .058-.156c.065.013.111-.006.137-.058.04-.053.085-.072.137-.059.104.078.169.117.195.117.04 0 .065.02.078.059.026.091.033.15.02.176v.078a1.097 1.097 0 0 1-.04.254v.058a.788.788 0 0 1-.019.293 3.388 3.388 0 0 1-.039.274 2.13 2.13 0 0 0-.039.449l-.078.293a.835.835 0 0 1-.137.254.248.248 0 0 0-.058.117.493.493 0 0 1-.059.117.575.575 0 0 1-.176.137.307.307 0 0 0-.078.058c-.065-.026-.11-.013-.137.04a.295.295 0 0 1-.117.097.928.928 0 0 1-.254.059c-.052.026-.162.039-.332.039a.39.39 0 0 0-.176 0 .32.32 0 0 1-.097-.02c-.13-.039-.202-.071-.215-.097a.245.245 0 0 0-.059-.098c-.09-.117-.15-.17-.175-.156-.013 0-.026-.007-.04-.02a.791.791 0 0 0-.195-.312 3.255 3.255 0 0 0-.117-.293.43.43 0 0 0-.078-.176c.026-.091.032-.143.02-.156-.014-.013-.02-.033-.02-.059a.474.474 0 0 0 0-.195c0-.04.013-.072.039-.098a.953.953 0 0 1-.059-.098.432.432 0 0 1-.02-.136c0-.04.007-.072.02-.098.013-.026.007-.065-.02-.117 0-.13-.006-.202-.019-.215v-.059l.04-.253-.02-.215c0-.026.006-.065.02-.117a.534.534 0 0 0 .019-.118.708.708 0 0 1 0-.234l.058-.176c.027-.065.033-.182.02-.351-.013-.183.02-.306.098-.371.026-.105.039-.19.039-.254 0-.079.006-.15.02-.215a1.63 1.63 0 0 1 .116-.215c.053-.065.079-.11.079-.137a.321.321 0 0 0 .02-.097.471.471 0 0 0 .058-.157.369.369 0 0 0 .02-.117c.077-.182.136-.293.175-.332a.35.35 0 0 0 .059-.215c.117-.117.188-.208.214-.273a.236.236 0 0 1 .137-.137c.04-.117.065-.176.078-.176a.306.306 0 0 0 .078-.058c.066-.091.098-.15.098-.176a.757.757 0 0 1 .04-.098.606.606 0 0 0 .175-.215l.098-.195a3.2 3.2 0 0 1 .195-.254.297.297 0 0 0 .078-.156.306.306 0 0 0 .078-.059.64.64 0 0 0 .098-.078c.052-.104.104-.169.156-.195a.49.49 0 0 1 .117-.195.35.35 0 0 0 .098-.196c.117-.065.176-.11.176-.136.013-.026.039-.033.078-.02 0-.065.02-.104.058-.117a.183.183 0 0 0 .098-.137c.117-.091.182-.143.195-.156l.079-.078c.09-.065.143-.104.156-.117a.64.64 0 0 1 .097-.079.64.64 0 0 0 .04-.156c0-.026.006-.045.019-.058a.83.83 0 0 0 .02-.293v-.157l.039-.156c.013-.052.026-.11.039-.176.052-.169.078-.26.078-.273.013-.156.032-.247.058-.274a.136.136 0 0 0 .04-.136.297.297 0 0 0 .078-.156.25.25 0 0 1 .097-.157c.013-.117.026-.195.04-.234a.434.434 0 0 0 .058-.137.412.412 0 0 0 .137-.195.577.577 0 0 1 .156-.195.389.389 0 0 0 .098-.254.245.245 0 0 1 .097-.059.248.248 0 0 0 .117-.059c.118-.09.183-.136.196-.136a.173.173 0 0 0 .078-.02.436.436 0 0 1 .156-.058.445.445 0 0 0 .176-.098c.13-.04.24-.046.332-.02.091.013.17.013.234 0l.117.079c.04.013.092.02.157.02.117.103.182.175.195.214a.306.306 0 0 1 .059.078c.065.208.058.43-.02.664-.065.13-.124.228-.176.293a.765.765 0 0 0-.097.176.672.672 0 0 0-.235.234c-.078.117-.143.183-.195.196 0 .065-.02.11-.059.136-.039.026-.065.072-.078.137a1.171 1.171 0 0 0-.195.098 2.125 2.125 0 0 1-.117.156c-.013.013-.02.032-.02.058-.091.013-.15.072-.176.176-.13.091-.221.163-.273.215a.255.255 0 0 0-.117.117c-.026.04-.078.065-.157.078a.49.49 0 0 1-.117.196c-.09.065-.15.11-.175.136a.227.227 0 0 1-.06.04c-.012.065-.032.13-.058.195a.822.822 0 0 0-.02.195c0 .182-.006.32-.019.41-.013.091 0 .17.04.235-.04.117-.053.182-.04.195.026 0 .046.013.059.039a.594.594 0 0 1 0 .215c0 .065.006.137.02.215.025.104.045.176.058.215.013.039.033.09.059.156.039.104.052.182.039.234 0 .04.013.085.039.137.039.065.065.117.078.156.013.04.026.072.039.098a.48.48 0 0 1 .02.234c0 .065.025.124.078.176 0 .052.006.098.02.137.012.026.012.065 0 .117l.136.117zm-.313-4.297c.209-.182.352-.312.43-.39l.234-.274.079-.078.078-.117.175-.117a.186.186 0 0 0 .079-.157.521.521 0 0 0 .136-.097.316.316 0 0 0 .078-.176.175.175 0 0 0 .098-.117.269.269 0 0 1 .059-.137c.065-.143.09-.234.078-.273.013-.079.013-.13 0-.157a.306.306 0 0 0-.059-.078.45.45 0 0 1-.156-.039c-.065-.026-.117-.006-.156.059a.508.508 0 0 0-.157.02.217.217 0 0 0-.097.019 1.356 1.356 0 0 0-.293.176.521.521 0 0 1-.137.097.297.297 0 0 1-.078.157c-.04.039-.052.09-.04.156-.103.117-.162.202-.175.254a.245.245 0 0 1-.059.097.882.882 0 0 1-.078.118c-.039.039-.045.065-.02.078.014.013 0 .052-.038.117-.026.052-.026.084 0 .097-.065.13-.098.215-.098.254 0 .04-.006.072-.02.098a.685.685 0 0 0-.078.195c.013.026.02.059.02.098a.53.53 0 0 0-.078.176c.013.026.02.052.02.078.065.013.11 0 .136-.04a.295.295 0 0 1 .117-.097zm4.922 3.496c-.026.157-.058.254-.098.293-.039.04-.052.11-.039.215-.104.13-.156.215-.156.254a.083.083 0 0 1 0 .078.842.842 0 0 1-.136.234c0 .092-.014.144-.04.157a.227.227 0 0 0-.039.058 5.926 5.926 0 0 0-.078.371 1.757 1.757 0 0 0 0 .372.523.523 0 0 0 .235.02.994.994 0 0 1 .195-.02c.221-.013.358-.013.41 0 .117.013.195.02.234.02a.117.117 0 0 0 .079-.08c.013.027.052.047.117.06.065 0 .11-.013.136-.04.066.066.124.111.176.137.052.182.046.287-.02.313a.523.523 0 0 0-.136.097c-.234.078-.371.078-.41 0a6.928 6.928 0 0 0-.371-.058.974.974 0 0 0-.371.039 5.586 5.586 0 0 0-.293.039c-.078 0-.137.02-.176.058 0 .079-.013.15-.04.215a.284.284 0 0 0 .02.176 7.668 7.668 0 0 1-.097.215v.137a.605.605 0 0 0-.04.117c0 .039-.019.072-.058.098a.38.38 0 0 1 0 .292c.052.118.059.176.02.176-.026-.013-.04 0-.04.04.014.051.02.09.02.117 0 .025.007.071.02.136 0 .156-.007.267-.02.332a.726.726 0 0 0-.02.176.771.771 0 0 1 0 .254v.352c.014.09.027.162.04.214a.37.37 0 0 1 .02.118.18.18 0 0 1 0 .117v.117l.038.156a.864.864 0 0 1 .078.156.322.322 0 0 1-.02.098c-.012.04-.006.085.02.137.065.182.091.3.078.351 0 .04.013.091.04.157a.615.615 0 0 1 .078.214c0 .04.006.079.02.118l.077.195c.04.052.072.104.098.156a.315.315 0 0 0 .02.195l.117.157c.117.13.169.195.156.195a.576.576 0 0 0 .176.137c.039.013.058.052.058.117.13.039.248.098.352.176.065-.052.117-.072.156-.059.04.013.072.033.098.059l.078.078a.605.605 0 0 0 .117.039v.137c.013.052.04.078.078.078-.13.09-.215.13-.254.117h-.058c-.117.143-.202.202-.254.176a.267.267 0 0 0-.176-.02c-.078-.09-.137-.143-.176-.156-.026-.013-.045-.04-.058-.078-.183-.13-.326-.195-.43-.195a3.22 3.22 0 0 0-.273-.254 1.458 1.458 0 0 1-.157-.137c0-.13-.013-.195-.039-.195a.307.307 0 0 1-.078-.059.9.9 0 0 1-.078-.313.26.26 0 0 0-.098-.214c.013-.091 0-.157-.039-.196a.458.458 0 0 1-.097-.156.4.4 0 0 1 0-.176.285.285 0 0 0-.02-.175 1.38 1.38 0 0 0-.098-.254c-.013-.013-.02-.026-.02-.04a.307.307 0 0 0-.038-.214.361.361 0 0 1 0-.235 2.688 2.688 0 0 1-.078-.312 1.314 1.314 0 0 1-.02-.215v-.098a.368.368 0 0 0 .02-.117 4.375 4.375 0 0 1-.04-.234v-.293-.117c.014-.04.027-.085.04-.137.013-.143.013-.221 0-.234v-.04-.136a.605.605 0 0 1 .039-.117.307.307 0 0 1-.04-.215.737.737 0 0 0 .04-.235v-.136a.272.272 0 0 0-.02-.118.485.485 0 0 0-.02-.175c0-.026.014-.052.04-.079.039-.156.052-.234.039-.234v-.02c0-.038.006-.09.02-.156a.356.356 0 0 0 .019-.195.486.486 0 0 0-.215.059c-.078.039-.143.032-.195-.02a.245.245 0 0 1-.098.059.574.574 0 0 0-.137.02c-.13.038-.234.07-.312.097a.6.6 0 0 1-.254-.02 1.747 1.747 0 0 0-.176-.234c-.026-.052-.026-.117 0-.195a.573.573 0 0 1 .215-.04c.091-.012.156-.045.195-.097.065.013.13.02.196.02.065-.014.143-.027.234-.04.026-.052.085-.071.176-.058a.548.548 0 0 0 .254-.02c.169-.078.26-.136.273-.175.013-.053.033-.118.059-.196.039-.104.052-.163.039-.176-.013-.026-.013-.058 0-.097a.88.88 0 0 0 .039-.176c.013-.04.006-.065-.02-.078.078-.104.111-.163.098-.176v-.059c.065-.09.098-.15.098-.175 0-.04.02-.065.058-.078-.013-.092 0-.157.04-.196a.908.908 0 0 0 .136-.176c.013-.117.033-.24.059-.37.104-.144.162-.215.175-.215.026 0 .052-.013.079-.04a.605.605 0 0 0 .175-.058.173.173 0 0 1 .078-.02c.052.079.079.137.079.176.013.026.045.052.097.078zm2.676.254l-.117.078a.245.245 0 0 0-.098.059.277.277 0 0 0-.156.039c-.026.013-.065.013-.117 0-.143-.104-.228-.182-.254-.234.026-.052.032-.098.02-.137a.18.18 0 0 1 0-.117c.13-.065.201-.111.214-.137a.131.131 0 0 1 .117-.059.164.164 0 0 1 .02-.136.437.437 0 0 0 .058-.137.71.71 0 0 0 0-.234.307.307 0 0 1 .04-.215.241.241 0 0 1-.04-.137l.04-.156c-.066-.065-.13-.072-.196-.02a.777.777 0 0 1-.195.117 1.594 1.594 0 0 1-.274-.039c-.026-.026-.071-.032-.136-.02a3.715 3.715 0 0 1-.215-.35.36.36 0 0 1 0-.235c.091-.143.156-.221.195-.234a.175.175 0 0 0 .117-.098l.352.039c.078.039.124.059.137.059a.173.173 0 0 1 .078-.02c.039.026.078.059.117.098.052.026.11.032.176.02.013.064.071.11.176.136a.48.48 0 0 0 .058.137.227.227 0 0 1 .04.058c.025.156.045.254.058.293a.307.307 0 0 0 .058.078c.013.144.013.228 0 .254v.04c-.026.182-.039.299-.039.35a.397.397 0 0 1 0 .177.646.646 0 0 0-.078.097c-.013.026-.013.072 0 .137a.19.19 0 0 0-.078.117.248.248 0 0 1-.059.117v.118c0 .039-.006.071-.019.097zm2.168 2.149a1.88 1.88 0 0 0-.04.136c0 .052-.025.091-.077.118-.117.22-.156.423-.117.605.052.195.078.319.078.371 0 .04.013.085.039.137.039.039.058.078.058.117.013.04.04.059.079.059 0 .104.039.175.117.214 0 .053.02.092.058.118.04.013.059.052.059.117a.255.255 0 0 1 .117.117c.026.04.072.072.137.098.052.065.09.11.117.136.039.026.072.053.098.079l.175.156.235.234c.039.117.123.222.254.313.143.13.234.214.273.254.04.026.078.065.117.117-.013.117.033.195.137.234a.496.496 0 0 0 .098.254l.195.195c0 .078.02.143.059.196.039.039.078.084.117.136.026.144.045.228.058.254l.059.059a3.187 3.187 0 0 1 .078.703c-.026.117-.032.195-.02.234.014.026.02.052.02.079-.039.195-.085.332-.137.41-.013.039-.032.084-.058.136a.434.434 0 0 0-.02.137c-.17.17-.26.287-.273.352-.182.078-.287.143-.313.195l-.097.098a.636.636 0 0 1-.078.097 1.64 1.64 0 0 0-.215.117c0 .014-.013.014-.04 0-.117.066-.22.111-.312.137-.156.026-.24.046-.254.059-.013.013-.026.02-.039.02a.595.595 0 0 0-.215 0 .207.207 0 0 1-.175 0c-.118-.079-.202-.118-.254-.118a.218.218 0 0 1-.098-.02c-.091-.064-.15-.097-.176-.097a.174.174 0 0 1-.078-.02 1.209 1.209 0 0 0-.195-.195c-.026 0-.046-.007-.059-.02a3.16 3.16 0 0 1-.137-.234.183.183 0 0 0-.136-.098 3.82 3.82 0 0 0-.04-.175.19.19 0 0 0-.078-.117 2.727 2.727 0 0 0-.058-.313c0-.039.006-.085.02-.137v-.312a.284.284 0 0 0-.02-.176c.052-.039.078-.124.078-.254.065 0 .098-.02.098-.058l.039-.157a.97.97 0 0 0 .195-.136l.156-.118c.078-.09.13-.136.157-.136.039 0 .052-.013.039-.04.078.014.13.014.156 0 .039-.012.065-.032.078-.058a.84.84 0 0 0 .215.04.27.27 0 0 0 .137-.06c.026.04.052.06.078.06a.333.333 0 0 1 .136-.02l.215.117c.026 0 .04.013.04.039.064.09.136.176.214.254a.558.558 0 0 1 .195.234.495.495 0 0 1-.117.234c-.039.053-.09.111-.156.176a.494.494 0 0 1-.195 0 2.242 2.242 0 0 0-.215-.039.586.586 0 0 1-.137-.332.535.535 0 0 1-.117-.02c-.04-.025-.098-.032-.176-.019a.518.518 0 0 0-.273.117.595.595 0 0 1-.196.137 4.35 4.35 0 0 0-.078.332.892.892 0 0 0 .04.508.19.19 0 0 1 .038.098.247.247 0 0 0 .098.058c.04.013.052.052.04.117a.524.524 0 0 1 .136.098c.039.039.078.072.117.098.17.065.28.117.332.156a.363.363 0 0 0 .234.078c.183-.04.287-.065.313-.078a.3.3 0 0 0 .117-.04.977.977 0 0 1 .137-.097c.026 0 .052-.013.078-.039.052-.078.085-.117.098-.117a.174.174 0 0 0 .078-.02c.052-.039.09-.071.117-.097a.64.64 0 0 0 .098-.078c0-.053.013-.092.039-.118a.64.64 0 0 0 .078-.097c.065-.104.091-.183.078-.235 0-.052.02-.09.059-.117.013-.156.02-.306.02-.45a.633.633 0 0 0-.118-.39c-.013-.13-.026-.201-.04-.215l-.058-.058a2.198 2.198 0 0 1-.02-.156.173.173 0 0 0-.019-.079 2.848 2.848 0 0 0-.215-.273.428.428 0 0 1-.078-.176c-.065-.09-.104-.136-.117-.136a.228.228 0 0 1-.04-.06 1.192 1.192 0 0 0-.097-.155.228.228 0 0 1-.039-.059c-.065 0-.11-.065-.137-.195-.104-.065-.162-.11-.175-.137-.157-.195-.287-.319-.39-.371a2.135 2.135 0 0 0-.157-.176.739.739 0 0 0-.195-.137c-.013-.09-.053-.15-.118-.175a.263.263 0 0 1-.097-.176 2.469 2.469 0 0 1-.371-.45 2.291 2.291 0 0 0-.215-.35 2.206 2.206 0 0 0-.04-.274 3.82 3.82 0 0 1-.038-.176c0-.13-.007-.202-.02-.215-.013-.013-.02-.032-.02-.059l.02-.234c.013 0 .02-.013.02-.039a1.352 1.352 0 0 0-.04-.156.26.26 0 0 1 .06-.156.74.74 0 0 1 .077-.196c.026-.039.026-.071 0-.097a.64.64 0 0 1 .098-.079c.039-.026.052-.071.039-.136.234-.104.397-.228.488-.371a.864.864 0 0 0 .157-.079.441.441 0 0 1 .195-.078.897.897 0 0 0 .234-.117c.04-.039.072-.045.098-.02.104-.025.17-.038.195-.038.04 0 .072.013.098.039.117.013.176.013.176 0 .013-.026.032-.033.058-.02.17.013.28.033.332.059.065.013.13.02.196.02.026.038.09.07.195.097.104.078.17.137.195.176.026.039.065.071.117.097.052.078.085.124.098.137l.078.04c.052.168.091.266.117.292.04.026.046.046.02.059a.349.349 0 0 1 .098.097l.117.118c-.013.117-.013.182 0 .195.013 0 .02.013.02.039 0 .065-.02.137-.06.215 0 .09-.006.15-.019.176l-.039.078a1.79 1.79 0 0 0-.059.214.25.25 0 0 1-.097.157c-.078.13-.15.215-.215.254-.065.039-.13.084-.195.136a5.875 5.875 0 0 1-.254.059c-.065.013-.13.033-.196.059-.117 0-.182.006-.195.02a.15.15 0 0 1-.058-.02.246.246 0 0 1-.098-.059.247.247 0 0 0-.117-.059.38.38 0 0 1 0-.293.361.361 0 0 1 .195-.175c.091.013.143.02.156.02a.173.173 0 0 1 .078-.02c.118-.013.19-.02.215-.02l.078-.039c.117-.104.17-.156.157-.156-.013-.013-.007-.033.02-.059.064-.13.103-.195.116-.195.013-.013.02-.026.02-.04a.245.245 0 0 0-.04-.194l-.077-.196a.314.314 0 0 1-.04-.137.218.218 0 0 0-.019-.097c-.091-.13-.17-.209-.234-.235a.661.661 0 0 1-.176-.156c-.13 0-.202-.006-.215-.02 0-.025-.013-.038-.039-.038a.338.338 0 0 0-.195-.02h-.176c-.195 0-.32.013-.371.04a1.07 1.07 0 0 0-.137.058 1.073 1.073 0 0 0-.273.156c-.04.026-.052.059-.04.098h-.097zm15.586 5.976c-.065.104-.11.156-.137.156-.013 0-.026.014-.039.04-.104.078-.17.123-.195.136-.13.013-.195.026-.195.04h-.04c-.182-.066-.3-.092-.351-.079a.22.22 0 0 1-.156-.02l-.235-.078a.762.762 0 0 1-.176-.097.146.146 0 0 0-.156-.059c-.065-.143-.17-.221-.312-.234a1.287 1.287 0 0 1-.117-.215c-.014-.039-.046-.059-.098-.059-.091.105-.15.17-.176.196a.31.31 0 0 1-.059.078c-.117.091-.188.137-.214.137a5.323 5.323 0 0 1-.313.254 1.38 1.38 0 0 1-.371.156.19.19 0 0 1-.117.078.188.188 0 0 0-.098.078c-.13-.013-.228.013-.293.078-.052-.026-.097-.032-.137-.02a.435.435 0 0 1-.136.06c-.091-.014-.15-.014-.176 0-.013.012-.033.019-.059.019a1.469 1.469 0 0 1-.253-.059h-.079c-.156 0-.26-.013-.312-.039-.04-.013-.085-.007-.137.02-.078-.079-.137-.118-.176-.118a1.053 1.053 0 0 1-.136-.058 1.19 1.19 0 0 1-.215-.117.607.607 0 0 0-.254-.098 4.281 4.281 0 0 0-.195-.254.348.348 0 0 0-.098-.098.522.522 0 0 1-.098-.136.596.596 0 0 1-.156-.137c-.013-.026-.046-.046-.098-.059a.277.277 0 0 0-.039-.156.782.782 0 0 0-.097-.117l-.078-.234a.309.309 0 0 0-.118-.196.186.186 0 0 0-.058-.176.609.609 0 0 1-.078-.214c0-.144-.013-.228-.04-.254a.366.366 0 0 1-.019-.117c.026-.157.033-.248.02-.274a.32.32 0 0 1-.02-.098c0-.065.006-.117.02-.156a.605.605 0 0 1 .039-.117c.013-.065.02-.137.02-.215 0-.078.019-.143.058-.195v-.195a.309.309 0 0 1 .058-.079.76.76 0 0 0 .059-.156c.013-.052.033-.11.059-.176.104-.169.169-.3.195-.39a.74.74 0 0 1 .156-.235c.078-.104.13-.175.156-.214a.298.298 0 0 1 .157-.079c.078-.117.13-.182.156-.195.026-.013.032-.033.02-.059a.49.49 0 0 0 .195-.117l.156-.156a.439.439 0 0 0 .156-.059c.052-.039.098-.071.137-.097.143-.013.221-.026.234-.04.026-.025.052-.025.078 0 .066-.064.15-.084.254-.058.104.013.228.013.371 0 .196-.052.346-.065.45-.039.117.013.234.033.351.059.143.078.267.13.371.156.091.078.15.13.176.156.026.013.059.02.098.02.026.065.065.104.117.117.052 0 .084.033.098.098.117.065.182.104.195.117.013.013.026.02.039.02a1.61 1.61 0 0 0 .176-.196.94.94 0 0 0 .058-.098c.026-.026.072-.039.137-.039a.278.278 0 0 0 .156-.039c.117-.039.183-.045.196-.02.026.014.065.02.117.02.143.117.234.221.273.313a.62.62 0 0 0 .176.234c.026.065.046.143.059.234.026.079.039.17.039.274.013.143.02.24.02.293l-.02.37c0 .131-.007.255-.02.372 0 .117-.013.228-.039.332-.039.17-.065.267-.078.293a2.44 2.44 0 0 0-.156.352c-.04.117-.072.182-.098.195a.228.228 0 0 0-.039.059.432.432 0 0 0-.059.136c-.013.04-.045.072-.097.098a3.926 3.926 0 0 0-.117.273c-.014.04-.014.072 0 .098.078.143.117.234.117.273.013.04.032.072.058.098a.247.247 0 0 0 .098.059.245.245 0 0 1 .098.058c.104.078.156.124.156.137h.039a.475.475 0 0 0 .156.117.607.607 0 0 1 .117.04c.144.025.222.045.235.058a.322.322 0 0 0 .097-.02c.105-.013.176-.026.215-.039.04-.026.091-.026.157 0 .13.104.195.176.195.215 0 .026.013.052.039.078zm-2.95-4.258a2.219 2.219 0 0 0-.214-.195.808.808 0 0 0-.156-.117 2.34 2.34 0 0 1-.332-.195 2.523 2.523 0 0 0-.235-.059 2.021 2.021 0 0 0-.137-.059c-.065-.026-.104-.026-.117 0-.104.013-.162.02-.175.02-.014-.013-.033-.013-.06 0a8.172 8.172 0 0 0-.37.059.596.596 0 0 1-.215 0c-.065.039-.137.078-.215.117a.52.52 0 0 0-.176.117c-.156.091-.273.17-.351.234a.469.469 0 0 0-.176.235c-.078.09-.13.156-.156.195a1.06 1.06 0 0 1-.059.137.434.434 0 0 0-.058.136c-.014.04-.046.072-.098.098a.437.437 0 0 1-.059.156.496.496 0 0 1-.058.117l-.04.157c0 .039-.012.071-.038.097a.21.21 0 0 1-.02.196.518.518 0 0 0-.02.254c-.039.143-.058.254-.058.332a.83.83 0 0 1 0 .254c.052.182.091.299.117.351a.32.32 0 0 1 .04.176c.103.13.188.3.253.508a.537.537 0 0 1 .156.136c.04.04.072.105.098.196.104.09.163.143.176.156.078.078.117.13.117.156a.23.23 0 0 0 .059.04c.13.064.208.097.234.097.026 0 .052.02.078.059.091.013.17.039.234.078.079.039.15.084.215.136.13-.026.209-.026.235 0 .039.013.071.033.097.059a.299.299 0 0 1 .117-.04c.04 0 .092.007.157.02.078 0 .13-.006.156-.02a.94.94 0 0 0 .098-.058c.039-.013.11-.02.215-.02a.642.642 0 0 0 .195-.097c.026-.039.052-.045.078-.02.104-.104.176-.156.215-.156.039 0 .071-.013.097-.039.091-.104.157-.156.196-.156l.175-.176a.173.173 0 0 0 .02-.078.2.2 0 0 0 .156-.176.532.532 0 0 1 .137-.234l-.078-.273c-.04-.027-.059-.06-.059-.098a.366.366 0 0 0-.02-.117c-.025-.117-.051-.19-.077-.215a1.239 1.239 0 0 1-.078-.352.549.549 0 0 0-.02-.254 1.359 1.359 0 0 1-.059-.234c.013-.026.013-.072 0-.137 0-.09-.006-.175-.02-.254v-.254-.234a.523.523 0 0 0-.038-.195c.065-.13.09-.209.078-.235-.013-.026-.013-.058 0-.097-.052-.143-.104-.222-.156-.235zm.645.489c0 .052-.006.15-.02.293 0 .13.014.221.04.273-.026.052-.033.098-.02.137.013.039.02.078.02.117.013.052.026.098.039.137a.133.133 0 0 1 .039.097.666.666 0 0 0 0 .235.6.6 0 0 1 .039.117.49.49 0 0 0 0 .195c.013.065.02.11.02.137a.245.245 0 0 1 .058.098.247.247 0 0 1 .059.117c.065.013.097-.007.097-.059 0-.065.033-.104.098-.117-.026-.065-.02-.117.02-.156a.34.34 0 0 0 .097-.176c0-.143.013-.234.04-.273a.492.492 0 0 0 .058-.118c.039-.169.058-.3.058-.39v-.176c0-.117-.006-.182-.02-.195v-.079c0-.13-.006-.227-.019-.292a.434.434 0 0 0-.039-.196.258.258 0 0 0-.039-.234l-.137-.156c0-.013-.006-.02-.02-.02-.025.04-.058.059-.097.059-.026-.013-.065.02-.117.097a.387.387 0 0 1-.117.137c-.052.04-.065.091-.04.156l-.097.235zm14.57 4.199a2.049 2.049 0 0 0-.097.215c0 .039-.013.071-.04.097.027.04.027.072 0 .098a.24.24 0 0 0-.038.137.189.189 0 0 0-.098.078.246.246 0 0 1-.059.098.845.845 0 0 0-.234.136 3.957 3.957 0 0 0-.176.04c-.039.012-.097.025-.175.038-.066 0-.144.007-.235.02-.091.026-.163.02-.215-.02-.065-.065-.11-.09-.136-.078-.026.013-.052.007-.078-.02a.911.911 0 0 1-.235-.155.46.46 0 0 0-.156-.098c-.13-.13-.215-.195-.254-.195-.052-.26-.137-.437-.254-.528-.026-.117-.065-.195-.117-.234l-.117-.254c-.04-.13-.078-.215-.117-.254a1.029 1.029 0 0 0-.098-.156c-.13.039-.196.065-.196.078 0 .013-.012.02-.039.02a.537.537 0 0 1-.156.136c-.065.026-.13.059-.195.098a1.1 1.1 0 0 1-.234.176c-.079.039-.157.084-.235.136-.104.026-.176.065-.215.117-.026.053-.065.066-.117.04-.195.065-.325.11-.39.136l-.196.078c-.104-.026-.17-.032-.195-.02a.605.605 0 0 1-.117.04.479.479 0 0 1-.176-.04c-.052-.025-.098-.025-.137 0a1.71 1.71 0 0 0-.351-.194.317.317 0 0 1-.157-.137c-.13.013-.202.006-.215-.02a.132.132 0 0 0-.039-.097l-.312-.313a3.24 3.24 0 0 0-.195-.215.66.66 0 0 0-.137-.273.177.177 0 0 1 0-.195 14.192 14.192 0 0 1-.117-.333.216.216 0 0 1 .039-.214.696.696 0 0 0-.02-.371c-.026-.118 0-.19.078-.215a.368.368 0 0 1 .02-.215c.026-.052.059-.104.098-.156a.962.962 0 0 0 .058-.235.248.248 0 0 1 .059-.117c.026-.039.052-.085.078-.137l.078-.156a.458.458 0 0 1 .098-.156.186.186 0 0 0 .058-.176c.104-.117.189-.189.254-.215a.236.236 0 0 0 .137-.137c.091 0 .156-.02.195-.058.04-.052.104-.078.196-.078a.773.773 0 0 1 .234-.176l.254-.078c.13-.052.202-.072.215-.059a.15.15 0 0 0 .058-.02c.091-.025.15-.045.176-.058a.76.76 0 0 0 .098-.039.396.396 0 0 1 .175 0c.066 0 .124-.02.176-.059a.524.524 0 0 0 .235.02.313.313 0 0 1 .156 0l.234.04c-.026-.157-.032-.235-.02-.235.027 0 .04-.013.04-.04l-.04-.156a.164.164 0 0 1 .02-.136.448.448 0 0 1-.058-.235.63.63 0 0 1 .039-.234.786.786 0 0 1-.059-.313v-.254a.322.322 0 0 0 .02-.097.322.322 0 0 0-.02-.098v-.117c-.026-.091-.032-.143-.02-.156l.04-.078c-.066-.183-.091-.32-.078-.41.012-.105.012-.17 0-.196a.18.18 0 0 1 0-.117c.052-.13.084-.202.097-.215.026-.026.026-.052 0-.078l.059-.215.039-.117a.388.388 0 0 0 .039-.176c.013-.156.039-.254.078-.293a.285.285 0 0 0 .059-.176.47.47 0 0 0 .058-.156.244.244 0 0 1 .059-.097c-.026-.053-.02-.092.02-.118.038-.026.051-.071.038-.136a.247.247 0 0 0 .137-.118c.04-.052.078-.11.117-.175.052 0 .085-.013.098-.04A.248.248 0 0 1 40.078 6l.156-.078.078-.078c.157.013.254.026.294.039.038.013.065.039.078.078.078-.013.123 0 .136.039.026.04.065.059.117.059.04.078.066.123.079.136.026 0 .045.013.058.04.052.182.085.312.098.39.013.078.052.13.117.156.04.143.065.215.078.215.04.117.052.182.04.195l-.02.04c.065.143.084.22.058.234-.026 0-.039.02-.039.058a.304.304 0 0 1 0 .215.245.245 0 0 0 .04.196c-.027.169-.027.267 0 .293.038.013.032.032-.02.058.039.156.058.28.058.371.013.078.02.15.02.215a.313.313 0 0 0 0 .156c.013.04.02.072.02.098a.322.322 0 0 1-.02.098.18.18 0 0 0 0 .117c.026.039.032.084.02.137v.097c-.04.156-.053.248-.04.274.013.026.007.058-.02.097-.012.117-.025.176-.038.176v.04c.013.103.006.168-.02.194-.013.013-.02.033-.02.06a.218.218 0 0 0-.019.097c.013.026.02.065.02.117a.322.322 0 0 1-.02.098.369.369 0 0 0-.02.117c0 .117-.032.189-.097.215a.285.285 0 0 1 .02.175c0 .053.006.104.02.157-.053.09-.073.143-.06.156.014.013.014.032 0 .058a.132.132 0 0 0-.039.098.37.37 0 0 1-.02.117c-.064.157-.097.241-.097.254-.039.156-.058.241-.058.254.013.013.02.033.02.059-.066.13-.105.221-.118.273a.438.438 0 0 1-.059.137 1.212 1.212 0 0 1-.058.312 2.753 2.753 0 0 1-.059.196.297.297 0 0 1-.078.156.423.423 0 0 0-.078.098 1.56 1.56 0 0 0-.059.195c.013 0 .013.006 0 .02a1.126 1.126 0 0 0-.097.195c.013 0 .013.013 0 .039l-.157.195c0 .117.026.195.079.235 0 .065.013.117.039.156a.636.636 0 0 1 .078.097.34.34 0 0 0 .02.254c.038.065.09.111.156.137a.87.87 0 0 1 .078.215c0 .026.026.045.078.058.09.196.156.345.195.45a.568.568 0 0 0 .215.215l.098.097a.64.64 0 0 0 .097.078.88.88 0 0 1 .215.137.13.13 0 0 1 .117-.02c.052.026.098.04.137.04l.234-.098a1.075 1.075 0 0 1 .02-.371c.026-.091.11-.137.254-.137a.248.248 0 0 0 .117-.059c.04-.025.085-.025.137 0 .026.105.052.163.078.176.039.013.071.033.097.059zM39.63 8.578c.026.078.032.13.02.156-.014.013-.02.033-.02.059 0 .104.006.215.02.332.012.104.019.202.019.293-.013.143-.007.273.02.39a.48.48 0 0 1 0 .274c.026.091.039.156.039.195 0 .026-.013.052-.04.079.027.09.046.15.06.175.012.026.006.065-.02.117.026.118.045.196.058.235a.648.648 0 0 1 .078.098c.052.156.111.26.176.312.078.039.156.085.234.137.04.117.052.188.04.215a.15.15 0 0 0-.02.058.636.636 0 0 1-.098.078.64.64 0 0 1-.097.078c-.157.04-.235.072-.235.098a.479.479 0 0 0-.039.176c.013.039.033.084.059.137.026.065.045.123.058.175.013.04 0 .085-.039.137.052.156.091.267.117.332.04.065.053.13.04.195l.156.157c.026-.104.039-.202.039-.293.052-.144.091-.222.117-.235.04-.013.052-.052.04-.117.064-.039.097-.104.097-.195a1.34 1.34 0 0 0-.02-.254c.091-.17.137-.293.137-.371a.35.35 0 0 1 .098-.196 1.006 1.006 0 0 1-.02-.253.307.307 0 0 1 .059-.079.21.21 0 0 0 .039-.117.395.395 0 0 0 .02-.215v-.214c.012-.066.025-.118.038-.157a.166.166 0 0 0 0-.156c.04-.104.052-.17.04-.195a.217.217 0 0 1-.02-.098c.052-.104.072-.163.059-.176v-.078c.052-.156.071-.267.058-.332V9.36c.013-.09.013-.15 0-.175a.083.083 0 0 1 0-.079 4.138 4.138 0 0 1-.02-.273.485.485 0 0 0-.019-.176.174.174 0 0 1-.02-.078c.027-.026.033-.065.02-.117-.013-.065-.007-.11.02-.137-.052-.039-.079-.11-.079-.215a.317.317 0 0 1-.058-.195.574.574 0 0 0-.04-.215c.066-.065.085-.136.06-.215a6.132 6.132 0 0 1-.079-.254v-.175c.013-.04.013-.072 0-.098a2.521 2.521 0 0 0-.136-.195c0-.026-.014-.046-.04-.059.014-.104-.006-.17-.058-.195a1.466 1.466 0 0 1-.156-.137.175.175 0 0 0-.118.098.349.349 0 0 1-.097.097 1.06 1.06 0 0 0-.059.137.245.245 0 0 1-.058.098c0 .065-.02.117-.059.156-.04.026-.04.065 0 .117-.052.13-.091.215-.117.254a.248.248 0 0 0-.059.117.347.347 0 0 0-.039.157c0 .052-.006.11-.02.175a1.08 1.08 0 0 0-.097.215.296.296 0 0 0 .02.235.337.337 0 0 0-.02.195c.013.052 0 .104-.04.156zm-.098 5.762a.567.567 0 0 0 .059-.078 1.92 1.92 0 0 0 .137-.157 2.299 2.299 0 0 0-.098-.273.503.503 0 0 1-.02-.234.433.433 0 0 1-.058-.137.436.436 0 0 0-.059-.137 3.633 3.633 0 0 1-.039-.293.083.083 0 0 0 0-.078.694.694 0 0 0-.059-.176.995.995 0 0 1-.019-.195v-.215a1.382 1.382 0 0 0-.059-.234v-.156c-.026-.027-.045-.085-.058-.176a1.935 1.935 0 0 1-.02-.274.316.316 0 0 1-.156 0c-.039-.026-.091-.026-.156 0a.64.64 0 0 1-.157-.039c-.065-.039-.11-.052-.136-.039a1.772 1.772 0 0 0-.313.098.978.978 0 0 0-.234.098c-.052-.027-.091-.027-.117 0-.026.013-.059.006-.098-.02a.463.463 0 0 1-.215.078c-.09.091-.15.13-.175.117-.014-.013-.046-.02-.098-.02l-.117.118a.297.297 0 0 1-.157.078.293.293 0 0 1-.175.176.186.186 0 0 1-.078.156.308.308 0 0 0-.079.117.437.437 0 0 0-.058.137c-.013.04-.046.072-.098.098a.263.263 0 0 1-.078.234.419.419 0 0 0-.137.234.99.99 0 0 1-.039.332.346.346 0 0 0-.039.157c.026.182.033.325.02.43 0 .104.013.208.039.312l.078.078.078.078c.026.078.052.124.078.137.04.013.059.032.059.058a.666.666 0 0 0 .097.215.453.453 0 0 0 .117.078.249.249 0 0 1 .118.059c.195.078.312.15.351.215.065 0 .117.013.157.039a.57.57 0 0 0 .136.02.83.83 0 0 0 .254 0c.078-.014.163-.027.254-.04.065-.039.11-.065.137-.078a.304.304 0 0 1 .078-.058.79.79 0 0 0 .234-.078.433.433 0 0 1 .157-.059.773.773 0 0 1 .351-.195c.013-.065.04-.111.078-.137a.295.295 0 0 0 .098-.117.446.446 0 0 0 .137-.117.637.637 0 0 1 .078-.098l.02-.04zM50 15.492c-.065.104-.11.156-.137.156-.013 0-.026.014-.039.04-.104.078-.17.123-.195.136-.13.013-.195.026-.195.04h-.04c-.182-.066-.299-.092-.351-.079a.22.22 0 0 1-.156-.02l-.235-.078a.76.76 0 0 1-.175-.097.146.146 0 0 0-.157-.059c-.065-.143-.169-.221-.312-.234a1.287 1.287 0 0 1-.117-.215c-.013-.039-.046-.059-.098-.059-.091.105-.15.17-.176.196a.307.307 0 0 1-.058.078c-.118.091-.19.137-.215.137a5.323 5.323 0 0 1-.313.254 1.381 1.381 0 0 1-.37.156.19.19 0 0 1-.118.078.188.188 0 0 0-.098.078c-.13-.013-.228.013-.293.078-.052-.026-.097-.032-.136-.02a.434.434 0 0 1-.137.06c-.091-.014-.15-.014-.176 0-.013.012-.032.019-.059.019a1.471 1.471 0 0 1-.253-.059h-.078c-.157 0-.26-.013-.313-.039-.04-.013-.085-.007-.137.02-.078-.079-.136-.118-.175-.118a1.06 1.06 0 0 1-.137-.058 1.197 1.197 0 0 1-.215-.117.606.606 0 0 0-.254-.098 4.281 4.281 0 0 0-.195-.254.348.348 0 0 0-.098-.098.52.52 0 0 1-.098-.136.597.597 0 0 1-.156-.137c-.013-.026-.045-.046-.097-.059a.277.277 0 0 0-.04-.156.782.782 0 0 0-.097-.117l-.078-.234a.31.31 0 0 0-.117-.196.186.186 0 0 0-.06-.176.609.609 0 0 1-.077-.214c0-.144-.013-.228-.04-.254a.369.369 0 0 1-.019-.117c.026-.157.033-.248.02-.274a.322.322 0 0 1-.02-.098c0-.065.007-.117.02-.156a.605.605 0 0 1 .039-.117 1.09 1.09 0 0 0 .02-.215c0-.078.019-.143.058-.195v-.195a.304.304 0 0 1 .059-.079.772.772 0 0 0 .058-.156c.013-.052.033-.11.059-.176.104-.169.169-.3.195-.39a.738.738 0 0 1 .156-.235c.078-.104.13-.175.157-.214a.297.297 0 0 1 .156-.079c.078-.117.13-.182.156-.195.026-.013.032-.033.02-.059a.49.49 0 0 0 .195-.117l.156-.156a.438.438 0 0 0 .156-.059 3.16 3.16 0 0 1 .137-.097c.143-.013.221-.026.234-.04.026-.025.052-.025.078 0 .066-.064.15-.084.254-.058.105.013.228.013.371 0 .196-.052.346-.065.45-.039.117.013.234.033.351.059.144.078.267.13.371.156.091.078.15.13.176.156.026.013.059.02.098.02.026.065.065.104.117.117.052 0 .085.033.098.098.117.065.182.104.195.117.013.013.026.02.04.02.09-.092.149-.157.175-.196a.94.94 0 0 0 .058-.098c.026-.026.072-.039.137-.039a.278.278 0 0 0 .156-.039c.118-.039.183-.045.196-.02.026.014.065.02.117.02.143.117.234.221.273.313a.62.62 0 0 0 .176.234c.026.065.046.143.059.234.026.079.039.17.039.274.013.143.02.24.02.293l-.02.37c0 .131-.007.255-.02.372 0 .117-.013.228-.039.332-.039.17-.065.267-.078.293-.091.182-.143.3-.156.352-.04.117-.072.182-.098.195a.225.225 0 0 0-.039.059.432.432 0 0 0-.059.136c-.012.04-.045.072-.097.098a3.905 3.905 0 0 0-.117.273c-.013.04-.013.072 0 .098.078.143.117.234.117.273.013.04.032.072.058.098a.247.247 0 0 0 .098.059c.04.013.072.032.098.058.104.078.156.124.156.137h.04a.475.475 0 0 0 .155.117.605.605 0 0 1 .117.04c.144.025.222.045.235.058a.321.321 0 0 0 .098-.02c.104-.013.175-.026.214-.039.04-.026.091-.026.157 0 .13.104.195.176.195.215 0 .026.013.052.039.078zm-2.95-4.258a2.219 2.219 0 0 0-.214-.195.805.805 0 0 0-.156-.117 2.337 2.337 0 0 1-.332-.195 2.529 2.529 0 0 0-.235-.059 2.012 2.012 0 0 0-.136-.059c-.066-.026-.105-.026-.118 0-.104.013-.162.02-.175.02-.013-.013-.033-.013-.059 0a8.172 8.172 0 0 0-.371.059.595.595 0 0 1-.215 0c-.065.039-.137.078-.215.117a.52.52 0 0 0-.176.117c-.156.091-.273.17-.351.234a.469.469 0 0 0-.176.235c-.078.09-.13.156-.156.195a1.06 1.06 0 0 1-.059.137.434.434 0 0 0-.058.136c-.013.04-.046.072-.098.098a.437.437 0 0 1-.059.156.496.496 0 0 1-.058.117 89.09 89.09 0 0 1-.04.157c0 .039-.012.071-.038.097a.21.21 0 0 1-.02.196.517.517 0 0 0-.02.254 1.369 1.369 0 0 0-.058.332.83.83 0 0 1 0 .254c.052.182.091.299.117.351a.32.32 0 0 1 .04.176c.103.13.188.3.253.508a.535.535 0 0 1 .156.136c.04.04.072.105.098.196.104.09.163.143.176.156.078.078.117.13.117.156a.226.226 0 0 0 .059.04c.13.064.208.097.234.097.026 0 .052.02.078.059.091.013.17.039.235.078.078.039.15.084.214.136.13-.026.209-.026.235 0 .039.013.071.033.097.059a.299.299 0 0 1 .118-.04.84.84 0 0 1 .156.02c.078 0 .13-.006.156-.02a.94.94 0 0 0 .098-.058c.039-.013.11-.02.215-.02a.64.64 0 0 0 .195-.097c.026-.039.052-.045.078-.02.104-.104.176-.156.215-.156a.133.133 0 0 0 .098-.039c.09-.104.156-.156.195-.156l.176-.176a.173.173 0 0 0 .02-.078.2.2 0 0 0 .155-.176.532.532 0 0 1 .137-.234l-.078-.273c-.04-.027-.059-.06-.059-.098a.369.369 0 0 0-.02-.117c-.025-.117-.051-.19-.077-.215a1.242 1.242 0 0 1-.078-.352.549.549 0 0 0-.02-.254 1.359 1.359 0 0 1-.059-.234c.014-.026.014-.072 0-.137 0-.09-.006-.175-.019-.254v-.254-.234a.523.523 0 0 0-.04-.195c.066-.13.092-.209.079-.235-.013-.026-.013-.058 0-.097-.052-.143-.104-.222-.156-.235zm.645.489c0 .052-.006.15-.02.293 0 .13.014.221.04.273-.026.052-.033.098-.02.137.013.039.02.078.02.117.013.052.026.098.039.137.026.026.039.058.039.097a.66.66 0 0 0 0 .235.607.607 0 0 1 .039.117.49.49 0 0 0 0 .195c.013.065.02.11.02.137a.247.247 0 0 1 .058.098.248.248 0 0 1 .059.117c.065.013.097-.007.097-.059 0-.065.033-.104.098-.117-.026-.065-.02-.117.02-.156a.34.34 0 0 0 .097-.176c0-.143.013-.234.04-.273a.492.492 0 0 0 .058-.118c.039-.169.059-.3.059-.39v-.176c0-.117-.007-.182-.02-.195v-.079c0-.13-.007-.227-.02-.292a.435.435 0 0 0-.039-.196.258.258 0 0 0-.039-.234l-.136-.156c0-.013-.007-.02-.02-.02-.026.04-.059.059-.098.059-.026-.013-.065.02-.117.097a.386.386 0 0 1-.117.137c-.052.04-.065.091-.039.156l-.098.235zM54.004 16l-.41.059c.013-.013 0-.02-.04-.02h-.234c-.039 0-.058-.013-.058-.039a.394.394 0 0 0-.215-.02.877.877 0 0 1-.234-.039l-.235-.078a.488.488 0 0 0-.117-.058c-.17-.091-.286-.137-.352-.137a1.632 1.632 0 0 1-.215-.117.15.15 0 0 0-.019-.059 5.729 5.729 0 0 0-.234-.137l-.078-.078c-.053-.065-.098-.104-.137-.117l-.078-.078c-.078-.13-.13-.202-.157-.215a.246.246 0 0 1-.058-.098 2.23 2.23 0 0 0-.176-.214.685.685 0 0 1-.098-.196c-.078-.09-.117-.162-.117-.214a.887.887 0 0 1-.136-.274.97.97 0 0 1-.02-.332 1.597 1.597 0 0 0-.04-.273.57.57 0 0 0-.019-.137c.013-.104.013-.163 0-.176a.173.173 0 0 1-.02-.078c.04-.117.053-.195.04-.234 0-.04.013-.072.039-.098a.82.82 0 0 1 0-.254l.039-.195c.052-.026.078-.11.078-.254.091-.13.143-.202.156-.215.026-.013.033-.046.02-.098.104-.13.189-.214.254-.254a.316.316 0 0 0 .136-.195l.176-.176c.117-.09.19-.156.215-.195.17-.117.274-.202.313-.254a.539.539 0 0 0 .293-.117c.065.026.13.013.195-.04.078-.051.15-.064.215-.038.104-.065.163-.091.176-.078a.083.083 0 0 0 .078 0l.215-.02c.156-.026.253-.045.292-.058a.346.346 0 0 1 .274-.02.164.164 0 0 0 .137-.02c.039.053.084.079.136.079a.494.494 0 0 1 .352.058.4.4 0 0 0 .176 0c.13.091.202.15.215.176.026.013.058.02.097.02.143.065.248.15.313.253a.836.836 0 0 0 .332.254c.039.091.09.176.156.254.04.091.072.156.098.196a.419.419 0 0 1 .078.136c.052.104.071.176.058.215-.013.04-.013.072 0 .098.052.104.091.208.118.312a.29.29 0 0 0-.079.137.347.347 0 0 1-.039.156c-.026.04-.058.085-.097.137a.456.456 0 0 0-.098.156.679.679 0 0 1-.137.137.309.309 0 0 0-.078.117c-.208.04-.364.085-.468.137a.733.733 0 0 1-.333.078h-.254a.21.21 0 0 1-.117-.04.098.098 0 0 0-.117 0 .431.431 0 0 0-.176-.136 2.293 2.293 0 0 0-.175-.078 57.545 57.545 0 0 1-.078-.078.976.976 0 0 0-.06-.098 1.327 1.327 0 0 1-.136-.37c0-.092-.032-.144-.097-.157a.48.48 0 0 0 .039-.176c.013-.065.032-.13.058-.195a.442.442 0 0 0 .156-.156c.183-.079.306-.118.371-.118l.196.176-.04.274c-.012.078-.07.123-.175.136-.04.091-.04.163 0 .215a.52.52 0 0 0 .176.117.54.54 0 0 1 .175.137c.04.04.072.033.098-.02.183 0 .306.007.371.02.065.013.13.007.196-.02a.295.295 0 0 0 .097-.117c.04-.052.091-.065.157-.039.065-.13.097-.221.097-.273 0-.065.013-.117.04-.156a.132.132 0 0 0-.04-.098.278.278 0 0 1-.039-.156.452.452 0 0 1-.098-.196.188.188 0 0 0-.078-.097c-.026-.026-.039-.072-.039-.137a.64.64 0 0 0-.097-.078.19.19 0 0 1-.078-.117 3.89 3.89 0 0 1-.215-.078.303.303 0 0 1-.157-.157c-.156-.078-.234-.13-.234-.156a1.469 1.469 0 0 1-.254-.059.174.174 0 0 0-.078-.019.18.18 0 0 0-.117 0c-.026.013-.065.013-.117 0-.144-.013-.228-.013-.254 0h-.098a.243.243 0 0 1-.137 0 .367.367 0 0 0-.117-.02 1.326 1.326 0 0 1-.156.04.643.643 0 0 0-.156.019 2.025 2.025 0 0 1-.235.078c-.195.078-.312.13-.351.156l-.078.079a.976.976 0 0 0-.098.058c-.13.065-.195.11-.195.137l-.235.156a1.227 1.227 0 0 0-.254.293.776.776 0 0 1-.097.117.305.305 0 0 0-.059.078.636.636 0 0 1-.117.235c-.026.026-.046.078-.059.156a.698.698 0 0 1-.058.176c.026.039.032.09.02.156l-.04.156c.013.117.02.19.02.215 0 .013-.013.033-.04.059a.65.65 0 0 1 .04.312.289.289 0 0 0 .078.254c.026.143.058.222.097.235.04.156.072.24.098.253.026.013.046.046.059.098a.447.447 0 0 1 .136.254c.092.091.13.143.118.156l.02.02c.025.039.058.078.097.117a.247.247 0 0 1 .117.137c.143.104.247.169.313.195a.232.232 0 0 1 .156.117c.13.04.202.065.215.078.026.013.058.013.097 0 .183.065.306.104.371.117.078.013.15.033.215.06a.688.688 0 0 0 .313.038.454.454 0 0 1 .234.02.35.35 0 0 1 .176-.059c.052-.013.117-.032.195-.059.117-.065.209-.104.274-.117.078-.013.123-.052.136-.117a.754.754 0 0 0 .254-.45.268.268 0 0 0 .137-.058c.026-.026.065-.039.117-.039.13-.039.221-.052.274-.039a.297.297 0 0 1 .156.078.318.318 0 0 1 0 .157c0 .039.006.078.02.117a.648.648 0 0 0-.079.097.454.454 0 0 1-.117.079c-.13.13-.202.208-.215.234a1.31 1.31 0 0 1-.195.195l-.078.04a1.87 1.87 0 0 1-.215.195 2.098 2.098 0 0 1-.137.058c-.195.104-.319.15-.37.137l-.118.078zm4.414-6.602a.53.53 0 0 0-.078.176c.013.013.013.04 0 .078 0 .04-.013.085-.04.137a.605.605 0 0 1-.038.117c0 .04.006.085.02.137.012.039.019.078.019.117-.04.117-.065.195-.078.235 0 .039.006.071.02.097.012.143.012.228 0 .254-.014.013 0 .033.038.059a1.357 1.357 0 0 0-.058.312.743.743 0 0 1 .039.098.606.606 0 0 1 .039.117.43.43 0 0 1-.02.137c-.013.026-.013.058 0 .097.065.144.085.215.059.215-.026-.013-.046-.006-.059.02a.59.59 0 0 1 0 .215c-.013.065 0 .13.04.195a.487.487 0 0 0 0 .273c.038.079.045.17.019.274.039.065.058.143.058.234 0 .091.02.17.059.235.078-.157.13-.254.156-.293a.435.435 0 0 0 .04-.196.455.455 0 0 0 .078-.117c.026-.052.026-.098 0-.137.065-.052.104-.136.117-.254.026-.117.078-.195.156-.234 0-.117.032-.195.098-.234-.013-.052-.007-.091.02-.117a.64.64 0 0 0 .077-.098.132.132 0 0 0 .04-.098.432.432 0 0 1 .058-.136c.013-.04.045-.111.098-.215a.773.773 0 0 1 .097-.118.316.316 0 0 0 .078-.175.51.51 0 0 0 .235-.235.525.525 0 0 1 .215-.254c.078-.065.117-.13.117-.195.065.013.11-.006.136-.059a.388.388 0 0 1 .137-.117c.117-.039.189-.058.215-.058a.19.19 0 0 0 .098-.04l.195-.019c.013-.013.026-.02.039-.02.286-.025.514-.025.684 0 .13.04.221.06.273.06l.156.155.157.176c.078.091.117.156.117.196a.31.31 0 0 0 .058.078.164.164 0 0 0-.02.136.434.434 0 0 1 .06.137c.078.221.11.378.097.469-.013.091-.02.189-.02.293a.37.37 0 0 1 .02.117c0 .04.007.085.02.137.026.156.026.24 0 .254-.026.013-.033.039-.02.078 0 .065.007.143.02.234.026.091.02.15-.02.176-.026.143-.032.221-.02.234.014 0 .014.013 0 .04-.038.169-.078.292-.117.37-.026.144-.032.228-.02.254.014.013.02.033.02.059a.873.873 0 0 0-.078.215c.013.013.013.032 0 .058-.065.196-.09.326-.078.391.013.052-.006.104-.059.156.04.078.046.176.02.293a2.498 2.498 0 0 1-.059.332c.013.052.02.104.02.156a.164.164 0 0 1-.02.137c.04.091.052.15.04.176-.014.013-.014.033 0 .059.012.065.032.13.058.195a.166.166 0 0 1 0 .156l.195.195c.091.026.157.02.196-.02a.212.212 0 0 1 .156-.058c.143-.09.234-.117.273-.078.052.04.118.072.196.098a.787.787 0 0 1-.02.215c0 .039-.013.084-.039.136-.052.105-.11.163-.176.176a.34.34 0 0 0-.175.098.338.338 0 0 0-.196.02.517.517 0 0 1-.254.019.21.21 0 0 1-.117-.04c-.026-.025-.065-.032-.117-.019-.143-.065-.234-.123-.273-.175a.494.494 0 0 0-.118-.118 3.337 3.337 0 0 1-.136-.293.133.133 0 0 0-.04-.097.207.207 0 0 0 0-.176 3.693 3.693 0 0 1-.038-.176.774.774 0 0 1-.04-.098c0-.039-.02-.071-.058-.097.039-.04.052-.078.039-.117a.313.313 0 0 1 0-.157.566.566 0 0 0 0-.214.45.45 0 0 1 .039-.157c.052-.143.072-.24.059-.293a.241.241 0 0 1 0-.136v-.176l.039-.195.078-.254a.892.892 0 0 1 .039-.215.313.313 0 0 0 0-.156c.039-.13.065-.222.078-.274.013-.052.032-.11.059-.176.012-.143.026-.221.039-.234.013-.013.02-.033.02-.059v-.254c.012-.052.025-.097.038-.136a2.984 2.984 0 0 1-.02-.215.172.172 0 0 0 .02-.078.92.92 0 0 1 0-.274c.013-.052 0-.11-.039-.175.013-.092.007-.144-.02-.157a.634.634 0 0 1-.078-.097c.014-.183 0-.3-.039-.352a.488.488 0 0 1-.058-.254.49.49 0 0 0-.117-.058c-.026-.013-.04-.052-.04-.118-.13-.013-.208-.013-.234 0-.026 0-.045-.013-.058-.039-.04.026-.092.033-.157.02-.065-.013-.11 0-.136.039-.105-.026-.17-.026-.196 0a.127.127 0 0 1-.058.059 1.15 1.15 0 0 1-.254.097c-.013 0-.033.013-.059.04-.104.103-.156.162-.156.175a1.362 1.362 0 0 0-.195.195A.347.347 0 0 1 60 11a.463.463 0 0 0-.176.352.57.57 0 0 0-.176.351.256.256 0 0 0-.117.117 2.91 2.91 0 0 1-.058.157 2.453 2.453 0 0 1-.235.488 2.705 2.705 0 0 0-.078.312c-.013.04-.032.085-.058.137a.319.319 0 0 0-.02.098 1.723 1.723 0 0 1-.039.293.976.976 0 0 1-.059.097.662.662 0 0 1-.02.215c0 .013-.012.033-.038.059.013.104.013.17 0 .195-.013.013-.02.046-.02.098a1.356 1.356 0 0 0-.039.273.43.43 0 0 1-.02.137c-.012.143-.012.24 0 .293.014.039.02.078.02.117-.013.156-.02.248-.02.274 0 .012.014.032.04.058a.825.825 0 0 0-.02.137v.117c.04.3.098.488.176.566a.447.447 0 0 0-.04.137.313.313 0 0 1 0 .156 1.637 1.637 0 0 0-.194.118c-.013.026-.046.026-.098 0-.04.065-.078.09-.117.078-.04 0-.078-.02-.117-.059a.81.81 0 0 1-.118-.156 1.053 1.053 0 0 1-.058-.137c.039-.065.039-.124 0-.176a.206.206 0 0 1 0-.175c-.04-.144-.052-.222-.04-.235.014-.013.014-.032 0-.058a.745.745 0 0 0-.038-.098v-.117c-.026-.143-.046-.222-.059-.235a.225.225 0 0 1-.039-.058 3.096 3.096 0 0 1-.04-.313.133.133 0 0 0-.038-.097c.039-.066.052-.118.039-.157a.687.687 0 0 1-.02-.195c-.039-.156-.071-.3-.097-.43-.052-.143-.072-.214-.059-.214a.75.75 0 0 1-.058-.235c.013-.052 0-.11-.04-.176.027-.065.027-.117 0-.156l-.039-.117c0-.143-.006-.228-.02-.254a.369.369 0 0 1-.019-.117c0-.156-.006-.241-.02-.254v-.078c.014-.235.014-.365 0-.39a.243.243 0 0 1 0-.138.17.17 0 0 0-.019-.175.437.437 0 0 0-.039-.274c0-.065.007-.136.02-.215a.454.454 0 0 0-.02-.234.758.758 0 0 0 .059-.156c.013-.065.006-.11-.02-.137 0-.234.013-.443.04-.625.038-.13.038-.189 0-.176-.04 0-.046-.02-.02-.058-.209 0-.43-.04-.664-.117a2.482 2.482 0 0 1-.274-.137.397.397 0 0 0 0-.176c0-.052.013-.104.04-.156a.433.433 0 0 1 .253-.137.851.851 0 0 0 .176.117.15.15 0 0 1 .059.02.34.34 0 0 0 .136.058.083.083 0 0 1 .078 0c.13.04.209.052.235.04a.19.19 0 0 1 .098-.04c0-.052.006-.097.02-.136l.038-.157c.04-.09.052-.143.04-.156V8.52c.038-.144.051-.228.038-.254 0-.026.007-.052.02-.079.026-.169.045-.26.058-.273a.128.128 0 0 0 .059-.059c.052-.195.078-.325.078-.39a.441.441 0 0 1 .078-.195.685.685 0 0 1 .098-.254.29.29 0 0 0 .078-.215l.117-.235a.494.494 0 0 1 .059-.117c.078-.117.117-.189.117-.215a.19.19 0 0 1 .04-.097c.051-.117.09-.202.116-.254.078-.104.117-.176.117-.215.013-.052.033-.11.059-.176.026-.052.059-.104.098-.156a.34.34 0 0 0 .097-.176c.091-.13.157-.202.196-.215.052-.026.084-.078.097-.156.052 0 .085-.02.098-.059a.349.349 0 0 1 .098-.097c.156-.104.24-.176.254-.215.039 0 .071-.007.097-.02a.64.64 0 0 0 .098-.078c.17-.065.254-.09.254-.078a2.3 2.3 0 0 0 .215-.117.347.347 0 0 1 .156-.04c.117 0 .189-.012.215-.038.143.026.234.039.273.039.052 0 .091.006.117.02l.215.097c.117.078.182.124.196.137.117.091.175.143.175.156h.02c.09.13.15.228.176.293-.013.156-.013.254 0 .293.013.04.02.072.02.098-.027.169-.053.319-.079.449a.37.37 0 0 1-.156.273c0 .105-.04.196-.117.274a.682.682 0 0 1-.176.39.728.728 0 0 0-.176.313.236.236 0 0 0-.137.137 1.027 1.027 0 0 1-.097.156c-.092.117-.15.176-.176.176a1.189 1.189 0 0 1-.098.156c-.013 0-.013.013 0 .039l-.117.078c-.026.013-.046.052-.059.117a.263.263 0 0 0-.175.098.356.356 0 0 1-.157.117 3.372 3.372 0 0 1-.273.332.7.7 0 0 1-.254.156c-.078.105-.124.157-.137.157-.013 0-.032.013-.058.039-.117.078-.176.123-.176.136l-.02.02c-.117.039-.175.065-.175.078 0 .013-.007.02-.02.02l-.137.136c-.013.013-.02.033-.02.059-.13.052-.201.078-.214.078-.013 0-.026.007-.04.02a7.668 7.668 0 0 0-.214.097c-.143.052-.228.091-.254.117-.013.013-.052.013-.117 0zm.605-.78l.196-.098a.127.127 0 0 0 .058-.06 3.05 3.05 0 0 0 .235-.155c.052 0 .09-.013.117-.04a.953.953 0 0 1 .098-.058c.13-.143.201-.228.214-.254.157-.117.228-.176.215-.176l.293-.293c.065-.065.117-.13.157-.195.065-.039.104-.072.117-.098l.039-.078a.6.6 0 0 0 .195-.215c.117-.156.195-.266.234-.332a.675.675 0 0 1 .176-.214 3.93 3.93 0 0 1 .098-.254l.078-.078c0-.066.013-.118.039-.157.026-.052.052-.097.078-.136 0-.079.007-.144.02-.196a.432.432 0 0 1 .058-.136.277.277 0 0 1-.039-.157c0-.065.013-.117.04-.156-.079-.104-.118-.176-.118-.215a.132.132 0 0 0-.039-.097.521.521 0 0 1-.137-.098.64.64 0 0 0-.078-.098 1.855 1.855 0 0 1-.312-.039c-.04.013-.085.026-.137.04a.217.217 0 0 0-.098.019 1.269 1.269 0 0 0-.136.078c-.026.013-.072.013-.137 0a.19.19 0 0 1-.078.117.308.308 0 0 0-.078.059.583.583 0 0 0-.293.156.968.968 0 0 0-.176.254c-.117.221-.221.37-.313.449a.55.55 0 0 0-.175.332c-.105.078-.176.221-.215.43a.758.758 0 0 0-.04.097.37.37 0 0 0-.019.118l-.117.156a.692.692 0 0 0-.059.195c-.09.143-.136.241-.136.293 0 .04-.013.085-.04.137a.53.53 0 0 0-.078.176.149.149 0 0 1-.02.058.737.737 0 0 0-.077.254c0 .04-.007.091-.02.156a3.902 3.902 0 0 1-.097.254l-.04.078a.92.92 0 0 1 0 .274c0 .052.014.104.04.156a.517.517 0 0 0 .293-.078c.078-.052.15-.11.214-.176zm12.266 6.874c-.065.104-.11.156-.137.156-.013 0-.026.014-.039.04-.104.078-.169.123-.195.136-.13.013-.195.026-.195.04h-.04c-.182-.066-.299-.092-.351-.079a.22.22 0 0 1-.156-.02l-.235-.078a.762.762 0 0 1-.175-.097.146.146 0 0 0-.157-.059c-.065-.143-.169-.221-.312-.234a1.287 1.287 0 0 1-.117-.215c-.013-.039-.046-.059-.098-.059-.091.105-.15.17-.176.196a.305.305 0 0 1-.058.078c-.117.091-.19.137-.215.137a5.357 5.357 0 0 1-.313.254 1.383 1.383 0 0 1-.37.156.19.19 0 0 1-.118.078.188.188 0 0 0-.098.078c-.13-.013-.227.013-.293.078-.052-.026-.097-.032-.136-.02a.436.436 0 0 1-.137.06c-.091-.014-.15-.014-.176 0-.013.012-.032.019-.058.019a1.469 1.469 0 0 1-.254-.059h-.078c-.157 0-.26-.013-.313-.039-.039-.013-.085-.007-.137.02-.078-.079-.136-.118-.175-.118a1.06 1.06 0 0 1-.137-.058 1.193 1.193 0 0 1-.215-.117.607.607 0 0 0-.254-.098 4.281 4.281 0 0 0-.195-.254.348.348 0 0 0-.098-.098.522.522 0 0 1-.097-.136.596.596 0 0 1-.157-.137c-.013-.026-.045-.046-.097-.059a.278.278 0 0 0-.04-.156.777.777 0 0 0-.097-.117l-.078-.234a.309.309 0 0 0-.118-.196.186.186 0 0 0-.058-.176.609.609 0 0 1-.078-.214c0-.144-.013-.228-.04-.254a.369.369 0 0 1-.019-.117c.026-.157.033-.248.02-.274a.322.322 0 0 1-.02-.098c0-.065.007-.117.02-.156a.61.61 0 0 1 .039-.117c.013-.065.02-.137.02-.215 0-.078.019-.143.058-.195v-.195a.309.309 0 0 1 .058-.079.76.76 0 0 0 .06-.156c.012-.052.032-.11.058-.176.104-.169.169-.3.195-.39a.74.74 0 0 1 .156-.235c.078-.104.13-.175.156-.214a.298.298 0 0 1 .157-.079c.078-.117.13-.182.156-.195.026-.013.033-.033.02-.059a.49.49 0 0 0 .195-.117l.156-.156a.439.439 0 0 0 .156-.059c.053-.039.098-.071.137-.097.143-.013.221-.026.235-.04.026-.025.052-.025.078 0 .065-.064.15-.084.254-.058.104.013.227.013.37 0 .196-.052.346-.065.45-.039.117.013.234.033.351.059.144.078.267.13.372.156.09.078.15.13.175.156.026.013.059.02.098.02.026.065.065.104.117.117.052 0 .085.033.098.098.117.065.182.104.195.117.013.013.026.02.04.02a1.61 1.61 0 0 0 .175-.196.957.957 0 0 0 .058-.098c.026-.026.072-.039.137-.039a.278.278 0 0 0 .157-.039c.117-.039.182-.045.195-.02.026.014.065.02.117.02.143.117.234.221.273.313a.62.62 0 0 0 .176.234c.026.065.046.143.059.234.026.079.039.17.039.274.013.143.02.24.02.293l-.02.37c0 .131-.007.255-.02.372 0 .117-.013.228-.039.332a2.27 2.27 0 0 1-.078.293 2.44 2.44 0 0 0-.156.352c-.04.117-.072.182-.098.195a.23.23 0 0 0-.039.059.435.435 0 0 0-.058.136c-.014.04-.046.072-.098.098a3.926 3.926 0 0 0-.117.273c-.013.04-.013.072 0 .098.078.143.117.234.117.273.013.04.032.072.058.098a.246.246 0 0 0 .098.059c.04.013.072.032.098.058.104.078.156.124.156.137h.04a.475.475 0 0 0 .155.117.61.61 0 0 1 .118.04c.143.025.22.045.234.058a.322.322 0 0 0 .098-.02c.104-.013.175-.026.214-.039.04-.026.092-.026.157 0 .13.104.195.176.195.215 0 .026.013.052.04.078zm-2.95-4.258a2.209 2.209 0 0 0-.214-.195.81.81 0 0 0-.156-.117 2.343 2.343 0 0 1-.332-.195 2.511 2.511 0 0 0-.235-.059 1.99 1.99 0 0 0-.136-.059c-.066-.026-.105-.026-.118 0-.104.013-.162.02-.175.02-.013-.013-.033-.013-.059 0a8.172 8.172 0 0 0-.371.059.596.596 0 0 1-.215 0c-.065.039-.137.078-.215.117a.52.52 0 0 0-.175.117c-.157.091-.274.17-.352.234a.47.47 0 0 0-.176.235c-.078.09-.13.156-.156.195-.013.039-.033.085-.059.137a.434.434 0 0 0-.058.136c-.013.04-.046.072-.098.098a.439.439 0 0 1-.058.156.5.5 0 0 1-.06.117 89.09 89.09 0 0 0-.038.157c0 .039-.013.071-.04.097a.21.21 0 0 1-.019.196.518.518 0 0 0-.02.254c-.038.143-.058.254-.058.332a.83.83 0 0 1 0 .254c.052.182.091.299.117.351a.32.32 0 0 1 .04.176c.103.13.188.3.253.508a.537.537 0 0 1 .156.136c.04.04.072.105.098.196.104.09.163.143.176.156.078.078.117.13.117.156a.228.228 0 0 0 .059.04c.13.064.208.097.234.097.026 0 .052.02.078.059.091.013.17.039.235.078.078.039.15.084.214.136.13-.026.209-.026.235 0 .039.013.071.033.098.059a.299.299 0 0 1 .117-.04c.039 0 .09.007.156.02.078 0 .13-.006.156-.02a.94.94 0 0 0 .098-.058c.039-.013.11-.02.215-.02a.642.642 0 0 0 .195-.097c.026-.039.052-.045.078-.02.104-.104.176-.156.215-.156.039 0 .072-.013.098-.039.09-.104.156-.156.195-.156l.176-.176a.173.173 0 0 0 .02-.078.2.2 0 0 0 .156-.176.532.532 0 0 1 .136-.234l-.078-.273c-.039-.027-.058-.06-.058-.098a.366.366 0 0 0-.02-.117c-.026-.117-.052-.19-.078-.215a1.239 1.239 0 0 1-.078-.352.548.548 0 0 0-.02-.254 1.364 1.364 0 0 1-.058-.234c.013-.026.013-.072 0-.137 0-.09-.007-.175-.02-.254v-.254-.234a.523.523 0 0 0-.039-.195c.065-.13.091-.209.078-.235-.013-.026-.013-.058 0-.097-.052-.143-.104-.222-.156-.235zm.645.489c0 .052-.006.15-.02.293 0 .13.014.221.04.273-.026.052-.033.098-.02.137.013.039.02.078.02.117.013.052.026.098.039.137a.133.133 0 0 1 .039.097.666.666 0 0 0 0 .235.606.606 0 0 1 .04.117.49.49 0 0 0 0 .195c.012.065.019.11.019.137a.245.245 0 0 1 .058.098.247.247 0 0 1 .059.117c.065.013.098-.007.098-.059 0-.065.032-.104.097-.117-.026-.065-.02-.117.02-.156a.34.34 0 0 0 .097-.176c0-.143.013-.234.04-.273a.496.496 0 0 0 .058-.118c.039-.169.059-.3.059-.39v-.176c0-.117-.007-.182-.02-.195v-.079c0-.13-.006-.227-.02-.292a.434.434 0 0 0-.039-.196.258.258 0 0 0-.039-.234l-.136-.156c0-.013-.007-.02-.02-.02-.026.04-.059.059-.097.059-.027-.013-.066.02-.118.097a.387.387 0 0 1-.117.137c-.052.04-.065.091-.039.156l-.098.235zm3.282-9.961c.026.169.052.286.078.351a.692.692 0 0 1 .058.196.247.247 0 0 1 .059.117.35.35 0 0 0 .098.097c-.04.053-.046.098-.02.137.04.026.046.052.02.078.052.17.071.267.058.293a.76.76 0 0 0 .04.098.244.244 0 0 1 .058.098c0 .156.006.253.02.293.025.039.064.071.117.097v.176c.013.039.026.091.039.156.039.104.052.163.039.176-.013 0-.013.02 0 .059a.932.932 0 0 1 .058.253c.013.04.033.072.059.098.026.17.039.28.039.332.013.04.032.072.058.098.027.039.04.11.04.215 0 .104.013.175.039.215a.509.509 0 0 0-.02.156c.013.065.007.117-.02.156a.95.95 0 0 0 .079.215c.013.013.006.032-.02.058.026.027.04.066.04.118 0 .052.006.11.019.175.039.144.052.222.039.235v.02c-.013.025-.007.104.02.234 0 .078.006.156.019.234.026.078.032.15.02.215-.014.26 0 .443.038.547.014.208.026.351.04.43.013.078.02.156.02.234 0 .117-.007.202-.02.254 0 .052.013.097.039.136 0 .157-.007.274-.02.352 0 .065.013.143.04.234a.133.133 0 0 0-.04.098v.137c-.026.156-.032.234-.02.234.014 0 .02.007.02.02-.026.104-.039.175-.039.215.013.09.013.143 0 .156v.058a.39.39 0 0 1 0 .176c0 .026.013.072.04.137a.586.586 0 0 0-.099.312c-.026.026-.032.059-.02.098.014.04.02.078.02.117l-.078.469c-.026.143-.052.293-.078.45 0 .168-.006.305-.02.41-.012.09-.025.175-.038.253.013.157.006.254-.02.293-.013.04-.026.091-.039.156a.442.442 0 0 1-.156.157.183.183 0 0 0-.098.136c-.104.04-.182.027-.234-.039a.662.662 0 0 0-.156-.175v-.254a.24.24 0 0 1 .097-.196.977.977 0 0 1-.02-.117c.014-.026.014-.058 0-.097.053-.014.079-.059.079-.137 0-.078.013-.143.039-.195a.272.272 0 0 0 .02-.118c0-.052.006-.104.019-.156.039-.13.052-.202.039-.215-.013-.026-.013-.065 0-.117 0-.065.006-.143.02-.234.025-.091.045-.176.058-.254v-.215c0-.078.007-.17.02-.274a.79.79 0 0 0 .02-.292c-.014-.105-.014-.17 0-.196a.321.321 0 0 0 .019-.097.218.218 0 0 0-.02-.098v-.117a.37.37 0 0 1 .02-.117c.026-.053.026-.098 0-.137v-.43c.013-.117.02-.234.02-.351 0-.183-.007-.306-.02-.372a1.1 1.1 0 0 0-.02-.214 7.17 7.17 0 0 1-.02-.508 3.06 3.06 0 0 0 0-.488c0-.105-.006-.209-.019-.313a.735.735 0 0 0-.059-.293.4.4 0 0 0 0-.176.692.692 0 0 0-.058-.195.18.18 0 0 0 0-.117c-.013-.052-.007-.091.02-.117a6.803 6.803 0 0 0-.079-.274V5.63l-.039-.195c.013-.013.02-.033.02-.059a1.182 1.182 0 0 1-.04-.156c.014-.013.02-.033.02-.059-.065-.13-.091-.208-.078-.234.013-.04.007-.072-.02-.098l-.058-.195c.013-.013.006-.02-.02-.02a.418.418 0 0 0-.02-.215 1.288 1.288 0 0 0-.077-.214c0-.144-.013-.215-.04-.215l-.038-.04a2.917 2.917 0 0 1-.059-.292.394.394 0 0 0-.078-.254c.013-.13 0-.241-.04-.332a2.881 2.881 0 0 0-.097-.313 1.293 1.293 0 0 0-.098-.234.174.174 0 0 1-.019-.078.318.318 0 0 1-.156-.137.45.45 0 0 1-.04-.156.455.455 0 0 1 .079-.117c.039-.026.058-.072.058-.137.13-.078.196-.13.196-.156a.164.164 0 0 1 .136.02.37.37 0 0 0 .118.019zm.742 13.36c.026.038.045.084.058.136.026.039.046.084.059.137.04.09.052.156.04.195a.431.431 0 0 0-.02.137c-.092.09-.157.156-.196.195-.117.091-.215.15-.293.176a.866.866 0 0 1-.273.039.21.21 0 0 1-.117-.04.098.098 0 0 0-.118 0 .978.978 0 0 1-.292-.312.792.792 0 0 1 .038-.37c.053-.092.105-.19.157-.294.065.013.11.007.136-.02a.244.244 0 0 1 .098-.058c.091.052.17.046.234-.02h.157a.243.243 0 0 1 .136 0 .738.738 0 0 0 .157.079c.013-.014.026-.007.039.02z"/></svg>',
  swipe: '<svg width="54.78" height="60"><path d="M35.22 7.82h12.5l-3 3a1.31 1.31 0 0 0 1.85 1.84l5.23-5.22a1.23 1.23 0 0 0 .13-.2 1.28 1.28 0 0 0 .14-.24 1.27 1.27 0 0 0-.25-1.38L46.58.38a1.301 1.301 0 0 0-1.84 1.84l3 3H35.22a1.3 1.3 0 0 0 0 2.6zM7.44 12.66a1.31 1.31 0 0 0 0-1.84l-3-3H17a1.305 1.305 0 0 0 0-2.61H4.45l3-3A1.301 1.301 0 0 0 5.6.38L.38 5.6A1.3 1.3 0 0 0 .1 6a1.31 1.31 0 0 0 0 1 1.28 1.28 0 0 0 .15.23 1.23 1.23 0 0 0 .13.2l5.22 5.23a1.31 1.31 0 0 0 .92.38 1.29 1.29 0 0 0 .92-.38zM49.57 26.09a5.2 5.2 0 0 0-2.9.88 5.22 5.22 0 0 0-7.83-2.61 5.23 5.23 0 0 0-4.93-3.49 5.18 5.18 0 0 0-2.61.7V13a5.22 5.22 0 1 0-10.44 0v22.22l-4.53-3.4a6.84 6.84 0 0 0-8.89.63 3.92 3.92 0 0 0 0 5.53L26 56.56A11.67 11.67 0 0 0 34.32 60h6.11a14.37 14.37 0 0 0 14.35-14.35V31.3a5.22 5.22 0 0 0-5.21-5.21zm2.61 19.57a11.75 11.75 0 0 1-11.74 11.73h-6.12a9.07 9.07 0 0 1-6.46-2.67L9.29 36.14a1.31 1.31 0 0 1 0-1.84 4.22 4.22 0 0 1 5.49-.39l6.62 5a1.3 1.3 0 0 0 2.09-1V13a2.61 2.61 0 1 1 5.22 0v19.61a1.305 1.305 0 0 0 2.61 0v-6.52a2.61 2.61 0 1 1 5.22 0v6.52a1.305 1.305 0 0 0 2.61 0v-3.92a2.61 2.61 0 0 1 5.22 0v3.91a1.305 1.305 0 0 0 2.61 0v-1.3a2.61 2.61 0 0 1 5.22 0v14.35z"/></svg>',
  swipeL: '<svg viewBox="0 0 54.78 60.01"><path d="M7.44 12.67a1.31 1.31 0 0 0 0-1.84l-3-3H17a1.305 1.305 0 1 0 0-2.61H4.45l3-3A1.301 1.301 0 0 0 5.6.39L.38 5.61a1.3 1.3 0 0 0-.28.4 1.31 1.31 0 0 0 0 1 1.28 1.28 0 0 0 .15.23 1.23 1.23 0 0 0 .13.2l5.22 5.23a1.31 1.31 0 0 0 .92.38 1.29 1.29 0 0 0 .92-.38zM49.57 26.1a5.2 5.2 0 0 0-2.9.88 5.22 5.22 0 0 0-7.83-2.61 5.22 5.22 0 0 0-7.54-2.79v-8.57a5.22 5.22 0 0 0-10.44 0v22.22l-4.53-3.4a6.84 6.84 0 0 0-8.89.63 3.92 3.92 0 0 0 0 5.53L26 56.57a11.67 11.67 0 0 0 8.32 3.44h6.11a14.37 14.37 0 0 0 14.35-14.35V31.31a5.22 5.22 0 0 0-5.21-5.21zm2.63 19.56A11.75 11.75 0 0 1 40.44 57.4h-6.12a9.07 9.07 0 0 1-6.46-2.67L9.29 36.15a1.31 1.31 0 0 1 0-1.84 4.22 4.22 0 0 1 5.49-.39l6.62 5a1.3 1.3 0 0 0 2.09-1V13.01a2.61 2.61 0 0 1 5.22 0v19.61a1.305 1.305 0 1 0 2.61 0V26.1a2.61 2.61 0 0 1 5.22 0v6.52a1.31 1.31 0 0 0 2.61 0V28.7a2.61 2.61 0 1 1 5.22 0v3.91a1.305 1.305 0 0 0 2.61 0v-1.3a2.61 2.61 0 1 1 5.22 0v14.35z"/></svg>',
  swipeR: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48.48 60"><path d="M28.92 7.82h12.5l-3 3a1.31 1.31 0 0 0 1.85 1.84l5.23-5.22a1.23 1.23 0 0 0 .13-.2 1.25 1.25 0 0 0-.11-1.62L40.28.38a1.301 1.301 0 1 0-1.84 1.84l3 3H28.92a1.3 1.3 0 0 0 0 2.6zM43.27 26.09a5.2 5.2 0 0 0-2.9.88 5.22 5.22 0 0 0-7.83-2.61A5.22 5.22 0 0 0 25 21.57V13a5.22 5.22 0 1 0-10.44 0v22.22l-4.53-3.4a6.84 6.84 0 0 0-8.89.63 3.92 3.92 0 0 0 0 5.53L19.7 56.56A11.67 11.67 0 0 0 28.02 60h6.11a14.37 14.37 0 0 0 14.35-14.35V31.3a5.22 5.22 0 0 0-5.21-5.21zm2.61 19.57a11.75 11.75 0 0 1-11.74 11.73h-6.12a9.07 9.07 0 0 1-6.46-2.67L2.99 36.14a1.31 1.31 0 0 1 0-1.84 4.22 4.22 0 0 1 5.49-.39l6.62 5a1.3 1.3 0 0 0 2.09-1V13a2.61 2.61 0 1 1 5.22 0v19.61a1.31 1.31 0 0 0 2.61 0v-6.52a2.61 2.61 0 0 1 5.22 0v6.52a1.31 1.31 0 0 0 2.61 0v-3.92a2.61 2.61 0 0 1 5.22 0v3.91a1.31 1.31 0 0 0 2.61 0v-1.3a2.61 2.61 0 1 1 5.22 0v14.35z"/></svg>',
  refresh: '<svg width="15" height="15"><path d="M14.62.674c-.268-.11-.495-.065-.684.136l-1.27 1.26A7.58 7.58 0 0 0 10.278.542 7.357 7.357 0 0 0 7.5 0a7.298 7.298 0 0 0-2.91.596 7.565 7.565 0 0 0-2.393 1.601A7.567 7.567 0 0 0 .596 4.59 7.298 7.298 0 0 0 0 7.5c0 1.015.199 1.986.596 2.91a7.567 7.567 0 0 0 1.601 2.393 7.57 7.57 0 0 0 2.393 1.601A7.298 7.298 0 0 0 7.5 15c1.12 0 2.185-.236 3.194-.708a7.333 7.333 0 0 0 2.578-1.997.32.32 0 0 0 .073-.22.27.27 0 0 0-.093-.2l-1.338-1.348a.376.376 0 0 0-.244-.087c-.104.013-.179.052-.224.117a4.904 4.904 0 0 1-1.748 1.436A4.925 4.925 0 0 1 7.5 12.5a4.87 4.87 0 0 1-1.938-.395 5.034 5.034 0 0 1-1.597-1.07A5.038 5.038 0 0 1 2.896 9.44 4.87 4.87 0 0 1 2.5 7.5c0-.677.132-1.323.396-1.938a5.036 5.036 0 0 1 1.07-1.597c.449-.45.98-.806 1.596-1.07A4.87 4.87 0 0 1 7.5 2.5c1.309 0 2.445.446 3.409 1.338L9.56 5.186c-.202.195-.248.42-.137.674.11.26.303.39.576.39h4.375a.6.6 0 0 0 .44-.185.6.6 0 0 0 .185-.44V1.25a.584.584 0 0 0-.38-.576z"/></svg>',
  yes: '<svg viewBox="0 0 70 70"><path d="M26.474 70a6.972 6.972 0 0 1-5.557-2.764L3.049 43.639a6.971 6.971 0 0 1 11.116-8.414l11.752 15.518L55.474 3.285a6.977 6.977 0 0 1 9.604-2.232 6.969 6.969 0 0 1 2.23 9.602l-34.916 56.06A6.967 6.967 0 0 1 26.474 70z"/></svg>',
  no: '<svg viewBox="0 0 212.982 212.982"><path d="M131.804 106.491l75.936-75.936c6.99-6.99 6.99-18.323 0-25.312-6.99-6.99-18.322-6.99-25.312 0L106.491 81.18 30.554 5.242c-6.99-6.99-18.322-6.99-25.312 0-6.989 6.99-6.989 18.323 0 25.312l75.937 75.936-75.937 75.937c-6.989 6.99-6.989 18.323 0 25.312 6.99 6.99 18.322 6.99 25.312 0l75.937-75.937 75.937 75.937c6.989 6.99 18.322 6.99 25.312 0 6.99-6.99 6.99-18.322 0-25.312l-75.936-75.936z"/></svg>'
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.make = exports.init = undefined;

var _cmttLikely = __webpack_require__(17);

var _cmttLikely2 = _interopRequireDefault(_cmttLikely);

var _dom = __webpack_require__(6);

var _analytics = __webpack_require__(3);

var Analytics = _interopRequireWildcard(_analytics);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CSS = {
    likely: 'likely',
    likelyCustom: 'likely--custom'
};

var init = exports.init = function init() {
    _cmttLikely2.default.initate();
};

/**
 * Make likely buttons and append to specified element
 * @param {Element} parentContainer - likely container will be placed here
 * @param {Object} set - object with optional params (title, url, twitter)
 */
var make = exports.make = function make(parentContainer) {
    var set = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var likelyContainer = (0, _dom.makeElement)('div', [CSS.likely, CSS.likelyCustom]);
    var socials = ['facebook', 'vkontakte', 'twitter'];

    socials.forEach(function (social) {
        var button = (0, _dom.makeElement)('div', social);

        if (social === 'facebook') button.innerHTML = 'Поделиться';

        button.addEventListener('click', function () {
            Analytics.sendEvent('Share ' + social);
        });

        likelyContainer.appendChild(button);
    });

    parentContainer.appendChild(likelyContainer);

    if (set.url) likelyContainer.dataset.url = set.url;
    if (set.twitter) likelyContainer.dataset.twitter = set.twitter;
    if (set.title) likelyContainer.dataset.title = set.title;

    init();
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 'use strict';

var Likely = __webpack_require__(18),
    config = __webpack_require__(0),
    utils = __webpack_require__(2),
    dom = __webpack_require__(1);

/**
 * @param {Node} node
 * @param {Object} options
 */
var likely = function (node, options) {
    options = options || {};

    var widget = node[config.name];

    if (widget) {
        widget.update(options);
    }
    else {
        node[config.name] = new Likely(node, utils.merge(
            {}, likely.defaults,
            options, utils.bools(node)
        ));
    }

    return widget;
};

/**
 * Initiate Likely buttons on load
 */
likely.initiate = likely.initate = function () {
    var widgets = dom.findAll('.' + config.name);

    utils.toArray(widgets).forEach(likely);
};

/**
 * Defaults options for likely
 */
likely.defaults = {
    counters: true,
    timeout:  1e3,
    zeroes:   false,
    title:    document.title,
    wait:     0.5e3,
    url:      window.location.href.replace(window.location.hash, '')
};

module.exports = likely;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var Button = __webpack_require__(19);

var services = __webpack_require__(4),
    config   = __webpack_require__(0),
    utils = __webpack_require__(2),
    dom = __webpack_require__(1),
    storage = __webpack_require__(7);

/**
 * Main widget view
 *
 * @param {Node} container
 * @param {Object} options
 */
function Likely(container, options) {
    this.isSmartOrder = container.dataset.smart !== undefined ? true : false;
    this.container = container;
    this.options   = options;

    this.countersLeft = 0;
    this.buttons      = [];
    this.number       = 0;

    this.init();
}

Likely.prototype = {

    /**
     * Change buttons order, if previous clicks were saved
     * @param {Array} children
     */
    reorder: function (children) {
        var savedServices = storage.getItem(config.storageKey);

        if (savedServices) {
            savedServices.reverse();

            savedServices.forEach(function (service) {

                var button = dom.find('.' + service);

                if (button) {
                    button.parentNode.insertBefore(button, button.parentNode.firstChild);
                }

            });
        }
    },

    /**
     * Initiate the social buttons widget
     */
    init: function () {

        var buttons = utils.toArray(this.container.children);

        if (dom.isMobile() && this.isSmartOrder) {
            this.reorder(buttons);
        }

        buttons.forEach(this.addButton.bind(this));

        if (this.options.counters) {
            this.timer   = setTimeout(this.appear.bind(this), this.options.wait);
            this.timeout = setTimeout(this.ready.bind(this),  this.options.timeout);
        }
        else {
            this.appear();
        }

        utils.flexboxSupport(this.container, config.name);
    },

    /**
     * Add a button
     *
     * @param {Node} node
     */
    addButton: function (node) {
        var button = new Button(node, this, this.options);

        this.buttons.push(button);

        if (button.options.counterUrl) {
            this.countersLeft++;
        }
    },

    /**
     * Update the timer with URL
     *
     * @param {Object} options
     */
    update: function (options) {
        if (
            options.forceUpdate ||
            options.url !== this.options.url
        ) {
            this.countersLeft = this.buttons.length;
            this.number = 0;

            this.buttons.forEach(function (button) {
                button.update(options);
            });
        }
    },

    /**
     * Update counter
     *
     * @param {String} service
     * @param {Number} counter
     */
    updateCounter: function (service, counter) {
        if (counter) {
            this.number += counter;
        }

        this.countersLeft--;

        if (this.countersLeft === 0) {
            this.appear();
            this.ready();
        }
    },

    /**
     * Show the buttons with smooth animation
     */
    appear: function () {
        this.container.classList.add(config.name + '--visible');
    },

    /**
     * Get. Set. Ready.
     */
    ready: function () {
        if (this.timeout) {
            clearTimeout(this.timeout);

            this.container.classList.add(config.name + '--ready');
        }
    }
};

module.exports = Likely;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var services = __webpack_require__(4),
    config = __webpack_require__(0),
    fetch = __webpack_require__(33),
    utils = __webpack_require__(2),
    dom = __webpack_require__(1),
    storage = __webpack_require__(7);

var htmlSpan = '<span class="{className}">{content}</span>';

/**
 * Separate social link widget
 *
 * @param {Node} widget
 * @param {Likely} likely
 * @param {Object} options
 */
function LikelyButton (widget, likely, options) {
    this.widget  = widget;
    this.likely  = likely;
    this.options = utils.merge(options);

    this.init();
}

LikelyButton.prototype = {
    /**
     * Initiate the button
     */
    init: function () {
        this.detectService();
        this.detectParams();

        if (this.service) {
            this.initHtml();

            setTimeout(this.initCounter.bind(this), 0);
        }
    },

    /**
     * Update the counter
     *
     * @param {Object} options
     */
    update: function (options) {
        var className = '.' + config.prefix + 'counter',
            counters  = dom.findAll(className, this.widget);

        utils.extend(this.options, utils.merge({forceUpdate: false}, options));
        utils.toArray(counters).forEach(function (node) {
            node.parentNode.removeChild(node);
        });

        this.initCounter();
    },

    /**
     * Get the config.name of service and its options
     */
    detectService: function () {
        var widget  = this.widget,
            service = utils.getDataset(widget).service;

        if (!service) {
            var classes = widget.className.split(' ');

            for (var i = 0; i < classes.length; i++) {
                if (classes[i] in services) break;
            }

            service = classes[i];
        }

        if (service) {
            this.service = service;

            utils.extend(this.options, services[service]);
        }
    },

    /**
     * Merge params from data-* attributes into options hash map
     */
    detectParams: function () {
        var options = this.options,
            data    = utils.getDataset(this.widget);

        if (data.counter) {
            var counter = parseInt(data.counter, 10);

            if (isNaN(counter)) {
                options.counterUrl = data.counter;
            }
            else {
                options.counterNumber = counter;
            }
        }

        options.title = data.title || options.title;
        options.url   = data.url   || options.url;
    },

    /**
     * Inititate button's HTML
     */
    initHtml: function () {
        var options = this.options,
            widget  = this.widget,
            text    = widget.innerHTML;

        widget.addEventListener('click', this.click.bind(this));
        widget.classList.remove(this.service);
        widget.className += (' ' + this.className('widget'));

        var button = utils.template(htmlSpan, {
            className: this.className('button'),
            content:   text
        });

        var icon = utils.template(htmlSpan, {
            className: this.className('icon'),
            content:   dom.wrapSVG(options.svgi)
        });

        widget.innerHTML = icon + button;
    },

    /**
     * Fetch or get cached counter value and update the counter
     */
    initCounter: function () {
        var options = this.options;

        if (options.counters && options.counterNumber) {
            this.updateCounter(options.counterNumber);
        }
        else if (options.counterUrl) {
            fetch(
                this.service,
                options.url,
                options
            )(this.updateCounter.bind(this));
        }
    },

    /**
     * @param {String} className
     * @return {String}
     */
    className: function (className) {
        var fullClass = config.prefix + className;

        return fullClass + ' ' + fullClass + '--' + this.service;
    },

    /**
     * Update counter
     *
     * @param {String} e
     */
    updateCounter: function (counter) {
        counter = parseInt(counter, 10) || 0;

        var counterElement = dom.find('.' + config.name + '__counter', this.widget);

        if (counterElement) {
            counterElement.parentNode.removeChild(counterElement);
        }

        var options = {
            className: this.className('counter'),
            content:   counter
        };

        if (!counter && !this.options.zeroes) {
            options.className += ' ' + config.prefix + 'counter--empty';
            options.content = '';
        }

        this.widget.appendChild(
            dom.createNode(utils.template(htmlSpan, options))
        );

        this.likely.updateCounter(this.service, counter);
    },

    /**
     * Click event listener
     */
    click: function () {
        var options = this.options;

        if ( this.service == 'more' ){

            this.widget.classList.toggle('active');
            this.widget.parentElement.classList.toggle(this.options.className);

        } else if (this.service == 'email'){

            var url = utils.makeUrl(options.popupUrl, {
                url: options.url,
                title: options.title
            });

            window.location = url;

            this.rememberClicked(this.service);

        } else {

            if (options.click.call(this)) {

                var twitterText = this.likely.container.dataset.twitter,
                    twitterUrl = this.likely.container.dataset.twitterUrl;

                var window_url = utils.makeUrl(options.popupUrl, {
                    url:   (this.service === 'twitter' && twitterUrl !== '' && twitterUrl !== undefined) ? twitterUrl : options.url,
                    title: (this.service === 'twitter' && twitterText !== '' && twitterText !== undefined) ? twitterText : options.title
                });

                dom.openPopup(
                    this.addAdditionalParamsToUrl(window_url),
                    config.prefix + this.service,
                    options.popupWidth,
                    options.popupHeight
                );

                this.rememberClicked(this.service);
            }

        }

        return false;
    },

    /**
     * Append service data to URL
     *
     * @param {String} url
     */
    addAdditionalParamsToUrl: function (url) {
        var parameters = utils.query(utils.merge(
                this.widget.dataset,
                this.options.data
            )),
            delimeter = url.indexOf('?') === -1 ? '?' : '&';

        return (parameters === '') ? url : (url + delimeter + parameters);
    },

    /**
     * Remember last clicked button and save to storage
     */
    rememberClicked: function (service) {
        var services = storage.getItem(config.storageKey) || [],
            serviceIndex = services.indexOf(service);

        if (serviceIndex !== -1) {
            services.splice(serviceIndex, 1);
        }

        services.splice(0, 0, service);

        storage.setItem(config.storageKey, services);
    }
};

module.exports = LikelyButton;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var dom = __webpack_require__(1);

/**
 * @param {String} url
 * @param {Function} factory
 */
var counter = function (url, factory) {
    var self = this;
    
    dom.getJSON(url, function (count) {
        try {
            if (typeof self.convertNumber === 'function') {
                count = self.convertNumber(count);
            } 
            
            factory(count);
        } 
        catch (e) {}
    });
};

/**
 * @param {Object} options
 */
module.exports = function (options) {
    options.counter = options.counter || counter;
    options.click   = options.click   || function () { return true; };
};

/***/ }),
/* 21 */
/***/ (function(module) {

module.exports = {"facebook":"5.9 16h3.3V8h2.2l.3-2.8H9.2V3.8c0-.7.1-1.1 1.1-1.1h1.4V0H9.5C6.9 0 5.9 1.3 5.9 3.6v1.7H4.3V8H6v8","twitter":"15.96 3.42c-.04.153-.144.31-.237.414l-.118.058v.118l-.59.532-.237.295c-.05.036-.398.21-.413.237V6.49h-.06v.473h-.058v.294h-.058v.296h-.06v.235h-.06v.237h-.058c-.1.355-.197.71-.295 1.064h-.06v.116h-.06c-.02.1-.04.197-.058.296h-.06c-.04.118-.08.237-.118.355h-.06c-.038.118-.078.236-.117.353l-.118.06-.06.235-.117.06v.116l-.118.06v.12h-.06c-.02.057-.038.117-.058.175l-.118.06v.117c-.06.04-.118.08-.177.118v.118l-.237.177v.118l-.59.53-.532.592h-.117c-.06.078-.118.156-.177.236l-.177.06-.06.117h-.118l-.06.118-.176.06v.058h-.118l-.06.118-.353.12-.06.117c-.078.02-.156.04-.235.058v.06c-.118.038-.236.078-.354.118v.058H8.76v.06h-.12v.06h-.176v.058h-.118v.06H8.17v.058H7.99v.06l-.413.058v.06h-.237c-.667.22-1.455.293-2.36.293h-.886v-.058h-.53v-.06H3.27v-.06h-.295v-.06H2.68v-.057h-.177v-.06h-.236v-.058H2.09v-.06h-.177v-.058h-.177v-.06H1.56v-.058h-.12v-.06l-.294-.06v-.057c-.118-.04-.236-.08-.355-.118v-.06H.674v-.058H.555v-.06H.437v-.058H.32l-.06-.12H.142v-.058c-.13-.08-.083.026-.177-.118H1.56v-.06c.294-.04.59-.077.884-.117v-.06h.177v-.058h.237v-.06h.118v-.06h.177v-.057h.118v-.06h.177v-.058l.236-.06v-.058l.236-.06c.02-.038.04-.078.058-.117l.237-.06c.02-.04.04-.077.058-.117h.118l.06-.118h.118c.036-.025.047-.078.118-.118V12.1c-1.02-.08-1.84-.54-2.303-1.183-.08-.058-.157-.118-.236-.176v-.117l-.118-.06v-.117c-.115-.202-.268-.355-.296-.65.453.004.987.008 1.354-.06v-.06c-.254-.008-.47-.08-.65-.175v-.058H2.32v-.06c-.08-.02-.157-.04-.236-.058l-.06-.118h-.117l-.118-.178h-.12c-.077-.098-.156-.196-.235-.294l-.118-.06v-.117l-.177-.12c-.35-.502-.6-1.15-.59-2.006h.06c.204.234.948.377 1.357.415v-.06c-.257-.118-.676-.54-.827-.768V5.9l-.118-.06c-.04-.117-.08-.236-.118-.354h-.06v-.118H.787c-.04-.196-.08-.394-.118-.59-.06-.19-.206-.697-.118-1.005h.06V3.36h.058v-.177h.06v-.177h.057V2.83h.06c.04-.118.078-.236.117-.355h.118v.06c.12.097.237.196.355.295v.118l.118.058c.08.098.157.197.236.295l.176.06.354.413h.118l.177.236h.118l.06.117h.117c.04.06.08.118.118.177h.118l.06.118.235.06.06.117.356.12.06.117.53.176v.06h.118v.058l.236.06v.06c.118.02.236.04.355.058v.06h.177v.058h.177v.06h.176v.058h.236v.06l.472.057v.06l1.417.18v-.237c-.1-.112-.058-.442-.057-.65 0-.573.15-.99.354-1.358v-.117l.118-.06.06-.235.176-.118v-.118c.14-.118.276-.236.414-.355l.06-.117h.117l.12-.177.235-.06.06-.117h.117v-.058H9.7v-.058h.177v-.06h.177v-.058h.177v-.06h.296v-.058h1.063v.058h.294v.06h.177v.058h.178v.06h.177v.058h.118v.06h.118l.06.117c.08.018.158.038.236.058.04.06.08.118.118.177h.118l.06.117c.142.133.193.163.472.178.136-.12.283-.05.472-.118v-.06h.177v-.058h.177v-.06l.236-.058v-.06h.177l.59-.352v.176h-.058l-.06.295h-.058v.117h-.06v.118l-.117.06v.118l-.177.118v.117l-.118.06-.354.412h-.117l-.177.236h.06c.13-.112.402-.053.59-.117l1.063-.353","vkontakte":"15.4 12.8h-1.8c-.7 0-.9-.5-2.1-1.7-1-1-1.5-1.1-1.7-1.1-.4 0-.5.1-.5.6v1.6c0 .4-.1.7-1.3.7-1.9 0-3.9-1.1-5.3-3.2C.6 6.5 0 4.2 0 3.7c0-.3.1-.5.6-.5h1.8c.4 0 .6.2.8.7C4 6.4 5.4 8.6 6 8.6c.2 0 .3-.1.3-.7V5.4c0-1.2-.6-1.3-.6-1.7 0-.2.2-.4.4-.4h2.8c.4 0 .5.2.5.6v3.5c0 .4.2.5.3.5.2 0 .4-.1.8-.5 1.3-1.4 2.2-3.6 2.2-3.6.1-.3.3-.5.8-.5h1.8c.5 0 .6.3.5.6-.2 1-2.4 4-2.4 4-.2.3-.3.4 0 .8.2.3.8.8 1.2 1.3.8.8 1.3 1.6 1.5 2.1 0 .4-.2.7-.7.7","gplus":"8,6.5v3h4.291c-0.526,2.01-2.093,3.476-4.315,3.476C5.228,12.976,3,10.748,3,8c0-2.748,2.228-4.976,4.976-4.976c1.442,0,2.606,0.623,3.397,1.603L13.52,2.48C12.192,0.955,10.276,0,8,0C3.582,0,0,3.582,0,8s3.582,8,8,8s7.5-3.582,7.5-8V6.5H8","odnoklassniki":"8 2.6c.9 0 1.7.7 1.7 1.7C9.7 5.2 9 6 8 6c-.9 0-1.7-.7-1.7-1.7S7.1 2.6 8 2.6zm0 5.7c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm1.6 3.2c.8-.2 1.6-.5 2.3-1 .5-.3.7-1.1.4-1.6-.3-.6-1.1-.7-1.6-.4-1.6 1-3.8 1-5.4 0-.6-.3-1.3-.1-1.6.4-.4.6-.2 1.3.3 1.7.7.5 1.5.8 2.3 1l-2.2 2.2c-.5.5-.5 1.2 0 1.7.2.2.5.3.8.3.3 0 .6-.1.8-.3L8 13.2l2.2 2.2c.5.5 1.2.5 1.7 0s.5-1.2 0-1.7l-2.3-2.2","pocket":"12.533 6.864L8.77 10.4c-.213.2-.486.3-.76.3-.273 0-.547-.1-.76-.3L3.488 6.865c-.437-.41-.45-1.09-.032-1.52.42-.428 1.114-.443 1.55-.032l3.006 2.823 3.004-2.823c.438-.41 1.132-.396 1.55.032.42.43.406 1.11-.03 1.52zm3.388-4.928c-.207-.56-.755-.936-1.363-.936H1.45C.854 1 .31 1.368.096 1.917.032 2.08 0 2.25 0 2.422v4.73l.055.94c.232 2.14 1.366 4.01 3.12 5.314.03.024.063.047.094.07l.02.013c.94.673 1.992 1.13 3.128 1.353.524.104 1.06.157 1.592.157.492 0 .986-.045 1.472-.133.058-.01.116-.022.175-.034.016-.003.033-.01.05-.018 1.088-.233 2.098-.677 3.003-1.326l.02-.015c.032-.022.064-.045.096-.07 1.753-1.303 2.887-3.173 3.12-5.312l.054-.94v-4.73c0-.165-.02-.327-.08-.487","telegram":"12.4 4.2L6.6 9.6c-.2.2-.3.4-.4.7L6 11.8c0 .2-.3.2-.3 0l-.8-2.6c-.1-.4.1-.7.3-.8l7-4.3c.2-.2.4 0 .2.1zm2.9-3L.5 6.9c-.4.1-.4.7 0 .8L4.1 9l1.4 4.5c.1.3.4.4.7.2l2-1.6c.2-.2.5-.2.7 0l3.6 2.6c.3.2.6 0 .7-.3l2.6-12.8c.1-.2-.2-.5-.5-.4","whatsapp":"15.8 7.8c0 4.2-3.4 7.6-7.6 7.6-1.3 0-2.6-.3-3.7-.9L.3 15.8l1.4-4.1C1 10.6.6 9.2.6 7.8.6 3.6 4 .2 8.2.2c4.2 0 7.6 3.4 7.6 7.6M8.1 1.4c-3.5 0-6.4 2.9-6.4 6.4 0 1.4.5 2.7 1.2 3.7l-.8 2.4 2.5-.8c1 .7 2.2 1.1 3.5 1.1 3.5 0 6.4-2.9 6.4-6.4.1-3.5-2.8-6.4-6.4-6.4M12 9.5c0-.1-.2-.1-.4-.2s-1.1-.5-1.3-.6c-.2-.1-.3-.1-.4.1-.1.2-.4.6-.6.7-.1.1-.2.1-.4 0-.1 0-.8-.2-1.5-.8-.6-.5-.9-1.1-1-1.3-.1-.2 0-.3.1-.4l.3-.3c.1-.1.1-.2.2-.3 0-.2 0-.3-.1-.4 0-.1-.4-1-.6-1.4-.1-.3-.3-.2-.4-.2h-.4c-.1 0-.3 0-.5.2-.1.2-.6.6-.6 1.5s.7 1.8.8 1.9c.1.1 1.3 2.1 3.2 2.8 1.9.7 1.9.5 2.2.5.3 0 1.1-.4 1.3-.9.1-.4.1-.8.1-.9","viber":"13.7 6.7c0 .3.1.7-.3.8-.6.1-.5-.4-.5-.8-.4-2.3-1.2-3.2-3.5-3.7-.4-.1-.9 0-.8-.5.1-.5.5-.4.9-.3 2.3.3 4.2 2.3 4.2 4.5zM8.8 1.2c3.7.6 5.5 2.4 5.9 6.1 0 .3-.1.9.4.9s.4-.5.4-.9c0-3.6-3.1-6.8-6.7-7-.2.1-.8-.1-.8.5 0 .4.4.3.8.4zm5.7 10.2c-.5-.4-1-.7-1.5-1.1-1-.7-1.9-.7-2.6.4-.4.6-1 .6-1.6.4-1.7-.8-2.9-1.9-3.7-3.6-.3-.7-.3-1.4.5-1.9.4-.3.8-.6.8-1.2 0-.8-2-3.5-2.7-3.7-.3-.1-.6-.1-1 0C.9 1.2.2 2.7.9 4.4c2.1 5.2 5.8 8.8 11 11 .3.1.6.2.8.2 1.2 0 2.5-1.1 2.9-2.2.3-1-.5-1.5-1.1-2zM9.7 4c-.2 0-.5 0-.6.3-.1.4.2.5.5.5.9.2 1.4.7 1.5 1.7 0 .3.2.5.4.4.3 0 .4-.3.4-.6 0-1.1-1.2-2.3-2.2-2.3","email":"12.7 1c1 .5 1.8 1.2 2.3 2.2.5.9.8 1.9.8 3.1 0 .9-.1 1.8-.5 2.7-.3.9-.8 1.6-1.4 2.2-.6.6-1.4.9-2.3.9-.6 0-1.1-.2-1.5-.5-.4-.3-.6-.7-.7-1.2-.6 1.1-1.5 1.6-2.5 1.6-.8 0-1.5-.3-1.9-.8-.5-.6-.7-1.3-.7-2.2 0-.8.1-1.6.4-2.5S5.5 5 6.1 4.4c.7-.6 1.5-.8 2.6-.8.5 0 1 .1 1.4.2.5.1.9.3 1.3.6l-.7 4.9v.3c0 .2 0 .4.1.5.1.1.3.2.5.2.4 0 .8-.2 1.1-.7.3-.4.5-1 .7-1.6.1-.7.2-1.3.2-1.9 0-1.3-.4-2.3-1.1-3-.8-.7-1.9-1-3.4-1s-2.7.4-3.7 1.1c-.9.7-1.6 1.6-2 2.6S2.6 7.9 2.6 9c0 .9.2 1.8.6 2.5.4.7 1 1.3 1.7 1.7.7.4 1.7.6 2.7.6.5 0 1-.1 1.6-.2.6-.1 1.1-.3 1.5-.4l.4 1.9c-.6.2-1.2.4-1.8.5-.7.1-1.3.2-1.9.2-1.4 0-2.7-.3-3.8-.9s-1.9-1.4-2.5-2.4S.2 10.3.2 9c0-1.3.3-2.7 1-4 .6-1.4 1.6-2.5 3-3.4C5.5.7 7.2.2 9.2.2c1.3 0 2.5.3 3.5.8zm-4 8.4l.6-3.9c-.3-.1-.5-.2-.7-.2-.7 0-1.2.4-1.5 1.2-.3.8-.5 1.7-.5 2.6 0 .8.3 1.2.8 1.2s.9-.3 1.3-.9","more":"14.725 6.667H9.333V1.275C9.333.57 8.738 0 8 0S6.667.57 6.667 1.275v5.392H1.275C.57 6.667 0 7.262 0 8s.57 1.334 1.275 1.334h5.392v5.393C6.667 15.43 7.262 16 8 16s1.333-.57 1.333-1.273V9.334h5.392C15.43 9.334 16 8.738 16 8s-.57-1.333-1.275-1.333"};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Odnoklassniki service provider
 */

var config = __webpack_require__(0),
    utils  = __webpack_require__(2),
    dom    = __webpack_require__(1);

var odnoklassniki = {
    counterUrl: config.secure 
        ? undefined 
        : 'http://connect.ok.ru/dk?st.cmd=extLike&ref={url}&uid={index}',
    counter: function (url, promise) {
        this.promises.push(promise);
        
        dom.getScript(utils.makeUrl(url, {
            index: this.promises.length - 1
        }));
    },
    promises: [],
    popupUrl: 'http://connect.ok.ru/dk?st.cmd=WidgetSharePreview&service=odnoklassniki&st.shareUrl={url}',
    popupWidth: 640,
    popupHeight: 400
};

utils.set(window, 'ODKL.updateCount', function (index, counter) {
    odnoklassniki.promises[index](counter);
});

module.exports = odnoklassniki;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Vkontakte service provider
 */

var config = __webpack_require__(0),
    utils  = __webpack_require__(2),
    dom    = __webpack_require__(1);

var vkontakte = {
    counterUrl: 'https://vk.com/share.php?act=count&url={url}&index={index}',
    counter: function (url, promise) {
        this.promises.push(promise);
        
        dom.getScript(utils.makeUrl(url, {
            index: this.promises.length - 1
        }));
    },
    promises: [],
    popupUrl: config.protocol + '//vk.com/share.php?url={url}&title={title}',
    popupWidth: 550,
    popupHeight: 330
};

utils.set(window, 'VK.Share.count', function (index, count) {
    vkontakte.promises[index](count);
});

module.exports = vkontakte;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

/**
 * Facebook service provider
 */

module.exports = {
    counterUrl: 'https://graph.facebook.com/?fields=share,og_object{likes.limit(0).summary(true),comments.limit(0).summary(true)}&id={url}&callback=?',
    convertNumber: function (counter) {
        return counter.share.share_count;
    },
    popupUrl: 'https://www.facebook.com/sharer/sharer.php?u={url}',
    popupWidth: 600,
    popupHeight: 500
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Twitter service provider
 */

var config = __webpack_require__(0);

var twitter = {
    popupUrl: config.protocol + '//twitter.com/intent/tweet?url={url}&text={title}',
    popupWidth: 600,
    popupHeight: 450,
    click: function () {
        if (!/[\.\?:\-–—]\s*$/.test(this.options.title)) {
            this.options.title += ':';
        }

        return true;
    }
};

module.exports = twitter;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Google+ service provider
 */

var config = __webpack_require__(0),
    utils  = __webpack_require__(2),
    dom    = __webpack_require__(1);

var gplus = {
    gid: 0,
    promises: {},
    popupUrl: 'https://plus.google.com/share?url={url}',
    popupWidth: 700,
    popupHeight: 500
};

module.exports = gplus;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Pocket service provider
 */

var config = __webpack_require__(0);

var pocket = {
    popupUrl: config.protocol + '//getpocket.com/save?url={url}&format=json&callback=?',
    popupWidth: 600,
    popupHeight: 300
};

module.exports = pocket;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

/**
 * Telegram service provider
 */

module.exports = {
    popupUrl: 'tg://msg?text={title}%0A{url}',
    popupWidth: 600,
    popupHeight: 450
};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

/**
 * WhatsApp service provider
 */

module.exports = {
    popupUrl: 'whatsapp://send?text={title}%0A{url}',
    popupWidth: 600,
    popupHeight: 450
};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

/**
 * Viber service provider
 */

module.exports = {
    popupUrl: 'viber://forward?text={title}%0A{url}',
    popupWidth: 600,
    popupHeight: 450
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * E-mail service provider
 */

var config = __webpack_require__(0);

var email = {
    popupUrl: 'mailto:?subject={title}&body={url}',
    popupWidth: 0,
    popupHeight: 0
};

module.exports = email;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var config = __webpack_require__(0);

module.exports = {
	parent: config.name,
    className: config.name + '--expanded'
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var services = __webpack_require__(4),
    Factory  = __webpack_require__(34),
    utils    = __webpack_require__(2),
    dom      = __webpack_require__(1);

var factories = {};

/**
 * Fetch data
 *
 * @param {String} service
 * @param {String} url
 * @param {Object} options
 * @return {Promise}
 */
module.exports = function (service, url, options) {
    if (!factories[service]) {
        factories[service] = {};
    }

    var counters = factories[service],
        counter  = counters[url];

    if (!options.forceUpdate && counter) {
        return counter;
    }

    counter = Factory();

    var href = utils.makeUrl(options.counterUrl, {
        url: url
    });

    services[service].counter(href, counter, url);

    counters[url] = counter;

    return counters[url];
};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

/**
 * Factory function
 * 
 * This function returns function with following API:
 * 
 * - if passed argument is callback, then this callback would be callled
 *   if the value was changed
 * - if passed argument is anything but undefined or function, then this 
 *   function behaves like setter
 * - if argument isn't provided, then return value stored in closure
 * 
 * @param {Object} value
 * @return {Function}
 */
module.exports = function (value) {
    var listeners = [];
    
    return function (argument) {
        var type = typeof argument;
        
        if (type == 'undefined') {
            return value;
        }
        else if (type == 'function') {
            listeners.push(argument);
        }
        else {
            value = argument;
            
            listeners.forEach(function (listener) {
                listener(argument);
            });
        }
    };
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeSwipeable;

var _animate = __webpack_require__(8);

function makeSwipeable(el, callback) {
  var x = 0;
  var shift = 0;
  var direction = null;
  var firstX = void 0;
  var currentX = void 0;

  function down(eDown) {
    if (el.closest('.is-answered')) {
      return false;
    }

    if (eDown.touches) {
      eDown = eDown.touches[0];
    }

    // x = eDown.clientX + shift;
    x = eDown.clientX;
    firstX = x;

    function move(eMove) {
      if (eMove.touches) {
        eMove = eMove.touches[0];
      }

      shift = x - eMove.clientX;
      direction = x - eMove.clientX > 0 ? 'left' : 'right';
      currentX = eMove.clientX;

      var opacity = Math.ceil((100 / (el.offsetWidth / Math.abs(shift))).toFixed() / 10) * 10;
      el.dataset.opacity = opacity > 100 ? 100 : opacity;
      el.dataset.dir = direction;
      el.style.transform = 'translate3d(' + -shift + 'px, 0, 0)';
    }

    function up(eUp) {
      if (direction) {
        (function (dir) {
          (0, _animate.requestAnimate)({
            duration: 100,
            timing: function timing(timeFraction) {
              return timeFraction;
            },
            draw: function draw(progress) {
              var p = 1 - progress;
              el.style.transform = 'translate3d(' + -shift * p + 'px, 0, 0)';

              if (progress === 1 && Math.abs(currentX - firstX) > el.offsetWidth * 0.4) {
                callback(dir);
              }
            }
          });
        })(direction);
      }

      direction = null;
      el.dataset.dir = '';

      document.removeEventListener('mousemove', move);
      document.removeEventListener('touchmove', move);
      document.removeEventListener('mouseup', up);
      document.removeEventListener('touchend', up);
      document.removeEventListener('touchleave', up);
      document.removeEventListener('touchcancel', up);
    }

    document.addEventListener('mousemove', move);
    document.addEventListener('touchmove', move);
    document.addEventListener('mouseup', up);
    document.addEventListener('mouseleave', up);
    document.addEventListener('touchend', up);
    document.addEventListener('touchleave', up);
    document.addEventListener('touchcancel', up);

    return true;
  }

  el.addEventListener('mousedown', down);
  el.addEventListener('touchstart', down);
}

/***/ })
/******/ ]);
//# sourceMappingURL=all.js.map