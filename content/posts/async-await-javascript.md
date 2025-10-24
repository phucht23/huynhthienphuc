---
title: "Async/Await trong JavaScript - Xử lý bất đồng bộ"
date: 2025-10-21T15:00:00+07:00
draft: false
tags: ["JavaScript", "Async", "Promises"]
categories: ["JavaScript"]
---

# Async/Await trong JavaScript

Async/Await là cú pháp giúp viết code bất đồng bộ trông giống như đồng bộ, dễ đọc và maintain hơn.

## Lịch sử: Callbacks → Promises → Async/Await

### 1. Callbacks (Cách cũ)
```javascript
// Callback Hell - Khó đọc, khó maintain
function getUserData(userId, callback) {
    setTimeout(() => {
        callback({ id: userId, name: 'Alice' });
    }, 1000);
}

function getPosts(userId, callback) {
    setTimeout(() => {
        callback([{ id: 1, title: 'Post 1' }]);
    }, 1000);
}

function getComments(postId, callback) {
    setTimeout(() => {
        callback([{ id: 1, text: 'Great post!' }]);
    }, 1000);
}

// Callback Hell
getUserData(1, (user) => {
    console.log('User:', user);
    getPosts(user.id, (posts) => {
        console.log('Posts:', posts);
        getComments(posts[0].id, (comments) => {
            console.log('Comments:', comments);
            // Callback hell tiếp tục...
        });
    });
});
```

### 2. Promises (ES6)
```javascript
// Promise - Tốt hơn callbacks
function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ id: userId, name: 'Alice' });
        }, 1000);
    });
}

function getPosts(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([{ id: 1, title: 'Post 1' }]);
        }, 1000);
    });
}

function getComments(postId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([{ id: 1, text: 'Great post!' }]);
        }, 1000);
    });
}

// Promise chaining
getUserData(1)
    .then(user => {
        console.log('User:', user);
        return getPosts(user.id);
    })
    .then(posts => {
        console.log('Posts:', posts);
        return getComments(posts[0].id);
    })
    .then(comments => {
        console.log('Comments:', comments);
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

### 3. Async/Await (ES2017) - Tốt nhất
```javascript
// Async/Await - Dễ đọc nhất
async function displayUserData() {
    try {
        const user = await getUserData(1);
        console.log('User:', user);
        
        const posts = await getPosts(user.id);
        console.log('Posts:', posts);
        
        const comments = await getComments(posts[0].id);
        console.log('Comments:', comments);
    } catch (error) {
        console.error('Error:', error);
    }
}

displayUserData();
```

## Cú pháp Async/Await
```javascript
// Khai báo async function
async function myFunction() {
    // await chỉ dùng được trong async function
    const result = await somePromise();
    return result;
}

// Arrow function
const myFunction = async () => {
    const result = await somePromise();
    return result;
};

// Async function luôn trả về Promise
async function getValue() {
    return 42;
}

getValue().then(value => console.log(value)); // 42

// Tương đương với:
function getValue2() {
    return Promise.resolve(42);
}
```

## Ví dụ với Fetch API
```javascript
// Fetch dữ liệu từ API
async function getUser(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Lỗi khi fetch user:', error);
        throw error;
    }
}

// Sử dụng
async function displayUser() {
    try {
        const user = await getUser(1);
        console.log('Tên:', user.name);
        console.log('Email:', user.email);
        console.log('Địa chỉ:', user.address.city);
    } catch (error) {
        console.error('Không thể hiển thị user:', error);
    }
}

displayUser();
```

## Xử lý nhiều Promise cùng lúc

### Promise.all() - Chạy song song
```javascript
async function getAllData() {
    try {
        console.log('Bắt đầu fetch...');
        
        // Chạy song song tất cả requests
        const [users, posts, comments] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json()),
            fetch('https://jsonplaceholder.typicode.com/posts').then(r => r.json()),
            fetch('https://jsonplaceholder.typicode.com/comments').then(r => r.json())
        ]);
        
        console.log('Users:', users.length);
        console.log('Posts:', posts.length);
        console.log('Comments:', comments.length);
        
        return { users, posts, comments };
    } catch (error) {
        console.error('Error:', error);
    }
}

