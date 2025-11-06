const express = require("express");
const router = express.Router();
let books = require("./books.js");

router.put("/review/:isbn", (req, res) => {
  if (!req.session.user) return res.json("Login required");
  const review = req.body.review;
  books[req.params.isbn].reviews[req.session.user] = review;
  res.json("Review saved.");
});

router.delete("/review/:isbn", (req, res) => {
  if (!req.session.user) return res.json("Login required");
  delete books[req.params.isbn].reviews[req.session.user];
  res.json("Review deleted.");
});

module.exports = router;
