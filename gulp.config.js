module.exports = function() {

  var client = './src/client/';
  var clientApp = client + 'app/';
  var temp = './.tmp/';
  var server = './src/server/';

  var config = {

    // all js to vet
    alljs: [
      './src/**/*.js',
      './*.js'
    ],
    temp: temp,
    client: client,
    server: server,
    build: './build/', // or dist or production
    css: temp + 'styles.css',
    index: client + 'index.html',
    html: clientApp + '**/*.html',
    js: [
      clientApp + '**/*.module.js',
      clientApp + '**/*.js',
      '!' + clientApp + '**/*.spec.js'
    ],
    less: client + 'styles/styles.less',
    fonts: './bower_components/font-awesome/fonts/**/*.*',
    htmltemplates: clientApp + '**/*.html',
    images: client + 'images/**/*.*',
    bower: {
      json: require('./bower.json'),
      director: './bower_components/',
      ignorePath: '../..'
    },

    /**
     * Node settings
     */
    defaultPort: 7205,
    nodeServer: './src/server/app.js',
    // browser sync delay
    browserReloadDelay: 1000,

    /**
     * Optimized Files
     */
        optimized: {
      app: 'app.js',
      lib: 'lib.js'
    },

    templateCache : {
      file: 'templates.js',
      options: {
        module: 'app.core',
        standAlone: true,

        //module: 'app.templates',
        //standAlone: true,
        // if standAlone is true you have to explicit tell your application that it is a dependency

        root: 'app/'
      }
    }

  };

  config.getWiredepDefaultOptions = function() {
    var options = {
      bowerJson: config.bower.json,
      directory: config.bower.directory,
      ignorePath: config.bower.ignorePath
    };
    return options;
  }

  return config;
};
