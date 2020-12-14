//---- GLOBAL VARIABLES ----//
// let game: Game;

let numSegments = 10;
let direction = 'right';

const xStart = 0; //starting x coordinate for snake
const yStart = 250; //starting y coordinate for snake
const diff = 10;

let xCor : number[]= [];
let yCor : number[]= [];
let scoreElement : any;

let xFruit : number;
let yFruit : number;

function setup() {
    scoreElement = createDiv('Score: 0');
    scoreElement.position(20, 20);
    scoreElement.id = 'score';
    scoreElement.style('color', 'white');
    createCanvas(800, 500);
    frameRate(15);
    stroke(255);
    strokeWeight(10);
    noCursor();
    updateFruitCoordinates();

    for (let i = 0; i < numSegments; i++) {
        xCor.push(xStart + i * diff);
        yCor.push(yStart);
    }
    // game = new Game();
}

function draw() {
    background('aqua');
        stroke('white')
        for (let i = 0; i < numSegments - 1; i++) {
        
        line(xCor[i], yCor[i], xCor[i + 1], yCor[i + 1]);
        }
        updateSnakeCoordinates();
        checkForFruit();
        checkGameStatus();

    // game.update();
    // game.draw();
}

/** updates the snake segments according to the direction of the snake */
function updateSnakeCoordinates() {
    for (let i = 0; i < numSegments - 1; i++) {
      xCor[i] = xCor[i + 1];
      yCor[i] = yCor[i + 1];
    }
    switch (direction) {
      case 'right':
        xCor[numSegments - 1] = xCor[numSegments - 2] + diff;
        yCor[numSegments - 1] = yCor[numSegments - 2];
        break;
      case 'up':
        xCor[numSegments - 1] = xCor[numSegments - 2];
        yCor[numSegments - 1] = yCor[numSegments - 2] - diff;
        break;
      case 'left':
        xCor[numSegments - 1] = xCor[numSegments - 2] - diff;
        yCor[numSegments - 1] = yCor[numSegments - 2];
        break;
      case 'down':
        xCor[numSegments - 1] = xCor[numSegments - 2];
        yCor[numSegments - 1] = yCor[numSegments - 2] + diff;
        break;
    }
  }

  /** checks if the snake touches the edges or itself */
  function checkGameStatus() {
    if (
      xCor[xCor.length - 1] > width ||
      xCor[xCor.length - 1] < 0 ||
      yCor[yCor.length - 1] > height ||
      yCor[yCor.length - 1] < 0 ||
      checkSnakeCollision()
    ) {
      noLoop();
      const scoreVal = parseInt(scoreElement.html().substring(8));
      scoreElement.html('Game over! Your score was : ' + scoreVal);
    }
  }
  
  /** checks if the snake's head collides with its body */

  function checkSnakeCollision() {
    const snakeHeadX = xCor[xCor.length - 1];
    const snakeHeadY = yCor[yCor.length - 1];
    for (let i = 0; i < xCor.length - 1; i++) {
        if (xCor[i] === snakeHeadX && yCor[i] === snakeHeadY) {
            return true;
        }
    }
    return false;
  }


function checkForFruit() {
    stroke('red');
    point(xFruit, yFruit);
    if (xCor[xCor.length - 1] === xFruit && yCor[yCor.length - 1] === yFruit) {
      const prevScore = parseInt(scoreElement.html().substring(8));
      scoreElement.html('Score : ' + (prevScore + 1));
      xCor.unshift(xCor[0]);
      yCor.unshift(yCor[0]);
      numSegments++;
      updateFruitCoordinates();
    }
  }
  
  function updateFruitCoordinates() {
    /*
      The complex math logic is because I wanted the point to lie
      in between 100 and width-100, and be rounded off to the nearest
      number divisible by 10, since I move the snake in multiples of 10.
    */
  
    xFruit = floor(random(10, (width - 100) / 10)) * 10;
    yFruit = floor(random(10, (height - 100) / 10)) * 10;
  }

  function keyPressed() {
    switch (keyCode) {
      case LEFT_ARROW:
        if (direction !== 'right') {
          direction = 'left';
        }
        break;
      case RIGHT_ARROW:
        if (direction !== 'left') {
          direction = 'right';
        }
        break;
      case UP_ARROW:
        if (direction !== 'down') {
          direction = 'up';
        }
        break;
      case DOWN_ARROW:
        if (direction !== 'up') {
          direction = 'down';
        }
        break;
    }
  }