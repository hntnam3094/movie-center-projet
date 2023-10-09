const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieCenterSchema = new Schema({
      name: {
        type: String,
        require: true
      },
      address: {
        type: String,
        require: true
      },
      status: {
        type: Number,
        default: 0
      }
}, {timestamps: true})

module.exports = mongoose.model('movie_center', MovieCenterSchema);