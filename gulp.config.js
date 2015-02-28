'use strict';

var client = './public/';
var temp = './tmp/';

var config = {
  client: client,
  clientNoLeadingDot: client.substring(1, client.length),

  less: client + 'css/app.less',
  css: client + 'css/',

  devServer: 'localhost',
  devPort: 8080,

  bower: {
    json: require('./bower.json'),
    directory: client + 'bower_components'
  },
  js: [
    client + 'js/components/**/*.js',
    client + 'js/main/**/*.js',
    client + 'js/**/*.js'
    //'!' + client + '**/*.spec.js'
  ],
  indexHtml: client + 'index.html',

  dist: './dist/',
  images: client + 'img/**/*.*',
  htmltemplates: client + 'js/**/*.html',
  templateCache: {
    file: 'templates.js',
    options: {
      module: 'App',
      standAlone: false,
      //module: 'app.templates',
      //standAlone: true,
      // if standAlone is true you have to explicit tell your application that
      // it is a dependency
      root: 'js/'
    }
  },

  temp: temp,

  /**
   * Optimized files as defined in index.html
   */
  optimized: {
    app: 'app.js',
    lib: 'lib.js'
  }



};

config.getWiredepDefaultOptions = function() {
  return {
    bowerJson: config.bower.json,
    directory: config.bower.directory,
    ignorePath: config.bower.ignorePath
  };
};

module.exports = config;