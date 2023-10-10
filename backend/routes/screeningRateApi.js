const express = require('express')
const router = express.Router()
const screeningRateController = require('../controllers/screeningRateController')

router.get('/', screeningRateController.get)
router.get('/:id', screeningRateController.find)
router.post('/', screeningRateController.create)
router.post('/:id', screeningRateController.update)
router.delete('/:id', screeningRateController.destroy)

module.exports = router