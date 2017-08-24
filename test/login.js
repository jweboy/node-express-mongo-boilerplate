const request = require('supertest')
const app = require('../app')
const assert = require('assert')

describe('login', () => {
  describe('POST /login', () => {
    const agent = request.agent(app)
    console.log(agent)
    it('success', function (done) {
      agent
        .post('/login')
        .type('form')
        .field({ username: 'admin', password: '1' })
        .redirects()
        .end(function (error, res) {
          if (error) return done(error)
          assert(res.text.match(/注册成功/))
          done()
        })
    })
  })
})
