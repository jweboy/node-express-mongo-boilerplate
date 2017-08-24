const express = require('express')
const router = express.Router()
const { authenticate } = require('../middlewares/authenticate')

router.get('/', function (req, res) {
  res.render('login')
})

router.post('/', function (req, res) {
  const { body: { username, password } } = req
  authenticate(username, password, function (error, user) {
    if (user && user.name && user.pwd) {
      req.session.regenerate(function () {
        req.session.username = req.body.username
        req.session.password = req.body.password

        req.flash('success', '登陆成功!')
        res.redirect('/home')
      })
    } else {
      req.flash('error', error)
      res.redirect('/login')
    }
  })
})

module.exports = router
