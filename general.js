const express = require("express");
const public_users = express.Router();
let books = require("./books.js");
let users = [];

// Register
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (users.some(u => u.username === username)) return res.json("User exists!");
  users.push({ username, password });
  res.json("User registered!");
});

// Login
public_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.json("Invalid login");
  req.session.user = username;
  res.json("Login success!");
});

// Get all books
public_users.get("/", (req, res) => res.json(books));

// Search by ISBN
public_users.get("/isbn/:isbn", (req, res) => res.json(books[req.params.isbn]));

// Search by Author
public_users.get("/author/:author", (req, res) => {
  let result = Object.values(books).filter(b => b.author === req.params.author);
  res.json(result);
});

// Search by Title
public_users.get("/title/:title", (req, res) => {
  let result = Object.values(books).filter(b => b.title === req.params.title);
  res.json(result);
});

// Get Reviews
public_users.get("/review/:isbn", (req, res) => res.json(books[req.params.isbn].reviews));

module.exports = { public_users, users };
