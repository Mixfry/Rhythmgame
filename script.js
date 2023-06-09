const chain = document.getElementById('Chain');
chain.style.display = 'none';

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
const combokun = document.getElementById("combo");
const scorekun = document.getElementById("score");
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
    const perfectkun = document.getElementById("PerfectCount");
    const greatkun = document.getElementById("GreatCount");
    const goodkun = document.getElementById("GoodCount");
    
    if (noteTop >= window.innerHeight - hitThreshold) {
      // 判定線との差の絶対値を計算
      const difference = Math.abs(noteTop - (window.innerHeight - hitThreshold));

      if (difference >= 30 && difference <= 100) {
        showGood();

        note.remove();

        COMBOCOUNT = 0;
        combokun.innerHTML = ``;

        SCORECOUNT += 20;
        scorekun.innerHTML = `スコア : ${SCORECOUNT}`;

        GOODCOUNT++;
        goodkun.innerHTML = `Good : ${GOODCOUNT}`;

      } else if (difference > 100 && difference <= 190) {
        showGreat();

        note.remove();
        COMBOCOUNT++;
        SCORECOUNT += 50;
        combokun.innerHTML = `${COMBOCOUNT}`;
        scorekun.innerHTML = `スコア : ${SCORECOUNT}`;

        GREATCOUNT++;
        greatkun.innerHTML = `Great : ${GREATCOUNT}`;

      } else if (difference > 190 && difference <= 300) {
        showPerfect();
        
        note.remove();
        COMBOCOUNT++;
        SCORECOUNT += 200;
        combokun.innerHTML = `${COMBOCOUNT}`;
        scorekun.innerHTML = `スコア : ${SCORECOUNT}`;

        PERFECTCOUNT++;
        perfectkun.innerHTML = `Perfect : ${PERFECTCOUNT}`;
        
        
      }
    }
  }

  
  
  processNoteInColumn(column);
  column.classList.remove('active');
}
}



function showPerfect() {
const perfect = document.getElementById('Perfect');
perfect.style.display = 'inline-block';
setTimeout(() => {
  perfect.style.display = 'none';
}, 300);
}

function showGreat() {
const great = document.getElementById('Great');
great.style.display = 'inline-block';
setTimeout(() => {
  great.style.display = 'none';
}, 300);
}

function showGood() {
const great = document.getElementById('Good');
great.style.display = 'inline-block';
setTimeout(() => {
  great.style.display = 'none';
}, 300);
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

      MISSCOUNT++;
      misskun.innerHTML = `Miss : ${MISSCOUNT}`;
    }
  }
}, 980);
}

// setInterval(createNote, input); /* 1秒ごとにノーツを生成する */
setInterval(createNote, 150); /* 1秒ごとにノーツを生成する */










////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////





// function applyNumber() {
//   var input = document.getElementById('numberInput').value;
//   var output = document.getElementById('output');
//   output.textContent = `現在の密度 : ${input}`;
//   setInterval(createNote, input); /* 1秒ごとにノーツを生成する */
//   note.remove();
// }
