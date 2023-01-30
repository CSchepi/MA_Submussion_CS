//array of 100 implemented cards and variety of spellings and sorted by priority to reduce wrong mappings
let cardnames =[[90,['Süßkartoffel','sweet potato']],[63,['Aubergine','eggplant']],[74,['Kichererbse','chick-pea']],[58,['Honigmelone','cantaloupe']],[47,['Feige','fig']],[32,['Reis','rice']],[27,['Frischkäse','cream cheese']],[24,['Ziegenkäse','goat cheese']],[18,['Sojamilch','soy milk','soy-milk']],[1,['Rind','beef']],[2,['Schwein','pork']],[3,['Kalb','veal']],[4,['Hähnchen','chicken','Hühnchen','huhn']],[5,['Pute','Truthahn','turkey']],[7,['Lamm','lamb']],[8,['Wild','Hirsch','Hase','game meet','venison','deer','rabbit']],[10,['Salami']],[9,['Wurst','Schinken','Speck','prosciutto','sausage','bacon','ham']],[11,['Lachs','salmon']],[12,['Forelle','trout']],[13,['Kabeljau','cod']],[14,['Thunfisch','tuna']],[15,['Garnele','shrimp','prawn','krabbe']],[16,['Muschel','shellfish','auster']],[25,['Parmesan']],[26,['Mozzarella']],[28,['Gorgonzola']],[30,['Honig','honey']],[31,['Mehl','flour']],[33,['Nudel','noodle']],[34,['Brot','Toast','Brötchen','bread']],[35,['Schokolade','chocolate','kakao','cocoa']],[36,['Zucker','suggar']],[37,['Apfelsaft','applejuice']],[38,['Ananas','pineapple']],[39,['Apfel','apple']],[40,['Aprikose','apricot']],[41,['Avocado']],[42,['Banane','banana']],[43,['Birne','pear']],[44,['Blaubeere','blueberry']],[45,['Dattel','date']],[46,['Erdbeere','strawberry']],[48,['Himbeere','raspberry']],[49,['Kirsche','cherry']],[50,['Kiwi']],[51,['Mandarine','tangerine']],[52,['Mango']],[53,['Olive']],[54,['Orange']],[55,['Pfirsich','peach']],[56,['Pflaume','plum']],[57,['Wassermelone','watermelone']],[59,['Zitrone','lemon']],[60,['Zwetschge']],[61,['Traube','grape']],[62,['Artischocke','artichoke']],[64,['Bohne','bean']],[65,['Blumenkohl','cauliflower']],[66,['Brokkoli','broccoli']],[67,['Pilz','Champignon','mushroom']],[68,['Erbse','pea']],[69,['Salat','salad']],[70,['Fenchel','fennel']],[71,['Spitzkohl','cabbage']],[72,['Gurke','cucumber']],[73,['Kartoffel','potato']],[75,['Knoblauch','garlic']],[76,['Kürbis','pumpkin']],[77,['Linsen','lenses']],[78,['Mais','corn']],[79,['Karotte','Möhre','Mohrrübe','carrot']],[80,['Paprika']],[81,['Kohlrabi']],[82,['Lauch','leek']],[83,['Rosenkohl','brussels sprout']],[84,['Rote Bete','beetroot']],[85,['Rotkohl','Blaukraut','red cabbage']],[86,['Sellerie','celery']],[87,['Sojaspros','bean sprouts']],[88,['Spargel','asparagus']],[89,['Spinat','spinach']],[91,['Tomate','tomato']],[92,['Zucchini']],[93,['Zwiebel','onion']],[94,['Chili']],[95,['Kokosnuss','coconut']],[96,['Mandel','almond']],[97,['Erdnüsse','peanut']],[98,['Haselnüsse','hazelnut']],[99,['Walnüsse','walnut']],[100,['Cashew']],[17,['Milch','milk']],[6,['Ente','duck']],[20,['Sahne','Rahm','cream']],[21,['Joghurt','jogurt','yogurt']],[22,['Quark','Topfen','curd']],[23,['Butter']],[19,['Käse','cheese']],[29,[' Ei ',' egg ']]];
let scannedcardnum = 1;
let firstrecognised = false;
 // when scan succesfull, start mapping
