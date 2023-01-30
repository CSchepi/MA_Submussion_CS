let inputcards = 0; 
let resultnumber = null;
let cardsprokat = [[],[],[],[],[]];
let cardkatpointer = [0,0,0,0,0];
let possible_Recipes = null; 
let cardsinfield = [];
let userid =sessionStorage.getItem("_id");

let Recipes = sessionStorage.getItem("recipes").split(",");

//Changing cards to gray and not clicable if no recipe exists for it and all so far selected cards
function FilterAvailables(){
    let requeststring = "";
    if(!cardsinfield.length==0){
        requeststring ="&using="+cardsinfield;
        requeststring= requeststring.replaceAll(",","_");
    }
    let allcards = document.getElementsByClassName("card");
    let availablenonselected = [];
    //server side calculation of available cards based on previous input
    let restIng_req = new XMLHttpRequest();
    restIng_req.open("GET","https://ma-tommi.herokuapp.com/getIngredientswhileCrafting?id="+userid+""+requeststring,true);
    restIng_req.send();
    restIng_req.onreadystatechange = ()=>{
        if(restIng_req.status==200){
            availablenonselected = restIng_req.responseText.replace("[","").replace("]","").replaceAll('"','').split(",");
            for(let i = 0; i<availablenonselected.length;i++){
                availablenonselected[i] = Number(availablenonselected[i]);
            }
            //Add class "notavailable" to all cards not included in server result
            for(let i = 0; i < allcards.length; i++){
                allcards[i].classList.remove("notavailable");
                let cardnumber = allcards[i].id.replace("C","");
                if(!availablenonselected.includes(Number(cardnumber))){
                    allcards[i].classList.add("notavailable");
                }
            }
            //sort all not available cards to end of row (per kategory)
            setTimeout(()=>{
                for(let i = 0; i<5;i++){
                    let categoryfield = document.getElementById("KatWrapp"+i);
                    let cardstosort = categoryfield.getElementsByClassName("card");
                    for(let j in cardstosort){
                        let cardtosort = cardstosort[j];
                        if(cardtosort.classList!=undefined){
                            if(cardtosort.classList.contains("notavailable")){
                                let clonecard = cardtosort.cloneNode(true);
                                cardtosort.remove();
                                categoryfield.innerHTML+=clonecard.outerHTML;
                            }
                        }
                    }
                }
            },100)
        }
    }
    
}

//Scrolling through the cards of a kategory
function ShowNext(cat){
    if(cat ==1 || cat==3){
        cardkatpointer[cat]= (cardkatpointer[cat]-1+cardsprokat[cat].length)%cardsprokat[cat].length;
    }
    else{  
        cardkatpointer[cat]= (cardkatpointer[cat]+1)%cardsprokat[cat].length;
    }
    ShowRelevantCards()
}

//cloering in not available cards gray and making them not clickable
function ShowRelevantCards(){
    let allcards = document.getElementsByClassName("card");
    //ignor all cards in the crafting area
    for(let i = 0; i < allcards.length; i++){
        if(!allcards[i].classList.contains("alwaysvisible")){
            allcards[i].style.display="none";
        }
    }
    for(let cat = 0; cat<5;cat++){
        if(cardsprokat[cat].length>0){
            document.getElementById("C"+cardsprokat[cat][cardkatpointer[cat]%(cardsprokat[cat].length)]).style.display ="block";
            document.getElementById("C"+cardsprokat[cat][(cardkatpointer[cat]+1)%(cardsprokat[cat].length)]).style.display ="block";
            document.getElementById("C"+cardsprokat[cat][(cardkatpointer[cat]+2)%(cardsprokat[cat].length)]).style.display ="block";
        }
    }
}

//adds users owned cards to html and sorting into product kategory
function FillInOwnedCards(){
    let innerhtml0 = '';
    let innerhtml1 = '';
    let innerhtml2 = '';
    let innerhtml3 = '';
    let innerhtml4 = '';
    Ingredients = sessionStorage.getItem("ingredients").split(",");
    let bonuscard = new URLSearchParams(window.location.search).get('bonus');
    if(bonuscard>0 && bonuscard<=100 ){
        if(!Ingredients.includes(bonuscard)){
            Ingredients.push(bonuscard);
        }
        setTimeout(()=>{
            document.getElementById("C"+bonuscard).click();
        },500);
    }
    for(let i = 0; i<Ingredients.length; i++){
        let Item = Ingredients[i];
        if(Item<17){
            innerhtml0 += '<div onclick="Add(0,'+Item+')" class="card ckat0" id="C'+Item+'"></div>';
            cardsprokat[0].push(Item);
        }
        if(Item>16&&Item<31){
            innerhtml1 += '<div onclick="Add(1,'+Item+')" class="card ckat1" id="C'+Item+'"></div>';
            cardsprokat[1].push(Item);
        }
        if(Item>37&&Item<62){
            innerhtml2 += '<div onclick="Add(2,'+Item+')" class="card ckat2" id="C'+Item+'"></div>';
            cardsprokat[2].push(Item);
        }
        if(Item>61&&Item<95){
            innerhtml3 += '<div onclick="Add(3,'+Item+')" class="card ckat3" id="C'+Item+'"></div>';
            cardsprokat[3].push(Item);
        }
        if(Item>94|| (Item>30&&Item<38)){
            innerhtml4 += '<div onclick="Add(4,'+Item+')" class="card ckat4" id="C'+Item+'"></div>';
            cardsprokat[4].push(Item);
        }
    }
    //Adding Buttons after last or before first card based on the side of the screen on which the kategory is displayed
    if(cardsprokat[0].length>3){    innerhtml0 += '<div class="shownext"><button onclick="ShowNext(0)">❯</button></div>'; }
    if(cardsprokat[1].length>3){    innerhtml1 = '<div class="showprev"><button onclick="ShowNext(1)">❮</button></div>'+innerhtml1; }
    if(cardsprokat[2].length>3){    innerhtml2 += '<div class="shownext"><button onclick="ShowNext(2)">❯</button></div>'; }
    if(cardsprokat[3].length>3){    innerhtml3 = '<div class="showprev"><button onclick="ShowNext(3)">❮</button></div>'+innerhtml3; }
    if(cardsprokat[4].length>3){    innerhtml4 += '<div class="shownext"><button onclick="ShowNext(4)">❯</button></div>'; }
    document.getElementById("KatWrapp0").innerHTML= innerhtml0;
    document.getElementById("KatWrapp1").innerHTML= innerhtml1;
    document.getElementById("KatWrapp2").innerHTML= innerhtml2;
    document.getElementById("KatWrapp3").innerHTML= innerhtml3;
    document.getElementById("KatWrapp4").innerHTML= innerhtml4;
    cards_Start();
    ShowRelevantCards();
    FilterAvailables();
}

