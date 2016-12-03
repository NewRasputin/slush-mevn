import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import logger from '../logger.js'

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true },
	password: { type: String, required: true }
},{
	timestamps: true
})

userSchema.pre('save', function (next) {
	bcrypt.hash(this.password, 10, (err, hash) => {
		if (err) {
			logger.error(err)
			next(err)
		} else {
			this.password = hash
			next()
		}
	})
})

const User = mongoose.model('User', userSchema)

export default User
