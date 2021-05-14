const TIME = 5000;
let containerForTips = document.getElementById("tipsContainer");
let isTipsHidden = false;
let curTipIndex = 0;
const DISABLETIPS = document.getElementById('checkbox1');    
let tipsArr;
let dotsArr;


const infoTips = [
    'Oh, you can’t help that, we’re all mad here.',
    'Off with their heads!.',
    'Sometimes I’ve believed as many as six impossible things before breakfast.',
    ' Every adventure requires a first step.'

];


function showTipMenu(){
    containerForTips.style.display = "flex";
}

tipsHidden();

function tipsHidden(){
    if (!isTipsHidden) {
        if(  localStorage.getItem('is_hidden') !== 'true') 
        {
        isTipsHidden= true;
        setTimeout(showTipMenu, TIME);
        initTipsAndDotsSection();
        showTip(0);
        addEventListener("keydown", handlePress);
        }
    }
    
}


DISABLETIPS.addEventListener('click', function () {
    localStorage.setItem('is_hidden', this.checked);
});


function hideTips() {
    containerForTips.style.display = "none";
}

function initTipsAndDotsSection() {
    let tipsInfo = document.getElementById("info");
    let dotsSection = document.getElementById("dots");
    for (let i = 0; i < infoTips.length; i++) {
        tipsInfo.insertAdjacentHTML('beforeend', '<div class="tipsTipData fade">' + infoTips[i] + '</div>');
        dotsSection.insertAdjacentHTML('beforeend', '<span class="dot" onclick="setTip(' + (infoTips.length - 1 - i) + ')"></span>');
    }
    tipsArr = document.getElementsByClassName("tipsTipData");
    dotsArr = document.getElementsByClassName("dot");
}

function nextTip(offset) {
    showTip(curTipIndex += offset);
}

function setTip(tipIndex) {
    showTip(curTipIndex = tipIndex);
}

function showTip(tipIndex) {
    checkCurrentTipIndex(tipIndex, tipsArr);
    resetDisplayStyle(tipsArr, dotsArr);
    tipsArr[curTipIndex].style.display = "block";
    dotsArr[curTipIndex].className += " active";
}


function checkCurrentTipIndex(tipIndex, tipsArr) {
    if (tipIndex >= tipsArr.length) {
        curTipIndex = 0;
    } 
    else if (tipIndex < 0) {
        curTipIndex = tipsArr.length - 1;
    }
}

function resetDisplayStyle(tipsArr, dotsArr) {
    for (let i = 0; i < tipsArr.length; i++) {
        tipsArr[i].style.display = "none";
        dotsArr[i].className = dotsArr[i].className.replace("active", "");
    }
}

function handlePress(e) {
    switch (e.key) {
        case "ArrowLeft":
            nextTip(-1);
            break;
        case "ArrowRight":
            nextTip(+1);
            break;
        case "Escape":
            hideTips();
            break;
        default:
            break;
    }
}
