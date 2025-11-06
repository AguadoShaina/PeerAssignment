const axios = require("axios");

const BASE_URL = "http://localhost:5000/customer";
let authToken = "";

const task = process.argv[2];

// Task 1: Get all books
async function task1() {
  console.log("\n=== Task 1: Get All Books ===");
  try {
    const response = await axios.get(BASE_URL); // <— no slash here
    console.log("✅ Success:");
    console.log(response.data);
  } catch (err) {
    console.log("❌ Error:", err.response?.data || err.message);
  }
}


// Task 2: Get book by ISBN
async function task2() {
  const isbn = process.argv[3];
  console.log(`\n=== Task 2: Search ISBN (${isbn}) ===`);
  try {
    const response = await axios.get(`${BASE_URL}/isbn/${isbn}`);
    console.log(response.data);
  } catch {
    console.log("❌ Book not found");
  }
}

// Task 3: Get book by Author
async function task3() {
  const author = process.argv[3];
  console.log(`\n=== Task 3: Search Author (${author}) ===`);
  try {
    const response = await axios.get(`${BASE_URL}/author/${author}`);
    console.log(response.data);
  } catch {
    console.log("❌ No books found");
  }
}

// Task 4: Get book by Title
async function task4() {
  const title = process.argv[3];
  console.log(`\n=== Task 4: Search Title (${title}) ===`);
  try {
    const response = await axios.get(`${BASE_URL}/title/${title}`);
    console.log(response.data);
  } catch {
    console.log("❌ No books found");
  }
}

// Task 5: Get Reviews
async function task5() {
  const isbn = process.argv[3];
  console.log(`\n=== Task 5: Get Reviews (${isbn}) ===`);
  try {
    const response = await axios.get(`${BASE_URL}/review/${isbn}`);
    console.log(response.data);
  } catch {
    console.log("❌ No reviews found");
  }
}

// Task 6: Register User
async function task6() {
  const username = process.argv[3];
  const password = process.argv[4];
  console.log(`\n=== Task 6: Register (${username}) ===`);
  try {
    const response = await axios.post(`${BASE_URL}/register`, { username, password });
    console.log("✅", response.data);
  } catch {
    console.log("❌ Registration failed");
  }
}

// Task 7: Login User
async function task7() {
  const username = process.argv[3];
  const password = process.argv[4];
  console.log(`\n=== Task 7: Login (${username}) ===`);
  try {
    const response = await axios.post(`${BASE_URL}/login`, { username, password });
    console.log("✅", response.data);
  } catch {
    console.log("❌ Login failed");
  }
}

// ✅ Task 8: Add/Modify Review
async function task8() {
  const username = process.argv[3];
  const isbn = process.argv[4];
  const review = process.argv.slice(5).join(" "); // supports multi-word reviews

  console.log(`\n=== Task 8: Add/Modify Review (${username}) ===`);

  try {
    const response = await axios.put(
      `${BASE_URL}/auth/review/${isbn}`,   // ✅ FIXED URL
      { review },
      { withCredentials: true }
    );

    console.log("✅ Review Added/Updated:", response.data);

  } catch (error) {
    console.error("❌ Failed to Add/Modify Review:", error.response?.data || error.message);
  }
}


// ✅ Task 9: Delete Review
async function task9() {
  const isbn = process.argv[3];

  console.log(`\n=== Task 9: Delete Review for ISBN (${isbn}) ===`);

  try {
    const response = await axios.delete(
      `${BASE_URL}/auth/review/${isbn}`,   // ✅ Correct route
      { withCredentials: true }
    );

    console.log("🗑️ Review Deleted:", response.data);

  } catch (error) {
    console.error("❌ Failed to Delete Review:", error.response?.data || error.message);
  }
}

// Task 10: Get all books (Async/Await)
async function task10() {
  console.log("\n=== Task 10: Get All Books ===");
  try {
    const response = await axios.get(BASE_URL);
    console.log(response.data);
  } catch (error) {
    console.log("❌ Error:", error.response?.data || error.message);
  }
}

// Task 11: Search by ISBN
function task11() {
  const isbn = process.argv[3];
  console.log(`\n=== Task 11: Search by ISBN (${isbn}) ===`);
  axios.get(`${BASE_URL}/isbn/${isbn}`)
    .then(res => console.log(res.data))
    .catch(err => console.log("❌ Error:", err.response?.data || err.message));
}

// Task 12: Search by Author
async function task12() {
  const author = process.argv[3];
  console.log(`\n=== Task 12: Search by Author (${author}) ===`);
  try {
    const response = await axios.get(`${BASE_URL}/author/${author}`);
    console.log(response.data);
  } catch (error) {
    console.log("❌ Error:", error.response?.data || error.message);
  }
}

// Task 13: Search by Title
async function task13() {
  const title = process.argv[3];
  console.log(`\n=== Task 13: Search by Title (${title}) ===`);
  try {
    const response = await axios.get(`${BASE_URL}/title/${title}`);
    console.log(response.data);
  } catch (error) {
    console.log("❌ Error:", error.response?.data || error.message);
  }
}

switch (task) {
  case "task1": task1(); break;
  case "task2": task2(); break;
  case "task3": task3(); break;
  case "task4": task4(); break;
  case "task5": task5(); break;
  case "task6": task6(); break;
  case "task7": task7(); break;
  case "task8": task8(); break; 
  case "task9": task9(); break;
  case "task10": task10(); break;
  case "task11": task11(); break;
  case "task12": task12(); break;
  case "task13": task13(); break;
  default:
    console.log("\nUsage:");
    console.log("node app.js task1");
    console.log("node app.js task2 <isbn>");
    console.log("node app.js task3 <author>");
    console.log("node app.js task4 <title>");
    console.log("node app.js task5 <isbn>");
    console.log("node app.js task6 <username> <password>");
    console.log("node app.js task7 <username> <password>");
    console.log("node app.js task8 <username> <isbn> <review>");
    console.log("node app.js task9 <username> <isbn>");
    console.log("node app.js task10");
    console.log("node app.js task11 <isbn>");
    console.log("node app.js task12 <author>");
    console.log("node app.js task13 <title>");
}