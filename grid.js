class Grid {
    constructor(pixelsize) {
        this.pixelw = pixelsize;
        this.pixelh = pixelsize;
        this.r = Math.floor(height / this.pixelh);
        this.c = Math.floor(width / this.pixelw);
        console.log(width);
        console.log(height);
        this.cells = []
        for(let i = 0; i < this.r * this.c; i++) {
            this.cells[i] = 0;
        }
    }
    full(temp, idx) {
        return temp[idx] >= 1;
    }
    check(temp, x, y) {
        if(x < 0) x = this.c - 1;
        if(x >= this.c) x = 0;
        if(y < 0) y = this.r - 1;
        if(y >= this.r) y = 0;
        return this.full(temp, x + y * this.c);
    }
    countNeighbors(temp, _x, _y) {
        let m = 0;
        for(let x = -1; x <= 1; x++)
        {
            for(let y = -1; y <= 1; y++) {
                if(x === 0 && y === 0) continue;
                m += this.check(temp, _x + x, _y + y) ? 1 : 0;
            }
        }
        return m;
    }
    set(v, x, y) {
        this.cells[x + y * this.c] = v;
    }
    get(x, y) {
        return this.cells[x + y * this.c];
    }
    step() {
        let temp = [...this.cells]
        for(let i = 0; i < this.c; i++) {
            for(let j = 0; j < this.r; j++) {
                let nbs = this.countNeighbors(temp, i, j);
                if(nbs == 2)
                    this.set(this.get(i, j), i, j);
                else if(nbs == 3)
                    this.set(1, i, j);
                else
                    this.set(0, i, j);
                
            }
        }
    }
    show() {
        for(let i = 0; i < this.r; i++) {
            for(let j = 0; j < this.c; j++) {
                let idx = j + i * this.c;
                stroke(0);
                fill(this.full(this.cells, idx) ? 255 : 0);
                rect(j * this.pixelw, i * this.pixelh, this.pixelw, this.pixelh);
            }
        }
    }
}