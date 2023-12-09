const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const path = "░";
const player = "*";

class Field {
  constructor(arr) {
    this.arr = arr;
  }
  print() {
    let joinedArr = this.arr.join("\n").replace(/,/g, "");
    return joinedArr;
  }
  playerPos() {
    for (let i = 0; i < this.arr.length; i++) {
      for (let j = 0; j < this.arr[i].length; j++) {
        if (this.arr[i][j] === "*") {
          return { row: i, col: j };
        }
      }
    }
  }
  holePos() {
    let indices = [];
    for (let i = 0; i < this.arr.length; i++) {
      for (let j = 0; j < this.arr[i].length; j++) {
        if (this.arr[i][j] === "O") {
          indices.push({ row: i, col: j });
        }
      }
    }
    return indices;
  }
  hatPos() {
    for (let i = 0; i < this.arr.length; i++) {
      for (let j = 0; j < this.arr[i].length; j++) {
        if (this.arr[i][j] === "^") {
          return { row: i, col: j };
        }
      }
    }
  }
  prompt() {
    console.log(this.print());
    let endGame = false;
    while (!endGame) {
      let answer = prompt("What is your move? ");
      console.log(`You chose to move ${answer}`);

      let playerPos = this.playerPos();
      let newPos = { row: playerPos.row, col: playerPos.col };

      if (answer === "left") {
        newPos.col -= 1;
      } else if (answer === "right") {
        newPos.col += 1;
      } else if (answer === "up") {
        newPos.row -= 1;
      } else if (answer === "down") {
        newPos.row += 1;
      }
      console.log(newPos);

      if (
        newPos.col === this.hatPos().col &&
        newPos.row === this.hatPos().row
      ) {
        console.log("You won the hat. End of game.");
        endGame = true;
      } else if (
        this.holePos().some(
          (hole) => hole.row === newPos.row && hole.col === newPos.col
        )
      ) {
        console.log("Oh no! you fell in a hole. End of game.");
        endGame = true;
      } else if (
        newPos.col < 0 ||
        newPos.row >= this.arr.length ||
        newPos.row < 0 ||
        newPos.col >= this.arr[0].length
      ) {
        console.log("You are out of bounds! End of game.");
        endGame = true;
      } else {
        this.arr[this.playerPos().row][this.playerPos().col] = ".";
        this.arr[newPos.row][newPos.col] = "*";
        console.log(this.print())
        console.log(
          "Keep playing, your position is " + JSON.stringify(this.playerPos())
        );
      }
    }
  }
  static generateField(h, w, percent) {
    let numRows = h;
    let numCol = w;
    let numHoles = Math.round((percent / 100) * (h * w));
    // console.log(numHoles)
    let arr = [];
    for (let i = 0; i < h; i++) {
      arr[i] = [];
      for (let j = 0; j < w; j++) {
        arr[i][j] = path;
      }
    }
    for (let k = 0; k < numHoles; k++) {
      let randomIndexCol, randomIndexRow;
      do {
        randomIndexRow = Math.floor(Math.random() * h);
        randomIndexCol = Math.floor(Math.random() * w);
      } while (
        arr[randomIndexRow][randomIndexCol] === hole ||
        (randomIndexRow === 0 && randomIndexCol === 0)
      );

      arr[randomIndexRow][randomIndexCol] = hole;
      //  console.log(randomIndexCol)
      //  console.log(randomIndexRow)
    }
    arr[0][0] = player;
    arr[Math.floor(Math.random() * h)][Math.floor(Math.random() * w)] = hat;
    return arr;
  }
}

const myField = new Field([
  ["*", "░", "░", "░", "░", "░"],
  ["░", "░", "░", "░", "O", "^"],
  ["░", "░", "░", "O", "░", "O"],
  ["░", "░", "░", "░", "░", "O"],
  ["O", "░", "O", "░", "░", "O"],
  ["░", "O", "░", "░", "O", "░"],
  ["O", "░", "░", "░", "░", "░"],
]);

// console.log(myField.print())
// console.log(myField.playerPos())
 console.log(myField.holePos())
 console.log(myField.hatPos())
// console.log(Field.generateField(7, 6, 25));
myField.prompt();
