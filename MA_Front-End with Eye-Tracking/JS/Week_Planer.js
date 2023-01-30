let filled = [null, null, null, null, null, null, null]
let nextpointer = 0;
let full = false;
let Recipes = [];
let RecipePointer=0;
let root = document.querySelector(':root');

//Fill in HTML divs for owned recipes 
function FillInOwnedCards(){
    let innerhtml = '';
    let Recipes = sessionStorage.getItem("recipes").split(",");
    for(let i = 0; i<Recipes.length;i++){
        innerhtml +='<div class="card crezept" onclick="SelectForDay('+Recipes[i]+')" id="CR'+Recipes[i]+'"></div>'
        if(i==Recipes.length-1){
            setTimeout(()=>{
                FilterText("");
            },1000)
        }
    }
    document.getElementById("cardstoselect").innerHTML = innerhtml;
    cards_Start();
    ShiftRecipes(0);
}
FillInOwnedCards();

let filtertext = "";
let waterfilter = 5;
let carbonfilter = 5;

//Filter Recipe Crads based on substring search in title 
function FilterText(filterstring){
    if(filterstring!=""){
        waterfilter=5
        carbonfilter=5
        let children = document.getElementsByClassName("co2filter")[0].children;
        for(let i = 0; i<5;i++){
            children[i].style.opacity="1";      
        }
        children = document.getElementsByClassName("waterfilter")[0].children;
        for(let i = 0; i<5;i++){
            children[i].style.opacity="1";
        }
    }
    if(filterstring!=filtertext){
        RecipePointer=0;
    }
    filtertext = filterstring;
    let filteredRecipeArray = [];
    let notselectedcards = document.getElementById("cardstoselect").getElementsByClassName("card");
    for(let i = 0; i<notselectedcards.length;i++){
        let cardtocheck = notselectedcards[i];
        cardtocheck.style.display="none";
        if(cardtocheck.getElementsByClassName("cname")[0].innerText.toLowerCase().includes(filterstring.toLowerCase())){
            let cardnumber = cardtocheck.id.replace("CR","");
            filteredRecipeArray.push(Number(cardnumber));
        }
    }
    Recipes = filteredRecipeArray;
    ShiftRecipes(0);
}

//Filter Cards based on carbon AND Waterpoints 
function FilterPoints(carbon, water){
    if(carbon!=5&&water!=5){
        FilterText("");
    }
    if(carbon<0){
        carbon = carbonfilter
    }
    else{
        carbonfilter = carbon;
    }
    if(water<0){
        water = waterfilter
    }
    else{
        waterfilter = water;
    }
    document.getElementById("textfilterinput").value="";
    RecipePointer=0;
    let filteredRecipeArray = [];
    let notselectedcards = document.getElementById("cardstoselect").getElementsByClassName("card");
    for(let i = 0; i<notselectedcards.length;i++){
        let cardtocheck = notselectedcards[i];
        cardtocheck.style.display="none";
        let cardcvalue = cardtocheck.getElementsByClassName("crpoints1")[0].getAttribute("value");
        let cardwvalue = cardtocheck.getElementsByClassName("crpoints2")[0].getAttribute("value");
        if(cardcvalue <= carbon && cardwvalue <= water){
            let cardnumber = cardtocheck.id.replace("CR","");
            filteredRecipeArray.push(Number(cardnumber));
        }
    }
    Recipes = filteredRecipeArray;
    ShiftRecipes(0);
}

//Show arrows to scroll through owned recipes if not all fit onto the screen
function UpdateArrows(){
    if(Recipes.length>10){
        if(RecipePointer>0){
            document.getElementById("shiftleft").style.display="block";
        }
        else{
            document.getElementById("shiftleft").style.display="none";
        }
        if(RecipePointer<(Recipes.length-10)){
            document.getElementById("shiftright").style.display="block";
        }
        else{
            document.getElementById("shiftright").style.display="none";
        }
    }
    else{
        document.getElementById("shiftleft").style.display="none";
        document.getElementById("shiftright").style.display="none";
    }
}

//Scroll through recipes
function ShiftRecipes(val){
    RecipePointer += val;
    for(let i = 0; i<Recipes.length;i++){
        if(i>=RecipePointer&&i<(RecipePointer+10)){
            document.getElementById("CR"+Recipes[i]).style.display="block";
        }
        else{
            document.getElementById("CR"+Recipes[i]).style.display="none"; 
        }
    }
    UpdateArrows();
}

