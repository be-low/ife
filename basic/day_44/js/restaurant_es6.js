class Restaurant {
    constructor() {
        let obj = arguments[0];
        this.cash = obj.cash;
        this.seats = obj.seats;
        this.staff = obj.staff;
        //bool 数组 true 表示可以坐
        this.seatsStatus = new Array(obj.seats);
        this.seatsStatus.fill(true);
    }

    hire(worker) {
        this.staff.push(worker);
    }

    fire(worker) {
        let i = this.staff.indexOf(worker);
        if (i !== -1) {
            this.staff.splice(i, 1);
        }
    }

    hasSeats() {
        return this.seatsStatus.some(e => e === true);
    }

    getSeat() {
        let index = this.seatsStatus.indexOf(true);
        this.seatsStatus[index] = false;
        return index;
    }

    toString() {
        return `${this.constructor.name}: 
        {cash: ${this.cash}, seats: ${this.seats}, 
        staff: ${this.staff.join()}, seats status: ${this.seatsStatus.join()}`;
    }
}

function* idGen() {
    let i = 0;
    while (true) yield ++i;
}

class Person {
    constructor(name) {
        this.id = Worker.idGen.next().value;
        this.name = name;
    }

    toString() {
        return `${this.constructor.name}: {id: ${this.id}, name: ${this.name}}}`;
    }
}

Person.idGen = idGen();

class Worker extends Person {
    constructor(name, wage) {
        super(name);
        this.wage = wage;
    }

    work() {
    }

    toString() {
        return `${this.constructor.name}: {id: ${this.id}, name: ${this.name}}, wage: ${this.wage}`;
    }
}


class Waiter extends Worker {
    constructor(name, wage) {
        super(name, wage);
    }

    work() {
        super.work();
    }

    getOrder(index) {
        this.order = index;
    }

    giveOrder(cook) {
        cook.order = this.order;
        delete this.order;
    }

    serving() {
        console.log(`上菜`);
    }
}

class Cook extends Worker {
    constructor(name, wage) {
        super(name, wage);
    }

    work() {
        console.log(`做菜: ${menu[this.order]}`);
    }

}

class Customer extends Person {
    constructor(name) {
        super(name);
    }

    order(menu) {
        let i = Math.trunc(Math.random() * menu.length);
        console.log(`customer ${this.id} 点了 ${menu[i].name}`);
        return i;
    }

    eat() {
        console.log(`customer ${this.id} 吃饭`);
    }
}

class Dish {
    constructor(name, cost, price) {
        this.name = name;
        this.cost = cost;
        this.price = price;
    }

    toString() {
        return `${this.constructor.name}: {name: ${this.name}, cost: ${this.cost}, price: ${this.price}}`;
    }
}

