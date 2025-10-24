---
title: "Giới thiệu về Java"
date: 2025-10-21
draft: false
tags: ["Java", "Programming", "Tutorial"]
categories: ["Java"]
---

# Java là gì?

Java là ngôn ngữ lập trình hướng đối tượng mạnh mẽ, được phát triển bởi Sun Microsystems (nay thuộc Oracle).

## Đặc điểm của Java

1. **Platform Independent** - Viết một lần, chạy mọi nơi (Write Once, Run Anywhere)
2. **Object-Oriented** - Hướng đối tượng hoàn toàn
3. **Secure** - Bảo mật cao với Java Security Manager
4. **Robust** - Mạnh mẽ với garbage collection tự động

## Hello World trong Java
```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

## Các khái niệm cơ bản

### Class và Object
```java
public class Student {
    private String name;
    private int age;
    
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public void displayInfo() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
    }
}
```

## Tài liệu tham khảo

- [Oracle Java Documentation](https://docs.oracle.com/en/java/)
- [Java Tutorials](https://docs.oracle.com/javase/tutorial/)