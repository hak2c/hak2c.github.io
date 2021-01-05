// let row = +prompt("Input number of rows (minimum 10 rows)") >= 10;
// if (row < 10) row = 10;
let row = 10;
let turn = "X";
let count = 0;
let end = false;
next.textContent = "Player: " + turn;

let createTableRow = (row) => {
  let tr = document.createElement("tr");
  for (let i = 0; i < row; i++) {
    let td = document.createElement("td");
    td.addEventListener("click", handleClick, { once: true });
    tr.append(td);
  }
  return tr;
}
let createBoard = (row) => {
  let fr = new DocumentFragment();
  for (let i = 0; i < row; i++) {
    fr.append(createTableRow(row));
  }
  return fr;
}

function handleClick() {
  if (!end) {
    this.textContent = turn;
    let rowIndex = this.parentElement.rowIndex,
      cellIndex = this.cellIndex;
    if (horizonalCheck(rowIndex, cellIndex, turn) || verticalCheck(rowIndex, cellIndex, turn) || diagonalCheck(rowIndex, cellIndex, turn)) {
      next.textContent = "Winner: " + turn;
      end = true;
      reset.hidden = false;
      return;
    }

    turn = turn == "X" ? "O" : "X";
    next.textContent = "Player: " + turn;
    count++;
    if (count == row * row) reset.hidden = false;
  }
}

function horizonalCheck(rowIndex, cellIndex, turn) {
  let countCheck = 1;
  for (let i = cellIndex - 1; i >= 0; i--) {
    if (board.rows[rowIndex].cells[i].textContent == turn) {
      countCheck++;
      if (countCheck == 5) return true;
    } else {
      break;
    }
  }
  for (let i = cellIndex + 1; i <= row - 1;i++) {
    if (board.rows[rowIndex].cells[i].textContent == turn) {
      countCheck++;
      if (countCheck == 5) return true;
    } else {
      break;
    }
  }
  return false;
}

function verticalCheck(rowIndex, cellIndex, turn) {
  let countCheck = 1;
  for (let i = rowIndex - 1; i >= 0; i--) {
    if (board.rows[i].cells[cellIndex].textContent == turn) {
      countCheck++;
      if (countCheck == 5) return true;
    } else {
      break;
    }
  }
  for (let i = rowIndex + 1; i <= row - 1;i++) {
    if (board.rows[i].cells[cellIndex].textContent == turn) {
      countCheck++;
      if (countCheck == 5) return true;
    } else {
      break;
    }
  }
  return false;
}

function diagonalCheck(rowIndex, cellIndex, turn) {
  let countCheck = 1;
  return (diagonalDescendingColIndex(rowIndex, cellIndex, turn, countCheck) || diagonalAscendingColIndex(rowIndex, cellIndex, turn, countCheck)) ? true : false;
}

function diagonalDescendingColIndex(rowIndex, cellIndex, turn, countCheck) {
  let descColIndex = cellIndex;
  for (let i = rowIndex - 1; i >= 0; i--) {
    descColIndex -= 1;
    if (board.rows[i].cells[descColIndex].textContent == turn) {
      countCheck++;
      if (countCheck == 5) return true;
    } else {
      break;
    }
  }
  descColIndex = cellIndex;
  for (let i = rowIndex + 1; i < row - 1; i++) {
    descColIndex -= 1;
    if (board.rows[i].cells[descColIndex].textContent == turn) {
      countCheck++;
      if (countCheck == 5) return true;
    } else {
      break;
    }
  }
  return false;
}

function diagonalAscendingColIndex(rowIndex, cellIndex, turn, countCheck) {
  let ascColIndex = cellIndex;
  for (let i = rowIndex - 1; i >= 0; i--) {
    ascColIndex += 1;
    if (board.rows[i].cells[ascColIndex].textContent == turn) {
      countCheck++;
      if (countCheck == 5) return true;
    } else {
      break;
    }
  }
  ascColIndex = cellIndex;
  for (let i = rowIndex + 1; i < row - 1; i++) {
    ascColIndex += 1;
    if (board.rows[i].cells[ascColIndex].textContent == turn) {
      countCheck++;
      if (countCheck == 5) return true;
    } else {
      break;
    }
  }
  return false;
}

board.append(createBoard(row));

reset.addEventListener("click", () => {
  board.innerHTML = "";
  board.append(createBoard(row));
  count = 0;
  turn = "X";
  next.textContent = "Player: " + turn;
  reset.hidden = true;
  end = false;
});

let checkWinner = () => {};
