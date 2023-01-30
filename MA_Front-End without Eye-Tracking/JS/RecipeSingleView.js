let rec_num = new URLSearchParams(window.location.search).get('r');
let recipe_req = new XMLHttpRequest();
//get recipe information from DB
recipe_req.open("GET","https://ma-tommi.herokuapp.com/getRecipes?filternum="+rec_num,true);
recipe_req.send();
recipe_req.onreadystatechange = ()=>{
    if(recipe_req.status==200&&recipe_req.readyState==4&&recipe_req.responseText){
        recipedata = JSON.parse(recipe_req.responseText)[0];   
        //Fill in html elements with correct information
        document.getElementById("Banner").src=recipedata["imgurl"];
        document.getElementById("title").innerText=recipedata["name"];
        let ingredients = recipedata["ingredientlist"].split("//")
        let steps = recipedata["instructions"].split(".")
        //creating list from Ingredients 
        for(let i in ingredients){
            if(i!=ingredients.length-1){
                document.getElementById("zutaten").innerHTML +="<li>"+ingredients[i]+"</li>"
            }
        }
        //Split Steps based on Sentences and Sentence length 
        stepstring = "";
        for(let i in steps){
            if(i!=steps.length-1){
                if(i>0){
                    if(steps[i-1].length<15){
                        stepstring += steps[i]+". "
                    }
                    else{
                        if(stepstring.length<150){
                            stepstring += steps[i]+". ";
                        }
                        else{
                            document.getElementById("schritte").innerHTML +="<li>"+stepstring+"</li>"
                            stepstring = steps[i]+". "; 
                        }
                    }
                }
                else{
                    stepstring += steps[i]+". ";
                }
            }
        }
        document.getElementById("schritte").innerHTML +="<li>"+stepstring+"</li>"
    }
}