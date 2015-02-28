'use strict';

var client = './public/';

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
    //client + 'app/components/**/*.js',
    //client + 'app/mainpage/**/*.js',
    //client + 'app/config.js',
    client + 'js/**/*.js'
    //'!' + client + '**/*.spec.js'
  ],
  indexHtml: client + 'index.html'
};

config.getWiredepDefaultOptions = function() {
  var options = {
    bowerJson: config.bower.json,
    directory: config.bower.directory,
    ignorePath: config.bower.ignorePath
  };
  return options;
};

module.exports = config;