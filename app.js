const express = require('express')
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const { session: { key, secret, maxAge }, port } = require('config-lite')(__dirname)
const formidable = require('express-formidable')
const winston = require('winston')
const expressWinston = require('express-winston')
const { name } = require('./package')
// var favicon = require('serve-favicon')
// var logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const routes = require('./routes')
const app = express()

//* 设置模版目录
app.set('views', path.join(__dirname, 'views'))
//* 设置模版引擎
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
// app.use(logger('dev'))
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(cookieParser())
//* 静态文件目录
app.use(express.static(path.join(__dirname, 'public')))

//* session middleware
app.use(session({
  name, //* 设置cookie来保存session id的字段名
  secret, //* 通过设置secret 来计算hash并存到cookie -> signedCookie防篡改
  resave: true, //* 强制更新session
  saveUninitialized: false, //* 设置为false,无论用户是否登陆,强制创建一个session
  cookie: {
    maxAge //* 过期时间
  }
}))

// app.post('/signin', (req, res, next) => {
//   console.log('post form', req.body)
//   const { body: { username, password } } = req
//   if (username === 'admin' && password === '1') {
//     res.redirect('/home')
//   }
// })

//* flash middleware
app.use(flash())

//* form handler
app.use(formidable({
  keepExtensions: true //* 保留后缀
}))

//* error handler
app.use((error, req, res, next) => {
  res.render('error', {
    error
  })
})
// app.use('/', index)
// app.use('/users', users)

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   var err = new Error('Not Found')
//   err.status = 404
//   next(err)
// })

//* normal logger
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/success.log'
    })
  ]
}))

//* routes
routes(app)

//* error logger
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/error.log'
    })
  ]
}))

if (module.parent) { //* for test
  module.exports = app
} else {
  app.listen(port, function () {
    console.log(`${name} -> App listening on port ${port}!`)
  })
}
