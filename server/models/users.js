const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create user schema
const userSchema = new Schema({
  username: String,
  googleID: String,
  votes: Array,
  saved: Array
});

// creates user model
const User = mongoose.model('user', userSchema);

// exports user model
module.exports = User;