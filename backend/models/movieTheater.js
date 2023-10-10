const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieTheaterSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        require: true,
    },
    chair: {
        type: String,
        require: true
    },
    movie_center_id: {
        type: String,
        require: true
    },
    status: {
        type: Number,
        default: 1
    }
}, {timestamps: true})

module.exports = mongoose.model('movie_theater', MovieTheaterSchema)