class LineChart {
    constructor(canvas, dataSource) {
        this.dataSource = dataSource || null;
        this.context2d = canvas.getContext('2d');
        const w = canvas.width, h = canvas.height;
        this.baseWidth = w * 0.1;
        this.baseHeight = h * 0.1;
        this.chartWidth = w * 0.8;
        this.chartHeight = h * 0.8;
    }

    drawAxis() {
        this.changeColor('#000');
        this.context2d.beginPath();
        this.context2d.moveTo(this.baseWidth, this.baseHeight);
        this.context2d.lineTo(this.baseWidth, this.baseHeight + this.chartHeight);
        this.context2d.lineTo(this.baseWidth + this.chartWidth,
            this.baseHeight + this.chartHeight);
        this.context2d.stroke();
    }

    _drawLineChart(data, max) {
        const dotWidth = this.chartWidth / data.length;
        this.context2d.beginPath();
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            const posX = this.baseWidth + dotWidth * (0.5 + i),
                posY = this.baseHeight + this.chartHeight * (1 - item / max);
            this.context2d.lineTo(posX, posY);
            this.context2d.stroke();
            this.context2d.beginPath();
            this.context2d.arc(posX, posY, 3, 0, 2 * Math.PI);
            this.context2d.fill();
            this.context2d.moveTo(posX, posY);
        }
    }

    drawLineChart(data) {
        this.clear();
        if (data.length > 0) {
            this.drawAxis();
            const d = data || this.dataSource;
            this._drawLineChart(d, Math.max(...d));
        }
    }

    drawHeapLineChart(data) {
        this.clear();
        if (data.length > 0) {
            const d = this.dataSource || data;
            this.drawAxis();
            const dataMax = Math.max(...
                d.map(elem =>
                    Math.max(...elem)));
            for (let i = 0, len = d.length; i < len; i++) {
                const item = d[i];
                let r = Math.random() * 255,
                    g = Math.random() * 255,
                    b = Math.random() * 255;
                this.changeColor('rgb(' + r + ',' + g + ',' + b + ')');
                this._drawLineChart(item, dataMax);
            }
        }
    }

    clear() {
        this.context2d.clearRect(0, 0,
            this.chartWidth / 0.8, this.chartHeight / 0.8);
    }

    changeColor(color) {
        this.context2d.strokeStyle = color;
        this.context2d.fillStyle = color;
    }
}