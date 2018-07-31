var arr = [43, 54, 4, -4, 84, 100, 58, 27, 140];

function compareNum(a, b) {
    return a - b;
}

console.log(arr.join() + " \nsorted: ")
console.log(arr.sort(compareNum).join());

var arr = ['apple', 'dog', 'cat', 'car', 'zoo', 'orange', 'airplane'];

console.log(arr.join() + " \nsorted: ");
console.log(arr.sort().join());
console.log("reverse sorted: ");
console.log(arr.sort((a, b) => a < b ? 1 : (a == b ? 0 : -1)).join());


var arr = [
    [10, 14],
    [16, 60],
    [7, 44],
    [26, 35],
    [22, 63]
];

console.log(arr)
console.log("sorted: ");
console.log(arr.sort((a, b) => a[1] > b[1] ? -1 : (a[1] == b[1] ? 0 : 1)));


var arr = [{
    id: 1,
    name: 'candy',
    value: 40
}, {
    id: 2,
    name: 'Simon',
    value: 50
}, {
    id: 3,
    name: 'Tony',
    value: 45
}, {
    id: 4,
    name: 'Annie',
    value: 60
}];

console.log(arr)
console.log("sorted: ");
console.log(arr.sort((a, b) =>
    a.value < b.value ? -1 :
    (a.value == b.value ? 0 : 1)
));