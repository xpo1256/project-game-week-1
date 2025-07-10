const boarder = document.getElementById("boarder");
const boraderSize = 20;
let score = 0; 
let snake = document.querySelector(".snake")
snake = [{x:10, y:10}];
way = {x:0, y:0};



document.addEventListener('keydown' , function move(event){
    if(event.key === "ArrowUp"){
        console.log("ArrowUp");
        way = {x:0 ,y:-1};
    }else if(event.key === "ArrowDown"){
        console.log("ArrowDown");
        way = {x:0 ,y:1};
    }else if(event.key === "ArrowRight"){
        console.log('ArrowRight');
        way = {x:1 ,y:0};
    }else if(event.key === "ArrowLeft"){
        console.log("ArrowLeft");
        way = {x:-1 ,y:0};
        
    }

 } )

 
 function move(){
    
 }
