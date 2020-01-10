module.exports = function(req, res, next) {
  const isLoggedIn = req.user && req.user.id;
  if (isLoggedIn) {
    next()
  } else {
    res.redirect('/');
  }
}