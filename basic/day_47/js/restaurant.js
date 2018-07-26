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

    freeSeat(index) {
        this.seatsStatus[index] = true;
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
        return `${this.constructor.name}: {id: ${this.id}, name: ${this.name}}`;
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
        this.cook = null;
    }

    setCook(cook) {
        this.cook = cook;
    }

    getOrder(customer) {
        this.orders = customer.orders;
    }

    giveOrder(cook) {
        cook.orders = this.orders;
        this.orders = null;
    }

    serving(name) {
        console.log(`上: ` + name);
    }
}

class Cook extends Worker {
    constructor(name, wage) {
        super(name, wage);
    }

    work() {
        let tasks = [];
        this.orders.forEach(dish =>
            tasks.push(this.cookDish(dish))
        );
        let promice = Promise.resolve();
        for (let i = 0; i < tasks.length; i++) {
            promice = promice.then(tasks[i]);
        }
        return promice;
    }

}

class Customer extends Person {
    constructor(name) {
        super(name);
    }

    order(menu) {
        return new Promise(resolve => {
            const cnt = menu.length, selCnt = parseInt((cnt - 1) * Math.random()) + 1;
            let orderIndex = menu.map((e, i) => i);
            for (let i = 0; i < selCnt; i++) {
                const index = parseInt(Math.random() * (cnt - i) + i);
                let temp = orderIndex[i];
                orderIndex.copyWithin(i, index, index + 1);
                orderIndex[index] = temp;
            }
            orderIndex.splice(selCnt);
            this.orders = menu.filter((e, i) => orderIndex.includes(i));
            setTimeout(resolve, 3000);
        })
    }

    eat() {
        console.log(`customer ${this.id} 吃饭`);
    }
}

class Dish {
    constructor(name, cost, price, time) {
        this.name = name;
        this.cost = cost;
        this.price = price;
        this.time = time;
    }

    toString() {
        return `${this.constructor.name}: {name: ${this.name}, cost: ${this.cost}, price: ${this.price}}, ${this.time}`;
    }
}

