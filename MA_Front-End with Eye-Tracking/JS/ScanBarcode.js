 // when scan succesfull, adding Card to user 
 function onScanSuccess(decodedText, decodedResult) {
   let cardnum = undefined;
   let filler = ""
   let isnew=false;
   document.getElementById("StopButton").click();
   let updateuser_req = new XMLHttpRequest();
   let prevownedcards = sessionStorage.getItem("ingredients").split(",");
   for(let i in prevownedcards){prevownedcards[i]=Number(prevownedcards[i])}
   let prevownedrecipes = sessionStorage.getItem("recipes").split(",");
   for(let i in prevownedrecipes){prevownedrecipes[i]=Number(prevownedrecipes[i])}
   //For ingredient card: Check if already owned, else add
   if(decodedText[0]=="I"){
     cardnum = Number(decodedText[1]+decodedText[2]+decodedText[3]);
     if(!prevownedcards.includes(cardnum)){
       isnew=true;
       prevownedcards.push(cardnum);
       sessionStorage.setItem("ingredients", prevownedcards);
       updateuser_req.open("GET","https://ma-tommi.herokuapp.com/updateUser?id="+sessionStorage.getItem("_id")+"&addI="+cardnum);
       updateuser_req.send();
     }
   }
   //For recipe card: Check if already owned, else add
   if(decodedText[0]=="R"){
     cardnum = Number(decodedText[1]+decodedText[2]+decodedText[3]);
     if(!prevownedrecipes.includes(cardnum)){
       isnew=true;
       prevownedrecipes.push(cardnum);
       sessionStorage.setItem("recipes", prevownedrecipes);
       updateuser_req.open("GET","https://ma-tommi.herokuapp.com/updateUser?id="+sessionStorage.getItem("_id")+"&addR="+cardnum);
       updateuser_req.send();
     }
     filler ="R";
   }
   //Animate Card in Fullscrean 
   if(cardnum != undefined){
     document.getElementsByClassName("newcardwrapper")[0].style.display="flex";
     let cardid = "C"+filler+cardnum;
     if(filler=="R"){
       document.getElementById("carditself").innerHTML="<div class='card crezept' id='"+cardid+"'></div>"
     }
     else{
       document.getElementById("carditself").innerHTML="<div class='card' id='"+cardid+"'></div>"
     }
     cards_Start();
     let showingcard= document.getElementById(cardid);
     showingcard.style.transform="rotateY(-630deg) scale(0.5)";
     setTimeout(()=>{
       showingcard.style.transition="2s ease";
       showingcard.style.transform="rotateY(0deg) scale(1)";
       setTimeout(()=>{
         showingcard.style.transition="0.5s ease";
       },2000)
     },1000)
   }
 }
 function onScanFailure(error) {
 }
 let html5QrcodeScanner = new Html5QrcodeScanner(
   "qr-reader",
   { fps: 5, qrbox: 250 },
   /* verbose= */ false);
 html5QrcodeScanner.render(onScanSuccess, onScanFailure);

//restart scanner on resize due to shifting in scann area
window.addEventListener('resize', ()=>{
  location.reload();
});
