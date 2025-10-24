---
title: "Collections Framework trong Java"
date: 2025-10-21T12:00:00+07:00
draft: false
tags: ["Java", "Collections", "Data Structures"]
categories: ["Java"]
---

# Collections Framework trong Java

Collections Framework cung cấp các cấu trúc dữ liệu và thuật toán để lưu trữ và xử lý tập hợp đối tượng.

## Hierarchy của Collections
```
Collection
├── List (Có thứ tự, cho phép duplicate)
│   ├── ArrayList
│   ├── LinkedList
│   └── Vector
├── Set (Không có thứ tự, không duplicate)
│   ├── HashSet
│   ├── LinkedHashSet
│   └── TreeSet
└── Queue (FIFO)
    ├── PriorityQueue
    └── Deque (LinkedList)

Map (Key-Value pairs)
├── HashMap
├── LinkedHashMap
└── TreeMap
```

## ArrayList - List động
```java
import java.util.ArrayList;
import java.util.List;

public class ArrayListExample {
    public static void main(String[] args) {
        // Tạo ArrayList
        List<String> fruits = new ArrayList<>();
        
        // Thêm phần tử
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");
        fruits.add("Banana"); // Duplicate OK
        
        System.out.println("Danh sách: " + fruits);
        
        // Truy cập phần tử
        System.out.println("Phần tử đầu: " + fruits.get(0));
        
        // Kiểm tra tồn tại
        if (fruits.contains("Apple")) {
            System.out.println("Có Apple trong danh sách");
        }
        
        // Xóa phần tử
        fruits.remove("Banana"); // Xóa phần tử đầu tiên
        fruits.remove(0); // Xóa theo index
        
        // Kích thước
        System.out.println("Số phần tử: " + fruits.size());
        
        // Duyệt qua ArrayList
        for (String fruit : fruits) {
            System.out.println("- " + fruit);
        }
        
        // Lambda expression (Java 8+)
        fruits.forEach(fruit -> System.out.println("* " + fruit));
    }
}
```

## LinkedList - List liên kết
```java
import java.util.LinkedList;

public class LinkedListExample {
    public static void main(String[] args) {
        LinkedList<Integer> numbers = new LinkedList<>();
        
        // Thêm vào đầu/cuối
        numbers.add(10);          // Thêm vào cuối
        numbers.addFirst(5);      // Thêm vào đầu
        numbers.addLast(15);      // Thêm vào cuối
        
        System.out.println("LinkedList: " + numbers);
        
        // Lấy phần tử đầu/cuối
        System.out.println("Phần tử đầu: " + numbers.getFirst());
        System.out.println("Phần tử cuối: " + numbers.getLast());
        
        // Xóa đầu/cuối
        numbers.removeFirst();
        numbers.removeLast();
        
        System.out.println("Sau khi xóa: " + numbers);
    }
}
```

## HashSet - Set không trùng lặp
```java
import java.util.HashSet;
import java.util.Set;

public class HashSetExample {
    public static void main(String[] args) {
        Set<String> uniqueNames = new HashSet<>();
        
        // Thêm phần tử
        uniqueNames.add("Alice");
        uniqueNames.add("Bob");
        uniqueNames.add("Alice"); // Duplicate - không được thêm
        
        System.out.println("HashSet: " + uniqueNames); // Chỉ có 2 phần tử
        System.out.println("Kích thước: " + uniqueNames.size()); // 2
        
        // Kiểm tra tồn tại
        if (uniqueNames.contains("Alice")) {
            System.out.println("Alice có trong set");
        }
        
        // Xóa phần tử
        uniqueNames.remove("Bob");
        
        // Duyệt qua Set
        for (String name : uniqueNames) {
            System.out.println(name);
        }
    }
}
```

