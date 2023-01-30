let recipejson = null;
// 100 implemented ingredients
let Zutaten = ["Rind", "Schwein", "Kalb", "Hähnchen","Pute","Ente","Lamm","Wild","Wurst","Salami","Lachs","Forelle","Kabeljau","Thunfisch","Garnele","Muschel","Milch","Sojamilch","Käse","Sahne","Joghurt","Quark","Butter","Ziegenkäse","Parmesan","Mozzarella","Frischkäse","Gorgonzola","Ei","Honig","Mehl","Reis","Nudel","Brot","Schokolade","Zucker","Apfelsaft","Ananas","Apfel","Aprikose","Avocado","Banane","Birne","Blaubeere","Dattel","Erdbeere","Feige","Himbeere","Kirsche","Kiwi","Mandarine","Mango","Olive","Orange","Pfirsich","Pflaume","Wassermelone","Honigmelone","Zitrone","Zwetschge","Traube","Artischocke","Aubergine","Bohne","Blumenkohl","Brokkoli","Pilze","Erbse","Salat","Fenchel","Spitzkohl","Gurke","Kartoffel","Kichererbse","Knoblauch","Kürbis","Linsen","Mais","Karotte","Paprika","Kohlrabi","Lauch","Rosenkohl","Rote Bete","Rotkohl","Sellerie","Sojaspros","Spargel","Spinat","Süßkartoffel","Tomate","Zucchini","Zwiebel","Chili","Kokosnuss","Mandel","Erdnüsse","Haselnüsse","Walnüsse","Cashew"];
let gewichte = [0,0,0,0,0,0,0,0,0,00,0,0,0,0,40,0,0,0,0,00,0,0,0,0,0,0,0,0,60,00,0,0,0,0,0,0,0,1400,135,050,300,115,206,2,8,12,60,3,6,130,80,500,5,175,125,35,4000,1300,120,35,3,350,340,5,879,347,21,1,375,320,1200,350,100,0.5,3,2000,0.1,450,42,155,430,150,15,250,780,450,1,315,2,275,113,210,83,5,2200,1,0.4,1.3,3,1.6]
//load in filtered recipes
fetch('./HandeditedRecipes.json')
    .then((response) => response.json())
    .then((json) => {
        recipejson = json;
        setTimeout(()=>{
            loadNum(445); //done: 
        },2000)
        }
    );
let ZutatenData = null;
let Zutaten_req = new XMLHttpRequest();

//get Ingredients from DB
Zutaten_req.open("GET","https://ma-tommi.herokuapp.com/getIngredients");
Zutaten_req.send();
Zutaten_req.onreadystatechange =(result)=>{
    if(Zutaten_req.status==200&&Zutaten_req.readyState==4&&Zutaten_req.responseText){
        ZutatenData = JSON.parse(Zutaten_req.responseText);
    }
}

let aktuellangezeigt = 0;
let recipeincludes = [];
let recipe=null;

