const mongoose= require('mongoose');
const path= require('path');
const fs= require('fs')
const coverImageBasePath = 'uploads'
const bookSchema= new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
      },
      publishDate: {
        type: Date,
        required: true
      },
      pageCount: {
        type: Number,
        required: true
      },
      createdAt: {
        type: Date,
        required: false,
        default: Date.now()
      },
      coverImage: {
        type: Buffer,
        required: false
      },
      coverImageName: {
        type: String,
        required: true
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Author'
      }
})

 bookSchema.virtual('coverImagePath').get(function() {
   if(this.coverImageName !=null){
     return path.join('/',coverImageBasePath, this.coverImageName)
   }
 })
 module.exports = mongoose.model('Book', bookSchema)
 
// model() function of the mongoose module is used to create a collection of a particular database of MongoDB.
//A Mongoose model is a wrapper on the Mongoose schema. A Mongoose schema defines the structure of the document, default values, validators, etc.