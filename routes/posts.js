const express = require('express')
const router = express.Router()
const postsControllers = require('../controllers/postsControllers.js')

router.get('/:slug', postsControllers.show)
router.get('/', postsControllers.index)
router.post('/', postsControllers.store)
router.put('/:slug', postsControllers.update)
router.delete('/:slug', postsControllers.destroy)
router.get('/posts/tag', postsControllers.filterTag)
module.exports = router
