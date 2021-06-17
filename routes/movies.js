var express = require('express')
var router = express.Router()
const movies = require('../models/movies')

/* POST insertmovies listing. */
// router.post('/insertmovies', async (req, res, next) => {
//   try {
//     let movie = new movies({
//       movieid: 'M6',
//       moviename: 'อะลาดิน',
//       cinema: 'โรงภาพยนตร์6',
//       rounds: ['10.30', '12.30', '15.10', '19.00'],
//       price: 150,
//       time: '130',
//       group: 'Adventure',
//       trailer:
//         '<iframe width="560" height="315" src="https://www.youtube.com/embed/fYr6kdGRFrI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
//       desc:
//         'เรื่องราวของเด็กหนุ่มยากจนนามว่า อะลาดิน (มีนา มาซูด) เขาถูกพ่อมดจาฟาร์ หลอกล่อให้เข้าไปเอาตะเกียงในถ้ำสิงห์กลางทะเลทราย ที่นั่นอะลาดินได้ถูตะเกียงปลดปล่อยวิญญาณของยักษ์จีนี่ที่มาพร้อมกับพร 3 ประการ อะลาดินขอพรข้อแรกให้เขาได้เป็นเจ้าชายอาลีเพื่อจัดขบวนขันหมากสุดอลังการไปสู่ขอเจ้าหญิงจัสมิน เขาไปพร้อมกับพรมวิเศษและพาเจ้าหญิงออกเหาะชมโลกในเพลง a whole new world ภาพยนตร์เต็มไปด้วยการผจญภัย การแย่งชิงบัลลังก์ของจาฟาร์ และความอลังการของโปรดักชั่น'
//     })
//     await movie.save()
//     res.send({ message: 'createsuccess' })
//   } catch (error) {
//     next(error)
//   }
// })

/* GET one user listing. ES8 */
router.post('/movie', async (req, res, next) => {
  try {
    let movie = await movies.findOne({ movieid: req.body.movieid })
    res.send(movie)
  } catch (error) {
    next(error)
  }
})

router.get('/book/:movieid', async (req, res, next) => {
  try {
    let movie = await movies.findOne({ movieid: req.params.movieid })
    res.send(movie)
  } catch (error) {
    next(error)
  }
})

// /* PUT update age user */
// router.put('/user/:id', async (req, res, next) => {
//   try {
//     let user = await User.findOne({ _id: req.params.id })
//     user.age = req.body.age
//     user.save()
//     res.send({ message: 'updatesuccess' })
//   } catch (error) {
//     next(error)
//   }
// })

// /* DELETE one user */
// router.delete('/user/:id', async (req, res, next) => {
//   try {
//     let user = await User.findOne({ _id: req.params.id })
//     await user.delete()
//     res.send({ message: 'deletesuccess' })
//   } catch (error) {
//     next(error)
//   }
// })

module.exports = router
