let diametro = 400;
let tiri = [];
let punteggio = 0;
let effects = [];

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent('p5-container');
    noLoop(); // Solo disegna quando serve
    drawScene();
}

function draw() {
    drawScene();
    drawEffects();
}

function drawScene() {
    background(240);

    // Bersaglio stilizzato
    for (let i = 0; i < 5; i++) {
        const ratio = (diametro - i * 80) / diametro;
        let col = i % 2 === 0 ? color(255, 50, 50) : color(250);
        fill(col);
        stroke(80);
        strokeWeight(2);
        circle(width / 2, height / 2, diametro - i * 80);
    }

    drawShots();
}

function drawShots() {
    textSize(24);
    textAlign(CENTER, CENTER);
    for (let shot of tiri) {
        stroke(0);
        strokeWeight(1);
        fill(0);
        text('➤', shot.x, shot.y);
    }
}

function mouseClicked() {
    if (!mouseInsideCanvas()) return;

    let d = dist(mouseX, mouseY, width / 2, height / 2);
    let r = diametro / 2;

    if (d <= r) {
        tiri.push({ x: mouseX, y: mouseY });

        // Calcolo punteggio
        let maxScore = 100;
        let shotScore = Math.max(
            0,
            Math.round(maxScore - (d / r) * maxScore)
        );
        punteggio += shotScore;

        // Effetto punteggio fluttuante
        createFloatingScore(mouseX, mouseY, shotScore);
        updateScore();
        redraw();
    }
}

function mouseInsideCanvas() {
    return (
        mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height
    );
}

function startGame() {
    tiri = [];
    punteggio = 0;
    updateScore();
    clearFloatingScores();
    redraw();
}

function restartGame() {
    startGame();
}

function updateScore() {
    document.getElementById('score').textContent =
        'Punteggio: ' + punteggio;
}

function createFloatingScore(x, y, points) {
    let div = document.createElement('div');
    div.className = 'score-float';
    div.style.left = `${x + canvas.offsetLeft - 10}px`;
    div.style.top = `${y + canvas.offsetTop - 10}px`;
    div.textContent = `+${points}`;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 1000);
}

function drawEffects() {
    // Placeholder per future animazioni
}

function clearFloatingScores() {
    document.querySelectorAll('.score-float').forEach((el) => el.remove());
}
