const singleton = function (fn) {
    let instance;
    return function () {
        return instance || (instance = fn.apply(this, arguments));
    }
};
const getWaiter = singleton(() =>
    new Waiter('waiter', 5000));

console.log(getWaiter());
console.log(getWaiter());
console.log(singleton(() => new Waiter('waiter', 1000))());
console.log(singleton(() => new Waiter('waiter', 1000))());