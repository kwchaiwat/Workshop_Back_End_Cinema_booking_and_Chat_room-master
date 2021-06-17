var express = require('express')
var router = express.Router()
const User = require('../models/users')

/* POST insertuser listing. */
router.post('/user/insertuser', async (req, res, next) => {
  try {
    let newuser = new User({
      username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
      tel: req.body.tel,
      email: req.body.email
    })
    await newuser.save()
    res.send({ message: 'createsuccess' })
  } catch (error) {
    next(error)
  }
})

/* GET one user listing. ES8 */
router.get('/user/:id', async (req, res, next) => {
  try {
    let user = await User.findOne({ _id: req.params.id })
    let nameuser = new User({
      firstname: user.firstname,
      lastname: user.lastname
    })
    res.send(nameuser)
  } catch (error) {
    next(error)
  }
})

/* PUT update age user */
router.put('/user/:id', async (req, res, next) => {
  try {
    let user = await User.findOne({ _id: req.params.id })
    user.age = req.body.age
    user.save()
    res.send({ message: 'updatesuccess' })
  } catch (error) {
    next(error)
  }
})

/* DELETE one user */
router.delete('/user/:id', async (req, res, next) => {
  try {
    let user = await User.findOne({ _id: req.params.id })
    await user.delete()
    res.send({ message: 'deletesuccess' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
