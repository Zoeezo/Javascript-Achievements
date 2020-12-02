// variables
const canvasWidth = 1000;
const canvasHeight = 700;
const playerSpeed = 5;
const playerSize = 55;
const barrierSize = 20;
const enemySize = 40;
const enemyMaxMove = 340;

let highscores = []

for(x = 0; x < 5; x++) {
    let score = localStorage.getItem(x + 1);

    if(score == null) {
        localStorage.setItem(x + 1, 0);
        score = 0;
    }

    highscores.push(parseInt(score));
}

let menu = true;    
let game = false;
let endscreen = false;

let playerX = canvasWidth / 2;
let playerStatus = 'alive';
let time = 0;
let playerBullets = [];
let lives = 3;

let enemiesPresent = [];
let barriers = [];

let shootDelay = 30;
let lastShot = shootDelay;

let score = 0;

let direction = 'right';
let enemySpeed = 1;
let enemyBullets = [];

let left = false;
let right = false;

let playerImg;
let bulletImg;
let enemy1Img;
let enemy2Img;
let enemy3Img;
let enemy4Img;

let dead1Img;
let dead2Img;

let barrier1Img;
let barrier2Img;

// p5js native functions
function preload() {
    playerImg = loadImage('assets/ship.png');
    bulletImg = loadImage('assets/bullet.png');

    enemy1Img = loadImage('assets/enemy_1.png');
    enemy2Img = loadImage('assets/enemy_2.png');
    enemy3Img = loadImage('assets/enemy_3.png');
    enemy4Img = loadImage('assets/enemy_4.png');

    dead1Img = loadImage('assets/dead_1.png');
    dead2Img = loadImage('assets/dead_2.png');

    barrier1Img = loadImage('assets/barrier_1.png');
    barrier2Img = loadImage('assets/barrier_2.png')
}

function setup() {
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.style('outline', '5px solid black');

    createEnemies();
    createObstacles();
}   

function draw() {
    background(31, 40, 51);

    if(menu) {
        displayMenu();
        setCursor();
    }

    else if(game) {
        if(enemiesPresent.length == 0) {
            createEnemies();

            barriers = [];
            createObstacles();

            playerX = canvasWidth / 2;
            enemySpeed += 1;
        }

        player();
        enemies();
        divider();
        gameScore();
        gameLives();
        bullets();
        obstacles();

        lastShot += 1;

        if(lives == 0) {
            updateHighscores();
            game = false;
            endscreen = true;
            reset();
        }
    }

    else if (endscreen) {
        displayEndscreen();
        setEndscreenCursor();
    }
}

function mouseClicked() {
    if(menu) {
        checkButtonClick();
    }

    else if(game) {
        playerShoot();
    }

    else if(endscreen) {
        checkEndscreenButtonClick();
    }
}

function keyPressed() {
    if(game) {
        gameKeyPressed(keyCode);
    }
}

function keyReleased() {
    if(game) {
        gameKeyReleased(keyCode);
    }
}

// Main menu functions
function displayMenu() {
    let width = 100;
    let height = 50;

    let posX = canvasWidth / 2 - width / 2;
    let posY = canvasHeight / 2 - height / 2;

    fill(174, 198, 207)
    textSize(80)
    text('Space invaders', canvasWidth / 5, canvasHeight / 4);
    fill(56, 74, 94);
    rect(posX, posY, width, height, 20);

    textSize(30);
    fill(174, 198, 207)
    text('Play', canvasWidth / 2 - 30, canvasHeight / 2 + 10);

    text('Highscores', 50, canvasHeight - 230);
    textSize(20);
    let tempY = canvasHeight - 190;
    for(x = 0; x < 5; x++) {
        text(`${x + 1}: ${highscores[x]}`, 50, tempY);
        tempY += 35;
    }
}

function checkButtonClick() {
    let width = 100;
    let height = 50;

    let posX = canvasWidth / 2 - width / 2;
    let posY = canvasHeight / 2 - height / 2;

    if(mouseX > posX && mouseX < posX + width && mouseY > posY && mouseY < posY + height) {
        menu = false;
        game = true;
        document.body.style.cursor = 'auto';
    }
}

function setCursor() {
    let width = 100;
    let height = 50;

    let posX = canvasWidth / 2 - width / 2;
    let posY = canvasHeight / 2 - height / 2;

    if(mouseX > posX && mouseX < posX + width && mouseY > posY && mouseY < posY + height) {
        document.body.style.cursor = 'pointer';
    } else {
        document.body.style.cursor = 'auto';
    }
}

