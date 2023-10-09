const express = require('express')
const router = express.Router()
const passport = require('passport')
const userController = require('../controllers/userController')
const bookController = require('../controllers/bookController')

//users
router.post('/signup', userController.signUp)
router.post('/login', userController.login)

//books
router.post('/book', passport.authenticate('jwt', { session: false}), bookController.createBook)
router.get('/book', passport.authenticate('jwt', { session: false}), bookController.getBook)

module.exports = router