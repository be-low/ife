const tHeadData = [
        '商品',
        '地区',
        '1 月',
        '2 月',
        '3 月',
        '4 月',
        '5 月',
        '6 月',
        '7 月',
        '8 月',
        '9 月',
        '10 月',
        '11 月',
        '12 月'
    ],
    tHead = document.getElementById('data-head'),
    tBody = document.getElementById('data-content'),
    regionSel = document.getElementById('region-select'),
    produceSel = document.getElementById('product-select'),
    selectDom = {
        region: regionSel,
        product: produceSel,
    },
    selectGroup = document.getElementById('select-group');
const ac = 'btn-success';
let selectObj = new Select();
let sourceData_ = JSON.parse(localStorage.getItem('sourceData')) || sourceData;
createElements('th', tHeadData).forEach((e) => tHead.appendChild(e));

selectGroup.oninput = function (e) {
    syncObj(e.target);
    location.hash = selectObj.toJson();
};
window.addEventListener('hashchange', resume);
window.onload = resume;

function resume() {
    selectObj = new Select(decodeURI(location.hash.substr(1)));
    syncDom();
    updateTHead();
    updateTBody();
}

tBody.onclick = function (e) {
    const t = e.target;
    t.id = 'input';
    const resetText = t.innerText;
    let btnReset = document.createElement('button'),
        btnConfirm = document.createElement('button');
    btnReset.innerHTML = '取消';
    btnConfirm.innerHTML = '确定';
    btnConfirm.classList.add('btn');
    btnReset.classList.add('btn');
    let btns = document.createElement('div');
    btns.appendChild(btnConfirm);
    btns.appendChild(btnReset);
    btns.classList.add('btn-group');
    btns.style.position = 'absolute';
    t.appendChild(btns);

    btnConfirm.onclick = function () {
        confirm();
    };
    btnReset.onclick = function () {
        reset();
    };
    t.addEventListener('blur', confirm);
    tBody.addEventListener('keydown', function (e) {
        switch (e.key) {
            case 'Escape':
                reset();
                t.blur();
                break;
            case 'Enter':
                confirm();
                t.blur();
                break;
        }
    });

    function confirm() {
        t.removeChild(btns);
        const text = t.innerText;
        if (!isNum(text))
            alert(text + ' is not a number!');
        else {
            const rIndex = t.parentNode.rowIndex;
            const data = getData(t);
            updateData(data, rIndex);
        }
        t.id = '';
    }

    function reset() {
        t.removeChild(btns);
        t.innerText = resetText;
    }
}

function getData(target) {
    const row = target.parentNode.childNodes;
    let data = [];
    for (let i = 0; i < row.length; i++) {
        const d = row[i].innerHTML;
        if (isNum(d)) data.push(parseFloat(d));
    }
    return data;
}

function updateData(data, index) {
    cData[index].sale = data;
    localStorage.setItem('sourceData', JSON.stringify(sourceData_));
}

function find(data, row) {
    for (let i = 0; i < data.length; ++i) {
        let d = data[i];
        if (d.product === row.product && d.region == row.region) {
            return i;
        }
    }
    return -1;
}

function isNum(numStr) {
    if (typeof numStr === 'number' && !isNaN(numStr)) return true;
    else if (typeof numStr === 'string') {
        let dot = 0;
        for (let i = 0; i < numStr.length; i++) {
            const s = numStr[i];
            if (s === '.') {
                dot++;
                continue;
            }
            if (s < '0' || s > '9' || dot > 1) return false;
        }
        return dot <= 1;
    } else return false;
}