var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
//custom Routes

const addIngredientRouter = require('./routes/addIngredient');
const getIngretientsRouter = require('./routes/getIngredients');
const addRecipeRouter = require('./routes/addRecipe');
const getRecipesRouter = require('./routes/getRecipes');
const addUser = require('./routes/addUser');
const getUser = require('./routes/getUser');
const checkUsername = require('./routes/checkUsername');
const updateUser = require('./routes/updateUser');
const getIngredientswhileCrafting = require('./routes/getIngredientswhileCrafting');
const getCraftedRecipe = require('./routes/getCraftedRecipe');
const updateIngredient = require('./routes/updateIngredient');
const updateRecipe = require('./routes/updateRecipe');
const getTutprogress = require('./routes/getTutprogress');
const updateTutprogress = require('./routes/updateTutprogress');


//MongoDB requirements
const mongoose = require('mongoose');
var app = express();

//MongoDB Connection
const DBconnectionstring = 'mongodb+srv://Schepi:CS_Master@cluster0.9hklqab.mongodb.net/Tommi?retryWrites=true&w=majority'; //connection string 
mongoose.connect(DBconnectionstring);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.use('/', indexRouter);

//custom routes
app.use('/addIngredient', addIngredientRouter);
app.use('/getIngredients', getIngretientsRouter);
app.use('/addRecipe', addRecipeRouter);
app.use('/getRecipes', getRecipesRouter);
app.use('/addUser', addUser);
app.use('/getUser', getUser);
app.use('/checkUsername', checkUsername);
app.use('/updateUser', updateUser);
app.use('/getIngredientswhileCrafting', getIngredientswhileCrafting);
app.use('/getCraftedRecipe', getCraftedRecipe);
app.use('/updateIngredient', updateIngredient);
app.use('/updateRecipe', updateRecipe);
app.use('/getTutprogress', getTutprogress);
app.use('/updateTutprogress', updateTutprogress);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
