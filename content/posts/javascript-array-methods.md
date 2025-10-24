---
title: "Các phương thức Array quan trọng trong JavaScript"
date: 2025-10-21T14:00:00+07:00
draft: false
tags: ["JavaScript", "Array", "ES6"]
categories: ["JavaScript"]
---

# Array Methods trong JavaScript

JavaScript cung cấp nhiều phương thức mạnh mẽ để thao tác với mảng.

## map() - Chuyển đổi mảng
```javascript
// Tạo mảng mới với các phần tử đã chuyển đổi
const numbers = [1, 2, 3, 4, 5];

// Nhân đôi mỗi số
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Chuyển đổi object
const users = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 }
];

const names = users.map(user => user.name);
console.log(names); // ['Alice', 'Bob']

// Thêm thuộc tính mới
const usersWithId = users.map((user, index) => ({
    ...user,
    id: index + 1
}));
console.log(usersWithId);
// [{ name: 'Alice', age: 25, id: 1 }, { name: 'Bob', age: 30, id: 2 }]
```

## filter() - Lọc mảng
```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Lọc số chẵn
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4, 6, 8, 10]

// Lọc số lớn hơn 5
const greaterThanFive = numbers.filter(num => num > 5);
console.log(greaterThanFive); // [6, 7, 8, 9, 10]

// Lọc user theo điều kiện
const users = [
    { name: 'Alice', age: 25, active: true },
    { name: 'Bob', age: 17, active: false },
    { name: 'Charlie', age: 30, active: true }
];

const activeAdults = users.filter(user => user.age >= 18 && user.active);
console.log(activeAdults);
// [{ name: 'Alice', age: 25, active: true }, { name: 'Charlie', age: 30, active: true }]
```

## reduce() - Tính toán tổng hợp
```javascript
const numbers = [1, 2, 3, 4, 5];

// Tính tổng
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log('Tổng:', sum); // 15

// Tính tích
const product = numbers.reduce((acc, num) => acc * num, 1);
console.log('Tích:', product); // 120

// Tìm max
const max = numbers.reduce((max, num) => num > max ? num : max, numbers[0]);
console.log('Max:', max); // 5

// Đếm số lần xuất hiện
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const count = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});
console.log(count); // { apple: 3, banana: 2, orange: 1 }

// Nhóm theo thuộc tính
const people = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 25 }
];

const groupedByAge = people.reduce((acc, person) => {
    const age = person.age;
    if (!acc[age]) acc[age] = [];
    acc[age].push(person);
    return acc;
}, {});
console.log(groupedByAge);
// { 25: [{name: 'Alice', age: 25}, {name: 'Charlie', age: 25}], 30: [{name: 'Bob', age: 30}] }
```

## find() và findIndex()
```javascript
const users = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 25 }
];

// find() - Tìm phần tử đầu tiên thỏa mãn
const user = users.find(u => u.id === 2);
console.log(user); // { id: 2, name: 'Bob', age: 30 }

const youngUser = users.find(u => u.age < 30);
console.log(youngUser); // { id: 1, name: 'Alice', age: 25 }

// findIndex() - Tìm index của phần tử
const index = users.findIndex(u => u.name === 'Charlie');
console.log(index); // 2

// Không tìm thấy
const notFound = users.find(u => u.age > 50);
console.log(notFound); // undefined
```

## some() và every()
```javascript
const numbers = [1, 2, 3, 4, 5];

// some() - Có ít nhất 1 phần tử thỏa mãn
const hasEven = numbers.some(num => num % 2 === 0);
console.log('Có số chẵn:', hasEven); // true

const hasNegative = numbers.some(num => num < 0);
console.log('Có số âm:', hasNegative); // false

// every() - Tất cả đều thỏa mãn
const allPositive = numbers.every(num => num > 0);
console.log('Tất cả đều dương:', allPositive); // true

const allEven = numbers.every(num => num % 2 === 0);
console.log('Tất cả đều chẵn:', allEven); // false

// Ứng dụng thực tế
const users = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 17 }
];

const hasMinor = users.some(user => user.age < 18);
console.log('Có người chưa đủ 18:', hasMinor); // true

const allAdults = users.every(user => user.age >= 18);
console.log('Tất cả đều trưởng thành:', allAdults); // false
```

## forEach() - Duyệt mảng
```javascript
const numbers = [1, 2, 3, 4, 5];

// Cơ bản
numbers.forEach(num => {
    console.log(num * 2);
});

// Với index và array
numbers.forEach((num, index, arr) => {
    console.log(`Index ${index}: ${num} (total: ${arr.length})`);
});

// Ứng dụng thực tế
const cart = [
    { name: 'Laptop', price: 1000, quantity: 1 },
    { name: 'Mouse', price: 20, quantity: 2 }
];

let total = 0;
cart.forEach(item => {
    total += item.price * item.quantity;
});
console.log('Tổng tiền:', total); // 1040
```

