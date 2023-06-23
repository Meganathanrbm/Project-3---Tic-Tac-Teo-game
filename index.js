var who;  
var turn; 
var end=false;
var player1 = [];
var bot1 = [];
   
//winning condition
const win = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
var possibleWin = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
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
            elementIndex = (player1[0]!==5)? 5: allElement[ Math.floor(Math.random() * allElement.length)];
            break;
        case 2:
            let winRow;

            win.forEach((winn)=>{
               if(winn.includes(player1[0]) && winn.includes(player1[1])){
                   winRow=winn;
                   possibleWin = possibleWin.filter((el)=> (el[0]&&el[1]&&el[2])!==(winRow[0]&&winRow[1]&&winRow[2]));
                //    console.log(possibleWin);
                  
               } 
            })
            try{
                let botCaseTwo = Number(winRow.filter((el) => player1.indexOf(el) == -1));
                elementIndex = (allElement.includes(botCaseTwo))? botCaseTwo : allElement[ Math.floor(Math.random() * allElement.length)];
                
            }catch(err){
                elementIndex =allElement[ Math.floor(Math.random() * allElement.length)];
            }
            break;
        case 3:
            let winRowforBot;
            possibleWin.forEach((winn)=>{
                if(winn.includes(bot1[0]) && winn.includes(bot1[1])){
                    winRowforBot = winn;
                }
            })
            try{
                let botCaseThree = Number(winRowforBot.filter((el) => bot1.indexOf(el) == -1));
                elementIndex = (allElement.includes(botCaseThree))? botCaseThree : allElement[ Math.floor(Math.random() * allElement.length)];
            }catch(err){
                elementIndex =allElement[ Math.floor(Math.random() * allElement.length)];
            }
            break;
        case 4:
            elementIndex =allElement[ Math.floor(Math.random() * allElement.length)];
            break;
        
    }
     getElementById = document.getElementById(`a${elementIndex}`)


    add(getElementById,elementIndex,turn)
}

//function for Draw
function draw(whos){
    document.querySelector(".banner").classList.remove("hidden");
    document.querySelector(".banner h2").textContent =(whos)? whos: "Draw!";
}

//function for win
function gameWin(whos){
    document.querySelector(".banner").classList.remove("hidden");
    document.querySelector(".banner h2").textContent = whos+" win!";
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
            botPlay();
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

    if(allElement.length === 0){
        return draw();
     }
    if(turn){
        player1.push(eIndex);
        id.textContent = who;
        if(player1.length>=3){
            if(check(player1)){
               draw("Player Win!");
            }
        }
     
    }else{
        bot1.push(eIndex);
        id.textContent = (who==="X")?"O":"X";
        if(bot1.length>=3){
            if(check(bot1)){
                draw("Computer Win!");
            }
        }
    }
   
    (id.textContent==="O")?id.classList.add("color"):id.classList.remove("color");
        
}


//function to check the winning conditions
function check(p){
      for(let i = 0;i<win.length; i++){
        a=win[i];
        b=p;
        if(a.every((val)=>b.includes(val))){
            return true;
        }
    }
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