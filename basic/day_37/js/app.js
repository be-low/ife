const tHeadData = ["商品", "地区", "1 月", "2 月", "3 月", "4 月", "5 月", "6 月", "7 月", "8 月", "9 月", "10 月", "11 月", "12 月"],
    tHead = document.getElementById("data-head"),
    tBody = document.getElementById("data-content"),
    selectDom = {
        region: document.getElementById("region-select"),
        product: document.getElementById("product-select")
    },
    selectGroup = document.getElementById('select-group');
const ac = 'btn-success';
let selectObj = new Select();
createElements('td', tHeadData).forEach((e) => tHead.appendChild(e));

selectGroup.onclick = function (e) {
    updateStyle(e.target);
    syncObj();
    selectObj.save();
    updateTHead();
    updateTBody();
};
window.onload = function () {
    if (localStorage.getItem('select') !== undefined) {
        syncDom();
    } else {
        syncObj();
        selectObj.save();
    }
    updateTBody();
};

