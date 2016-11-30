import mongoose from 'mongoose'
import logger from '../logger.js'

const uri = process.env.MONGO_URL || 'mongodb://localhost/<%= appName %>'

mongoose.connect(uri)

const db = mongoose.connection

db.on('error', (err) => {
	logger.error('Uh oh... %s', err)
})
db.on('open', () => {
	logger.info('Successfully connected to %s!', uri)
})

export default db
