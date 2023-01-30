var express = require('express');
var router = express.Router();
const Recipe =  require('../models/recipe');
const User =  require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  let filter = req.query.using;
  let returnarray = [];
  //returns an array based on an user id with recipes that can be crafted based on the inputed ingredients and is not alreay owned by the player
  User.findById(req.query.id)
  .then((profile)=>{
    let knownrecipes = profile["recipes"];
    for(let i =0;i<knownrecipes.length;i++ ){knownrecipes[i]=Number(knownrecipes[i])}
    inputingredients = filter.split('_');
    Recipe.find({ingredientarray: { $all: inputingredients }})
    .then((result)=>{
      let possibilities = result;
      for(let i = 0; i<possibilities.length;i++){
        if(!knownrecipes.includes(Number(possibilities[i]["number"]))){
          returnarray.push(possibilities[i]["number"]);
        }
      }
      res.send(returnarray);
    })
    .catch((err)=>{
      console.log(err);
    })
  })
  .catch((err)=>{
    console.log(err);
  })

});

module.exports = router;