//Change Graphic in Filter Field when medal filter clicked
function FilterPoint(cat,num){
    if(cat=="C"){
        let children = document.getElementsByClassName("co2filter")[0].children;
        for(let i = 4; i+1>num;i--){
            children[i].style.opacity="0.2";
        }
        for(let i = 0; i<num;i++){
            children[i].style.opacity="1";
        }
        FilterPoints(num,-1);
    }
    if(cat=="W"){
        let children = document.getElementsByClassName("waterfilter")[0].children;
        for(let i = 4; i+1>num;i--){
            children[i].style.opacity="0.2";
        }
        for(let i = 0; i<num;i++){
            children[i].style.opacity="1";
        }
        FilterPoints(-1,num);
    }
}

//Move Card from top to placeholder and update tubes 
function SelectForDay(cardnum){
    if(!full){
        filled[nextpointer]=cardnum;
        document.getElementById('CR'+cardnum).remove();
        document.getElementById("delday"+nextpointer).style.display="block";
        let index = Recipes.indexOf(cardnum);
        
        if (index > -1) { 
           Recipes.splice(index, 1); 
           if(RecipePointer>Recipes.length-10 && RecipePointer>0){
            RecipePointer--;
           }
        }
        UpdatePlan();
    }
}

//Move card from placeholder to top
function RemoveSelected(position){
    document.getElementById("delday"+position).style.display="none";
    let toselect = document.getElementById("cardstoselect");
    toselect.innerHTML +=  '<div class="card crezept" onclick="SelectForDay('+filled[position]+')" id="CR'+filled[position]+'"></div>';
    Recipes.push(filled[position]);
    filled[position]=null;
    UpdatePlan()
    setTimeout(()=>{
        FilterText(filtertext);
    },1000)
}

//Select placeholder to move next card to 
function ChangePlaceholder(topos){    
    document.getElementById('day'+(nextpointer+1)+'placeholder').style.border ="none";
    nextpointer = topos;
    document.getElementById('day'+(topos+1)+'placeholder').style.border = "2px solid red";

}

//Calculate and Show footprint average in cylinders
function UpdatePlan(){
    let checkfull= true;
    let findnext = null;
    let innerHTML = "";
    let weekco2 = 0; 
    let weekwater = 0; 
    let amountofrecipes = 0; 
    for(let i = 0; i<7; i++){
        if(filled[i]==null){
            checkfull=false;
            if(findnext==null){
                findnext = i;
                innerHTML += '<img src="./img/Cards/Tag'+(i+1)+'.png" class="addcartfield" id="day'+(i+1)+'placeholder"  style="border: 2px solid red;">';
            }
            else{   
                innerHTML += '<img src="./img/Cards/Tag'+(i+1)+'.png" onclick="ChangePlaceholder('+i+')" class="addcartfield" id="day'+(i+1)+'placeholder" alt="">';
            }
        }
        else{
            innerHTML+='<div class="card dayselector crezept" id="CR'+filled[i]+'" id="day'+(i+1)+'selected"></div>';
            let getrecipe_req = new XMLHttpRequest;
            getrecipe_req.open("GET","https://ma-tommi.herokuapp.com/getRecipes?filternum="+filled[i]);
            getrecipe_req.send();
            getrecipe_req.onreadystatechange = ()=>{
                if(getrecipe_req.status==200&&getrecipe_req.readyState==4&&getrecipe_req.responseText){
                    let currentrecipe = JSON.parse(getrecipe_req.responseText)[0];
                    weekco2 +=  Number(currentrecipe["carbonpoints"]);
                    weekwater += Number(currentrecipe["waterpoints"]);
                    amountofrecipes++;
                }
            }
        }
    }
    setTimeout(()=>{
        //Alibi Calculation
        let co2wert = 0;
        let waterwert = 0;
        if(amountofrecipes>0){
            co2wert = (weekco2/amountofrecipes);
            co2wert = ((co2wert ** (1/3.5))-1.9)*16.5;
            waterwert=(weekwater/amountofrecipes);
            waterwert = ((waterwert ** (1/3.5))-2.3)*16.5;
        }
        root.style.setProperty('--cylinder-co2', co2wert);
        root.style.setProperty('--cylinder-water', waterwert);


    },200)
    
    document.getElementById('days').innerHTML = innerHTML;

    if(checkfull){
        full=true;
    }
    else{
        full=false;
    }
    nextpointer = findnext;
    ShiftRecipes(0);
    InitiateCards();
}
UpdatePlan();
