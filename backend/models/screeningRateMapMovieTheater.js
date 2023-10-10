const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ScreeningRateMapMovieTheater = new Schema({
    screening_rate_id: {
        type: ObjectId,
        require: true
    },
    movie_theater_id: {
        type: ObjectId,
        require: true
    },
    movie_id: {
        type: ObjectId,
        require: true
    },
    status: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model(ScreeningRateMapMovieTheater)