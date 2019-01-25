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
        href: 'https://www.psbank.ru/Business/Everyday/Cards/Corporate?utm_source=special&utm_medium=publicrelations&utm_campaign=vc29112018&utm_content=test',
        target: '_blank',
        innerHTML: _svg2.default.logo
      });

      EL.q = (0, _dom.makeElement)('div', CSS.main + '__question');

      EL.controls = (0, _dom.makeElement)('div', CSS.main + '__controls');
      EL.optionL = (0, _dom.makeElement)('div', CSS.main + '__option', {
        innerHTML: '<button class="' + CSS.main + '__btn">\u0414\u0430</button>',
        data: {
          type: 'left'
        }
      });
      EL.optionR = (0, _dom.makeElement)('div', CSS.main + '__option', {
        innerHTML: '<button class="' + CSS.main + '__btn">\u041D\u0435\u0442</button>',
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

      EL.backCard = (0, _dom.makeElement)('div', [CSS.main + '-card', 'is-back']);
      EL.bcHead = (0, _dom.makeElement)('div', CSS.main + '-card__head');
      EL.bcBottom = (0, _dom.makeElement)('div', CSS.main + '-card__bottom');
      EL.bcAnswer = (0, _dom.makeElement)('div', CSS.main + '-card__answer');
      EL.bcAnswerTitle = (0, _dom.makeElement)('div', CSS.main + '-card__answer-title');
      EL.bcAnswerText = (0, _dom.makeElement)('div', CSS.main + '-card__answer-text');
      EL.bcAnswerImg = (0, _dom.makeElement)('img', CSS.main + '-card__answer-img');

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

      EL.rHeadInner.appendChild(EL.rResult);
      EL.rHeadInner.appendChild(EL.rTitle);
      EL.rHeadInner.appendChild(EL.rShare);
      EL.rHeadInner.appendChild(EL.rRestartBtn);

      EL.rHead.appendChild(EL.rHeadInner);
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

      EL.nextCard = (0, _dom.makeElement)('div', CSS.main + '-next-card');
      EL.ncHead = (0, _dom.makeElement)('div', CSS.main + '-next-card__head');
      EL.ncBottom = (0, _dom.makeElement)('div', CSS.main + '-next-card__bottom');

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

      if (index > _data2.default.questions.length / 2) {
        EL.nextCards.innerHTML = '<div></div>';
        EL.nextCards.firstChild.appendChild(nextCard);
      } else if (index > _data2.default.questions.length / 4) {
        EL.nextCards.innerHTML = '<div></div><div></div>';
        EL.nextCards.firstChild.appendChild(nextCard);
      } else {
        EL.nextCards.innerHTML = '<div></div><div></div><div></div>';
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
      EL.cImgTo.dataset.id = this.activeIndex + 1;
      EL.cImgTo.src = question.to.img;

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

      // EL.cardInner.style.transform = `translate3d(0,0,0) rotateY(${type === 'left' ? -180 : 180}deg)`;
      EL.cardInner.style.transform = 'translate3d(0,0,0) rotateY(-180deg)';

      (0, _dom.removeChildren)(EL.controls);
      EL.controls.appendChild(EL.nextBtn);

      if (question.correct === type) {
        this.correctAnswers += 1;
        EL.backCard.classList.add('is-correct');
      } else {
        EL.backCard.classList.add('is-incorrect');
      }

      EL.bcAnswerImg.dataset.id = this.activeIndex + 1;
      EL.bcAnswerImg.src = question.answer.img;
      EL.bcAnswerTitle.textContent = question.answer.title;
      EL.bcAnswerText.innerHTML = question.answer.text;

      if (this.activeIndex === _data2.default.questions.length - 1) {
        EL.nextBtn.innerHTML = 'Результат';
        EL.nextBtn.dataset.click = 'result';
      }
    }
  }, {
    key: 'result',
    value: function result() {
      // const { result, index } = Special.getResult(this.correctAnswers);

      EL.cards.removeChild(EL.cardWrapper);
      EL.cardInner.style.transform = '';

      EL.backCard.classList.remove('is-correct');
      EL.backCard.classList.remove('is-incorrect');

      this.container.classList.remove('is-answered');
      this.container.classList.add('is-result');
      this.container.removeChild(EL.q);
      this.container.appendChild(EL.result);

      EL.rResult.innerHTML = this.correctAnswers + ' \u0438\u0437 ' + _data2.default.questions.length + ' \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0445 \u043E\u0442\u0432\u0435\u0442\u043E\u0432';
      EL.rTitle.innerHTML = 'Рублёвая монета дорожает в&nbsp;100 раз, если её гравировку перекосило';

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

      this.start();
    }
  }], [{
    key: 'makeNextCard',
    value: function makeNextCard(index) {
      var q = _data2.default.questions[index];

      // EL.bcImg.src = q.img;

      return EL.nextCard;
    }
  }, {
    key: 'getResult',
    value: function getResult(score) {
      var result = '';
      var index = 0;
      _data2.default.results.some(function (item, i) {
        if (item.range[0] <= score && item.range[1] >= score) {
          result = item;
          index = i;
          return true;
        }
        return false;
      });

      return { result: result, index: index };
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
      img2x: ''
    },
    to: {
      text: 'плюшевую акулу',
      img: 'https://leonardo.osnova.io/4b5068b4-a3a0-7d6e-e4c7-a11eca497a27/',
      img2x: ''
    },
    answer: {
      title: 'Конечно',
      text: 'Длинная живая акула для аквариума может <a href="https://www.aqua-shop.ru/live/morskie_ryby/hryashchevyue_ugreobraznyue_ievrigalinnyue/prod_H0e10_M" target="_blank">обойтись</a> в несколько сотен тысяч рублей — кэшбека хватит и на плюшевую версию.',
      img: 'https://leonardo.osnova.io/137b1cef-d07d-9886-89cf-e38a35fb6325/',
      img2x: ''
    },
    correct: 'left'
  }, {
    from: {
      text: 'космического<br>скафандра',
      img: 'https://leonardo.osnova.io/0eab816e-1b00-73d5-6dfb-78fb9a24f048/',
      img2x: ''
    },
    to: {
      text: 'обломок челябинского метеорита',
      img: 'https://leonardo.osnova.io/73ce374f-56f4-5f42-a061-902b7773e9cc/',
      img2x: ''
    },
    answer: {
      title: 'Абсолютно',
      text: 'Цена костюма для выхода в открытый космос <a href="https://www.kommersant.ru/doc/3598831" target="_blank">достигает</a> $12 млн долларов, а кусочек метеорита можно <a href="https://www.chel.kp.ru/daily/26793/3828119/" target="_blank">приобрести</a> даже за 500 рублей. Опасайтесь подделок.',
      img: 'https://leonardo.osnova.io/119a4f6d-ab9e-5c82-31da-d6db92594b02/',
      img2x: ''
    },
    correct: 'left'
  }, {
    from: {
      text: 'шины для<br>болида «Формулы 1»',
      img: 'https://leonardo.osnova.io/477a381c-b706-4d2c-25c8-ca81519634d7/',
      img2x: ''
    },
    to: {
      text: 'ящик<br>шампанского',
      img: 'https://leonardo.osnova.io/70e52ece-0cef-568a-b1d4-3f0ffe70f7a9/',
      img2x: ''
    },
    answer: {
      title: 'Не хватит',
      text: 'Шина не такая дорогая — <a href="https://www.bbc.com/sport/formula1/22294880" target="_blank">около</a> 25 тысяч рублей, зато на год их нужно больше семиста штук.',
      img: 'https://leonardo.osnova.io/6faf1616-7908-a129-61e8-13c7b8d18fcc/',
      img2x: ''
    },
    correct: 'right'
  }, {
    from: {
      text: 'космической ручки',
      img: 'https://leonardo.osnova.io/b7243b7a-79e3-7647-65ca-5de4cf91dec1/',
      img2x: ''
    },
    to: {
      text: 'коробку восковых<br>карандашей',
      img: 'https://leonardo.osnova.io/244de9e0-22eb-c22a-349a-ffaaf6ae8b8c/',
      img2x: ''
    },
    answer: {
      title: 'Нет',
      text: 'Про эту пару есть миф: пока NASA разрабатывало дорогую ручку, советские космонавты пользовались карандашами. На самом деле, все сначала писали карандашами, а затем распробовали антигравитационную ручку — всего $6-10 за штуку.',
      img: 'https://leonardo.osnova.io/ee9e3b45-f29d-121b-5ee0-0bc07a11d392/',
      img2x: ''
    },
    correct: 'right'
  }, {
    from: {
      text: 'автомобиля с тысячью лошадиных сил',
      img: 'https://leonardo.osnova.io/78119dcd-333c-4ff4-fa26-661ab7c56fd2/',
      img2x: ''
    },
    to: {
      text: 'тысячу лошадей',
      img: 'https://leonardo.osnova.io/9e7b4c5e-0c3b-a2b5-64ff-a3f060ce52df/',
      img2x: ''
    },
    answer: {
      title: 'Исключено',
      text: 'Суперкаров такой мощности достаточно много, но кэшбека от них всё равно не хватит на огромный табун — его цена может <a href="https://journal.tinkoff.ru/horse/" target="_blank">составить</a> полмиллиона долларов.',
      img: 'https://leonardo.osnova.io/e1b8a807-7421-9823-ceee-62e7e47eccc9/',
      img2x: ''
    },
    correct: 'right'
  }, {
    from: {
      text: 'связки бананов<br>в России',
      img: 'https://leonardo.osnova.io/3aa2ad93-aaf7-e9a9-2c12-aeb335ba1639/',
      img2x: ''
    },
    to: {
      text: 'связку бананов<br>в Эквадоре',
      img: 'https://leonardo.osnova.io/19f73ce4-b481-1044-5884-0e7f0cbdcefa/',
      img2x: ''
    },
    answer: {
      title: 'Не хватит',
      text: 'Российские <a href="https://www.marketing.spb.ru/mr/food/banana.htm" target="_blank">супермаркеты</a> почти не зарабатывают на бананах, но их наличие на полках — важный фактор для посетителей.',
      img: 'https://leonardo.osnova.io/97ee7f5d-e2d6-ba43-212b-f905126fabc3/',
      img2x: ''
    },
    correct: 'right'
  }, {
    from: {
      text: 'сумки<br>Balenciaga',
      img: 'https://leonardo.osnova.io/3d8c7fa0-3151-f52e-9b70-bb164dfb7e2e/',
      img2x: ''
    },
    to: {
      text: 'сумку IKEA',
      img: 'https://leonardo.osnova.io/a3b76441-12f9-a408-423b-09f56e918170/',
      img2x: ''
    },
    answer: {
      title: 'Вполне',
      text: 'На этот счёт IKEA выпустила ироничную методичку — как отличить одну сумку от другой, но запутаться сложно: у Balenciaga она <a href="https://www.kp.ru/daily/26671/3693382/" target="_blank">дороже</a> в пару тысяч раз.',
      img: 'https://leonardo.osnova.io/bdffa464-365f-3182-0aa0-6e450c4fce56/',
      img2x: ''
    },
    correct: 'left'
  }, {
    from: {
      text: 'грамма<br>антиводорода',
      img: 'https://leonardo.osnova.io/f8caa44c-97cf-66b7-3603-4b13efdbd825/',
      img2x: ''
    },
    to: {
      text: 'метровый куб золота',
      img: 'https://leonardo.osnova.io/8128206f-d409-7a20-8dee-f0da4893680e/',
      img2x: ''
    },
    answer: {
      title: 'Конечно',
      text: 'Грамм антивещества <a href="https://www.kp.by/daily/24593.4/761647/" target="_blank">оценивается</a> в сумму с 13 нулями, и это можно сравнить с деньгами всего мира.',
      img: 'https://leonardo.osnova.io/c7aaa221-c088-e444-e469-d0605cc89038/',
      img2x: ''
    },
    correct: 'left'
  }, {
    from: {
      text: 'редкой<br>10-рублёвой<br>монеты',
      img: 'https://leonardo.osnova.io/d069bc99-206d-5b0d-bd66-cccecde61756/',
      img2x: ''
    },
    to: {
      text: 'бракованную<br>10-рублёвую монету',
      img: 'https://leonardo.osnova.io/34ba867b-f69f-3a53-8fc7-63e64eb81a2b/',
      img2x: ''
    },
    answer: {
      title: 'Точно',
      text: 'Если чеканка дала сбой, это может поднять стоимость монеты в <a href="http://moneta-russia.ru/library/monetnyy-brak-povorot-shtempelya.php" target="_blank">сотню</a> раз, но цена редких монет <a href="https://grosh-blog.ru/%D1%81%D0%B0%D0%BC%D1%8B%D0%B5-%D0%B4%D0%BE%D1%80%D0%BE%D0%B3%D0%B8%D0%B5-%D0%BC%D0%BE%D0%BD%D0%B5%D1%82%D1%8B-10-%D1%80%D1%83%D0%B1%D0%BB%D0%B5%D0%B9-%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D1%8B%D0%B5/" target="_blank">превышает</a> номинал в десять тысяч раз, хотя они почти не отличаются от обычных.',
      img: 'https://leonardo.osnova.io/c85f6652-8a99-bdcb-4d9a-6c741a52ad76/',
      img2x: ''
    },
    correct: 'left'
  }, {
    from: {
      text: 'парковочного места<br>в Москве',
      img: 'https://leonardo.osnova.io/a5bfdb3e-da59-2ecb-e6ed-c8f99b0c7a1c/',
      img2x: ''
    },
    to: {
      text: 'гектар российской<br>земли',
      img: 'https://leonardo.osnova.io/8fb9d705-ce6c-c255-82e2-0e4c98fde6fe/',
      img2x: ''
    },
    answer: {
      title: 'Да!',
      text: 'Цена на машиноместо в Москве может <a href="https://www.zr.ru/content/news/913545-samoe-dorogoe-parkovochnoe-mest/" target="_blank">доходить</a> до стоимости трёхкомнатной квартиры.',
      img: 'https://leonardo.osnova.io/5aef771c-e213-f3db-2ca3-5140f4a7224f/',
      img2x: ''
    },
    correct: 'left'
  }],
  result: {
    text: '<p>Три процента — максимальный кэшбек на новой дебетовой карте банка «Открытие». Чтобы его получить, нужно выполнить три условия, каждое из которых добавит процент:</p><ul><li>Тратить с карты больше пяти тысяч рублей в месяц.</li><li>Тысячу из них — в мобильном банке.</li><li>Хранить на счету больше 100 тысяч рублей.</li></ul>'
  },
  results: [{
    range: [0, 3]
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
  // cross: '<svg width="27" height="27" viewBox="0 0 27.44 27.45"><path d="M26.94.5a1.7 1.7 0 0 0-2.41 0L13.72 11.31 2.91.5A1.71 1.71 0 0 0 .5 2.91l10.81 10.81L.5 24.53a1.71 1.71 0 0 0 1.22 2.91 1.66 1.66 0 0 0 1.2-.51l10.8-10.8 10.8 10.81a1.72 1.72 0 0 0 1.2.51 1.64 1.64 0 0 0 1.2-.51 1.7 1.7 0 0 0 0-2.41L16.13 13.72 26.94 2.91a1.7 1.7 0 0 0 0-2.41z"/></svg>',
  // tick: '<svg width="28" height="21" viewBox="0 0 29.7 20.28"><path d="M29.18.51a1.76 1.76 0 0 0-2.49 0L11.17 16.04 3 7.87a1.76 1.76 0 1 0-2.48 2.48l9.41 9.41a1.76 1.76 0 0 0 2.49 0L29.18 3a1.76 1.76 0 0 0 0-2.49z"/></svg>',
  // priceTag: '<svg width="180.39" height="40"><path d="M180.22 19.24l-8-16.3v-.08A5.59 5.59 0 0 0 167.26 0h-42.33a6.21 6.21 0 0 0-.71 0H4.99a5 5 0 0 0-5 5v30a5 5 0 0 0 5 5H124.2a6.22 6.22 0 0 0 .72 0h42.33a5.59 5.59 0 0 0 4.88-2.86v-.08l8-16.29a1.73 1.73 0 0 0 .09-1.53zm-13.75.64a4.25 4.25 0 0 1-8.49.12 4.3 4.3 0 0 1 4.25-4.34 4.25 4.25 0 0 1 4.23 4.22z"/></svg>',
  // arrow: '<svg width="10" height="17.15"><path d="M1.82 17l8-8a.54.54 0 0 0 0-.79l-8-8A.54.54 0 0 0 1 .17L.17 1a.54.54 0 0 0 0 .79l6.75 6.78-6.75 6.76a.54.54 0 0 0 0 .79L1 17a.54.54 0 0 0 .82 0z"/></svg>',
  // hat: '<svg width="44.6" height="28.4"><path d="M44.56 7.73a.83.83 0 0 0-.51-.52L22.54.04a.82.82 0 0 0-.48 0L.57 7.2a.82.82 0 0 0-.53 1 .8.8 0 0 0 .12.23l.18.22a.81.81 0 0 0 .23.15l8.64 2.88v9.63a.82.82 0 0 0 .06.31 7.39 7.39 0 0 0 2.53 2.84c2.45 1.77 6 2.72 10.31 2.75v-1.64a17.32 17.32 0 0 1-8.53-1.89 6.91 6.91 0 0 1-2.7-2.53V12.19l11.19 3.73a.79.79 0 0 0 .52 0l5.05-1.68v1.24h-.13a2.85 2.85 0 0 0-1.89 2.5l-2 10 1.61.32 1.57-7.76.24.14a2.84 2.84 0 0 0 .48.22h.13v7.29h1.65v-7.24h.13a2.82 2.82 0 0 0 .48-.22l.24-.14.02.21 1.51 7.59 1.61-.32-2-10.15a2.85 2.85 0 0 0-1.88-2.41h-.13v-1.82h.14l4.35-1.45v9.92a4.52 4.52 0 0 1-.54.58L34.3 24a5 5 0 0 0 1.08-1.29.82.82 0 0 0 .08-.36V11.64h.14l8.45-2.84a.82.82 0 0 0 .51-1.07zm-14.9 10.48a1.22 1.22 0 1 1-1.22-1.22 1.22 1.22 0 0 1 1.22 1.22zm10.95-10l-11.35 3.74-.07-.15a.83.83 0 0 0-.34-.41l-3.9-2.34.06-.15a2.82 2.82 0 0 0 .16-.89 2.89 2.89 0 1 0-1.37 2.39l.1-.07.11.06 3.53 2.12-5.24 1.77-18.87-6.3L4 7.8l18.3-6.1 18.87 6.28zm-17.09-.23A1.22 1.22 0 1 1 22.3 6.8a1.22 1.22 0 0 1 1.22 1.18z"/></svg>',
  // payment: '<svg width="43.48" height="36"><path d="M43.13 11.69L36 7.59a8.15 8.15 0 0 1 2.7-2.46.69.69 0 0 0 0-1.2L32.06.09a.69.69 0 0 0-.69 0 9.53 9.53 0 0 0-3.16 3l-.57-.33a.69.69 0 0 0-.69 0l-8.88 5.09-.07.07L.24 23.28a.69.69 0 0 0-.24.52v2.56a.69.69 0 0 0 .35.6l15.51 9a.69.69 0 0 0 .69 0l26.58-15.4a.69.69 0 0 0 .35-.6v-7.68a.69.69 0 0 0-.35-.59zM31.72 1.5L37 4.57A9.59 9.59 0 0 0 33.3 11L28 8a8.19 8.19 0 0 1 3.72-6.5zm1.86 11.3a.69.69 0 0 0 1-.6 8.1 8.1 0 0 1 .13-1.2L37 12.28l-3 1.76-9.69-5.6L26.68 7a9.48 9.48 0 0 0-.09 1.33.69.69 0 0 0 .35.6zm-6.3-8.67l.24.14a9.57 9.57 0 0 0-.39.95.69.69 0 0 0-.19.07L22.5 7.85a.69.69 0 0 0 0 1.2l11.08 6.4a.69.69 0 0 0 .69 0l4.43-2.56a.69.69 0 0 0 0-1.2l-3.65-2.11a8.17 8.17 0 0 1 .31-.78l6 3.49-7.43 4.31L19.8 8.45zM1.38 26v-1l14.12 8.15v1zm14.74 5.95L1.88 23.68 18.5 9.29l14.24 8.22zm26-12.34l-25.23 14.5v-1L34.33 18l7.76-4.48v6.08z"/><path d="M30.14 17.2L19 10.79a.69.69 0 0 0-.8.08l-3.35 2.93a.69.69 0 0 0 .15 1.12l11.1 6.41a.69.69 0 0 0 .8-.08l3.39-2.94a.69.69 0 0 0-.15-1.11zm-3.82 2.69l-9.83-5.68 2.29-2 9.83 5.68zM25 21.67l-11.1-6.41a.69.69 0 0 0-.8.08l-8.73 7.54A.69.69 0 0 0 4.48 24l11.1 6.41a.69.69 0 0 0 .8-.08l8.71-7.54a.69.69 0 0 0-.09-1.12zM15.84 29L6 23.29l7.6-6.59 9.83 5.68z"/></svg>',
  swipe: '<svg width="54.78" height="60"><path d="M35.22 7.82h12.5l-3 3a1.31 1.31 0 0 0 1.85 1.84l5.23-5.22a1.23 1.23 0 0 0 .13-.2 1.28 1.28 0 0 0 .14-.24 1.27 1.27 0 0 0-.25-1.38L46.58.38a1.301 1.301 0 0 0-1.84 1.84l3 3H35.22a1.3 1.3 0 0 0 0 2.6zM7.44 12.66a1.31 1.31 0 0 0 0-1.84l-3-3H17a1.305 1.305 0 0 0 0-2.61H4.45l3-3A1.301 1.301 0 0 0 5.6.38L.38 5.6A1.3 1.3 0 0 0 .1 6a1.31 1.31 0 0 0 0 1 1.28 1.28 0 0 0 .15.23 1.23 1.23 0 0 0 .13.2l5.22 5.23a1.31 1.31 0 0 0 .92.38 1.29 1.29 0 0 0 .92-.38zM49.57 26.09a5.2 5.2 0 0 0-2.9.88 5.22 5.22 0 0 0-7.83-2.61 5.23 5.23 0 0 0-4.93-3.49 5.18 5.18 0 0 0-2.61.7V13a5.22 5.22 0 1 0-10.44 0v22.22l-4.53-3.4a6.84 6.84 0 0 0-8.89.63 3.92 3.92 0 0 0 0 5.53L26 56.56A11.67 11.67 0 0 0 34.32 60h6.11a14.37 14.37 0 0 0 14.35-14.35V31.3a5.22 5.22 0 0 0-5.21-5.21zm2.61 19.57a11.75 11.75 0 0 1-11.74 11.73h-6.12a9.07 9.07 0 0 1-6.46-2.67L9.29 36.14a1.31 1.31 0 0 1 0-1.84 4.22 4.22 0 0 1 5.49-.39l6.62 5a1.3 1.3 0 0 0 2.09-1V13a2.61 2.61 0 1 1 5.22 0v19.61a1.305 1.305 0 0 0 2.61 0v-6.52a2.61 2.61 0 1 1 5.22 0v6.52a1.305 1.305 0 0 0 2.61 0v-3.92a2.61 2.61 0 0 1 5.22 0v3.91a1.305 1.305 0 0 0 2.61 0v-1.3a2.61 2.61 0 0 1 5.22 0v14.35z"/></svg>',
  swipeL: '<svg viewBox="0 0 54.78 60.01"><path d="M7.44 12.67a1.31 1.31 0 0 0 0-1.84l-3-3H17a1.305 1.305 0 1 0 0-2.61H4.45l3-3A1.301 1.301 0 0 0 5.6.39L.38 5.61a1.3 1.3 0 0 0-.28.4 1.31 1.31 0 0 0 0 1 1.28 1.28 0 0 0 .15.23 1.23 1.23 0 0 0 .13.2l5.22 5.23a1.31 1.31 0 0 0 .92.38 1.29 1.29 0 0 0 .92-.38zM49.57 26.1a5.2 5.2 0 0 0-2.9.88 5.22 5.22 0 0 0-7.83-2.61 5.22 5.22 0 0 0-7.54-2.79v-8.57a5.22 5.22 0 0 0-10.44 0v22.22l-4.53-3.4a6.84 6.84 0 0 0-8.89.63 3.92 3.92 0 0 0 0 5.53L26 56.57a11.67 11.67 0 0 0 8.32 3.44h6.11a14.37 14.37 0 0 0 14.35-14.35V31.31a5.22 5.22 0 0 0-5.21-5.21zm2.63 19.56A11.75 11.75 0 0 1 40.44 57.4h-6.12a9.07 9.07 0 0 1-6.46-2.67L9.29 36.15a1.31 1.31 0 0 1 0-1.84 4.22 4.22 0 0 1 5.49-.39l6.62 5a1.3 1.3 0 0 0 2.09-1V13.01a2.61 2.61 0 0 1 5.22 0v19.61a1.305 1.305 0 1 0 2.61 0V26.1a2.61 2.61 0 0 1 5.22 0v6.52a1.31 1.31 0 0 0 2.61 0V28.7a2.61 2.61 0 1 1 5.22 0v3.91a1.305 1.305 0 0 0 2.61 0v-1.3a2.61 2.61 0 1 1 5.22 0v14.35z"/></svg>',
  swipeR: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48.48 60"><path d="M28.92 7.82h12.5l-3 3a1.31 1.31 0 0 0 1.85 1.84l5.23-5.22a1.23 1.23 0 0 0 .13-.2 1.25 1.25 0 0 0-.11-1.62L40.28.38a1.301 1.301 0 1 0-1.84 1.84l3 3H28.92a1.3 1.3 0 0 0 0 2.6zM43.27 26.09a5.2 5.2 0 0 0-2.9.88 5.22 5.22 0 0 0-7.83-2.61A5.22 5.22 0 0 0 25 21.57V13a5.22 5.22 0 1 0-10.44 0v22.22l-4.53-3.4a6.84 6.84 0 0 0-8.89.63 3.92 3.92 0 0 0 0 5.53L19.7 56.56A11.67 11.67 0 0 0 28.02 60h6.11a14.37 14.37 0 0 0 14.35-14.35V31.3a5.22 5.22 0 0 0-5.21-5.21zm2.61 19.57a11.75 11.75 0 0 1-11.74 11.73h-6.12a9.07 9.07 0 0 1-6.46-2.67L2.99 36.14a1.31 1.31 0 0 1 0-1.84 4.22 4.22 0 0 1 5.49-.39l6.62 5a1.3 1.3 0 0 0 2.09-1V13a2.61 2.61 0 1 1 5.22 0v19.61a1.31 1.31 0 0 0 2.61 0v-6.52a2.61 2.61 0 0 1 5.22 0v6.52a1.31 1.31 0 0 0 2.61 0v-3.92a2.61 2.61 0 0 1 5.22 0v3.91a1.31 1.31 0 0 0 2.61 0v-1.3a2.61 2.61 0 1 1 5.22 0v14.35z"/></svg>',
  refresh: '<svg width="15" height="15"><path d="M14.62.674c-.268-.11-.495-.065-.684.136l-1.27 1.26A7.58 7.58 0 0 0 10.278.542 7.357 7.357 0 0 0 7.5 0a7.298 7.298 0 0 0-2.91.596 7.565 7.565 0 0 0-2.393 1.601A7.567 7.567 0 0 0 .596 4.59 7.298 7.298 0 0 0 0 7.5c0 1.015.199 1.986.596 2.91a7.567 7.567 0 0 0 1.601 2.393 7.57 7.57 0 0 0 2.393 1.601A7.298 7.298 0 0 0 7.5 15c1.12 0 2.185-.236 3.194-.708a7.333 7.333 0 0 0 2.578-1.997.32.32 0 0 0 .073-.22.27.27 0 0 0-.093-.2l-1.338-1.348a.376.376 0 0 0-.244-.087c-.104.013-.179.052-.224.117a4.904 4.904 0 0 1-1.748 1.436A4.925 4.925 0 0 1 7.5 12.5a4.87 4.87 0 0 1-1.938-.395 5.034 5.034 0 0 1-1.597-1.07A5.038 5.038 0 0 1 2.896 9.44 4.87 4.87 0 0 1 2.5 7.5c0-.677.132-1.323.396-1.938a5.036 5.036 0 0 1 1.07-1.597c.449-.45.98-.806 1.596-1.07A4.87 4.87 0 0 1 7.5 2.5c1.309 0 2.445.446 3.409 1.338L9.56 5.186c-.202.195-.248.42-.137.674.11.26.303.39.576.39h4.375a.6.6 0 0 0 .44-.185.6.6 0 0 0 .185-.44V1.25a.584.584 0 0 0-.38-.576z"/></svg>'
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
    if (el.closest('.is-correct') || el.closest('.is-incorrect')) {
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