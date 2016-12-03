import express from 'express'
import bodyParser from 'body-parser'
import sessions from 'client-sessions'
import logger from './logger.js'
import _db from './config/db.js'
import auth from './routes/auth.js'
import * as api from './routes/api.js'
const app = express()
const port = process.env.PORT || 5000

app.set('trust proxy', true)

app.use(logger.middleware)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(sessions({
	cookieName: 'session',
	secret: process.env.SESS_SECRET || 'You forgot to set a session secret, dingle!!!1!',
	duration: 24 * 60 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
	secureProxy: true
}))
app.use('/auth', auth)
app.use('/api', [api.open, api.closed])

app.get('/', (req,res) => {
	res.send('Hello World!')
})

app.listen(port, () => {
	logger.info('Server listening on port %s', port)
})
