const mongoose = require('mongoose')
const Schema = mongoose.Schema
const tickets = new Schema({
  moviename: String,
  picpath: String,
  cinema: String,
  seats: Array,
  round: String,
  date: String,
  sumprice: Number
})
// name collection db
module.exports = mongoose.model('tickets', tickets)
