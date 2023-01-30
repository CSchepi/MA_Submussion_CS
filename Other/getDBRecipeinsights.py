import requests
import json
#load recipes from DB
recipesjson = json.loads(requests.get("http://localhost:3000/getRecipes").text)
Zutatenverteilung = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
print(len(recipesjson))

#map ingredients to recipe and count matchs 
for i in recipesjson:
    for j in i["ingredientarray"]:
        Zutatenverteilung[(int(j)-1)] += 1
zähler = 0

#print ingredients with less than 4 appearences
for i in Zutatenverteilung:
    zähler+=1
    if int(i) <4: 
        print("Nummer: "+str(zähler)+" - Anzahl: "+str(i))


