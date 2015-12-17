class H3T {
  constructor() {
    this.board = new Board();
    this.numberOfMoves = 0;
    this.turnTracker = new Tracker.Dependency;
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
    var isCellEmpty   = $toCell.html().trim() === "";
    var isMoveAllowed = this.cellsDistance($piece, $toCell) <= Math.sqrt(2);

    return isCellEmpty && isMoveAllowed;
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
}


h3t = new H3T();