//loading next recipe to be displayed to user to check algorithmes choices
function loadNum(recipenum){ 
    aktuellangezeigt = recipenum; 
    recipeincludes = [];
    recipe = recipejson[recipenum];
    console.log(recipejson.length);
    document.getElementById("title").innerText="("+(recipenum+1)+"): "+recipe["Name"];
    let ingredients = recipe["Ingredients"];
    let leftstring = "";
    let rightstring ="";
    //showing original ingredient list and calculated ingredients with analysed weight 
    for(let i in ingredients){
        leftstring += "<div id='Z"+i+"'>"+ingredients[i]+"</div>";
        let foundin100 = false;
        let menge=0;

        //Text manimpulation, stemming and weightage analysis 
        let nameforval = ingredients[i].replaceAll(" ","");
        nameforval = nameforval.replaceAll("groß","")
        let ising = false;
        let isinkg = false;
        let endofnumber = false;
        if(Number(nameforval[0]<10)){
            menge = 10*menge+Number(nameforval[0]);
        }
        else{endofnumber = true;}
        if(Number(nameforval[1]<10)&&!endofnumber){
            menge = 10*menge+Number(nameforval[1]);
        }
        else{endofnumber = true;}
        if(Number(nameforval[2]<10)&&!endofnumber){
            menge = 10*menge+Number(nameforval[2]);
        }
        else{endofnumber = true;}
        if(Number(nameforval[3]<10)&&!endofnumber){
            menge = 10*menge+Number(nameforval[3]);
        }
        //converting units into gramm 
        if(menge<10&&nameforval[1]=="g"){ising=true}
        if(menge<10&&nameforval[2]=="g"&&nameforval[1]=="k"){isinkg=true}
        if(menge>9&&menge<100&&nameforval[2]=="g"){ising=true}
        if(menge>9&&menge<100&&nameforval[3]=="g"&&nameforval[2]=="k"){isinkg=true}
        if(menge>99&&menge<1000&&nameforval[3]=="g"){ising=true}
        if(menge>99&&menge<1000&&nameforval[4]=="g"&&nameforval[3]=="k"){isinkg=true}
        if(menge>999&&nameforval[4]=="g"){ising=true}
        if(menge>999&&nameforval[5]=="g"&&nameforval[4]=="k"){isinkg=true}

        if(isinkg){
            menge = menge*1000
            ising = true;
        }
        // map implemented ingredients onto recipe ingredient text
        for(let j in ZutatenData){
            let nametotest=ZutatenData[j]["name"].toLowerCase();
            if(nametotest.length >5){
                nametotest = nametotest.slice(0, -1);
            }
            if(ingredients[i].toLowerCase().includes(nametotest)&&!foundin100&&j!=28){  
                foundin100=true;
                
                if(!ising){
                    menge = menge*gewichte[j];
                }

                recipeincludes.push((Number(j)+1));
                rightstring+="<div id='R"+i+"'>   <input type='number' value="+menge+" id='Rval"+i+"'>"+ZutatenData[j]["name"]+" <button onclick='RemoveI("+i+")'>x</button></div>";
            }
        }
        //Border cases 
        if(ingredients[i].includes("Ei")&&!foundin100){
            foundin100=true;
                if(!ising){
                    menge = menge*gewichte[28];
                }

                recipeincludes.push((Number(28)+1));
                rightstring+="<div id='R"+i+"'>   <input type='number' value="+menge+" id='Rval"+i+"'>"+ZutatenData[28]["name"]+" <button onclick='RemoveI("+i+")'>x</button></div>";

        }
        //No match found
        if(!foundin100){
            rightstring+="<div id='R"+i+"'>None <button onclick='AddI("+i+")'>+</button></div>";
            recipeincludes.push(null);
        }
    }
    //Show results in html
    document.getElementById("ZutatausRezept").innerHTML= leftstring;
    document.getElementById("ZutatGegfunden").innerHTML= rightstring;
}

//Removes a wrong analysed ingredient
function RemoveI(pos){
    document.getElementById("R"+pos).innerHTML="None <button onclick='AddI("+pos+")'>+</button>";
    recipeincludes[pos]=null;
}
//adds a manualy entered ingredient
function AddI(pos){
    document.getElementById("R"+pos).innerHTML="<input id='TextInput"+pos+"' onchange='PushI("+pos+")' type='text'> <button onclick='RemoveI("+pos+")'>x</button>";
}

