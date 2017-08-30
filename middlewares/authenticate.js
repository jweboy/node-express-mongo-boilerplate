// @flow
const { user } = require('config-lite')(__dirname)

exports.authenticate = function (name: string, pwd: number, callback: function) {
  if (!module.parent) console.log('authenticating %s:%s', name, pwd)

  //* 前期验证 只做空值+默认值 => 校验
  if (!name) return callback('用户名不能为空')
  if (!pwd) return callback('密码不能为空')
  if (user.name !== name || user.pwd !== pwd) return callback('用户名或者密码错误')

  return callback(null, { name, pwd })
}
