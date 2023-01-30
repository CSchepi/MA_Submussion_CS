
//APFEL
let Regionabfolge = [[11],[2,6],[2,6],[15],[1,2,3,4,5,6],[16],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[1,2,3,4,5,6],[18],[21],[15],[17]];
//CHANGE
let HelpComments = [["Ich brauche eine Baumschere"],["Ich muss alle betroffenen Bäume zurückschneiden"],["Noch mehr Bäume brauchen das."],["Der Dünger steht an der Scheune"],["Der Dünger muss zu den Bäumen"],[""],["Die Apfel kann ich per Hand pflücken"],["Ein Baum nach dem Anderen"],["Ein Baum nach dem Anderen"],["Ein Baum nach dem Anderen"],["Ein Baum nach dem Anderen"],["Ein Baum nach dem Anderen"],["Ich muss die Kisten einsammeln"],["Verpackt wird auf dem Hügel"],["Schnell noch die Kisten einsammeln"],["Zum Markt gehts über den Wegweiser"]];
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
  return 3;
}
function increasewrongactioncount(){
  wrongactioncount++;
}
function givefreehint(){
  let sprechblasentext = HelpComments[Fortschrittspointer][Math.floor(Math.random()*HelpComments[Fortschrittspointer].length)];
  document.getElementById("Sprechblasentext").innerText = sprechblasentext;
  document.getElementById("Sprechblasencontainer").style.opacity="1";
  setTimeout(()=>{
    document.getElementById("Sprechblasencontainer").style.opacity="0";
  },4000)
}
function getpuzzletype(){
  return 2;
}


//CHANGE
setTimeout(()=>{
  ShowText("Es ist Frühling und die Apfelbäume blühen. Und genau darum dreht es sich dieses mal.",true);  
  setTimeout(()=>{
    ShowText("Also auf geht's. Die Bäume sehen nach dem Winter etwas ramponiert aus.",true);
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
        document.getElementById("schere").style.display="none";
      },500);
    }

    if(Fortschrittspointer == 2){
      setTimeout(()=>{
        document.getElementById("s"+TommiField).style.display="none";
        const index = Regionabfolge[2].indexOf(TommiField);
        if (index > -1) { 
          Regionabfolge[2].splice(index, 1); 
        }

      },500);
    }

    if(Fortschrittspointer == 3){
      setTimeout(()=>{
        document.getElementById("s"+TommiField).style.display="none";
        ShowText("Damit die Bäume genug Nährstoffe haben sollten wir sie etwas düngen.",true);
      },500);
    }
    if(Fortschrittspointer == 4){
      setTimeout(()=>{
        document.getElementById("dSack").style.display="none";
      },500);
    }

    if(Fortschrittspointer == 5){
      let animationinprogress =true;
      setTimeout(()=>{
        document.getElementById("dBaum").style.display="block";
        Stand_H2O +=10;
        addanimation("w",5,65);
        UpdateTubes();
        setTimeout(()=>{
          Stand_H2O +=10;
          addanimation("w",35,65);
          UpdateTubes();
          animationinprogress =false;
          MoveTo(16)
        },3000)
      },500);
    }

    if(Fortschrittspointer == 6){
      setTimeout(()=>{
        NextSeason();
        setTimeout(()=>{
          document.getElementById("bhg").style.display="block"
          document.getElementById("bvg").style.display="block"
          document.getElementById("bvb").style.display="none"
          document.getElementById("bhb").style.display="none"
          document.getElementById("a1").style.display="block"
          document.getElementById("a2").style.display="block"
          document.getElementById("a3").style.display="block"
          document.getElementById("a4").style.display="block"
          document.getElementById("a5").style.display="block"
          document.getElementById("a6").style.display="block"
          ShowText("Äpfel sind wirklich pflegeleicht. Schon sind die Früchte reif zum Ernten.",true);
        },2500)
      },500);
    }

    if(Fortschrittspointer == 7){
      setTimeout(()=>{
        document.getElementById("a"+TommiField).style.display="none";
        document.getElementById("k"+TommiField).style.display="block";
        const index = Regionabfolge[11].indexOf(TommiField);
        if (index > -1) { 
          Regionabfolge[7].splice(index, 1);
          Regionabfolge[8].splice(index, 1); 
          Regionabfolge[9].splice(index, 1); 
          Regionabfolge[10].splice(index, 1);
          Regionabfolge[11].splice(index, 1); 
        }
      },500);
    }

    if(Fortschrittspointer == 8){
      setTimeout(()=>{
        document.getElementById("a"+TommiField).style.display="none";
        document.getElementById("k"+TommiField).style.display="block";
        const index = Regionabfolge[11].indexOf(TommiField);
        if (index > -1) { 
          Regionabfolge[8].splice(index, 1); 
          Regionabfolge[9].splice(index, 1); 
          Regionabfolge[10].splice(index, 1);
          Regionabfolge[11].splice(index, 1); 
        }
      },500);
    }

    if(Fortschrittspointer == 9){
      setTimeout(()=>{
        document.getElementById("a"+TommiField).style.display="none";
        document.getElementById("k"+TommiField).style.display="block";
        const index = Regionabfolge[11].indexOf(TommiField);
        if (index > -1) { 
          Regionabfolge[9].splice(index, 1); 
          Regionabfolge[10].splice(index, 1);
          Regionabfolge[11].splice(index, 1); 
        }
      },500);
    }

    if(Fortschrittspointer ==10){
      setTimeout(()=>{
        document.getElementById("a"+TommiField).style.display="none";
        document.getElementById("k"+TommiField).style.display="block";
        const index = Regionabfolge[11].indexOf(TommiField);
        if (index > -1) { 
          Regionabfolge[10].splice(index, 1);
          Regionabfolge[11].splice(index, 1); 
        }
      },500);
    }
    if(Fortschrittspointer ==11){
      setTimeout(()=>{
        document.getElementById("a"+TommiField).style.display="none";
        document.getElementById("k"+TommiField).style.display="block";
        const index = Regionabfolge[11].indexOf(TommiField);
        if (index > -1) { 
          Regionabfolge[11].splice(index, 1); 
        }
      },500);
    }
    if(Fortschrittspointer ==12){
      setTimeout(()=>{
        document.getElementById("a"+TommiField).style.display="none";
        document.getElementById("k"+TommiField).style.display="block";
        ShowText("Noch schnell verpacken und ab damit auf den Markt.",true);
      },500);
    }
    if(Fortschrittspointer ==13){
      setTimeout(()=>{
        document.getElementById("k1").style.display="none";
        document.getElementById("k2").style.display="none";
        document.getElementById("k3").style.display="none";
        document.getElementById("k4").style.display="none";
        document.getElementById("k5").style.display="none";
        document.getElementById("k6").style.display="none";
        revealpuzzlepiece();
      },500);
    }
    if(Fortschrittspointer ==14){
      setTimeout(()=>{
        Stand_CO2 +=20;
        addanimation("c",15,0);
        UpdateTubes();
        setTimeout(()=>{
          Stand_H2O +=20;
          addanimation("w",15,0);
          UpdateTubes();
          document.getElementById("box").style.display="block";
        },3000)
      },500);
    }
    if(Fortschrittspointer ==15){
      setTimeout(()=>{
        document.getElementById("box").style.display="none";
      },500);
    }

    if(Fortschrittspointer == Regionabfolge.length){
      LevelCompleted(39,3); //Enter Product Number and Lvl number //CHANGE
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
