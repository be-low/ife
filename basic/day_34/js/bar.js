var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
var content = document.getElementById('bar');
content.appendChild(svg);
bar(sourceData[0].sale, svg);

function bar(dataSource, svg) {
    let frame = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let frameStyle = {
        fill: 'transparent',
        stroke: 'black',
        d: 'M 10 10 v +40 h +86'
    }
    for (let i in frameStyle) {
        frame.setAttribute(i, frameStyle[i]);
    }
    svg.appendChild(frame);

    let svgStyle = {
        height: '500',
        width: '500',
        viewBox: '0 0 100 100'
    };

    for (let i in svgStyle) {
        svg.setAttribute(i, svgStyle[i]);
    }
    let rectStyle = {
        width: '5',
        fill: 'blue',
    };
    const maximum = Math.max(...dataSource);
    const maxPixel = 40;
    let x = 12;
    const yRef = 10;

    //生成矩形
    for (let item of dataSource) {
        let pixel = maxPixel * (item / maximum);
        let y = yRef + (maxPixel - pixel);
        let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        for (let i in rectStyle) {
            rect.setAttribute(i, rectStyle[i]);
        }
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('height', pixel);
        x += 7;
        svg.appendChild(rect);
    }
}