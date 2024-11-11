const result = document.querySelector('#result');
const allImgCont = document.querySelectorAll('.img-container');
const timePos = document.querySelector('#time');
const gameStart = document.querySelector('#btnStr');
// const sound = new Audio('./sound.wav');
let allowed = false;
let dragSrcElem = null;
let countSec = 30;
let setTimeId = null;

let countTime = () => {
    timePos.innerHTML = `Осталось времени: <b style="color:red;">${countSec}</b> секунд`;
    countSec--;
    if (countSec >= 0) {
        setTimeId = setTimeout(countTime, 1000);
    } else {
        clearTimeout(setTimeId);
        result.innerHTML = `<b style='color:red;'>Время вышло</b>`;
        allowed = false;
    }
}

function checkWin () {
    const allImg = document.querySelectorAll('.img-container img');
    let adjustImg = allImg[0].src.includes('slice1')
        && allImg[1].src.includes('slice2') && allImg[2].src.includes('slice3')
        && allImg[3].src.includes('slice4') && allImg[4].src.includes('slice5') 
        && allImg[5].src.includes('slice6') && allImg[6].src.includes('slice7')
        && allImg[7].src.includes('slice8') && allImg[8].src.includes('slice9');
    if(adjustImg){
        result.innerHTML = `<b style='color:lightgreen;'>Поздравляем!</b>`;
        clearTimeout(setTimeId);
        allowed = false;
    }
}

function imgStartDrag (e) {
    if (allowed) {
        dragSrcElem = this;
        e.dataTransfer.setData('text/html', this.innerHTML);
    }
}

function imgDragOver (ev) {
    if (ev.preventDefault) {
        ev.preventDefault();
    }
    return false;
}

function imgDropOn (evt) {
    if (dragSrcElem != this) {
        if (allowed) {
            dragSrcElem.innerHTML = this.innerHTML;
            this.innerHTML = evt.dataTransfer.getData('text/html');
            checkWin();
        }
        return false;
    }
}
 
allImgCont.forEach (function (item) {
    item.addEventListener('dragstart', imgStartDrag);
    item.addEventListener('dragover', imgDragOver);
    item.addEventListener('drop', imgDropOn);
});

gameStart.addEventListener('click', () => {
    allowed = true;
    if (!setTimeId) {     
        countTime();
    }
});