let firstturned = false;
let opencard = null;
let foundpairs = 0;
let disableclick = false;

let cardorder = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //when filled, each number will appear twice to mark the pairs 
let cardsopen = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,] //saves which cards are image side up
let cardlinks = [null,null,null,null,null,null,null,null,null,null,null,null,]//12 urls for different images

//all img urls hardcoded  12 per level
let allurls = [[
'https://images.unsplash.com/photo-1600623632360-cb8918e1c754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2Fycm90fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1606916032083-e505604f1a9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNhcnJvdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1550081699-79c1c2e48a77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGNhcnJvdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1472653525502-fc569e405a74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2Fycm90JTIwZGlydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
'https://media.istockphoto.com/id/1352621482/es/foto/sopa-vegana-con-garbanzos-patatas-y-verduras.jpg?s=612x612&w=0&k=20&c=4v2F4qd3psuKy5Pa2RZAoJ_tR3Im1M6F74M8DVdRcSU=',
'https://media.istockphoto.com/id/1352464289/es/foto/puerro-y-zanahorias-en-rodajas.jpg?s=612x612&w=0&k=20&c=mhgnB0eo-m2GOoBICvSP_J-Pb1_cfEUuJkByOurTPnE=',
'https://media.istockphoto.com/id/1220632811/es/foto/sopa-vegana-de-calabaza-de-mantequilla.jpg?s=612x612&w=0&k=20&c=wPYk-45LaDJ-OofA_1ws8LX8Cj272FmJgzZqZYNiawg=',
'https://media.istockphoto.com/id/1416827711/es/vector/patr%C3%B3n-sin-costuras-con-zanahorias-kawaii.jpg?s=612x612&w=0&k=20&c=wO3axkBucfsAyXfCVAra6IeWorHJEcNhdF41PMnlFt0=',
'https://media.istockphoto.com/id/1212568428/es/foto/perro-con-un-mont%C3%B3n-de-zanahorias-en-boca-lindo-borde-blanco-y-negro-collie.jpg?s=612x612&w=0&k=20&c=fu0opDDrRRW09-fVcjRi9mAON7MRmkfU1LNfbQuolrI=',
'https://media.istockphoto.com/id/1346299819/es/foto/zanahoria-arco-iris-colorida.jpg?s=612x612&w=0&k=20&c=AOHgrEPgNQTZwl9ymDCjNDvw8t8uLBCe2ou_51EKm6g=',
'https://media.istockphoto.com/id/182174646/es/foto/corrot-en-campo.jpg?s=612x612&w=0&k=20&c=npfA6Veis6ZqSIIt4p0o2TWjwMZd_UDRnV37wPuYL5k=',
'https://media.istockphoto.com/id/1334230992/es/foto/pastel-de-zanahoria-en-capas.jpg?s=612x612&w=0&k=20&c=GgdpxZp_978E1mW18SQY8ljD9TUZ1bkSBHwUphAj0Oc='
],[],[],[
'https://images.unsplash.com/photo-1596097635121-14b63b7a0c23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG90YXRvZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1590165482129-1b8b27698780?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cG90YXRvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1552661397-4233881ea8c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cG90YXRvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
'https://plus.unsplash.com/premium_photo-1663054727010-4a642cc9d2a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHBvdGF0b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fHBvdGF0b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1619023283528-3a8589b0069e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTN8fHBvdGF0b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1625324455604-d75faf4b119b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjR8fHBvdGF0b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1621840061573-b2fce9b28d1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fHBvdGF0b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODR8fHBvdGF0b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1506802986183-24b7ddbb8d82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGdub2NjaGl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1563012678-bdfec255931b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cG90YXRvJTIwZmFybXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1663530761401-15eefb544889?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjR8fHBvdGF0byUyMGNvb2tpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
],[],[],[
'https://images.unsplash.com/photo-1525286102393-8bf945cd0649?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Z3JhcGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1573574635896-36753f4e38bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGdyYXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1599819177626-b50f9dd21c9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGdyYXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1536455459-ff8ea856a79c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGdyYXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGdyYXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1621410163639-87c2e246aaa3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjF8fGdyYXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1547595628-c61a29f496f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
'https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHdpbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1534655882117-f9eff36a1574?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHdpbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1516559828984-fb3b99548b21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Z3JhcGUlMjBkZXNzZXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGdyYXBlJTIwZGVzc2VydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1590785069874-a283f2c8d420?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFpc2lufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
],[],[],[
'https://images.unsplash.com/photo-1615502731897-55bd83d3b14b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bnVkbGVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1633352615955-f0c99e8b7e5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bm9vZGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1556761223-4c4282c73f77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGFzdGF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1551462147-ff29053bfc14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGFzdGF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1598720290281-9f26ae6d6f81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHBhc3RhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1626844131082-256783844137?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fHBhc3RhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
'https://images.unsplash.com/photo-1627735483792-233bf632619b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGZsb3VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGxhc2FnbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1501430654243-c934cec2e1c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2hlYXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1614173188975-b77298c35fea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fHBhc3RhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
'https://images.unsplash.com/photo-1612927601601-6638404737ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bm9vZGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
]]


