
//EI
let Regionabfolge = [[6],[9],[1,5],[1,5],[16],[11],[1,2,3,4,5,6],[11],[6],[2],[21],[18],[17]];
//CHANGE
let HelpComments = [["Die Hühner sind im Stall auf dem Acker"],["Futter gibts bei den Silos"],["Das Futter muss ins Gehege"],["Das Futter muss ins Gehege"],[""],["Ich sollte erstmal Schaufel und Eimer holen"],["Der Hühnerkot muss vom Feld"],[""],["Ah - Im Stall liegen Eier"],["Ich sollte den Korb mit den Eiern holen"],["Eierkartongs gibt es auf dem Hügel"],["Die Verpackten Eier stehen bereit, eingesammelt zu werden."],["Zum Markt gehts über den Wegweiser"]];
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
  return 5;
}

let Connectiongraph_adapt = [[1,8,17,19],[0,2],[1,3,5],[2],[5],[2,4,6],[5],[0,5,8,17,19],[0,9,17,19],[8,10],[9,11],[10,12,20],[11,13],[12,14,15],[13],[13,16],[15,17,18],[0,8,16,19],[16,19],[0,8,17,18],[11,21],[20]];
setTimeout(()=>{
   adaptConnectionGraph(Connectiongraph_adapt);
},1000)

function getpuzzletype(){
  return 1;
}
//CHANGE
setTimeout(()=>{
  ShowText("Ein Frühstücksei und der Tag kann beginnen! Heute schauen wir uns an, wo die eigentlich herkommen.",true);
  setTimeout(()=>{
    ShowText("Zuerst müssen die Hühner natürlich aus dem Stall gelassen werden.",true);
    animationinprogress = false;
  },7000)
  cards_Start();
},5500)


function MoveTo(position){
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
      animationinprogress=true
      setTimeout(()=>{
        document.getElementById("rampe").style.display="block";
        document.getElementById("chicken").style.opacity="0";
        document.getElementById("chicken").style.display="block";
        document.getElementById("chicken").style.transition="1s ease";
        setTimeout(()=>{
          document.getElementById("chicken").style.opacity="1";
          ShowText("Auch Hühner brauchen Frühstück, sonst kann das mit dem Eier legen ja garnicht klappen.",true);
          animationinprogress=false;
        },1000)
      },500);
    }

    if(Fortschrittspointer == 2){
      setTimeout(()=>{
        Stand_H2O +=20;
        addanimation("w",5,20);
        UpdateTubes();
        document.getElementById("sf1").style.display="block";
        document.getElementById("sf5").style.display="block";
      },500);
    }

    if(Fortschrittspointer == 3){
      setTimeout(()=>{
        document.getElementById("f"+TommiField).style.display="block";
        document.getElementById("sf"+TommiField).style.display="none";
        const index = Regionabfolge[3].indexOf(TommiField);
        if (index > -1) { 
          Stand_CO2 +=15;
          addanimation("c",25,55);
          UpdateTubes();
          Regionabfolge[3].splice(index, 1); 
        }
      },500);
    }
    if(Fortschrittspointer == 4){
      setTimeout(()=>{
        document.getElementById("f"+TommiField).style.display="block";
        document.getElementById("sf"+TommiField).style.display="none";
        Stand_CO2 +=15;
        addanimation("c",25,55);
        UpdateTubes();
        MoveTo(16);
      },500);
    }

    if(Fortschrittspointer == 5){
      animationinprogress=true;
      setTimeout(()=>{
        NextSeason();
        setTimeout(()=>{
          document.getElementById("kot").style.display="block";
          ShowText("Was rein geht, muss auch wieder raus. Wir sollten das Gehege besser sauber machen.",true);
          animationinprogress=false;
        },2000)
      },500);
    }
    if(Fortschrittspointer == 6){
      setTimeout(()=>{
        document.getElementById("werkzeug").style.display="none";
      },500);
    }

    if(Fortschrittspointer == 7){
      setTimeout(()=>{
        document.getElementById("kot").style.display="none";
        Stand_CO2 +=20;
        addanimation("c",25,55);
        UpdateTubes();
        MoveTo(11);
      },500);
    }

    if(Fortschrittspointer == 8){
      setTimeout(()=>{
        document.getElementById("schild").style.display="block";
        document.getElementById("werkzeug").style.display="block";
      },500);
    }

    if(Fortschrittspointer == 9){
      setTimeout(()=>{
        document.getElementById("schild").style.display="none";
        document.getElementById("korb").style.display="block";
        ShowText("Sehr schön! Damit die Eier den Transport unbeschadet überstehen sollten wir sie noch schnell in Eierkartons packen.",true);
        revealpuzzlepiece();
      },500);
    }

    if(Fortschrittspointer ==10){
      setTimeout(()=>{
        document.getElementById("korb").style.display="none";
      },500);
    }

    if(Fortschrittspointer ==11){
      setTimeout(()=>{
        Stand_CO2 +=20;
        addanimation("c",15,0);
        UpdateTubes();
        setTimeout(()=>{
          Stand_H2O +=20;
          addanimation("w",15,0);
          UpdateTubes();
        },3000)
        document.getElementById("karton").style.display="block";
      },500);
    }
    if(Fortschrittspointer ==12){
      setTimeout(()=>{
        document.getElementById("karton").style.display="none";
      },500);
    }

    if(Fortschrittspointer == Regionabfolge.length){
      LevelCompleted(29,5); //Enter Product Number and Lvl number //CHANGE
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
