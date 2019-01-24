const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create story schema
const storySchema = new Schema({
  title: {
    type: String,
    text: true,
    required: true
  },
  link: String,
  comment: String,
  category: String,
  username: String,
  date: {
    type: String,
    required: true
  }
});

// creates story model
const Story = mongoose.model('story', storySchema);

// exports user model
module.exports = Story;