let paircount = 12;
let difficultyscore = getdifficulty();
console.log(difficultyscore);
if(difficultyscore<9){document.getElementById("card23").remove();document.getElementById("card22").remove();remove1pair();}
if(difficultyscore<7){document.getElementById("card21").remove();document.getElementById("card20").remove();remove1pair();}
if(difficultyscore<5){document.getElementById("card19").remove();document.getElementById("card18").remove();remove1pair();}
if(difficultyscore<3){document.getElementById("card17").remove();document.getElementById("card16").remove();remove1pair();}
if(difficultyscore<1){document.getElementById("card15").remove();document.getElementById("card14").remove();remove1pair();}
function remove1pair(){
    paircount--;
    cardorder.pop();
    cardorder.pop();
    cardlinks.pop();
    cardlinks.pop();
    cardsopen.pop();
    cardsopen.pop();    
}
console.log(paircount);
let LvlNumber = getLevelNumber();
let urls = allurls[LvlNumber-1];
// generating a random distribution for images
function Initialshuffle(){
    for(let i = 1; i<paircount;i++){
        let placed1 = false;
        let placed2 = false;
        while(!placed1){
            let pos = Math.floor(Math.random() * (paircount*2));
            if(cardorder[pos]==0){
                cardorder[pos]=i;
                placed1 = true;
            }
        }
        while(!placed2){
            let pos = Math.floor(Math.random() * (paircount*2));
            if(cardorder[pos]==0){
                cardorder[pos]=i;
                placed2 = true;
            }
        }
    }
}
Initialshuffle();
console.log(cardorder);

//Check state of game and flip cards if possible
function FlipMemoryCard(cnumber){
    //only do something if a card with image side down is clicked and previous turn is over
    if(!cardsopen[cnumber]&&!disableclick){ 
        cardsopen[cnumber]=true;
        Rotate(cnumber, 1);
        if(!firstturned){
            firstturned = true;
            opencard=cnumber;
        }
        else{            
            disableclick=true;
            checkmatch(cnumber);
        }
    }
}

//Animate the flipping of a card based on previous side 
function Rotate(cnumber, sidetoturnto){
    //cnumber marks card to act on and sidetoturnto is 0 for turne to close and 1 for turne to open
    let card = document.getElementById("card"+cnumber);
    card.style.transform="rotateY(90deg)"
    setTimeout(()=>{
        if(sidetoturnto==0){
            card.style.backgroundImage = "url('../img/LVL_General/MemoryBack.png')";
        }
        else{
            card.style.backgroundImage = "url('"+urls[cardorder[cnumber]]+"')";
        }
        card.style.transform="rotateY(0deg)"
    },420)
}

//Check for solve of memory
function checkmatch(secondcard){
    let firstcard = opencard;
    if(cardorder[firstcard]==cardorder[secondcard]){
        opencard=null;
        firstturned=false;
        foundpairs++;
        disableclick=false;
        if(foundpairs>=paircount){
            setTimeout(()=>{
                GameWon();
            },1000)
        }
    }
    else{
        setTimeout(()=>{
            opencard=null;
            firstturned=false;
            cardsopen[firstcard]=false;
            cardsopen[secondcard]=false;
            Rotate(firstcard,0);
            Rotate(secondcard,0);
            disableclick=false;
        },3000)
    }
}

//Animate Feedback when game is complete
function GameWon(){
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


function SetLevel(LvlNumber){
    urls = allurls[LvlNumber];
}