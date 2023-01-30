//Open information taxt of the titles 
function openField(num){
    let field = document.getElementById("text"+num);
    let triangle = document.getElementById("arrow"+num);
    if(field.style.display=="none"){
        field.style.display="block";
        triangle.innerText="▼"; 
    }   
    else{
        field.style.display="none";
        triangle.innerText="▶"; 
    }
}