const { mongodb } = require('config-lite')(__dirname)
const Mongolass = require('mongolass')
const mongolass = new Mongolass()

mongolass.connect(mongodb)

exports.User = mongolass.model('users', {
  useranme: { type: 'string' },
  password: { type: 'string' }
})
