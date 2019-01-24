const mongoose = require('mongoose');
const Story = require('../models/stories');
const Vote = require('../models/votes');

module.exports = (server, app) => {

  // creates story pages
  server.get('/stories/:id', (req, res) => {

    const actualPage = '/stories';
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
      .sort({ date: -1 })
      .exec()
      .then(stories => res.send(stories))
      .catch(error => console.error(error))
  });

  // creates REST server for streams 
  server.get('/api/stories/streams', (req, res) => {

    Story.find({ category: 'Stream' })
      .lean()
      .sort({ date: -1 })
      .exec()
      .then(stories => res.send(stories))
      .catch(error => console.error(error))
  });

  // creates a REST server for resources
  server.get('/api/stories/resources', (req, res) => {

    Story.find({ category: { $in: ['Midi', 'Presets', 'Project'] } })
      .lean()
      .sort({ date: -1 })
      .exec()
      .then(stories => res.send(stories))
      .catch(error => console.error(error))

  });

  // creates a REST server for saved stories
  server.get('/api/stories/saved', (req, res) => {
    let { stories } = req.query;
    stories = JSON.parse(stories);

    const storiesArr = stories.map(story => mongoose.Types.ObjectId(story));

    console.log(storiesArr);

    Story.find({ _id: { $in: storiesArr } })
      .lean()
      .sort({ date: -1 })
      .exec()
      .then(stories => res.send(stories))
      .catch(error => console.error(error))

  })

  // adds a new story to the database 
  server.post('/api/stories', (req, res) => {

    // stores POST request data in const
    const { title, link, comment, category, username, date } = req.body.story;

    // destructures POST request data and stores in const 
    const newStory = {
      title,
      link,
      comment,
      category,
      username,
      date
    };

    // creates a new instance of Story model
    const story = new Story(newStory);

    // saves new instance of Story model to database
    story.save()
      .then(story => {

        // creates initial vote data
        const storyVote = {
          storyId: story._id,
          votes: 0
        };

        // creates new vote through Vote mongoose model
        const vote = new Vote(storyVote);

        // saves vote to database
        vote.save()
          .catch(e => console.error(e))

      })
      .catch(e => console.error(e));

  });

  // creates REST server for single story data
  server.get('/api/stories/:id', (req, res) => {

    const { id } = req.params;

    Story.findById(id)
      .lean()
      .exec()
      .then(story => res.send(story))
      .catch(error => console.error(error))
  });

}