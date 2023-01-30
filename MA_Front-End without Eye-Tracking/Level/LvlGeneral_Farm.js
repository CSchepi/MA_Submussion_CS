function CheckLogin(){
  let checkloginbyid =sessionStorage.getItem("_id");
  if(checkloginbyid =="null"||checkloginbyid ==null){
      window.location.href="../index.html";
  }
}
CheckLogin();



let bd1 = document.getElementById("bd1");
let bd2 = document.getElementById("bd2");
let bd3 = document.getElementById("bd3");
let bd0 = document.getElementById("bd4");
let blackdrop = document.getElementById("blackdrop");
          //      0         1     2       3       4      5        6     7       8       9       10      11      12      13      14         15       16       17     18      19        20        21
let Waypoints=[[-13,57],[0,57],[24,58],[48,60],[2,75],[20,75],[45,76],[20,97],[-10,38],[6,42],[19,39],[33,34],[47,33],[57,32],[65,31],[62.5,39],[80,40.5],[100,39],[85,66],[70,97],[28,26] ,[20.5,18]];


          //               0         1       2      3    4      5   6        7             8         9     10      11         12      13       14     15         16         17        18        19        20     21
let Connectiongraph = [[1,8,17,19],[0,2],[1,3,5],[2,15],[5],[2,4,6],[5],[0,5,8,17,19],[0,9,17,19],[8,10],[9,11],[10,12,20],[11,13],[12,14,15],[13],[3,13,16],[15,17,18],[0,8,16,19],[16,19],[0,8,17,18],[11,21],[20]];


//Level dependent connectiongraph changes
function adaptConnectionGraph(newgraph){
  Connectiongraph = newgraph; 
}

const root = document.querySelector(':root');

let TommiPosition = 17;
setTimeout(()=>{
  GoTo(16);
},3000)
let currentlymoving = false;

currentScene=1;
bd1.style.opacity = "1";

//Set Background season (1 = spring, 2= summer, 3= fall, 4= winter)
function SetCurrentScene(num){
  currentScene=num;
  bd1.style.opacity = 0;
  bd2.style.opacity = 0;
  bd3.style.opacity = 0;
  bd4.style.opacity = 0;
  if(currentScene==1){ bd1.style.opacity = 1;}
  if(currentScene==2){ bd2.style.opacity = 1;}
  if(currentScene==3){ bd3.style.opacity = 1;}
  if(currentScene==4){ bd4.style.opacity = 1;}
}

// Starting the Level
  blackdrop.style.display="block";
  blackdrop.style.opacity="1"
setTimeout(()=>{
  blackdrop.style.opacity="0"
  setTimeout(()=>{
    blackdrop.style.display="none";
  },3000)
},300)

//Display the golden Puzzlepiece and moving it to the top right corner
function revealpuzzlepiece(){
  let piece = document.getElementsByClassName("puzzlepiecewrapper")[0];
  piece.style.transform ="scale(0.1)";
  piece.style.display = "block";
  setTimeout(()=>{
    piece.style.transform ="scale(1)";
    setTimeout(()=>{
      piece.style.left = "106vh";
      piece.style.top = "-6vh";
    },1000)
  },50)
}

//Switch Background to next season
function NextSeason(){
  currentScene=(currentScene)%4+1;
  blackdrop.style.display="block";
  setTimeout(()=>{
    if(currentScene==2){bd2.style.opacity=1}
    if(currentScene==3){bd3.style.opacity=1}
    if(currentScene==4){bd4.style.opacity=1}
    if(currentScene==1){
      bd2.style.opacity=0;
      bd3.style.opacity=0;
      bd4.style.opacity=0;
    }
    blackdrop.style.opacity="0.9";
    setTimeout(()=>{
      blackdrop.style.opacity="0";
      setTimeout(()=>{
        blackdrop.style.opacity="none";
      },3000)
    },3000)
  },250)
}

