//level baesd data consisting of ImageURL, Question and 4 answeres
let questions = [
  [["URL","Question",["Correct","wrong","wrong","wrong"]]],
  [
    ["https://images.unsplash.com/photo-1516467508483-a7212febe31a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80","Wie werden Schweinebabys auch genannt?",["Ferkel","Mini-Schwein","Eber","Frischling"]],
    ["https://images.unsplash.com/photo-1537033206914-9d3551ff8103?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80","Was essen Schweine?",["Schweine sind Allesfresser","Fleisch","Nur Getreide","Gemüse"]],
    ["https://images.pexels.com/photos/5610055/pexels-photo-5610055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1","Welche Haltungsform, die man auf Fleischprodukten findet, ist die tierfreundlichste?",["Premium","Stallhaltung","Stallhaltung-Plus","Außenklima"]],
    ["https://images.pexels.com/photos/45869/pig-domestic-pig-suckle-piglet-45869.jpeg?auto=compress&cs=tinysrgb&w=1600","Wie viele Ferkel bekommt ein Schwein?",["10 oder mehr","3-5","6-9","1-2"]],
    ["https://images.unsplash.com/photo-1580682777666-24a7b3024e24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80","Welches deutsche Bundesland produziert am meisten Schweinefleisch?",["Niedersachsen","Bayern","Baden-Württemberg","Berlin"]]
  ],
  [],
  [],
  [
    ["https://www.issgesund.de/img/uploads/large/5f76e733dcfe5_ei-kennzeichnung.jpg","Wofür steht die Nummer, die auf Eier gedruckt wird?",["Die Herkunft kann genau nachverfolgt werden","Wie lange das Ei haltbar ist","Wann das Ei gelegt wurde","Wie groß das Ei ist"]],
    ["https://images.unsplash.com/photo-1538170989343-ce003278e1a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80","Welches Haltungssystem für Hühner ist die Tierfreundliche?",["Ökologische Erzeugung","Freilandhaltung","Bodenhaltung","Käfighaltung"]],
    ["https://images.unsplash.com/photo-1506976785307-8732e854ad03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1043&q=80","Wie viele Eier legt eine Legehenne im Jahr?",["Bis zu 300","Über 500","Um die 50","Ungefähr 100"]],
    ["https://images.unsplash.com/photo-1491524062933-cb0289261700?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80","Es gibt Eier in verschiedenen Größen. S, M, L und XL. Aber wie viel wiegt denn ein M-Ei?",["~60g","~40g","~20g","~80g"]],
    ["https://images.unsplash.com/photo-1628615315488-14ec7d02daaf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80","Wann legt ein Huhn braune, und wann legt es weiße Eier?",["Je nach dem, welche Farbe die Ohrscheiben haben","Je nach dem, was sie zu essen bekommen","Je nach dem, welche Rasse das Huhn hat","Je nach Jahreszeit"]]
  ],
  [],
  [],
  [
    ["https://images.unsplash.com/photo-1624821588855-a3ffb0b050ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80","Warum haben wir auch im Winter und Frühling frische Tomaten in Deutschland?",["Weil sie aus wärmeren Ländern importiert werden","Weil sie sehr lange haltbar sind","Weil sie erst im Winter reif zur Ernte sind","Weil sie unreif geerntet werden"]],
    ["https://images.unsplash.com/photo-1608022749628-3251d92cdd79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80","Wie wurde die Tomate früher genannt?",["Liebesapfel","Rotbirne","Herzensfrucht","Wutkugel"]],
    ["https://images.unsplash.com/photo-1551892268-3b399428399b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufpaarDB8fHx8&auto=format&fit=crop&w=1170&q=80","Der weltweite Tomatenanbau verursacht viel Plastikmüll, weil Tomaten...",["... zum Schutz mit Plastikplanen abgedeckt werden","... nur einzeln verpackt werden können","... durch Plastik in der Erde besser wachsen","... mit Plastikwerkzeug geerntet wird"]],
    ["https://plantura.garden/uk/wp-content/uploads/sites/2/2022/06/tomato-varieties.jpg","Wie viele Tomatensorten gibt es?",["Über 10.000","25","Knapp 100","Ungefähr 150 bis 250"]],
    ["https://images.unsplash.com/photo-1540563647699-7ffbecbc1c37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80","Sind grüne Tomaten immer unreif?",["Nein, es gibt Sorten, die nicht rot werden","Nein, unreife Tomaten sind braun","Ja, sie sind sogar giftig","Ja, sie sind zwar nicht giftig, aber auch nicht lecker"]]
  ],
  [],
  []
]
let levelnumber = getLevelNumber()-1;
let LevelQuestions = questions[levelnumber];
let questionpointer = 0;
let correctone=0;
//show question with image, question and answeres
function nextQuestion(){
 if(questionpointer<LevelQuestions.length){
  let questiondata = LevelQuestions[questionpointer];
  document.getElementById("quizzimg").src=questiondata[0];
  document.getElementById("question").innerText=questiondata[1];
  let sortcorrect = false;
  for(let i = 0; i<4; i++){
    questiontopush = Math.floor(Math.random()*(4-i));

    if(questiontopush==0&&!sortcorrect){
      sortcorrect=true;
      correctone = i;
    }
    document.getElementById("a"+(i+1)).innerText=questiondata[2][questiontopush];
    questiondata[2].splice(questiontopush,1);
  }  
}

 else{
  won();
 }
}
nextQuestion();
let speedtrap = false;

//check selected answer and animate feedback
function ClickAnswer(num){
  if(!speedtrap){
    speedtrap=true;
    if((num-1)==correctone){
      document.getElementById("a"+(num)).style.background="lightgreen"
      questionpointer++;
      let progressbarvalue = 100*(questionpointer/LevelQuestions.length);
      console.log(progressbarvalue);
      document.querySelector(':root').style.setProperty('--progress', progressbarvalue);
      setTimeout(()=>{
        document.getElementById("a"+(num)).style.background="white";
        nextQuestion();
        speedtrap =false;
      },1000)
    }
    else{
      document.getElementById("a"+(num)).style.background="lightcoral"
      setTimeout(()=>{
        document.getElementById("a"+(num)).style.background="white"
        speedtrap =false;
      },1000)
    }
  }  
}



//check for completion of quizz and animation feedback

function won(){
  document.body.innerHTML+='<div id="greenbright"></div>';
  setTimeout(()=>{
    document.getElementById("greenbright").style.opacity="0.5"
    setTimeout(()=>{
      document.getElementById("greenbright").style.opacity="0"
      setTimeout(()=>{
        document.getElementById("greenbright").remove();
        CompletePuzzle();
      },1500)
    },500)
  },500)
}