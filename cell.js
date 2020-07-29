function Cell (i, j, w) {
  this.i = i
  this.j = j
  this.x = i * w
  this.y = j * w
  this.w = w
  this.orcCount = 0

  this.orc = false
  // if(random(1) < 0.5){
  //   this.orc = true
  // } else {
  //   this.orc = false
  // }
  this.revealed = false
}

Cell.prototype.countOrcs = function () {
  if (this.orc) {
    this.orcCount = -1
    return
  }
  let total = 0
  for (let xoff = -1; xoff <= 1; xoff++) {
    for (let yoff = -1; yoff <= 1; yoff++) {
      const i = this.i + xoff
      const j = this.j + yoff
      if (i > -1 && i < cols && j > -1 && j < rows) {
        const neighbor = grid[i][j]
        if (neighbor.orc) {
          total++
        }
      }
    }
  }
  this.orcCount = total
}

Cell.prototype.show = function () {
  stroke(0)
  noFill()
  rect(this.x, this.y, this.w, this.w)
  if (this.revealed) {
    if (this.orc) {
      fill('rgba(1, 104, 4, 1)')
      ellipseMode(CENTER)
      ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5)
    } else {
      fill(127)
      rect(this.x, this.y, this.w, this.w)
      if (this.orcCount > 0) {
        textAlign(CENTER)
        fill(0)
        text(this.orcCount, this.x + this.w * 0.5, this.y + this.w * 0.75)
      }
    }
  }
}

Cell.prototype.contains = function (x, y) {
  return (x > this.x && x < this.x + this.w &&
    y > this.y && y < this.y + this.w)
}

Cell.prototype.reveal = function (x, y) {
  this.revealed = true
  if (this.orcCount == 0) {
    this.floodFill()
  }
}

Cell.prototype.floodFill = function () {
  for (let xoff = -1; xoff <= 1; xoff++) {
    for (let yoff = -1; yoff <= 1; yoff++) {
      const i = this.i + xoff
      const j = this.j + yoff
      if (i > -1 && i < cols && j > -1 && j < rows) {
        const neighbor = grid[i][j]
        if (!neighbor.orc && !neighbor.revealed) {
          neighbor.reveal()
        }
      }
    }
  }
}
