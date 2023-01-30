import json
from unicodedata import name
import numpy as np
import os
print(os.listdir())

#open recipe JSON
f = open('Preprocessing_Recipe/recipes.json')
data=json.load(f)

#list of implemented ingredients
zutaten = ["Rind", "Schwein", "Kalb", "HÃ¤hnchen","Pute","Ente","Lamm","Wild","Wurst","Salami","Lachs","Forelle","Kabeljau","Thunfisch","Garnele","Muschel","Milch","Sojamilch","KÃ¤se","Sahne","Joghurt","Quark","Butter","ZiegenkÃ¤se","Parmesan","Mozzarella","FrischkÃ¤se","Gorgonzola","Ei","Honig","Mehl","Reis","Nudel","Brot","Schokolade","Zucker","Apfelsaft","Ananas","Apfel","Aprikose","Avocado","Banane","Birne","Blaubeere","Dattel","Erdbeere","Feige","Himbeere","Kirsche","Kiwi","Mandarine","Mango","Olive","Orange","Pfirsich","Pflaume","Wassermelone","Honigmelone","Zitrone","Zwetschge","Traube","Artischocke","Aubergine","Bohne","Blumenkohl","Brokkoli","Pilze","Erbse","Salat","Fenchel","Spitzkohl","Gurke","Kartoffel","Kichererbse","Knoblauch","KÃ¼rbis","Linsen","Mais","Karotte","Paprika","Kohlrabi","Lauch","Rosenkohl","Rote Bete","Rotkohl","Sellerie","Sojaspros","Spargel","Spinat","SÃ¼ÃŸkartoffel","Tomate","Zucchini","Zwiebel","Chili","Kokosnuss","Mandel","ErdnÃ¼sse","HaselnÃ¼sse","WalnÃ¼sse","Cashew"]
RezeptemitZutat=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
ZutatenproRezept=[]

print(len(data))

names = []

#map ingredients to recipe
for i in range(len(data)):
  if not data[i]["Name"] in names:
    names.append(data[i]["Name"])
  zutatenstring = ''.join(data[i]['Ingredients'])
  zutatenzahl = 0
  for j in range(100):
    if zutaten[j] in zutatenstring:
      RezeptemitZutat[j] +=1
      zutatenzahl +=1
  ZutatenproRezept.append(zutatenzahl)

#sort recipe by ingredient count   
sortorder = np.argsort(ZutatenproRezept)

#print num- of ingredientusage in recipe
for i in range(100):
  print(zutaten[i]+": "+str(RezeptemitZutat[i]))
