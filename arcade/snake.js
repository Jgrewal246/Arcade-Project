const canvas = document.getElementById('game');
const context = canvas.getContext('2d');


class SnakeBody{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
}

let speed = 7;
let numOfTiles = Math.sqrt(canvas.width);
let tileSize = canvas.width / numOfTiles -2;
let headPosX = numOfTiles/2;
let headPosY = numOfTiles/2;

let xSpd = 0;
let ySpd = 0;

let foodPosX = headPosX/2
let foodPosY = headPosY/2;
const snakeBody = [];
let bodyLength = 2;
let score = 0;

//game loop
function startSnakeGame() {
	snakeMovement();

	let endGame = badCollision();
	if (endGame){
		return;
	}

	makeBlackBackground();
	checkAppleCollision();
	createFoodPiece();
	updateSnake();
	updateScore();
	speed = 7 + Math.floor(bodyLength/4);
	setTimeout(startSnakeGame, 1000/speed);
}

function badCollision(){
	let stopGame = false;

	// If the game hasn't started yet do not return
	if(ySpd === 0 && xSpd === 0){
		return false;
	}

	//walls
	if ( headPosX < 0) {
		stopGame = true;
	}
	else if ( headPosX === numOfTiles){
		stopGame = true;
	}
	else if ( headPosY < 0){
		stopGame = true;
	}
	else if(headPosY === numOfTiles){
		stopGame = true;
	}

	for (let i = 0; i < snakeBody.length; i++){
		let bodyPart = snakeBody[i];
		if (bodyPart.x === headPosX && bodyPart.y === headPosY){
			stopGame = true;
			break;
		}
	}

	if ( stopGame){
		context.fillStyle = "white";
		context.font = "50px Verdinia";
		context.fillText("Game Over!!!", canvas.width / 4, canvas.height/2);
	}
	return stopGame;
}

function updateScore() {
	context.fillStyle = "white";
	context.font = "13px Verdana";
	context.fillText("Score: " + score, canvas.width-65, 15);

}

function makeBlackBackground() {
	context.fillStyle = 'black';
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function updateSnake(){

	context.fillStyle = 'green';
	for ( let i = 0; i < snakeBody.length; i++){
		let bodyPart = snakeBody[i];
		context.fillRect(bodyPart.x * numOfTiles, bodyPart.y * numOfTiles, tileSize, tileSize);
	}

	snakeBody.push(new SnakeBody(headPosX, headPosY)); //put an item at the end of the list next to the head
	if (snakeBody.length > bodyLength) {
		snakeBody.shift(); // remove the furthest item from the snake bodyParts
	}

	context.fillStyle = 'purple';
	context.fillRect(headPosX * numOfTiles, headPosY * numOfTiles, tileSize, tileSize);
}

function snakeMovement() {
	headPosX = headPosX + xSpd;
	headPosY = headPosY + ySpd;
}

function createFoodPiece() {
	context.fillStyle = 'red';
	context.fillRect(foodPosX * numOfTiles, foodPosY * numOfTiles, tileSize, tileSize);
}

function checkAppleCollision() {

	// if the snake ate the food
	if (foodPosX === headPosX && foodPosY === headPosY) {

		// spawn a new apple at a random postiion
		foodPosX = Math.floor(Math.random() * numOfTiles);
		foodPosY = Math.floor(Math.random() * numOfTiles);

		// increase the size of the snake by 1
		bodyLength++;
		score++;
	}
}

document.body.addEventListener('keydown', moveSnakeWithKeys);

function moveSnakeWithKeys(event){
	//up key
	if(event.keyCode == 38) {
		// don't go up if already going down
		if (ySpd == 1){
			return;
		}
		ySpd = -1;
		xSpd = 0;
	}

	//down key
	if(event.keyCode == 40) {

		// don't down up if already going up
		if (ySpd == -1){
			return;
		}
		ySpd = 1;
		xSpd = 0;
	}

	//left key
	if(event.keyCode == 37) {

		// don't go left if already going right
		if (xSpd == 1){
			return
		}
		ySpd = 0;
		xSpd = -1;
	}

	//right key
	if(event.keyCode == 39) {

		// don't go right if already going left
		if (xSpd == -1){
			return;
		}
		ySpd = 0;
		xSpd = 1;
	}
}

startSnakeGame();