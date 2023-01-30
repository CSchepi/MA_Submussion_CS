
//APFEL
let Regionabfolge = [[12],[15],[1,2,3,4,5,6],[18],[1,2,3,4,5,6],[18],[10],[1,2,3,4,5,6],[15],[12],[3],[21],[12],[6],[9],[1,5],[1,5],[16],[6],[2,11],[2,11],[21],[11],[17]];
//CHANGE
let HelpComments = [["Der Traktor hilft mit den Steinen"],["Die Samen stehen an der Scheune"],["Die Samen müssen aufs Feld"],["Ich brauche noch etwas Wasser"],["Ich sollte die Pflanzen gießen"],[""],["Ich brauche noch Dünger"],["Der Dünger muss noch aufs Feld"],[""],["Mit dem Mähdrescher gehts am einfachsten"],["ich muss das Getreide einsammeln"],["Die Mühle hilft mir neim mahlen"],[""],["Die Hühner müssen aus dem Stall"],["Futter gibts im Silo"],["Ich muss das Futter noch austreuen"],["Jedes Huhn soll genug zu essen haben"],[""],["Es wurden Eier im Hühnerstall gelegt"],["Eier und Mehl können jetzt verarbeitet werden"],["Eier und Mehl können jetzt verarbeitet werden"],["Ich muss die Sachen zur Fabrik bringen"],["Die Nudeln stehen bereit zum Verkauf!"],["Zum Markt gehts über den Wegweiser"]];
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
  return 10;
}
function getpuzzletype(){
  return 0;
}
//CHANGE
setTimeout(()=>{
  ShowText("Heute machen wir mein Leibgericht. Nudeln! Alles was wir dafür bauchen haben wir schon einmal gemacht.",true);

  setTimeout(()=>{
    ShowText("Zuerst stellen wir unser eigenes Mehl her und danach sammeln wir noch ein paar Eier. Du weißt ja wie.",true);
    setTimeout(()=>{
      ShowText("Wenn du hilfe brauchst, helfe ich dir natürlich immer weiter.",true);
      animationinprogress = false;
    },7000)
  },6000)
  cards_Start();
},4000)


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
  console.log(Regionabfolge[Fortschrittspointer]);
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
                document.getElementById("stein").style.display ="none";
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
        document.getElementById("samen").style.display="none";
      },500);
    }

    if(Fortschrittspointer == 3){
      setTimeout(()=>{
        document.getElementById("klein").style.display="block";
      },500);
    }
    if(Fortschrittspointer == 4){
      setTimeout(()=>{
        document.getElementById("kanne").style.display="none";
      },500);
    }

    if(Fortschrittspointer == 5){
      setTimeout(()=>{
        document.getElementById("wasser").style.display="block";
        Stand_H2O +=10;
        addanimation("w",25,55);
        UpdateTubes();
        MoveTo(18);
      },500);
    }
    if(Fortschrittspointer == 6){
      animationinprogress=true;
      setTimeout(()=>{
        document.getElementById("kanne").style.display="block";
        NextSeason();
        setTimeout(()=>{
          document.getElementById("mittel").style.display="block";
          document.getElementById("klein").style.display="none";
          document.getElementById("wasser").style.display="none";
          animationinprogress=false;
        },2200)
      },500);
    }

    if(Fortschrittspointer == 7){
      setTimeout(()=>{
        document.getElementById("dünger_sack").style.display="none";
      },500);
    }

    if(Fortschrittspointer == 8){
      setTimeout(()=>{
        document.getElementById("dünger").style.display="block";
        Stand_H2O +=10;
        addanimation("w",25,55);
        UpdateTubes();
        MoveTo(15);
      },500);
    }

    if(Fortschrittspointer == 9){
      animationinprogress=true;
      setTimeout(()=>{
        NextSeason();
        setTimeout(()=>{
          document.getElementById("groß").style.display="block";
          document.getElementById("mittel").style.display="none";
          document.getElementById("dünger").style.display="none";
          document.getElementById("TrK").style.display="none";
          document.getElementById("MäK").style.display="block";
          animationinprogress=false;
        },2200)
      },500);
    }

    if(Fortschrittspointer ==10){
      let TraktorKlein = document.getElementById("MäK");
      let TraktorL = document.getElementById("MäL");
      let TraktorR = document.getElementById("MäR");
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
                  document.getElementById("groß").style.display="none";
                  setTimeout(()=>{
                    document.getElementById("kiste").style.display="block";
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

    if(Fortschrittspointer ==11){
      setTimeout(()=>{
        document.getElementById("kiste").style.display="none";
      },500);
    }

    if(Fortschrittspointer ==12){
      setTimeout(()=>{
        Stand_CO2 +=5;
        addanimation("c",15,0);
        UpdateTubes();
        setTimeout(()=>{
          Stand_H2O +=10;
          addanimation("w",15,0);
          UpdateTubes();
          document.getElementById("mehl").style.display="block";
          MoveTo(12);
        },3000)
      })
    }
    if(Fortschrittspointer == 13){
      setTimeout(()=>{
        blackdrop.style.display="block";
        blackdrop.style.opacity="0";
        let bd2 = document.getElementById("bd2");
        let bd3 = document.getElementById("bd3");
        let bd4 = document.getElementById("bd4");
        bd2.style.opacity=1;
        bd3.style.opacity=0;
        bd4.style.opacity=0;
        setTimeout(()=>{
          blackdrop.style.opacity="0.99";
        },100)
        setTimeout(()=>{
          document.getElementById("acker").style.display="none";
          document.getElementById("mühle").style.display="none";
          document.getElementById("MäK").style.display="none";
          document.getElementById("zv").style.display="block";
          document.getElementById("zh").style.display="block";
          document.getElementById("stall").style.display="block";
          document.getElementById("fabrik").style.display="block";
          let Connectiongraph_adapt = [[1,8,17,19],[0,2],[1,3,5],[2],[5],[2,4,6],[5],[0,5,8,17,19],[0,9,17,19],[8,10],[9,11],[10,12,20],[11,13],[12,14,15],[13],[13,16],[15,17,18],[0,8,16,19],[16,19],[0,8,17,18],[11,21],[20]];
          document.getElementById("graph6old").remove();
          document.getElementById("graph3").remove();
          setTimeout(()=>{
             adaptConnectionGraph(Connectiongraph_adapt);
          },1000)
          blackdrop.style.opacity="0";
          setTimeout(()=>{
            blackdrop.style.opacity="none";
          },3000)
        },3200)
      },500)
    }
    if(Fortschrittspointer == 14){
      animationinprogress=true
      setTimeout(()=>{
        document.getElementById("rampe").style.display="block";
        document.getElementById("chicken").style.opacity="0";
        document.getElementById("chicken").style.display="block";
        document.getElementById("chicken").style.transition="1s ease";
        setTimeout(()=>{
          document.getElementById("chicken").style.opacity="1";
          animationinprogress=false;
        },1000)
      },500);
    }

    if(Fortschrittspointer == 15){
      setTimeout(()=>{
        Stand_H2O +=10;
        addanimation("w",5,20);
        UpdateTubes();
        document.getElementById("sf1").style.display="block";
        document.getElementById("sf5").style.display="block";
      },500);
    }

    if(Fortschrittspointer == 16){
      setTimeout(()=>{
        Stand_CO2 +=5;
        addanimation("c",25,55);
        UpdateTubes();
        document.getElementById("f"+TommiField).style.display="block";
        document.getElementById("sf"+TommiField).style.display="none";
        const index = Regionabfolge[17].indexOf(TommiField);
        if (index > -1) { 
          Regionabfolge[16].splice(index, 1); 
        }
      },500);
    }
    if(Fortschrittspointer == 17){
      setTimeout(()=>{
        Stand_CO2 +=5;
        addanimation("c",25,55);
        UpdateTubes();
        document.getElementById("f"+TommiField).style.display="block";
        document.getElementById("sf"+TommiField).style.display="none";
        MoveTo(16);
      },500);
    }
    if(Fortschrittspointer == 18){
      setTimeout(()=>{
        document.getElementById("schild").style.display="block";
      },500);
    }

    if(Fortschrittspointer == 19){
      setTimeout(()=>{
        document.getElementById("schild").style.display="none";
        document.getElementById("korb").style.display="block";
        revealpuzzlepiece();
        ShowText("Klasse gemacht! Jetzt haben wir eigentlich schon alles für den Nudelteig.",true);
      },500);
    }
    
    if(Fortschrittspointer == 20){
      setTimeout(()=>{
        if(TommiField==2){
          document.getElementById("korb").style.display="none";
        }
        else{
          document.getElementById("mehl").style.display="none";
        }
        const index = Regionabfolge[21].indexOf(TommiField);
        if (index > -1) { 
          Regionabfolge[16].splice(index, 1); 
        }
      },500);
    }
    if(Fortschrittspointer == 21){
      setTimeout(()=>{
        if(TommiField==2){
          document.getElementById("korb").style.display="none";
        }
        else{
          document.getElementById("mehl").style.display="none";
        }
      },500);
    }

    if(Fortschrittspointer == 22){
      setTimeout(()=>{
        
        Stand_CO2 +=5;
        addanimation("c",15,0);
        UpdateTubes();
        setTimeout(()=>{

          Stand_H2O +=10;
          addanimation("w",15,0);
          UpdateTubes();
          
          ShowText("Für den Teig braucht man eigentlich nur Mehl, Eier und etwas Wasser oder Öl. Das ist wirklich einfach!",true);
          document.getElementById("nudeln").style.display="block";
        },3000)
      },500);
    }if(Fortschrittspointer == 23){
      setTimeout(()=>{
        document.getElementById("nudeln").style.display="none";
      },500);
    }
    if(Fortschrittspointer == Regionabfolge.length){
      LevelCompleted(33,10); //Enter Product Number and Lvl number //CHANGE
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
