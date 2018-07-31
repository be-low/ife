function Restaurant(cash, seats, staff) {
    if (typeof arguments[0] === 'object') {
        let obj = arguments[0];
        this.cash = obj.cash;
        this.seats = obj.seats;
        this.staff = obj.staff;
    } else {
        this.cash = cash;
        this.seats = seats;
        this.staff = staff;
    }
}

Restaurant.prototype.hire = function (worker) {
    this.staff.push(worker);
};

Restaurant.prototype.fire = function (worker) {
    let i = this.staff.indexOf(worker);
    if (i !== -1) {
        this.staff.splice(i, 1);
    }
};

function* IdMaker() {
    let i = 0;
    while (true) yield ++i;
}

let idMaker = IdMaker();

function Worker(name, wage) {
    this.id = idMaker.next().value;

    if (typeof arguments[0] === 'object') {
        let obj = arguments[0];
        this.name = obj.name;
        this.wage = obj.wage;
    } else {
        this.name = name;
        this.wage = wage;
    }
}

Worker.work = function () {
    console.log('do some work');
};

function Waiter(name, wage) {
    Worker.call(this, name, wage)
}

Waiter.work = function (args) {

};

function Cook(name, wage) {
    Worker.call(this, name, wage);
}

Cook.work = function () {
    console.log();
};

function Customer() {

}

Customer.orderDishes = function () {

};
Customer.eat = function () {

};

function Dish(name, cost, price) {
    this.name = name;
    this.cost = cost;
    this.price = price;
}




