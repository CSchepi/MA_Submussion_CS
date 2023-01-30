var express = require('express');
var router = express.Router();

const Recipe =  require('../models/recipe');

/* GET home page. */
router.get('/', function(req, res, next) {

  let filter = req.query.filternum;
  //returns all recipes or if a number is given, the recipe with the according number
  if(filter != undefined && filter != ""){
    let filterarray = filter.split('_');
    console.log(filterarray);
    Recipe.find({'number':{$in:filterarray}})
    .then((result)=>{
      res.send(result);
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  else{
    Recipe.find()
      .then((result)=>{
        res.send(result);
      })
      .catch((err)=>{
        console.log(err);
      })

  }
});

module.exports = router;
