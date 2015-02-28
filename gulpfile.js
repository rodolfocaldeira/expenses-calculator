'use strict';

var config = require('./gulp.config');
var gulp = require('gulp');
var args = require('yargs').argv;
var plugins = require('gulp-load-plugins')({lazy: true});
var del = require('del');
var http = require('http');
var open = require("open");

gulp.task('default', ['help']);

gulp.task('help', function() {
  plugins.taskListing();
});

/** STYLEGUIDE ****************************************************************/

gulp.task('lint', function() {

  log('Analyzing source with JSHint and JSCS');

  // return gulp.src([
  //     './src/**/*.js',
  //     './*.js'
  // ])
  return gulp.src(config.js)
      .pipe(plugins.if(args.verbose, plugins.print()))
      //.pipe(plugins.jscs())
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('jshint-stylish', {verbose: true}))
      //.pipe(plugins.jshint.reporter('fail'));
});

/** STYLES ********************************************************************/

gulp.task('clean-styles', function(done) {
  log('Cleaning Styles');
  clean(config.css + '*.css', done);
});

gulp.task('styles', ['clean-styles'], function() {
  log('Compiling Less --> CSS');
  return gulp
      .src(config.less)
      .pipe(plugins.plumber())
      .pipe(plugins.less())
      .pipe(plugins.autoprefixer({
        browsers: ['last 2 Chrome versions']
      }))
      .pipe(gulp.dest(config.css))
      .pipe(plugins.connect.reload());
});

/** SERVER ********************************************************************/

gulp.task('open-browser', function() {
  log('Opening the browser');
  open('http://' + config.devServer + ':' + config.devPort);
});


gulp.task('wiredep', ['styles'], function() {
  log('Wire up the bower css js and our app js into the html');
  var options = config.getWiredepDefaultOptions();
  var wiredep = require('wiredep').stream;
  var injectSrc = config.js.slice(0);
  injectSrc.push(config.css + '*.css');

  return gulp
      .src(config.indexHtml)
      .pipe(wiredep(options))
      .pipe(plugins.inject(gulp.src(injectSrc), {
        read: false,
        ignorePath: config.clientNoLeadingDot
      }))
      .pipe(gulp.dest(config.client));
});

gulp.task('server', ['wiredep', 'open-browser'], function() {
  log('Starting the server');
  return plugins.connect.server({
    root: [config.client],
    livereload: true
  });
});

gulp.task('server-dist', ['optimize', 'open-browser'], function() {
  log('Starting the server');
  return plugins.connect.server({
    root: [config.dist],
    livereload: false
  });
});

/** WATCH *********************************************************************/

gulp.task('reload-html', function () {
  gulp.src(config.client + '**/*.html').pipe(plugins.connect.reload());
});

gulp.task('reload-js', function () {
  gulp.src(config.client + '**/*.html').pipe(plugins.connect.reload());
});

gulp.task('watch', ['server'], function() {
  log('Watching for changes...');
  gulp.watch(config.client + 'css/*.less', ['styles']);
  gulp.watch(config.client + '**/*.html', ['reload-html']);
  gulp.watch(config.client + '**/*.js', ['reload-js']);
});


/** DIST **********************************************************************/

gulp.task('fonts', function() {
  //log('Copying fonts');
  //return gulp.src(config.fonts)
  //  .pipe(gulp.dest(config.build + 'fonts'))
});

gulp.task('images', function() {
  log('Copying the images');
  return gulp.src(config.images).
      pipe(plugins.imagemin({optimizationLevel: 4})).
      pipe(gulp.dest(config.dist + 'img'));
});

gulp.task('clean-code', function(done) {
    var files = [].concat(
        config.temp + '**/*.js',
        config.dist + '**/*.html',
        config.dist + 'js/**/*.js'
    );
    clean(files, done);
});

  gulp.task('clean-all', function(done) {
  clean([config.temp, config.dist], done);
});

gulp.task('templatecache', ['clean-code'], function() {
    log('Creating AngularJS $templateCache');
    return gulp
        .src(config.htmltemplates)
        .pipe(plugins.minifyHtml({empty: true}))
        .pipe(plugins.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
            ))
        .pipe(gulp.dest(config.temp));
});



gulp.task('optimize', ['images', 'templatecache', 'wiredep'], function() {
  log('Optimizing the javascript, css html');

  var templateCache = config.temp + config.templateCache.file;
  var assets = plugins.useref.assets({
    searchPath: ['./', './public/']
  });
  var cssFilter = plugins.filter('**/*.css');
  var jsLibFilter = plugins.filter('**/'+ config.optimized.lib);
  var jsAppFilter = plugins.filter('**/' + config.optimized.app);
  return gulp
      .src(config.indexHtml)
      .pipe(plugins.plumber())
      .pipe(plugins.inject(gulp.src(templateCache, {read: false}), {
        starttag: '<!-- inject:templates:js -->'
      }))
      .pipe(assets)
      .pipe(cssFilter)
      .pipe(plugins.csso())
      .pipe(cssFilter.restore())
      .pipe(jsLibFilter)
      .pipe(plugins.uglify())
      .pipe(jsLibFilter.restore())
      .pipe(jsAppFilter)
      .pipe(plugins.ngAnnotate())
      .pipe(plugins.uglify())
      .pipe(jsAppFilter.restore())
      .pipe(assets.restore())
      .pipe(plugins.useref())
      .pipe(gulp.dest(config.dist));

});



/** HELPER METHODS ************************************************************/


/**
 * Cleans the given system path.
 * @param {String} path
 * @param {Function} done Callback function.
 */
function clean(path, done) {
  log('Cleaning ' + plugins.util.colors.blue(path));
  del(path, done);
}


/**
 * Logs a message to the standard output.
 * @param {Object|string} msg The message you want to log
 */
function log(msg) {
  if (typeof(msg) === 'object') {
    for(var item in msg) {
      if (msg.hasOwnProperty(item)) {
        plugins.util.log(plugins.util.colors.blue(msg[item]));
      }
    }
  } else {
    plugins.util.log(plugins.util.colors.blue(msg));
  }
}