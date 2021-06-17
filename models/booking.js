const mongoose = require('mongoose')
const Schema = mongoose.Schema
const booking = new Schema({
  user: String,
  seatstate: String,
  seat: Array,
  movieid: String,
  cinema: String,
  round: String,
  date: String,
  sumprice: Number
})
// name collection db
module.exports = mongoose.model('booking', booking)
