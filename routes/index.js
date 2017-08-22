module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('index', {
      title: 'Welcome'
    })
  })

  app.use('/signin', require('./signin'))
  app.use('/signup', require('./signup'))
  app.use('/signout', require('./signout'))
  app.use('/home', require('./home'))

  // * 404 page
  app.use((req, res, next) => {
    console.log(res.headerSent)
    if (!res.headerSent) {
      res.status(404).render('404')
    }
  })
}

// const express = require('express')
// const router = express.Router()

// router.get('/', (req, res, next) => {
//   res.render('index', {
//     title: 'hello world'
//   })
// })

// router.route('/signin').get((req, res, next) => {
//   res.render('signin', {
//     title: '登陆'
//   })
// })

// router.get('/home', (req, res, next) => {
//   res.render('home')
// })

// module.exports = router
