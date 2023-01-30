//All points to change are marked with "CHANGE"
let Regionabfolge = [[14],[1,2,3,4,5,6],[18],[1],[9],[3],[11],[6],[21],[12],[21],[15],[17]]; //CHANGE
let HelpComments = [["Die Schweine sind im Stall"],["Ich muss die Schweine auf die Weide bringen"],["Ich sollte Wasser vom Brunnen holen"],["Der Wassertank muss auf die weide"],["Futter gibt's bei den Silos"],["Ab auf die Weider mit dem Futter"],[],["Ich muss ein Schwein zum Schlachtem holen"],["Der Sdchlachthof ist auf dem Hügel"],["Jetzt noch dier Kartons holen!"],["Das Fleisch steht neben der Scheune bereit"],["Auf zum Supermarkt"]]; //CHANGE
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
  return 2;
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
  return 1;
}


  	      //                      0         1     2    3    4      5   6        7             8         9     10      11         12      13       14     15         16         17        18        19        20     21
let Connectiongraph_adapt = [[1,8,17,19],[0,2],[1,3,5],[2],[5],[2,4,6],[5],[0,5,8,17,19],[0,9,17,19],[8,10],[9,11],[10,12,20],[11,13],[12,14,15],[13],[13,16],[15,17,18],[0,8,16,19],[16,19],[0,8,17,18],[11,21],[20]];
setTimeout(()=>{
   adaptConnectionGraph(Connectiongraph_adapt);
},7000)

//CHANGEE
setTimeout(()=>{
  ShowText("Dieses mal stellen wir Schweinefleisch her. Dafür müssen die Tiere erstmal aus dem Stall.",true);
  setTimeout(()=>{
    // ShowText("Zuerst müssen wir diese schweren Steine vom Acker bringen!",true);
  },6000)
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
    //CHANGE
    if(Fortschrittspointer == 1){
      setTimeout(()=>{
        document.getElementById("scheune").style.display="block";
        setTimeout(()=>{
          document.getElementById("pig_sign").style.display="block";
        },1000)
      },500)
    }

    if(Fortschrittspointer==2){
      setTimeout(()=>{
        let pig1 =    document.getElementById("pig1");
        let pig2 =    document.getElementById("pig2");
        document.getElementById("pig_sign").style.display="none";
        pig1.style.opacity="0";
        pig2.style.opacity="0";
        pig1.style.display="block";
        pig2.style.display="block";
        pig1.style.transition = "1s ease";
        pig2.style.transition = "1s ease";
        setTimeout(()=>{
          pig1.style.opacity="1";
          pig2.style.opacity="1";
          ShowText("Gut gemacht. Die Schwein sehen durstig aus...",true);
          setTimeout(()=>{
            Stand_CO2 +=20;
            addanimation("c",20,55);
            UpdateTubes();
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
            Stand_H2O +=30;
            addanimation("w",5,47);
            UpdateTubes();
            ShowText("Noch eine Kleinigkeit zu essen und die Tiere sind rundum glücklich.",true);
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
          Stand_CO2 +=20;
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
          setTimeout(()=>{
            ShowText("Und schon ist es Zeit für's Schlachten. Das gehört nunmal auch dazu.",true);
            document.getElementById("Schild_Schlachten").style.display = "block";
            animationinprogress=false;
          },2000)
        },2000)
    },500);
  }
    if(Fortschrittspointer==8){
      setTimeout(()=>{
        let pig2 =    document.getElementById("pig2");
        pig2.style.opacity ="0";
        pig2.style.display ="none";
        document.getElementById("Schild_Schlachten").style.display = "none";
        setTimeout(()=>{
          revealpuzzlepiece();
        },1000);
    },500);
  }
    if(Fortschrittspointer==9){
      Stand_H2O +=50;
      addanimation("w",15,0);
      ShowText("Nur noch die Kartons holen.",true);
      UpdateTubes();
  }
    if(Fortschrittspointer==10){
      setTimeout(()=>{
        document.getElementById("karton").style.display="none";
    },500);
  }
    if(Fortschrittspointer==11){
      setTimeout(()=>{
        Stand_CO2 +=20;
        addanimation("c",15,0);
        UpdateTubes();
        setTimeout(()=>{
          Stand_CO2 +=20;
          addanimation("c",15,0);
          UpdateTubes();
          	document.getElementById("karton_voll").style.display="block";
        },3000)
    },500);
  }
    if(Fortschrittspointer==12){
      setTimeout(()=>{
        document.getElementById("karton_voll").style.display="none";
        ShowText("Eingepackt und ab zum Laden!",true);
    },500);
  }
    if(Fortschrittspointer == Regionabfolge.length){
      LevelCompleted(2,2); //Enter Product Number and Lvl number //CHANGE
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
