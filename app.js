let border = document.getElementById('border');
let bornSnake = [{x:Math.floor(Math.random()*20),y:Math.floor(Math.random()*20)}];
let way = {x:0 , y:0};
let ate = {x:Math.floor(Math.random()*20), y:Math.floor(Math.random()*20)};
let score = document.querySelector(".score");
let reset = document.getElementById("reset-btn");
reset.classList.add("hiddenbtn")
let time = document.querySelector(".timer");
let soundwin = new Audio("./sounds/preview-2.mp3");
let soundlose = new Audio("./sounds/losing-horn-313723.mp3");
let note = document.querySelector(".note");
let rem = 10;
let isRun = true;
let showover = false;
let isWin = false;
let game;           
let timerInterval;

document.addEventListener("keyup", function control(happen){

    if(way.x === 0 && way.y ===0){
        if(!timerInterval){
            timerInterval = setInterval(timing,1000)
        }
        isRun= true;
        reset.classList.remove("hiddenbtn");
        note.classList.add("hiddenbtn");
    }

    if(happen.key === "ArrowUp" && way.y !== 1  && isRun === true){
        way = {x:0,y:-1};
        console.log("ArrowUp");
    }else if (happen.key === "ArrowDown" && way.y !== -1 && isRun === true){
        way ={x:0,y:1};
        console.log("ArrowDown");
    }else if(happen.key === "ArrowRight" && way.x !== -1 && isRun === true){
        way = {x:1,y:0};
        console.log("ArrowRight");
    }else if(happen.key === "ArrowLeft" && way.x !== 1 && isRun === true){
        way = {x:-1,y:0};
        console.log("ArrowLeft");
    }
})

reset.addEventListener("click",function(){
        ate = {x:Math.floor(Math.random()*20), y:Math.floor(Math.random()*20)};
        bornSnake = [{x:Math.floor(Math.random()*20),y:Math.floor(Math.random()*20)}];
        way = {x:0 , y:0};
        score.innerHTML = "Score: 0";
        showover = false;
        isWin = false;
        isRun = false;
        rem =60;
        time.innerHTML = "0:10";
        clearInterval(timerInterval);
        timerInterval = null;
        const card =document.querySelector(".GameOver");
        reset.classList.add("hiddenbtn");
        note.classList.remove("hiddenbtn");
        if(card){
            card.remove();
        }
        littleSnake();
        clearInterval(game);
        game = setInterval(function(){
            if(isRun === true){
                movingSnake(), littleSnake(),gameOver(),uWin();
            }
        },200)
});

function littleSnake(){
    border.innerHTML=""
    for(let i = 0 ; i< 400;i++){
        const block = document.createElement("div");
        block.classList = "block";
        let x = i % 20 ;
        let y = Math.floor(i/20);
        for(let j = 0; j <bornSnake.length ; j++){
            if(bornSnake[j].x === x && bornSnake[j].y === y){
            block.className ="snake";
        }
            if(ate.x === x && ate.y === y && !checkFood()){
                 block.className = "food";
            }
        }
            
    
        border.appendChild(block);
    }
}
function movingSnake(){
    const HeadSnake= {
            x: bornSnake[0].x + way.x,
            y: bornSnake[0].y + way.y
    }
  
    bornSnake.unshift(HeadSnake);

    if(HeadSnake.x === ate.x && HeadSnake.y === ate.y){
        ate = {x: Math.floor(Math.random()*20) , y: Math.floor(Math.random()*20)}
       let value = parseInt(score.innerText.split(":")[1] || 0);
        score.textContent =`Score:${value + 1}`;
    }else {
        bornSnake.pop();
    }
}
function gameOver(){
    
    if(bornSnake[0].x < 0){
        isRun = false;
    }else if(bornSnake[0].x >= 20){
        isRun = false;
    }else if(bornSnake[0].y < 0){
        isRun = false;
    }else if(bornSnake[0].y >= 20){
        isRun = false;
    }

    for(let i = 1 ; i<bornSnake.length ; i+=1){
        if(bornSnake[i].x === bornSnake [0].x && bornSnake[i].y === bornSnake[0].y){
            isRun = false;
            reset.classList.add("hiddenbtn");
        }
    }
    if(isRun === false && !showover){
        card=document.createElement("div");
        card.className = "GameOver";
        card.innerText= "Game Over!";
        border.appendChild(card);
        showover = true;
        soundlose.volume = 0.5;
        soundlose.play();
        reset.classList.remove("hiddenbtn");
    }

}

function timing(){
    if(isRun === true){
        if(rem >= 0){
            let min = Math.floor(rem/60);
            let sec = rem % 60;
            let showSec;
            if(sec < 10){
                showSec = "0" + sec;
            }else{
                showSec = sec;
            }
            time.innerHTML = `${min}:${showSec}`;
            
        }
    }else if(rem <0){
        isRun = false;
    }
    rem--;
}

function checkFood(){
    for(let i =0 ; i < bornSnake.length ; i++){
        if(ate.x === bornSnake[i].x && ate.y === bornSnake[i].y){
            return true;
        }
    }
    return false;
}

function uWin()
{
        if(time.innerHTML === `0:00` && isWin === false){
            isWin =true;
      let win = document.createElement("div");
        win.className = "win";
        win.innerHTML = "🥳 congrates you win 🥳";
        border.appendChild(win);
        soundwin.volume = 0.5;
        soundwin.play();
        reset.classList.remove("hiddenbtn")
    }
}

function showbtn(){
    
    if(isRun === true ){
        reset.classList.remove("hiddenbtn");
    }
}

 game = setInterval(function(){
    if(isRun === true && isWin === false){
       littleSnake(),movingSnake(),gameOver(),uWin();
    }else{
        showbtn();
        clearInterval(game);
    }
  
},200);