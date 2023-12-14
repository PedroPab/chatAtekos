
const isLoogedIn = (req, res, next) => {
  if (!req.cookies?.userName) res.redirect('/register')

  next()
}

export default isLoogedIn