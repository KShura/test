'use strict'
const gulp = require('gulp'),
    less = require('gulp-less'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	rigger = require('gulp-rigger'),
	coffee = require('gulp-coffee'),
	del = require('del'),
	debug = require('gulp-debug'),
	browserSync = require('browser-sync'),
    reload = browserSync.reload;

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('html', function(){
	return gulp.src('src/*.html') //Выберем файлы по нужному пути
	.pipe(rigger())
	.pipe(debug({title: 'rigger'}))
	.pipe(gulp.dest("build/"))
	.pipe(reload({stream: true}));
});
	
gulp.task('style', function(){
	return gulp.src('src/css/main/**/*.less', {base:'src'})
	.pipe(sourcemaps.init())
	.pipe(less())
	.pipe(concat("styles.css"))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("build/css"))
	.pipe(reload({stream: true}));
});

gulp.task('bootstrap', function(){
	return gulp.src('src/css/bootstrap/bootstrap.less', {base:'src'})
	.pipe(sourcemaps.init())
	.pipe(less())
	.pipe(concat("bootstrap.css"))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("build/css"))
	.pipe(reload({stream: true}));
});

gulp.task('fontawesome', function(){
	return gulp.src('src/css/fontawesome/font-awesome.less', {base:'src'})
	.pipe(sourcemaps.init())
	.pipe(less())
	.pipe(concat("font-awesome.css"))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("build/css"))
	.pipe(reload({stream: true}));
});

gulp.task('coffee', function() {
	gulp.src('src/coffee/**/*.coffee')
	  .pipe(coffee({bare: true}))
	  .pipe(gulp.dest('build/js'))
	  .pipe(reload({stream: true}));
  });

gulp.task('clean', function(){
	return del('build')
});

gulp.task('copy', function(){
	return gulp.src('src/fonts/**/*.*')
	.pipe(gulp.dest('build/fonts'))
	.pipe(reload({stream: true}));
});

gulp.task('watch', function(){
	gulp.watch('src/css/**/*.less', function() {
        gulp.start('style');
	});
	gulp.watch('src/coffee/**/*.coffee', function() {
        gulp.start('coffee');
    });
	gulp.watch('src/**/*.html', function() {
        gulp.start('html');
    });
});

gulp.task('default', ['style', 'bootstrap', 'fontawesome', 'html', 'coffee', 'copy', 'webserver', 'watch']);
