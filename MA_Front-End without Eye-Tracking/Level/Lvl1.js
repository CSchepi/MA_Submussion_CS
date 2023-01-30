//Order of the areas the user has to click (if multiple options: Array in Array)
let Regionabfolge = [[12],[15],[1,3,5],[4],[18],[1,2,3,4,5,6],[18],[11],[1,2,3,4,5,6],[11],[12],[3],[21],[15],[17]];
//Hints that can be given at each step (if multiple texts: Array in Array)
let HelpComments = [["Hierfür brauche ich eine Maschine","Ich sollte den Traktor nehmen"],["Ich muss die Säcke mit den Samen holen"],["Ich muss die Samen auf dem Acker einpflanzen"],[],["Am Brunnen steht eine Gießkanne"],["Ich muss auf das Feld um die Pfanzen zu gießen"],[""],["Hier liegt doch irgendwo das passende Werkzeug rum"],["Ab aufs Feld!"],[""],["Für die Ernte brauche ich den Traktor"],["Ich sollte die Kiste aufsammeln"],["Auf dem Hügel gibt es eine Fabrik."],["Die fertigen Karotten stehen an neben der Scheune"],["Ich sollte zum Schild mit dem Einkaufswagen gehen"]];
let timesbeforespeaking = 1;
let timesbefore1hint = 2; //including times before speak 
let timesbefore2hint = 3; //including times before speak  & timesbefore 1. hint
// shows which step the user is working on
let Fortschrittspointer = 0;
let wrongactioncount = 0;
// values for the cylinder fillings
let Stand_CO2 = 0;
let Stand_H2O = 0;
const TankRoot = document.querySelector(':root'); 
let ActionFields = [1,2,3,4,5,6,9,11,12,14,15,17,18,21];
//none specific help sentences
let wrongsentences = ["Das brauche ich vielleicht später einmal.","Hier bin ich falsch.","Das brauche ich gerade nicht.","Probier vielleicht was anderes aus.","Hier gibt's nichts für mich zu tun."]

let TommiWalking = false;
let TommiinAction = false;
let TommiField = 16;
let checkspeed = 200;

let textisdisplayed = true;
let animationinprogress = true;

//returns level number
function getLevelNumber(){
  return 1;
}
//to be accessed by attentiontracker 
function increasewrongactioncount(){
  wrongactioncount++;
}
//to be accessed by attentiontracker
function givefreehint(){
  let sprechblasentext = HelpComments[Fortschrittspointer][Math.floor(Math.random()*HelpComments[Fortschrittspointer].length)];
  document.getElementById("Sprechblasentext").innerText = sprechblasentext;
  document.getElementById("Sprechblasencontainer").style.opacity="1";
  setTimeout(()=>{
    document.getElementById("Sprechblasencontainer").style.opacity="0";
  },4000)
}
function getpuzzletype(){
  return 0;
}
//start sequence
setTimeout(()=>{
  ShowText("Hi! Heute wollen wir versuchen unsere eigenen Karotten anzubauen. Bist du bereit?",true);
  setTimeout(()=>{
    ShowText("Zuerst müssen wir diese schweren Steine vom Acker bringen! Klicke Gegenstände an, um sie zu benutzen.",true);
  },7000)
  animationinprogress = false;
  cards_Start();
},5500)