//Transforming Tommis position and loading the appropriate walking animation  
function move(val){
  let Tommi = document.getElementById("Tommi");
  // 0 = Stop 1 = front 2 = back 3=left 4=back
 
  if(val==0){
    Tommi.src="../img/LVL_General/Standing.gif"
  }
  if(val==1){
    Tommi.src="../img/LVL_General/Walkcycle_Front.gif"
  }
  if(val==2){
    Tommi.src="../img/LVL_General/Walkcycle_Back.gif"
  }
  if(val==3){
    Tommi.src="../img/LVL_General/Walkcycle_Left.gif"
  }
  if(val==4){
    Tommi.src="../img/LVL_General/Walkcycle_Right.gif"
  }
}

//Initialize the movement of Tommi to a spicific target 
function GoTo(target){
  if(textisshowing && !textiswriting){
    textisshowing=false;
    ShowText("",false);
  }
  //Only apply moving if not already moving or text schowing
  else if(!currentlymoving && !textisshowing){
    currentlymoving = true;
    let targetpath = pathfinding(target,[[TommiPosition]]); //Find path
    if(targetpath==null){
      window.alert("Something went horribly wrong!");
      return null;
    }
    //Move along calculated path.
    for(let i in targetpath){
      setTimeout(()=>{
        //Make tommi visible
        let nextpos = Waypoints[targetpath[i]];
        let px = nextpos[0];
        let py = nextpos[1];
        // calculate which way to face
        let lastpx = getComputedStyle(root).getPropertyValue('--tommi-left');
        let lastpy = getComputedStyle(root).getPropertyValue('--tommi-top');
        let deltax = px-lastpx;
        let deltay = py-lastpy;
        if(deltax>=0&&deltay>=0){ //bottom right
          if(deltax>deltay){move(4);}
          else{move(1);}
        }
        else if(deltax>=0&&deltay<=0){ //top right
          if(deltax>-deltay){move(4);}
          else{move(2);}
        }
        else if(deltax<=0&&deltay>=0){ //bottom left
          if(-deltax>deltay){move(3);}
          else{move(1);}
        }
        else if(deltax<=0&&deltay<=0){ //top left
          if(-deltax>-deltay){move(3);}
          else{move(2);}
        }

        //if walking between points outside the frame, make tommi invisible 
        //points outside of frame: 0, 7, 8, 17, 19
        let outsiders = [0,8,17,19];
        if(i>0){
          if(outsiders.includes(targetpath[i])&&outsiders.includes(targetpath[i-1])){
            document.getElementById("tommiwrapper").style.opacity="0";
          }
          else{
            document.getElementById("tommiwrapper").style.opacity="1";
          }
        }


        root.style.setProperty('--tommi-left', px);
        root.style.setProperty('--tommi-top', py);
      },(i-1)*2000)
    }
    setTimeout(()=>{
      TommiPosition = target;
      currentlymoving = false;
      move(0);
    },(targetpath.length-1)*2000)
  }
}

//recoursive algorithm to find shortest way (based on number of edges, no weighting function) bewtwen last point of patharray and target (Starting with initla patharry: [current_position])
function pathfinding(target, pathsarray){
  if(pathsarray[0].length>20){
    return null;
  }
  for(let i in pathsarray){
    if(pathsarray[i].includes(target)){
      return pathsarray[i];
    }
  }
  let newpaths = [];
  for(let i in pathsarray){
    let curpath = pathsarray[i];
    let lastpoint = curpath[(curpath.length-1)];
    let nextpoints = Connectiongraph[lastpoint];
    let outsiders = [0,8,19]; //waypoints outside the map exept 17 
    for(let j in nextpoints){
      if(nextpoints[j]==17&&target!=17){}
      else if(target==17&&outsiders.includes(nextpoints[j])){}
      else if(curpath[0]>6&&target>8&&target!=19&&(nextpoints[j]==8||nextpoints[j]==19)){}
      else{
        let topush = duplicatearray(curpath);
        topush.push(nextpoints[j]);
        newpaths.push(topush);
      }
    }
  }
  return pathfinding(target,newpaths);
}

