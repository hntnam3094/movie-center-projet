const passport = require('passport')
const config = require('../config/database')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
require('../config/passport')(passport)

async function signUp(req, res) {
    if(!req.body.username || !req.body.password) {
        res.json({
            success: false,
            message: 'Please pass username and password'
        })
    } else {
        const newUser = new User({
            username: req.body.username,
            password: req.body.password
        })

        try {
            const user = await newUser.save()
            if(user) {
                    res.json({
                        success: true,
                        message: 'Successful created new user'
                    })
            }
        } catch (err) {
            return res.json({
                success: false,
                message: 'Username is already exists'
            })
        }
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({
            username: req.body.username
        })

        if(!user) {
            return res.status(401).send({
                success: false,
                message: 'Authentication failed. User not found.'
            })
        } 
        
        const isMatch = await user.comparePassword(req.body.password)
        if(isMatch) {
            const token = jwt.sign(user.id, config.secret)
            res.json({
                success: true,
                token: 'JWT ' + token 
            })
        } else {
            res.status(401).send({
                success: false,
                message: 'Authentication failed. Wrong password.'
            })
        }

    } catch(err) {
        throw err;
    }
}

module.exports = {
    signUp,
    login
}