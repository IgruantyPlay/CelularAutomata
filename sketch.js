let grid;

function setup() {
    createCanvas(800, 800);
    grid = new Grid(64, 64);
    grid.set(1, 10, 10);
    grid.set(1, 11, 11);
    grid.set(1, 11, 12);
    grid.set(1, 10, 13);
    grid.set(1, 9, 12);
    grid.set(1, 9, 11);
    grid.set(1, 10, 12);
    grid.set(1, 13, 13);
    frameRate(30);
}
function draw() {
    background(0);
    grid.show();
    grid.step();
}