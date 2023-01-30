import json
import numpy as np

#load recipeas
f = open('Preprocessing_Recipe/recipes.json')
data=json.load(f)
#load file to write result to
wr = open('Preprocessing_Recipe/recipesFiltered.json', "a")

#list of implemented ingredients
zutaten = ["Rind", "Schwein", "Kalb", "HÃ¤hnchen","Pute","Ente","Lamm","Wild","Wurst","Salami","Lachs","Forelle","Kabeljau","Thunfisch","Garnele","Muschel","Milch","Sojamilch","KÃ¤se","Sahne","Joghurt","Quark","Butter","ZiegenkÃ¤se","Parmesan","Mozzarella","FrischkÃ¤se","Gorgonzola","Ei","Honig","Mehl","Reis","Nudel","Brot","Schokolade","Zucker","Apfelsaft","Ananas","Apfel","Aprikose","Avocado","Banane","Birne","Blaubeere","Dattel","Erdbeere","Feige","Himbeere","Kirsche","Kiwi","Mandarine","Mango","Olive","Orange","Pfirsich","Pflaume","Wassermelone","Honigmelone","Zitrone","Zwetschge","Traube","Artischocke","Aubergine","Bohne","Blumenkohl","Brokkoli","Pilze","Erbse","Salat","Fenchel","Spitzkohl","Gurke","Kartoffel","Kichererbse","Knoblauch","KÃ¼rbis","Linsen","Mais","Karotte","Paprika","Kohlrabi","Lauch","Rosenkohl","Rote Bete","Rotkohl","Sellerie","Sojaspros","Spargel","Spinat","SÃ¼ÃŸkartoffel","Tomate","Zucchini","Zwiebel","Chili","Kokosnuss","Mandel","ErdnÃ¼sse","HaselnÃ¼sse","WalnÃ¼sse","Cashew"]
RezeptemitZutat=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
ZutatenproRezept=[]

namenarray = []
idarray = []
output_dict = []

#Go over all recipes and  generate num. of ingredient match-score and detected ingredients
for i in range(12190):
  # print(""+str(i)+" / 12190")
  zutatenstring = ''.join(data[i]['Ingredients'])
  zutatenzahl = 0
  for j in range(100):
    if zutaten[j] in zutatenstring:
      zutatenzahl +=1
  ZutatenproRezept.append(zutatenzahl)

#Sort recipes by match-score 
sortorder = np.argsort(ZutatenproRezept)
tested = 0
#remove recipes with identical title
for i in range(12190):
  tested +=1
  if len(namenarray)==400:
    break
  currname = data[sortorder[12189-i]]["Instructions"][0:25]
  if not currname in namenarray:
    namenarray.append(currname)
    idarray.append(sortorder[12189-i])
    output_dict.append(data[sortorder[12189-i]])


#create list of ingredients
for i in range(len(output_dict)):
  zutatenstring = ''.join(output_dict[i]['Ingredients'])
  for j in range(100):
    if zutaten[j] in zutatenstring:
      RezeptemitZutat[j] +=1

#before filling holes

for i in range(100):
  print(zutaten[i]+": "+str(RezeptemitZutat[i]))
print(len(output_dict))
print("--------------------------------------------")

#filling holes

manualpushed = []

#generate output json of filtered recipes
for i in range(100):
  count = RezeptemitZutat[i]
  if count <4:
    print("Filling : "+zutaten[i]+"("+str(count)+")")
    for j in range(12190):
      if count < 4: 
        zutatenstring = data[sortorder[12189-j]]['Ingredients']
        currname = data[sortorder[12189-j]]["Instructions"][0:25]
        if not sortorder[12189-j] in idarray:
          if zutaten[i].lower() in str(zutatenstring).lower() and not currname in namenarray:
            print("+1")
            output_dict.append(data[sortorder[12189-j]])
            idarray.append(sortorder[12189-j])
            namenarray.append(currname)
            count +=1
          

output_json = json.dumps(output_dict)
wr.write(output_json)
