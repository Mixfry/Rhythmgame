const perfect = document.getElementById('Perfect');
perfect.style.display = 'none';

const great = document.getElementById('Great');
great.style.display = 'none';

const good = document.getElementById('Good');
good.style.display = 'none';

const miss = document.getElementById('Miss');
miss.style.display = 'none';

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

let COMBOCOUNT = 0;
let PERFECTCOUNT = 0;
let GREATCOUNT = 0;
let GOODCOUNT = 0;
let MISSCOUNT = 0;
let SCORECOUNT = 0;


////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////



function processNoteInColumn(columnNumber) {
if(document.getElementsByClassName("note") != undefined)
{
  const column = document.getElementById(`column${columnNumber}`);
  const notes = column.getElementsByClassName('note');

  if (notes.length > 0) {
    const note = notes[0];
    note.parentNode.removeChild(note);
    // ここでノーツに対する処理を追加する
  }
}
}




function handleKeyDown(event) {
const key = event.key.toUpperCase();
const columnNumber = getKeyColumnNumber(key);

if (columnNumber) {
  const column = document.getElementById(`column${columnNumber}`);
  const noteArray = column.getElementsByClassName('note');
  column.classList.add('active');

  if (noteArray[0]) {
    const note = noteArray[0];
    const noteTop = note.offsetTop;
    const hitThreshold = 300; // 判定線との距離の許容範囲
    
    if (noteTop >= window.innerHeight - hitThreshold) {
      // 判定線との差の絶対値を計算
      const difference = Math.abs(noteTop - (window.innerHeight - hitThreshold));

      if (difference >= 30 && difference <= 100) {
        showCount('Good');
        showJudgeCount('Good');
        showComboCount('break');
        showScoreCount('Good');
        note.remove();
      } else if (difference > 100 && difference <= 170) {
        showCount('Great');
        showJudgeCount('Great');
        showComboCount('keep');
        showScoreCount('Great');
        note.remove();
      } else if (difference > 170 && difference <= 300) {
        showCount('Perfect');
        showJudgeCount('Perfect');
        showComboCount('keep');
        showScoreCount('Perfect');
        note.remove();
      }
    }
  }

  
  
  processNoteInColumn(column);
  column.classList.remove('active');
}
}

function showCount(count) {
  const judge = document.getElementById(count);
  judge.style.display = 'inline-block';
  setTimeout(() => {
    judge.style.display = 'none';
}, 300);
}

function showJudgeCount(judge) {
  const perfectkun = document.getElementById("PerfectCount");
  const greatkun = document.getElementById("GreatCount");
  const goodkun = document.getElementById("GoodCount");
  if (judge == 'Good') {
    GOODCOUNT++;
    goodkun.innerHTML = `Good : ${GOODCOUNT}`;
  }else if (judge == 'Great') {
    GREATCOUNT++;
    greatkun.innerHTML = `Great : ${GREATCOUNT}`;
  }else {
    PERFECTCOUNT++;
    perfectkun.innerHTML = `Perfect : ${PERFECTCOUNT}`;
  }
}

function showComboCount(combo){
  const combokun = document.getElementById("combo");
  if(combo == 'keep'){

    COMBOCOUNT++;
    combokun.innerHTML = `${COMBOCOUNT}`;

  }else{
    
    COMBOCOUNT = 0;
    combokun.innerHTML = ``;

  }
}

function showScoreCount(score){
  const scorekun = document.getElementById("score");
  if(score == 'Good'){

    SCORECOUNT += 20;
    scorekun.innerHTML = `スコア : ${SCORECOUNT}`;

  }else if(score == 'Great') {

    SCORECOUNT += 50;
    scorekun.innerHTML = `スコア : ${SCORECOUNT}`;

  }else {
    SCORECOUNT += 200;
    scorekun.innerHTML = `スコア : ${SCORECOUNT}`;
  }
}

// function showChain() {
//   const chain = document.getElementById('Chain');
//   chain.style.display = 'inline-block';
//   setTimeout(() => {
//     chain.style.display = 'none';
//   }, 100);
// }

function handleKeyUp(event) {
const key = event.key.toUpperCase();
const columnNumber = getKeyColumnNumber(key);
if (columnNumber) {
  const column = document.getElementById(`column${columnNumber}`);
  column.classList.remove('active');
}
}




function getKeyColumnNumber(key) {
switch (key) {
  case 'D':
    return 1;
  case 'F':
    return 2;
  case 'J':
    return 3;
  case 'K':
    return 4;
  default:
    return null;
}
}


// 


function getRandomColumnNumber() {
return Math.floor(Math.random() * 4) + 1; 
}

// let columnSequence = [4,3,2,1,2,3];
// let sequenceIndex = 0;

function createNote() {
const columnNumber = getRandomColumnNumber();
// const columnNumber = columnSequence[sequenceIndex];
// sequenceIndex = (sequenceIndex + 1) % columnSequence.length;
// 
const column = document.getElementById(`column${columnNumber}`);
const combokun = document.getElementById("combo");
const misskun = document.getElementById("MissCount");


const note = document.createElement('div');
note.classList.add('note');
column.appendChild(note);




setTimeout(() => {
  let noteTop = note.offsetTop
  console.log(document.documentElement.offsetHeight - (window.pageYOffset + note.getBoundingClientRect().top))
  if (noteTop > 1) {
    if(note){
      note.remove(); 
      COMBOCOUNT = 0;
      combokun.innerHTML = ``;

      showCount('Miss');
      MISSCOUNT++;
      misskun.innerHTML = `Miss : ${MISSCOUNT}`;
    }
  }
}, 980);
}

// setInterval(createNote, input); /* 1秒ごとにノーツを生成する */
const startButton1 = document.getElementById('button1')
const startButton2 = document.getElementById('button2')
const startButton3 = document.getElementById('button3')
const startButton4 = document.getElementById('button4')
const startButton5 = document.getElementById('button5')
const startButton6 = document.getElementById('button6')
startButton1.addEventListener('click', Game1)
startButton2.addEventListener('click', Game2)
startButton3.addEventListener('click', Game3)
startButton4.addEventListener('click', Game4)
startButton5.addEventListener('click', Game5)
startButton6.addEventListener('click', Game6)

const keys = document.getElementsByClassName('key')



function Game1(){
  setInterval(createNote, 1000); 
  buttonvinish();
}
function Game2(){
  setInterval(createNote, 750); 
  buttonvinish();
}
function Game3(){
  setInterval(createNote, 500); 
  buttonvinish();
}
function Game4(){
  setInterval(createNote, 200); 
  buttonvinish();
}
function Game5(){
  setInterval(createNote, 150); 
  buttonvinish();
}
function Game6(){
  setInterval(createNote, 125); 
  buttonvinish();
}

function buttonvinish(){
  button1.style.display = 'none';
  button2.style.display = 'none';
  button3.style.display = 'none';
  button4.style.display = 'none';
  button5.style.display = 'none';
  button6.style.display = 'none';
  keys[0].style.display = 'none';
  keys[1].style.display = 'none';
  keys[2].style.display = 'none';
  keys[3].style.display = 'none';
}