({//Plugin
    "plugins": ["jsdom-quokka-plugin"]
});


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");




canvas.width = 600;
canvas.height = 600;
let buttons = document.getElementsByTagName("button");
let time = document.getElementById("time");
let healthBar = document.querySelector("#timeBar");
let objWidth = 10;
let difficulty = 20;
let positionY = Math.floor(Math.random() * 300);
let positionX = Math.floor(Math.random() * 300);
let timer = 0;
let barTimer = 0;
let score = 0;
let miss = 0;
let gameTime = 0;
let gameTimer;
let mouseY;
let mouseX;
let a;

function draw(ctx) {
    if (gameTime == 0) {
        alert("Bitte wähle eine Schwierigkeit");
        return;
    }
    a = 0;
    score = 0;
    timer = 0;
    barTimer = 0;
    stopGame();
    objSpawn(ctx);
    barTimer++;
    let barX = (barTimer * 1000) / gameTime * 100;
    let bar = 100 - barX;
    healthBar.style.width = bar + "%";
    gameTimer = setInterval(() => {
        timer++;
        barTimer++;
        barX = (barTimer * 1000) / gameTime * 100;
        bar = 100 - barX;
        document.getElementById("timer").innerHTML = "Time: " + timer;
        healthBar.style.width = bar + "%";
    }, 1000);

};

objSpawn = (ctx) => {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(positionX, positionY, objWidth, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    // console.log("m");
};


document.addEventListener("mousemove", (e) => {
    const anchor = document.getElementById('canvas');
    let rekt = anchor.getBoundingClientRect();
    mouseX = Math.floor(e.clientX - rekt.left);
    mouseY = Math.floor(e.clientY - rekt.top);
    // console.log("pos mouse");
    // console.log(mouseX);
    // console.log(mouseY);
    // console.log("posi kreis");
    // console.log(positionX);
    // console.log(positionY);
    // console.log(rekt.top);
    // console.log(rekt.left);

});


canvas.addEventListener("click", () => {
    // console.log("asd");
    if ((mouseY >= positionY - objWidth && mouseY <= positionY + objWidth) && (mouseX >= positionX - objWidth && mouseX <= positionX + objWidth)) {
        console.log("pnis");
        score++;
        positionY = Math.floor(Math.random() * 300);
        positionX = Math.floor(Math.random() * 300);
        ctx.reset();
        objSpawn(ctx);
        console.log(score);
        document.getElementById("counter").innerHTML = "Score: " + score;

    } else {
        console.log("leider daneben");
        miss++;
        stopGame();
        document.getElementById("missed").innerHTML = "Missed: " + miss;
    }

});



startGame = () => {
    draw(ctx);
};

for (let button of buttons) {
    button.addEventListener("click", (e) => {
        let choose = e.target.innerHTML;
        switch (choose) {
            case "to Easy":
                gameTime = 1 * 30000 + 100;
                objWidth = 50;
                break;
            case "Easy":
                gameTime = 1 * 30000 + 100;
                objWidth = 30;
                break;
            case "Medium":
                gameTime = 1 * 30000 + 100;
                objWidth = 20;
                break;
            case "Hard":
                gameTime = 1 * 30000 + 100;
                objWidth = 10;
                break;
            case "Ultra Hard":
                gameTime = 1 * 30000 + 100;
                objWidth = 5;


                console.log(gameTime);
        }
    });
}
stopGame = () => {
    setTimeout(() => {
        // alert("penis");
        ctx.reset();
        healthBar.style.width = 0;
        if (a == 0) {
            alert(`Glückwunsch du hast ${score} getroffen, ${miss} nicht getroffen!`);
            a++;
        }
        clearInterval(gameTimer);
    }, gameTime);

};