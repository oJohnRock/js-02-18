/* Функции-конструкторы
function MenuItem (color = 'white', name = 'Home', height = 100) {
    this.color = color;
    this.name = name;
    this.height = height;
}

MenuItem.prototype.makeRed = function () {
    this.color = 'red';
}

const menuItem1 = new MenuItem('blue');
const menuItem2 = new MenuItem('green', 'Contacts');


function SideMenuItem (color, name, width = 200) {
    MenuItem.call(this, color, name);
    this.width = width;
}

SideMenuItem.prototype = Object.create(MenuItem.prototype);
SideMenuItem.prototype.constructor = SideMenuItem;

const sideMenuItem1 = new SideMenuItem('orange');
const sideMenuItem2 = new SideMenuItem();
*/

// es2015 class
class MenuItem {
    constructor(color = 'white', name = 'Home', height = 100) {
        this.color = color;
        this.name = name;
        this.height = height;
    }

    makeRed() {
        this.color = 'red';
    }

    static doSomething() {
        console.log('static method');
    }
}

const menuItem1 = new MenuItem('blue');
const menuItem2 = new MenuItem('green', 'Contacts');

class SideMenuItem extends MenuItem {
    static COLOR_MAIN = 'BLUE';

    constructor(color, name, width = 200) {
        super(color, name);
        this.width = width;
    }

    makeGreen() {
        this.color = 'green';
    }

    makeRed() {
        this.color = 'orange';
    }
}

const sideMenuItem1 = new SideMenuItem();
const sideMenuItem2 = new SideMenuItem();


class Car {
    #fuel;
    static #privateStatic = '1234';

    constructor() {
        this.#fuel = 100;
    }

    ride() {
        if (this.#fuel >= 10) {
            this.#fuel -= 10;
        } else {
            console.error('Fuel is less than 10%');
        }
    }

    fill() {
        this.#fuel += 30;
        this.#privateMethod();
        console.log(Car.#privateStatic);
    }

    #privateMethod() {
        console.log('#privateMethod');
    }

    get fuel() {
        console.log('get fuel');
        return `Fuel of car is ${this.#fuel}%`;
    }

    set fuel(value) {
        console.log('call fuel setter with value:', value);
        if (value < 0) {
            this.#fuel = 0;
        } else if (value > 100) {
            this.#fuel = 100;
        } else {
            this.#fuel = value;
        }
    }
}
