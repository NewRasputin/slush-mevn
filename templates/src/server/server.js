import express from 'express'
import bodyParser from 'body-parser'
import logger from './logger.js'
import _db from './config/db.js'
import auth from './routes/auth.js'
const app = express()
const port = process.env.PORT || 5000

app.use(logger.middleware)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use('/auth', auth)

app.get('/', (req,res) => {
	res.send('Hello World!')
})

app.listen(port, () => {
	logger.info('Server listening on port %s', port)
})