function duplicatearray(arraytocopy){
  let result = [];
  for(let i in arraytocopy){
    result.push(arraytocopy[i]);
  }
  return result;
}

//Audio Output 
let mute = false;
function Mute(){
  if(!mute){
    mute=true;
    sessionStorage.setItem("mute",true);
    document.getElementById("voiceimg").src="../img/Icons/voice_0.png";
  }
  else{
    mute=false;
    sessionStorage.setItem("mute",false);
    document.getElementById("voiceimg").src="../img/Icons/voice_1.png";
  }
}
setTimeout(()=>{
  Mute();
},500)

let audioactive = true;
//Mute or resume Music
function Audiocontroll(){
  if(audioactive){
    audioactive =false;
    audio.volume = 0;
    audio.pause();
    document.getElementById("audioimg").src="../img/Icons/music_0.png";
  }
  else{
    audioactive = true;
    StartNextSong();
    document.getElementById("audioimg").src="../img/Icons/music_1.png";
  }
}


let textfieldtext = document.getElementById("textfieldtext");
let textfield = document.getElementsByClassName("textfield")[0];
let textiswriting = false;
let textisshowing = false;
//Content maximum of 115 characters!

var msg = new SpeechSynthesisUtterance();
var voices = window.speechSynthesis.getVoices();
msg.voice = voices[10]; 
msg.volume = 0.7; // From 0 to 1
msg.rate = 1.3; // From 0.1 to 10
msg.pitch = 0.2; // From 0 to 2
msg.lang = 'de';

//Display informational Text in a window at the bottom of the playarea
function ShowText(content,notempty){
  if(notempty){
    textiswriting = true;
    textisshowing = true;
    textfield.style.bottom ="2.2vh"; 
    textfieldtext.innerText = "";
    setTimeout(()=>{
      msg.text = content;
      console.log(mute);
      if(!mute){
        audio.volume = 0.04;
        window.speechSynthesis.speak(msg);
        setTimeout(()=>{
          audio.volume=0.13;
        },5000)
      }
      for(let i = 0; i<=content.length;i++){
        setTimeout(()=>{
          textfieldtext.innerText = content.substring(0,i);
          if(i==content.length){
            textiswriting = false;
          }
        },(i*40))
      }
    },1000)
  }
  else{
    textfield.style.bottom ="-10vh"; 
    textiswriting = false;
    textisshowing = false;
  }
}
function getTextShowing(){
  return textisshowing;
}
function getTommiWalking(){
  return currentlymoving;
}


//Music Controll
let audio = new Audio();
function StartNextSong(){
  let audio1 = new Audio('../Music/1.mp3');
  let audio2 = new Audio('../Music/2.mp3');
  let audio3 = new Audio('../Music/3.mp3');
  let audio4 = new Audio('../Music/4.mp3');
  let audio5 = new Audio('../Music/5.mp3');
  let audio6 = new Audio('../Music/6.mp3');
  let tochoose= [audio1,audio2,audio3,audio4,audio5,audio6];
  let choosing = Math.floor(Math.random()*6);
  audio = tochoose[choosing];
  audio.play();
  audio.volume = 0.0;
  for(let i = 0; i<26;i++){
    setTimeout(()=>{
      if(audioactive){
        audio.volume += 0.005;
      }
    },i*1000)
  }
  audio.onended=() => {
    setTimeout(()=>{
      StartNextSong();
    },10000)
  }
}
setTimeout(()=>{
  StartNextSong();
},10000)

//Changing scene to puzzle scene
function OpenPuzzle(){
  let scriptEle = document.createElement("script");
  if(getpuzzletype() == 0){
    scriptEle.setAttribute("src", "../JS/memory.js");
  }
  if(getpuzzletype() == 2){
    scriptEle.setAttribute("src", "../JS/puzzle.js");
  }
  scriptEle.setAttribute("type", "text/javascript");

  document.body.appendChild(scriptEle);

  document.getElementsByClassName("Puzzlecontainer")[0].style.display = "block";
  document.getElementsByClassName("lvlbar")[0].style.display="none";
  document.getElementsByClassName("homebutton")[0].style.display="none";
  document.getElementById("audio").style.display="none";
  document.getElementById("speach").style.display="none";
}

