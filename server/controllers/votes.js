const Vote = require('../models/votes');

module.exports = server => {

  server.get('/api/votes/:storyId', (req, res) => {

    const { storyId } = req.params;

    Vote.findOne({ storyId })
      .lean()
      .exec()
      .then(votes => res.send(votes))
      .catch(error => console.error(error));

  });

  server.post('/api/votes', (req, res) => {

    const { _id, upvoted, downvoted } = req.body;

    if (upvoted) {
      Vote.findOneAndUpdate({ storyId: _id }, { $inc: { votes: 1 } })
        .exec()
        .then(() => console.log('upvote received'))
        .catch(error => console.error(error));
    } else if (downvoted) {
      Vote.findOneAndUpdate({ storyId: _id }, { $inc: { votes: -1 } })
        .exec()
        .then(() => console.log('downvote received'))
        .catch(error => console.error(error));
    }

  });

};