const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create comment schema
const commentSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  storyId: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
});

// creates comment model
const Comment = mongoose.model('comment', commentSchema);

// exports comment model
module.exports = Comment