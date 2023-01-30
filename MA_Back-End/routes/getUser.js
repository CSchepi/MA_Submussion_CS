var express = require('express');
var router = express.Router();

const User =  require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  //returns all information about one user giben its username and encrypted pasword (used for logging in)
    User.find({'name': req.query.name, 'pw': req.query.pw})
    .then((result)=>{
      res.send(result);
    })
    .catch((err)=>{
      console.log(err);
    })
});

module.exports = router;
