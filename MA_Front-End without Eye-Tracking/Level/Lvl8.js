
//APFEL
let Regionabfolge = [[14],[16],[1,2,3,4,5,6],[11],[1,2,3,4,5,6],[18],[1,2,3,4,5,6],[16],[18],[1,2,3,4,5,6],[18],[21],[11],[1,2,3,4,5,6],[11],[17]];
//CHANGE
let HelpComments = [["Ich muss die Pflanzen aus der Scheune holen"],["Ich muss erstmal löcher graben"],["Erst die Löcher, dann die Pflanzen"],["Jetzt sind die kleinen Pflanzen dran"],["In jedes Loch eine Pflanze"],["Die Stöcke liegen beim Brunnen"],["Ich sollte die Stecken aufs Feld stellen"],[""],["Die Tomaten brauchen noch Wasser"],["Für jede Pflanze etwas Wasser"],[""],["Ich muss die Tüten von der Fabrik holen"],["Ich sollte die leeren Tüten mitnehmen"],["Jetzt ist es Zeit die Tomaten zu ernten"],["Die vollen Tüten stehen bereit."],["Zum Markt gehts über den Wegweiser"]];
let timesbeforespeaking = 1;
let timesbefore1hint = 2; //including times before speak 
let timesbefore2hint = 3; //including times before speak  & timesbefore 1. hint
let Fortschrittspointer = 0;
let wrongactioncount = 0;
let Stand_CO2 = 0;
let Stand_H2O = 0;
const TankRoot = document.querySelector(':root'); 
let ActionFields = [1,2,3,4,5,6,9,11,12,14,15,17,18,21];
let wrongsentences = ["Das brauche ich vielleicht später einmal.","Hier bin ich falsch.","Das brauche ich gerade nicht.","Probier vielleicht was anderes aus.","Hier gibt's nichts für mich zu tun."]

let TommiWalking = false;
let TommiinAction = false;
let TommiField = 16;
let checkspeed = 200;

let textisdisplayed = true;
let animationinprogress = true;

//CHANGE
function getLevelNumber(){
  return 8;
}
          //                      0         1     2    3    4      5   6        7             8         9     10      11         12      13       14     15         16         17gu        18        19        20     21
let Connectiongraph_adapt = [[1,8,17,19],[0,2],[1,3,5],[2],[5],[2,4,6],[5],[0,5,8,17,19],[0,9,17,19],[8,10],[9,11],[10,12,20],[11,13],[12,14,15],[13],[13,16],[15,17,18],[0,8,16,19],[16,19],[0,8,17,18],[11,21],[20]];
setTimeout(()=>{
   adaptConnectionGraph(Connectiongraph_adapt);
},1000)
//CHANGE
function getpuzzletype(){
  return 1;
}
setTimeout(()=>{
  ShowText("Wie du dir vielleicht denken kannst, finde ich Tomaten super!Daher wollen wir sie heute anbaut.",true);
  setTimeout(()=>{
    ShowText("Tomaten werden als Jungpflanzen gepflanzt. Ich hab doch noch ein paar in der Scheune stehen.",true);
  },7000)
  animationinprogress = false;
  cards_Start();
},5500)


function MoveTo(position){
  if(position==4||position==5||position==6){
    document.getElementById("GM2").style.display="none";
    document.getElementById("MM2").style.display="none";
    document.getElementById("SM2").style.display="none";
  }
  if(position == 17 && Regionabfolge[Fortschrittspointer]!=17){
    position = 16;
  }
  if(position != TommiField && !animationinprogress){
    textisdisplayed = getTextShowing();
    if(!TommiinAction){
      GoTo(position);
    }
    if(!textisdisplayed){
      TommiField = position;
      TommiWalking = true;
      CheckTommiWalking();
    }
  }
}

