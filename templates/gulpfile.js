var gulp = require('gulp')
var nodemon = require('gulp-nodemon')
var eslint = require('gulp-eslint')
var babel = require('gulp-babel')
var webpack = require('gulp-webpack')

gulp.task('start', ['build', 'compile'], function () {
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

gulp.task('compile', function () {
	return gulp.src('src/client/main.js')
		.pipe(webpack({
			output: {
				filename: 'bundle.js'
			},
			module: {
				loaders: [{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel',
					query: {
						presets: ['es2015'],
						plugins: ['transform-runtime']
					}
				}, {
					test: /\.vue$/,
					loader: 'vue'
				}]
			}
		}))
		.pipe(gulp.dest('dist/public'))
})

gulp.task('watch', function () {
	gulp.watch('src/server/**', ['build'])
	gulp.watch('src/client/**', ['compile'])
})


gulp.task('dev', ['start','watch'])
