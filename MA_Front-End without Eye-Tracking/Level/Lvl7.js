
//APFEL
let Regionabfolge = [[11],[1,5,6],[1,5,6],[1,5,6],[11],[15],[2,3,4],[2,3,4],[2,3,4],[15],[1,2,3,4,5,6],[1,2,3,4,5,6],[18],[21],[15],[17]];
//CHANGE
let HelpComments = [["Ich brauche eine Schere für die Bäume"],["Manche Bäume haben unschöne Äste"],["Manche Bäume haben unschöne Äste"],["Manche Bäume haben unschöne Äste"],[""],["Das Schutzmittel steht an der Scheune"],["Ich muss die Bäume mit weißen Blättern spritzen"],["Ich muss die Bäume mit weißen Blättern spritzen"],["Ich muss die Bäume mit weißen Blättern spritzen"],[""],["Die Trauben können geerntet werden"],["Die Trauben können geerntet werden"],["Schnell noch die Kisten aufsammeln"],["Auf dem Hügel wird alles verpackt."],["Nur noch die verpackten Trauben mitnehmen."],["Zum Markt gehts über den Wegweiser"]];
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
  return 7;
}
document.getElementById("bd4").style.opacity = "1";

  	      //                      0         1     2    3    4      5   6        7             8         9     10      11         12      13       14     15         16         17        18        19        20     21
