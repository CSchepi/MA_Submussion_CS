var path = window.location.pathname;
var page = path.split("/").pop();
let tutorialprogress =null;
let tut_Progress = new XMLHttpRequest();
//get information which tutorials were already shown 
tut_Progress.open("GET","https://ma-tommi.herokuapp.com/getTutprogress?id="+sessionStorage.getItem("_id"),true);
tut_Progress.send();
tut_Progress.onreadystatechange = ()=>{
    if(tut_Progress.status==200&&tut_Progress.readyState==4&&tut_Progress.responseText){
        tutorialprogress = JSON.parse(tut_Progress.responseText);
        //Fill in according tutorial text and opening tutorial overlay
        if(page=="Navigation.html"){
          if(tutorialprogress[0]=="0"){
            StartTutorial(0);
          }
          document.getElementById("tutorialtext").innerText="Wilkommen bei Tommi. Das ist die Übersichtseite. Von hier aus kannst du alle Bereiche erkunden. Klick doch mal auf -Spielen-."
        }

        if(page=="level_overview.html"){
          if(tutorialprogress[1]=="0"){
            StartTutorial(1);
          }
          document.getElementById("tutorialtext").innerText="Hier siehst du die Übersicht über deine Spielwelt. Klicke auf ein Level um es auszuwählen und zu spielen."
        }

        if(page=="Lvl1.html"){
          if(tutorialprogress[2]=="0"){
            StartTutorialLevel(2);
          }
          document.getElementById("tutorialtext").innerText="Jetzt ist es an der Zeit Lebensmittel herzustellen. Ich begleite dich durch das Spiel. An den Seiten des Spielfelds siehst du den Wasserverbrauch und den CO2 ausstoß. Viel Spaß und bis gleich!"
        }

        if(page=="CardOverview.html"){
          if(tutorialprogress[3]=="0"){
            StartTutorial(3);
          }
          document.getElementById("tutorialtext").innerText="Hier siehst du alle deine gesammelten Karten. Du kannst sie über die Knöpfe in der Leiste filtern und auch ausdrucken."
        }

        if(page=="ScannCode.html"){
          if(tutorialprogress[4]=="0"){
            StartTutorial(4);
          }
          document.getElementById("tutorialtext").innerText="Scanne den Barcode auf der Rückseite von neuen Karten, die du mit deinen Freunden getauscht hast."
        }
        if(page=="ScannCodeCrafting.html"){
          if(tutorialprogress[5]=="1"){
            StartTutorial(7);
          }
          document.getElementById("tutorialtext").innerText="Hier kannst du den Barcode von Lebensmitteln, die du Zuhause hast Einscannen, um so passende Rezepte zu erhalten, selbst wenn du noch keine passende Karte freigeschaltet hast."
        }

        if(page=="Recipe_Crafter.html"){
          if(tutorialprogress[5]=="0"){
            StartTutorial(5);
          }
          //show product scanner guiding image if feater wasn't used yet
          if(tutorialprogress[5]=="2"){
            document.getElementById("tryit").remove();
          }
          document.getElementById("tutorialtext").innerText="Hier kannst du an neuen Rezepten basteln. Klicke einfach auf bis zu 5 Zutatenkarten oder scanne den Barcode von Lebensmitteln die du Zuhause hast."
        }

        if(page=="Week_Planer.html"){
          if(tutorialprogress[6]=="0"){
            StartTutorial(6);
          }
          document.getElementById("tutorialtext").innerText="Plane deine Woche mit verschiedenen Rezepten und achte darauf, dass du nicht zu viel Wasser verbrauchst und die Umwelt verschmutzt!"
        }
    }
}

//Add Overlay HTML
function StartTutorial(pos){
  document.body.innerHTML+='<div id="TutorialWrapper" style="z-index:10">'+
  '<div id="tutorialdarken" style="position: fixed; width:100%; height:100%; background:rgba(0,0,0,0.8);top:0;left: 0;"></div>'+
  '<img src="./img/Standing.gif" alt="" width="15%" style="position:fixed; bottom: -10vh; right: -3vw;">'+
  '<div id="sprechblase">'+
  '  <img src="./img/LVL_General/Sprechblase.png" alt=""width="30%" style="z-index:4;position:fixed; top: 60vh; right: 10vw;">'+
  '  <p id="tutorialtext" style="z-index:5; position:fixed; width:25%; display: inline-block; top: 61vh; right: 12.5vw; font-size: 1.5vw;">Hier steht ein Text der dem SPieler weiterhelfen soll und ihm sachen erklärt!</p>'+
  '  <p onclick="CloseTutorial('+pos+')" style="position:fixed; display: inline-block; width:18vh;color:white;top: calc(61vh + 12vw);right: 25vh; font-size: 3vh; cursor: pointer;">Weiter ➜</p>'+
  '</div>'+
  '</div>'
}
//Add Overlay HTML (for Level screen)
function StartTutorialLevel(pos){
  document.body.innerHTML+='<div id="TutorialWrapper">'+
  '<div id="tutorialdarken" style="position: fixed; width:100%; height:100%; background:rgba(0,0,0,0.8);top:0;left: 0;"></div>'+
  '<img src="../img/Standing.gif" alt="" width="15%" style="position:fixed; bottom: -10vh; right: -3vw;">'+
  '<div id="sprechblase">'+
  '  <img src="../img/LVL_General/Sprechblase.png" alt=""width="30%" style="position:fixed; top: 60vh; right: 10vw;">'+
  '  <p id="tutorialtext" style="position:fixed; width:25%; display: inline-block; top: 61vh; right: 12.5vw; font-size: 1.5vw;">Hier steht ein Text der dem SPieler weiterhelfen soll und ihm sachen erklärt!</p>'+
  '  <p onclick="CloseTutorial('+pos+')" style="position:fixed; display: inline-block; width:18vh;color:white;top: calc(61vh + 12vw);right: 25vh; font-size: 3vh; cursor: pointer;">Weiter ➜</p>'+
  '</div>'+
  '</div>'
}

//close HTML Overlay and update progress to DB
function CloseTutorial(pos){
 
  document.getElementById("TutorialWrapper").style.display="none";
  
  if(pos=="7"){
    //Writing tutorial progress of Product scanner on same entry as crafting
    tutorialprogress[5]=2;
  }
  else{
    tutorialprogress[pos]=1;
  }
  let progressstring = "";
  for(let i in tutorialprogress){
    progressstring+="&new_tutprogress="+tutorialprogress[i];
  }
  let tut_ProgressC = new XMLHttpRequest();
  tut_ProgressC.open("GET","https://ma-tommi.herokuapp.com/updateTutprogress?id="+sessionStorage.getItem("_id")+""+progressstring,true);
  tut_ProgressC.send();
  tut_ProgressC.onreadystatechange = ()=>{
    if(tut_ProgressC.status==200&&tut_ProgressC.readyState==4&&tut_ProgressC.responseText){
      if(pos==2 || pos==6){
        setTimeout(()=>{
          window.location.reload();
        },500);
      }
    }
  }
}

