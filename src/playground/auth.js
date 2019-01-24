// Authentication Notes/Steps

/*
1. npm install passport
2. configure passport
3. use passport in POST request
*/

/* 
Config needs: 
1. Auth strategies
2. Application middleware
3. Sessions (optional)
*/

// configuration 
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

// config 
passport.use(new LocalStrategy(
  User.findOne({ username: username }, (err, user) => {
    if (err) { return done(err) }
    if (!user) {
      return done(null, false, { message: 'Incorrect Username' });
    }
    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Incorrect Password' });
    }
    return done(null, user);
  })
))

// middleware
app.use(passport.initialize());
app.use(passport.session());

/* 
Standard Authentication Flow 
Config => Form (POST Request) => Route Redirect
*/

/* 
Producer Forum Authetication Flow
Config => Form (POST Request) => Ability to post
*/



/* Auth0 Flow
1. Config file
2. Create the Auth class
3. Within Auth class create login, handleAuth, setSession,
and logout functions
4. 
*/