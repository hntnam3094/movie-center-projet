const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ScreeningRateSchema = new Schema({
    movie_theater_id: {
        type: String,
        require: true
    },
    movie_id: {
        type: String,
        require: true
    },
    chair: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    start_time: {
        type: String,
        require: true
    },
    end_time: {
        type: String,
        require: true
    },
    status: {
        type: Number,
        default: 1
    }
}, {timestamps: true})

module.exports = mongoose.model('screening_rate', ScreeningRateSchema)