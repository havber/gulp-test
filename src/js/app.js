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
