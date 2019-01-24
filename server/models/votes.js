const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create vote schema
const voteSchema = new Schema({
  storyId: {
    type: String,
    required: true
  },
  votes: {
    type: Number,
    required: true
  },
  upvoted: Boolean,
  downvoted: Boolean
});

// creates vote model
const Vote = mongoose.model('vote', voteSchema);

// exports vote model
module.exports = Vote;