let sourceData = [{
    product: "手机",
    region: "华东",
    sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
}, {
    product: "手机",
    region: "华北",
    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}, {
    product: "手机",
    region: "华南",
    sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
}, {
    product: "笔记本",
    region: "华东",
    sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
}, {
    product: "笔记本",
    region: "华北",
    sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
}, {
    product: "笔记本",
    region: "华南",
    sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
}, {
    product: "智能音箱",
    region: "华东",
    sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
}, {
    product: "智能音箱",
    region: "华北",
    sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
}, {
    product: "智能音箱",
    region: "华南",
    sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
}];

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
    if (typeof attributes == 'object') {
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
var regionSel = document.getElementById("region-select");
var productSel = document.getElementById("product-select");
var tableHead = document.getElementById("data-head");

appendChilds(tableHead, createElements('td', headData));

function updateTableHead() {
    updateHeadData();
    let nodes = tableHead.children;
    for (let i = 0; i < nodes.length; ++i) {
        if (nodes[i].innerHTML !== headData[i]) {
            nodes[i].innerHTML = headData[i];
        }
    }
}

function updateHeadData() {
    let isProductFirst = true;
    if (selectObj.product.size > 1 && selectObj.region.size == 1)
        isProductFirst = false;
    if (isProductFirst) {
        headData[0] = '商品';
        headData[1] = '地区';
    } else {
        headData[0] = '地区';
        headData[1] = '商品';
    }
}