function CheckEvent(){
  if(Regionabfolge[Fortschrittspointer].includes(TommiField)){
    Fortschrittspointer ++;
    let points = 0; 
    if(wrongactioncount<timesbeforespeaking){
        points = 75 / Regionabfolge.length; 
    }
    else if(wrongactioncount<timesbefore1hint){
        points = 65 / Regionabfolge.length; 
    }
    else if(wrongactioncount<timesbefore2hint){
      points = 53 / Regionabfolge.length; 
    }
    else{
      points = 40 / Regionabfolge.length;
    }
    addpoints(points);
    wrongactioncount =0;
    //Game Logic happening here 
    //CHANGE
    if(Fortschrittspointer == 1){
      setTimeout(()=>{
        document.getElementById("tor").style.display="block";
        document.getElementById("topf").style.display="block";
        Stand_CO2 +=15;
        addanimation("c",35,30);
        UpdateTubes();
      },500);
    }

    if(Fortschrittspointer == 2){
      setTimeout(()=>{
        document.getElementById("schaufel").style.display="none";
      },500);
    }

    if(Fortschrittspointer == 3){
      setTimeout(()=>{
        document.getElementById("löcher").style.display="block";
      },500);
    }
    if(Fortschrittspointer == 4){
      setTimeout(()=>{
        document.getElementById("topf").style.display="none";
      },500);
    }

    if(Fortschrittspointer == 5){
      setTimeout(()=>{
        document.getElementById("saat").style.display="block";
        document.getElementById("löcher").style.display="none";
        ShowText("Lass uns den Pflänzchen eine kleine Wachstumshilfe geben und ihnen ein Gerüst aus Stöcken bauen.",true);
      },500);
    }
    if(Fortschrittspointer == 6){
      setTimeout(()=>{
        document.getElementById("stöcke").style.display="none";
      },500);
    }

    if(Fortschrittspointer == 7){
      setTimeout(()=>{
        document.getElementById("saat").style.display="none";
        document.getElementById("SH").style.display="block";
        document.getElementById("SM1").style.display="block";
        document.getElementById("SM2").style.display="block";
        document.getElementById("SV").style.display="block";
        MoveTo(16);
      },500);
    }

    if(Fortschrittspointer == 8){
      setTimeout(()=>{
        document.getElementById("schaufel").style.display="block";
        NextSeason();
        setTimeout(()=>{
        document.getElementById("SH").style.display="none";
        document.getElementById("SM1").style.display="none";
        document.getElementById("SM2").style.display="none";
        document.getElementById("SV").style.display="none";
        document.getElementById("MH").style.display="block";
        document.getElementById("MM1").style.display="block";
        document.getElementById("MM2").style.display="block";
        document.getElementById("MV").style.display="block";
        ShowText("Damit die Tomaten schön saftig sind brauchen sie natürlich auch viel Wasser. Da reicht der Regen manchmal nicht aus.",true);
        },2200)
      },500);
    }

    if(Fortschrittspointer == 9){
      setTimeout(()=>{
        document.getElementById("kanne").style.display="none";
      },500);
    }

    if(Fortschrittspointer ==10){
      setTimeout(()=>{
        Stand_H2O +=10;
        addanimation("w",25,55);
        UpdateTubes();
        document.getElementById("wasser").style.display="block";
        MoveTo(18);
      },500);
    }

    if(Fortschrittspointer ==11){
      setTimeout(()=>{ 
        document.getElementById("kanne").style.display="block";
        NextSeason();
        setTimeout(()=>{
        document.getElementById("MH").style.display="none";
        document.getElementById("MM1").style.display="none";
        document.getElementById("MM2").style.display="none";
        document.getElementById("MV").style.display="none";
        document.getElementById("GH").style.display="block";
        document.getElementById("GM1").style.display="block";
        document.getElementById("GM2").style.display="block";
        document.getElementById("GV").style.display="block";
        ShowText("Schnell noch Tüten holen und dann kann geerntet werden!",true);
        },2200)
      },500);
    }
    
    if(Fortschrittspointer ==12){
      setTimeout(()=>{
        document.getElementById("tüten_leer").style.display="block";
        Stand_CO2 +=25;
        addanimation("c",15,0);
        UpdateTubes();
      },500);
    }
    
    if(Fortschrittspointer ==13){
      setTimeout(()=>{
        document.getElementById("tüten_leer").style.display="none";
      },500);
    }

    if(Fortschrittspointer ==14){
      setTimeout(()=>{
        document.getElementById("tüten").style.display="block";
        
        document.getElementById("GH").style.display="none";
        document.getElementById("GM1").style.display="none";
        document.getElementById("GM2").style.display="none";
        document.getElementById("GV").style.display="none";

        document.getElementById("MH").style.display="block";
        document.getElementById("MM1").style.display="block";
        document.getElementById("MM2").style.display="block";
        document.getElementById("MV").style.display="block";
        revealpuzzlepiece();
      },500);
    }
    
    if(Fortschrittspointer ==15){
      setTimeout(()=>{
        document.getElementById("tüten").style.display="none";
      },500);
    }
    if(Fortschrittspointer == Regionabfolge.length){
      LevelCompleted(91,8); //Enter Product Number and Lvl number //CHANGE
    }

  }
  else{
    if(ActionFields.includes(TommiField)){
      wrongactioncount ++;
      let sprechblasentext = "";
      if(wrongactioncount>timesbeforespeaking){
        sprechblasentext = wrongsentences[Math.floor(Math.random()*wrongsentences.length)];
      }
      if(wrongactioncount>timesbefore2hint){
        sprechblasentext = HelpComments[Fortschrittspointer][Math.floor(Math.random()*HelpComments[Fortschrittspointer].length)];
      }
      if(wrongactioncount>timesbeforespeaking){
        document.getElementById("Sprechblasentext").innerText = sprechblasentext;
        document.getElementById("Sprechblasencontainer").style.opacity="1";
        setTimeout(()=>{
          document.getElementById("Sprechblasencontainer").style.opacity="0";
        },4000)
      }
    }
  }
}

function CheckTommiWalking(){
  if(getTommiWalking()){
    setTimeout(()=>{
      CheckTommiWalking();
    },checkspeed)
  }
  else{
    TommiWalking = false;
    CheckEvent();
  }
}

function UpdateTubes(){
  TankRoot.style.setProperty('--cylinder-co2', Stand_CO2);
  TankRoot.style.setProperty('--cylinder-water', Stand_H2O);
}
UpdateTubes();


let gifcounter = 0;
function addanimation(type,left,top){
  createdgif = gifcounter;
  if(type=="c"){
    document.getElementById("gifwrapper").innerHTML += '<img src="../img/LVL_General/carbon.gif" class="gameelement gif" style="left: '+left+'%; top:'+top+'%;" id="gif'+gifcounter+'">';
    gifcounter++;
  }
  if(type=="w"){
    document.getElementById("gifwrapper").innerHTML += '<img src="../img/LVL_General/water.gif" class="gameelement gif" style="left: '+left+'%; top:'+top+'%;" id="gif'+gifcounter+'">';
    gifcounter++;
  }
  setTimeout(()=>{
    document.getElementById("gif"+createdgif).remove();
  },2500)
}
