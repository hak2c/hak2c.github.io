const row = 3;
let turn = "X";
let count = 0;
let end = false;
next.textContent = "Player: " + turn;

function createTableRow(col) {
  let tr = document.createElement("tr");
  for (let i = 0; i < col; i++) {
    let td = document.createElement("td");
    td.addEventListener("click", handleClick, { once: true });
    tr.append(td);
  }
  return tr;
}
function createBoard(row) {
  let fr = new DocumentFragment();
  for (let i = 0; i < row; i++) {
    fr.append(createTableRow(row));
  }
  return fr;
}

function handleClick() {
  if (!end) {
    this.textContent = turn;
    for (let i = 0; i < row; i++) {
      if (
        board.rows[i].cells[0].textContent == turn &&
        board.rows[i].cells[1].textContent == turn &&
        board.rows[i].cells[2].textContent == turn
      ) {
        next.textContent = "Winner: " + turn;
        end = true;
        reset.hidden = false;
        return;
      }
    }

    turn = turn == "X" ? "O" : "X";
    next.textContent = "Player: " + turn;
    count++;
    if (count == row * row) reset.hidden = false;
  }
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
