
//MILCH
let Regionabfolge = [[14],[1,2,3,4,5,6],[18],[1],[9],[3],[11],[1,2,3,4,5,6],[14],[11],[14],[12],[21],[11],[17]]; //CHANGE
//CHANGE
let HelpComments = [["Die Kühen sind noch im Stall"],["Die Tiere müssen auf die Weide"],["Die Kühe sehen durstig aus"],["Das Wasser muss noch auf die Weide"],["Futter ist in den Silos"],["Das Futter muss auch auf die Weide"],[""],["Ich muss die Kühe wieder in den Stall bringen"],["Ab zum Stall"],["Die leeren Milchkannen stehen bereit"],["In der Scheune wird gemolken."],["Die Milch muss noch verarbeitet werden"],["Die Fabrik auf der Scheune hilft mir weiter"],["Schnell noch die Milchkartons einsammeln."],["Zum Markt gehts über den Wegweiser"]];
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
  return 9;
}
//                      0         1     2    3    4      5   6        7             8         9     10      11         12      13       14     15         16         17        18        19        20     21
let Connectiongraph_adapt = [[1,8,17,19],[0,2],[1,3,5],[2],[5],[2,4,6],[5],[0,5,8,17,19],[0,9,17,19],[8,10],[9,11],[10,12,20],[11,13],[12,14,15],[13],[13,16],[15,17,18],[0,8,16,19],[16,19],[0,8,17,18],[11,21],[20]];
setTimeout(()=>{
   adaptConnectionGraph(Connectiongraph_adapt);
},1000)
          
function getpuzzletype(){
  return 2;
}
//CHANGE
setTimeout(()=>{
  ShowText("Die Kühe scharren schon mit den Hufen und wollen auf die Weide.",true);
  setTimeout(()=>{
    ShowText("Also raus mit ihnen. Wir bekommen dafür im Gegenzug leckere Milch.",true);
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
      setTimeout(()=>{
        document.getElementById("scheune").style.display="block";
        setTimeout(()=>{
          document.getElementById("cow_sign").style.display="block";
        },1000)
      },500)
    }

    if(Fortschrittspointer==2){
      setTimeout(()=>{
        let pig1 =    document.getElementById("Kuh_H");
        let pig2 =    document.getElementById("Kuh_V");
        document.getElementById("cow_sign").style.display="none";
        pig1.style.opacity="0";
        pig2.style.opacity="0";
        pig1.style.display="block";
        pig2.style.display="block";
        pig1.style.transition = "1s ease";
        pig2.style.transition = "1s ease";
        setTimeout(()=>{
          pig1.style.opacity="1";
          pig2.style.opacity="1";
          setTimeout(()=>{
            
            Stand_CO2 +=10;
            addanimation("c",25,55);
            UpdateTubes();
            // addanimation("c",20,55);
            // UpdateTubes();
          },2000)
        },500)
      },500);
    }
    if(Fortschrittspointer==3){
      setTimeout(()=>{
        document.getElementById("Schild_Wasser").style.display="block";
      },500);
    }
    if(Fortschrittspointer==4){
      animationinprogress=true;
      document.getElementById("Schild_Wasser").style.display="none";
      setTimeout(()=>{
        let tank = document.getElementById("tank");
        tank.style.left="-30vh";
        tank.style.display="block";
        tank.style.transition="3s ease";
        setTimeout(()=>{
          tank.style.left="0vh"
          setTimeout(()=>{
            Stand_H2O +=20;
            addanimation("w",5,47);
            UpdateTubes();
            animationinprogress=false;
          },2000)
        },300)
      },500);
    }
    if(Fortschrittspointer==5){
      setTimeout(()=>{
        document.getElementById("Schild_Futter").style.display="block";
    },500);
  }
    if(Fortschrittspointer==6){
      document.getElementById("Schild_Futter").style.display="none";
      setTimeout(()=>{
        document.getElementById("heu").style.display = "block";
        setTimeout(()=>{
          Stand_CO2 +=10;
          addanimation("c",45,50);
          UpdateTubes();
          MoveTo(11)
        },1500)
    },500);
  }
    if(Fortschrittspointer==7){
      animationinprogress=true;
      setTimeout(()=>{
        NextSeason();
        setTimeout(()=>{
          document.getElementById("heu").style.display = "none";
          document.getElementById("heu_klein").style.display = "block";
          document.getElementById("canE").style.display="block";
          setTimeout(()=>{
            Stand_CO2 +=10;
            addanimation("c",45,50);
            UpdateTubes();
            ShowText("Jetzt da die Kühe fleißig gegessen haben, ist es Zeit sie zu melken. Das geht aber nicht hier auf dem Feld.",true);
            animationinprogress=false;
          },2000)
        },2000)
    },500);
  }
    if(Fortschrittspointer==8){
      setTimeout(()=>{
        document.getElementById("Kuh_V").style.opacity="0";
        document.getElementById("Kuh_H").style.opacity="0";
    },500);
  }
    if(Fortschrittspointer==9){
      setTimeout(()=>{
        document.getElementById("scheune").style.display="none";
      },500)
    }
  
    if(Fortschrittspointer==10){
      setTimeout(()=>{
        document.getElementById("canE").style.display="none";
      },500)
    }
  
    if(Fortschrittspointer==11){
      setTimeout(()=>{
        document.getElementById("canF").style.display="block";
        ShowText("Damit die Milch auch ein bisschen länger haltbar wird, muss sie noch aufbereitet werden.",true);
        Stand_CO2 +=10;
        addanimation("c",45,15);
        UpdateTubes();
        revealpuzzlepiece();
      },500)
    }
  
    if(Fortschrittspointer==12){
      setTimeout(()=>{
        document.getElementById("canF").style.display="none";
      },500)
    }
  
    if(Fortschrittspointer==13){
      setTimeout(()=>{
        Stand_CO2 +=10;
        addanimation("c",15,0);
        UpdateTubes();
        setTimeout(()=>{
          Stand_H2O +=10;
          addanimation("w",15,0);
          UpdateTubes();
          document.getElementById("milch").style.display="block";
        },3000)
      },500)
    }
    if(Fortschrittspointer==14){
      setTimeout(()=>{
        document.getElementById("milch").style.display="none";
      },500)
    }

    if(Fortschrittspointer == Regionabfolge.length){
      LevelCompleted(17,9); //Enter Product Number and Lvl number //CHANGE
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
