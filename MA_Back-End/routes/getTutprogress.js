var express = require('express');
var router = express.Router();

const User =  require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  //returns the tutorial array of a player (by id)
    User.findOne({_id: req.query.id})
    .then((result)=>{
      res.send(result["tutprogress"]);
    })
    .catch((err)=>{
      console.log(err);
    })
});

module.exports = router;
