const express = require('express')
const app = express()
const cors = require('cors')
const notFound = require('./middleware/notmiddle.js')
const logger = require('./middleware/logger.js')
const postsRouter = require('./routes/posts.js')

const PORT = process.env.PORT
const HOST = process.env.HOST
app.use(cors())
app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello World')
})

/*app.use('/posts', (req, res, next) => {
	throw new Error('something went wrong')
})*/

app.use('/posts', logger)
app.use('/posts', postsRouter)

app.use(notFound)
app.use((err, req, res, next) => {
	console.log('Error: ', err.message)
	console.error(err.stack)

	res.status(500).json({ message: 'Something went wrong', error: err.message })
})

app.listen(PORT, (req, res) => {
	console.log(`Server is running in ${HOST}:${PORT}`)
})
