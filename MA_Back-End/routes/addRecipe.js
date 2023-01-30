var express = require('express');
var router = express.Router();

const Recipe =  require('../models/recipe');

/* GET home page. */
router.get('/', function(req, res, next) {

  //Create new Recipe
  const recipe = new Recipe({
    name: req.query.name,
    imgurl: req.query.imgurl,
    number: req.query.num,
    carbonpoints: req.query.carbonpoints,
    waterpoints: req.query.waterpoints,  
    backtext: req.query.backtext,
    cardidentifier: req.query.info,
    ingredientlist: req.query.ingredientlist,
    ingredientarray: req.query.ingredientarray,
    instructions: req.query.instructions
  });

  recipe.save()
  .then((result)=>{
    res.send(result);
  })
  .catch((err)=>{
    console.log(err);
  })
});

module.exports = router;
