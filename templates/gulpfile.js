var gulp = require('gulp')
var eslint = require('gulp-eslint')
var babel = require('gulp-babel')

gulp.task('build', function () {
	gulp.src('src/server/**/*.js')
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(babel())
		.pipe(gulp.dest('dist'))
})
