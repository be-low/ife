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
        new Dish('fish', 10, 20, 3),
        new Dish('apple', 20, 35, 5),
        new Dish('chicken', 30, 50, 8),
        new Dish('cookie', 15, 25, 6)
    ];

waiter.setCook(cook);

function printTime() {
    console.log(new Date().toTimeString());
}

setInterval(function () {
    setTimeout(function () {
        if (customers.length <= 3) {
            customers.push(new Customer('customers'));
        }
    }, Math.random() * 10000);
    if (customers.length > 0 && restaurant.hasSeats()) {
        let customer = customers.shift();
        console.log(`顾客 ${customer.id} 等到座位了`);
        let seat = restaurant.getSeat();
        console.log(`顾客 ${customer.id} 就坐`);

        customer.order(menu)

    }
}, 1000);