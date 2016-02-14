Board = class {
  constructor(size) {
    var size = size || 3;
    this.size = size;
    this.tracker = new Tracker.Dependency;
    this.reset();
  }

  get grid () {
    this.tracker.depend();
    var grid = [];

    for (var row = 0; row < this.size; row ++) {
      var rowCells = [];
      for (var col = 0; col < this.size; col++) {
        rowCells.push(this.getCell(row, col));
      }
      grid.push(rowCells);
    }

    return grid;
  }

  get transposedGrid () {
    this.tracker.depend();
    var grid = [];
    for (var col = 0; col < this.size; col++) {
      var colCells = [];
      for (var row = 0; row < this.size; row ++) {
        colCells.push(this.getCell(row, col));
      }
      grid.push(colCells);
    }

    return grid;
  }

  reset (reactive) {
    this.cells = [];

    for (var row = 0; row < this.size; row++) {
      for (var col = 0; col < this.size; col++) {
        this.cells.push(new _BoardCell(row, col, ""));
      }
    }
    if (reactive) { this.tracker.changed() }
  }

  row (n) {
    var row = [];
    for (var i = 0; i < this.size; i++) {
      row.push(this.getCell(n, i));
    };
    return row;
  }

  col (n) {
    var column = [];
    for (var i = 0; i < this.size; i++) {
      column.push(this.getCell(i, n));
    }
    return column;
  }

  rDiag ()  {
    var diag = [];
    for (var i = 0; i < this.size; i++) {
      diag.push(this.getCell(i, i));
    }
    return diag;
  }

  lDiag () {
    var diag = [];
    for (var i = this.size -1; i >= 0; i--) {
      diag.push(this.getCell(i, this.size - 1 - i))
    }
    return diag;
  }

  getCell (row, col) {
    return _.find(this.cells, function (cell) {
      return cell.row == row && cell.col == col;
    });
  }

  setCell (row, col, value) {
    var cell = this.getCell(row, col);
    cell.value = value;
    this.tracker.changed();
  }

  clearCell (row, col) {
    this.setCell(row, col, "");
  }

  _render () {
    var html = Blaze.toHTMLWithData(Template["Board"], this.grid);
    console.log(html);
    return html;
  }
}

class _BoardCell {
  constructor (row, col, value) {
    this.row = row;
    this.col = col;
    this.value = value;
  }
}
