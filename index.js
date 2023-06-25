var who;  
var turn; 
var end=false;   //end game after player win | not to allow bot to mark
var player1 = [];
var bot1 = [];
   
//winning condition
const win = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
var allElement = [1,2,3,4,5,6,7,8,9];

//event listener for 9 box
document.querySelectorAll(".select").forEach((item)=>{
    item.addEventListener('click',selected);
})

// event listener for restart button
document.querySelector(".banner button").addEventListener('click',function(evt){
    location.reload();
})

// event listener function for 9 box
function selected(item){
   who=(item.target.value==="0")?"O":"X";
   document.querySelector(".player").textContent="Player "+who;
    document.querySelector(".center").classList.add("hidden");
    document.querySelector(".banner").classList.add("hidden");
    document.querySelector(".root").classList.remove("hidden");
    player();
 
}

// function for bot play
function botPlay(){
    let elementIndex=0;
    let getElementById="";

    switch(player1.length){
        case 1:
            //check if 5th loction is free to occupy else random number
            elementIndex = (player1[0]!==5)? 5: allElement[ Math.floor(Math.random() * allElement.length)];
            break;
            
        case 2:
            let nextMove2 = findNextMoveToWin(player1,bot1);  // this function find the next move to win player
            elementIndex = (nextMove2 === null)? allElement[ Math.floor(Math.random() * allElement.length)]   :  nextMove2;
            break;

        default:
            let nextMoveToWinBot = findNextMoveToWin(bot1,player1);     // this function find the next move towin bot
            let nextMoveToNotWinPlayer = findNextMoveToWin(player1,bot1);   // this function find the next move to win player
            elementIndex = (nextMoveToWinBot===null)? nextMoveToNotWinPlayer : nextMoveToWinBot;
            if((nextMoveToNotWinPlayer === null) && (nextMoveToWinBot === null)){       //if both values are null then random number
                elementIndex = allElement[ Math.floor(Math.random() * allElement.length)];
            }
    }
     getElementById = document.getElementById(`a${elementIndex}`)           // find the location 
    add(getElementById,elementIndex,turn)
}

//function for Draw
function winOrDraw(whos){
    document.querySelector(".banner").classList.remove("hidden");           // remove hidden to visible the restart button
    document.querySelector(".banner h2").textContent =(whos)? whos: "Draw!";
}

//main function game play
function playGame(){
    document.querySelector(".center").classList.remove("hidden");           
     document.querySelector(".banner").classList.add("hidden");
       location.reload();
}


function player(){
    document.querySelector(".container").addEventListener('click',function(evt){
        turn=true;
        let elementIndex = Number(evt.target.dataset.index); //specific element index - data
        let getElementById = document.getElementById(evt.target.id);   

        if(add(getElementById,elementIndex,turn)){
            turn=false;
            (!(end) && botPlay())
        }else{
            turn=false;
            alert("Select the Valid Cell!")
        }
        }) 
}

//function for add 
function add(id,eIndex,turn){
    if(allElement.includes(eIndex)){ //to check the mark area is valid area    
           markxo(id,eIndex,turn);
        return true;
    }
}


// function for mark or draw the "O" or "X"
function markxo(id,eIndex,turn){
    allElement=allElement.filter(item => item !== eIndex);

    if(turn){
        player1.push(eIndex);
        id.textContent = who;
        if(player1.length>=3){
            if(check(player1)){
                end = true;
               return winOrDraw("Player Win!");
            }else if(allElement.length === 0){
                return winOrDraw();
            }
        }
     
    }else{
        bot1.push(eIndex);
        id.textContent = (who==="X")?"O":"X";
        if(bot1.length>=3){
            if(check(bot1)){
                return winOrDraw("Computer Win!");
            }else if(allElement.length === 0){
                return winOrDraw();
            }
        }
    }
    (id.textContent==="O")?id.classList.add("color"):id.classList.remove("color");
}


// //check the winning condition
function check(p){
  for(let i = 0;i<win.length; i++){
    a=win[i];
    b=p;
    if(a.every((val)=>b.includes(val))){
        return true;
    }
}
}



// this function to find the next move to win
function findNextMoveToWin(player, opponent) {
    for (let condition of win) {
        let playerPositions = player.filter(position => condition.includes(position));
        let opponentPositions = opponent.filter(position => condition.includes(position));
        if (playerPositions.length === 2 && opponentPositions.length === 0) {
        let missingPosition = condition.find(position => !player.includes(position) && !opponent.includes(position));
        if (missingPosition !== undefined) {
            return missingPosition;
        }
        }
    }
    return null; // No potential winning move found
    }



















// var player1 = [];
// var player2 = [];
// var iterate = 0;

// //winning condition
// const win = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
// var allElement = [1,2,3,4,5,6,7,8,9];



// gameStart();


// function gameStart(){
//     if(iterate%2==0){
//         playGame()
//     }
//     else{
//         bot()
//     }
// }




// function playGame(){

// //event listener for btn to click
//     document.querySelector(".container").addEventListener('click',function(evt){
        
//         var elementIndex = Number(evt.target.dataset.index); //specific element index - data
//         let getElementById = document.getElementById(evt.target.id);

//         if(iterate<8){
            
//             if(add(getElementById,iterate,elementIndex))
//                 {   iterate++;  
//                 }
//         }else{
//             add(getElementById,iterate,elementIndex)
//             draw(iterate)
//             iterate=0;
//         }
// }) 
// }

// function draw(){
//     clear();
//     document.querySelector("p").textContent="Draw";
// }


// function add(id,i,eIndex){
    
//     if(allElement.includes(eIndex)){ //to check the mark area is valid area  

//         let toss=i%2; //check player1 or plalyer2 to play   

//         if(toss===0){                           
//            markxo(player1,eIndex,id,toss,i);
//         }else{
//             markxo(player2,eIndex,id,toss,i);
//         }
//         return true;
        
//     }else{
//         alert("Select the Valid Cell!")
//     }
// }

// //check the winning condition
// function check(p){
//   for(let i = 0;i<win.length; i++){
//     a=win[i];
//     b=p;
//     if(a.every((val)=>b.includes(val))){
//         return true;
//     }
// }
// }


// // mark the place "X" or "O"
// function markxo(player,eIndex,id,toss){

//     player.push(eIndex);
//     id.textContent = (toss===0)?"X":"O";
//     (id.textContent==="O")?id.classList.add("color"):id.classList.remove("color");
//     allElement=allElement.filter(item => item !== eIndex);

//     if(player.length>=3){
//         if(check(player)){
//             gameWin(toss);
//         }
//     }
// }

// function gameWin(p){

//     document.querySelector(".banner h2").textContent=(p===0)?"Player 2 Win!":"Player 1 Win!";
//     document.querySelector(".banner p").textContent = "Press any key Restart!";
//     document.querySelector(".banner").classList.add("ban");
//     document.addEventListener("click",function(){ 
//         document.querySelector(".banner p").textContent = "";
//         document.querySelector(".banner").classList.remove("ban");
//     });
//         clear();
   
// }

// function clear(){
//     document.querySelectorAll("button").forEach(ele=>ele.textContent="");
//     player1 = [];
//     player2 = [];
    
//     allElement = [1,2,3,4,5,6,7,8,9];
//     iterate=-1;

//     return true;
// }