getAllData();
```

### Promise.allSettled() - Đợi tất cả (kể cả lỗi)
```javascript
async function fetchMultipleAPIs() {
    const results = await Promise.allSettled([
        fetch('https://api1.example.com/data'),
        fetch('https://api2.example.com/data'),
        fetch('https://api-that-fails.com/data') // API này có thể lỗi
    ]);
    
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            console.log(`API ${index + 1} thành công:`, result.value);
        } else {
            console.error(`API ${index + 1} thất bại:`, result.reason);
        }
    });
}
```

### Promise.race() - Lấy kết quả đầu tiên
```javascript
async function getFastestResponse() {
    try {
        // Lấy response nhanh nhất
        const result = await Promise.race([
            fetch('https://api1.example.com/data'),
            fetch('https://api2.example.com/data'),
            fetch('https://api3.example.com/data')
        ]);
        
        const data = await result.json();
        console.log('Fastest response:', data);
    } catch (error) {
        console.error('Fastest request failed:', error);
    }
}

// Timeout với Promise.race()
async function fetchWithTimeout(url, timeout = 5000) {
    const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), timeout)
    );
    
    try {
        const response = await Promise.race([
            fetch(url),
            timeoutPromise
        ]);
        
        return await response.json();
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

// Sử dụng
fetchWithTimeout('https://jsonplaceholder.typicode.com/users/1', 3000)
    .then(data => console.log(data))
    .catch(err => console.error(err));
```

### Promise.any() - Lấy thành công đầu tiên
```javascript
async function getFirstSuccessful() {
    try {
        // Lấy response thành công đầu tiên
        const result = await Promise.any([
            fetch('https://api1.example.com/data'),
            fetch('https://api2.example.com/data'),
            fetch('https://api3.example.com/data')
        ]);
        
        const data = await result.json();
        console.log('First successful:', data);
    } catch (error) {
        console.error('All requests failed:', error);
    }
}
```

## Error Handling

### Try-Catch
```javascript
async function fetchData(url) {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        if (error.name === 'TypeError') {
            console.error('Network error:', error);
        } else {
            console.error('Error fetching data:', error);
        }
        // Có thể throw lại hoặc return giá trị mặc định
        return null;
    }
}
```

### Finally Block
```javascript
async function fetchWithCleanup() {
    let loading = true;
    
    try {
        console.log('Loading started...');
        
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const data = await response.json();
        
        console.log('Data:', data);
        return data;
        
    } catch (error) {
        console.error('Error:', error);
        throw error;
        
    } finally {
        // Luôn chạy dù có lỗi hay không
        loading = false;
        console.log('Loading finished');
    }
}

fetchWithCleanup();
```

### Multiple Catch Blocks (Workaround)
```javascript
async function fetchWithSpecificErrors() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        return data;
        
    } catch (error) {
        // Xử lý các loại lỗi khác nhau
        if (error.name === 'TypeError') {
            console.error('Network error - check internet connection');
        } else if (error.message.includes('HTTP 404')) {
            console.error('Resource not found');
        } else if (error.message.includes('HTTP 500')) {
            console.error('Server error');
        } else {
            console.error('Unknown error:', error);
        }
        
        throw error;
    }
}
```

## Sequential vs Parallel Execution

### Sequential (Tuần tự)
```javascript
async function sequentialExecution() {
    console.time('Sequential');
    
    // Chạy tuần tự - chậm hơn
    const user = await fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(r => r.json());
    
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
        .then(r => r.json());
    
    const todos = await fetch('https://jsonplaceholder.typicode.com/todos?userId=1')
        .then(r => r.json());
    
    console.timeEnd('Sequential');
    // Sequential: ~3000ms (1000ms x 3)
    
    return { user, posts, todos };
}
```

### Parallel (Song song)
```javascript
async function parallelExecution() {
    console.time('Parallel');
    
    // Chạy song song - nhanh hơn
    const [user, posts, todos] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users/1').then(r => r.json()),
        fetch('https://jsonplaceholder.typicode.com/posts?userId=1').then(r => r.json()),
        fetch('https://jsonplaceholder.typicode.com/todos?userId=1').then(r => r.json())
    ]);
    
    console.timeEnd('Parallel');
    // Parallel: ~1000ms (chạy cùng lúc)
    
    return { user, posts, todos };
}
```

### Mixed (Kết hợp)
```javascript
async function mixedExecution() {
    // Bước 1: Lấy user trước
    const user = await fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(r => r.json());
    
    // Bước 2: Dùng user.id để lấy posts và todos song song
    const [posts, todos] = await Promise.all([
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`).then(r => r.json()),
        fetch(`https://jsonplaceholder.typicode.com/todos?userId=${user.id}`).then(r => r.json())
    ]);
    
    return { user, posts, todos };
}
```

## Async Loops

### forEach với Async (KHÔNG hoạt động)
```javascript
// ❌ KHÔNG hoạt động như mong đợi
async function processItemsWrong(items) {
    items.forEach(async (item) => {
        const result = await processItem(item);
        console.log(result);
    });
    console.log('Done'); // In ra trước khi các item được xử lý!
}
```

### for...of (Tuần tự)
```javascript
// ✅ Chạy tuần tự
async function processItemsSequential(items) {
    for (const item of items) {
        const result = await processItem(item);
        console.log(result);
    }
    console.log('Done'); // In ra sau khi tất cả item được xử lý
}

