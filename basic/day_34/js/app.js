function getData(target) {
    const row = target.parentNode.childNodes;
    let data = [];
    for (let i = 0; i < row.length; i++) {
        const d = row[i].innerHTML;
        if (isNum(d)) data.push(parseFloat(d));
    }
    return data;
}

function removeChilds(parent) {
    while (parent.childNodes.length > 0) {
        parent.removeChild(parent.childNodes[0]);
    }
}

tBody.onmouseover = function (e) {
    const tar = e.target;
    tar.classList.add('active');
    const data = getData(tar);
    drawBarChart(barChart, data);
    lineChart.drawLineChart(data);
};

tBody.onmouseout = function (e) {
    const tar = e.target;
    tar.classList.remove('active');
    removeChilds(barChart);
    updateChart();
};

const lineChartElem = document.getElementById('line-chart');
const lineChart = new LineChart(lineChartElem);
updateChart();