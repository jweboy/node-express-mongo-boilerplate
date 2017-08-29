const { User } = require('../lib/mongo')

module.exports = {
  getAllUsers: function (name) {
    return User
      .find()
      .exec()
  }
}