// Ví dụ
async function fetchUsersSequential(userIds) {
    const users = [];
    
    for (const id of userIds) {
        const user = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(r => r.json());
        users.push(user);
    }
    
    return users;
}

fetchUsersSequential([1, 2, 3]);
```

### Promise.all với map (Song song)
```javascript
// ✅ Chạy song song
async function processItemsParallel(items) {
    const results = await Promise.all(
        items.map(item => processItem(item))
    );
    
    console.log(results);
    console.log('Done');
}

// Ví dụ
async function fetchUsersParallel(userIds) {
    const users = await Promise.all(
        userIds.map(id => 
            fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
                .then(r => r.json())
        )
    );
    
    return users;
}

fetchUsersParallel([1, 2, 3]);
```

### Reduce với Async (Sequential Pipeline)
```javascript
async function processItemsInOrder(items) {
    return await items.reduce(async (previousPromise, item) => {
        await previousPromise;
        return await processItem(item);
    }, Promise.resolve());
}
```

## Ví dụ thực tế

### 1. Login và Fetch User Data
```javascript
async function loginAndFetchData(username, password) {
    try {
        // Step 1: Login
        console.log('Đang đăng nhập...');
        const loginResponse = await fetch('https://api.example.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        if (!loginResponse.ok) {
            throw new Error('Đăng nhập thất bại');
        }
        
        const { token } = await loginResponse.json();
        console.log('Đăng nhập thành công!');
        
        // Step 2: Fetch user data với token
        console.log('Đang tải dữ liệu...');
        const [profile, posts, notifications] = await Promise.all([
            fetch('https://api.example.com/profile', {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(r => r.json()),
            
            fetch('https://api.example.com/posts', {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(r => r.json()),
            
            fetch('https://api.example.com/notifications', {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(r => r.json())
        ]);
        
        console.log('Dữ liệu đã tải xong!');
        return { profile, posts, notifications };
        
    } catch (error) {
        console.error('Lỗi:', error.message);
        throw error;
    }
}
```

### 2. Upload File với Progress
```javascript
async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        console.log('Đang upload:', file.name);
        
        const response = await fetch('https://api.example.com/upload', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`Upload failed: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Upload thành công!', result);
        
        return result;
        
    } catch (error) {
        console.error('Upload lỗi:', error);
        throw error;
    }
}

// Sử dụng
const fileInput = document.querySelector('#fileInput');
fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file) {
        try {
            await uploadFile(file);
        } catch (error) {
            alert('Upload thất bại!');
        }
    }
});
```

### 3. Retry Logic
```javascript
async function fetchWithRetry(url, options = {}, maxRetries = 3) {
    let lastError;
    
    for (let i = 0; i < maxRetries; i++) {
        try {
            console.log(`Thử lần ${i + 1}...`);
            
            const response = await fetch(url, options);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            return await response.json();
            
        } catch (error) {
            lastError = error;
            console.error(`Lần ${i + 1} thất bại:`, error.message);
            
            // Đợi trước khi retry
            if (i < maxRetries - 1) {
                await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
            }
        }
    }
    
    throw new Error(`Thất bại sau ${maxRetries} lần thử: ${lastError.message}`);
}

// Sử dụng
fetchWithRetry('https://api.example.com/data')
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Failed:', error));
```

### 4. Cache với Async/Await
```javascript
class APICache {
    constructor() {
        this.cache = new Map();
        this.maxAge = 5 * 60 * 1000; // 5 phút
    }
    
    async fetch(url) {
        // Kiểm tra cache
        const cached = this.cache.get(url);
        if (cached && Date.now() - cached.timestamp < this.maxAge) {
            console.log('Lấy từ cache:', url);
            return cached.data;
        }
        
        // Fetch mới
        console.log('Fetch mới:', url);
        const response = await fetch(url);
        const data = await response.json();
        
        // Lưu vào cache
        this.cache.set(url, {
            data,
            timestamp: Date.now()
        });
        
        return data;
    }
    
    clear() {
        this.cache.clear();
    }
}

// Sử dụng
const cache = new APICache();

async function getUser(id) {
    return await cache.fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
}

getUser(1); // Fetch từ server
getUser(1); // Lấy từ cache
```

### 5. Load More với Pagination
```javascript
class PostLoader {
    constructor() {
        this.page = 1;
        this.loading = false;
        this.hasMore = true;
    }
    
    async loadMore() {
        if (this.loading || !this.hasMore) {
            return [];
        }
        
        this.loading = true;
        
        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/posts?_page=${this.page}&_limit=10`
            );
            
            const posts = await response.json();
            
            if (posts.length < 10) {
                this.hasMore = false;
            }
            
            this.page++;
            return posts;
            
        } catch (error) {
            console.error('Error loading posts:', error);
            return [];
        } finally {
            this.loading = false;
        }
    }
}

// Sử dụng
const loader = new PostLoader();

document.querySelector('#loadMore').addEventListener('click', async () => {
    const posts = await loader.loadMore();
    console.log('Loaded posts:', posts);
});
```

## Best Practices
```javascript
// ✅ GOOD: Sử dụng try-catch
async function goodExample() {
    try {
        const data = await fetchData();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// ❌ BAD: Không xử lý lỗi
async function badExample() {
    const data = await fetchData(); // Lỗi không được bắt!
    return data;
}

// ✅ GOOD: Parallel khi có thể
async function goodParallel() {
    const [user, posts] = await Promise.all([
        getUser(),
        getPosts()
    ]);
    return { user, posts };
}

// ❌ BAD: Sequential không cần thiết
async function badSequential() {
    const user = await getUser();
    const posts = await getPosts(); // Chậm hơn không cần thiết
    return { user, posts };
}

// ✅ GOOD: Await ở top level (ES2022+)
const data = await fetchData();

// ❌ BAD: Wrap không cần thiết (trước ES2022)
(async () => {
    const data = await fetchData();
})();

// ✅ GOOD: Tránh async/await cho Promise đơn giản
function simplePromise() {
    return fetch(url).then(r => r.json());
}

// ❌ BAD: Async/await không cần thiết
async function unnecessaryAsync() {
    return await fetch(url).then(r => r.json());
}
```

## Kết luận

Async/Await giúp:
- Code dễ đọc, dễ maintain hơn
- Xử lý lỗi đơn giản với try-catch
- Tránh callback hell
- Viết code bất đồng bộ giống đồng bộ

**Khi nào nên dùng Async/Await:**
- Xử lý API calls
- Đọc/ghi file (Node.js)
- Database operations
- Bất kỳ operation bất đồng bộ nào

**Lưu ý:**
- Luôn xử lý lỗi với try-catch
- Dùng Promise.all() cho parallel execution
- Await chỉ hoạt động trong async function
- Async function luôn trả về Promise

## Tài liệu tham khảo

- [MDN Async/Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [JavaScript.info Async/Await](https://javascript.info/async-await)
- [Promises Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)