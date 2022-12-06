import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const restart = document.getElementById("reset");

canvas.width = 600;
canvas.height = 600;

const background = new Image();
/*
TO CHANGE IMAGE CHANGE HERE
*/
background.src = 'assets/images/space.png'; 

const playerBulletController = new BulletController(canvas, 10, "red", true);
const enemyBulletController = new BulletController(canvas, 4, "white", false);
const enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController);
const player = new Player(canvas, 3, playerBulletController);

var isGameOver = false;
var didWin = false;
var timeElapsed = 0;

function game(){
    timeElapsed++;
    checkGameOver();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displayGameOver();
    if(!isGameOver){
        enemyController.draw(ctx);
        player.draw(ctx);
        playerBulletController.draw(ctx);
        enemyBulletController.draw(ctx);
    }
}


function displayGameOver(){
    if(isGameOver){
        clearInterval(play);   
        let text = didWin ? "You Win! :) \n" : "Game Over :( \n";
        let textOffset = didWin ? 3.5 : 6;
        ctx.fillStyle = "white";
        ctx.font = "60px Arial";
        ctx.fillText(text, canvas.width / textOffset, canvas.height / 3);
        ctx.font = "30px Arial";
        ctx.fillText("Score: " + enemyController.kills, canvas.width / textOffset , canvas.height * 0.6);
        ctx.fillText("Time elapsed: " + timeElapsed/1000 + "s", canvas.width / textOffset , canvas.height * 0.7);
    }
}

function checkGameOver(){
    if(isGameOver){
        return;
    }

    if(enemyBulletController.collideWith(player)){
        isGameOver = true;
    }

    if(enemyController.collideWith(player)){
        isGameOver = true;
    }

    if(enemyController.enemyRows.length === 0){
        didWin = true;
        isGameOver = true;
    }
}


restart.addEventListener('click', function(){
    window.location.reload();
    return false;
});



var play = setInterval(game,1000/60);

