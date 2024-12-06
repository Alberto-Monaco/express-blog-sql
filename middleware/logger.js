const logger = (req, res, next) => {
	const now = new Date().toISOString()
	console.log(`Date: ${now} - Method: ${req.method} - URL: ${req.url}`)
	next()
}

module.exports = logger
