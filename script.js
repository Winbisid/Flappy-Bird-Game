// Game states
let GRAVITY = 5;
let BIRD_POS = 225;
let JUMP = 50;
let SCORE = 0;

let GAP = 20

// Game elements
let bird = document.querySelector('.bird');
let pipes = [...document.querySelectorAll('.pipe')];
let score = document.querySelector('.score span');

setInterval(()=>{
    const randomHeight = Math.floor(Math.random() * 50) + 5;
    pipes[1].style.height = `${randomHeight}%`;
    pipes[0].style.height = `${100 - (randomHeight + GAP)}%`
    pipes[0].style.top = `${randomHeight + GAP}%`
    SCORE += 10
},3000)


setInterval(()=>{
    bird.style.top = `${BIRD_POS}px`;
    score.innerText = SCORE;
},100)


function play() {
    setInterval(()=>{
        BIRD_POS += GRAVITY;
        BIRD_POS >= 550 && gameOver();
        BIRD_POS <= 0 && (BIRD_POS = 0);
        collided(bird,pipes[0]) || collided(bird,pipes[1]) && gameOver();

    },100)

    setInterval(()=>{
        bird.style.top = `${BIRD_POS}px`
    },100)

    window.addEventListener('keyup', (e) => {
        if (e.code !== "Space") return;
        BIRD_POS -= JUMP
    })
}

function collided(source, target) {
    const sourceRect = source.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    return (
    sourceRect.right >= targetRect.left
    && sourceRect.left <= targetRect.right
    && sourceRect.bottom >= targetRect.top
    && sourceRect.top <= targetRect.bottom
  );
}

function gameOver() {
    window.location.reload();
}

window.onload = play;