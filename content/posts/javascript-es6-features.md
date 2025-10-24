---
title: "Tính năng ES6+ trong JavaScript - Modern JavaScript"
date: 2025-10-21T16:00:00+07:00
draft: false
tags: ["JavaScript", "ES6", "Modern JavaScript"]
categories: ["JavaScript"]
---

# Tính năng ES6+ trong JavaScript

ES6 (ECMAScript 2015) và các phiên bản sau đã mang đến nhiều tính năng mới giúp JavaScript hiện đại và mạnh mẽ hơn.

## Let và Const

### var vs let vs const
```javascript
// var - Function scoped (cũ, tránh dùng)
var x = 1;
if (true) {
    var x = 2; // Cùng variable
    console.log(x); // 2
}
console.log(x); // 2 - bị thay đổi

// let - Block scoped
let y = 1;
if (true) {
    let y = 2; // Variable khác
    console.log(y); // 2
}
console.log(y); // 1 - không đổi

// const - Block scoped, không thể reassign
const z = 1;
// z = 2; // Error!

// const với object - có thể thay đổi properties
const person = { name: 'Alice' };
person.name = 'Bob'; // OK
person.age = 25; // OK
// person = {}; // Error!

// const với array
const numbers = [1, 2, 3];
numbers.push(4); // OK
numbers[0] = 10; // OK
// numbers = []; // Error!
```

### Temporal Dead Zone
```javascript
// TDZ với let/const
console.log(a); // ReferenceError
let a = 5;

// var không có TDZ (hoisting)
console.log(b); // undefined
var b = 5;
```

## Arrow Functions
```javascript
// Function truyền thống
function add(a, b) {
    return a + b;
}

// Arrow function - cú pháp ngắn gọn
const add = (a, b) => {
    return a + b;
};

// Ngắn hơn nữa (implicit return)
const add = (a, b) => a + b;

// Một parameter - bỏ được dấu ngoặc
const square = x => x * x;

// Không có parameter
const sayHi = () => console.log('Hi!');

// Return object - cần dấu ngoặc
const createPerson = (name, age) => ({ name, age });

console.log(createPerson('Alice', 25));
// { name: 'Alice', age: 25 }
```

### this trong Arrow Function
```javascript
// Arrow function không có 'this' riêng
const person = {
    name: 'Alice',
    
    // Regular function - 'this' là person
    sayHiRegular: function() {
        console.log('Hi, I am ' + this.name);
    },
    
    // Arrow function - 'this' từ scope bên ngoài
    sayHiArrow: () => {
        console.log('Hi, I am ' + this.name); // undefined
    },
    
    // Ví dụ thực tế
    hobbies: ['coding', 'reading'],
    printHobbies: function() {
        // Regular function trong forEach
        this.hobbies.forEach(function(hobby) {
            // console.log(this.name + ' likes ' + hobby); // Error!
        });
        
        // Arrow function - 'this' được kế thừa
        this.hobbies.forEach(hobby => {
            console.log(this.name + ' likes ' + hobby); // OK!
        });
    }
};

person.sayHiRegular(); // "Hi, I am Alice"
person.sayHiArrow(); // "Hi, I am undefined"
person.printHobbies();
// Alice likes coding
// Alice likes reading
```

## Template Literals
```javascript
// String concatenation (cũ)
const name = 'Alice';
const age = 25;
const message = 'Hello, my name is ' + name + ' and I am ' + age + ' years old.';

// Template literals - dễ đọc hơn
const message = `Hello, my name is ${name} and I am ${age} years old.`;

// Multi-line strings
const html = `
    <div class="card">
        <h2>${name}</h2>
        <p>Age: ${age}</p>
    </div>
`;

// Expression trong template
const price = 100;
const tax = 0.1;
console.log(`Total: $${price * (1 + tax)}`); // Total: $110

// Function calls
const upperName = name => name.toUpperCase();
console.log(`Name: ${upperName('alice')}`); // Name: ALICE

// Tagged templates (advanced)
function highlight(strings, ...values) {
    return strings.reduce((result, str, i) => {
        return result + str + (values[i] ? `<strong>${values[i]}</strong>` : '');
    }, '');
}

const name = 'Alice';
const age = 25;
const result = highlight`Name: ${name}, Age: ${age}`;
console.log(result); // "Name: <strong>Alice</strong>, Age: <strong>25</strong>"
```

