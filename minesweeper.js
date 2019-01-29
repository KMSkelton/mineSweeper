let grid;
let cols;
let rows;
let w = 20;

let totalOrcs = 10

function make2DArray(cols, rows) {
  let arr = new Array(cols)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr
}


function setup() {
  createCanvas(201, 201)
  cols = floor(width / w)
  rows = floor(height / w)
  grid = make2DArray(40, 40)
  // make game board:
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // this is to calc the pixel locations
      grid[i][j] = new Cell(i, j, w);
    }
  }

  // pick total orc spots
  let options = []
  for (let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      options.push([i, j])
    }
  }
  for (let n = 0; n < totalOrcs; n++){
    const index = floor(random(options.length))
    console.log(' :',index);
    const choice = options[index]
    const i = choice[0]
    const j = choice[1]
    options.splice(index, 1)
    grid[i][j].orc = true
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // this is to calc the pixel locations
      grid[i][j].countOrcs();
    }
  }

}

function gameOver() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
    }
  }
  alert("They caught you!")
}

function checkWin() {
  let squaresLeft = 0
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j].revealed == false) {
        squaresLeft ++
      }
    }
  }
  if (squaresLeft == totalOrcs) {
    alert("You did it! Report back quickly.")
  }
}

function mousePressed() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if(grid[i][j].contains(mouseX, mouseY)){
        grid[i][j].reveal()
        if(grid[i][j].orc){
          gameOver();
        } else {
          checkWin();
        }
      }
    }
  }
}

function draw() {
  background(255);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}