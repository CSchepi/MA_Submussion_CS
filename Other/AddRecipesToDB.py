from array import array
from ast import Num
from cmath import inf
import requests
import json
import urllib.parse

count_F = 0
count_P = 0
count_Vegi = 0
count_Vega = 0

#keys for google image search (not used in final DB entry)
key1 = "AIzaSyCWVOY4Vl53g0bVZCfEsKIMV3bIkVwNYzw"
key2 = "AIzaSyBG_UDGwWgbM-0EvZaT2-oeB9DH_toNgNY"
key3 = "AIzaSyAJt1BNIpXyV_Gnsh3Z0i4oY477JLGovjU"
key4 = "AIzaSyB0s798LUKJuLC2iQ45OrMf2UwibQamCXI"
key5 = "AIzaSyA4OMStAnXEkSUm69KPT5iTIG_mORmf5Qg"

alreadyenteredTitles = [] #Array wit all (also identical) entered titles

#generating a img url baes on an input string and key (not used)
def TextToUrl(text, key):
  occurance = alreadyenteredTitles.count(text)
  keyword = text[0:30].replace(" ", "+")
  searchstring = "https://www.googleapis.com/customsearch/v1?googlehost=google.com&safe=medium&searchType=image&key="+str(key)+"&cx=8037a594e4b9345a1&q="+str(keyword)
  url_respone = requests.get(searchstring)
  jsonresponse_url = url_respone.text
  url_data = json.loads(jsonresponse_url)
  if int(url_data["searchInformation"]["totalResults"]) > 0:
    position = occurance%int(url_data["searchInformation"]["totalResults"])
    return (url_data["items"][position]["link"])     
  else:
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"



#loading in filtered recipes
f = open("C:/Users/Schepi/Desktop/Masterarbeit/Preprocessing_Recipe/recipesFiltered.json", encoding="utf8")
Recipes = json.loads(f.read())

#array of 100 implemented ingredients
zutaten = ["Rind", "Schwein", "Kalb", "HÃ¤hnchen","Pute","Ente","Lamm","Wild","Wurst","Salami","Lachs","Forelle","Kabeljau","Thunfisch","Garnele","Muschel","Milch","Sojamilch","KÃ¤se","Sahne","Joghurt","Quark","Butter","ZiegenkÃ¤se","Parmesan","Mozzarella","FrischkÃ¤se","Gorgonzola","Ei","Honig","Mehl","Reis","Nudel","Brot","Schokolade","Zucker","Apfelsaft","Ananas","Apfel","Aprikose","Avocado","Banane","Birne","Blaubeere","Dattel","Erdbeere","Feige","Himbeere","Kirsche","Kiwi","Mandarine","Mango","Olive","Orange","Pfirsich","Pflaume","Wassermelone","Honigmelone","Zitrone","Zwetschge","Traube","Artischocke","Aubergine","Bohne","Blumenkohl","Broccoli","Pilze","Erbse","Salat","Fenchel","Spitzkohl","Gurke","Kartoffel","Kichererbse","Knoblauch","KÃ¼rbis","Linsen","Mais","Karotte","Paprika","Kohlrabi","Lauch","Rosenkohl","Rote Bete","Rotkohl","Sellerie","Sojaspros","Spargel","Spinat","SÃ¼ÃŸkartoffel","Tomate","Zucchini","Zwiebel","Chili","Kokosnuss","Mandel","ErdnÃ¼sse","HaselnÃ¼sse","WalnÃ¼sse","Cashew"]

#find ingredients in recipy matching with implemented
def ZutatenimRezeptArray(zutatenstring):
  outputarray = []
  for i in range(0,100):
    if zutaten[i] in zutatenstring:
      outputarray.append((i+1))
  return outputarray

#defining a recipe's category based on ingredients
def createInfo(zutatenarray, zutatentext):
  global count_F
  global count_P 
  global count_Vegi 
  global count_Vega
  if "fleisch" in zutatentext.lower():
    return "Enthält Fleisch"
  if all(i > 30 for i in zutatenarray):
    count_Vega = count_Vega + 1
    return "Vegan"
  if all(i > 16 for i in zutatenarray):
      count_Vegi = count_Vegi + 1
      return "Vegetarisch"
  if all(i > 10 for i in zutatenarray):
        count_P = count_P + 1
        return "Pescetarisch"    
  count_F = count_F + 1
  return "Enthält Fleisch"

#creating DB entry for recipe 
for i in range(1,446):
  currentrecipe = Recipes[i]
  name = currentrecipe["Name"]
  #Keys limited to 100 requests per day -> use 5 keys alternatingly 
  if i%5 ==0:
    imgurl = TextToUrl(name,key1)
  if i%5 ==1:
    imgurl = TextToUrl(name,key2)
  if i%5 ==2:
    imgurl = TextToUrl(name,key3)
  if i%5 ==3:
    imgurl = TextToUrl(name,key4)
  if i%5 ==4:
    imgurl = TextToUrl(name,key5)
  alreadyenteredTitles.append(name)
  rnum = i +1
  carbonpoints = 0
  waterpoints = 0
  #generating and calculating Recipe information
  backtext = currentrecipe["Instructions"][0:200]+"..."
  ingredientlist = "".join((str(x)+" // ") for x in Recipes[i]["Ingredients"])
  ingredientarray= ZutatenimRezeptArray(ingredientlist)
  instructions = currentrecipe["Instructions"]
  info = createInfo(ingredientarray, ingredientlist)
  ingredientarrayforURL = ""
  for i in ingredientarray:
    ingredientarrayforURL += "&ingredientarray="+str(i)

  #request to DB for adding Recipe
  url_string = 'http://localhost:3000/addRecipe?name='+urllib.parse.quote(name)+'&num='+urllib.parse.quote(str(rnum))+'&imgurl='+imgurl+'&carbonpoints='+urllib.parse.quote(str(carbonpoints))+'&waterpoints='+urllib.parse.quote(str(waterpoints))+'&info='+urllib.parse.quote(info)+'&backtext='+urllib.parse.quote(backtext)+'&ingredientlist='+urllib.parse.quote(ingredientlist)+''+ingredientarrayforURL+'&instructions='+urllib.parse.quote(instructions)+''
  print(url_string)
  req = requests.get(url_string)
