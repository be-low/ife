function getAttrsArray(objectArr, attrName) {
    let arrTemp = [];
    objectArr.map(elem => {
        let attr = elem[attrName];
        if (!arrTemp.includes(attr)) {
            arrTemp.push(attr);
            return true;
        }
    });
    return arrTemp;
}

function createElements(tag, innerHTMLs, attributes) {
    let elems = [];
    for (const item of innerHTMLs) {
        elems.push(createElement(tag, item, attributes));
    }
    return elems;
}

function createElement(tag, innerHTML, attributes) {
    let elem = document.createElement(tag);
    elem.innerHTML = innerHTML;
    elem = addAttribute(elem, attributes);
    return elem;
}

function addAttribute(elem, attributes) {
    if (typeof attributes === 'object') {
        for (const attr in attributes) {
            elem[attr] = attributes[attr];
        }
    }
    return elem;

}

function appendChilds(parent, elems) {
    for (let elem of elems) {
        parent.appendChild(elem);
    }
}

//生成选项  这生成好麻烦，手写HTML

const headData = ["商品", "地区", "1 月", "2 月", "3 月", "4 月", "5 月", "6 月", "7 月", "8 月", "9 月", "10 月", "11 月", "12 月"];
const regionSel = document.getElementById("region-select");
const productSel = document.getElementById("product-select");
const tHead = document.getElementById("data-head");

appendChilds(tHead, createElements('td', headData));

function updateTableHead() {
    updateHeadData();
    let nodes = tHead.children;
    for (let i = 0; i < nodes.length; ++i) {
        if (nodes[i].innerHTML !== headData[i]) {
            nodes[i].innerHTML = headData[i];
        }
    }
}

function updateHeadData() {
    let isProductFirst = true;
    if (selectObj.product.size > 1 && selectObj.region.size === 1)
        isProductFirst = false;
    if (isProductFirst) {
        headData[0] = '商品';
        headData[1] = '地区';
    } else {
        headData[0] = '地区';
        headData[1] = '商品';
    }
}