let grid;
let paused = false;

function setup() {
    createCanvas(800, 800);
    grid = new Grid(64, 64);
    frameRate(30);
}
function draw() {
    background(0);
    grid.show();
    if(mouseIsPressed) {
        let x = Math.floor(mouseX / grid.pixelw);
        let y = Math.floor(mouseY / grid.pixelh);
        
        if(x >= 0 && x < grid.c && y >= 0 && y < grid.r) {
            grid.set(1, x, y);
            console.log(`${x}:${y}`)
        }
    } else {
        if(!paused)
            grid.step();
    }
}
function keyPressed() {
    if(keyCode === ENTER)
        paused = !paused;
    
}