var gulp = require('gulp')
var nodemon = require('gulp-nodemon')
var eslint = require('gulp-eslint')
var babel = require('gulp-babel')

gulp.task('start', function () {
	nodemon({
		script: 'dist/server.js',
		env: { 'DEBUG': 'app*,http*' }
	})
})

gulp.task('build', function () {
	return gulp.src('src/server/**/*.js')
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(babel())
		.pipe(gulp.dest('dist'))
})

gulp.task('watch', ['build'], function () {
	gulp.watch('src/server/**', ['build'])
})


gulp.task('dev', ['start','watch'])
