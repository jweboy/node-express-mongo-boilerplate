const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  const { username, password } = req.session
  res.render('home', {
    name: username,
    pwd: password
  })
})

module.exports = router
