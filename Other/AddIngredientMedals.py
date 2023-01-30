import requests
import json
import math

#getting all ingredients from DB
allIngredients = requests.get("http://localhost:3000/getIngredients")
allIngredients = json.loads(allIngredients.text)


def minimum(a, b):
     
    if a >= b:
        return b
    else:
        return a


#calculating medals based on footprint values
for i in allIngredients:
    carbonmedal = 0
    watermedal = 0
    carbonmedal = pow(i["carbonpoints"],(1/3.5))-1.9 #formular for medals (carbon)
    watermedal = pow(i["waterpoints"],(1/3.5))-2.3 #formular for medals (water)
    carbonmedal = minimum(5,math.ceil(carbonmedal*2)/2)
    watermedal = minimum(5,math.ceil(watermedal*2)/2)
    pushurl = "http://localhost:3000/updateIngredient?id="+i["_id"]+"&wm="+str(watermedal)+"&cm="+str(carbonmedal) #push calculated medals to DB
    req =  requests.get(pushurl)



