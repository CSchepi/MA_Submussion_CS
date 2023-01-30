//Get HTML elements and setting initial values
let cssroot = document.querySelector(':root');
let checkzutaten = document.getElementById("CheckboxZutat");
let checkrezepte = document.getElementById("CheckboxRezept");
let TextInputField = document.getElementById("FilterStringInput");
let FilterKatval = 5;
let FilterMedval = 5;
let numbershowing = 0;
let cardwrapper = document.getElementsByClassName("cardwrapper")[0];
let root = document.querySelector(':root');

//Get all cards a user ownes and adding the according html divs on which cards.js will operate
function FillInOwnedCards(){
    let innerhtml = '<img src="./img/Cards/AddCard.png" onclick="window.location.href=\'AddCardNav.html\'"  id="addcartfield" alt="">';
    let Ingredients = sessionStorage.getItem("ingredients").split(",");
    let Recipes = sessionStorage.getItem("recipes").split(",");

    for(let i = 0; i<Ingredients.length;i++){
        if(Ingredients[i]!=""){
            innerhtml +='<div class="card cardI" onclick="FullScreen(this,2)" id="C'+Ingredients[i]+'"></div>';

        }
    }
    for(let i = 0; i<Recipes.length;i++){
        if(Recipes[i]!=""){
            innerhtml +='<div class="card crezept" onclick="FullScreen(this,2)" id="CR'+Recipes[i]+'"></div>'
        }
    }
    cardwrapper.innerHTML = innerhtml;
    cards_Start();
    countShowing();
}
FillInOwnedCards();

//enable printing when less than 10 cards are showing
function countShowing(){
    numbershowing = 0;
    let cards = document.getElementsByClassName("card");
    for(let i = 0; i<cards.length; i++){
        if(cards[i].style.display !="none"){
            numbershowing++;
        }
    }
    let Button = document.getElementById("PrintButton");
    if(numbershowing>9){
        Button.style.background ="none";
        Button.style.color ="darkgrey";
        Button.style.cursor ="default";
        root.style.setProperty('--printhover', 'none');
    }
    else{
        Button.style.background ="white";
        Button.style.color ="black";
        Button.style.cursor ="pointer";
        root.style.setProperty('--printhover', 'rgb(220,255,220)');
    }
}

//Open PrintWindow 
function TryPrintElem(Elem){
    if(numbershowing<9){
        PrintElem(Elem);
    }
    else{
        console.log("No");
    }
}

//Apply all the filter from filter bar
function ShowZutaten(val){
    //Filter by string
    if(FilterStringValue !=""){
        FilterString(FilterStringValue);
        return;
    }
    document.getElementById("KatDropdown").innerText="Kathegorie ▼";
    document.getElementById("MedDropdown").innerText="Medallie ▼";
    document.getElementById("KatDropdown").style.background="white";
    document.getElementById("MedDropdown").style.background="white";
    document.getElementById("MedOptions").classList.add("optionsshowable");
    document.getElementById("KatOptions").classList.add("optionsshowable");
    //show only ingredients
    if(val){
        displaycards("cardI", "block");
    }
    //show only recipes
    else{
        checkrezepte.checked="true";
        document.getElementById("KatDropdown").style.background="rgb(230,230,230)";
        document.getElementById("MedDropdown").style.background="rgb(230,230,230)";
        document.getElementById("MedOptions").classList.remove("optionsshowable");
        document.getElementById("KatOptions").classList.remove("optionsshowable");
        displaycards("cardI", "none");
        displaycards("crezept", "block");
    }
    countShowing();
}

//Show recipes (not used)
function ShowRezepte(val){
    if(FilterStringValue !=""){
        FilterString(FilterStringValue);
        return;
    }
    document.getElementById("KatDropdown").innerText="Kathegorie ▼";
    document.getElementById("MedDropdown").innerText="Medallie ▼";
    FilterKat(5);
    FilterMed(5);
    if(val){
        displaycards("crezept", "block");
    }
    else{
        checkzutaten.checked="true";
        document.getElementById("KatDropdown").style.background="white";
        document.getElementById("MedDropdown").style.background="white";
        document.getElementById("MedOptions").classList.add("optionsshowable");
        document.getElementById("KatOptions").classList.add("optionsshowable");
        displaycards("cardI", "block");
        displaycards("crezept", "none");

    }
    countShowing();
}