function onScanSuccess(decodedText, decodedResult) {
    document.getElementById("StopButton").click();
    if(decodedText.charAt(0)=="R"){
        //Only alow real life products
        window.alert("Es können nur Produkte eingescannt werden.")
        return;
    }
    if(decodedText.charAt(0)=="I"){
        let Inumber = Number(decodedText.replace("I",""));
        window.location.href="./Recipe_Crafter.html?bonus="+Inumber;
    }
    eanfound(decodedText)
   
}
//When real life product code is scanned
function eanfound(decodedText){
    let OFF_req = new XMLHttpRequest;
    //get information from openfoodfacts
    OFF_req.open("GET","https://world.openfoodfacts.org/api/v0/product/"+decodedText);
    OFF_req.send();
    OFF_req.onreadystatechange = () =>{
        if(OFF_req.responseText && OFF_req.readyState==4 && OFF_req.status==200){
            let productinfo = JSON.parse(OFF_req.responseText);
            if(productinfo["status"]==1){
                //Create keyword string to analyze product kategory
                let keywords =  JSON.stringify(productinfo["product"]["_keywords"])+JSON.stringify(productinfo["product"]["categories"])+JSON.stringify(productinfo["product"]["brands_tags"])+JSON.stringify(productinfo["product"]["categories_tags"]);
                document.getElementById("h31").innerHTML="Product: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "+productinfo["product"]["product_name_de"];
                //Show fitting Nutri score
                if(productinfo["product"]["nutrition_grades"]=="a"){document.getElementById("h33").src="./img/nutriscore/A.JPG"}
                if(productinfo["product"]["nutrition_grades"]=="b"){document.getElementById("h33").src="./img/nutriscore/B.JPG"}
                if(productinfo["product"]["nutrition_grades"]=="c"){document.getElementById("h33").src="./img/nutriscore/C.JPG"}
                if(productinfo["product"]["nutrition_grades"]=="d"){document.getElementById("h33").src="./img/nutriscore/D.JPG"}
                if(productinfo["product"]["nutrition_grades"]=="e"){document.getElementById("h33").src="./img/nutriscore/E.JPG"}
                //Map implemented ingredients to keywords
                for(i in cardnames){
                    let producttotest = cardnames[i];
                    for(j in producttotest[1]){
                        if(keywords.toLowerCase().includes(producttotest[1][j].toLowerCase())){
                            if(!firstrecognised){
                                AddCardType(producttotest);
                            }
                            firstrecognised = true;
                            document.getElementById("ScannOverview").style.display = "block";
                        }
                    }
                }
                setTimeout(()=>{
                    if(!firstrecognised){
                        window.alert("Leider passt das Produkt zu keinem der Spiele-Produkte");
                    }
                },1000)
            }
            else{
                window.alert("Dieses Produkt konnte leider nicht gefunden werden");
            }
        }
    }
}

function onScanFailure(error) {
    AddCardType(producttotest[1][0])
}

//Get detected Ingredient information and displaying 
function AddCardType(producttotest){
    scannedcardnum = producttotest[0];
    let getdbproduct_req = new XMLHttpRequest;
    getdbproduct_req.open("GET","https://ma-tommi.herokuapp.com/getIngredients?filternum="+producttotest[0]);
    getdbproduct_req.send();
    getdbproduct_req.onreadystatechange=()=>{
        if(getdbproduct_req.status==200&&getdbproduct_req.readyState==4&&getdbproduct_req.responseText){
            let ingredient = JSON.parse(getdbproduct_req.responseText)[0];
            document.getElementById("h34").style.width=(ingredient["watermedal"]*5)+"vh"
            document.getElementById("h35").style.width=(ingredient["carbonmedal"]*5)+"vh"
        }
    }
    document.getElementById("h32").innerHTML="Kathegorie: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "+producttotest[1][0];
}
function CloseScannInfos(){
    document.getElementById("ScannOverview").style.display = "none";
}
function AddScannToCrafting(){
    if(scannedcardnum>0){
        window.location.href="./Recipe_Crafter.html?bonus="+scannedcardnum;
    }
    else{
        window.alert("Irgendetwas ist schiefgelaufen");
    }
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
 