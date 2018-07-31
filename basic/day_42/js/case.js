var ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 20,
    staff: []
});

var newCook = new Cook("Tony", 10000);
ifeRestaurant.hire(newCook);

console.log('雇用一个厨师后，staff: ' + ifeRestaurant.staff.join());


let waiter = new Waiter('Tom', 5000);
ifeRestaurant.hire(waiter);
console.log('雇用一个服务员后，staff: ' + ifeRestaurant.staff.join());
ifeRestaurant.fire(newCook);
console.log('解雇厨师后，staff: ' + ifeRestaurant.staff.join());