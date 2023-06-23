// 
//        コード汚いから見ないで！！！！！！！！！
// 

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

let NOTECOUNT = 0;
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



// キー押した時の処理
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
      // 判定線との差の絶対値を計算する
      const difference = Math.abs(noteTop - (window.innerHeight - hitThreshold));

      if (difference >= 30 && difference <= 100) {
        showCount('Good');
        showJudgeCount('Good');
        showComboCount('break');
        showScoreCount('Good');
        note.remove();
      } else if (difference > 100 && difference <= 150) {
        showCount('Great');
        showJudgeCount('Great');
        showComboCount('keep');
        showScoreCount('Great');
        note.remove();
      } else if (difference > 150 && difference <= 300) {
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

// たくさんのファンクション
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
    NOTECOUNT++;
    GOODCOUNT++;
    goodkun.innerHTML = `Good : ${GOODCOUNT}`;
  }else if (judge == 'Great') {
    NOTECOUNT++;
    GREATCOUNT++;
    greatkun.innerHTML = `Great : ${GREATCOUNT}`;
  }else {
    NOTECOUNT++;
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

// キーあげた時に後ろの光消すやつ
function handleKeyUp(event) {
const key = event.key.toUpperCase();
const columnNumber = getKeyColumnNumber(key);
// console.log(columnNumber)
if (columnNumber) {
  const column = document.getElementById(`column${columnNumber}`);
  column.classList.remove('active');
}
}



// 置き換え
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

// 譜面


//一応自分で作ることもできる、一応
// let columnSequence = [4,3,2,1,2,3];
// let sequenceIndex = 0;


//　　　重複してもいい時の生成コード
// function getRandomColumnNumber() {
// return Math.floor(Math.random() * 4) + 1; 
// }

//　　　重複させない生成コード
let previousNumber = 0;

function getRandomColumnNumber() {
  let randomNumber = Math.floor(Math.random() * 4) + 1;
  
  while (randomNumber === previousNumber) {
    randomNumber = Math.floor(Math.random() * 4) + 1;
  }
  
  previousNumber = randomNumber;
  return randomNumber;
}





function createNote() {
//ランダム生成用
const columnNumber = getRandomColumnNumber();
//譜面制作用
// const columnNumber = columnSequence[sequenceIndex];
// sequenceIndex = (sequenceIndex + 1) % columnSequence.length;
// 
const column = document.getElementById(`column${columnNumber}`);
const combokun = document.getElementById("combo");
const misskun = document.getElementById("MissCount");


const note = document.createElement('div');
note.classList.add('note');
column.appendChild(note);



//ノーツ消す処理
setTimeout(() => {
  let noteTop = note.offsetTop
  // console.log(document.documentElement.offsetHeight - (window.pageYOffset + note.getBoundingClientRect().top))
  if (noteTop > 1) {
    if(note){
      note.remove(); 
      COMBOCOUNT = 0;
      combokun.innerHTML = ``;

      showCount('Miss');
      NOTECOUNT++;
      MISSCOUNT++;
      misskun.innerHTML = `Miss : ${MISSCOUNT}`;
    }
  }
}, 980);
Accuracy();

}




//                               //
//               精度             //
//                               //
  const Accuracy = () => {
  const AccuracY = document.getElementById("accuracy");

  const perfectaccuracy = Math.floor(PERFECTCOUNT / NOTECOUNT * 10000) / 100;
 
  AccuracY.innerHTML = `${perfectaccuracy} %`;
  }







//                               //
//        クリックはんて           //
//                               //

const column1 = document.getElementById('column1');
const column2 = document.getElementById('column2');
const column3 = document.getElementById('column3');
const column4 = document.getElementById('column4');

column1.addEventListener('mousedown', () => handleKeyDown({ key: 'D' }));
column2.addEventListener('mousedown', () => handleKeyDown({ key: 'F' }));
column3.addEventListener('mousedown', () => handleKeyDown({ key: 'J' }));
column4.addEventListener('mousedown', () => handleKeyDown({ key: 'K' }));

column1.addEventListener('mouseup', () => handleKeyUp({ key: 'D' }));
column2.addEventListener('mouseup', () => handleKeyUp({ key: 'F' }));
column3.addEventListener('mouseup', () => handleKeyUp({ key: 'J' }));
column4.addEventListener('mouseup', () => handleKeyUp({ key: 'K' }));







//                                                                                  //
//        眠くて超ゴリ押しで書いたから見ないでください！！！！！！！！！！！！！！！！           //
//                                                                                  //


const startButton1 = document.getElementById('button1')
const startButton2 = document.getElementById('button2')
const startButton3 = document.getElementById('button3')
const startButton4 = document.getElementById('button4')
const startButton5 = document.getElementById('button5')
const startButton6 = document.getElementById('button6')
const startButton7 = document.getElementById('button7')
startButton1.addEventListener('click', Game1)
startButton2.addEventListener('click', Game2)
startButton3.addEventListener('click', Game3)
startButton4.addEventListener('click', Game4)
startButton5.addEventListener('click', Game5)
startButton6.addEventListener('click', Game6)
startButton7.addEventListener('click', Game7)

const keys = document.getElementsByClassName('key')
const line = document.getElementsByClassName('line')


function getRandomSpeed() {
const randomrange = [50,100,110,120,130,140,150,175,200,250,300,500]
console.log(randomrange[Math.floor(Math.random() * 11) + 1])
return randomrange[Math.floor(Math.random() * 11) + 1]
}

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
function Game7(){
  setInterval(createNote, 175); 
  buttonvinish();
  column1.classList.add('left');
  column2.classList.add('left');
  column3.classList.add('right');
  column4.classList.add('right');
  line[0].classList.add('wide');
}

function buttonvinish(){
  startButton1.style.display = 'none';
  startButton2.style.display = 'none';
  startButton3.style.display = 'none';
  startButton4.style.display = 'none';
  startButton5.style.display = 'none';
  startButton6.style.display = 'none';
  startButton7.style.display = 'none';
  keys[0].style.display = 'none';
  keys[1].style.display = 'none';
  keys[2].style.display = 'none';
  keys[3].style.display = 'none';
}
