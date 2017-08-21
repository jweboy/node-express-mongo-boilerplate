module.exports = {
  checkLogin: (req, res, next) => {
    if (!req.session.user) {
      req.flash('error', 'you have to login')
      return res.redirect('/signin')
    }
    next()
  },
  checkNoLogin: (req, res, next) => {
    if (req.session.user) {
      req.flash('error', 'login success')
      return res.redirect('back') //* 返回上一页
    }
    next()
  }
}
