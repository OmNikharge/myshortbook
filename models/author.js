const mongoose = require('mongoose');
const Book = require('./book')
const authorSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    }
})

authorSchema.pre('remove', function (next) {
    Book.find({ author: this.id }, (err, books) => {
        if (err) {
            next(err)
        } else if (books.length > 0) {
            next(new Error('This author still has books'))
        } else {
            next()
        }
    })
})

module.exports = mongoose.model('Author', authorSchema)
// model() function of the mongoose module is used to create a collection of a particular database of MongoDB.
//A Mongoose model is a wrapper on the Mongoose schema. A Mongoose schema defines the structure of the document, default values, validators, etc.