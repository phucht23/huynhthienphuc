---
title: "Stream API trong Java 8+"
date: 2025-10-21T13:00:00+07:00
draft: false
tags: ["Java", "Stream API", "Functional Programming"]
categories: ["Java"]
---

# Stream API trong Java

Stream API (Java 8+) cho phép xử lý tập hợp dữ liệu theo phong cách functional programming.

## Stream là gì?

Stream là chuỗi các phần tử hỗ trợ các thao tác tuần tự và song song.

**Đặc điểm:**
- Không lưu trữ dữ liệu
- Functional - không thay đổi nguồn
- Lazy evaluation - chỉ tính khi cần
- Có thể vô hạn

## Tạo Stream
```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

public class CreateStreamExample {
    public static void main(String[] args) {
        // 1. Từ Collection
        List<String> list = Arrays.asList("A", "B", "C");
        Stream<String> stream1 = list.stream();
        
        // 2. Từ Array
        String[] array = {"X", "Y", "Z"};
        Stream<String> stream2 = Arrays.stream(array);
        
        // 3. Từ Stream.of()
        Stream<Integer> stream3 = Stream.of(1, 2, 3, 4, 5);
        
        // 4. Stream vô hạn
        Stream<Integer> infiniteStream = Stream.iterate(0, n -> n + 2);
        
        // 5. Stream.generate()
        Stream<Double> randomNumbers = Stream.generate(Math::random);
    }
}
```

## Filter - Lọc phần tử
```java
import java.util.List;
import java.util.stream.Collectors;

public class FilterExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // Lọc số chẵn
        List<Integer> evenNumbers = numbers.stream()
            .filter(n -> n % 2 == 0)
            .collect(Collectors.toList());
        
        System.out.println("Số chẵn: " + evenNumbers);
        // Output: [2, 4, 6, 8, 10]
        
        // Lọc và in ra
        numbers.stream()
            .filter(n -> n > 5)
            .forEach(n -> System.out.println("Số > 5: " + n));
    }
}
```

## Map - Chuyển đổi phần tử
```java
public class MapExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("alice", "bob", "charlie");
        
        // Chuyển sang chữ hoa
        List<String> upperNames = names.stream()
            .map(String::toUpperCase)
            .collect(Collectors.toList());
        
        System.out.println(upperNames);
        // Output: [ALICE, BOB, CHARLIE]
        
        // Lấy độ dài tên
        List<Integer> nameLengths = names.stream()
            .map(String::length)
            .collect(Collectors.toList());
        
        System.out.println("Độ dài: " + nameLengths);
        // Output: [5, 3, 7]
        
        // Nhân đôi số
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        List<Integer> doubled = numbers.stream()
            .map(n -> n * 2)
            .collect(Collectors.toList());
        
        System.out.println("Nhân đôi: " + doubled);
        // Output: [2, 4, 6, 8, 10]
    }
}
```

## Reduce - Tính toán tổng hợp
```java
import java.util.Optional;

public class ReduceExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        
        // Tính tổng
        int sum = numbers.stream()
            .reduce(0, (a, b) -> a + b);
        System.out.println("Tổng: " + sum); // 15
        
        // Hoặc dùng Integer::sum
        int sum2 = numbers.stream()
            .reduce(0, Integer::sum);
        
        // Tìm max
        Optional<Integer> max = numbers.stream()
            .reduce((a, b) -> a > b ? a : b);
        max.ifPresent(m -> System.out.println("Max: " + m));
        
        // Tìm min
        Optional<Integer> min = numbers.stream()
            .reduce(Integer::min);
        min.ifPresent(m -> System.out.println("Min: " + m));
        
        // Nối chuỗi
        List<String> words = Arrays.asList("Java", "Stream", "API");
        String sentence = words.stream()
            .reduce("", (a, b) -> a + " " + b);
        System.out.println(sentence.trim()); // "Java Stream API"
    }
}
```

## Collect - Thu thập kết quả
```java
import java.util.stream.Collectors;
import java.util.Set;
import java.util.Map;

public class CollectExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");
        
        // Collect to List
        List<String> filteredNames = names.stream()
            .filter(n -> n.length() > 4)
            .collect(Collectors.toList());
        
        // Collect to Set
        Set<String> nameSet = names.stream()
            .collect(Collectors.toSet());
        
        // Join strings
        String joined = names.stream()
            .collect(Collectors.joining(", "));
        System.out.println(joined); // "Alice, Bob, Charlie, David"
        
        // Group by length
        Map<Integer, List<String>> groupedByLength = names.stream()
            .collect(Collectors.groupingBy(String::length));
        System.out.println(groupedByLength);
        // {3=[Bob], 5=[Alice, David], 7=[Charlie]}
        
        // Count
        long count = names.stream()
            .filter(n -> n.startsWith("A"))
            .count();
        System.out.println("Tên bắt đầu bằng A: " + count);
    }
}
```

