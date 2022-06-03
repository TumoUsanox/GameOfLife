function generate(matLen,gr,grEat,Pred,En,Boom) {
    var matrix = []
    for (let i = 0; i < matLen; i++) {
        matrix[i] = []
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0
        }
    }

    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random()*matLen)
        let y = Math.floor(Math.random()*matLen)
        if(matrix[y][x] == 0) {
            matrix[y][x] = 1
    
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random()*matLen)
        let y = Math.floor(Math.random()*matLen)
        if(matrix[y][x] == 0) {
            matrix[y][x] = 2
        }
    }
    for (let i = 0; i < Pred; i++) {
        let x = Math.floor(Math.random()*matLen)
        let y = Math.floor(Math.random()*matLen)       
        if(matrix[y][x] == 0) {
            matrix[y][x] = 3
        }
    }
    for (let i = 0; i < En; i++) {
        let x = Math.floor(Math.random()*matLen)
        let y = Math.floor(Math.random()*matLen)
        if(matrix[y][x] == 0) {
            matrix[y][x] = 4
    
        }
    }
    for (let i = 0; i < Boom; i++) {
        let x = Math.floor(Math.random()*matLen)
        let y = Math.floor(Math.random()*matLen)       
        if(matrix[y][x] == 0) {
            matrix[y][x] = 5
        }
    }
    return matrix
}

let matrix = generate(15,250,15,15,15,10)
var side = 15;
let grassArr = []
let grassEaterArr = []
let PredatorArr = []
let BombArr = []
let energyArr = []

function setup() {
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let gr = new GrassEater(x, y)
                grassEaterArr.push(gr)
            }
            else if (matrix[y][x] == 3) {
                let gr = new Predator(x, y)
                PredatorArr.push(gr)
            }
            else if (matrix[y][x] == 4) {
            let gr = new Energy(x, y)
            energyArr.push(gr)
        }
            else if (matrix[y][x] == 5) {
                let gr = new Bomb(x, y)
                BombArr.push(gr)
            }
        }            
    }
}

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
            }
            else if (matrix[y][x] == 5) {
                fill("black");
            }

            rect(x * side, y * side, side, side);


        }
    }

    for(var i in grassArr){
        grassArr[i].mul()
     }
     for(let i in grassEaterArr) {
         grassEaterArr[i].eat()
     }
     for(let i in PredatorArr) {
        PredatorArr[i].eat()
    }
    for(let i in energyArr) {
        energyArr[i].move()
    }
     for(let i in BombArr) {
        BombArr[i].move()
    } 
}