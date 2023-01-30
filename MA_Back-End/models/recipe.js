const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating a schema for an Recipes
const recipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  imgurl: String,
  number: {
    type: Number, 
    required: true
  },
  carbonpoints: Number, //points being the value in gramms
  carbonmedal: Number, //medals being the abstraction (0.5-5)
  waterpoints: Number, //points being in the value in lieters
  watermedal: Number, //medals being the abstracition (0.5-5)
  backtext: String,
  cardidentifier: String,
  
  //Individuals for recipe
  ingredientlist: String,
  ingredientarray: Array,
  instructions: String

}, {timestamps: true});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;