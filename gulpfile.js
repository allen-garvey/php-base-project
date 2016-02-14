"use strict";

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var maps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

var JS_SOURCE_DIR = 'js/';
var JS_DEST_DIR = 'public_html/scripts/';
var DIST_NAME = 'app'; //name of compiled file to be served i.e. app.js and app.min.js

var SASS_SOURCE_DIR = 'sass/';
var STYLES_DEST_DIR = 'public_html/styles/';

gulp.task('concatScripts', function(){
	return gulp.src(['app'].map(function(file){return JS_SOURCE_DIR + file + '.js';}))
		.pipe(maps.init())
		.pipe(concat(DIST_NAME + '.js'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest(JS_DEST_DIR));
});

gulp.task('minifyScripts', ['concatScripts'], function(){
	return gulp.src(JS_DEST_DIR + DIST_NAME + '.js')
		.pipe(uglify())
		.pipe(rename(DIST_NAME + '.min.js'))
		.pipe(gulp.dest(JS_DEST_DIR));
});
gulp.task('watchScripts', function(){
	gulp.watch(JS_SOURCE_DIR + '**/*.js', ['minifyScripts']);
});

gulp.task('sass', function() {
    gulp.src(SASS_SOURCE_DIR + '**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(STYLES_DEST_DIR));
});
gulp.task('watchSass',function() {
    gulp.watch(SASS_SOURCE_DIR + '**/*.scss', ['sass']);
});

gulp.task('build', ['minifyScripts', 'sass']);
gulp.task('default', ['build']);
