---
title: "Xử lý ngoại lệ (Exception Handling) trong Java"
date: 2025-10-21T11:00:00+07:00
draft: false
tags: ["Java", "Exception", "Error Handling"]
categories: ["Java"]
---

# Exception Handling trong Java

Exception là sự kiện bất thường xảy ra trong quá trình chạy chương trình, làm gián đoạn luồng thực thi.

## Phân loại Exception
```
Throwable
├── Error (Không thể xử lý)
│   ├── OutOfMemoryError
│   └── StackOverflowError
└── Exception
    ├── RuntimeException (Unchecked)
    │   ├── NullPointerException
    │   ├── ArrayIndexOutOfBoundsException
    │   └── ArithmeticException
    └── IOException (Checked)
        ├── FileNotFoundException
        └── SQLException
```

## Try-Catch-Finally
```java
public class ExceptionExample {
    public static void main(String[] args) {
        try {
            int result = divide(10, 0);
            System.out.println("Kết quả: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Lỗi: Không thể chia cho 0");
            System.out.println("Chi tiết: " + e.getMessage());
        } finally {
            System.out.println("Khối finally luôn được thực thi");
        }
    }
    
    public static int divide(int a, int b) {
        return a / b;
    }
}
```

## Multiple Catch Blocks
```java
public class MultiCatchExample {
    public static void readFile(String filename) {
        try {
            FileReader file = new FileReader(filename);
            BufferedReader reader = new BufferedReader(file);
            
            String line = reader.readLine();
            int number = Integer.parseInt(line);
            
            System.out.println("Số đọc được: " + number);
            
            reader.close();
            
        } catch (FileNotFoundException e) {
            System.out.println("Không tìm thấy file: " + filename);
        } catch (IOException e) {
            System.out.println("Lỗi đọc file: " + e.getMessage());
        } catch (NumberFormatException e) {
            System.out.println("Lỗi chuyển đổi số: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Lỗi khác: " + e.getMessage());
        }
    }
}
```

## Try-with-Resources (Java 7+)
```java
public class TryWithResourcesExample {
    public static void readFile(String filename) {
        // Tự động đóng resource
        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.out.println("Lỗi đọc file: " + e.getMessage());
        }
        // Không cần finally để đóng reader
    }
}
```

## Throw và Throws
```java
public class CustomValidation {
    // Throws - khai báo exception có thể ném ra
    public static void validateAge(int age) throws IllegalArgumentException {
        if (age < 0 || age > 150) {
            // Throw - ném exception
            throw new IllegalArgumentException("Tuổi không hợp lệ: " + age);
        }
        System.out.println("Tuổi hợp lệ: " + age);
    }
    
    public static void main(String[] args) {
        try {
            validateAge(200);
        } catch (IllegalArgumentException e) {
            System.out.println("Lỗi: " + e.getMessage());
        }
    }
}
```

## Custom Exception
```java
// Tạo exception tùy chỉnh
public class InsufficientFundsException extends Exception {
    private double amount;
    
    public InsufficientFundsException(double amount) {
        super("Số dư không đủ. Thiếu: " + amount);
        this.amount = amount;
    }
    
    public double getAmount() {
        return amount;
    }
}

// Sử dụng custom exception
public class BankAccount {
    private double balance;
    
    public BankAccount(double balance) {
        this.balance = balance;
    }
    
    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            double shortage = amount - balance;
            throw new InsufficientFundsException(shortage);
        }
        balance -= amount;
        System.out.println("Rút tiền thành công: " + amount);
    }
    
    public static void main(String[] args) {
        BankAccount account = new BankAccount(1000);
        
        try {
            account.withdraw(1500);
        } catch (InsufficientFundsException e) {
            System.out.println(e.getMessage());
            System.out.println("Số tiền thiếu: " + e.getAmount());
        }
    }
}
```

## Best Practices
```java
public class BestPractices {
    // ❌ BAD: Catch quá rộng
    public void badPractice() {
        try {
            // code
        } catch (Exception e) {
            // Không nên catch Exception quá rộng
        }
    }
    
    // ✅ GOOD: Catch cụ thể
    public void goodPractice() {
        try {
            // code
        } catch (IOException e) {
            // Xử lý cụ thể
            log.error("IO Error", e);
        } catch (SQLException e) {
            // Xử lý cụ thể
            log.error("Database Error", e);
        }
    }
    
    // ✅ GOOD: Cleanup trong finally
    public void cleanupExample() {
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("...");
            // Làm việc với database
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
```

## Kết luận

Exception handling giúp:
- Xử lý lỗi một cách có kiểm soát
- Tách biệt code xử lý lỗi và logic chính
- Làm chương trình robust và dễ bảo trì hơn

## Tài liệu tham khảo

- [Java Exception Handling](https://docs.oracle.com/javase/tutorial/essential/exceptions/)
- [Best Practices for Exception Handling](https://www.baeldung.com/java-exceptions)