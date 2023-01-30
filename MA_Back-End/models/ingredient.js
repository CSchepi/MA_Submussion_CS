const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating a schema for an Ingredient
const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: Number, 
    required: true
  },
  carbonpoints: Number, //points being the value in gramms
  carbonmedal: Number, //medals being the abstraction (0.5-5)
  waterpoints: Number, //points being in the value in lieters
  watermedal: Number, //medals being the abstracition (0.5-5)
  infobar: String, 
  backtext: String,
  
  //Individuals for ingredient
  seasonstart: Number,
  seasonend: Number,
  region: Number,
  type: Number

}, {timestamps: true});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);
module.exports = Ingredient;