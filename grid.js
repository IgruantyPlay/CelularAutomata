class Grid {
    constructor(pixelsize, rules="") {
        this.pixelw = pixelsize;
        this.pixelh = pixelsize;
        this.r = Math.floor(height / this.pixelh);
        this.c = Math.floor(width / this.pixelw);
        this.cells = []
        for(let i = 0; i < this.r * this.c; i++) {
            this.cells[i] = 0;
        }

        this.survive = [];
        this.born = [];
        if(rules !== "") {
            let rls = rules.split(' ');
            let survive = rls[0].replace('S:', '');
            let born = rls[1].replace('B:', '');

            const re = /\d/g;
            
            let m;
            do {
                m = re.exec(survive);
                if(m)
                    this.survive.push(Number(m[0]));
            } while(m);
            do {
                m = re.exec(born);
                if(m)
                    this.born.push(Number(m[0]));
            } while(m);
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
                let sv = false;
                let br = false;
                for(let s of this.survive)
                    sv = sv || (nbs === s);
                for(let b of this.born)
                    br = br || (nbs === b);
                if(sv)
                    this.set(this.get(i, j), i, j);
                if(br)
                    this.set(1, i, j);
                if(!br && !sv)
                    this.set(0, i, j);
                
            }
        }
    }
    show() {
        noStroke();
        loadPixels();
        for(let i = 0; i < width; i++) {
            for(let j = 0; j < height; j++) {
                let pixidx = 4 * (i + j * width);
                let x = Math.floor(i / pixelSize);
                let y = Math.floor(j / pixelSize);
                let c = this.full(this.cells, x + y * this.c) ? 255 : 0;
                pixels[pixidx + 0] = c;
                pixels[pixidx + 1] = c;
                pixels[pixidx + 2] = c;
                pixels[pixidx + 3] = 255;
            }
        }
        updatePixels();
    }
}