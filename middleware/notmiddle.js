const notFound = (req, res, next) => {
	res.status(404).send({
		status: 404,
		message: 'Not Found middleware'
	})
}

module.exports = notFound
