'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: './public/js/main.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public/js'
  },
  watch: true,

  devtool: "source-map",

  module: {}
};
