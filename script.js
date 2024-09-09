// 
//        コード汚いから見ないで！！！！！！！！！
// 

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

    const column = document.getElementById(`column${columnNumber}`);
    const notes = column.getElementsByClassName('note');

    if (notes.length > 0) {
      const note = notes[0];
      note.parentNode.removeChild(note);
      // ここでノーツに対する処理を追加する
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
  case 'L':
    return 5;
  default:
    return null;
}
}


// 

// 譜面


//一応自分で作ることもできる、一応
// let columnSequence = [
//   1,2,1,2,3,2,3,2,4,3,4,3,2,3,2,3,
//   1,2,1,2,3,2,3,2,4,3,4,3,2,3,2,3,1,2,
//   1,2,3,4,3,2,1,
//   2,3,4,3,2,1,
//   2,3,4,3,2,1 ,2,1,
//   2,3,4,3, 4,3, 2,1, 2,1,
//   2,3,4,3, 4,3, 2,1,
//   2,3,4,3,2,1,
//   2,3,4,3,2,1,2,
//   1,2,3,4, ,

//   1, , 1,
//   3, , 3,
//   2, , 2,
//   4, , 4, ,

//   1,1,
//   3,3,
//   2,2,
//   4,4, ,
  
//   1,2,3,
//   1,2,3,
//   1,2,3,
//   2,3,4,
//   2,3,4,
//   2,3,4,
//   3,2,1,
//   3,2,1,
//   3,2,1,
//   2,3,4,
//   2,3,4,
//   2,3,4,
//   3,2,1,
//   3,2,1,
//   3,2,1,
//   2,3,4,
//   2,3,4,
//   2,3,4, ,

//   1,3,1,3,
//   4,2,4,2, ,
//   2,3,1,4,
//   1,4,2,3,
//   , ,
// ];
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
  Accuracy();
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

  const perfectaccuracy = Math.floor((PERFECTCOUNT + GREATCOUNT/2 + GOODCOUNT/4) / NOTECOUNT * 10000) / 100;
 
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
const keys = document.getElementsByClassName('key')
const line = document.getElementsByClassName('line')

// for (let i = 0; i < 9; i++) {

//   document.getElementById(`button${i+1}`).style.display = style;
//   const `startButton${i+1}` = document.getElementById(`button${i+1}`)


// }

const startButton1 = document.getElementById('button1')
const startButton2 = document.getElementById('button2')
const startButton3 = document.getElementById('button3')
const startButton4 = document.getElementById('button4')
const startButton5 = document.getElementById('button5')
const startButton6 = document.getElementById('button6')
const startButton7 = document.getElementById('button7')
const startButton8 = document.getElementById('button8')
const startButton9 = document.getElementById('button9')
const startButton10 = document.getElementById('button10')
const startButton11 = document.getElementById('button11')

const buttonHr = document.getElementsByClassName('buttonHr')

const Exback4K = document.getElementById('Exback4K')
Exback4K.addEventListener('click', Exback4)

const back4K = document.getElementById('back4K')
back4K.addEventListener('click', back4)


const GameSection = [Game1, Game2, Game3, Game4, Game5, Game6, Game7, Game8, Game9, Game10, Game11]

for (let i = 0; i < 11; i++) {

  const poo = document.getElementById(`button${i+1}`)
  poo.addEventListener('click', GameSection[i])

}


const Key4 = document.getElementsByClassName('Key4')
const TitleKeys = document.getElementById('TitleKeys')
const tit4K = document.getElementById('tit4K')
tit4K.addEventListener('click', GameKey4)

function GameKey4(){
  TitleKeys.style.display = 'none';
  Key4[0].style.display = 'block';
  back4K.style.display = 'block';
  buttonHr[0].style.display = 'block';
  buttonHr[1].style.display = 'block';
}


function Game1(){
  setInterval(createNote, 1000); 
  buttonvinish4K('none');
}
function Game2(){
  setInterval(createNote, 750); 
  buttonvinish4K('none');
}
function Game3(){
  setInterval(createNote, 500); 
  buttonvinish4K('none');
}
function Game4(){
  setInterval(createNote, 200); 
  buttonvinish4K('none');
}
function Game5(){
  setInterval(createNote, 150); 
  buttonvinish4K('none');
}

function Game6(){
  setInterval(createNote, 110); 
  buttonvinish4K('none');

  // column5.style.display = 'inline-block';

  const linee = document.getElementById('line')
  container.classList.add('Hline');
}
function Game7(){
  setInterval(createNote, 175); 
  buttonvinish4K('none');
  column1.classList.add('left');
  column2.classList.add('left');
  column3.classList.add('right');
  column4.classList.add('right');
  line[0].classList.add('wide');
}
function Game8(){
  setInterval(createNote, 95); 
  buttonvinish4K('none');
}

function Game10(){
  setInterval(createNote, 85); 
  buttonvinish4K('none');
}

function Game11(){
  setInterval(createNote, 75); 
  buttonvinish4K('none');
}

function Game9(){
  buttonvinish4K('none');
  accuracy.style.display = 'none'

  startButton6.style.display = 'inline-block';
  startButton7.style.display = 'inline-block';
  startButton8.style.display = 'inline-block';
  startButton10.style.display = 'inline-block';
  startButton11.style.display = 'inline-block';

  buttonHr[1].style.display = 'none';

  const Exback4K = document.getElementById('Exback4K')
  Exback4K.style.display = 'inline-block';
  back4K.style.display = 'none';
}

function Exback4(){
  buttonvinish4K('inline-block');
  startButton6.style.display = 'none';
  startButton7.style.display = 'none';
  startButton8.style.display = 'none';
  startButton10.style.display = 'none';
  startButton11.style.display = 'none';

  buttonHr[1].style.display = 'block';

  const Exback4K = document.getElementById('Exback4K')
  Exback4K.style.display = 'none';
  back4K.style.display = 'block';
}

function back4(){
  TitleKeys.style.display = 'block';
  Key4[0].style.display = 'none';

  buttonHr[0].style.display = 'none';

  const back4K = document.getElementById('back4K')
  back4K.style.display = 'none';
}

function buttonvinish4K(style){

  accuracy.style.display = 'inline-block'
  Exback4K.style.display = style;
  back4K.style.display = style;


  for (let i = 0; i < 11; i++) {

    document.getElementById(`button${i+1}`).style.display = style;

  }

  for (let i = 0; i < 5; i++) {

    keys[i].style.display = style;

  }
}