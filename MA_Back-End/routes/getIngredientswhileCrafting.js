var express = require('express');
var router = express.Router();
const Recipe =  require('../models/recipe');
const User =  require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  let filter = req.query.using;
  let returnarray = [];
  let inputingredients = null;
  
  //Working on a specific user (by id): based on given ingredients, all recipes that can be crafted and are not owned are selected. Of these, all the ingredients are selected and returened in one array
  User.findById(req.query.id)
  .then((profile)=>{
    let knownrecipes = profile["recipes"];
    for(let i =0;i<knownrecipes.length;i++ ){knownrecipes[i]=Number(knownrecipes[i])}
    if(filter != undefined && filter != ""){
      inputingredients = filter.split('_');
      Recipe.find({ingredientarray: { $all: inputingredients }})
      .then((result)=>{
        for(let i = 0; i<result.length;i++){
          if(knownrecipes.includes(Number(result[i]["number"]))){
            console.log(result[i]["number"]+" - Überspringen");
          }
          else{
            let ingredientarray = result[i]["ingredientarray"];
            returnarray = [...new Set([...returnarray, ...ingredientarray])]
          }
        }
        res.send(returnarray);
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    else{
      Recipe.find()
      .then((result)=>{
        for(let i = 0; i<result.length;i++){
          if(knownrecipes.includes(Number(result[i]["number"]))){
            console.log(result[i]["number"]+" - Überspringen");
          }
          else{
            let ingredientarray = result[i]["ingredientarray"];
            returnarray = [...new Set([...returnarray, ...ingredientarray])]
          }
        }
        res.send(returnarray);  
      })
      .catch((err)=>{
        console.log(err);
      })
    }

  })
  .catch((err)=>{
    console.log(err);
  })


});

module.exports = router;