## Destructuring

### Array Destructuring
```javascript
// Array destructuring
const numbers = [1, 2, 3, 4, 5];

// Cũ
const first = numbers[0];
const second = numbers[1];

// ES6
const [first, second] = numbers;
console.log(first, second); // 1 2

// Skip elements
const [first, , third] = numbers;
console.log(first, third); // 1 3

// Rest operator
const [first, ...rest] = numbers;
console.log(first); // 1
console.log(rest); // [2, 3, 4, 5]

// Default values
const [a, b, c = 3] = [1, 2];
console.log(a, b, c); // 1 2 3

// Swap variables
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2 1
```

### Object Destructuring
```javascript
// Object destructuring
const person = {
    name: 'Alice',
    age: 25,
    city: 'New York'
};

// Cũ
const name = person.name;
const age = person.age;

// ES6
const { name, age } = person;
console.log(name, age); // Alice 25

// Rename variables
const { name: personName, age: personAge } = person;
console.log(personName, personAge); // Alice 25

// Default values
const { name, country = 'USA' } = person;
console.log(country); // USA

// Rest properties
const { name, ...details } = person;
console.log(details); // { age: 25, city: 'New York' }

// Nested destructuring
const user = {
    id: 1,
    name: 'Alice',
    address: {
        city: 'New York',
        country: 'USA'
    }
};

const { name, address: { city, country } } = user;
console.log(name, city, country); // Alice New York USA

// Function parameters
function greet({ name, age }) {
    console.log(`Hello ${name}, you are ${age} years old`);
}

greet(person); // Hello Alice, you are 25 years old
```

## Spread Operator (...)

### Array Spread
```javascript
// Copy array
const original = [1, 2, 3];
const copy = [...original];
console.log(copy); // [1, 2, 3]

// Concatenate arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Add elements
const numbers = [2, 3, 4];
const moreNumbers = [1, ...numbers, 5];
console.log(moreNumbers); // [1, 2, 3, 4, 5]

// Function arguments
const numbers = [1, 2, 3];
console.log(Math.max(...numbers)); // 3

// Convert string to array
const str = 'hello';
const chars = [...str];
console.log(chars); // ['h', 'e', 'l', 'l', 'o']

// Remove duplicates
const numbers = [1, 2, 2, 3, 3, 3, 4];
const unique = [...new Set(numbers)];
console.log(unique); // [1, 2, 3, 4]
```

### Object Spread
```javascript
// Copy object
const original = { name: 'Alice', age: 25 };
const copy = { ...original };
console.log(copy); // { name: 'Alice', age: 25 }

// Merge objects
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 };
console.log(merged); // { a: 1, b: 2, c: 3, d: 4 }

// Override properties
const person = { name: 'Alice', age: 25 };
const updated = { ...person, age: 26 };
console.log(updated); // { name: 'Alice', age: 26 }

// Add properties
const person = { name: 'Alice' };
const withAge = { ...person, age: 25 };
console.log(withAge); // { name: 'Alice', age: 25 }

// Conditional properties
const includeAge = true;
const person = {
    name: 'Alice',
    ...(includeAge && { age: 25 })
};
console.log(person); // { name: 'Alice', age: 25 }
```

## Rest Parameters
```javascript
// Rest parameters
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15

// Rest phải ở cuối
function greet(greeting, ...names) {
    return `${greeting} ${names.join(', ')}!`;
}

console.log(greet('Hello', 'Alice', 'Bob', 'Charlie'));
// "Hello Alice, Bob, Charlie!"

// Với destructuring
function displayPerson({ name, age, ...rest }) {
    console.log('Name:', name);
    console.log('Age:', age);
    console.log('Other info:', rest);
}

displayPerson({ name: 'Alice', age: 25, city: 'NY', country: 'USA' });
// Name: Alice
// Age: 25
// Other info: { city: 'NY', country: 'USA' }
```

