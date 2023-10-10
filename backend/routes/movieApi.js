const express = require('express')
const router = express.Router()
const movieController = require('../controllers/movieController')

router.get('/', movieController.get)
router.get('/:slug', movieController.find)
router.post('/', movieController.create)
router.post('/:id', movieController.update)
router.delete('/:id', movieController.destroy)

module.exports = router