## sort() - Sắp xếp
```javascript
// Sắp xếp số
const numbers = [5, 2, 8, 1, 9];
numbers.sort((a, b) => a - b); // Tăng dần
console.log(numbers); // [1, 2, 5, 8, 9]

numbers.sort((a, b) => b - a); // Giảm dần
console.log(numbers); // [9, 8, 5, 2, 1]

// Sắp xếp chuỗi
const names = ['Charlie', 'Alice', 'Bob'];
names.sort();
console.log(names); // ['Alice', 'Bob', 'Charlie']

// Sắp xếp object
const students = [
    { name: 'Alice', grade: 85 },
    { name: 'Bob', grade: 92 },
    { name: 'Charlie', grade: 78 }
];

students.sort((a, b) => b.grade - a.grade);
console.log(students);
// [{ name: 'Bob', grade: 92 }, { name: 'Alice', grade: 85 }, { name: 'Charlie', grade: 78 }]

// Sắp xếp theo nhiều tiêu chí
students.sort((a, b) => {
    if (a.grade === b.grade) {
        return a.name.localeCompare(b.name);
    }
    return b.grade - a.grade;
});
```

## includes(), indexOf(), lastIndexOf()
```javascript
const fruits = ['apple', 'banana', 'orange', 'apple'];

// includes() - Kiểm tra tồn tại
console.log(fruits.includes('banana')); // true
console.log(fruits.includes('grape')); // false

// indexOf() - Tìm vị trí đầu tiên
console.log(fruits.indexOf('apple')); // 0
console.log(fruits.indexOf('grape')); // -1

// lastIndexOf() - Tìm vị trí cuối cùng
console.log(fruits.lastIndexOf('apple')); // 3

// Với startIndex
console.log(fruits.indexOf('apple', 1)); // 3
```

## slice() và splice()
```javascript
const numbers = [1, 2, 3, 4, 5];

// slice() - Không thay đổi mảng gốc
const sliced = numbers.slice(1, 4);
console.log(sliced); // [2, 3, 4]
console.log(numbers); // [1, 2, 3, 4, 5] - không đổi

// splice() - Thay đổi mảng gốc
const arr = [1, 2, 3, 4, 5];

// Xóa phần tử
arr.splice(2, 1); // Xóa 1 phần tử tại index 2
console.log(arr); // [1, 2, 4, 5]

// Thêm phần tử
arr.splice(2, 0, 99, 100); // Thêm tại index 2
console.log(arr); // [1, 2, 99, 100, 4, 5]

// Thay thế
arr.splice(1, 2, 'a', 'b'); // Xóa 2, thêm 'a', 'b' tại index 1
console.log(arr); // [1, 'a', 'b', 100, 4, 5]
```

## concat() và join()
```javascript
// concat() - Nối mảng
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = arr1.concat(arr2);
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Hoặc dùng spread operator
const combined2 = [...arr1, ...arr2];
console.log(combined2); // [1, 2, 3, 4, 5, 6]

// join() - Nối thành chuỗi
const words = ['Hello', 'World', 'JavaScript'];
console.log(words.join(' ')); // "Hello World JavaScript"
console.log(words.join('-')); // "Hello-World-JavaScript"
console.log(words.join('')); // "HelloWorldJavaScript"
```

## Ví dụ thực tế kết hợp
```javascript
// Quản lý danh sách sản phẩm
const products = [
    { id: 1, name: 'Laptop', price: 1000, category: 'Electronics', inStock: true },
    { id: 2, name: 'Mouse', price: 20, category: 'Electronics', inStock: true },
    { id: 3, name: 'Desk', price: 300, category: 'Furniture', inStock: false },
    { id: 4, name: 'Chair', price: 150, category: 'Furniture', inStock: true },
    { id: 5, name: 'Monitor', price: 300, category: 'Electronics', inStock: true }
];

// 1. Lọc sản phẩm còn hàng và giá < 500
const availableProducts = products
    .filter(p => p.inStock && p.price < 500)
    .map(p => ({ name: p.name, price: p.price }));
console.log('Sản phẩm khả dụng:', availableProducts);

// 2. Tính tổng giá trị kho hàng
const totalValue = products
    .filter(p => p.inStock)
    .reduce((sum, p) => sum + p.price, 0);
console.log('Tổng giá trị:', totalValue);

// 3. Nhóm theo category
const byCategory = products.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
}, {});
console.log('Theo danh mục:', byCategory);

// 4. Tìm sản phẩm đắt nhất
const mostExpensive = products.reduce((max, p) => 
    p.price > max.price ? p : max
);
console.log('Đắt nhất:', mostExpensive);

// 5. Sắp xếp theo giá giảm dần
const sortedByPrice = [...products]
    .sort((a, b) => b.price - a.price)
    .map(p => `${p.name}: $${p.price}`);
console.log('Sắp xếp theo giá:', sortedByPrice);

// 6. Kiểm tra có sản phẩm Electronics không
const hasElectronics = products.some(p => p.category === 'Electronics');
console.log('Có Electronics:', hasElectronics);

// 7. Tất cả sản phẩm có giá > 10?
const allExpensive = products.every(p => p.price > 10);
console.log('Tất cả > $10:', allExpensive);
```

## Kết luận

Array methods giúp:
- Code ngắn gọn, dễ đọc
- Tránh mutations không mong muốn
- Functional programming style
- Hiệu suất tốt với built-in methods

## Tài liệu tham khảo

- [MDN Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [JavaScript Array Methods Guide](https://www.freecodecamp.org/news/complete-introduction-to-the-most-useful-javascript-array-methods/)