## Default Parameters
```javascript
// Default parameters
function greet(name = 'Guest', message = 'Hello') {
    console.log(`${message}, ${name}!`);
}

greet(); // "Hello, Guest!"
greet('Alice'); // "Hello, Alice!"
greet('Alice', 'Hi'); // "Hi, Alice!"

// Default với expression
function createUser(name, id = Date.now()) {
    return { name, id };
}

console.log(createUser('Alice'));
// { name: 'Alice', id: 1698765432123 }

// Default với function call
function getDefaultName() {
    return 'Guest';
}

function greet(name = getDefaultName()) {
    console.log(`Hello, ${name}!`);
}

// Default với previous parameters
function multiply(a, b = a) {
    return a * b;
}

console.log(multiply(5)); // 25 (5 * 5)
console.log(multiply(5, 3)); // 15
```

## Enhanced Object Literals
```javascript
// Property shorthand
const name = 'Alice';
const age = 25;

// Cũ
const person = {
    name: name,
    age: age
};

// ES6
const person = { name, age };

// Method shorthand
const person = {
    name: 'Alice',
    
    // Cũ
    greet: function() {
        console.log('Hello!');
    },
    
    // ES6
    greet() {
        console.log('Hello!');
    }
};

// Computed property names
const propName = 'age';
const person = {
    name: 'Alice',
    [propName]: 25,
    ['is' + 'Admin']: true
};
console.log(person); // { name: 'Alice', age: 25, isAdmin: true }

// Dynamic property names
function createObject(key, value) {
    return {
        [key]: value
    };
}

console.log(createObject('name', 'Alice')); // { name: 'Alice' }
console.log(createObject('age', 25)); // { age: 25 }
```

## Classes
```javascript
// ES6 Class
class Person {
    // Constructor
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    // Method
    greet() {
        console.log(`Hello, I'm ${this.name}`);
    }
    
    // Getter
    get info() {
        return `${this.name} (${this.age})`;
    }
    
    // Setter
    set birthday(year) {
        this.age = new Date().getFullYear() - year;
    }
    
    // Static method
    static species() {
        return 'Homo sapiens';
    }
}

// Sử dụng
const person = new Person('Alice', 25);
person.greet(); // "Hello, I'm Alice"
console.log(person.info); // "Alice (25)"
person.birthday = 1998;
console.log(person.age); // 26
console.log(Person.species()); // "Homo sapiens"

// Inheritance
class Student extends Person {
    constructor(name, age, grade) {
        super(name, age); // Gọi constructor của parent
        this.grade = grade;
    }
    
    // Override method
    greet() {
        console.log(`Hi, I'm ${this.name}, a student`);
    }
    
    study() {
        console.log(`${this.name} is studying`);
    }
}

const student = new Student('Bob', 20, 'A');
student.greet(); // "Hi, I'm Bob, a student"
student.study(); // "Bob is studying"
console.log(student.info); // "Bob (20)" - kế thừa từ Person
```

## Modules (Import/Export)
```javascript
// math.js - Export
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export function multiply(a, b) {
    return a * b;
}

// Default export
export default function subtract(a, b) {
    return a - b;
}

// Alternative export syntax
const divide = (a, b) => a / b;
export { divide };

// ============================================

// app.js - Import
import subtract, { PI, add, multiply } from './math.js';

console.log(PI); // 3.14159
console.log(add(2, 3)); // 5
console.log(subtract(5, 3)); // 2

// Import everything
import * as math from './math.js';
console.log(math.PI);
console.log(math.add(2, 3));

// Rename imports
import { add as sum, multiply as product } from './math.js';
console.log(sum(2, 3)); // 5
console.log(product(2, 3)); // 6

// Re-export
export { add, multiply } from './math.js';
export * from './math.js';
```

## Promise (ES6)
```javascript
// Create Promise
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = true;
        if (success) {
            resolve('Success!');
        } else {
            reject('Error!');
        }
    }, 1000);
});

// Use Promise
myPromise
    .then(result => console.log(result))
    .catch(error => console.error(error));

// Promise chaining
function fetchUser(id) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ id, name: 'Alice' }), 1000);
    });
}

function fetchPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => resolve([{ id: 1, title: 'Post 1' }]), 1000);
    });
}

