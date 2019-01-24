const Comment = require('../models/comments');

module.exports = server => {

  // creates REST api for comments
  server.get('/api/comments/:storyId', (req, res) => {

    const { storyId } = req.params;

    Comment.find({ storyId })
      .lean()
      .exec()
      .then(comments => res.send(comments))
      .catch(error => console.error(error));

  });

  // saves new comments to database
  server.post('/api/comments', (req, res) => {

    const { username, storyId, date, comment } = req.body.comment;

    const newComment = {
      username,
      storyId,
      date,
      comment
    };

    const storyComment = new Comment(newComment);

    storyComment.save()
      .catch(error => console.error(error));

  });

}