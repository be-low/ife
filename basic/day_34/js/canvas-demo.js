var canvas = document.getElementById('demo');
if (canvas.getContext) {
    let context = canvas.getContext('2d');
    context.beginPath();
    context.moveTo(75, 25);
    context.lineTo(25, 50);
    context.lineTo(75, 75);
    context.closePath();
    context.stroke();
    console.log('redering context');
}
console.log('canvas');