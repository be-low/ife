var regionSel = document.getElementById("region-select");
var tableBody = document.getElementById("data-content");

regionSel.onchange = function () {
    let region = regionSel.value;
    dataRender(filtData(region));
}

function filtData(region) {
    return sourceData.filter(elem =>
        elem.region === region
    );
}

function dataRender(data) {
    let renderStr = data.reduce((accu, val, index) =>
        accu + '<tr><td>' + val.product + ' </td><td>' + val.region + '</td> ' + val.sale.reduce((accu_, val_) =>
            accu_ + '<td>' + val_ + '</td>', '') + '</tr>', '');
    tableBody.innerHTML = renderStr;
}