// Game functions
function player() {
    let posX = playerX;

    if(playerStatus == 'alive') {
        if(left) {
            posX = posX - playerSpeed;
    
        } else if(right) {
            posX = posX + playerSpeed;
        }
    
        if(posX < 100) {
            posX = 100;
        }
        else if(posX > canvasWidth - 100) {
            posX = canvasWidth - 100;
        }
    }

    playerX = posX;

    if(playerStatus == 'dead') {
        if(time == 50) {
            playerX = canvasWidth / 2;
            playerStatus = 'alive';
            time = 0;
        } else {
            if(time % 10 == 0) {
                image(dead1Img, posX, canvasHeight - 120);
            } else {
                image(dead2Img, posX, canvasHeight - 120); 
            }
            time += 1;
        }
    }

    if(playerStatus == 'alive') {
        image(playerImg, posX, canvasHeight - 120);
    } 
}

function playerShoot() {
    if(lastShot < shootDelay) {
        return;
    }

    let x = playerX + (55 / 2);
    let y = canvasHeight - 150;

    playerBullets.push([x, y]);
    lastShot = 0;
    score += 1;
}

function enemyShoot(x, y) {
    enemyBullets.push([x,y]);
}

function bullets() {
    playerBullets.forEach((bullet, index) => {
        let x = bullet[0];
        let y = bullet[1] - 10;
        let bulletIndex = index;

        if(y < 0) {
            playerBullets.splice(index, 1);
            return;
        }

        barriers.forEach(barrier => {
            if(x > barrier[0] && x < barrier[0] + barrierSize && y > barrier[1] && y < barrier[1] + barrierSize) {
                playerBullets.splice(bulletIndex, 1);
            }
        });

        enemiesPresent.forEach((enemy) => {
            enemyX = enemy[0];
            enemyY = enemy[1];

            if(x > enemyX && x < enemyX + enemySize && y > enemyY && y < enemyY + enemySize && enemy[4] == 'alive') {
                enemy[4] = 'dead';
                playerBullets.splice(bulletIndex, 1);
                score += 10;
                return;
            }
        });

        image(bulletImg, x, y);
        bullet[1] = y;
    });

    enemyBullets.forEach((bullet, index) => {
        let x = bullet[0];
        let y = bullet[1] + 10;
        let bulletIndex = index;

        if(y > canvasHeight - 50) {
            enemyBullets.splice(index, 1);
            return;
        }

        barriers.forEach(barrier => {
            if(x > barrier[0] && x < barrier[0] + barrierSize && y > barrier[1] && y < barrier[1] + barrierSize) {
                enemyBullets.splice(bulletIndex, 1);
                barrier[2] -= 1;
            }
        });

        if(x > playerX && x < playerX + playerSize && y > canvasHeight - 120 && y < canvasHeight - 120 + playerSize) {
            playerStatus = 'dead';

            enemyBullets.splice(0, enemyBullets.length);
            playerBullets.splice(0, playerBullets.length);

            lives -= 1;
            return;
        }

        image(bulletImg, x, y);
        bullet[1] = y;
    });
}

function enemies() {
    enemiesPresent.forEach((enemy, index) => {
        let x = enemy[0];
        let y = enemy[1];

        if(enemy[4] == 'alive') {
            if(direction == 'right') {
                x += enemySpeed;
    
                if(x > enemy[2] + enemyMaxMove) {
                    direction = 'left';
                    x = enemy[2] + enemyMaxMove;
                }
            } 
    
            else if(direction == 'left') {
                x -= enemySpeed;
    
                if(x < enemy[2]) {
                    direction = 'right';
                    x = enemy[2];
                }
            }
        }

        enemy[0] = x;
        enemyImage = `enemy${enemy[3]}Img`;

        if(enemy[4] == 'dead' && enemy[5] % 10 == 0) {
            enemyImage = `dead1Img`;
        } else if(enemy[4] == 'dead') {
            enemyImage = `dead2Img`
        }

        image(eval(enemyImage), x, y);
        
        if(enemy[4] == 'alive' && playerStatus == 'alive') {
            let random = Math.floor(Math.random() * (enemiesPresent.length * 30));
            if(random == 69) {
                enemyShoot(x, y);
            }
        } else if(enemy[4] == 'dead') {
            if(enemy[5] == 50) {
                enemiesPresent.splice(index, 1);
            } else {
                enemy[5] += 1;
            }
        }
    }); 
}

