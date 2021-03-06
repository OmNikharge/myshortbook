const express = require('express')
const Book = require('../models/book')
const router = express.Router()


router.get('/', async (req, res) => {
    let books
    try {
        books = await Book.find().sort({createdAt: 'desc'}).limit(5).exec()
        res.render("index", { books: books })
    } catch {
        books=[]
    }
    res.render('index',{books:books})
})

module.exports = router