## Sorted - Sắp xếp
```java
import java.util.Comparator;

public class SortedExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Charlie", "Alice", "Bob", "David");
        
        // Sắp xếp tăng dần
        List<String> sorted = names.stream()
            .sorted()
            .collect(Collectors.toList());
        System.out.println("Tăng dần: " + sorted);
        
        // Sắp xếp giảm dần
        List<String> reverseSorted = names.stream()
            .sorted(Comparator.reverseOrder())
            .collect(Collectors.toList());
        System.out.println("Giảm dần: " + reverseSorted);
        
        // Sắp xếp theo độ dài
        List<String> sortedByLength = names.stream()
            .sorted(Comparator.comparing(String::length))
            .collect(Collectors.toList());
        System.out.println("Theo độ dài: " + sortedByLength);
        
        // Sắp xếp số
        List<Integer> numbers = Arrays.asList(5, 2, 8, 1, 9, 3);
        List<Integer> sortedNumbers = numbers.stream()
            .sorted()
            .collect(Collectors.toList());
        System.out.println("Số sắp xếp: " + sortedNumbers);
    }
}
```

## Ví dụ thực tế - Quản lý sinh viên
```java
class Student {
    private String name;
    private int age;
    private double gpa;
    
    public Student(String name, int age, double gpa) {
        this.name = name;
        this.age = age;
        this.gpa = gpa;
    }
    
    // Getters
    public String getName() { return name; }
    public int getAge() { return age; }
    public double getGpa() { return gpa; }
    
    @Override
    public String toString() {
        return name + " (GPA: " + gpa + ")";
    }
}

public class StudentStreamExample {
    public static void main(String[] args) {
        List<Student> students = Arrays.asList(
            new Student("Alice", 20, 3.8),
            new Student("Bob", 22, 3.2),
            new Student("Charlie", 21, 3.9),
            new Student("David", 23, 3.5),
            new Student("Eve", 20, 3.7)
        );
        
        // 1. Lọc sinh viên GPA >= 3.5
        System.out.println("=== Sinh viên GPA >= 3.5 ===");
        students.stream()
            .filter(s -> s.getGpa() >= 3.5)
            .forEach(System.out::println);
        
        // 2. Tính GPA trung bình
        double avgGpa = students.stream()
            .mapToDouble(Student::getGpa)
            .average()
            .orElse(0.0);
        System.out.println("\nGPA trung bình: " + avgGpa);
        
        // 3. Tìm sinh viên có GPA cao nhất
        Student topStudent = students.stream()
            .max(Comparator.comparing(Student::getGpa))
            .orElse(null);
        System.out.println("Sinh viên xuất sắc nhất: " + topStudent);
        
        // 4. Sắp xếp theo GPA giảm dần
        System.out.println("\n=== Danh sách theo GPA ===");
        students.stream()
            .sorted(Comparator.comparing(Student::getGpa).reversed())
            .forEach(System.out::println);
        
        // 5. Lấy danh sách tên sinh viên
        List<String> names = students.stream()
            .map(Student::getName)
            .collect(Collectors.toList());
        System.out.println("\nDanh sách tên: " + names);
        
        // 6. Nhóm sinh viên theo tuổi
        Map<Integer, List<Student>> groupedByAge = students.stream()
            .collect(Collectors.groupingBy(Student::getAge));
        System.out.println("\nNhóm theo tuổi: " + groupedByAge);
        
        // 7. Đếm số sinh viên >= 21 tuổi
        long count = students.stream()
            .filter(s -> s.getAge() >= 21)
            .count();
        System.out.println("\nSố SV >= 21 tuổi: " + count);
        
        // 8. Kiểm tra có sinh viên GPA 4.0 không
        boolean hasTopGpa = students.stream()
            .anyMatch(s -> s.getGpa() == 4.0);
        System.out.println("Có SV GPA 4.0: " + hasTopGpa);
        
        // 9. Lấy 3 sinh viên đầu tiên có GPA cao nhất
        System.out.println("\n=== Top 3 sinh viên ===");
        students.stream()
            .sorted(Comparator.comparing(Student::getGpa).reversed())
            .limit(3)
            .forEach(System.out::println);
    }
}
```

