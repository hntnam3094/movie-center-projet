const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ScreeningRateSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    status: {
        type: Number,
        default: 1
    }
}, {timestamps: true})

module.exports = mongoose.model(ScreeningRateSchema)