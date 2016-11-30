import express from 'express'
import logger from '../logger.js'
import User from '../models/user.js'

const auth = express.Router()

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
