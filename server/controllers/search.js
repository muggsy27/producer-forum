const Story = require('../models/stories');

module.exports = server => {
  // creates REST server for search by title queries
  server.get('/search', (req, res) => {
    const { title } = req.query;
    Story.find({ $text: { $search: title } })
      .lean()
      .sort({ date: -1 })
      .exec()
      .then(stories => res.send(stories))
      .catch(error => console.log(`error ${error}`));
  });

}