const Booking = require('../models/booking')
var express = require('express')
var router = express.Router()

router.post('/booking', async (req, res, next) => {
  try {
    let seats = [
      'A1',
      'A2',
      'A3',
      'A4',
      'A5',
      'A6',
      'A7',
      'A8',
      'B1',
      'B2',
      'B3',
      'B4',
      'B5',
      'B6',
      'B7',
      'B8',
      'C1',
      'C2',
      'C3',
      'C4',
      'C5',
      'C6',
      'C7',
      'C8',
      'D1',
      'D2',
      'D3',
      'D4',
      'D5',
      'D6',
      'D7',
      'D8',
      'E1',
      'E2',
      'E3',
      'E4',
      'E5',
      'E6',
      'E7',
      'E8'
    ]
    // let seats = req.body.seats
    for (const seat of seats) {
      let newbook = Booking({
        user: '',
        seat: seat,
        seatstate: 'unbook',
        movieid: 'M6',
        cinema: 'โรงภาพยนตร์6',
        round: '19.00',
        date: '18/06/2562',
        sumprice: 0
      })
      // await newbook.save()
    }
    res.send({ message: 'createsuccess' })
  } catch (error) {
    next(error)
  }
})

router.put('/booking', async (req, res, next) => {
  try {
    let seatsPara = req.body.seats
    let movieid = req.body.movieid
    let round = req.body.round
    let userid = req.body.userid
    let sumprice = req.body.sumprice
    let state = 1
    // let books = Booking
    for (const seat of seatsPara) {
      let book = await Booking.findOne({
        seat: seat,
        movieid: movieid,
        round: round
      })
      if (book.seatstate === 'booked') {
        state = 0
      }
    }
    if (state === 1) {
      for (const seat of seatsPara) {
        let book = await Booking.findOne({
          seat: seat,
          movieid: movieid,
          round: round
        })
        if (book.seatstate === 'unbook') {
          book.user = userid
          book.sumprice = sumprice
          book.seatstate = 'booked'
          book.save()
        }
      }
      res.send({ message: 'booksuccess' })
    } else {
      res.send({ message: 'book fail' })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
