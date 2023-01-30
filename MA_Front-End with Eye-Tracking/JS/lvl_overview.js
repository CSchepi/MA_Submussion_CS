let lvlprogress = sessionStorage.getItem("lvlprogress").split(",") // with 0 being unsolved, 1-3 equivalent to amount of stars
for(let i in lvlprogress){lvlprogress[i]=Number(lvlprogress[i])}
let nextunplayed = lvlprogress.indexOf(0)+1;
if(nextunplayed==0){
    nextunplayed = 1;
}
let selectedlvl = nextunplayed;

//creating graphics for every level based on level progress of user
function CreateLvlMarkings(){
    for(let i = 0; i <lvlprogress.length;i++){
        let lvlIcon = document.getElementById("lvl"+(i+1));
        if(lvlprogress[i]>0){
            setTimeout(()=>{
                lvlIcon.getElementsByClassName("solved")[0].style.display="block";
                if(lvlprogress[i]==1){  lvlIcon.getElementsByClassName("star1")[0].style.display="block";}
                if(lvlprogress[i]==2){  lvlIcon.getElementsByClassName("star2")[0].style.display="block";}
                if(lvlprogress[i]==3){  lvlIcon.getElementsByClassName("star3")[0].style.display="block";}
            },10)
        }
    }
    let nextlevel = document.getElementById("lvl"+(nextunplayed));
    nextlevel.getElementsByClassName("lvlselect")[0].style.display="block";
}

setTimeout(()=>{
    CreateLvlMarkings();
},300)


//Marking level the user cliced on 
function SelectLvl(lvlnumber){
    if(selectedlvl==lvlnumber){
        PlayLvl(lvlnumber);
    }
    else{
        if(lvlnumber>nextunplayed){
            lvlnumber = nextunplayed;
        }
        let prevselect = document.getElementById("lvl"+(selectedlvl));
        prevselect.getElementsByClassName("lvlselect")[0].style.display="none";
        
        let nextselect = document.getElementById("lvl"+(lvlnumber));
        nextselect.getElementsByClassName("lvlselect")[0].style.display="block";

        selectedlvl = lvlnumber;
    }
}

//start level by redirecting to according html file
function PlayLvl(){
    window.location.href="./Level/Lvl"+selectedlvl+".html";
}