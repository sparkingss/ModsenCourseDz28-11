/*
Задача 1: Прототипы и объекты
Условие:
Создайте объект Vehicle, который имеет следующие свойства и методы:
Свойство type, указывающее тип транспорта (например, "автомобиль").
Метод move(), который выводит в консоль сообщение: "[тип транспорта] движется.".
Создайте новый объект Car с помощью Object.create(Vehicle) и задайте ему:
Свойство type со значением "машина".
Метод move() так, чтобы он переопределял метод родителя и выводил сообщение: "Машина едет.".
*/
const Vehicle = {
    type: 'Автомобиль',
    move() {
        console.log(`${this.type} движется`);
    }
}

const Car = Object.create(Vehicle);
Car.type = 'Машина';
Car.move = function () {
    console.log('Машина едет');
}

Vehicle.move();
Car.move();

/*
Задача 2: Функция-конструктор
Условие:
Создайте функцию-конструктор Person, которая принимает два аргумента: имя (name) и возраст (age).
Каждый объект, созданный через эту функцию, должен:
Иметь метод greet(), который выводит: "Привет, меня зовут [имя], мне [возраст] лет.".
Создайте два экземпляра Person с разными именами и возрастами.
Выведите приветствия для обоих экземпляров.
*/

function Person(name, age) {
    this.name = name;
    this.age = age;

    this.greet = () => {
        console.log(`Привет, меня зовут ${this.name}, мне ${this.age} лет.`);
    }
}

const person1 = new Person('Илья', 8);
const person2 = new Person('Олег', 98);

person1.greet();
person2.greet();


/*
Задача 3: Статические методы(функции конструкторы)
Условие:
Создайте MathHelper, в котором есть:
Статический метод add(a, b), возвращающий сумму двух чисел.
Статический метод subtract(a, b), возвращающий разность двух чисел.
Статический метод multiply(a, b), возвращающий произведение двух чисел.
Демонстрируйте использование каждого метода, не создавая экземпляры класса.
*/

function MathHelper() {};

MathHelper.add = (a, b) => {
    return a + b;
}

MathHelper.subtract = (a, b) => {
    return a - b;
}

MathHelper.multiply = (a, b) => {
    return a * b;
}

console.log('Результат выражения 1 + 2 = ', MathHelper.add(1, 2));
console.log('Результат выражения 14 - 22 = ', MathHelper.subtract(14, 22));
console.log('Результат выражения: 22 * 3 = ', MathHelper.multiply(22, 3));


/*
2 уровень:
Задача 1:
Условие:
Создайте объект Vehicle с полем speed и методом move, который выводит сообщение о том, что транспортное средство движется с заданной скоростью.
Создайте объект-наследник Car, который наследует свойства и методы от Vehicle и добавляет новое поле fuelLevel (уровень топлива). Также добавьте метод refuel, который увеличивает уровень топлива.
Используйте прототипное наследование через Object.create для связи объектов Vehicle и Car.
Создайте объект myCar и вызовите его методы. Проверьте, что myCar имеет доступ как к методам, так и к свойствам родительского объекта.
*/

const newVehicle = {
    speed: 100,
    move(){
        console.log(`ТС движется со скоростью ${this.speed}`);
    }
}

const newCar = Object.create(newVehicle, {
    fuelLevel: {
        value: 60,
        writable: true,
        enumerable: true
    },
    refuel: {
        value: function(amount) {
            this.fuelLevel += amount;
        }
    }
});

const myCar = Object.create(newCar);

myCar.move();
console.log(`Уровень топлива: ${myCar.fuelLevel}`);
myCar.refuel(10);
console.log(`Уровень топлива: ${myCar.fuelLevel}`);


// Задача 2: (функции конструкторы)

