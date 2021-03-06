const express = require('express')
const router = express.Router()
// Getting Author Schema
const Author = require('../models/author')
const Book = require('../models/book')

// All Authors Routes
router.get('/', async (req, res) => {
    // Implementing the search Options Feature
    let searchOptions = {}
    if (req.query.lame != null && req.query.lame !== '') {
        searchOptions.name = new RegExp(req.query.lame, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        // Here we are trying to find the content of the object "searchOptions" inside the mongodb model "Author"
        res.render('authors/index', {
            authors: authors,
            typedText: req.query
        })
    } catch {
        res.redirect('/')
    }

})

// New Author Route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })  //The new keyword creates an instance of anything which is specified after it
})

// Create Author Routes
router.post('/', async (req, res) => {
    //Here we are initializing the "Author" constructor from the model function
    const author = new Author(
        { name: req.body.name }
    )

    try {
        const newAuthor = await author.save() //We are saving a new document into the collection(model) Author into the mongodb databae
        res.redirect(`authors`)

    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error Creating Author'
        })
    }

})
//THIS IS SHOW(View) AUTHORS ROUTE
router.get('/:id',async (req, res) => {
    let book
    let author
    try{
         author= await Author.findById(req.params.id)
         book = await Book.find({author: req.params.id}).limit(6).exec()
        res.render('authors/show',{book:book, author: author})
    } catch{
        res.redirect('/')
    }
})


// THIS IS EDIT AUTHORS ROUTE
router.get('/:id/edit', async (req, res) => {
    try {
        const author = await Author.findById(req.params.id)
        res.render('authors/edit', { author: author })
    } catch {
        res.redirect('/authors')
    }
})

// UPDATE AUTHORS ROUTE
router.put('/:id', async (req, res) => {
    let author
    try {
        author = await Author.findById(req.params.id)
        author.name = req.body.name
        await author.save()
        res.redirect(`/authors/${author.id}`)
    } catch {
        if (author == null) {
            res.redirect('/')
        } else {
            res.render('authors/edit', {
                author: author,
                errorMessage: 'Error Updating Author'
            })
        }
    }
})


// DELETE AUTHORS ROUTE
router.delete('/:id', async (req, res) => {
    let author
    let books
    try {
        author =await Author.findById(req.params.id)
        books = await Book.find({author:req.params.id})
        if(books.length >0){
            console.log("Cant be deleted");
            res.redirect(`/authors/${author.id}`)
        }else{
            console.log(author);
            console.log(books);
              await author.deleteOne()
        res.redirect(`/authors`)

        }
    } catch {
        if (author == null) {
            res.redirect('/')
        } else {
            res.redirect(`/authors/${author.id}`)
        }
    }
}
)
module.exports = router;