//Moves the character to a position on the walking graph
function MoveTo(position){
  //disable position 17 if not correct and redirect to 16
  if(position == 17 && Regionabfolge[Fortschrittspointer]!=17){
    position = 16;
  }
  //condicions to be able to move tommi
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
  //correct field chosen  add points to score depending on previous wrong guess count
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
              Stand_CO2 +=3;
              addanimation("c",20,55);
              UpdateTubes();
              setTimeout(()=>{ 
                document.getElementById("AckerS").style.display ="none";
                setTimeout(()=>{
                  GoTo(12);
                  setTimeout(()=>{
                    animationinprogress = false;
                    TraktorKlein.style.display="block";
                    ShowText("Sehr gut! Jetzt ist alles bereit für unsere ersten Pflanzen.",true);
                  },8500)
                },1000)
              },5200)
            },100)
          },5200)
        },100)
        
      },9000)
    }

    if(Fortschrittspointer == 2){
      let Samen = document.getElementById("Samen");
      let Schilder = document.getElementById("K0");
      setTimeout(()=>{
        Samen.style.display ="none";
        Schilder.style.display="block";
      },500)
    }

    if(Fortschrittspointer == 3){
      setTimeout(()=>{
        
        document.getElementById("K0").style.display="none"
        MoveTo(4);
  
      },1000)
    }
    if(Fortschrittspointer == 4){
      setTimeout(()=>{
          animationinprogress = true;
          GoTo(3);
          document.getElementById("K1_1").style.display="block"
          setTimeout(()=>{
            document.getElementById("K1_2").style.display="block"
          },3500)
          setTimeout(()=>{
            document.getElementById("K1_3").style.display="block"
            animationinprogress =false;
            ShowText("Perfekt. Damit die Karotten schneller wachsen können, sollten wir sie noch ein wenig gießen.",true);
          },7000)
      },500)
    }
    if(Fortschrittspointer == 5){
      setTimeout(()=>{
        document.getElementById("Kanne").style.display = "none";
        ShowText("Gut, ich hab die Gießkanne aufgesammelt, jetzt muss ich nur noch gießen.",true);
      },500)
    }

    if(Fortschrittspointer == 6){
      setTimeout(()=>{
          document.getElementById("Gießen").style.display="block";
          Stand_H2O +=5;
          addanimation("w",20,55);
          UpdateTubes();
          setTimeout(()=>{
              MoveTo(18);
          },500)
      },500)
    }

    if(Fortschrittspointer == 7){
      setTimeout(()=>{
        document.getElementById("Kanne").style.display = "block";
        setTimeout(()=>{
          NextSeason();
          setTimeout(()=>{
            document.getElementById("K1_1").style.display ="none";
            document.getElementById("K1_2").style.display ="none";
            document.getElementById("K1_3").style.display ="none";
            document.getElementById("K2").style.display ="block";
            document.getElementById("Unkraut").style.display ="block";
            ShowText("Ahh, es ist Sommer. Unsere Pflanzen wachsen prächtig. Nur macht sich jetzt Unkraut auf dem Acker breit...",true);
          },2000)
        },500)
      },500)
    }

    if(Fortschrittspointer == 8){
      setTimeout(()=>{
        document.getElementById("Werkzeug").style.display = "none";
      },500)
    }

    if(Fortschrittspointer == 9){
      setTimeout(()=>{
          document.getElementById("Unkraut").style.display="none";
          setTimeout(()=>{
              MoveTo(11);
          },500)
      },500)
    }

    if(Fortschrittspointer ==10){
      setTimeout(()=>{
        document.getElementById("Werkzeug").style.display="block";
        setTimeout(()=>{
          NextSeason();
          setTimeout(()=>{
            document.getElementById("Gießen").style.display="none";
            document.getElementById("K2").style.display ="none";
            document.getElementById("K3").style.display ="block";
            ShowText("Herbst ist Erntezeit! Unsere Karotten sehen genau richtig aus, um geerntet zu werden. ",true);
          },2000)
        },1000)
      },500)
    }

    if(Fortschrittspointer==11){
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
            Stand_CO2 +=3;
            addanimation("c",20,55);
            UpdateTubes();
            setTimeout(()=>{ 
              setTimeout(()=>{
                GoTo(12);
                document.getElementById("K3").style.display="none";
                setTimeout(()=>{
                  document.getElementById("Box").style.display="block";
                  revealpuzzlepiece();
                  ShowText("Gut gemacht! Die Karotten sind aus der Erde. Außerdem hast du ein Puzzelteil gefunden!",true);
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

    if(Fortschrittspointer == 12){
      setTimeout(()=>{
        document.getElementById("Box").style.display="none";
        ShowText("Nur noch ein wenig Putzen und verpacken und schon ist das Gemüse bereit verkauft zu werden! ",true);
      },500)
    }
    if(Fortschrittspointer == 13){
      setTimeout(()=>{        
        Stand_H2O +=5;
        addanimation("w",10,0);
        UpdateTubes();
        setTimeout(()=>{
          Stand_CO2 +=4;
          addanimation("c",20,0);
          UpdateTubes();
          document.getElementById("BoxPacked").style.display="block";
          ShowText("Die fertigen Karotten stehen an der Scheune für uns bereit!",true);
        },2600)
      },500)
    }
    if(Fortschrittspointer == 14){
      setTimeout(()=>{       
        document.getElementById("BoxPacked").style.display="none";
        ShowText("Auf zum Laden!",true);
      },500)
    }
    if(Fortschrittspointer == Regionabfolge.length){
      LevelCompleted(79,1); //Enter Product Number and Lvl number
    }

  }
  //Consequences of a wrong move
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

//adds animation for smoke or water particles on co2 emission / water usage
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
