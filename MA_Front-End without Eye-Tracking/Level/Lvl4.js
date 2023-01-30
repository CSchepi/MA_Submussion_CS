
//Kartoffel
let Regionabfolge = [[12],[9],[1,3,5],[1,3,5],[1,3,5],[15],[1,2,3,4,5,6],[18],[1,2,3,4,5,6],[15],[12],[3],[21],[15],[17]];
//CHANGE
let HelpComments = [["Der Traktor hilft mit den schweren Steinen"],["Die Samen sind am Silo"],["ich muss auf den Acker"],["Da ist noch platz für mehr Kartoffeln"],["Da ist noch platz für mehr Kartoffeln"],[""],["Ich kann auf dem Acker die Käfer absammeln"],["Wasser gibts beim Brunnen"],["Ab mit der Gieskanne aufs Feld"],[""],["Geerntet wird mit dem Traktor"],["Ich muss die Kiste holen"],["Die Kartoffeln müssen zur Fabrik"],["Die verpackten Kartoffeln sind an der Scheune"],["Zum Markt gehts über den Wegweiser"]];
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
  return 4;
}
function getpuzzletype(){
  return 0;
}
//CHANGE
setTimeout(()=>{
  ShowText("Wir sind wieder zurück auf dem Acker. Dieses mal sind aber die Kartoffeln dran.",true);

  setTimeout(()=>{
    ShowText("Kartoffeln pflanzt man fast genau so an wie Karotten.Probier es doch einfach mal aus.",true);
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
      let TraktorKlein = document.getElementById("TrK");
      let TraktorL = document.getElementById("TrL");
      let TraktorR = document.getElementById("TrR");
      TraktorKlein.style.display="none";
      animationinprogress = true;
      setTimeout(()=>{
        GoTo(8);
      },500)
      setTimeout(()=>{
        TraktorR.style.left="-60vh";
        TraktorR.style.transition="5s linear";
        TraktorL.style.left="00vh";
        TraktorL.style.transition="5s linear";
        TraktorR.style.display="block";
        setTimeout(()=>{
          TraktorR.style.left="20vh";
          setTimeout(()=>{
            TraktorR.style.display="none";
            TraktorL.style.display="block";
            setTimeout(()=>{
              TraktorL.style.left="-70vh";
              Stand_CO2 +=5;
              addanimation("c",20,55);
              UpdateTubes();
              setTimeout(()=>{ 
                document.getElementById("Damm").style.display ="block";
                setTimeout(()=>{
                  GoTo(12);
                  setTimeout(()=>{
                    animationinprogress = false;
                    TraktorKlein.style.display="block";
                  },8500)
                },1000)
              },5200)
            },100)
          },5200)
        },100)
      },9000)
    }

    if(Fortschrittspointer == 2){
      setTimeout(()=>{
        document.getElementById("Samen").style.display="none";
        document.getElementById("S1_1").style.display="block";
        document.getElementById("S1_3").style.display="block";
        document.getElementById("S1_5").style.display="block";
      },500);
    }

    if(Fortschrittspointer == 3){
      setTimeout(()=>{
        document.getElementById("K1_"+TommiField).style.display="block";
        document.getElementById("S1_"+TommiField).style.display="none";
        const index = Regionabfolge[4].indexOf(TommiField);
        if (index > -1) { 
          Regionabfolge[3].splice(index, 1); 
          Regionabfolge[4].splice(index, 1); 
        }
      },500);
    }
    if(Fortschrittspointer == 4){
      setTimeout(()=>{
        document.getElementById("K1_"+TommiField).style.display="block";
        document.getElementById("S1_"+TommiField).style.display="none";
        const index = Regionabfolge[4].indexOf(TommiField);
        if (index > -1) { 
          Regionabfolge[4].splice(index, 1); 
        }
      },500);
    }

    if(Fortschrittspointer == 5){
      setTimeout(()=>{
        document.getElementById("K1_"+TommiField).style.display="block";
        document.getElementById("S1_"+TommiField).style.display="none";
        MoveTo(15);
      },500);
    }

    if(Fortschrittspointer == 6){
      animationinprogress=true;
      setTimeout(()=>{
        NextSeason();
        setTimeout(()=>{
          document.getElementById("K1_1").style.display="none";
          document.getElementById("K1_3").style.display="none";
          document.getElementById("K1_5").style.display="none";
          document.getElementById("K2").style.display="block";
          document.getElementById("Unkraut").style.display="block";
          ShowText("Siehst du die kleinen schwarzen Punkte auf den Pflanzen? Das sind Kartoffelkäfer",true);
          setTimeout(()=>{
            ShowText("Das ist aber kein Problem. Wir können sie einfach mit den Händen absammeln.",true);
          },5500)
          animationinprogress=false
        },2000)
      },500);
    }

    if(Fortschrittspointer == 7){
      setTimeout(()=>{
        document.getElementById("Unkraut").style.display="none";
      },500);
    }

    if(Fortschrittspointer == 8){
      setTimeout(()=>{
        document.getElementById("Kanne").style.display="none";
      },500);
    }

    if(Fortschrittspointer ==9){
      setTimeout(()=>{
        Stand_H2O +=5;
        addanimation("w",20,55);
        UpdateTubes();
        document.getElementById("Gießen").style.display="block";
        MoveTo(15);
      },500);
    }

    if(Fortschrittspointer ==10){
      animationinprogress=true;
      setTimeout(()=>{
        NextSeason();
        setTimeout(()=>{
          document.getElementById("K3").style.display="block";
          document.getElementById("K2").style.display="none";
          document.getElementById("Gießen").style.display="none";
          ShowText("Die Pflanzen sehen super aus! Reif für die Ernte, würde ich sagen.",true);
          animationinprogress=false;
        },2500)
      },500);
    }
    if(Fortschrittspointer ==11){
    let TraktorKlein = document.getElementById("TrK");
    let TraktorL = document.getElementById("TrL");
    let TraktorR = document.getElementById("TrR");
    TraktorKlein.style.display="none";
    animationinprogress = true;
    setTimeout(()=>{
      GoTo(8);
    },500)
    setTimeout(()=>{
      TraktorL.style.display="none";
      TraktorR.style.left="-60vh";
      TraktorR.style.transition="5s linear";
      TraktorL.style.left="00vh";
      TraktorL.style.transition="5s linear";
      TraktorR.style.display="block";
      setTimeout(()=>{
        TraktorR.style.left="20vh";
        setTimeout(()=>{
          TraktorR.style.display="none";
          TraktorL.style.display="block";
          setTimeout(()=>{
            TraktorL.style.left="-70vh";
            Stand_CO2 +=5;
            addanimation("c",20,55);
            UpdateTubes();
            setTimeout(()=>{ 
              setTimeout(()=>{
                GoTo(12);
                document.getElementById("K3").style.display="none";
                setTimeout(()=>{
                  document.getElementById("Kiste").style.display="block";
                  revealpuzzlepiece();
                },500)
                setTimeout(()=>{
                  animationinprogress = false;
                  TraktorKlein.style.display="block";
                },8500)
              },1000)
            },5200)
          },100)
        },5200)
      },100)
    },9000)
    }
    if(Fortschrittspointer ==12){
      setTimeout(()=>{
        document.getElementById("Kiste").style.display="none";
      },500);
    }
    if(Fortschrittspointer ==13){
      setTimeout(()=>{
        Stand_CO2 +=5;
        addanimation("c",15,0);
        UpdateTubes();
        document.getElementById("BoxPacked").style.display="block";
      },500);
    }
    if(Fortschrittspointer ==14){
      setTimeout(()=>{
        document.getElementById("BoxPacked").style.display="none";
      },500);
    }
    if(Fortschrittspointer == Regionabfolge.length){
      LevelCompleted(73,4); //Enter Product Number and Lvl number //CHANGE
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
