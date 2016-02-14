class H3T {
  constructor() {
    this.board = new Board();
    this.numberOfMoves = 0;
    this.turnTracker = new Tracker.Dependency;
  }

  reset () {
    this.board.reset();
  }

  handleClick (cell) {
    var cellValue = this.board.getCell(cell.row, cell.col).value;
    if (_.isEmpty(cellValue) && this.numberOfMoves < this.board.size * 2) {
      this.board.setCell(cell.row, cell.col, this.playerTurn[1]);
      this.incrementMovesCount();
    } else {
      console.log("moveError", "Cell isn't Empty")
    }
  }

  move ($piece, $cell) {
    var pieceRow = $piece.data("row");
    var pieceCol = $piece.data("col");
    var cellRow  = $cell.data("row");
    var cellCol  = $cell.data("col");

    if (this.canMove($piece, $cell)) {
      var pieceData = this.board.getCell(pieceRow, pieceCol);
      this.board.setCell(cellRow, cellCol, pieceData.value);
      this.board.clearCell(pieceRow, pieceCol);
      this.incrementMovesCount();
    } else {
      console.log("moveError", "Can't move piece ("+pieceRow+ "," + pieceCol + ") to cell ("+cellRow + ","+ cellCol +")");
    }
  }

  canMove ($piece, $toCell) {
    var isCellEmpty   = $toCell.find('.pawn')[0] === undefined;
    var isMoveAllowed = this.cellsDistance($piece, $toCell) <= Math.sqrt(2);

    return isCellEmpty && isMoveAllowed && this.numberOfMoves >= this.board.size * 2;
  }

  cellsDistance (a, b) {
    var cSq = Math.pow(a.data("row") - b.data("row"), 2) +
                Math.pow(a.data("col") - b.data("col"), 2);
    return Math.sqrt(cSq);
  }

  incrementMovesCount () {
    this.numberOfMoves = this.numberOfMoves + 1;
    this.turnTracker.changed();
  }

  get playerTurn () {
    this.turnTracker.depend();
    return this.numberOfMoves % 2 == 0 ? ['player-1', 'X'] : ['player-2', 'O'];
  }

  get isGameOver () {
  }

  get someoneWon() {
    var grid = this.board.grid;
    var gridT = this.board.transposedGrid;

    var rowsValue = _.map(grid, function (row) {
      return _.map(row, function (cell) {
        return cell.value;
      });
    });

    var rowWin = _.any(rowsValue, function (v) {
      var l = _.unique(v);
      return l.length == 1 && l[0] != "";
    });

    var colsValue = _.map(gridT, function (col) {
      return _.map(col, function (cell) {
        return cell.value;
      });
    });

    var colWin = _.any(colsValue, function (v) {
      var l = _.unique(v);
      return l.length == 1 && l[0] != "";
    });



    return rowWin || colWin;
  }

}


h3t = new H3T();
