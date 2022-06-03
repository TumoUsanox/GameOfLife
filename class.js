class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }

        return found;
    }

    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.multiply >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrass = new Grass(newX, newY);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }

}

class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 8
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }

        return found;
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;

            var newGrassEater = new GrassEater(newX, newY);
            grassEaterArr.push(newGrassEater);
            this.energy = 8
        }
    }

    move() {
        this.energy--
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if(newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        } else {
            this.die()
        }
    }

    eat() {
        var emptyCells = this.chooseCell(1);
        var newCell = random(emptyCells);
        if(newCell) {
            this.energy++
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x] ///kam 2 tiv@
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            
            if(this.energy >= 12) {
                this.mul()
            }
        } else {
            this.move()
        }
    }

     die() {
        matrix[this.y][this.x] = 0
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}

class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 8
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }

        return found;
    }
    
    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;

            var newPredator = new Predator(newX, newY);
            PredatorArr.push(newPredator);
            this.energy = 8
        }
    }

    move() {
        frameRate(3)
        this.energy--
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if(newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        } else {
            this.die()
        }
    }

    eat() {
        var emptyCells = this.chooseCell(2);
        var newCell = random(emptyCells);
        if(newCell) {
            this.energy++
            
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            
            if(this.energy >= 8) {
                this.mul()
            }
        } else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0
        for (var i in PredatorArr) {
            if (this.x == PredatorArr[i].x && this.y == PredatorArr[i].y) {
                PredatorArr.splice(i, 1);
                break;
            }
        }
    }
}

class Energy {
    constructor(x, y){
    this.x = x;
    this.y = y;
    this.directions = [
        [this.x - 1, this.y - 1],
        [this.x, this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y],
        [this.x + 1, this.y],
        [this.x - 1, this.y + 1],
        [this.x, this.y + 1],
        [this.x + 1, this.y + 1]
    ];
    }

    chooseCell() {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == 3 || matrix[y][x] == 0 || matrix[y][x] == 2) {
                    found.push(this.directions[i]);
                }
            }
        }

        return found;
    }

    move() {
        var emptyCells = this.chooseCell();
        var newCell = random(emptyCells);
        if(newCell) {
            this.newX = newCell[0];
            this.newY = newCell[1];
            if (matrix[this.newY][this.newX] == 0) {
                matrix[this.newY][this.newX] = matrix[this.y][this.x]
                matrix[this.y][this.x] = 0
                this.x = this.newX
                this.y = this.newY   
            }
            else if(matrix[this.newY][this.newX] == 3 || matrix[this.newY][this.newX] == 2){
                this.mul()
            } 
        }
    }

    mul() {
        if(matrix[this.newY][this.newX] == 3){
            matrix[this.y][this.x] = 0
            let x = Math.floor(Math.random()*15)
            let y = Math.floor(Math.random()*15)       
            if(matrix[y][x] == 0) {
                matrix[y][x] = 3
            }
            let pr = new Predator(x, y)
            PredatorArr.push(pr)
            fill("red");
            rect(x * side, y * side, side, side);
            pr.move()
        }
        else if (matrix[this.newY][this.newX] == 2) {
            let x = Math.floor(Math.random()*15)
            let y = Math.floor(Math.random()*15)       
            if(matrix[y][x] == 0) {
                matrix[y][x] = 2
            }
            let grEat = new GrassEater(x, y)
            grassEaterArr.push(grEat)
            fill("yellow");
            rect(x * side, y * side, side, side);
            grEat.eat()
        }
    }
}

class Bomb {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    getNewCoordinates() {
        this.Coordinates = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x    , this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y    ],
            [this.x + 2, this.y + 1],
            [this.x + 2, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x    , this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x - 2, this.y + 2],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y    ],
            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1],
        ];
    }

    move() {
        this.getNewCoordinates()
        var newCell = random(this.directions);
        let newX = newCell[0];
        let newY = newCell[1];             
        if (newX >= 0 & newX <= matrix[0].length & newY >= 0 & newY <= matrix.length) {
            if (matrix[newY][newX] == 0) {
            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY   
        }
            else if(matrix[newY][newX] == 3 || matrix[newY][newX] == 2 || matrix[newY][newX] == 1){
                this.boom()
            }
        }
    }
    
    boom() {
        this.getNewCoordinates()
        for (let i in this.Coordinates) {
            this.CoordX = this.Coordinates[i][0]
            this.CoordY = this.Coordinates[i][1]
        
            if (isNaN(this.CoordY) & isNaN(this.CoordX)) {
                if (this.CoordX >= 0 & this.CoordX <= matrix[0].length & this.CoordY >= 0 & this.CoordY <= matrix.length) {
                    if (matrix[this.CoordY][this.CoordX] == 1) {
                        for (var j in grassArr) {
                            if (this.CoordX == grassArr[j].x && this.CoordY == grassArr[j].y) {
                                grassArr.splice(j, 1);
                                break;
                            }
                        }
                    }
                    else if (matrix[CoordY][CoordX] == 2) {
                        for (var b in grassEaterArr) {
                            if (this.CoordX == grassEaterArr[b].x && this.CoordY == grassEaterArr[b].y) {
                                grassEaterArr.splice(b, 1);
                                break;
                            }
                        }
                    }
                    else if (matrix[this.CoordY][this.CoordX] == 3) {
                        for (var a in PredatorArr) {
                            if (this.CoordX == PredatorArr[a].x && this.CoordY == PredatorArr[a].y) {
                                PredatorArr.splice(a, 1);
                                break;
                            }
                        }
                    }
                }
            }
            matrix[this.CoordY][this.CoordX] = 0
        }
    matrix[this.y][this.x] = 0          
        for (let c in BombArr) {
            if (this.x == BombArr[c].x & this.y == BombArr[c].y) {
                BombArr.splice(c, 1);
                break; 
            }
        } 
    }
}
        