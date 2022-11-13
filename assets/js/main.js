({//Plugin
    "plugins": ["jsdom-quokka-plugin"]
});


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");




canvas.width = 600;
canvas.height = 600;
let anchor = document.getElementById('canvas');
let rekt = anchor.getBoundingClientRect();
let buttons = document.getElementsByTagName("button");
let time = document.getElementById("time");
let healthBar = document.querySelector("#timeBar");
let objWidth = 10;
let difficulty = 20;
let positionY = Math.floor(Math.random() * 600);
let positionX = Math.floor(Math.random() * 600);
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
    anchor = document.getElementById('canvas');
    rekt = anchor.getBoundingClientRect();
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
    //     const anchor = document.getElementById('canvas');
    //     let rekt = anchor.getBoundingClientRect();
    if (gameTime == 0) {
        return;
    }
    if ((mouseY >= positionY - objWidth && mouseY <= positionY + objWidth) && (mouseX >= positionX - objWidth && mouseX <= positionX + objWidth)) {
        score++;
        positionY = Math.floor(Math.random() * 600);
        positionX = Math.floor(Math.random() * 600);
        if (positionX - objWidth < 0) {
            console.log(positionX);
            positionX = positionX + objWidth / 2;
            console.log(positionX);
        }
        if (positionX + objWidth > canvas.width) {
            console.log(positionX);
            positionX = positionX - objWidth / 2;
            console.log(positionX);
        }
        if (positionY - objWidth < 0) {
            positionY = positionY + objWidth / 2;
            console.log(positionY);
        }
        if (positionY + objWidth > canvas.height) {
            positionY = positionY - objWidth / 2;
            console.log(positionY);
        }

        ctx.reset();
        objSpawn(ctx);
        // console.log(score);
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

let input = document.getElementsByTagName("input");
let label = document.getElementsByTagName("label");

for (let inputs of input) {
    inputs.addEventListener("change", (e) => {
        if (e.target.id == "größeRange") {
            objWidth = Number(e.target.value);
            document.getElementById("größeOutput").innerHTML = objWidth;
        }
        if (e.target.id == "timeRange") {
            gameTime = Number(e.target.value) * 1000;
            document.getElementById("timeOutput").innerHTML = gameTime / 1000 + " Sekunden";
        }
    });
}
for (let button of buttons) {
    button.addEventListener("click", (e) => {
        for (let butStyle of buttons) {
            butStyle.style.border = "4px solid transparent";
        }
        label[0].style.display = "none";
        label[1].style.display = "none";
        let choose = e.target.innerHTML;
        switch (choose) {
            case "to Easy":
                gameTime = 1 * 30000 + 100;
                objWidth = 60;
                break;
            case "Easy":
                gameTime = 1 * 30000 + 100;
                objWidth = 50;
                break;
            case "Medium":
                gameTime = 1 * 30000 + 100;
                objWidth = 30;
                break;
            case "Hard":
                gameTime = 1 * 30000 + 100;
                objWidth = 20;
                break;
            case "Ultra Hard":
                gameTime = 1 * 30000 + 100;
                objWidth = 10;
                break;
            case "Custom":
                label[0].style.display = "flex";
                label[1].style.display = "flex";
        }
        e.target.style.border = "4px solid blueviolet";
        console.log(gameTime);
    });
}
stopGame = () => {
    setTimeout(() => {
        ctx.reset();
        healthBar.style.width = 0;
        if (a == 0) {
            alert(`Glückwunsch du hast ${score} getroffen, ${miss} nicht getroffen!`);
            a++;
        }
        clearInterval(gameTimer);
    }, gameTime);

};