## Parallel Stream - Xử lý song song
```java
public class ParallelStreamExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // Sequential stream
        long start1 = System.currentTimeMillis();
        int sum1 = numbers.stream()
            .map(n -> n * 2)
            .reduce(0, Integer::sum);
        long time1 = System.currentTimeMillis() - start1;
        System.out.println("Sequential: " + sum1 + " - " + time1 + "ms");
        
        // Parallel stream - nhanh hơn với dữ liệu lớn
        long start2 = System.currentTimeMillis();
        int sum2 = numbers.parallelStream()
            .map(n -> n * 2)
            .reduce(0, Integer::sum);
        long time2 = System.currentTimeMillis() - start2;
        System.out.println("Parallel: " + sum2 + " - " + time2 + "ms");
    }
}
```

## Các phương thức hữu ích
```java
public class StreamMethodsExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // distinct() - Loại bỏ duplicate
        List<Integer> duplicates = Arrays.asList(1, 2, 2, 3, 3, 3, 4);
        List<Integer> unique = duplicates.stream()
            .distinct()
            .collect(Collectors.toList());
        System.out.println("Unique: " + unique);
        
        // limit() - Giới hạn số phần tử
        List<Integer> first5 = numbers.stream()
            .limit(5)
            .collect(Collectors.toList());
        System.out.println("5 phần tử đầu: " + first5);
        
        // skip() - Bỏ qua n phần tử đầu
        List<Integer> skipFirst3 = numbers.stream()
            .skip(3)
            .collect(Collectors.toList());
        System.out.println("Bỏ 3 phần tử đầu: " + skipFirst3);
        
        // anyMatch() - Có phần tử nào thỏa mãn không
        boolean hasEven = numbers.stream()
            .anyMatch(n -> n % 2 == 0);
        System.out.println("Có số chẵn: " + hasEven);
        
        // allMatch() - Tất cả đều thỏa mãn không
        boolean allPositive = numbers.stream()
            .allMatch(n -> n > 0);
        System.out.println("Tất cả đều dương: " + allPositive);
        
        // noneMatch() - Không có phần tử nào thỏa mãn
        boolean noNegative = numbers.stream()
            .noneMatch(n -> n < 0);
        System.out.println("Không có số âm: " + noNegative);
        
        // findFirst() - Tìm phần tử đầu tiên
        Optional<Integer> first = numbers.stream()
            .filter(n -> n > 5)
            .findFirst();
        first.ifPresent(n -> System.out.println("Số đầu tiên > 5: " + n));
        
        // findAny() - Tìm phần tử bất kỳ
        Optional<Integer> any = numbers.stream()
            .filter(n -> n % 2 == 0)
            .findAny();
        any.ifPresent(n -> System.out.println("Số chẵn bất kỳ: " + n));
    }
}
```

## FlatMap - Làm phẳng Stream
```java
public class FlatMapExample {
    public static void main(String[] args) {
        // List của List
        List<List<Integer>> nestedList = Arrays.asList(
            Arrays.asList(1, 2, 3),
            Arrays.asList(4, 5, 6),
            Arrays.asList(7, 8, 9)
        );
        
        // Làm phẳng thành List đơn
        List<Integer> flatList = nestedList.stream()
            .flatMap(list -> list.stream())
            .collect(Collectors.toList());
        System.out.println("Flat list: " + flatList);
        // [1, 2, 3, 4, 5, 6, 7, 8, 9]
        
        // Ví dụ với String
        List<String> sentences = Arrays.asList(
            "Hello World",
            "Java Stream API",
            "FlatMap Example"
        );
        
        // Lấy tất cả các từ
        List<String> words = sentences.stream()
            .flatMap(sentence -> Arrays.stream(sentence.split(" ")))
            .collect(Collectors.toList());
        System.out.println("Words: " + words);
        // [Hello, World, Java, Stream, API, FlatMap, Example]
    }
}
```

## Peek - Debug và Side Effects
```java
public class PeekExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        
        // Peek để debug
        List<Integer> result = numbers.stream()
            .peek(n -> System.out.println("Original: " + n))
            .map(n -> n * 2)
            .peek(n -> System.out.println("After map: " + n))
            .filter(n -> n > 5)
            .peek(n -> System.out.println("After filter: " + n))
            .collect(Collectors.toList());
        
        System.out.println("Final result: " + result);
    }
}
```