function createEnemies() {
    let tempX = 100;
    let tempY = 50;
    for(x = 0; x < 4; x++) {
        for(y = 0; y < 8; y++) {
            let enemy = [tempX, tempY, tempX, x + 1, 'alive', 0];
            enemiesPresent.push(enemy);
            tempX += 70;
        }

        tempX = 100;
        tempY += 70;
    }
}

function createObstacles() {
    let tempX = 150;
    let tempY = canvasHeight - 200;
    for(x = 0; x < 2; x++) {
        for(y = 0; y < 3; y++) {
            for(z = 0; z < 6; z++) {
                let barrier = [tempX, tempY, 3];
                barriers.push(barrier);
                tempX += 20;
            }

            tempX += 200;
        }

        tempX = 150;
        tempY += 20;
    }
}

function obstacles() {
    barriers.forEach((barrier, index)=> {
        let x = barrier[0];
        let y = barrier[1];

        if(barrier[2] == 3) {
            image(barrier1Img, x, y);    
        } else if(barrier[2] == 2) {
            image(barrier2Img, x, y);
        } else {
            barriers.splice(index, 1);
        }
        
    });
}

function divider() {
    fill(255);
    rect(0, canvasHeight - 50, canvasWidth, 5);
}

function gameScore() {
    fill(255, 255, 255);
    textSize(25);
    text(`score: ${score}`, 10, canvasHeight - 15);
}

function gameLives() {
    fill(255, 255, 255);
    textSize(25);
    text(`lives: ${lives}`, canvasWidth - 90, canvasHeight - 15);
}

function updateHighscores() {
    highscores.push(score);
    highscores.sort((a, b) => b - a);
    highscores.splice(5);

    highscores.forEach((score, index) => {
        localStorage.setItem(index + 1, score);
    });
}

function gameKeyPressed(keyCode) {
    if(keyCode == 65) {
        left = true;
    } else if(keyCode == 68) {
        right = true;
    }

    if(keyCode == 32) {
        playerShoot
    ();
    }
}

function gameKeyReleased(keyCode) {
    if(keyCode == 65) {
        left = false;
    } else if(keyCode == 68) {
        right = false;
    }
}

function reset() {
    playerX = canvasWidth / 2;
    playerBullets = [];
    lives = 3;
    time = 0;
    playerStatus = 'alive';

    enemiesPresent = [];
    barriers = [];

    shootDelay = 30;
    lastShot = shootDelay;

    direction = 'right';
    enemySpeed = 1;
    enemyBullets = [];

    left = false;
    right = false;

    createEnemies();
    createObstacles();
}

// Endscreen functions
function displayEndscreen() {
    let width = 200;
    let height = 50;

    let posX = canvasWidth / 2 - width / 2;
    let posY = canvasHeight / 2 - height / 2;

    fill(174, 198, 207)
    textSize(80)
    text(`Your score was ${score}!`, canvasWidth / 5, canvasHeight / 4);
    fill(56, 74, 94);
    rect(posX, posY, width, height, 20);

    textSize(30);
    fill(174, 198, 207)
    text('Play again', canvasWidth / 2 - 70, canvasHeight / 2 + 10);

    text('Highscores', 50, canvasHeight - 230);
    textSize(20);
    let tempY = canvasHeight - 190;
    for(x = 0; x < 5; x++) {
        text(`${x + 1}: ${highscores[x]}`, 50, tempY);
        tempY += 35;
    }
}

function checkEndscreenButtonClick() {
    let width = 200;
    let height = 50;

    let posX = canvasWidth / 2 - width / 2;
    let posY = canvasHeight / 2 - height / 2;

    if(mouseX > posX && mouseX < posX + width && mouseY > posY && mouseY < posY + height) {
        endscreen = false;
        game = true;
        score = 0;
        document.body.style.cursor = 'auto';
    }
}

function setEndscreenCursor() {
    let width = 200;
    let height = 50;

    let posX = canvasWidth / 2 - width / 2;
    let posY = canvasHeight / 2 - height / 2;

    if(mouseX > posX && mouseX < posX + width && mouseY > posY && mouseY < posY + height) {
        document.body.style.cursor = 'pointer';
    } else {
        document.body.style.cursor = 'auto';
    }
}