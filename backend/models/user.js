const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const UserSchema =  new Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    phone_number: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    birth_day: {
        type: String,
        require: true
    },
    status: {
        type: Number,
        default: 1
    }
}, {timestamps: true})

UserSchema.pre('save', function(next) {
    const user = this
    if(this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function(err, salt) {
            if(err) {
                return next(err)
            }

            bcrypt.hash(user.password, salt, null, function(err, hash) {
                if(err) {
                    return next(err)
                }

                user.password = hash
                next()
            })
        })
    } else {
        return next()
    }
})

UserSchema.methods.comparePassword = async function (password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, function(err, isMatch) {
            if(err) {
                return reject(err)
            }
           return resolve(isMatch)
        })
    })
}

module.exports = mongoose.model('User', UserSchema)