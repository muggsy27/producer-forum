const router = require('express').Router();
const passport = require('passport');

// creates auth logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// authenticates with google
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

// creates callback route for google to redirect to
router.get('/google/redirect/', passport.authenticate('google'), (req, res) => {
  res.redirect('/');
});

// gets current logged in user
router.get('/current_user', (req, res) => {
  res.send(req.user);
});

module.exports = router;
