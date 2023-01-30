var express = require('express');
var router = express.Router();

const Ingredient =  require('../models/ingredient');

/* GET home page. */
router.get('/', function(req, res, next) {

  //Create new Ingredient
  const ingredient = new Ingredient({
    name: req.query.name,
    number: req.query.num,
    carbonpoints: req.query.carbonpoints,
    waterpoints: req.query.waterpoints,
    seasonstart: req.query.sstart,
    seasonend: req.query.send,
    region: req.query.region,
    type: req.query.type,
    infobar: req.query.info,
    backtext: "Leider gibt es noch keine weiteren Informationen zu dieser Zutat" 
  });

  ingredient.save()
  .then((result)=>{
    res.send(result);
  })
  .catch((err)=>{
    console.log(err);
  })
});

module.exports = router;
