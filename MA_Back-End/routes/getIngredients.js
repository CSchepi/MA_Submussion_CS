var express = require('express');
var router = express.Router();

const Ingredient =  require('../models/ingredient');

/* GET home page. */
router.get('/', function(req, res, next) {
  let filter = req.query.filternum;
  //returns all ingredients or if a number is given, the ingredient with the according number
  if(filter != undefined && filter != ""){
    let filterarray = filter.split('_');
    console.log(filterarray);
    Ingredient.find({'number':{$in:filterarray}})
    .then((result)=>{
      res.send(result);
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  else{
    Ingredient.find()
    .then((result)=>{
      res.send(result);
    })
    .catch((err)=>{
      console.log(err);
    })
  }
});

module.exports = router;
