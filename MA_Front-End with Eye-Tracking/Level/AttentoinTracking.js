let bodyRect = document.body.getBoundingClientRect();
let frame = document.getElementById("bd1").getBoundingClientRect();
let offsettop   = frame.top - bodyRect.top;
let offsetleft   = frame.left - bodyRect.left;
let offsetright   = frame.right
let offsetbottom   = frame.bottom
let smootharray = [[0,0],[0,0]];
let difficulty = 5; //min 0 , max 10

let useraverage = 0;
let playedlevel=0;
let lvlprogress = sessionStorage.getItem("lvlprogress").split(",") 


for (let i in lvlprogress){
  if(lvlprogress[i]>0){
    useraverage+= Number(lvlprogress[i]);
    playedlevel++;
  }
}
if(playedlevel>0){
  useraverage = useraverage/playedlevel;
}
else{
  useraverage = 2;
}
difficulty = 5 + ((useraverage-2)*5);
function getdifficulty(){
  return difficulty;
}


showC= false;
showD= false;
function switchCamera(){
  showC = !showC;
  if(showC){
    root.style.setProperty('--showcamera', "block");
  }
  else{ 
    console.log("None");
    root.style.setProperty('--showcamera', "none");
  }
}
function switchDot(){
  showD = !showD;
  if(showD){
    root.style.setProperty('--showdot', "block");
  }
  else{ 
    console.log("None");
    root.style.setProperty('--showdot', "none");
  }
}

let outcounter = 0;

let timesattentionlost = 1;4


webgazer.setGazeListener(function(data, elapsedTime) {
  
  var xprediction = 0;
  var yprediction = 0;

  if(data!=null){
    xprediction=data.x;//these x coordinates are relative to the viewport
    yprediction=data.y;//these y coordinates are relative to the viewport
  } 
  else{
    console.log("Tracking lost");
  }

  //Smothening the eye tracking data based on the previeous two measurements
  let smoothx = 0;
  let smoothy = 0; 

  smoothx= (2*xprediction + smootharray[0][0] + smootharray[1][0])/4;
  smoothy= (2*yprediction + smootharray[0][1] + smootharray[1][1])/4;
  smootharray[1][0]=smootharray[0][0];
  smootharray[1][1]=smootharray[0][1];
  smootharray[0][0]=xprediction;
  smootharray[0][1]=yprediction;

  xprediction = smoothx;
  yprediction = smoothy;
  //check if users view is withing game area
  if(xprediction<offsetleft || xprediction>offsetright||yprediction<offsettop||yprediction>offsetbottom){
    outcounter++;
    console.log("Out: "+outcounter);
  }
  else{
    
    console.log("In");
    if(outcounter>0){
      outcounter--;
    }
  }
  if(outcounter>(15*timesattentionlost)){
    setTimeout(()=>{
      document.getElementById("redbright").style.opacity="0.5"
      let audiobell = new Audio("../Music/Bell.mp3")
      audiobell.play();
      setTimeout(()=>{
        document.getElementById("redbright").style.opacity="0"
      },500)
    },500)
    if(timesattentionlost>=2){
      setTimeout(()=>{
        if(useraverage>2){
          increasewrongactioncount();
          addpoints(-10);
        }
        if(useraverage<2){
          givefreehint();
        }
      },1500)
    }
    if(timesattentionlost>=3){
      if(useraverage>2 && difficulty <10){
        difficulty++;
      }
      if(useraverage<2 && difficulty>0){
        difficulty--;
      }
    }
    timesattentionlost++;
    outcounter = 0;
    //Monitor aufleuchten Lassen um Aufmerksamkeit zurück zu holen 
    //Schwierigkeit beim 2. Mal anpassen: 
    //Wenn schwer: Tipp anzeigen, wenn leicht: Wrong Action Count ++
    //Schwierigkeit beim 3. Mal anpassen 
    //Bonusgames verleichtern oder erschweren 
    //Wenn schwer: Tipp anzeigen, wenn leicht: Wrong Action Count ++
  }
}).begin(); 

