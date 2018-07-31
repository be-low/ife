const canvas = document.getElementById('clock');
setInterval(function () {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    drawClock(canvas);
}, 1000);

function drawClock(canvas) {
    if (canvas.getContext) {
        const context = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const center = Math.min(width, height) / 2;
        const radius = center * 0.8;
        //circle
        context.beginPath();
        context.lineWidth = 1;
        context.arc(center, center, radius, 0, Math.PI * 2);
        context.stroke();

        //12 小时
        const PI = Math.PI;

        const fontSize = radius * 0.1;
        context.font = fontSize.toString() + 'px sans-serif';
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        const hourAngle = PI / 6;
        const fontRadius = radius - fontSize;
        for (let i = 0; i < 12; i++) {
            const posX = center + fontRadius * Math.cos(hourAngle * (i - 3));
            const posY = center + fontRadius * Math.sin(hourAngle * (i - 3));
            const text = i === 0 ? '12' : i.toString();
            context.fillText(text, posX, posY);
        }

        // 时分秒
        const timeAngles = [PI / 30, PI / 30, hourAngle];
        const dateTimeMax = [60, 60, 12];
        const lineWidth = 1;
        context.lineCap = 'round';

        const date = new Date();
        const dateTime = [date.getSeconds(), date.getMinutes(), date.getHours()];
        for (let i = 0; i < dateTime.length; i++) {
            const elem = dateTime[i];
            const angle = timeAngles[i];
            const mis = dateTimeMax[i] / 4;
            context.lineWidth = lineWidth * (i + 1);
            context.beginPath();
            context.moveTo(center, center);
            const secX = center + (fontRadius - fontSize * i * 2) * Math.cos((elem - mis) * angle);
            const secY = center + (fontRadius - fontSize * i * 2) * Math.sin((elem - mis) * angle);
            context.lineTo(secX, secY);
            context.stroke();
        }
    } else {
        canvas.innerHTML = "游览器不支持 lineChartContent";
    }
}
