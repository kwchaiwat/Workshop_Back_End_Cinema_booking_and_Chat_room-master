const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const user = new Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
  age: Number,
  tel: String,
  email: String,
  token: String,
  status: String
})
user.pre('save', function (next) {
  var user = this

  if (!user.isModified('password')) return next()

  bcrypt.genSalt(SALT_WORK_FACTOR, function (_err, salt) {
    if (_err) return next(_err)
    bcrypt.hash(user.password, salt, function (_err, hash) {
      if (_err) return next(_err)
      user.password = hash
      next()
    })
  })
})

user.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (_err, isMatch) {
    if (_err) return cb(_err)
    cb(null, isMatch)
  })
};

// name collection db
module.exports = mongoose.model('users', user)
