---
title: "JavaScript cơ bản"
date: 2025-10-21
draft: false
tags: ["JavaScript", "Web Development"]
---

# JavaScript là gì?

JavaScript là ngôn ngữ lập trình kịch bản được sử dụng rộng rãi trong phát triển web.

## Biến trong JavaScript
```javascript
// ES6 - const và let
const PI = 3.14;
let count = 0;

// Function
function greet(name) {
    return `Hello, ${name}!`;
}

console.log(greet("World"));
```

## DOM Manipulation
```javascript
// Lấy element
const button = document.querySelector('#myButton');

// Thêm event listener
button.addEventListener('click', function() {
    alert('Button clicked!');
});
```

## Arrow Functions
```javascript
// Traditional function
function add(a, b) {
    return a + b;
}

// Arrow function
const add = (a, b) => a + b;
```