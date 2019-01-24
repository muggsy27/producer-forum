const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../../server/models/users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// passport callback function (verifies or creates user)
const findOrCreateUser = (accessToken, RefreshToken, profile, done) => {
  User.findOne({ googleID: profile.id })
    .then(currentUser => {
      if (currentUser) {
        console.log(`user is: ${currentUser}`);
        done(null, currentUser)
      } else {
        new User({
          googleID: profile.id,
          username: profile.displayName,
          votes: [],
          saved: []
        })
          .save()
          .then(newUser => {
            console.log(`created new user: ${newUser}`);
            done(null, newUser);
          })
      }
    });
}

// passport config & callback function
passport.use(new GoogleStrategy({
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret,
  callbackURL: '/auth/google/redirect'
}, findOrCreateUser));