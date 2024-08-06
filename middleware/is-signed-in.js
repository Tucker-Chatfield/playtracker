const isSignedIn = (req, res, next) => {
  if (req.session && req.session.user) {
    req.user = req.session.user;
    next();
  } else {
    res.redirect('/auth/sign-in');
  }
};

module.exports = isSignedIn;