//Maps Text from User Input or original input string onto implemented ingredients
function PushI(pos){
    let value = document.getElementById("TextInput"+pos).value;
    let foundthetext = false;
    for(let j in ZutatenData){
        if(value.toLowerCase().includes(ZutatenData[j]["name"].toLowerCase())&&j!=28&&j!=67&&j!=72&&j!=18&&j!=29&&j!=16){  // j1= ... being bordercases
            recipeincludes[pos]=(Number(j)+1);
            document.getElementById("R"+pos).innerHTML="<input type='number' id='Rval"+pos+"'>"+ZutatenData[j]["name"]+" <button onclick='RemoveI("+pos+")'>x</button>";
            foundthetext=true;
            break;
        }
    }
    //Handeling bordercases
    if(value.toLowerCase().includes("ei")&&!foundthetext){ 
        recipeincludes[pos]=(Number(28)+1);
        document.getElementById("R"+pos).innerHTML="<input type='number' id='Rval"+pos+"'>"+ZutatenData[28]["name"]+" <button onclick='RemoveI("+pos+")'>x</button>";
    }
    if(value.toLowerCase().toLowerCase().includes("erbse")&&!foundthetext){ 
        recipeincludes[pos]=(Number(67)+1);
        document.getElementById("R"+pos).innerHTML="<input type='number' id='Rval"+pos+"'>"+ZutatenData[67]["name"]+" <button onclick='RemoveI("+pos+")'>x</button>";   
    }
    if(value.toLowerCase().toLowerCase().includes("kartoffel")&&!foundthetext){ 
        recipeincludes[pos]=(Number(72)+1);
        document.getElementById("R"+pos).innerHTML="<input type='number' id='Rval"+pos+"'>"+ZutatenData[29]["name"]+" <button onclick='RemoveI("+pos+")'>x</button>";
    }
    if(value.toLowerCase().toLowerCase().includes("milch")&&!foundthetext){ 
        recipeincludes[pos]=(Number(16)+1);
        document.getElementById("R"+pos).innerHTML="<input type='number' id='Rval"+pos+"'>"+ZutatenData[16]["name"]+" <button onclick='RemoveI("+pos+")'>x</button>";
    }
    if(value.toLowerCase().toLowerCase().includes("honig")&&!foundthetext){ 
        recipeincludes[pos]=(Number(29)+1);
        document.getElementById("R"+pos).innerHTML="<input type='number' id='Rval"+pos+"'>"+ZutatenData[72]["name"]+" <button onclick='RemoveI("+pos+")'>x</button>";
    }
    if(value.toLowerCase().toLowerCase().includes("käse")&&!foundthetext){ 
        recipeincludes[pos]=(Number(18)+1);
        document.getElementById("R"+pos).innerHTML="<input type='number' id='Rval"+pos+"'>"+ZutatenData[18]["name"]+" <button onclick='RemoveI("+pos+")'>x</button>";
    }
}
//Calculate final Footprints and push to DB
function Finished(){
    let co2 = 0; 
    let water = 0; 
    let gesamtgewicht = 0;
    //calculating total co2-eq. and water for recipe 
    for(let i in recipeincludes){
        if(recipeincludes[i]!=null){
            let  mengeing = Number(document.getElementById("Rval"+i).value);
            let zutat = ZutatenData[recipeincludes[i]-1];
            let zco2 = zutat["carbonpoints"];
            let zwasser = zutat["waterpoints"];
            gesamtgewicht += mengeing;
            co2 +=(mengeing*zco2)/100;
            water +=(mengeing*zwasser)/100;
        }
    }
    //calculating Footprints / 100g
    let co2pro100 = Math.floor((co2/gesamtgewicht)*100);
    let waterpro100 = Math.floor((water/gesamtgewicht)*100);
    console.log(co2pro100)
    console.log(waterpro100)

    //create Requeststring
    let ingredientarrayurl = "";
    let ingredientstring = "";
    for(let i in recipe["Ingredients"]){
        ingredientstring+=encodeURI(recipe["Ingredients"][i])+"//";
    }
    for(let i in recipeincludes){
        if(recipeincludes[i]!=null){
            ingredientarrayurl+="&ingredientarray="+Number(recipeincludes[i]);
        }
    }
    let backtext = recipe["Instructions"].slice(0,200)+"...";

    //Push manually corrected Recipe to DB
    let topushurl = "https://ma-tommi.herokuapp.com/addRecipe?name="+encodeURI(recipe["Name"])+"&imgurl="+encodeURI(recipe["imgurl"])+"&num="+(Number(aktuellangezeigt)+1)+"&carbonpoints="+co2pro100+"&waterpoints="+waterpro100+"&backtext="+encodeURI(backtext)+"&info="+encodeURI(recipe["info"])+"&ingredientlist="+ingredientstring+""+ingredientarrayurl+"&instructions="+encodeURI(recipe["Instructions"])+""

    console.log(topushurl);
    let recipe_req = new XMLHttpRequest();
    recipe_req.open("GET",topushurl)
    recipe_req.send();

    loadNum(aktuellangezeigt+1);
}