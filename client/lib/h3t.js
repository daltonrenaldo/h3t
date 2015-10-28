class Board {
  constructor(size) {
    var size = size || 3;
    this.values = new Array(size * size);
    this.size = size;

    this.tracker = new Tracker.Dependency;
  }

  get grid () {
    this.tracker.depend();
    var grid = [];
    for (var i = 0; i < this.size; i++) {
      grid.push(this.row(i))
    }
    return grid;
  }

  row (n) {
    var row = new Array(this.size);
    for (var i = 0; i < this.size; i++) {
      var index = this.cellIndex(n, i);
      row[i] = this.values[index];
    };

    return row;
  }

  col (n) {
    var column = new Array(this.size);
    for (var i = 0; i < this.size; i++) {
      var index = this.cellIndex(i, n);
      column[i] = this.values[index];
    }
    return column;
  }

  rDiag ()  {
    var diag = new Array(this.size);
    for (var i = 0; i < this.size; i++) {
      var index = this.cellIndex(i, i);
      diag[i] = this.values[index];
    }

    return diag;
  }

  lDiag () {
    var diag = new Array(this.size);
    for (var i = this.size -1; i >= 0; i--) {
      var index = this.cellIndex(i, this.size - 1 - i);
      diag[i] = this.values[index];
    }
    return diag;
  }

  getCell (row, col) {
    var index = this.cellIndex(row, col);
    return this.values[index];
  }

  setCell (row, col, value) {
    var index = this.cellIndex(row, col);
    console.log(index, this.values[index]);
    this.values[index] = value;
    this.render();
    this.tracker.changed();
  }

  clearCell (row, col) {
    var index = this.cellIndex(row, col);
    this.values[index] = null;
    this.tracker.changed();
  }

  cellIndex (row, col) {
    return (row * this.size) + col;
  }

  render () {
    console.log(Blaze.toHTMLWithData(Template["Board"], this.grid));
  }
}

class H3T {
  constructor() {
    this.board = new Board();
  }
}

h3t = new H3T();
