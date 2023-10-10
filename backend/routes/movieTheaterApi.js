const express = require('express')
const router = express.Router()
const movieTheaterController = require('../controllers/movieTheaterController')

router.get('/', movieTheaterController.get)
router.get('/:slug', movieTheaterController.find)
router.post('/', movieTheaterController.create)
router.post('/:id', movieTheaterController.update)
router.delete('/:id', movieTheaterController.destroy)

module.exports = router