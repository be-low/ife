function addAttributes(dom, attributes) {
    for (let i in attributes) {
        dom.setAttribute(i, attributes[i]);
    }
}

function drawBarChart(container, data) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    container.appendChild(svg);
    //svg 宽高
    const svgWidth = parseFloat(container.style.width) || 400,
        svgHeight = parseFloat(container.style.height) || 400;

    let svgStyle = {
        height: svgHeight,
        width: svgWidth,
    };
    addAttributes(svg, svgStyle);

    //坐标轴
    const width = svgWidth * 0.8, height = svgHeight * 0.8;
    const baseWidth = svgWidth / 10, baseHeight = svgHeight / 10;
    let axis = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let axisStyle = {
        fill: 'transparent',
        stroke: 'black',
        d: 'M ' + baseWidth + ' ' + baseHeight +
        ' v ' + height +
        ' h ' + width
    };
    addAttributes(axis, axisStyle);
    svg.appendChild(axis);


    //柱形图
    const space = 0.4;
    const colWidth_ = width / data.length;
    const colWidth = colWidth_ * (1 - space);
    const dataMax = Math.max(...data);

    for (let i in data) {
        const colHeight = height * (data[i] / dataMax);
        const posX = baseWidth + colWidth_ * (space / 2 + parseInt(i)),
            posY = baseHeight + height - colHeight;
        let rectStyle = {
            width: colWidth,
            height: colHeight,
            x: posX,
            y: posY,
            fill: '#AAAAFF'
        };

        let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        addAttributes(rect, rectStyle);
        svg.appendChild(rect);
    }
}

const barChart = document.getElementById('bar-chart');
// drawBarChart(barChart, sourceData[0].sale);
