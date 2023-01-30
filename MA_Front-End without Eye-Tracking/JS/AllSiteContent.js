// Redirect to login page when not logged in 
function CheckLogin(){
    let checkloginbyid =sessionStorage.getItem("_id");
    if(checkloginbyid =="null"||checkloginbyid ==null){
        window.location.href="./index.html";
    }
}
CheckLogin();

//add Impressum Button to bottom of page
document.body.innerHTML += "<div id='impressum' onclick='window.location.href=\"./impressum.html\"'>impressum</div>";


