import mongoose from 'mongoose'
import logger from '../logger.js'

/////////////////////
// Database config //
/////////////////////

const uri = process.env.MONGO_URL || 'mongodb://localhost/<%= appName %>'

mongoose.Promise = global.Promise // Use native promises
mongoose.connect(uri)

const db = mongoose.connection

db.on('error', (err) => {
	logger.error('Uh oh... %s', err)
})
db.on('open', () => {
	logger.info('Successfully connected to %s!', uri)
})

export default db
