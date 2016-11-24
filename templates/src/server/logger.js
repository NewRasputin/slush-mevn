import debug from 'debug'

const logger = {
	info: debug('app'),
	error: debug('app:error'),
	http: debug('http'),
	middleware: function (req,res,next) {
		logger.http('%s %s', req.method, req.url)
		next()
	}
}

export default logger
