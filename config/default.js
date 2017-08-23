module.exports = {
  port: 3001,
  session: {
    secret: 'myapp',
    key: 'myapp',
    maxAge: 2592000000
  },
  name: 'myapp',
  mongodb: 'mongodb://localhost:27017/mall'
}