let Connectiongraph_adapt = [[1,8,17,19],[0,2],[1,3,5],[2],[5],[2,4,6],[5],[0,5,8,17,19],[0,9,17,19],[8,10],[9,11],[10,12,20],[11,13],[12,14,15],[13],[13,16],[15,17,18],[0,8,16,19],[16,19],[0,8,17,18],[11,21],[20]];
setTimeout(()=>{
   adaptConnectionGraph(Connectiongraph_adapt);
},1000)
function getpuzzletype(){
  return 0;
}
//CHANGE
setTimeout(()=>{
  ShowText("Heute arbeiten wir am Weinberg. Hier gibt es bald leckere Trauben zu ernten.",true);
  revealpuzzlepiece();
    setTimeout(()=>{
      document.getElementById("bd4").style.opacity = "0";
      ShowText("Rebstöcke (so heißen die Bäume), müssen regelmäßig zurückgeschnitten werden, damit die Trauben saftig sind. ",true);
    },7000)
  animationinprogress = false;
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
      setTimeout(()=>{
        document.getElementById("schere").style.display="none";
      },500);
    }

    if(Fortschrittspointer == 2){
      setTimeout(()=>{
        document.getElementById("ast"+TommiField).style.display="none";
        const index = Regionabfolge[3].indexOf(TommiField);
        if (index > -1) { 
          Regionabfolge[2].splice(index, 1); 
          Regionabfolge[3].splice(index, 1); 
        }
      },500);
    }

    if(Fortschrittspointer == 3){
      setTimeout(()=>{
        document.getElementById("ast"+TommiField).style.display="none";
        const index = Regionabfolge[3].indexOf(TommiField);
        if (index > -1) { 
          Regionabfolge[3].splice(index, 1); 
        }
      },500);
    }
    if(Fortschrittspointer == 4){
      setTimeout(()=>{
        document.getElementById("ast"+TommiField).style.display="none";
        MoveTo(11);
      },500);
    }

    if(Fortschrittspointer == 5){
      animationinprogress=true;
      setTimeout(()=>{
        document.getElementById("schere").style.display="block";
        setTimeout(()=>{
          NextSeason();
          setTimeout(()=>{
            document.getElementById("pestizid").style.display="block";
            document.getElementById("w2").style.display="block";
            document.getElementById("w3").style.display="block";
            document.getElementById("w4").style.display="block";
            ShowText("Oh nein - die Reblaus hat sich auf unseren Pflanzen breit gemacht.",true);
            setTimeout(()=>{
              ShowText("Leider führt kein Weg am Spritzen mit Pflanzenschutzmittel vorbei. ",true);
              animationinprogress=false;
            },5500)
          },2000)
        },500)
      },500);
    }
    if(Fortschrittspointer == 6){
      setTimeout(()=>{
        document.getElementById("pestizid").style.display="none";
      },500);
    }

    if(Fortschrittspointer == 7){
      animationinprogress=true;
        setTimeout(()=>{
          Stand_H2O +=7;
          addanimation("w",30,65);
          UpdateTubes();
          document.getElementById("w"+TommiField).style.opacity="1";
          document.getElementById("w"+TommiField).style.transition="1s ease";
          setTimeout(()=>{
          document.getElementById("w"+TommiField).style.opacity="0";
          setTimeout(()=>{
            animationinprogress=false;
          },800)
          },100)
          const index = Regionabfolge[8].indexOf(TommiField);
          if (index > -1) { 
            Regionabfolge[7].splice(index, 1); 
            Regionabfolge[8].splice(index, 1); 
          }
        },500);
    }

    if(Fortschrittspointer == 8){
      animationinprogress=true;
        setTimeout(()=>{
          Stand_H2O +=7;
          addanimation("w",30,65);
          UpdateTubes();
          document.getElementById("w"+TommiField).style.opacity="1";
          document.getElementById("w"+TommiField).style.transition="1s ease";
          setTimeout(()=>{
          document.getElementById("w"+TommiField).style.opacity="0";
          setTimeout(()=>{
            animationinprogress=false;
          },800)
          },100)
          const index = Regionabfolge[8].indexOf(TommiField);
          if (index > -1) { 
            Regionabfolge[8].splice(index, 1); 
          }
        },500);
    }

    if(Fortschrittspointer == 9){
      animationinprogress=true;
        setTimeout(()=>{
          Stand_H2O +=6;
          addanimation("w",30,65);
          UpdateTubes();
          document.getElementById("w"+TommiField).style.opacity="1";
          document.getElementById("w"+TommiField).style.transition="1s ease";
          setTimeout(()=>{
          document.getElementById("w"+TommiField).style.opacity="0";
          setTimeout(()=>{
            animationinprogress=false;
            MoveTo(15);
          },800)
          },100)
        },500);
    }

    if(Fortschrittspointer ==10){
      setTimeout(()=>{
        NextSeason();
        setTimeout(()=>{
          document.getElementById("traubeH").style.display="block";
          document.getElementById("traubeV").style.display="block";
          ShowText("Die ganze Arbeit war es wert! Schau dir die schönen Weintrauben an.",true);
        },2200)
      },500);
    }

    if(Fortschrittspointer ==11){
      setTimeout(()=>{
        if(TommiField<4){
          Regionabfolge[11]=[4,5,6];
          document.getElementById("traubeH").style.display="none";
          document.getElementById("k2").style.display="block";
        }
        else{
          Regionabfolge[11]=[1,2,3];
          document.getElementById("traubeV").style.display="none";
          document.getElementById("k1").style.display="block";
        }
      },500);
    }
    if(Fortschrittspointer ==12){
      setTimeout(()=>{
        if(TommiField<4){
          document.getElementById("traubeH").style.display="none";
          document.getElementById("k2").style.display="block";
        }
        else{
          document.getElementById("traubeV").style.display="none";
          document.getElementById("k1").style.display="block";
        }
        revealpuzzlepiece();
      },500);
    }
    if(Fortschrittspointer ==13){
      setTimeout(()=>{
        document.getElementById("k1").style.display="none";
        document.getElementById("k2").style.display="none";
      },500);
    }

    if(Fortschrittspointer ==14){
      setTimeout(()=>{
        Stand_CO2 +=20;
        addanimation("c",15,0);
        UpdateTubes();
        document.getElementById("box").style.display="block";
      },500);
    }

    if(Fortschrittspointer ==15){
      setTimeout(()=>{
        document.getElementById("box").style.display="none";
      },500);
    }

    if(Fortschrittspointer == Regionabfolge.length){
      LevelCompleted(61,7); //Enter Product Number and Lvl number //CHANGE
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
