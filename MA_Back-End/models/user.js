const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//creating a schema for the Users
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  pw: {
    type: String, //encrypted 
    required: true
  },
  lvlprogress: Array, //length 24 with 0 being not solved, 1 or 2 or 3 being solved with 1 / 2 / 3 stars 
  ingredients: Array, //numbers (1-100)
  recipes: Array, //numbers (1-446)
  tutprogress: Array, //array with 7 entries being either 0 for not shown yet or 1 for completed
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;