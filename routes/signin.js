const express = require('express')
const router = express.Router()
// const { checkNotLogin } = require('../middlewares/checkLogin')

router.get('/', (req, res, next) => {
  res.render('signin')
})

// router.post('/', (req, res, next) => {
//   console.log('post form', req.body)
//   const { body: { username, password } } = req
//   if (username === 'admin' && password === '1') {
//     res.redirect('/home')
//   }
// })

module.exports = router
