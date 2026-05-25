const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score-display");
const gameOverScreen = document.getElementById("game-over-screen");

// Game variables
let bird;
let pipes = [];
let frameCount = 0;
let score = 0;
let gameOver = false;

// Physics constants
const GRAVITY = 0.25;
const JUMP = -5.5;
const PIPE_SPEED = 2;
const PIPE_SPAWN_RATE = 100; // frames between pipe spawns
const GAP_HEIGHT = 140;      // gap size between top and bottom pipes

// Initialize / Reset Game
function init() {
    bird = {
        x: 50,
        y: 250,
        velocity: 0,
        radius: 12
    };
    pipes = [];
    score = 0;
    frameCount = 0;
    gameOver = false;
    scoreDisplay.innerText = "Score: " + score;
    gameOverScreen.classList.add("hidden");
}

// Input handling (Spacebar or screen click/tap)
function handleJump() {
    if (gameOver) {
        init();
    } else {
        bird.velocity = JUMP;
    }
}

window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        e.preventDefault(); // Stop page from scrolling down
        handleJump();
    }
});

canvas.addEventListener("click", handleJump);

// Game Loop
function update() {
    if (gameOver) return;

    frameCount++;
    
    // Bird physics
    bird.velocity += GRAVITY;
    bird.y += bird.velocity;

    // Floor and Ceiling collisions
    if (bird.y + bird.radius >= canvas.height || bird.y - bird.radius <= 0) {
        endGame();
    }

    // Pipe management
    if (frameCount % PIPE_SPAWN_RATE === 0) {
        // Randomize the height of the gap
        const minHeight = 50;
        const maxHeight = canvas.height - GAP_HEIGHT - minHeight;
        const topHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

        pipes.push({
            x: canvas.width,
            topHeight: topHeight,
            passed: false
        });
    }

    // Update and check pipes
    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].x -= PIPE_SPEED;

        // Collision Check
        if (
            bird.x + bird.radius > pipes[i].x && 
            bird.x - bird.radius < pipes[i].x + 60 // 60 is pipe width
        ) {
            // Check if bird is inside top pipe or bottom pipe depth
            if (bird.y - bird.radius < pipes[i].topHeight || bird.y + bird.radius > pipes[i].topHeight + GAP_HEIGHT) {
                endGame();
            }
        }

        // Score tracking
        if (!pipes[i].passed && pipes[i].x + 30 < bird.x) {
            score++;
            pipes[i].passed = true;
            scoreDisplay.innerText = "Score: " + score;
        }

        // Remove off-screen pipes
        if (pipes[i].x + 60 < 0) {
            pipes.splice(i, 1);
        }
    }
}

// Drawing function
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Background Clouds/City (Simple geometric representation)
    ctx.fillStyle = "#d4ebd2";
    ctx.fillRect(0, canvas.height - 40, canvas.width, 40); // Ground base

    // Draw Pipes
    pipes.forEach(pipe => {
        ctx.fillStyle = "#73bf2e"; // Pipe green
        ctx.strokeStyle = "#538221";
        ctx.lineWidth = 3;

        // Top Pipe
        ctx.fillRect(pipe.x, 0, 60, pipe.topHeight);
        ctx.strokeRect(pipe.x, 0, 60, pipe.topHeight);
        
        // Bottom Pipe
        const bottomY = pipe.topHeight + GAP_HEIGHT;
        ctx.fillRect(pipe.x, bottomY, 60, canvas.height - bottomY);
        ctx.strokeRect(pipe.x, bottomY, 60, canvas.height - bottomY);

        // Pipe lips/rims
        ctx.fillStyle = "#96e043";
        ctx.fillRect(pipe.x - 3, pipe.topHeight - 20, 66, 20);
        ctx.strokeRect(pipe.x - 3, pipe.topHeight - 20, 66, 20);

        ctx.fillRect(pipe.x - 3, bottomY, 66, 20);
        ctx.strokeRect(pipe.x - 3, bottomY, 66, 20);
    });

    // Draw Bird
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#f7d308"; // Bird yellow body
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Eye
    ctx.beginPath();
    ctx.arc(bird.x + 4, bird.y - 4, 3, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.stroke();

    // Beak
    ctx.beginPath();
    ctx.fillStyle = "#f75308"; // Orange beak
    ctx.moveTo(bird.x + 10, bird.y - 2);
    ctx.lineTo(bird.x + 18, bird.y + 2);
    ctx.lineTo(bird.x + 10, bird.y + 5);
    ctx.fill();
    ctx.stroke();
}

function endGame() {
    gameOver = true;
    gameOverScreen.classList.remove("hidden");
}

// Main Engine Loop
function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

// Start game on page load
init();
loop();