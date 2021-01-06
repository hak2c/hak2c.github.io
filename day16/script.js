// let row = +prompt("Input number of rows (minimum 10 rows)");
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
};
let createBoard = (row) => {
  let fr = new DocumentFragment();
  for (let i = 0; i < row; i++) {
    fr.append(createTableRow(row));
  }
  return fr;
};

function handleClick() {
  if (!end) {
    this.textContent = turn;
    let rowIndex = this.parentElement.rowIndex,
      cellIndex = this.cellIndex;
    if (
      horizonalCheck(rowIndex, cellIndex, turn) ||
      verticalCheck(rowIndex, cellIndex, turn) ||
      diagonalLeft(rowIndex, cellIndex, turn) ||
      diagonalRight(rowIndex, cellIndex, turn)
    ) {
      next.textContent = "Winner: " + turn;
      end = true;
      reset.hidden = false;
      return;
    }

    turn = turn == "X" ? "O" : "X";
    next.textContent = "Player: " + turn;
    count++;
    if (count >= row * row) {
      reset.hidden = false;
      next.textContent = "All loser";
      end = !end;
    }
  }
}

function horizonalCheck(rowIndex, cellIndex, turn) {
  let countCheck = 1;
  for (let i = cellIndex - 1; i >= 0; i--) {
    if (board.rows[rowIndex].cells[i] == undefined) break;
    if (board.rows[rowIndex].cells[i].textContent == turn) {
      countCheck++;
      if (countCheck == 5) return true;
    } else break;
  }
  for (let i = cellIndex + 1; i <= row - 1; i++) {
    if (board.rows[rowIndex].cells[i] == undefined) break;
    if (board.rows[rowIndex].cells[i].textContent == turn) {
      countCheck++;
      if (countCheck == 5) return true;
    } else break;
  }
  return false;
}

function verticalCheck(rowIndex, cellIndex, turn) {
  let countCheck = 1;
  for (let i = rowIndex - 1; i >= 0; i--) {
    if (board.rows[i].cells[cellIndex] == undefined) break;
    if (board.rows[i].cells[cellIndex].textContent == turn) {
      countCheck++;
      if (countCheck == 5) return true;
    } else {
      break;
    }
  }
  for (let i = rowIndex + 1; i <= row - 1; i++) {
    if (board.rows[i].cells[cellIndex] == undefined) break;
    if (board.rows[i].cells[cellIndex].textContent == turn) {
      countCheck++;
      if (countCheck == 5) return true;
    } else {
      break;
    }
  }
  return false;
}

function diagonalLeft(rowIndex, cellIndex, turn) {
  let countCheck = 1;
  for (let i = rowIndex - 1, j = cellIndex - 1; i >= 0 && j >= 0; i--, j--) {
    if (board.rows[i].cells[j] == undefined) break;
    if (board.rows[i].cells[j].textContent == turn) {
      countCheck++;
      if (countCheck == 5) return true;
    } else break;
  }
  for (let i = rowIndex + 1, j = cellIndex + 1; i < row && j < row; i++, j++) {
    if (board.rows[i].cells[j] == undefined) break;
    if (board.rows[i].cells[j].textContent == turn) {
      countCheck++;
      if (countCheck == 5) return true;
    } else break;
  }
  return false;
}
function diagonalRight(rowIndex, cellIndex, turn) {
  let countCheck = 1;
  for (let i = rowIndex - 1, j = cellIndex + 1; i >= 0 && j < row; i--, j++) {
    if (board.rows[i].cells[j] == undefined) break;
    if (board.rows[i].cells[j].textContent == turn) {
      countCheck++;
      if (countCheck == 5) return true;
    } else break;
  }
  for (let i = rowIndex + 1, j = cellIndex - 1; i < row && j >=0; i++, j--) {
    if (board.rows[i].cells[j] == undefined) break;
    if (board.rows[i].cells[j].textContent == turn) {
      countCheck++;
      if (countCheck == 5) return true;
    } else break;
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
