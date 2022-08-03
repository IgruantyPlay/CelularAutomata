const pixelSize = 16;

let grid;
let paused = false;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    for (let element of document.getElementsByClassName("p5Canvas")) {
        element.addEventListener("contextmenu", (e) => e.preventDefault());
    }
    grid = new Grid(pixelSize);
    frameRate(60);
}
function draw() {
    background(0);
    grid.show();
    if(mouseIsPressed) {
        let x = Math.floor(mouseX / grid.pixelw);
        let y = Math.floor(mouseY / grid.pixelh);
        if(x >= 0 && x < grid.c && y >= 0 && y < grid.r) {
            if(mouseButton === LEFT)
                grid.set(1, x, y);
            else if(mouseButton === RIGHT)
                grid.set(0, x, y);
        }
    } else {
        if(!paused)
            grid.step();
    }
}
function keyPressed() {
    if(keyCode === ENTER)
        paused = !paused;
    if(keyCode === BACKSPACE)
        reset_grid();
    if(keyCode === DOWN_ARROW)
    {
        paused = true;
        grid.step();
    }
}
function windowResized() { 
    resizeCanvas(window.innerWidth, window.innerHeight);
    reset_grid();
}
var reset_grid = () => { grid = new Grid(pixelSize); }