//Changing scene back to to farming simulation scene
function ClosePuzzle(){
  document.getElementsByClassName("Puzzlecontainer")[0].style.display = "none";
  document.getElementsByClassName("lvlbar")[0].style.display="block";
  document.getElementsByClassName("homebutton")[0].style.display="block";
  document.getElementById("audio").style.display="block";
  document.getElementById("speach").style.display="block";
}

//Called when puzzle was completetd and changing back to farming simulation scene
function CompletePuzzle(){
  document.getElementById("puzzlepiece").style.display="none";
  document.getElementsByClassName("Puzzlecontainer")[0].style.display = "none";
  document.getElementsByClassName("lvlbar")[0].style.display="block";
  document.getElementsByClassName("homebutton")[0].style.display="block";
  document.getElementById("audio").style.display="block";
  document.getElementById("speach").style.display="block";
  setTimeout(()=>{
    addpoints(25);
  },1000)
}
let resultpoints = 0
let updateuser_req = new XMLHttpRequest();
let lvl_progress = sessionStorage.getItem("lvlprogress").split(",");
for(let i in lvl_progress){lvl_progress[i]=Number(lvl_progress[i])}
let prevownedcards = sessionStorage.getItem("ingredients").split(",");
for(let i in prevownedcards){prevownedcards[i]=Number(prevownedcards[i])}
if(prevownedcards[0]==0){prevownedcards=[];}
let lvl_num = 0;
let lvl_product = 0;

//called by each level when last step of levelprogess is reached 
function LevelCompleted(productnumber, lvlnum){
  lvl_num=lvlnum-1;
  lvl_product = productnumber;
  document.getElementById("EndScreen").style.display="block";
  setTimeout(()=>{
    document.getElementById("EndScreen").style.opacity="1";
  },20)
  //Update Ingredient of Level if not already owned
  if(lvl_progress[lvl_num]==0){
    prevownedcards.push(lvl_product)
    updateuser_req.open("GET","https://ma-tommi.herokuapp.com/updateUser?id="+sessionStorage.getItem("_id")+"&addI="+productnumber);
    updateuser_req.send();
  }
  //set lvl bar to 0 to fill it up again and reviel cards for each new star
  document.getElementsByClassName("lvlbar")[0].style.display="none";
  resultpoints = getpoints();
  setpoints(0);
  document.getElementById("lbstar1full").style.display="none";
  document.getElementById("lbstar2full").style.display="none";
  document.getElementById("lbstar3full").style.display="none";
  setTimeout(()=>{
    RevielCard(0);
    setTimeout(()=>{
      document.getElementById("ButtonWeiter1").style.display="block";
    },3000)
  },2000)
}