/*
Создайте базовый конструктор Pet, который принимает параметры:
name — имя питомца.
age — возраст питомца.
Методы в Pet:
describe() — возвращает строку вида "Имя: [name], Возраст: [age]".
isOld() — метод, который возвращает true, если возраст питомца больше 10 лет, иначе false.
*/
function Pet(name, age) {
    this.name = name;
    this.age = age;

    this.describe = () => {
        return `Имя: ${this.name}, Возраст: ${age}`;
    }

    this.isOld = () => {
        return this.age > 10 ? true : false
    }
}


/*
Создайте конструктор Dog, который наследует от Pet и добавляет новое свойство:
breed — порода собаки.
Методы в Dog:
describe() — переопределите метод describe(), чтобы он возвращал строку вида "Имя: [name], Возраст: [age], Порода: [breed]".
bark() — возвращает строку "[name] лает!".
fetch(item) — метод, который возвращает строку "[name] приносит [item]".
*/
function Dog(name, age, breed) {
    Pet.call(this, name, age);
    this.breed = breed;
}
Dog.prototype = Object.create(Pet.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.describe = function() {
    return `Имя: ${this.name}, Возраст: ${this.age}, Порода: ${this.breed}`;
}

Dog.prototype.bark = function() {
    return `${this.name} лает`;
}

Dog.prototype.fetch = function(item) {
    return `${this.name} приносит ${item}`;
}


/*
Создайте конструктор GuardDog, который наследует от Dog и добавляет новое свойство:
trainingLevel — уровень подготовки собаки.
Методы в GuardDog:
guard() — возвращает строку "[name] охраняет территорию на уровне [trainingLevel]".
Переопределите метод bark(), чтобы он возвращал строку "[name] лает громко!", если уровень подготовки выше 5.
Добавьте статический метод compareAges(pet1, pet2) в Pet:
Метод сравнивает возраст двух питомцев и возвращает, кто старше.
*/
function GuardDog(name, age, breed, trainingLevel) {
    Dog.call(this, name, age, breed);
    this.trainingLevel = trainingLevel;
};
GuardDog.prototype = Object.create(Dog.prototype);
GuardDog.prototype.constructor = GuardDog;

GuardDog.prototype.guard = function() {
    return `${this.name} охраняет территорию на уровне ${this.trainingLevel}`;
}

GuardDog.prototype.bark = function() {
    if(this.trainingLevel > 5){
        return `${this.name} лает громко!`;
    }
    return Dog.prototype.bark.call(this); // Нужно сохранять возможность потомку выполнять те же действия, что и родитель
}

Object.defineProperty(Pet, 'compareAges', {
    value: function(pet1, pet2) {
        return pet1 > pet2 ? pet1 : pet2;
    }
});


/*
Проверьте систему:
Создайте объекты для Pet, Dog и GuardDog.
Проверьте наследование методов, добавление новых свойств, а также работу переопределённых методов.
*/
const myPet = new Pet('Elize', 9);
const myDog = new Dog('Izabel', 3, 'Husky');
const myGuardDog = new GuardDog('Richard', 12, 'Shepard', 6);

console.log('-----------');

console.log('Информация о myPet: \n',
    myPet.describe() + '\n',
    'Пожилое? ' + myPet.isOld() + '\n',
)

console.log('-----------');

console.log('Информация о myDog: \n',
    myDog.describe() + '\n',
    'Пожилое? ' + myDog.isOld() + '\n',
    `Голос! - ${myDog.name}: "${myDog.bark()}"` + '\n',
    `Неси! - ${myDog.name}: "${myDog.fetch('палку')}"` + '\n',
    `Порода - ${myDog.breed}` + '\n'
)

console.log('-----------');

console.log('Информация о myGuardDog: \n',
    myGuardDog.describe() + '\n',
    'Пожилое? ' + myGuardDog.isOld() + '\n',
    `Голос! - ${myGuardDog.name}: "${myGuardDog.bark()}"` + '\n',
    `Неси! - ${myGuardDog.name}: "${myGuardDog.fetch('палку')}"` + '\n',
    `Охраняет? ${myGuardDog.guard()}` + '\n',
    `Порода - ${myGuardDog.breed}` + '\n'
)