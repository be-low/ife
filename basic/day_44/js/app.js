const singleton = function (fn) {
    let instance;
    return function () {
        return instance || (instance = fn.apply(this, arguments));
    }
};
const getRestaurant = singleton(() =>
    new Restaurant({cash: 1000000, seats: 1, staff: []}));
const getCook = singleton(() =>
    new Cook('cook', 10000));
const getWaiter = singleton(() =>
    new Waiter('waiter', 5000));

const customers = [],
    restaurant = getRestaurant(),
    cook = getCook(),
    waiter = getWaiter(),
    menu = [
        new Dish('fish', 10, 20),
        new Dish('apple', 20, 35),
        new Dish('chicken', 30, 50)
    ];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function printTime() {
    console.log(new Date().toTimeString());
}

setInterval(async function () {
    setTimeout(function () {
        if (customers.length <= 3) {
            customers.push(new Customer('customers'));
            console.log('又有顾客来排队了: ' + customers.join('<-'));
        }
    }, Math.random() * 1000);
    if (customers.length > 0 && restaurant.hasSeats()) {
        let cust = customers.shift();
        console.log(`顾客 ${cust.id} 终于等到有空位了`);
        let seat = restaurant.getSeat();
        console.log(`顾客 ${cust.id} 就坐`);
        await sleep(1000);

        waiter.getOrder(cust.order(menu));
        waiter.giveOrder(cook);
        await sleep(1000);

        cook.work();//做菜5秒钟
        await sleep(5000);

        waiter.serving();
        await sleep(1000);

        cust.eat();
        await sleep(1000);
        console.log(`顾客 ${cust.id} 吃完溜了`);
        restaurant.seatsStatus[seat] = true;
    }
}, 1000);