var gulp = require('gulp')
var gutil = require('gulp-util')
var conflict = require('gulp-conflict')
var install = require('gulp-install')
var template = require('gulp-template')
var rename = require('gulp-rename')
var inquirer = require('inquirer')
var path = require('path')

gulp.task('default', function(done) {
	var prompts = [
		{
			type: 'input',
			name: 'appName',
			message: 'What should your app be called?',
			default: function () {
				return path.basename(process.cwd())
			}
		},
		{
			type: 'input',
			name: 'appVersion',
			message: 'What version should it be?',
			default: function () {
				return '0.1.0'
			}
		},
		{
			type: 'input',
			name: 'appDesc',
			message: 'What should your app\'s description be?',
			default: function () {
				return 'A slush generated MEVN (Mongo Express Vue.js Node) app'
			}
		},
		{
			type: 'confirm',
			name: 'ready',
			message: 'Ready?'
		}
	]
	inquirer.prompt(prompts)
		.then(function (answers) {
			if (!answers.ready) {
				return done()
			}
			gutil.log(gutil.colors.green('Here we go...'))
			return gulp.src('./templates/**', {cwd: __dirname, dot: true})
				.pipe(template(answers))
				.pipe(conflict('./'))
				.pipe(gulp.dest('./'))
				.pipe(install())
				.on('end', function () {
					done()
					gutil.log(gutil.colors.green('Type \'npm run dev\' to begin'))
				})
				.resume()
		})
})
