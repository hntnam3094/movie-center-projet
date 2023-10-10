const express = require('express')
const router = express.Router()
const userMapScreeningRateController = require('../controllers/userMapScreeningRateController')

router.get('/', userMapScreeningRateController.get)
router.get('/:id', userMapScreeningRateController.find)
router.post('/', userMapScreeningRateController.create)
router.post('/:id', userMapScreeningRateController.update)
router.delete('/:id', userMapScreeningRateController.destroy)

module.exports = router