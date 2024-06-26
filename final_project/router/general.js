const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
 
  res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let r = [];
  for(const [key, value] of Object.entries(books)){
      const book = Object.entries(value);
      for(let i=0;i<book.length;i++){
          if(book[i][0]==="author" && book[i][1]===author)
          bookssel.push(books[key]);
      }
  }

  res.send(r);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;

  let r = [];
  for(const [key, value] of Object.entries(books)){
      const book = Object.entries(value);
      for(let i=0;i<book.length;i++){
          if(book[i][0]==="title" && book[i][1]===title)
          bookssel.push(books[key]);
      }
  }
  res.send(r);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;

  res.send(books[isbn].reviews);
});

module.exports.general = public_users;
