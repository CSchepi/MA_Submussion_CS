var express = require('express');
var router = express.Router();

const Ingredient =  require('../models/ingredient.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    let watermedal = req.query.wm;
    let carbonmedal = req.query.cm;
    let update = {carbonmedal: carbonmedal, watermedal: watermedal}
    //updates the watermedal and carbonmedal of one ingredient (by id) 
    Ingredient.findOneAndUpdate({_id: req.query.id}, update, {new: true})
    .then((result)=>{
      res.send(result);
    })
    .catch((err)=>{
      console.log(err);
    })
});

module.exports = router;
