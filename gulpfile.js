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