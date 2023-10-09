const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserMapScreeningRateMovieSchema = new Schema({
    user_id: {
        type: ObjectId,
        require: true
    },
    screening_rate_movie_id: {
        type: ObjectId,
        require: true
    }
}, {timestamps: true})

module.exports = mongoose.Schema(UserMapScreeningRateMovieSchema)