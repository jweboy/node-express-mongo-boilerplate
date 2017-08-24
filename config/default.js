module.exports = {
  port: 3001,
  session: {
    secret: 'myapp',
    key: 'myapp',
    maxAge: 2592000000
  },
  locals: {
    title: '后台管理程序'
  },
  user: {
    name: 'admin',
    pwd: '1'
  },
  name: 'myapp',
  mongodb: 'mongodb://localhost:27017/mall'
}
