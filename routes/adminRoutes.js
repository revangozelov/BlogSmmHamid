const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')


router.get('/add',adminController.admin_add)
router.post('/add',adminController.admin_post)
router.delete('/delete/:id',adminController.admin_delete)
router.get('/',adminController.admin_index)

module.exports = router