## Ví dụ tổng hợp - Xử lý dữ liệu phức tạp
```java
class Product {
    private String name;
    private String category;
    private double price;
    private int stock;
    
    public Product(String name, String category, double price, int stock) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.stock = stock;
    }
    
    public String getName() { return name; }
    public String getCategory() { return category; }
    public double getPrice() { return price; }
    public int getStock() { return stock; }
    
    @Override
    public String toString() {
        return name + " ($" + price + ", stock: " + stock + ")";
    }
}

public class ProductAnalysis {
    public static void main(String[] args) {
        List<Product> products = Arrays.asList(
            new Product("Laptop", "Electronics", 1000, 5),
            new Product("Phone", "Electronics", 500, 10),
            new Product("Desk", "Furniture", 300, 3),
            new Product("Chair", "Furniture", 150, 7),
            new Product("Monitor", "Electronics", 300, 0),
            new Product("Tablet", "Electronics", 400, 8)
        );
        
        // 1. Tổng giá trị kho hàng theo category
        Map<String, Double> valueByCategory = products.stream()
            .collect(Collectors.groupingBy(
                Product::getCategory,
                Collectors.summingDouble(p -> p.getPrice() * p.getStock())
            ));
        System.out.println("Giá trị kho theo danh mục:");
        valueByCategory.forEach((cat, val) -> 
            System.out.println(cat + ": $" + val));
        
        // 2. Sản phẩm Electronics có giá > 400
        System.out.println("\nElectronics giá > $400:");
        products.stream()
            .filter(p -> p.getCategory().equals("Electronics"))
            .filter(p -> p.getPrice() > 400)
            .forEach(System.out::println);
        
        // 3. Top 3 sản phẩm đắt nhất còn hàng
        System.out.println("\nTop 3 đắt nhất (còn hàng):");
        products.stream()
            .filter(p -> p.getStock() > 0)
            .sorted(Comparator.comparing(Product::getPrice).reversed())
            .limit(3)
            .forEach(System.out::println);
        
        // 4. Số lượng sản phẩm hết hàng
        long outOfStock = products.stream()
            .filter(p -> p.getStock() == 0)
            .count();
        System.out.println("\nSản phẩm hết hàng: " + outOfStock);
        
        // 5. Giá trung bình theo category
        Map<String, Double> avgPriceByCategory = products.stream()
            .collect(Collectors.groupingBy(
                Product::getCategory,
                Collectors.averagingDouble(Product::getPrice)
            ));
        System.out.println("\nGiá trung bình theo danh mục:");
        avgPriceByCategory.forEach((cat, avg) -> 
            System.out.printf("%s: $%.2f\n", cat, avg));
        
        // 6. Tất cả sản phẩm Electronics có giá < 1000?
        boolean allAffordable = products.stream()
            .filter(p -> p.getCategory().equals("Electronics"))
            .allMatch(p -> p.getPrice() < 1000);
        System.out.println("\nTất cả Electronics < $1000: " + allAffordable);
    }
}
```

## Best Practices
```java
public class StreamBestPractices {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        
        // ✅ GOOD: Sử dụng method reference khi có thể
        numbers.stream()
            .map(String::valueOf)
            .forEach(System.out::println);
        
        // ❌ BAD: Không nên dùng lambda khi có method reference
        numbers.stream()
            .map(n -> String.valueOf(n))
            .forEach(s -> System.out.println(s));
        
        // ✅ GOOD: Tránh side effects trong stream
        List<Integer> doubled = numbers.stream()
            .map(n -> n * 2)
            .collect(Collectors.toList());
        
        // ❌ BAD: Side effects (thay đổi external state)
        List<Integer> result = new ArrayList<>();
        numbers.stream().forEach(n -> result.add(n * 2)); // Tránh làm như này
        
        // ✅ GOOD: Sử dụng parallel stream cho tác vụ CPU-intensive
        int sum = numbers.parallelStream()
            .mapToInt(Integer::intValue)
            .sum();
        
        // ✅ GOOD: Chain operations một cách hợp lý
        List<String> processed = numbers.stream()
            .filter(n -> n % 2 == 0)
            .map(n -> n * 2)
            .map(String::valueOf)
            .collect(Collectors.toList());
    }
}
```

## Kết luận

Stream API giúp:
- Code ngắn gọn, dễ đọc hơn
- Xử lý dữ liệu theo phong cách functional
- Dễ dàng chuyển đổi sang xử lý song song
- Giảm thiểu lỗi với immutable operations

**Khi nào nên dùng Stream:**
- Xử lý collection với nhiều bước biến đổi
- Cần filter, map, reduce dữ liệu
- Muốn code dễ đọc và maintain
- Cần xử lý song song dễ dàng

**Khi nào KHÔNG nên dùng Stream:**
- Loop đơn giản với ít logic
- Cần break/continue giữa chừng
- Performance critical với collection nhỏ
- Cần modify collection gốc

## Tài liệu tham khảo

- [Java Stream API Guide](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html)
- [Stream API Tutorial](https://www.baeldung.com/java-8-streams)
- [Java Stream Collectors](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Collectors.html)