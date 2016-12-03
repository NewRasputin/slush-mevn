import express from 'express'
import logger from '../logger.js' // eslint-disable-line
import authenticate from '../middleware/authenticate.js'

////////////////////////////////////////////
// Open and closed (protected) api routes //
////////////////////////////////////////////

export const open = express.Router()
export const closed = express.Router()

closed.use(authenticate)

open.route('/test')
	.get()
	.post()
	.put()
	.delete()

closed.route('/test')
	.get()
	.post()
	.put()
	.delete()
