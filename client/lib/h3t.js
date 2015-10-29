class H3T {
  constructor() {
    this.board = new Board();
  }

  handleClick (cell) {
    console.log("click", cell);
    this.board.setCell(cell.row, cell.col, "X");
  }
}

h3t = new H3T();