FillInOwnedCards();

//moves card fron crafting area to side kategory
function RemoveInput(kat,cardnum){
    const removeindex = cardsinfield.indexOf(cardnum);
    if (removeindex > -1) {
        cardsinfield.splice(removeindex, 1); 
    }
    cardsprokat[kat].push(cardnum);
    document.getElementById("C"+cardnum).remove();
    document.getElementById("removeC"+cardnum).remove();
    inputcards--;
    if(inputcards<2){
        document.getElementById("hrganz").style.display="block";
        document.getElementById("GenerateButton").style.display="none"
    }
    id = "C"+cardnum;
    let katwrapper = document.getElementsByClassName("kat"+kat)[0];
    katwrapper.innerHTML+='<div onclick="Add('+kat+','+cardnum+')" class="card ckat'+kat+'" id="'+id+'"></div>';
    cards_Start();  
    ShowRelevantCards(); 
    FilterAvailables();
}

//moves card from Kategory to crafting area
function Add(kat,cardnum){
    if(document.getElementById("C"+cardnum).classList.contains("notavailable"))
    {
        return null;
    }
    cardsinfield.push(cardnum);
    let index = cardsprokat[kat].indexOf(cardnum);
    if (index > -1) { 
        cardsprokat[kat].splice(index, 1); 
    }
    cardkatpointer[kat]=0;
    cardnum =""+cardnum;
    if(inputcards>=5){
        return null;
    }
    id = "C"+cardnum;
    document.getElementById(id).remove();
    let inputremover = document.getElementById("inputremover")
    inputremover.innerHTML+='<div class="removeCard" id="remove'+id+'"><button class="rembutton" onclick="RemoveInput('+kat+','+cardnum+')">🗑</button></div>';
    inputcards++;
    if(inputcards>1){
        document.getElementById("hrganz").style.display="none";
        document.getElementById("GenerateButton").style.display="block"
    }
    let craftinput = document.getElementById("craftinput");
    craftinput.innerHTML+='<div class="card alwaysvisible ckat'+kat+'" id="'+id+'"></div>';    
    cards_Start(); 
    ShowRelevantCards();
    FilterAvailables();
}

//Displaying the calculated Card that uses all given ingredients with animation + making it fullscrean 
function ShowResult(){
    
    let options = null;
    let rezipenum=1;
    let requeststring = "";
    if(!cardsinfield.length==0){
        requeststring ="&using="+cardsinfield;
        requeststring= requeststring.replaceAll(",","_");
    }
    let Recipeoptions_req = new XMLHttpRequest();
    Recipeoptions_req.open("GET","https://ma-tommi.herokuapp.com/getCraftedRecipe?id="+userid+""+requeststring,true);
    Recipeoptions_req.send();
    Recipeoptions_req.onreadystatechange = ()=>{
        if(Recipeoptions_req.responseText && Recipeoptions_req.readyState==4 && Recipeoptions_req.status==200){
            options = Recipeoptions_req.responseText.replace("[","").replace("]","").split(",");
            let randompos = Math.floor(Math.random()*options.length);
            rezipenum = options[randompos];

            if(resultnumber!=null){
                document.getElementById("CR"+resultnumber).remove();        
            }
            document.getElementById("hrganz").style.display="block";
            document.getElementById("GenerateButton").style.display="none"
            resultnumber = rezipenum;
            let resultfield = document.getElementsByClassName("craftresult")[0];
            resultfield.innerHTML += '<div class="card alwaysvisible crezept" onclick="FullScreen(this,3.5)" id="CR'+rezipenum+'"></div>';
            id = "CR"+rezipenum;
            cardnum = rezipenum;
            cards_Start(); 
            document.getElementById("CR"+rezipenum).style.transition="2s ease-out";
            document.getElementById("CR"+rezipenum).style.transform="RotateY(0deg)";
            setTimeout(()=>{  
                document.getElementById("CR"+rezipenum).style.transform="RotateY(720deg)";
                let updateuser_req = new XMLHttpRequest();
                updateuser_req.open("GET","https://ma-tommi.herokuapp.com/updateUser?addR="+rezipenum+"&id="+userid,true);
                updateuser_req.send();
                Recipes.push(rezipenum);
                sessionStorage.setItem("recipes",Recipes);

            },10)
            setTimeout(()=>{
                document.getElementById("CR"+rezipenum).style.transition="0.5s ease";
                document.getElementById("CR"+rezipenum).click();
            },2000)
        }
    }
}

//restarting recipe crafter when result is accepted by user
function CloseFullscreanCrafter(){
    window.location.href="";
}