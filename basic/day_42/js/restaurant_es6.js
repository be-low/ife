class Restaurant {
    constructor() {
        let obj = arguments[0];
        this.cash = obj.cash;
        this.seats = obj.seats;
        this.staff = obj.staff;
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
}

function* idGen() {
    let i = 0;
    while (true) yield ++i;
}

class Worker {
    constructor(name, wage) {
        this.id = Worker.idGen.next().value;
        this.name = name;
        this.wage = wage;
    }

    work() {
    }

    toString() {
        return `${this.constructor.name}: {id: ${this.id}, name: ${this.name}, wage: ${this.wage}}`;
    }
}

Worker.idGen = idGen();

class Waiter extends Worker {
    constructor(name, wage) {
        super(name, wage);
    }

    work() {
        super.work();
    }
}

class Cook extends Worker {
    constructor(name, wage) {
        super(name, wage);
    }

    work() {
        super.work();
    }
}

class Customer {
    order() {
    }

    eat() {
    }
}

class Dish {
    constructor(name, cost, price) {
        this.name = name;
        this.cost = cost;
        this.price = price;
    }
}