const express = require('express')
var router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/users')

// Middleware
const verifyMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, 'secretkey', async (_err, payload) => {
      if (await User.findOne({ token: token })) {
        if (payload) {
          req.payload = payload
          next()
        } else {
          res.redirect('http://localhost:3000/')
        }
      } else {
        res.redirect('http://localhost:3000/')
      }
    })
  } catch (error) {
    next(error)
  }
}

/* POST for token */
router.post('/api/login', async (req, res, next) => {
  try {
    let user = await User.findOne({ username: req.body.username })
    if (user) {
      let candidatepassword = req.body.password
      await user.comparePassword(candidatepassword, async (_err, isMatch) => {
        if (isMatch) {
          var token = jwt.sign(
            {
              id: user.id,
              username: user.username,
              firstname: user.firstname,
              email: user.email,
              status: user.status
            },
            'secretkey'
          )

          user.token = token
          await user.save()

          await res.send({
            token: token
          })
        } else {
          res.send({
            token: 0
          })
          res.status(400).json({
            message: 'Invalid Username or Password'
          })
        }
      })
    } else {
      await res.send({
        token: 0
      })
    }
  } catch (error) {
    next(error)
  }
})

router.get('/api/me', verifyMiddleware, (req, res, next) => {
  res.send({
    payload: req.payload
  })
})

module.exports = router
