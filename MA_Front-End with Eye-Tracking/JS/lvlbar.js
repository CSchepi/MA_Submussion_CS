// Points reach from 0 -100
//1 Star at 35 points, 2 Stars at 60 points, 3 Stars at 79 Points

//initial values and documents from html
let points = 0;
let bar = document.getElementById("lbbar");
let star1 = document.getElementById("lbstar1full")
let star2 = document.getElementById("lbstar2full")
let star3 = document.getElementById("lbstar3full")
let stars = 0;

//increasing points or reduce if attention loss 
function addpoints(amount){
    points += amount;
    if(points<0){points=0};
    if(points>100){points = 100};
    drawBar();
}

//setting points ignoring previous value
function setpoints(amount){
    points = amount;
    stars = 0;
    drawBar();
}
function getpoints(){
    return points;
}

//drawing the bar by width (0-100%)
function drawBar(){
    bar = document.getElementById("lbbar");
    new ResizeObserver(outputsize).observe(bar);
    bar.style.width=points+"%";
}
drawBar();

//Check if bar moved past star and start star-animation
function outputsize(){
    let maxbarwidth = document.getElementsByClassName("lbbarcontainer")[0].offsetWidth;
    let barpercent = bar.offsetWidth/maxbarwidth;
    if(barpercent>0.34){
        if(stars==0){
            FillStar(1);
        }
        else{
            if(barpercent>0.58){
                if(stars==1){
                    FillStar(2);
                }
                else{
                    if(barpercent>0.77 && stars==2){
                        FillStar(3);
                    }
                }
            }
        }
    }
}

//Animate the filling of a Star
function FillStar(number){
    stars=number;
    let star = document.getElementById("lbstar"+number+"full")
    let sparkel = document.getElementById("lbstarspark"+number);
    star.style.display="block";
    setTimeout(()=>{ 
        star.style.transform="scale(1.3)";
        sparkel.style.display="block";
        setTimeout(()=>{
            star.style.transform="scale(1)";
        },500)
        setTimeout(()=>{
            sparkel.style.display="none";
        },2000)
    },10)
}

//Listener for resizing bar to check stars
new ResizeObserver(outputsize).observe(bar);
