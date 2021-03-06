const mongoose= require('mongoose');

const bookSchema= new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    mybooknotes: {
        type: String,
        required: false
      },
      read_date: {
        type: Date,
        required: true
      },
      pageCount: {
        type: Number,
        required: true
      },
      createdAt: {
        type: Date,
        required: true,
        default: Date.now()
      },
      coverImage: {
        type: Buffer,
        required: true
      },
      coverImageType: {
        type: String,
        required: true
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
      }
})

 bookSchema.virtual('coverImagePath').get(function() {
   if(this.coverImage !=null && this.coverImageType != null){
      return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
   }
 })
 module.exports = mongoose.model('Book', bookSchema)
 
// model() function of the mongoose module is used to create a collection of a particular database of MongoDB.
//A Mongoose model is a wrapper on the Mongoose schema. A Mongoose schema defines the structure of the document, default values, validators, etc.