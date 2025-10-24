---
title: "Lập trình hướng đối tượng (OOP) trong Java"
date: 2025-10-21T10:00:00+07:00
draft: false
tags: ["Java", "OOP", "Programming"]
categories: ["Java"]
---

# Lập trình hướng đối tượng trong Java

OOP (Object-Oriented Programming) là nền tảng của Java với 4 tính chất cơ bản.

## 4 Tính chất của OOP

### 1. Tính đóng gói (Encapsulation)
```java
public class BankAccount {
    private double balance;
    private String accountNumber;
    
    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }
    
    // Getter
    public double getBalance() {
        return balance;
    }
    
    // Setter với validation
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Nạp tiền thành công: " + amount);
        }
    }
    
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Rút tiền thành công: " + amount);
        } else {
            System.out.println("Số dư không đủ!");
        }
    }
}
```

### 2. Tính kế thừa (Inheritance)
```java
// Lớp cha
public class Animal {
    protected String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    public void eat() {
        System.out.println(name + " đang ăn");
    }
}

// Lớp con
public class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }
    
    public void bark() {
        System.out.println(name + " đang sủa: Woof!");
    }
    
    @Override
    public void eat() {
        System.out.println(name + " đang ăn thức ăn cho chó");
    }
}
```

### 3. Tính đa hình (Polymorphism)
```java
public class Calculator {
    // Method overloading - Đa hình compile-time
    public int add(int a, int b) {
        return a + b;
    }
    
    public double add(double a, double b) {
        return a + b;
    }
    
    public int add(int a, int b, int c) {
        return a + b + c;
    }
}

// Method overriding - Đa hình runtime
public static void main(String[] args) {
    Animal myDog = new Dog("Buddy");
    myDog.eat(); // Gọi method của Dog (override)
}
```

### 4. Tính trừu tượng (Abstraction)
```java
// Abstract class
public abstract class Shape {
    protected String color;
    
    public Shape(String color) {
        this.color = color;
    }
    
    // Abstract method
    public abstract double calculateArea();
    
    // Concrete method
    public void displayColor() {
        System.out.println("Màu sắc: " + color);
    }
}

// Implement abstract class
public class Circle extends Shape {
    private double radius;
    
    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }
    
    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }
}
```

## Interface trong Java
```java
public interface Drawable {
    void draw();
    
    // Default method (Java 8+)
    default void print() {
        System.out.println("Đang in hình...");
    }
}

public class Rectangle implements Drawable {
    private double width, height;
    
    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }
    
    @Override
    public void draw() {
        System.out.println("Vẽ hình chữ nhật: " + width + "x" + height);
    }
}
```

## Ví dụ thực tế
```java
public class Main {
    public static void main(String[] args) {
        // Tạo tài khoản
        BankAccount account = new BankAccount("123456", 1000);
        account.deposit(500);
        account.withdraw(200);
        System.out.println("Số dư: " + account.getBalance());
        
        // Sử dụng kế thừa
        Dog dog = new Dog("Rex");
        dog.eat();
        dog.bark();
        
        // Sử dụng abstraction
        Shape circle = new Circle("Đỏ", 5.0);
        circle.displayColor();
        System.out.println("Diện tích: " + circle.calculateArea());
        
        // Sử dụng interface
        Drawable rect = new Rectangle(10, 20);
        rect.draw();
        rect.print();
    }
}
```

## Kết luận

OOP giúp code dễ bảo trì, tái sử dụng và mở rộng. Nắm vững 4 tính chất này là nền tảng để trở thành Java developer giỏi.

## Tài liệu tham khảo

- [Oracle Java OOP Concepts](https://docs.oracle.com/javase/tutorial/java/concepts/)
- [Java Design Patterns](https://refactoring.guru/design-patterns/java)