const express = require('express')
const router = express.Router()
const movieCenterController = require('../controllers/movieCenterController')

router.get('/', movieCenterController.get)
router.get('/:slug', movieCenterController.find)
router.post('/', movieCenterController.create)
router.post('/:id', movieCenterController.update)
router.delete('/:id', movieCenterController.destroy)

module.exports = router