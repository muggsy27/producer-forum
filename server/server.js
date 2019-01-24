const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const passportSetup = require('../src/auth/config');
const authRoutes = require('../src/auth/routes');
const keys = require('../src/auth/keys');
const commentController = require('./controllers/comments');
const storyController = require('./controllers/stories');
const userController = require('./controllers/users');
const voteController = require('./controllers/votes');
const searchController = require('./controllers/search');

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare()
  .then(() => {

    // initializes express server
    const server = express();

    // initializes BodyParser middleware
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());

    // set up session cookies
    server.use(cookieSession({
      maxAge: 24 * 60 * 60 * 1000,
      keys: [keys.session.cookieKey]
    }));

    // initializes passport middleware
    server.use(passport.initialize());
    server.use(passport.session());

    // sets up auth routes
    server.use('/auth', authRoutes);

    // connects to MongoDB
    mongoose.connect(keys.mongodb.uri, { useNewUrlParser: true }, () => console.log('connected to MongoDB'));

    // initializes comments controller
    commentController(server);

    // initializes stories controller
    storyController(server, app);

    // initializes user controller
    userController(server);

    // initializes vote controller
    voteController(server);

    // initializes search controller 
    searchController(server);

    // forwards all other routes to client side router
    server.get('*', (req, res) => {
      return handle(req, res);
    });

    // creates localhost:3000
    server.listen(3000, err => {
      if (err) throw err;
    });

  })
  .catch(e => console.error(e.stack));