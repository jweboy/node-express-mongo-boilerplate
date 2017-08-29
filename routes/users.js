var express = require('express')
var router = express.Router()
const { getAllUsers } = require('../models/users')

/* GET users listing. */
router.get('/', function (req, res, next) {
  getAllUsers()
    .then(function (users) {
      console.log(users)
      res.render('users', { users })
    })
    .catch(next)
})

module.exports = router
