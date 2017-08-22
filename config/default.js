module.exports = {
  port: 3000,
  session: {
    secret: 'myapp',
    key: 'myapp',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/mall'
}