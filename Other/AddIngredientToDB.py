from ast import Num
import requests
import urllib.parse

# inputform for all 100 ingredients consisting of name, season, region, kategory, co2-eq. (g), water (l) and information
for x in range(0,101):
  print("["+str((x))+"] Zutatname: ")
  name = input()
  print("["+str((x))+"] "+name+" -> Saison Start: ")
  sstart = input()
  print("["+str((x))+"] "+name+" -> Saison Ende: ")
  send = input()    
  print("["+str((x))+"] "+name+" -> Region: ")
  region = input()
  print("["+str((x))+"] "+name+" -> Typ: ")
  type = input()
  print("["+str((x))+"] "+name+" -> CO2 (g): ")
  co2 = input()
  print("["+str((x))+"] "+name+" -> Wasser (l): ")
  water = input()
  print("["+str((x))+"] "+name+" -> Info: ")
  info = input()
  
  #pushing new ingredient to DB
  url_string = 'http://localhost:3000/addIngredient?name='+urllib.parse.quote(name)+'&num='+str((x))+'&carbonpoints='+urllib.parse.quote(co2)+'&waterpoints='+urllib.parse.quote(water)+'&sstart='+urllib.parse.quote(sstart)+'&send='+urllib.parse.quote(send)+'&region='+urllib.parse.quote(region)+'&type='+urllib.parse.quote(type)+'&info='+urllib.parse.quote(info)
  print(url_string)
  req = requests.get(url_string)