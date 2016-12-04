var gulp = require('gulp')
var nodemon = require('gulp-nodemon')
var eslint = require('gulp-eslint')
var babel = require('gulp-babel')
var webpack = require('gulp-webpack')

gulp.task('start', ['build'], function () {
	nodemon({
		script: 'dist/server.js',
		env: { 'DEBUG': 'app*,http*' }
	})
})

gulp.task('build', ['html'], function () {
	return gulp.src('src/server/**/*.js')
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(babel())
		.pipe(gulp.dest('dist'))
})

gulp.task('html', function () {
	return gulp.src('src/server/**/*.html')
		.pipe(gulp.dest('dist'))
})

gulp.task('watch', function () {
	gulp.watch('src/server/**', ['build'])
})


gulp.task('dev', ['start','watch'])
