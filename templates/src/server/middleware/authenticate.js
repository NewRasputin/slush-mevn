import logger from '../logger.js'
import User from '../models/user.js'

const authenticate = (req, res, next) => {
	const username = req.session.username
	User.findOne({ username: username }, (err, user) => {
		if (err) {
			logger.error(err)
			res.sendStatus(500)
		} else if (!user) {
			res.status(400).send({ message: 'Could not authenticate' })
		} else {
			req.session.username = username
			next()
		}
	})
}

export default authenticate
