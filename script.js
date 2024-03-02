// game constant and variables

let inputDir = {x: 0, y:0};
const foodSound = new Audio("food.mp3");
const gameOverSound = new Audio("gameover.mp3");
const moveSound = new Audio("move.mp3");
const themeSound = new Audio("theme.mp3");
let lastPaintTime = 0;
let speed = 10;
let score = 0;
let snakeArr = [{x:13, y:15}];
let food = {x: 10, y:2};


// Game Functions
const main = (ctime)=>{
   window.requestAnimationFrame(main);
   // console.log(ctime);
   if((ctime-lastPaintTime)/1000 < 1/speed){
      return;
   }
   lastPaintTime = ctime;
   gameEngine();
}

// when snake collides
const isCollide = (snake)=>{
   // if snake bumps into itself
   for (let i=1; i<snakeArr.length; i++){
      if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
         return true;
      }
   }

   // Bumps into a wall
   if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
      return true;
   }
   
}

function gameEngine(){
   themeSound.play();
   themeSound.volume = 0.06;
   // part 1 -- updating snake array and food
   if(isCollide(snakeArr)){
      gameOverSound.play();
      gameOverSound.volume = 0.1;
      themeSound.pause();
      inputDir = {x:0, y:0};
      alert("Game Over 💀");
      snakeArr = [{x:13, y:15}];
      themeSound.play();
      score = 0;
      scoreBox.innerHTML = "Score: " + 0;
   }

   // If food is eaten then increment the score and regenerate the food
   if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
      foodSound.play();
      foodSound.volume = 0.1;
      score++;
      scoreBox.innerHTML = "Score: " + score;
      snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
      let a = 2;
      let b = 16;
      food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};
      
   }

   // moving the snake
   for(let i=snakeArr.length-2; i>=0; i--){
      snakeArr[i+1] = {...snakeArr[i]};
   }
   snakeArr[0].x += inputDir.x;
   snakeArr[0].y += inputDir.y;

   // part 2 -- rendering the snake
   board.innerHTML = "";
   snakeArr.forEach((e, index)=>{
      snakeElement = document.createElement('div');
      snakeElement.style.gridRowStart = e.y;
      snakeElement.style.gridColumnStart = e.x;
      if(index == 0){
         snakeElement.classList.add('head');
      }
      else{
         snakeElement.classList.add('snakeBody');
      }
      board.appendChild(snakeElement);
   });

   // part 3 -- rendering the food
   
   foodElement = document.createElement('div');
   foodElement.style.gridRowStart = food.y;
   foodElement.style.gridColumnStart = food.x;
   foodElement.classList.add('food');
   board.appendChild(foodElement);
   



}




// Game Logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
   inputDir = {x:0, y:1} //start the game
   moveSound.play();
   moveSound.volume = 0.1;
   switch (e.key) {
      case "ArrowUp":
         inputDir.x = 0;
         inputDir.y = -1;
         console.log("ArrowUp")
         break;

      case "ArrowDown":
         inputDir.x = 0;
         inputDir.y = 1;
         console.log("ArrowDown")
         break;

      case "ArrowLeft":
         inputDir.x = -1;
         inputDir.y = 0;
         console.log("ArrowL")
         break;

      case "ArrowRight":
         inputDir.x = 1;
         inputDir.y = 0;
         console.log("ArrowR")
         break;

      default:
         break;
   }
});