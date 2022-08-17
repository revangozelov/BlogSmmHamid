const express = require('express') 
const router = express.Router()  
const blogController = require('../controllers/blogController')



router.get('/',blogController.blog)
router.get('/:id',blogController.blog_id)


module.exports = router;