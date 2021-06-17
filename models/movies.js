const mongoose = require('mongoose')
const Schema = mongoose.Schema
const movies = new Schema({
  movieid: String,
  moviename: String,
  cinema: String,
  rounds: Array,
  price: Number,
  time: String,
  group: String,
  trailer: String,
  desc: String,
  picpath: String
})
// name collection db
module.exports = mongoose.model('movies', movies)
