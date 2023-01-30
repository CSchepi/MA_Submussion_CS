let ShowAgain = sessionStorage.getItem('PortraitModeShowAgain');
//set initial values based on sessionstorage
if(ShowAgain==null){
    sessionStorage.setItem('PortraitModeShowAgain',true);
    ShowAgain=true;
}
if(ShowAgain=="false"){
    ShowAgain=false;
}
if(ShowAgain=="true"){
    ShowAgain=true;
}

//If taller than whide: Show warning
if(window.innerHeight>window.innerWidth&&ShowAgain)
    {
        ShowOverlay();
    }

//check ration on resize of window
window.addEventListener('resize', ()=>{
    if(window.innerHeight>window.innerWidth&&ShowAgain)
    {
        ShowOverlay();
    }
    if(window.innerHeight<window.innerWidth){
        let blockeritem = document.getElementById('PortraitBlock');
        if(blockeritem!=null){
            document.body.style.overflow="visible";
            blockeritem.remove();
        }
    }
});

//Inserting html code for overlay
function ShowOverlay(){
    window.scroll(0,0);
    document.body.style.overflow="hidden";
    let blockeritem = document.getElementById('PortraitBlock')
    if(blockeritem==null){
        document.body.innerHTML += "<div id='PortraitBlock' style='position: absolute;top:0;left:0;z-index:100;width: 100%;height: 100%;background: rgba(255,245,230,0.9);text-align: center;'>\n"+
    "   <div id='PortraitBlockContent' style='position: absolute; border: 2px solid black;border-radius:1vw;width: 50%;height: 50%;top:25%;left:25%'>\n"+
    "       <p>Hi! Die folgenden Einstellungen werden empfohlen:</p>\n"+
    "          <h2>Im Querformat nutzen</h2>  \n"+
    "           <img src='./img/Icons/RotatePhone.gif' width='40%'> \n"+
    "      <a style='position:absolute;left:0vw;bottom:5px;font-size: 2vw;'><input id='PortraitCheckBox' style='width:2vw' type='checkbox'>Nicht nochmal anzeigen!</a>\n"+
    "     <a style='position:absolute;right:1vw;bottom:5px;font-size:2vw;cursor: pointer;text-decoration: underline;' onclick='skip()'>Überspringen>></a> \n"+
    " </div>\n"+ 
    "</div>";
    }
    else{
        blockeritem.style.display='inline-block';
    }
}
//closing overlay and change user preferences if necessary
function skip(){
    document.body.style.overflow="visible";
    let checkbox = document.getElementById('PortraitCheckBox').checked;
    if(checkbox){
        sessionStorage.setItem('PortraitModeShowAgain',!checkbox);
        ShowAgain=false;
    }
    document.getElementById('PortraitBlock').remove();
}