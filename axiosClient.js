const axios = require('axios');

// Task 10
async function getAllBooks() {
  const res = await axios.get("http://localhost:3000/books");
  console.log("Task 10:", res.data);
}

// Task 11
function getByISBN() {
  axios.get("http://localhost:3000/books/isbn/123")
    .then(res => console.log("Task 11:", res.data))
    .catch(err => console.error(err));
}

// Task 12
async function getByAuthor() {
  const res = await axios.get("http://localhost:3000/books/author/John");
  console.log("Task 12:", res.data);
}

// Task 13
async function getByTitle() {
  const res = await axios.get("http://localhost:3000/books/title/Node");
  console.log("Task 13:", res.data);
}

getAllBooks();
getByISBN();
getByAuthor();
getByTitle();
