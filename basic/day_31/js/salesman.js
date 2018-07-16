let tableBody = document.getElementById("data-content");
let selGroup = document.getElementById("select-group");
let select = new Select();

regionSel.onchange = function () {
    let region = regionSel.value;
}

selGroup.onchange = function () {
    select.region = regionSel.value;
    select.product = productSel.value;
    dataRender(filtData())
}

function Select(arr) {
    if (arr != undefined) {
        this.region = arr[0];
        this.product = arr[1];
    }
}

function filtData() {
    return sourceData.filter(elem => {
        let result = true;
        for (const key in select) {
            if (select[key] != undefined)
                result = result && select[key] === elem[key];
        }
        return result;
    });
}

function dataRender(data) {
    let renderStr = data.reduce((accu, val, index) =>
        accu + '<tr><td>' + val.product + ' </td><td>' + val.region + '</td> ' + val.sale.reduce((accu_, val_) =>
            accu_ + '<td>' + val_ + '</td>', '') + '</tr>', '');
    tableBody.innerHTML = renderStr;
}