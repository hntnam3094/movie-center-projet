const express = require('express')
const router = express.Router()
const passport = require('passport')


//controller list
const userController = require('../controllers/userController')

//api list
const movieCenterApi = require('./movieCenterApi')
const movieTheaterApi = require('./movieTheaterApi')
const movieApi = require('./movieApi')
const screeningRateApi = require('./screeningRateApi')
const userMapScreeningRateApi = require('./userMapScreeningRateApi')
//users
router.post('/signup', userController.signUp)
router.post('/login', userController.login)

//movie center
router.use('/movie', passport.authenticate('jwt', {session: false}), movieApi)
router.use('/movie-center', passport.authenticate('jwt', {session: false}), movieCenterApi)
router.use('/movie-theater', passport.authenticate('jwt', {session: false}), movieTheaterApi)
router.use('/screening-rate', passport.authenticate('jwt', {session: false}), screeningRateApi)
router.use('/user-screening-rate', passport.authenticate('jwt', {session: false}, userMapScreeningRateApi))

module.exports = router