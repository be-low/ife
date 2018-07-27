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

const cookDom = document.getElementById('cook'),
    cookStatusDom = document.getElementById('cook-status'),
    waiterDom = document.getElementById('waiter'),
    seatDom = document.getElementById('seat'),
    cookListDom = document.getElementById('cook-list'),
    customersDom = document.getElementById('customers-list');

const customers = [],
    restaurant = getRestaurant(),
    cook = getCook(),
    waiter = getWaiter(),
    menu = [
        new Dish('fish', 10, 20, 1),
        new Dish('apple', 20, 35, 1),
        new Dish('chicken', 30, 50, 2),
        new Dish('cookie', 15, 25, 1)
    ];


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

        customer.order(menu).then((orders) => {
            waiter.getOrder().then(() => {
                waiter.giveOrder().then(() => {
                    cook.work(orders).then(() => {
                        cookStatusDom.innerHTML = 'free';
                        customer.eat().then(() =>
                            restaurant.freeSeat(seat)
                        )
                    })
                })
            })
        });
    }
}, 1000);