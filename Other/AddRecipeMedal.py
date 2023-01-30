import requests
import json
import math

#getting all Recipes from DB
allRecipes = requests.get("http://localhost:3000/getRecipes")
allRecipes = json.loads(allRecipes.text)


def minimum(a, b):
     
    if a >= b:
        return b
    else:
        return a

#calculating medals based on footprint values
for i in allRecipes:
    carbonmedal = 0
    watermedal = 0
    carbonmedal = (pow(i["carbonpoints"],(1/3.3)) * 0.9 )-2.26 #formular for medals (carbon)
    watermedal = (pow(i["waterpoints"],(1/3.5)) * 0.95)-2.08  #formular for medals (water)
    carbonmedal = minimum(5,math.ceil(carbonmedal*2)/2)
    watermedal = minimum(5,math.ceil(watermedal*2)/2)
    pushurl = "http://localhost:3000/updateRecipe?id="+i["_id"]+"&wm="+str(watermedal)+"&cm="+str(carbonmedal)
    req =  requests.get(pushurl)



