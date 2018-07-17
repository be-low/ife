let tableBody = document.getElementById("data-content");

const ac = 'btn-success';
let selectObj = {
    region: new Set(),
    product: new Set()
};

regionSel.onclick = function (e) {
    changeStyle(regionSel, e.target);
    updateSelectObj(regionSel, 'region');
    dataRender();
}

productSel.onclick = function (e) {
    changeStyle(productSel, e.target);
    updateSelectObj(productSel, 'product');
    dataRender();
}

//init
updateSelectObj(productSel, 'product');
updateSelectObj(regionSel, 'region');
dataRender();

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


function filtData() {
    return sourceData.filter(elem => {
        let result = true;
        for (const key in selectObj) {
            if (selectObj[key] != undefined)
                result = result && selectObj[key].has(elem[key]);
        }
        return result;
    });
}

function dataRender() {
    let data = filtData();
    let renderStr = data.reduce((accu, val, index) =>
        accu + '<tr><td>' + val.product + '</td><td>' + val.region + '</td> ' + val.sale.reduce((accu_, val_) =>
            accu_ + '<td>' + val_ + '</td>', '') + '</tr>', '');
    tableBody.innerHTML = renderStr;
}