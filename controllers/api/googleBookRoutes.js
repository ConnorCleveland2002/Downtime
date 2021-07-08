const router = require('express').Router();
const { google_book } = require('../../models');
const express = require("express");
var google_Books = require("google-books");
// const withAuth = require('../../utils/auth');
const axios = require("axios").default;


    router.get('/', async (req, res) => {
      try {
        console.log("books list");
        const bookList = await axios({
          method: "GET",
          url: 'https://www.googleapis.com/books/v1/volumes?q=all&key&key=AIzaSyDtIDO7fZg0HMzaHAbrf8XjGXAx'
        });
        console.log(bookList);

        const bookData = bookList.data.items.map((book) => {
          console.log(book.kind);
          console.log(book.id);

          const allBooks = {
            kind: book.kind,
            "book_id": book.id,
            etag: book.etag,
            selfLink: book.selfLink,
            title: book.volumeInfo.title,
            subtitle: book.volumeInfo.subtitle,
            authors: book.volumeInfo.authors,
            publisher: book.volumeInfo.publisher,
            pubishedDate: book.volumeInfo.publishedDate,
            description: book.volumeInfo.description,
            pageCount: book.volumeInfo.pageCount,
            printType: book.volumeInfo.printType,
            category: book.volumeInfo.category
          };
          return allBooks;
        });
        console.log(bookData);

     res.json(bookData);
      } catch (error) {
    res.json(error);
      }
    });

    // Creae NewBook

    router.post('/', async (req, res) => {
      try {
        const newBook = await google_book.create({
          ...req.body,
          kind: req.body.kind,
          book_id: req.body.book_id,
          etag: req.body.etag,
          selfLink: req.body.selfLink,
          title: req.body.title,
          subtitle: req.body.subtitle,
          authors: req.body.authors,
          publisher: req.body.publisher,
          publishedDate: req.body.publishedDate,
          pageCount: req.body.pageCount,
          printType: req.body.printType,
          categories: req.body.categories,
        });
    
        res.status(200).json(newBook);
      } catch (err) {
        res.status(400).json(err);
      }
    });

// Delete a book
    router.delete('/:id', async (req, res) => {
      try {
        const projectBook = await google_book.destroy({
        where: {
          id:req.params.id
        }, 
         
        });
    
        res.status(200).json(projectBook);
      } catch (err) {
        res.status(500).json(err);
      }
    });


    module.exports = router;




