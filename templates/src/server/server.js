import express from 'express'
import logger from './logger.js'
import _db from './config/db.js'
const app = express()
const port = process.env.PORT || 5000

app.use(logger.middleware)

app.get('/', (req,res) => {
	res.send('Hello World!')
})

app.listen(port, () => {
	logger.info('Server listening on port %s', port)
})
