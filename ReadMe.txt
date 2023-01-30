- "MA_Back-End":
  This folder contains the back-end of the project. It is hosted on heroku.com. It is built on an node.js express server.  
  All request in the front-end files are directed at the hosted server on heroku. It therefor is not necesarry to run the back-end locally in order to play the game.
  
-  "MA_Front-End without Eye-Tracking":
  This folder contains one version of the front-end of the project which does not include the eye-tracking feature and was used for the first user study.
  It can be executed by starting the index.html file. Ideal environment: FHD 16/9 monitor in google chorme. 
 
- "MA_Front-End with Eye-Tracking":
  This folder contains one version of the front-end of the project which include the eye-tracking feature and was used for the second user study.
  It can be executed by starting the index.html file. Ideal environment: FHD 16/9 monitor in google chorme. 
 
- "Other"
   A list of files, used to pre- and post process data for the project and from the usre studies
   
   + "AddIngredientToDB.py":     Generates the ingredients based on user inputs and pushes them to the DB
   + "AddRecipesToDB.py":        Generates the recipes based on user inputs and pushes them to the DB
   + "AddIngredientMedals.py":   Calculating the Medals for all Ingredients and pushing them to the DB
   + "AddRecipeMedal.py" :       Calculating the Medals for all Recipes and pushing them to the DB
   + calcco2-files:              This HTML, CSS and JS files generate a basic UI that shows the automatically detected ingredients in a recipe and the amount used. 
                                 These detected information can then be corrected manually and are then pushed to the DB to generate a new Recipes
   + Filter-files:               These files are used to get insights into the existing Recipe Database based on different parameters and with regard to the used ingredients
   + "getDBRecipeinsights.py":   Shows the distribution of ingredients among the Recipes in the final DB   
   + "recipe.json": 		     The Dataset from which the used recipes are filtered from
   + "recipesFiltered.json":     A filtered version of the "recipe.json" with regard to the used ingredients in the recipes
   + "HandeditedRecipe.json":    The final dataset which was corrected manually and information like the correct title and a recipe image are    
   + "Result_First_Survey.xlsx": Results from the first user study with calculated average values, standard deviation and visualisation of the results