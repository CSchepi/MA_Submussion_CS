let cards_req = new XMLHttpRequest();
let allcards = "['{}']";
let fullScreen = false;

//get Information about all Ingredients
function cards_Start(){
    cards_req.open("GET","https://ma-tommi.herokuapp.com/getIngredients",true);
    cards_req.send();
    cards_req.onreadystatechange = ()=>{
        if(cards_req.status==200&&cards_req.readyState==4&&cards_req.responseText){
            allcards = JSON.parse(cards_req.responseText);
            // Start Card generation 
            InitiateCards();    
            // Start Barcode geneartion on Cards (3 times due to different client-processing-speeds) //can only be created when card is initialised
            setTimeout(()=>{
                JsBarcode(".barcode").init();   
            },500)
            setTimeout(()=>{
                JsBarcode(".barcode").init();   
            },5000)
            setTimeout(()=>{
                JsBarcode(".barcode").init();   
            },15000)
        }
    }
}

// Create Cards based on html divs with card class in document
function InitiateCards(){
    //find all places for cards to be inserted
    let cards = document.getElementsByClassName("card");
    for(var c = 0; c<cards.length; c++){
        let card = cards[c];
        let id = card.id;
        let cardnum = id.replace('C','');
        //Create Recipe Card
        if(cardnum.charAt(0)=="R"){
            cardnum = cardnum.replace('R','');
            let recipedata = null;
            let recipe_req = new XMLHttpRequest();
            //get relevant recipe
            recipe_req.open("GET","https://ma-tommi.herokuapp.com/getRecipes?filternum="+cardnum,true);
            recipe_req.send();
            recipe_req.onreadystatechange = ()=>{
                if(recipe_req.status==200&&recipe_req.readyState==4&&recipe_req.responseText){
                    recipedata = JSON.parse(recipe_req.responseText)[0];   
                    let fillzeros = ""
                    //stylizing information to be displayed
                    if(cardnum<100){fillzeros = "0"}
                    if(cardnum<10){fillzeros = "00"}
                    let zutaten = recipedata["ingredientlist"].replaceAll("//","<br>");
                    let cname = recipedata["name"];
                    if(cname.length >18){
                        cname = cname.slice(0,16)+"…";
                    }
                    //Creating HTML Element with all recipe information (1. div: Front, 2. div: Back)
                    document.getElementById(id).innerHTML=
                    '<div id="CR'+cardnum+'Front" style="display: block;">'+
                        '<img src="./img/Cards/Flip.png" alt="" class="cflip"  onclick="TurnCard(\'R'+cardnum+'\',1)"> '+
                        '<h3 class="cname">'+cname+'</h3>'+
                        '<img src="'+recipedata["imgurl"]+'" alt="" class="cimg">'+
                        '<div class="ccategory">Nr.'+fillzeros+cardnum+': '+recipedata["cardidentifier"]+'   </div>'+
                        '<p class="crsubtitle">Zutaten:</p>'+
                        '<p class="cringredients">'+zutaten+'</p>'+
                        '<hr class="crseperator">'+
                        '<div class="cpoints cpointumwelt crpoints1" value="'+recipedata["carbonmedal"]+'" style="width: calc('+(recipedata["carbonmedal"]*20)+'%/2);">'+
                        '    <img class="cpointimg" src="./img/Cards/CO2Points.png" alt="">'+
                        '</div>'+
                        '<div class="cpoints cpointwater crpoints2" value="'+recipedata["watermedal"]+'" style="width: calc('+(recipedata["watermedal"]*20)+'%/2);">'+
                        '    <img class="cpointimg cpointimgwater" src="./img/Cards/H2OPoints.png" alt="">'+
                        '</div>'+
                        '<div class="cshine" id="CshineR'+cardnum+'-1"></div>'+
                        '<div class="cshine cshine2" id="CshineR'+cardnum+'-2"></div>'+
                    '</div>'+
                    '<div id="CR'+cardnum+'Back" style="display: none;">'+
                        '<div class="cbackimg"></div>'+
                        '<img src="./img/Cards/Flip.png" alt="" class="cflip"  onclick="TurnCard(\'R'+cardnum+'\',0)">'+
                        '<h3 class="cname cbacktext">'+cname+'</h3>'+
                        '<div class="ctextfield">'+recipedata["backtext"]+'</div>'+
                        '<a href="./RecipeSingleView.html?r='+cardnum+'">Jetzt Kochen! ➜</a>'+
                        '<svg class="barcode"'+
                        'jsbarcode-format="CODE128"'+
                        'jsbarcode-value="R'+fillzeros+cardnum+'"'+
                        'jsbarcode-width="5" '+
                        'jsbarcode-displayValue=false '+
                        '</svg>'+  
                    '</div>';
                }
            }
        }
        //create  Ingredient Card
        else{
            let cardinfos = allcards[(cardnum-1)];
            let numbersting = cardnum;
            //stylizing information to be displayed
            if(cardnum<100){numbersting="0"+cardnum}
            if(cardnum<10){numbersting="00"+cardnum}
            let kategorystring = "Nüsse"
            let seasonverb = "haben"
            let dativ_n=""
            // Define card kategory and transform language endings to match product name (e.g. singular vs pluarl endings)
            if(cardnum<95){kategorystring="Gemüse"}
            if(cardnum<62){kategorystring="Obst"}
            if(cardnum<38){kategorystring="Verarbeitet"; seasonverb ="hat"}
            if(cardnum<31){kategorystring="Tierprodukt"; seasonverb ="hat"}
            if(cardnum<17){kategorystring="Fisch"; seasonverb ="hat"}
            if(cardnum<11){kategorystring="Fleisch"; seasonverb ="hat"}
            if([57, 58, 38, 65, 66, 69, 70, 71, 75, 76, 78, 80, 81, 82, 83, 84, 85, 86, 88, 89, 92].includes(Number(cardnum))){seasonverb="hat";}
            if([39,55,67,95,97,98,99,100].includes(Number(cardnum))){dativ_n="n";}
            document.getElementById(id).classList.add("ckat"+cardinfos["type"]);
            document.getElementById(id).classList.add("cmed"+cardinfos["region"]); 
            let optionalstyle1 = "";
            let optionalstyle2 = "";
            //Creating Season span(s)
            let seasonstart = ((Number(cardinfos["seasonstart"])-1)/11)*100;
            let seasonend = ((Number(cardinfos["seasonend"])-1)/11)*100;
            let seasondifference = seasonend-seasonstart;
            let optionalseasonspan ="";
            if(seasondifference<0){
                seasondifference = 100-seasonstart
                optionalseasonspan='    <div class="cseasonspan" style="width: '+seasonend+'%;left:0%;"></div>';
            }
            else{
                seasondifference -=1;
            }
            if(cardinfos["infobar"].length+kategorystring.length>=19){
                optionalstyle1=" ccategorylong";
                optionalstyle2=" csubtitleshort";
            }
            //Creating HTML Element with all ingredient information (1. div: Front, 2. div: Back)
            document.getElementById(id).innerHTML=
            '<div id="C'+cardnum+'Front" style="display: block;">'+
                '<img src="./img/Cards/Flip.png" alt="" class="cflip"  onclick="TurnCard('+cardnum+',1)"> '+
                '<h3 class="cname">'+cardinfos["name"]+'</h3>'+
                '<img src="./img/Cards/Zutaten/'+cardnum+'.jpg"" alt="" class="cimg">'+
                '<img src="./img/Cards/Medallien/M-'+cardinfos["region"]+'-'+cardinfos["type"]+'.png" alt="" class="cstamp">'+
                '<div class="ccategory'+optionalstyle1+'">Nr.'+numbersting+': '+cardinfos["infobar"]+' / '+kategorystring+'  </div>'+
                '<p class="csubtitle'+optionalstyle2+'">Saison:</p>'+
                '<div class="cseasontext">❄️ &emsp;&ensp; 🌱 &emsp;&ensp; ☀️ &emsp;&ensp; 🍂 &emsp;&ensp; ❄️</div>'+
                '<div class="cseasonbar  cpointseason">'+
                '    <div class="cseasonspan" style="width: '+seasondifference+'%;left:'+seasonstart+'%;"></div>'+
                optionalseasonspan+
                '    <div class="cseasonstart" style="left: '+seasonstart+'%;"></div>'+
                '    <div class="cseasonend" style="left: '+seasonend+'%;"></div>'+
                '    <div class="cinfo cseasoninfo">'+cardinfos["name"]+' '+seasonverb+' von '+MonthNumberToString(cardinfos["seasonstart"])+' bis '+MonthNumberToString(cardinfos["seasonend"])+' Saison.</div>'+
                '</div>'+
                '<p class="csubtitle">Umwelt:</p>'+
                '<div class="cpoints cpointumwelt" style="width: calc('+(cardinfos["carbonmedal"]*20)+'%/2);">'+
                '    <img class="cpointimg" src="./img/Cards/CO2Points.png" alt="">'+
                '    <div class="cinfo cumweltinfo">Die Produktion von 100g '+cardinfos["name"]+dativ_n+' erzeugt '+cardinfos["carbonpoints"]+'g CO2.</div>'+
                '</div>'+
                '<p class="csubtitle cwatertitle">Wasser:</p>'+
                '<div class="cpoints cpointwater" style="width: calc('+(cardinfos["watermedal"]*20)+'%/2);">'+
                '    <img class="cpointimg cpointimgwater" src="./img/Cards/H2OPoints.png" alt="">'+
                '    <div class="cinfo cwaterinfo">Die Produktion von 100g '+cardinfos["name"]+dativ_n+' benötigt '+cardinfos["waterpoints"]+' Lieter Wasser.</div>'+
                '</div>'+
                '<div class="cshine" id="Cshine'+cardnum+'-1"></div>'+
                '<div class="cshine cshine2" id="Cshine'+cardnum+'-2"></div>'+
            '</div>'+
            '<div id="C'+cardnum+'Back" style="display: none;">'+
                '<div class="cbackimg"></div>'+
                '<img src="./img/Cards/Flip.png" alt="" class="cflip"  onclick="TurnCard('+cardnum+',0)">'+
                '<h3 class="cname cbacktext">'+cardinfos["name"]+'</h3>'+
                '<div class="ctextfield">'+cardinfos["backtext"]+'</div>'+
                '<svg class="barcode"'+
                    'jsbarcode-format="CODE128"'+
                    'jsbarcode-value="I'+numbersting+'"'+
                    'jsbarcode-width="5" '+
                    'jsbarcode-displayValue=false '+
                '</svg>'+   
            '</div>';
        }
    }
}

