var express = require('express')
var path = require('path')
// var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
const session = require('express-session')
// const MongoStore = require('connect-mongo')(session)
const expressWinston = require('express-winston')
const winston = require('winston')
const flash = require('connect-flash')
// const index = require('./routes/index')
const {
  session: { secret, maxAge },
  locals: { title },
  name
  // mongodb
} = require('config-lite')(__dirname)

const users = require('./routes/users')
const login = require('./routes/login')
const home = require('./routes/home')

const app = module.exports = express()

//* 设置模版目录
app.set('views', path.join(__dirname, 'views'))
//* 设置模版引擎
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

//* session middleware
app.use(session({
  name, //* 设置cookie来保存session id的字段名
  secret, //* 通过设置secret 来计算hash并存到cookie -> signedCookie防篡改
  resave: false, //* 强制更新session
  saveUninitialized: false, //* 设置为false,无论用户是否登陆,强制创建一个session
  cookie: {
    maxAge //* 过期时间
  }
  // store: new MongoStore({
  //   url: mongodb
  // })
}))

//* flash middleware
app.use(flash())

//* global variables
app.use(function (req, res, next) {
  const success = req.flash('success')
  const error = req.flash('error')

  console.log(success, error)

  //* success handler
  if (success.length > 0) {
    res.locals.success = success.toString()
  } else {
    res.locals.success = null
  }
  //* error handler
  if (error.length > 0) {
    res.locals.error = error.toString()
    // res.status(error.status || 500)
  } else {
    res.locals.error = null
  }

  res.locals.title = title

  next()
})

//* success logger middleware
app.use(expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: 'logs/success.log'
    })
  ]
}))

app.use('/users', users)
app.use('/login', login)
app.use('/home', home)

//* 404 page
app.use(function (req, res) {
  if (!res.headerSent) res.render('404')
})

app.get('/', function (req, res) {
  res.redirect('/login')
})

//* error logger middleware
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log'
    })
  ]
}))

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   var err = new Error('Not Found')
//   err.status = 404
//   next(err)
// })

// status handler
// app.use(function (req, res, next) {
//   console.log("app.usr local");
//   const success = req.flash('success')
//   res.locals.success = 'success.length > 0 ? success : null'
//   // set locals, only providing error in development
//   // res.locals.message = err.message
//   // res.locals.error = req.app.get('env') === 'development' ? err : {}
//   // // render the error page
//   // res.status(err.status || 500)
//   // res.render('error')
//
//   next()
// })

// if (module.parent) {
//   app.listen(port)
// }
