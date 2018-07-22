class Select {
    constructor(json) {
        if (!(json === 'undefined' || json === undefined)) {
            let temp = JSON.parse(json);
            this.region = new Set(temp.region);
            this.product = new Set(temp.product);
        } else {
            this.region = new Set();
            this.product = new Set();
        }
    }

    toJson() {
        return JSON.stringify(this, (k, v) => {
            if (v instanceof Set)
                return [...v];
            else
                return v;
        });
    }
}

function syncDom() {
    for (let field in selectObj) {
        let s = selectObj[field],
            sd = selectDom[field];
        let all = sd.querySelector('input.select-all'),
            checks = sd.querySelectorAll('input.select-opt');
        all.checked = s.size >= checks.length;
        checks.forEach((e, i) => {
            checks[i].checked = s.has(e.value);
        });
    }
}

function syncObj(t) {
    for (let field in selectDom) {
        let checks = selectDom[field].querySelectorAll('input.select-opt'),
            all = selectDom[field].querySelector('input.select-all');
        let sel = selectObj[field];
        if (t === all) {
            if (t.checked)
                checks.forEach((e, i) => {
                    sel.add(e.value);
                    checks[i].checked = t.checked;
                });
            else
                checks.forEach((e, i) => {
                    sel.delete(e.value);
                    checks[i].checked = t.checked;
                });
        } else {
            checks.forEach(e => {
                if (e.checked)
                    selectObj[field].add(e.value);
                else
                    selectObj[field].delete(e.value);
            });
            all.checked = selectObj[field].size >= checks.length;
        }
    }
}

function dataFilter() {
    return sourceData_.filter(elem => {
        let result = true;
        for (const field in selectObj) {
            if (selectObj[field])
                result = result && selectObj[field].has(elem[field]);
        }
        return result;
    });
}

let cData = null;

function updateTBody() {
    cData = dataFilter();
    if (cData.length > 0) {
        let templates = generateTemplate(cData);
        tBody.innerHTML = templates.reduce((accu, elem, index) =>
            accu + elem.replace('&product',
            cData[index].product).replace('&region',
            cData[index].region).replace('&sale',
            cData[index].sale.reduce(
                (
                    accu2,
                    elem) => accu2 +
                    '<td contenteditable="true" class="editable">' +
                    elem +
                    '</td>',
                '')), '');
    } else
        tBody.innerHTML = '';
}

function generateTemplate(data) {
    let size = data.length || 0;
    let regionNum = selectObj.region.size || 0,
        productNum = selectObj.product.size || 0,
        templates = new Array(size || 0);
    const tempPR = '<tr><th rowspan="0">\&product</th><th>\&region</th>\&sale</tr>',
        tempR = '<tr><th>\&region</th>\&sale</tr>',
        tempRP = '<tr><th rowspan="0">\&region</th><th>\&product</th>\&sale</tr>',
        tempP = '<tr><th>\&product</th>\&sale</tr>';
    templates.fill('');
    if (productNum === 1) {
        templates = templates.map((elem, index) => {
            if (index === 0)
                return tempPR;
            else
                return tempR;
        });
    } else if (regionNum === 1) {
        templates = templates.map((elem, index) => {
            if (index === 0)
                return tempRP;
            else
                return tempP;
        });
    } else {
        //这里大概很复杂
        let templateTemp = '<tr><th rowspan="\&num">\&product</th><th>\&region</th>\&sale</tr>';
        let index = 0,
            num = 1;
        for (let i = 1; i < size; ++i) {
            let node = data[i];
            if (node.product === data[index].product) {
                num++;
                templates[i] = tempR;
            } else {
                templates[index] = templateTemp.replace('&num', num);
                num = 1;
                index = i;
            }
        }
        templates[index] = templateTemp.replace('&num', num);
    }
    return templates;
}

function createElements(tag, texts, attributes) {
    let elems = [];
    for (const item of texts) {
        let elem = document.createElement(tag);
        elem.innerHTML = item;
        for (const attr in attributes) {
            elem[attr] = attributes[attr];
        }
        elems.push(elem);
    }
    return elems;
}

function updateTHead() {
    let isProductFirst = true;
    if (selectObj.product.size > 1 && selectObj.region.size === 1)
        isProductFirst = false;
    if (isProductFirst) {
        tHeadData[0] = '商品';
        tHeadData[1] = '地区';
    } else {
        tHeadData[0] = '地区';
        tHeadData[1] = '商品';
    }
    let nodes = tHead.children;
    for (let i = 0; i < nodes.length; ++i) {
        if (nodes[i].innerHTML !== tHeadData[i]) {
            nodes[i].innerHTML = tHeadData[i];
        }
    }
}