// Manual shine function adding shine stripes moving over card
function shine(cardnumber){
    let shineelement = document.getElementById("Cshine"+cardnumber+"-1");
    let shineelement2 = document.getElementById("Cshine"+cardnumber+"-2");
    shineelement.style.left="160%";
    shineelement2.style.left="150%";
    setTimeout(()=>{
        shineelement.style.display="none";
        shineelement2.style.display="none";
        shineelement.style.left="-50%";
        shineelement2.style.left="-60%";
        setTimeout(()=>{
            shineelement.style.display="block";
            shineelement2.style.display="block";
        },1000)
    },1000)
}

//map number of month to string
function MonthNumberToString(number){
    number = Number(number);
    switch(number){
        case 1: return("Januar");
        case 2: return("Februar");
        case 3: return("März");
        case 4: return("April");
        case 5: return("Mai");
        case 6: return("Juni");
        case 7: return("Juli");
        case 8: return("August");
        case 9: return("September");
        case 10: return("Oktober");
        case 11: return("November");
        case 12: return("Dezember");
        default: return("?");
    }
}

let turning = false;
//function to turn card to front or Back and showing according div (including animation)
function TurnCard(cardnumber, side){
    turning= true;
    let card = document.getElementById("C"+cardnumber);
    setTimeout(()=>{
        card.style.transform="rotateY(90deg)";
        setTimeout(()=>{
            if(side==0){
                document.getElementById("C"+cardnumber+"Front").style.display="block";
                document.getElementById("C"+cardnumber+"Back").style.display="none";
            }
            if(side==1){
                document.getElementById("C"+cardnumber+"Front").style.display="none";
                document.getElementById("C"+cardnumber+"Back").style.display="block";
            }
            card.style.transform="rotateY(0deg)";
            card.style.transform="";
            turning = false;
        },500)
    },500)
}
document.getElementById("singlecardwrapper").style.display = "none";

//Enlargen card and moving to center of screen
function FullScreen(element,skalingfactor){
    setTimeout(()=>{
        if(!turning && !fullScreen){
            fullScreen=true;
            document.getElementById("singlecardwrapper").innerHTML += element.outerHTML;
            document.getElementById("singlecardwrapper").style.display = "block";
            document.getElementById("singlecardwrapper").lastChild.style.transform = "scale("+skalingfactor+") rotateY(-90deg)";
            setTimeout(()=>{
                document.getElementById("singlecardwrapper").style.opacity = 1;
                setTimeout(()=>{
                    document.getElementById("singlecardwrapper").lastChild.style.transform = "scale("+skalingfactor+") rotateY(0deg)";
                },1000)
            },100)
        }
    },50)
}
//Close Fullscreen of card 
function CloseFullscrean(){
    document.getElementById("singlecardwrapper").style.opacity = 0;
    setTimeout(()=>{
        document.getElementById("singlecardwrapper").style.display = "none";
        document.getElementById("singlecardwrapper").innerHTML = '<div class="closefull" onclick="CloseFullscrean()"><p>×</p></div>';
        fullScreen = false;
    },900)
}
