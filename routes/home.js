const express = require('express')
const router = express.Router()
// const { User } = require('../lib/mongo')

router.get('/', function (req, res) {
  // const { username, password } = req.session

  // User.insertOne({ username, password }).exec().then(console.log).catch(console.error)
  res.render('home')
})

module.exports = router