## HashMap - Lưu cặp Key-Value
```java
import java.util.HashMap;
import java.util.Map;

public class HashMapExample {
    public static void main(String[] args) {
        // Tạo HashMap
        Map<String, Integer> scores = new HashMap<>();
        
        // Thêm cặp key-value
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        scores.put("Charlie", 92);
        
        System.out.println("HashMap: " + scores);
        
        // Lấy value theo key
        int aliceScore = scores.get("Alice");
        System.out.println("Điểm của Alice: " + aliceScore);
        
        // Kiểm tra key tồn tại
        if (scores.containsKey("Bob")) {
            System.out.println("Bob có trong danh sách");
        }
        
        // Kiểm tra value tồn tại
        if (scores.containsValue(92)) {
            System.out.println("Có người đạt 92 điểm");
        }
        
        // Update value
        scores.put("Alice", 98); // Cập nhật điểm mới
        
        // Xóa entry
        scores.remove("Bob");
        
        // Duyệt qua HashMap
        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
        
        // Lambda (Java 8+)
        scores.forEach((name, score) -> 
            System.out.println(name + " đạt " + score + " điểm")
        );
    }
}
```

## TreeSet - Set có thứ tự
```java
import java.util.TreeSet;

public class TreeSetExample {
    public static void main(String[] args) {
        TreeSet<Integer> sortedNumbers = new TreeSet<>();
        
        // Thêm phần tử - tự động sắp xếp
        sortedNumbers.add(50);
        sortedNumbers.add(20);
        sortedNumbers.add(80);
        sortedNumbers.add(30);
        
        System.out.println("TreeSet (đã sắp xếp): " + sortedNumbers);
        // Output: [20, 30, 50, 80]
        
        // Lấy phần tử nhỏ nhất/lớn nhất
        System.out.println("Nhỏ nhất: " + sortedNumbers.first());
        System.out.println("Lớn nhất: " + sortedNumbers.last());
        
        // Lấy subset
        System.out.println("Từ 30 đến 80: " + sortedNumbers.subSet(30, 80));
    }
}
```

## So sánh các Collection
```java
public class CollectionComparison {
    public static void main(String[] args) {
        // ArrayList vs LinkedList
        List<String> arrayList = new ArrayList<>(); // Truy cập nhanh O(1)
        List<String> linkedList = new LinkedList<>(); // Thêm/xóa nhanh O(1)
        
        // HashSet vs TreeSet
        Set<Integer> hashSet = new HashSet<>(); // Không thứ tự, nhanh
        Set<Integer> treeSet = new TreeSet<>(); // Có thứ tự, chậm hơn
        
        // HashMap vs TreeMap
        Map<String, Integer> hashMap = new HashMap<>(); // Không thứ tự
        Map<String, Integer> treeMap = new TreeMap<>(); // Thứ tự theo key
    }
}
```

## Ví dụ thực tế
```java
public class StudentManagement {
    public static void main(String[] args) {
        // Lưu danh sách sinh viên
        List<String> students = new ArrayList<>();
        students.add("Nguyễn Văn A");
        students.add("Trần Thị B");
        students.add("Lê Văn C");
        
        // Lưu điểm sinh viên
        Map<String, Double> grades = new HashMap<>();
        grades.put("Nguyễn Văn A", 8.5);
        grades.put("Trần Thị B", 9.0);
        grades.put("Lê Văn C", 7.5);
        
        // Tìm sinh viên có điểm cao nhất
        String topStudent = "";
        double maxGrade = 0;
        
        for (Map.Entry<String, Double> entry : grades.entrySet()) {
            if (entry.getValue() > maxGrade) {
                maxGrade = entry.getValue();
                topStudent = entry.getKey();
            }
        }
        
        System.out.println("Sinh viên điểm cao nhất: " + topStudent);
        System.out.println("Điểm: " + maxGrade);
    }
}
```

## Kết luận

Collections Framework giúp:
- Quản lý dữ liệu hiệu quả
- Giảm thiểu code boilerplate
- Cung cấp các thuật toán tối ưu

## Tài liệu tham khảo

- [Java Collections Tutorial](https://docs.oracle.com/javase/tutorial/collections/)
- [Collections Framework Overview](https://www.baeldung.com/java-collections)