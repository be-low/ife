var opts = this.document.getElementsByTagName("select");
var targetDate = null;

function createChildNodes(parent, tag, startIndex, endIndex) {
    for (let i = startIndex; i <= endIndex; ++i) {
        var temp = createChildNode(parent, 'option', i.toString());
    }
}

function createChildNode(parent, tag, content) {
    var node = document.createElement(tag);
    node.innerHTML = content;
    node.value = content;
    parent.appendChild(node);
    return node;
}

function updateChildNodes(parent, tag, count) {
    let childs = parent.childNodes;
    let start = parseInt(parent.lastChild.value);
    if (count > childs.length) {
        for (let i = start + 1; i <= count; ++i) {
            createChildNode(parent, tag, i);
        }
    } else {
        for (let i = start; i > count; --i) {
            parent.removeChild(childs[i]);
        }
    }
}
//判断闰年
function isLeap(year) {
    if (year % 100 === 0) {
        if (year % 400 === 0)
            return true;
        else return false;
    } else {
        return year % 4 == 0;
    }
}

//更新 targetDate
function updateTargetDate() {
    var dateStr = "";
    for (var i = 0; i < opts.length; ++i) {
        var opt = opts[i];
        if (i < 2) dateStr += opt.value + "/";
        else if (i > 2 && i < 5) dateStr += opt.value + ":";
        else dateStr += opt.value + " ";
    }
    console.log(dateStr);
    targetDate = new Date(dateStr);
}

function updateResult() {
    var date = new Date();
    var content = "现在距离 " + dateFormat(targetDate);
    if (date < targetDate)
        content += " 还有 ";
    else
        content += " 已经过去 ";
    content += secondToDHMS(Math.abs(
        parseInt((date - targetDate) / 1000)));
    result.innerHTML = content;
}

function updateForm() {
    const dayData = [
        31, 28, 31, 30,
        31, 30, 31, 31,
        30, 31, 30, 31
    ];
    let year = opts[0].value;
    let month = opts[1].value;
    let dayElem = opts[2];
    if (isLeap(year)) {
        dayData[1] = 29;
    }
    updateChildNodes(dayElem, 'option', dayData[month - 1])
}

window.onload = function () {
    const limit = [
        [2000, 2032],
        [1, 12],
        [1, 31],
        [0, 23],
        [0, 59],
        [0, 59]
    ];
    for (let i in limit) {
        createChildNodes(opts[i], "option", limit[i][0], limit[i][1]);
    }
    updateTargetDate();
}


var result = document.getElementById("result-wrapper");
document.getElementById('select').onclick = function () {
    updateForm();
    updateTargetDate();
    updateResult();
}

setInterval(function () {
    updateResult();
}, 1000);