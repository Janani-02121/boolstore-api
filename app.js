const express = require('express');
const app = express();
app.use(express.json());

let books = {
  "123": { title: "Node Basics", author: "John", review: {} },
  "456": { title: "Express Mastery", author: "Jane", review: {} }
};

let users = [{ username: "admin", password: "admin123" }];
let sessionUser = null;

// Task 1
app.get('/books', (req, res) => res.json(books));

// Task 2
app.get('/books/isbn/:isbn', (req, res) => res.json(books[req.params.isbn]));

// Task 3
app.get('/books/author/:author', (req, res) => {
  const result = Object.values(books).filter(b => b.author.toLowerCase() === req.params.author.toLowerCase());
  res.json(result);
});

// Task 4
app.get('/books/title/:title', (req, res) => {
  const result = Object.values(books).filter(b => b.title.toLowerCase().includes(req.params.title.toLowerCase()));
  res.json(result);
});

// Task 5
app.get('/books/:isbn/review', (req, res) => res.json(books[req.params.isbn].review));

// Task 6
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  res.send("User registered");
});

// Task 7
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    sessionUser = username;
    res.send("Login successful");
  } else {
    res.status(401).send("Login failed");
  }
});

// Task 8
app.put('/books/:isbn/review', (req, res) => {
  if (!sessionUser) return res.status(403).send("Login required");
  books[req.params.isbn].review[sessionUser] = req.body.review;
  res.send("Review added");
});

// Task 9
app.delete('/books/:isbn/review', (req, res) => {
  if (!sessionUser) return res.status(403).send("Login required");
  delete books[req.params.isbn].review[sessionUser];
  res.send("Review deleted");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
