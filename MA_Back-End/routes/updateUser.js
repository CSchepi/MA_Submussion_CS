var express = require('express');
var router = express.Router();

const User =  require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
    let new_ingredient = req.query.addI;
    let new_recipe = req.query.addR;
    //updates ingredients or recipes or levelprogress of a user (by id)
    let Level_Prorgress = null;
    if(req.query.LP != undefined){
      Level_Prorgress =req.query.LP.split('_');
    }

    let update = null;
    //creating an update property based on the given inputs 
    if(new_ingredient!=undefined&& new_ingredient!=""){
      update = {$push: {ingredients: new_ingredient}}
    }
    if(new_recipe!=undefined&& new_recipe!=""){
      update = {$push: {recipes: new_recipe}}
    }
    if(Level_Prorgress != null && Level_Prorgress.length == 24){
      update = {lvlprogress: Level_Prorgress}
    }

    User.findOneAndUpdate({_id: req.query.id}, update, {new: true})
    .then((result)=>{
      res.send(result);
    })
    .catch((err)=>{
      console.log(err);
    })
});

module.exports = router;
