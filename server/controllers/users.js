const User = require('../models/users');

module.exports = server => {

  // creates REST server for users
  server.get('/api/users/:user', (req, res) => {

    const { user } = req.params;

    User.findById(user)
      .lean()
      .exec()
      .then(user => res.send(user))
      .catch(error => console.log(error));
  });

  /* Save HTTP Actions */
  server.post('/api/users/save_story/:user', (req, res) => {
    const { user } = req.params;
    const { _id } = req.body;

    User.findByIdAndUpdate(user, { $addToSet: { saved: _id } })
      .then(() => console.log('story saved to user'))
      .catch(e => console.error(e));
  });

  server.post('/api/users/unsave_story/:user', (req, res) => {
    const { user } = req.params;
    const { _id } = req.body;

    User.findByIdAndUpdate(user, { $pull: { saved: _id } })
      .then(user => console.log(user))
  });

  /* Vote HTTP Actions */
  /* CAN CONSOLIDATE UPVOTE AND DOWNVOTE STUFF */

  // creates a POST route for addUpvote
  server.post('/api/users/add_upvote/:user', (req, res) => {
    const { user } = req.params;
    const { storyId, upvoted, downvoted } = req.body;

    User.findByIdAndUpdate(user, { $addToSet: { votes: { storyId, upvoted, downvoted } } })
      .then(() => console.log('upvote added to user'))
      .catch(e => console.error(e));
  });

  // creates a POST route for addDownvote
  server.post('/api/users/add_downvote/:user', (req, res) => {
    const { user } = req.params;
    const { storyId, upvoted, downvoted } = req.body;
    User.findByIdAndUpdate(user, { $addToSet: { votes: { storyId, upvoted, downvoted } } })
      .then(() => console.log('downvote added to user'))
      .catch(e => console.error(e));
  });

  // creates a POST route for modifyUpvote
  server.post('/api/users/modify_upvote/:user', (req, res) => {
    const { user } = req.params;
    const { storyId, upvoted, downvoted } = req.body;

    User.findOneAndUpdate(
      { _id: user, 'votes.storyId': storyId },
      { $set: { 'votes.$.upvoted': upvoted, 'votes.$.downvoted': downvoted } }
    )
      .then(() => console.log('upvote modified'))
      .catch(e => console.error(e));
  });

  // creates a POST route for modifyDownvote
  server.post('/api/users/modify_downvote/:user', (req, res) => {
    const { user } = req.params;
    const { storyId, upvoted, downvoted } = req.body;

    User.findOneAndUpdate(
      { _id: user, 'votes.storyId': storyId },
      { $set: { 'votes.$.upvoted': upvoted, 'votes.$.downvoted': downvoted } }
    )
      .then(() => console.log('downvote modified'))
      .catch(e => console.error(e));
  });

}