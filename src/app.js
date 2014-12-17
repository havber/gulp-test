/*jshint node: true*/
/*global document*/
"use strict";

var styleNode = require('../css/styles.css'),
    tag = require('tag'),
    content = document.querySelector('#content');

content.appendChild(tag.div(
    tag.h1('Hepparoo!')
));
