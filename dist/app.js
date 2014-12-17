(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function (css, customDocument) {
  var doc = customDocument || document;
  if (doc.createStyleSheet) {
    var sheet = doc.createStyleSheet()
    sheet.cssText = css;
    return sheet.ownerNode;
  } else {
    var head = doc.getElementsByTagName('head')[0],
        style = doc.createElement('style');

    style.type = 'text/css';

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(doc.createTextNode(css));
    }

    head.appendChild(style);
    return style;
  }
};

module.exports.byUrl = function(url) {
  if (document.createStyleSheet) {
    return document.createStyleSheet(url).ownerNode;
  } else {
    var head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');

    link.rel = 'stylesheet';
    link.href = url;

    head.appendChild(link);
    return link;
  }
};

},{}],2:[function(require,module,exports){
/* jshint node: true, strict: true */
/* global window: true */

"use strict";


var is      = require('is'),
    utils   = require('./utils.js'),

    whiteListAttributes = [
        'accept', 'accept-charset', 'accesskey', 'action', 'align', 'alt', 'async',
        'autocomplete', 'autofocus', 'autoplay', 'autosave', 'bgcolor', 'border',
        'buffered', 'challenge', 'charset', 'checked', 'cite', 'code', 'codebase', 
        'color', 'cols', 'colspan', 'content', 'contenteditable', 'contextmenu', 
        'controls', 'coords', 'datetime', 'default', 'defer', 'dir', 'dirname', 
        'disabled', 'download', 'draggable', 'dropzone', 'enctype', 'for', 'form', 
        'formaction', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 
        'http-equiv', 'icon', 'id', 'ismap', 'itemprop', 'keytype', 'kind', 'label', 
        'lang', 'language', 'list', 'loop', 'low', 'manifest', 'max', 'maxlength', 
        'media', 'method', 'min', 'multiple', 'name', 'novalidate', 'open', 'optimum', 
        'pattern', 'ping', 'placeholder', 'poster', 'preload', 'pubdate', 'radiogroup', 
        'readonly', 'rel', 'required', 'reversed', 'rows', 'rowspan', 'sandbox', 
        'spellcheck', 'scope', 'scoped', 'seamless', 'selected', 'shape', 'size', 
        'sizes', 'span', 'src', 'srcdoc', 'srclang', 'start', 'step', 'summary', 
        'tabindex', 'target', 'title', 'type', 'usemap', 'value', 'width', 'wrap'
];



module.exports = function(tag, doc){

    return function build(){

        doc = utils.getDocument(doc);

        var args    = Array.prototype.slice.call(arguments),
            element = doc.createElement(tag);

        if (!args[0]) {
            return element;
        }

        args.forEach(function(arg){

            if (is.obj(arg) && !utils.isHTMLElement(arg)) {

                Object.keys(arg).forEach(function(attribute){
                    if (attribute === 'class' || attribute === 'cl' || attribute === 'cls') {
                        element.setAttribute('class', arg[attribute]);

                    } else if (attribute === 'innerHTML' || attribute === 'ih') {
                        element.innerHTML = arg[attribute];

                    } else if (attribute === 'style') {
                        element.setAttribute('style', utils.buildKeyValueString(arg, attribute));

                    } else if (attribute === 'data') {
                        utils.setDataAttribute(element, arg, attribute);

                    } else if (whiteListAttributes.indexOf(attribute) !== -1) {
                        element.setAttribute(attribute, arg[attribute]);

                    }
                });

            }

            // If the argument is a string, it should be appended as text node
            else if(is.str(arg)){
                element.appendChild(doc.createTextNode(arg));
            }

            // Else if the argument is not an object we assume it is htmlElement
            else if(arg && utils.isHTMLElement(arg)){
                element.appendChild(arg);
            }

        });

        return element;

    };

};

},{"./utils.js":5,"is":6}],3:[function(require,module,exports){
/* jshint node: true, strict: true */

"use strict";

var Tag = require('./tag.js');
module.exports = new Tag();

},{"./tag.js":4}],4:[function(require,module,exports){
/* jshint node: true, strict: true */

"use strict";

var Builder         = require('./builder.js'),

    whiteListTags   = [
    'a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio',
    'b', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button',
    'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'command',
    'datalist', 'dd', 'del', 'details', 'dfn', 'div', 'dl', 'dt', 'em',
    'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'frame',
    'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header',
    'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd',
    'keygen', 'label', 'legend', 'li', 'link', 'map', 'mark', 'meta',
    'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option',
    'output', 'p', 'param', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby',
    'samp', 'script', 'section', 'select', 'small', 'source', 'span',
    'split', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody',
    'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr',
    'track', 'tt', 'ul', 'var', 'video', 'wbr'
];



module.exports = function(doc){
    whiteListTags.forEach(function(element){
        this[element] = new Builder(element, doc);
    }.bind(this));
};

},{"./builder.js":2}],5:[function(require,module,exports){
/* jshint node: true, strict: true */
/* global window: true */

/** @module utils */

"use strict";



/**
  * Parse camelCaseString into spinal-case-string
  * @param {String} value Camel case String
  * @returns {String} 
  */

module.exports.camelCaseToSpinalCase = function(value) {
    return value.match(/[A-Z]?[a-z]+/g).join('-').toLowerCase();
};



/** 
  * Check if a value is a HTMLElement 
  * @param {*} value Any type of value
  * @returns {Boolean}
  */

module.exports.isHTMLElement = function(value) {
    return value.nodeType === 1;
};



/**
  * Build a key:value; string out of the key / values
  * in a Object.
  * @param {Object} obj Object holding key / value pairs
  * @param {String} key Which key in the Object to pick 
  * key / value pairs from
  * @returns {String} 
  */

module.exports.buildKeyValueString = function(obj, key){
    return Object.keys(obj[key]).map(function(value){
        return this.camelCaseToSpinalCase(value) + ':' + obj[key][value];
    }.bind(this)).join(';');
};



/**
  * Build data-* attributes out of the key / values
  * in a Object.
  * @param {HTMLElement} element Element to apply the data-* 
  * attributes to
  * @param {Object} obj Object holding key / value pairs
  * @param {String} key Which key in the Object to pick 
  * key / value pairs from
  * @returns {HTMLElement} 
  */

module.exports.setDataAttribute = function(element, obj, key){
    Object.keys(obj[key]).forEach(function(value){
        element.setAttribute('data-' + this.camelCaseToSpinalCase(value), obj[key][value]);
    }.bind(this));

    return element;
};



/**
  * Provide a HTML document based on which environment
  * one operate in. This function is mainly used to wrangle
  * that one want to run the js code in different
  * environments and not all provide a HTML document.
  *
  * This function will first look for "window.document".
  * If pressent, it will be returned as the HTML document.
  * If "window.document" is not pressent, it will check
  * if a HTML document was provided (ex by JSDom) as a 
  * method attribute. If provided it will be returned.
  * If no HTML document was provided, it will look for 
  * a "document" variable on the node.js specific
  * "GLOBAL" object.
  *
  * @param {HTMLDocument} doc A HTML Document
  * @returns {HTMLDocument}
  */

module.exports.getDocument = function(doc) {
    
    // In browser
    if(typeof window !== 'undefined') {
        return window.document;
    }

    // Document is manually provided
    if(doc) {
        return doc;
    }

    // In node.js
    if (GLOBAL) {
        return GLOBAL.document;
    }

    // No clue where we are
    return null;
};

},{}],6:[function(require,module,exports){
/* jshint node: true, strict: true */

/** @module is */

"use strict";



/** 
  * Check if a value is an Array 
  * @param {*} value Any type of value
  * @returns {Boolean}
  */

module.exports.arr = function(value) {
    return value instanceof Array;
};



/** 
  * Check if a value is an Object 
  * @param {*} value Any type of value
  * @returns {Boolean}
  */

module.exports.obj = function(value) {
    return value instanceof Object;
};



/** 
  * Check if a value is a Function 
  * @param {*} value Any type of value
  * @returns {Boolean}
  */

module.exports.fn = function(value) {
    return typeof value === 'function';
};



/** 
  * Check if a value is a String 
  * @param {*} value Any type of value
  * @returns {Boolean}
  */

module.exports.str = function(value) {
    return typeof value === 'string';
};



/** 
  * Check if a value is a Number 
  * @param {*} value Any type of value
  * @returns {Boolean}
  */

module.exports.num = function(value) {
    return typeof value === 'number';
};



/** 
  * Check if a value is a Date 
  * @param {*} value Any type of value
  * @returns {Boolean}
  */

module.exports.date = function(value) {
    return Object.prototype.toString.call(value) === '[object Date]';
};



/** 
  * Check if a value is a parsable JSON 
  * @param {*} value Any type of value
  * @returns {Boolean}
  */

module.exports.json = function(value) {
    try {
        JSON.parse(value);
    } catch (e) {
        return false;
    }
    return true;
};



/** 
  * Check if a value is an Object, Array or String empty
  * @param {*} value Any type of value
  * @returns {Boolean}
  */

module.exports.empty = function(obj) {
    if (obj === null) {
        return true;
    }
    if (this.arr(obj) || this.str(obj)) {
        return obj.length === 0;
    }
    if (this.obj(obj)) {
        return Object.keys(obj).length === 0;
    }
    return true;
};



/** 
  * Check if a value is undefined
  * @param {*} value Any type of value
  * @returns {Boolean}
  */

module.exports.undef = function(variable) {
    return variable === void(0);
};

},{}],7:[function(require,module,exports){
var css = "body {\n  margin: 0;\n  color: #000;\n  font-family: \"Helvetica Neue\" sans-serif;\n}\n\nheader {\n  background-color: #993300;\n  color: #fff;\n  padding: 40px;\n  font-size: 30px;\n  border-top: 10px solid #997700;\n}\n"; (require("/Users/havber/github/gulp-test/node_modules/cssify"))(css); module.exports = css;
},{"/Users/havber/github/gulp-test/node_modules/cssify":1}],8:[function(require,module,exports){
/*jshint node: true*/
/*global document*/
"use strict";

var styleNode = require('../css/styles.css'),
    tag = require('tag'),
    body = document.body;

body.appendChild(
    tag.header('This is the header!')
);

body.appendChild(tag.div(
    {cls: 'js-content'},
    tag.h1('This is a H1-tag')
));

},{"../css/styles.css":7,"tag":3}]},{},[8]);
