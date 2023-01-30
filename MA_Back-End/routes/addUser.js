var express = require('express');
var router = express.Router();

const User =  require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {

  //Create new User
  console.log(req.query.pw);
  const user = new User({
    name: req.query.name,
    pw: req.query.pw,
    lvlprogress: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ingredients: [],
    recipes: [],
    tutprogress:[0,0,0,0,0,0,0]
  });

  user.save()
  .then((result)=>{
    res.send(result);
  })
  .catch((err)=>{
    console.log(err);
  })
});

module.exports = router;
