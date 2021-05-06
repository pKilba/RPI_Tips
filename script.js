const tipsArray = ["Shortcuts can help save you precious time. Just go to the ‘Shortcuts’ dialog in the Customize menu.",
    "Sometimes you realize a split second too late that you shouldn’t have closed that tab. That’s why Chrome lets you bring it back with a few simple key strokes.",
    "You can group tabs to keep related pages together in one workspace. To create a tab group, just right-click any tab and select Add tab to new group."];


let curTipIndex = localStorage.getItem("cur_tip_index") === null ? 0 : parseInt(localStorage.getItem("cur_tip_index"));
let isTipsHidden = localStorage.getItem("is_hidden") === null ? false : localStorage.getItem("is_hidden") === "true";
let tipsContainer = document.getElementById("tips-container");

let tipsArr, dotsArr;

if (!isTipsHidden) {
    setTimeout(function () {
        tipsContainer.style.display = "flex";
    }, 5000);
    initTipsAndDotsSection();
    showTip(curTipIndex);
    addEventListener("keydown", handlePress);
}

function hideTips() {
    let checkbox = document.getElementById("checkbox");
    localStorage.setItem("is_hidden", checkbox.checked.toString())
    tipsContainer.style.display = "none";
}

function initTipsAndDotsSection() {
    let tipsInfo = document.getElementById("info");
    let dotsSection = document.getElementById("dots");
    for (let i = 0; i < tipsArray.length; i++) {
        tipsInfo.insertAdjacentHTML('beforeend', '<div class="tips__tip-data fade">' + tipsArray[i] + '</div>');
        dotsSection.insertAdjacentHTML('beforeend', '<span class="dot" onclick="setTip(' + (tipsArray.length - 1 - i) + ')"></span>');
    }
    tipsArr = document.getElementsByClassName("tips__tip-data");
    dotsArr = document.getElementsByClassName("dot");
}

function setNextTip(offset) {
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
    localStorage.setItem("cur_tip_index", curTipIndex.toString());
}


function checkCurrentTipIndex(tipIndex, tipsArr) {
    if (tipIndex >= tipsArr.length) {
        curTipIndex = 0;
    } else if (tipIndex < 0) {
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
            setNextTip(-1);
            break;
        case "ArrowRight":
            setNextTip(1);
            break;
        case "Escape":
            hideTips();
            break;
        default:
            break;
    }
}