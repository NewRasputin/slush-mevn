import express from 'express'
import bcrypt from 'bcryptjs'
import logger from '../logger.js'
import User from '../models/user.js'

const auth = express.Router()

auth.route('/login')
	.get((req, res) => {
		if (req.session && req.session.username) {
			let username = req.session.username
			User.findOne({ username: username }, (err, user) => {
				if (err) {
					logger.error(err)
					res.sendStatus(500)
				} else if (!user) {
					res.status(400).send({ message: 'No user with that name' })
				} else {
					res.status(200).send({ username: username })
				}
			})
		}
	})
	.post((req, res) => {
		let username = req.body.username
		let password = req.body.password
		User.findOne({ username: username }, (err, user) => {
			if (err) {
				logger.error(err)
				res.sendStatus(500)
			} else if (!user) {
				res.status(400).send({ message: 'No user with that name' })
			} else {
				bcrypt.compare(password, user.password, (err, match) => {
					if (err) {
						logger.error(err)
						res.sendStatus(500)
					} else if (!match) {
						res.status(400).send({ message: 'Password is incorrect' })
					} else {
						req.session.username = username
						res.status(200).send({ username: username })
					}
				})
			}
		})
	})

auth.post('/signup', (req, res) => {
	let user = new User({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	})
	logger.info('Saving %s...', user.username)
	user.save((err) => {
		if (err) {
			logger.error(err)
			res.sendStatus(500)
		} else {
			logger.info('Success')
			res.sendStatus(200)
		}
	})
})

export default auth
