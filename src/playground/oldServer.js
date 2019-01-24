const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const passportSetup = require('../src/auth/config');
const authRoutes = require('../src/auth/routes');
const keys = require('../src/auth/keys');
const User = require('../server/models/users');
const Story = require('../server/models/stories');
const Comment = require('../server/models/comments');
const Vote = require('../server/models/votes');

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

    // fires comments controller
    // commentController(server);

    // fires stories controller
    // storyController(server, app);

    // fires user controller
    // userController(server);

    // fires vote controller
    // voteController(server);

    // creates a POST request route for /post 
    server.post('/post', (req, res) => {
      // creates const with POST request data
      const { title, link, comment, category, username, date } = req.body.story;

      // destructures POST request data and stores in const 
      const story = {
        title,
        link,
        comment,
        category,
        username,
        date
      };

      // creates a new instance of Story model
      const forumStory = new Story(story);

      // saves new instance of Story model to database
      forumStory.save()
        .then(story => {
          const vote = {
            storyId: story._id,
            votes: 0
          };

          const storyVote = new Vote(vote);
          storyVote.save()
            .catch(e => console.error(e))

        })
        .catch(e => console.error(e));

    });

    // saves new comments to database
    server.post('/story', (req, res) => {
      const { username, storyId, date, comment } = req.body.comment;

      const storyComment = {
        username,
        storyId,
        date,
        comment
      };

      console.log(storyComment);

      const forumComment = new Comment(storyComment);

      forumComment.save(err => {
        if (err) {
          return console.error(err);
        }
      })
    });

    // creates story pages
    server.get('/story/:id', (req, res) => {
      const actualPage = '/story';
      const queryParams = { id: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    // creates REST server for stories collection
    server.get('/api/stories', (req, res) => {
      Story.find()
        .lean()
        .sort({ date: -1 })
        .exec()
        .then(stories => res.send(stories))
        .catch(error => console.log(`error ${error}`));
    });

    // creates REST server for tutorials 
    server.get('/api/stories/tutorials', (req, res) => {
      Story.find({ category: 'Tutorial' })
        .lean()
        .exec()
        .then(stories => res.send(stories))
        .catch(error => console.error(error))
    });

    // creates REST server for streams 
    server.get('/api/stories/streams', (req, res) => {
      Story.find({ category: 'Stream' })
        .lean()
        .exec()
        .then(stories => res.send(stories))
        .catch(error => console.error(error))
    });

    // creates REST server for story post
    server.get('/api/story/:id', (req, res) => {
      const query = req.params.id;
      Story.findById(query)
        .lean()
        .exec()
        .then(story => res.send(story))
        .catch(error => console.error(error))
    });

    // creates REST server for users
    server.get('/api/user/:user', (req, res) => {
      const query = req.params.user;
      User.findById(query)
        .lean()
        .exec()
        .then(user => res.send(user))
        .catch(error => console.log(error));
    });

    // creates REST server for comments
    server.get('/api/comment/:storyId', (req, res) => {
      const query = req.params.storyId;
      Comment.find({ storyId: query })
        .lean()
        .exec()
        .then(comments => res.send(comments))
        .catch(error => console.error(error));
    });

    server.get('/api/vote/:id', (req, res) => {
      const query = req.params.id;
      Vote.findOne({ storyId: query })
        .lean()
        .exec()
        .then(votes => res.send(votes))
        .catch(error => console.error(error));
    })

    // creates a POST route for upvotes
    server.post('/api/upvote', (req, res) => {
      const { storyId } = req.body;
      Vote.findOneAndUpdate({ storyId }, { $inc: { votes: 1 } })
        .exec()
        .then(() => console.log('upvote received'))
        .catch(error => console.error(error))
    });

    server.post('/api/downvote', (req, res) => {
      const { storyId } = req.body;
      Vote.findOneAndUpdate({ storyId }, { $inc: { votes: -1 } })
        .exec()
        .catch(error => console.error(error))
    })

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