fetchUser(1)
    .then(user => {
        console.log('User:', user);
        return fetchPosts(user.id);
    })
    .then(posts => {
        console.log('Posts:', posts);
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

## Map và Set

### Map
```javascript
// Map - key-value pairs, key có thể là bất kỳ type nào
const map = new Map();

// Set values
map.set('name', 'Alice');
map.set('age', 25);
map.set(1, 'number key');
map.set(true, 'boolean key');

// Get values
console.log(map.get('name')); // 'Alice'
console.log(map.get(1)); // 'number key'

// Check exists
console.log(map.has('name')); // true

// Size
console.log(map.size); // 4

// Delete
map.delete('age');

// Iterate
for (const [key, value] of map) {
    console.log(key, value);
}

// Map methods
map.forEach((value, key) => {
    console.log(key, value);
});

console.log([...map.keys()]); // ['name', 1, true]
console.log([...map.values()]); // ['Alice', 'number key', 'boolean key']
console.log([...map.entries()]); // [['name', 'Alice'], ...]

// Clear
map.clear();
```

### Set
```javascript
// Set - collection of unique values
const set = new Set();

// Add values
set.add(1);
set.add(2);
set.add(3);
set.add(2); // Duplicate - không được thêm

console.log(set); // Set { 1, 2, 3 }
console.log(set.size); // 3

// Check exists
console.log(set.has(2)); // true

// Delete
set.delete(2);

// Iterate
for (const value of set) {
    console.log(value);
}

set.forEach(value => {
    console.log(value);
});

// Convert to Array
const arr = [...set];
console.log(arr); // [1, 3]

// Remove duplicates from array
const numbers = [1, 2, 2, 3, 3, 3, 4];
const unique = [...new Set(numbers)];
console.log(unique); // [1, 2, 3, 4]

// Clear
set.clear();
```

## Symbol
```javascript
// Symbol - unique identifier
const id1 = Symbol('id');
const id2 = Symbol('id');

console.log(id1 === id2); // false - mỗi Symbol là unique

// Use in object
const user = {
    name: 'Alice',
    [id1]: 123
};

console.log(user[id1]); // 123
console.log(user.name); // 'Alice'

// Symbol không xuất hiện trong for...in
for (const key in user) {
    console.log(key); // Chỉ in 'name'
}

// Symbol.for - Global symbols
const globalId1 = Symbol.for('userId');
const globalId2 = Symbol.for('userId');
console.log(globalId1 === globalId2); // true

// Well-known symbols
class MyArray {
    [Symbol.iterator]() {
        let index = 0;
        const data = [1, 2, 3];
        
        return {
            next() {
                if (index < data.length) {
                    return { value: data[index++], done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }
}

const arr = new MyArray();
for (const item of arr) {
    console.log(item); // 1, 2, 3
}
```

## Iterators và Generators

### Iterators
```javascript
// Custom iterator
const range = {
    from: 1,
    to: 5,
    
    [Symbol.iterator]() {
        return {
            current: this.from,
            last: this.to,
            
            next() {
                if (this.current <= this.last) {
                    return { value: this.current++, done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }
};

for (const num of range) {
    console.log(num); // 1, 2, 3, 4, 5
}
```

### Generators
```javascript
// Generator function
function* generateSequence() {
    yield 1;
    yield 2;
    yield 3;
}

const generator = generateSequence();
console.log(generator.next()); // { value: 1, done: false }
console.log(generator.next()); // { value: 2, done: false }
console.log(generator.next()); // { value: 3, done: false }
console.log(generator.next()); // { value: undefined, done: true }

// Generator với loop
function* generateNumbers(n) {
    for (let i = 1; i <= n; i++) {
        yield i;
    }
}

for (const num of generateNumbers(5)) {
    console.log(num); // 1, 2, 3, 4, 5
}

// Generator với range
function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

console.log([...range(1, 5)]); // [1, 2, 3, 4, 5]

// Infinite generator
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const ids = idGenerator();
console.log(ids.next().value); // 1
console.log(ids.next().value); // 2
console.log(ids.next().value); // 3
```

## Optional Chaining (?.) - ES2020
```javascript
const user = {
    name: 'Alice',
    address: {
        city: 'New York'
    }
};

// Cũ - phải check nhiều lần
const city = user && user.address && user.address.city;

// ES2020 - Optional chaining
const city = user?.address?.city;
console.log(city); // 'New York'

const country = user?.address?.country;
console.log(country); // undefined (không lỗi)

// With methods
const result = user?.greet?.();

// With arrays
const firstHobby = user?.hobbies?.[0];

// Real example
function displayUserCity(user) {
    // Không cần kiểm tra từng level
    const city = user?.profile?.address?.city ?? 'Unknown';
    console.log(`City: ${city}`);
}
```

## Nullish Coalescing (??) - ES2020
```javascript
// || operator - false cho 0, '', false, null, undefined
const value1 = 0 || 'default'; // 'default'
const value2 = '' || 'default'; // 'default'
const value3 = false || 'default'; // 'default'

// ?? operator - chỉ null hoặc undefined
const value4 = 0 ?? 'default'; // 0
const value5 = '' ?? 'default'; // ''
const value6 = false ?? 'default'; // false
const value7 = null ?? 'default'; // 'default'
const value8 = undefined ?? 'default'; // 'default'

// Practical example
function displayUserName(user) {
    // Nếu name là '', vẫn hiển thị '' thay vì 'Guest'
    const name = user.name ?? 'Guest';
    console.log(name);
}

displayUserName({ name: '' }); // '' (empty string)
displayUserName({ name: null }); // 'Guest'
displayUserName({}); // 'Guest'

// Combine với optional chaining
const userName = user?.name ?? 'Guest';
```

## Ví dụ tổng hợp
```javascript
// Modern JavaScript application
class TodoApp {
    constructor() {
        this.todos = [];
        this.filter = 'all';
    }
    
    // Add todo
    addTodo(text) {
        const todo = {
            id: Date.now(),
            text,
            completed: false,
            createdAt: new Date()
        };
        
        this.todos = [...this.todos, todo];
        return todo;
    }
    
    // Toggle todo
    toggleTodo(id) {
        this.todos = this.todos.map(todo =>
            todo.id === id
                ? { ...todo, completed: !todo.completed }
                : todo
        );
    }
    
    // Delete todo
    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }
    
    // Get filtered todos
    get filteredTodos() {
        switch (this.filter) {
            case 'active':
                return this.todos.filter(todo => !todo.completed);
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            default:
                return this.todos;
        }
    }
    
    // Statistics
    get stats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const active = total - completed;
        
        return { total, completed, active };
    }
    
    // Export data
    export() {
        return JSON.stringify(this.todos, null, 2);
    }
    
    // Import data
    import(jsonString) {
        try {
            this.todos = JSON.parse(jsonString);
        } catch (error) {
            console.error('Invalid JSON');
        }
    }
}

// Usage
const app = new TodoApp();

app.addTodo('Learn ES6');
app.addTodo('Build a project');
app.addTodo('Deploy to production');

app.toggleTodo(app.todos[0].id);

console.log('Filtered todos:', app.filteredTodos);
console.log('Stats:', app.stats);
console.log('Export:', app.export());
```

## Kết luận

ES6+ đã mang lại:
- **Cú pháp ngắn gọn hơn**: arrow functions, destructuring, spread operator
- **Code dễ đọc hơn**: template literals, optional chaining
- **Tính năng mạnh mẽ hơn**: classes, modules, promises
- **An toàn hơn**: let/const, strict mode mặc định

**Các tính năng quan trọng nhất:**
1. Arrow Functions
2. Destructuring
3. Spread/Rest Operators
4. Template Literals
5. Promises & Async/Await
6. Classes
7. Modules
8. Let/Const

**Tính năng ES2020-2024 đáng chú ý:**
- Optional Chaining (?.)
- Nullish Coalescing (??)
- BigInt
- Promise.allSettled()
- Dynamic import()
- Top-level await

## Tài liệu tham khảo

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [ES6 Features](https://es6-features.org/)
- [JavaScript.info](https://javascript.info/)
- [Can I Use - Browser Compatibility](https://caniuse.com/)