Board = class {
  constructor(size) {
    var size = size || 3;
    this.values = [];
    for (var i = 0; i < (size * size); i++) {
      this.values.push("");
    }
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

  cellIndex (row, col) {
    return (row * this.size) + col;
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
    this.clearCell(row, col);
    var index = this.cellIndex(row, col);
    this.values[index] = value;
    this.tracker.changed();
  }

  clearCell (row, col) {
    var index = this.cellIndex(row, col);
    this.values[index] = null;
    this.tracker.changed();
  }


  _render () {
    var html = Blaze.toHTMLWithData(Template["Board"], this.grid);
    console.log(html);
    return html;
  }
}
