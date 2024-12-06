//const posts = require('../db/db.js')
//const fs = require('fs')
const connection = require('../db/connection.js')

const index = (req, res) => {
	const sql = 'SELECT * FROM posts'
	connection.query(sql, (err, posts) => {
		if (err) return res.status(500).json({ error: 'Error fetching posts' })
		res.json({
			status: 200,
			data: posts,
			counter: posts.length
		})
	})

	/*let html = '<ul>'
	posts.forEach((post) => {
		html += `
		<li>
			<h2>${post.title}</h2>
            <img src="/imgs/posts/${post.image}" alt="${post.title}">
            <p>${post.content}</p>           
            <p>${post.tags.join(', ')}</p>
		</li>
		`
	})
	html += '</ul>'
	res.send(html)*/
	//res.json({
	//	status: 200,
	//	data: posts,
	//	counter: posts.length
	//})
}
const show = (req, res) => {
	const slug = req.params.slug

	const post = posts.find((post) => post.slug === slug)

	if (!post) {
		return res.status(404).json({
			message: '404! not found'
		})
	}

	res.status(200).json(post)
}

const store = (req, res) => {
	console.log(req.body)
	const newPost = {
		title: req.body.title,
		slug: req.body.slug,
		content: req.body.content,
		image: req.body.image,
		tags: req.body.tags
	}
	posts.push(newPost)
	fs.writeFileSync('./db/db.js', `module.exports = ${JSON.stringify(posts, null, 4)}`)

	res.json({
		status: 201,
		data: posts,
		counter: posts.length
	})
}

const update = (req, res) => {
	const post = posts.find((post) => post.slug === req.params.slug)
	if (!post) {
		return res.status(404).json({
			message: `Post with slug ${req.params.slug} not found`
		})
	}
	post.title = req.body.title
	post.slug = req.body.slug
	post.content = req.body.content
	post.image = req.body.image
	post.tags = req.body.tags
	fs.writeFileSync('./db/db.js', `module.exports = ${JSON.stringify(posts, null, 4)}`)

	res.status(200).json({
		status: 200,
		message: 'Post updated successfully',
		data: post
	})
}

const destroy = (req, res) => {
	const id = req.params.id
	const sql = 'DELETE FROM posts WHERE id = ?'
	connection.query(sql, [id], (err, result) => {
		if (err) return res.status(500).json({ error: 'Error deleting post' })
		if (result.affectedRows === 0) {
			return res.status(404).json({
				message: `404! Post with id ${id} not found`
			})
		}
		res.status(200).json({
			status: 200,
			affectedRows: result.affectedRows,
			message: 'Post deleted successfully'
		})
	})

	/*const post = posts.find((post) => post.slug === req.params.slug)
	if (!post) {
		return res.status(404).json({
			message: `Post with slug ${req.params.slug} not found`
		})
	}
	const newPost = posts.filter((post) => post.slug !== req.params.slug)
	fs.writeFileSync('./db/db.js', `module.exports = ${JSON.stringify(newPost, null, 4)}`)
	res.status(200).json({
		status: 200,
		message: 'Post deleted successfully',
		data: newPost,
		counter: newPost.length
	})*/
}

const filterTag = (req, res) => {
	const tag = req.query.tag

	if (!tag) {
		return res.status(400).json({
			message: 'Inserisci un tag valido'
		})
	}

	const postsTag = posts.filter((post) => post.tags.includes(tag))

	res.status(200).json({
		status: 200,
		message: 'tag found',
		posts: postsTag,
		numeroPost: postsTag.length
	})
}

module.exports = { show, index, store, update, destroy, filterTag }
