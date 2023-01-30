
let printcards = document.getElementsByClassName("card");
let toremove = [];
let toclone = [];
//fill in Cards Front and Back in a layout that can be printed 
for(let i = 0; i<printcards.length;i++){
  if(printcards[i].style.display != "none"){
    toclone.push(printcards[i].id);
  }
  else{
    toremove.push(printcards[i].id);
  }
}

for(let i = 0; i<toremove.length;i++){
  document.getElementById(toremove[i]).remove();
}
for(let i = 0; i<toclone.length;i++){
  let relevantcard = document.getElementById(toclone[i]);
  let cardtoclone = "<div class='card clone crezept' id='clone"+i+"'>"+relevantcard.innerHTML+"</div>";
  if(relevantcard.classList.contains("ckat0")){
    cardtoclone = "<div class='card clone ckat0' id='clone"+i+"'>"+relevantcard.innerHTML+"</div>";
  }
  if(relevantcard.classList.contains("ckat1")){
    cardtoclone = "<div class='card clone ckat1' id='clone"+i+"'>"+relevantcard.innerHTML+"</div>";
  }
  if(relevantcard.classList.contains("ckat2")){
    cardtoclone = "<div class='card clone ckat2' id='clone"+i+"'>"+relevantcard.innerHTML+"</div>";
  }
  if(relevantcard.classList.contains("ckat3")){
    cardtoclone = "<div class='card clone ckat3' id='clone"+i+"'>"+relevantcard.innerHTML+"</div>";
  }
  if(relevantcard.classList.contains("ckat4")){
    cardtoclone = "<div class='card clone ckat4' id='clone"+i+"'>"+relevantcard.innerHTML+"</div>";
  }
  document.body.innerHTML += cardtoclone;
}
for(let i = 0; i<toclone.length;i++){

  document.getElementById("clone"+i).firstChild.style.display="none";
  document.getElementById("clone"+i).lastChild.style.display="block";
  document.getElementById(toclone[i]).firstChild.style.display="block";
  document.getElementById(toclone[i]).lastChild.style.display="none";
}
