const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

var User = require('../models/user')
var Config = require('../config/database')

module.exports = function(passport) {
    var options = {}
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt")
    options.secretOrKey = Config.secret

    passport.use(new JwtStrategy(options, async function(payload, done) {
        try {
            const user = await User.findOne({
                _id: payload
            })
 
            if(user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        } catch(err) {
            if(err) {
                return done(err, false)
            }
        }
    }))
}