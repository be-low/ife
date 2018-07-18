let tableBody = document.getElementById("data-content");
const ac = 'btn-success';
let selectObj = {
    region: new Set(),
    product: new Set()
};
//init
updateSelectObj(productSel, 'product');
updateSelectObj(regionSel, 'region');
dataRender();

regionSel.onclick = function (e) {
    changeStyle(regionSel, e.target);
    updateSelectObj(regionSel, 'region');
    dataRender();
    updateChart();
};

productSel.onclick = function (e) {
    changeStyle(productSel, e.target);
    updateSelectObj(productSel, 'product');
    updateTableHead();
    dataRender();
    updateChart();
};

function updateChart() {
    lineChart.drawHeapLineChart(filterData().map(elem => elem.sale));
}

function changeStyle(parent, target) {
    let nodes = parent.children;
    if (target.value === 'full') {
        for (let i = 0; i < nodes.length; ++i) {
            if (isSelected(target)) {
                disSelect(nodes[i]);
            } else {
                select(nodes[i]);
            }
        }
    } else {
        reverseStyle(target);
        let all = true;
        for (let i = 0; i < nodes.length - 1; ++i) {
            all = all && isSelected(nodes[i]);
        }
        if (all) select(nodes[nodes.length - 1]);
        else disSelect(nodes[nodes.length - 1]);
    }
}

function reverseStyle(target) {
    if (isSelected(target)) {
        disSelect(target);
    } else {
        select(target);
    }
}

function isSelected(target) {
    return target.classList.contains(ac);
}

function select(target) {
    target.classList.add(ac);
}

function disSelect(target) {
    target.classList.remove(ac);
}

function updateSelectObj(parent, key) {
    let nodes = parent.children;
    for (let node of nodes) {
        if (isSelected(node)) {
            selectObj[key].add(node.value);
        } else {
            selectObj[key].delete(node.value);
        }
    }
}

function filterData() {
    return sourceData.filter(elem => {
        let result = true;
        for (const key in selectObj) {
            if (selectObj[key] !== undefined)
                result = result && selectObj[key].has(elem[key]);
        }
        return result;
    });
}

function dataRender() {
    let data = filterData();
    let templates = generateTemplate(data);
    let renderStr = templates.reduce((accu, elem, index) =>
        accu + templateHandle(elem, data[index]), '');
    if (renderStr === 'undefined') renderStr = '';
    tableBody.innerHTML = renderStr;
}

function generateTemplate(data) {
    let size = data.length || 0;
    let regionNum = selectObj.region.size || 0,
        productNum = selectObj.product.size || 0,
        templates = new Array(size || 0);
    templates.fill('');
    if (productNum === 1) {
        templates = templates.map((elem, index) => {
            if (index === 0)
                return '<tr><td rowspan="0">\&product</td><td>\&region</td>\&sale</tr>';
            else
                return '<tr><td>\&region</td>\&sale</tr>';
        });
    } else if (regionNum === 1) {
        templates = templates.map((elem, index) => {
            if (index === 0)
                return '<tr><td rowspan="0">\&region</td><td>\&product</td>\&sale</tr>';
            else
                return '<tr><td>\&product</td>\&sale</tr>';
        });
    } else {
        //这里大概很复杂
        let templateTemp = '<tr><td rowspan="\&num">\&product</td><td>\&region</td>\&sale</tr>';
        let index = 0,
            num = 1;
        for (let i = 1; i < size; ++i) {
            let node = data[i];
            if (node.product === data[index].product) {
                num++;
                templates[i] = '<tr><td>\&region</td>\&sale</tr>';
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

function templateHandle(template, obj) {
    if (obj === undefined) return;
    return template.replace('&product', obj.product)
        .replace('&region', obj.region)
        .replace('&sale', obj.sale.reduce((accu, elem) =>
            accu + '<td>' + elem + '</td>', ''));
}