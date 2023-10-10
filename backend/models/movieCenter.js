const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieCenterSchema = new Schema({
      name: {
        type: String,
        require: true,
      },
      slug: {
        type: String,
        require: true,
      },
      address: {
        type: String,
        require: true
      },
      image: {
        type: String
      },
      status: {
        type: Number,
        default: 1
      }
}, {timestamps: true})

module.exports = mongoose.model('movie_center', MovieCenterSchema);