//filter by medals and kathegory
let MedFilter = 5;
let KatFilter = 5;
//Show only Cards with Kathegory X and changing filter bar accordingly
function FilterKat(val){
    TextInputField.value="";
    KatFilter = val;
    if(val==5){
        document.getElementById("KatDropdown").innerText="Kathegorie ▼";   
        if(MedFilter==5){displaycards("cardI", "block");}
        else{
            FilterMed(MedFilter);
        }
    }
    else{
        checkrezepte.checked=false; 
        displaycards("crezept", "none");
        displaycards("cardI", "none");
        if(MedFilter==5){
            displaycards("ckat"+val, "block");
        } 
        else{
            displaycards2("ckat"+KatFilter,"cmed"+MedFilter, "block");
        }
        if(val==0){document.getElementById("KatDropdown").innerText="🥩 Fleisch/Fisch ▼";}
        if(val==1){document.getElementById("KatDropdown").innerText="🧀 Tierisch ▼";}
        if(val==2){document.getElementById("KatDropdown").innerText="🍓 Obst ▼";}
        if(val==3){document.getElementById("KatDropdown").innerText="🥦 Gemüse ▼";}
        if(val==4){document.getElementById("KatDropdown").innerText="🍴 Sonstiges ▼";}
    }
    countShowing();
}
//Show only Cards with Medal X and changing filter bar accordingly
function FilterMed(val){
    TextInputField.value="";
    MedFilter = val;
    if(val==5){
        document.getElementById("MedDropdown").innerText="Medallie ▼";
        if(KatFilter==5){displaycards("cardI", "block");}
        else{
            FilterKat(KatFilter);
        }
    }
    else{
        checkrezepte.checked=false;
        displaycards("crezept", "none");
        displaycards("cardI", "none");
        if(KatFilter==5){
            displaycards("cmed"+val, "block");
        }
        else{
            displaycards2("ckat"+KatFilter,"cmed"+MedFilter, "block");
        }
        if(val==0){document.getElementById("MedDropdown").innerText="🥇 Gold ▼";}
        if(val==1){document.getElementById("MedDropdown").innerText="🥈 Silber ▼";}
        if(val==2){document.getElementById("MedDropdown").innerText="🥉 Bronze ▼";}
    }
    countShowing();
}
//going through all cards and hiding / showing according to parameters
function displaycards(classname, value){
    let allrelevant = document.getElementsByClassName(classname);
    for(let i =0; i< allrelevant.length;i++){
        allrelevant[i].style.display=value;
    }
}

//going through all cards and hiding / showing according to parameters (2 classes possible)
function displaycards2(class1, class2, value){
    let allrelevant = document.getElementsByClassName(class1);
    for(let i =0; i< allrelevant.length;i++){
        if(allrelevant[i].classList.contains(class2)){
            allrelevant[i].style.display=value;
        }
    }
}

let availablecards = document.getElementsByClassName("card"); 
let FilterStringValue = "";

//Filter by string (finding matching substrings in card titles)
function FilterString(tofilter){
    FilterStringValue = tofilter;
    document.getElementById("KatDropdown").innerText="Kathegorie ▼";
    document.getElementById("MedDropdown").innerText="Medallie ▼";
    if(MedFilter!=5 || KatFilter !=5){
        MedFilter =5; 
        KatFilter =5;
        checkrezepte.checked="true";
    }
    for(let i = 0; i<availablecards.length;i++){
        if(availablecards[i].getElementsByClassName("cname")[0].innerText.toLowerCase().includes(tofilter.toLowerCase())){
            if((availablecards[i].classList.contains("cardI")&&checkzutaten.checked)||(availablecards[i].classList.contains("crezept")&&checkrezepte.checked)){
                availablecards[i].style.display="block";
            }
            else{
                availablecards[i].style.display="none";
            }
        }
        else{
            availablecards[i].style.display="none";
        }
    }
    countShowing();
}
