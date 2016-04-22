"use strict";

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var maps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

var config = require(__dirname + '/gulp-config.js');


gulp.task('concatScripts', function(){
	return gulp.src(config.js.app_files)
		.pipe(maps.init())
		.pipe(concat(config.js.DIST_NAME + '.js'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest(config.js.DEST_DIR));
});

gulp.task('minifyScripts', ['concatScripts'], function(){
	return gulp.src(config.js.DEST_DIR + config.js.DIST_NAME + '.js')
		.pipe(uglify())
		.pipe(rename(config.js.DIST_NAME + '.min.js'))
		.pipe(gulp.dest(config.js.DEST_DIR));
});
gulp.task('watchScripts', function(){
	gulp.watch(config.js.SOURCE_DIR + '**/*.js', ['minifyScripts']);
});

gulp.task('sass', function() {
    gulp.src(config.styles.SOURCE_DIR + '**/*.scss')
        .pipe(sass(config.styles.sass_options).on('error', sass.logError))
        .pipe(gulp.dest(config.styles.DEST_DIR));
});
gulp.task('watchSass',function() {
    gulp.watch(config.styles.SOURCE_DIR + '**/*.scss', ['sass']);
});

gulp.task('watch', ['build', 'watchSass', 'watchScripts']);
gulp.task('build', ['minifyScripts', 'sass']);
gulp.task('default', ['build']);
