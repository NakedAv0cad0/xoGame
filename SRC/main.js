// Variables
const holder = document.getElementById("holder");
const winMark = ["x", "o"];
const boxs = document.getElementsByClassName("box");
const winSpots = {row:[[1,2,3], [4,5,6], [7,8,9]],column:[[1,4,7],[2,5,8],[3,6,9]],cross:[[1,5,9],[3,5,7]]};
let board = document.createElement("div");
board.className = "board";
let x = 1;
var stop = false;

// append board
document.body.appendChild(board);
debugger;

// loop for creating boxs with a special classes
for (let i = 1; i < 10; i++) {
  let box = document.createElement("div");
  box.className = "box";
  box.id = i;
  holder.appendChild(box);
}

for (let i in winSpots) {
  let side = winSpots[i];
  let x = 1;
  for (let j in side) {
    let sopts = side[j].forEach(element => {
      let box = document.getElementById(element);
      box.classList.add(i, i + x);
    });
    x++;
  }
}

// show a diffrenet symbol in each click
for (let i of boxs) {
  let mark = "";
  let box = document.getElementById(`${i.id}`);
  box.onclick = function () {
    if (!box.classList.contains("done")) {
      if (x%2 !== 0) mark = "x";
      if (x%2 === 0) mark = "o";
      box.classList.add("done", mark);

      function watchForRetry() {
        return new Promise((resolve, reject) => {
          let isEnd = restart();
          let isWin = Boolean(checkWin());
          console.log(board.classList.contains("on-game"))
        if (isEnd || isWin) {
          resolve("Retry");
        }else {
          reject();
        }
      })}
      watchForRetry().then((message) => {
        stop = true;
        board.classList.remove("on-game");
        board.classList.add("end")
        board.innerHTML = message;
        win();
      }).catch(() => { // no "on-game", yes "end", 
        if ((!board.classList.contains("on-game")) && (!board.classList.contains("end"))) {
          board.classList.add("on-game");
          win();
        }
      })
      return x++;
    }
  }
}

// Functions
// remove all classes that been added during the game
function reset(token= "itcantbeanylementnamedlikethis") {
    for (let box of boxs) {
    for (let mark of winMark) {
      box.classList.remove(mark, "done", token);
    }
  }
}

// resetart automaticly when all boxs are filled with a draw result
function restart() {
  let isEnd = false;
  let num = 0;
  for (let box of boxs) {
    if (box.classList.contains("x") && box.classList.contains("done") || box.classList.contains("o") && box.classList.contains("done")) num++;
  }
  if (num === (boxs.length)) {
    reset();
    return  isEnd = true;
  };
  return isEnd
}

// preper all win conditions
function checkWin() {
  let isEnd = "";

  let boxCrossL = document.getElementsByClassName("cross1");
  let boxCrossR = document.getElementsByClassName("cross2");
  let boxCol1 = document.getElementsByClassName("column1");
  let boxCol2 = document.getElementsByClassName("column2");
  let boxCol3 = document.getElementsByClassName("column3");
  let boxRow1 = document.getElementsByClassName("row1");
  let boxRow2 = document.getElementsByClassName("row2");
  let boxRow3 = document.getElementsByClassName("row3");

  for (let i of winMark) {
    if (boxCrossL[0].classList.contains(i) && boxCrossL[1].classList.contains(i) && boxCrossL[2].classList.contains(i)) isEnd = i;
    if (boxCrossR[0].classList.contains(i) && boxCrossR[1].classList.contains(i) && boxCrossR[2].classList.contains(i)) isEnd = i;
    if (boxCol1[0].classList.contains(i) && boxCol1[1].classList.contains(i) && boxCol1[2].classList.contains(i)) isEnd = i;
    if (boxCol2[0].classList.contains(i) && boxCol2[1].classList.contains(i) && boxCol2[2].classList.contains(i)) isEnd = i;
    if (boxCol3[0].classList.contains(i) && boxCol3[1].classList.contains(i) && boxCol3[2].classList.contains(i)) isEnd = i;
    if (boxRow1[0].classList.contains(i) && boxRow1[1].classList.contains(i) && boxRow1[2].classList.contains(i)) isEnd = i;
    if (boxRow2[0].classList.contains(i) && boxRow2[1].classList.contains(i) && boxRow2[2].classList.contains(i)) isEnd = i;
    if (boxRow3[0].classList.contains(i) && boxRow3[1].classList.contains(i) && boxRow3[2].classList.contains(i)) isEnd = i;
    if (isEnd !== "") return isEnd;
  }
  restart();
  return isEnd
}

// do an action after define a win case
function win() {
  // this part is just for styling
  if (checkWin() === "") return;
  let mark = checkWin();
  let bg = "";
  if (mark === "x") bg = "rgb(7, 16, 24)";
  if (mark === "o") bg = "#e91e63a6";
  for (let box of boxs) {
    box.classList.add("finish");
  }


  // use the winner mark as a text at the end
  mark = mark.toUpperCase();
  const win = document.createElement("div");
  const winText = document.createTextNode(`${mark} is the WINNER`);
  win.className = "win";
  win.style.cssText = `--bg: ${bg}`
  win.appendChild(winText);
  holder.appendChild(win);
  reset();
}

// calculate a lengh of an object
function objlenght(obj) {
  let x = 0;
  for (i in obj) {
    if (isNaN(+i)) break;
    x++    
  }
  return +x;
}

// Events

document.addEventListener("click", (element) =>  {
  if (element.target.classList.contains("end")) {
    reset("finish")
    document.querySelector(".win").remove();
    // document.querySelector(".end").remove();
  };
})

// work on a timer

let s = 0;
let min = 0;
let zeroS = 0;
let zeroM = 0;
function counter(element) {
  if (s < 60) s++;
  if (s === 60) {
    s = 0;
    min++
  }
  let pText = `${zeroM}${min} : ${zeroS}${s}`;
  if (s >= 10) pText = `${zeroM}${min} : ${s}`;// it's sitll need to deal with the min numbers
  return element.innerHTML = pText;
}
setInterval(() => {
  if (!board.classList.contains("on-game")) return;
  counter(board);
  if (board.classList.contains("end")) {
    clearInterval(1);
  }
}, 1000);