//Fill up lvlbar and for every new Star: Reviel new Ingredient card
function RevealScore(){
  document.getElementById("ButtonWeiter1").style.display="none";
  document.getElementsByClassName("card0")[0].style.display="none";
  document.getElementById("WinText").style.display="none";
  document.getElementsByClassName("lvlbar")[0].style.display="block"; 
  let cardstoreveal = []
  if(resultpoints>=35&&prevownedcards.length<98){cardstoreveal.push(0);}
  if(resultpoints>=60&&prevownedcards.length<99){cardstoreveal.push(0);}
  if(resultpoints>=79&&prevownedcards.length<100){cardstoreveal.push(0);}
  cardstoreveal = FindNewCards(cardstoreveal);
  let numberrevieled = 0;
  for(let i in cardstoreveal){
    document.getElementsByClassName("revealcardcontainer")[0].innerHTML+='<div class="card card'+(Number(i)+1)+'" id="C'+cardstoreveal[i]+'"></div>';
    setTimeout(()=>{
      if(numberrevieled==2){
        addpoints(resultpoints-60);
        if(resultpoints>=79 ){
          if(lvl_progress[lvl_num]<3){
            lvl_progress[lvl_num]=3;
            RevielCard(Number(i)+1);
            //add Ingredient card to users DB entry
            prevownedcards.push(cardstoreveal[i])
            updateuser_req.open("GET","https://ma-tommi.herokuapp.com/updateUser?id="+sessionStorage.getItem("_id")+"&addI="+cardstoreveal[i]);
            updateuser_req.send();
          }
        }
          
      }
      if(numberrevieled==1){
        if(resultpoints>=60){
          addpoints(25);
          numberrevieled++;
          if(lvl_progress[lvl_num]<2){
            lvl_progress[lvl_num]=2;
            RevielCard(Number(i)+1);
            //add Ingredient card to users DB entry
            prevownedcards.push(cardstoreveal[i])
            updateuser_req.open("GET","https://ma-tommi.herokuapp.com/updateUser?id="+sessionStorage.getItem("_id")+"&addI="+cardstoreveal[i]);
            updateuser_req.send();
          }
        }
        else{
          addpoints(resultpoints-35);
        }
      }
      if(numberrevieled==0){
        cards_Start();
        addpoints(35);
        numberrevieled++;
        if(lvl_progress[lvl_num]<1){
          lvl_progress[lvl_num]=1;
          RevielCard(Number(i)+1);
          //add Ingredient card to users DB entry
          prevownedcards.push(cardstoreveal[i])
          updateuser_req.open("GET","https://ma-tommi.herokuapp.com/updateUser?id="+sessionStorage.getItem("_id")+"&addI="+cardstoreveal[i]);
          updateuser_req.send();
        }
      }
    },(1000+4000*i))
  }
  setTimeout(()=>{
    //Updating Player DB entry on lvl progress and acomplished stars for the level
    let LvlPString = lvl_progress.toString().replaceAll(",","_");
    sessionStorage.setItem("lvlprogress",lvl_progress);
    sessionStorage.setItem("ingredients", prevownedcards);
    document.getElementById("ButtonWeiter2").style.display="block";
    updateuser_req.open("GET","https://ma-tommi.herokuapp.com/updateUser?id="+sessionStorage.getItem("_id")+"&LP="+LvlPString);
    updateuser_req.send();
  },1000+4000*cardstoreveal.length)
}
//Algorithm to find a card which is not owned yet and is not part of the 24 levels
function FindNewCards(cardarray){
  let possibilities = [3,4,5,6,7,8,10,11,13,14,15,16,18,20,21,22,23,24,25,26,27,28,32,35,38,40,41,42,43,44,45,47,48,49,50,51,52,53,54,55,56,57,58,59,60,62,63,64,65,66,67,68,70,71,72,74,75,77,80,81,82,83,84,85,86,87,89,90,92,93,94,95,96,97,99,100]
  let ownedcards = sessionStorage.getItem("ingredients").split(",");
  for(let i in ownedcards){ownedcards[i]=Number(ownedcards[i])}
  let found = 0;
  while(found<cardarray.length){
    let randomnumber = Math.floor(Math.random()*100)+1;
    if(possibilities.includes(randomnumber)&& !ownedcards.includes(randomnumber) && !cardarray.includes(randomnumber)){
      cardarray[found]=randomnumber;
      found++;
    }
  }
  return cardarray;
  
}

//Animation to reviel a new card
function RevielCard(num){
  //Num from 0-3
  let card = document.getElementsByClassName("card"+num)[0];
  card.style.transition = "2s ease";
  card.style.transform="rotateY(0deg) scale(1.2)";
  setTimeout(()=>{
    card.style.transition = "0.5s ease";
  },2000)
}

//Redirect to navigation page
function ExitLevel(){
  window.location.href="../Navigation.html";
}

// Adjust play area size to screen size so that cylinders are visible
function Reframe(){
  let ratio = window.innerHeight /window.innerWidth;
  if(ratio>0.6){
    let factor = (1 - ratio) +0.55;
    root.style.setProperty('--scale', factor);
  }
}

Reframe();