const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    status: {
        type: Number,
        default: 1,
    }
}, {timestamps: true})

module.exports = mongoose.model('movie', MovieSchema)