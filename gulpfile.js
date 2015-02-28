'use strict';

var config = require('./gulp.config');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({lazy: true});
var del = require('del');
var http = require('http');
var open = require("open");

gulp.task('default', ['help']);

gulp.task('help', function() {
  plugins.taskListing();
});


/** STYLES ********************************************************************/

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
  //.pipe(plugins.connect.reload());
});

gulp.task('clean-styles', function(done) {
  log('Cleaning Styles');
  clean(config.css + '*.css', done);
});


/** SERVER ********************************************************************/

//['wiredep', ]
gulp.task('server', ['open-browser'], function() {
  log('Starting the server');
  return plugins.connect.server({
    root: [config.client],
    livereload: true
  });
});

gulp.task('open-browser', function() {
  log('Opening the browser');
  open('http://' + config.devServer + ':' + config.devPort);
});


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