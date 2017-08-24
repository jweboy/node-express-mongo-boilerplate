const { mongodb } = require('config-lite')(__dirname)
const Mongolass = require('mongolass')
const mongolass = new Mongolass()

mongolass.connect(mongodb)

const User = mongolass.model('users')

exports.User = User
