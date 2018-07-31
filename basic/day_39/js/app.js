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
const barChartDom = document.getElementById('bar-chart'),
    lineChartDom = document.getElementById('line-chart');
const lineChart = new LineChart(lineChartDom);
const ac = 'btn-success';
let selectObj = new Select();
let sourceData_ = JSON.parse(localStorage.getItem('sourceData')) || sourceData;
createElements('th', tHeadData).forEach((e) => tHead.appendChild(e));

selectGroup.oninput = function (e) {
    syncObj(e.target);
    history.pushState(selectObj.toJson(), '',
        location.href.split('#')[0] + '#' + selectObj.toJson());
    flash();
};
window.addEventListener('hashchange', resume);
window.onload = function (e) {
    resume(location.hash.substr(1));
};
window.onpopstate = function (e) {
    console.log(decodeURI(e.state));
    resume(e.state);
};
tBody.onmouseover = function (e) {
    const data = getData(e.target);
    drawBarChart(barChartDom, data);
    lineChart.drawLineChart(data);
};
tBody.onmouseout = function (e) {
    for (let i of barChartDom.children) {
        barChartDom.removeChild(i);
    }
    lineChart.drawHeapLineChart(dataFilter().map(e => e.sale));
};

function flash() {
    syncDom();
    updateTHead();
    updateTBody();
    lineChart.drawHeapLineChart(dataFilter().map(e => e.sale));
}

function resume(state) {
    let state_ = decodeURI(state);
    if (state_) {
        selectObj = new Select(state_);
        flash();
    }
}

tBody.onclick = function (e) {
    const t = e.target;
    if (isNum(t.innerText)) {
        t.id = 'edit';
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
};

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