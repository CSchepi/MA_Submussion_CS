import json
import numpy as np

#open recipe JSON
f = open('Preprocessing_Recipe/recipes.json')
data=json.load(f)

#list of implemented ingredients
zutaten = ["Rind", "Schwein", "Kalb", "HÃ¤hnchen","Pute","Ente","Lamm","Wild","Wurst","Salami","Lachs","Forelle","Kabeljau","Thunfisch","Garnele","Muschel","Milch","Sojamilch","KÃ¤se","Sahne","Joghurt","Quark","Butter","ZiegenkÃ¤se","Parmesan","Mozzarella","FrischkÃ¤se","Gorgonzola","Ei","Honig","Mehl","Reis","Nudel","Brot","Schokolade","Zucker","Apfelsaft","Ananas","Apfel","Aprikose","Avocado","Banane","Birne","Blaubeere","Dattel","Erdbeere","Feige","Himbeere","Kirsche","Kiwi","Mandarine","Mango","Olive","Orange","Pfirsich","Pflaume","Wassermelone","Honigmelone","Zitrone","Zwetschge","Traube","Artischocke","Aubergine","Bohne","Blumenkohl","Brokkoli","Pilze","Erbse","Salat","Fenchel","Spitzkohl","Gurke","Kartoffel","Kichererbse","Knoblauch","KÃ¼rbis","Linsen","Mais","Karotte","Paprika","Pastinake","Lauch","Rosenkohl","Rote Bete","Rotkohl","Sellerie","Soja","Spargel","Spinat","SÃ¼ÃŸkartoffel","Tomate","Zucchini","Zwiebel","Kokosnuss","Mandel","ErdnÃ¼sse","HaselnÃ¼sse","WalnÃ¼sse","Cashew"]
RezeptemitZutat=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
ZutatenproRezept=[]

#Filter options for which recipes shall be searched
filterforZ1 = "Kokosnuss"
filterforZ2 = ""
filterforPos = 0

positions = []

#Return a Recipe at certain position with included ingredients
if filterforPos > 0:
  zutatenstring = ''.join(data[filterforPos]['Ingredients'])
  zutatenzahl = 0
  for j in range(100):
    if zutaten[j] in zutatenstring:
      RezeptemitZutat[j] +=1
      zutatenzahl +=1
  ZutatenproRezept.append(zutatenzahl)
  print(json.dumps(data[filterforPos]))

#return recipes that use all entered Ingredient-Filter
else:
  for i in range(12190):
    # print(""+str(i)+" / 12190")
    zutatenstring = ''.join(data[i]['Ingredients'])
    zutatenzahl = 0
    if(filterforZ1 in zutatenstring and filterforZ2 in zutatenstring):
      positions.append(i)
      for j in range(100):
        if zutaten[j] in zutatenstring:
          RezeptemitZutat[j] +=1
          zutatenzahl +=1
      ZutatenproRezept.append(zutatenzahl)
     
  for i in range(100):
    print(zutaten[i]+": "+str(RezeptemitZutat[i]))

print(positions)
