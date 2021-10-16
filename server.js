if(process.env.NODE_ENV !== 'production'){
    require('dotenv').parse()
}


// require('dotenv').config();

const express = require('express');  //This line of code returns whatever is exported by the express.js module
const indexRouter= require('./routes/index')





 
const app= express();
 //Here we are invoking a function express(); and storing it a variable app
const expressLayouts= require('express-ejs-layouts')

app.set('view engine', 'ejs') //A template engine is used to add dynamic content in your html

app.set('views', __dirname + '/views') //Assigns setting name to value. You may store any value that you want, but certain names can be used to configure the behavior of the server. These special names are listed in the app settings table. 
app.set('layout', 'layouts/layout')
app.use(expressLayouts) //app.set() function is used to mount a specific middleware function at a specified url.
app.use(express.static('public'))
 


app.use('/', indexRouter);
// use port 3000 unless there exists a preconfigured port


//Connecting to the database
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
const db= mongoose.connection
// on method signifies that the callback will be fired every time the event is occured

db.on('error', error => console.log(error)) 
//once method signifies that the callback will be executed only once on the happening of that event


db.once('open', ()=> console.log('Connected to mongoose'))



app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server is running successfully`);
})