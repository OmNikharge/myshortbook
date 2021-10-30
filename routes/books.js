const express = require('express')
const router = express.Router()
// Getting Book Schema
const Author = require('../models/author')
const Book = require('../models/book')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const { query } = require('express')



// diskstorage is used to specify how the files will be stored.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})

  const fileFilter = function (req, file, cb) {
    //reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }}
const upload = multer({
    storage: storage, limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});




// All Books Routes
router.get('/', async (req, res) => {
    let query = Book.find()
    if(req.query.title != null && req.query.title != ''){
         query= query.regex('title', new RegExp(req.query.title,'i'))
    }
    if(req.query.publishedBefore != null && req.query.publishedBefore != ''){
         query= query.lte('publishDate', new RegExp(req.query.publishedBefore))
    }
    if(req.query.publishedAfter != null && req.query.publishedAfter != ''){
         query= query.gte('publishDate', new RegExp(req.query.publishedAfter))
    }
    try{
        const books = await query.exec()
 res.render('books/index',{
        books:books,
        typedText: req.query
    })
    }catch{
        res.redirect('/')
    }
   

})

// New Book Route
router.get('/new', async (req, res) => {
    renderNewPage(res, new Book())
})

// Create Book Route
router.post('/', upload.single('cover'), async (req, res) => {

    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        // Here we are using the Date() constructor function because the req.body.publishDate wil return a string which we want to be converted into date format.
        pageCount: req.body.pageCount,
        coverImageName: req.file.filename,
        description: req.body.description
    })
    console.log(req.body.author)
    try {
        const newBook = await book.save()                                                           
        res.redirect(`books`)
    } catch {
       removeBookCover(book.coverImageName);
        renderNewPage(res, new Book(), true)
    }
})

function removeBookCover(theFileName){
    fs.unlink(path.join('uploads', theFileName), err => {
        if(err) console.log(err);
    })
}

async function renderNewPage(res, book, hasError = false) {
    try { 
        const authors = await Author.find({})
        const params = {
            authors: authors,
            book: book
        }
        if (hasError) { params.errorMessage = 'Error Creating Book' }
        res.render('books/new', params)
    }
    catch {
        res.redirect('/books')
    }
}

module.exports = router;

