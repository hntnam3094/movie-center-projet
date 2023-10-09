const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    time: {
        type: Timestamp,
        required: true
    },
    start_time: {
        type: Timestamp,
        required: true
    },
    end_time: {
        type: Timestamp,
        required: true
    },
    movie_theater_id: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        default: 1,
    }
}, {timestamps: true})