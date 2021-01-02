const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())
app.use(cors())

mongoose.connect('mongodb://localhost/librarySystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, (err) => {
    if (err) {
        console.log('Mongo Error: ',err);
    }else{
        console.log('MongoDB is connected!');
    }
});
mongoose.set('debug', true)

// Models

const Staff = require('./models/staff');
const Student = require('./models/student');
const Author = require('./models/author');
const Category = require('./models/category');
const Book = require('./models/book');
const BookBorrow = require('./models/bookBorrow');
const User = require('./models/user');

const port = 3000;

// Routes
app.use('/staff', require('./routes/staff')());
app.use('/student', require('./routes/student')());
app.use('/author', require('./routes/author')());
app.use('/book', require('./routes/book')());
app.use('/book-borrow', require('./routes/bookBorrow')());
app.use('/user', require('./routes/user')());
app.use('/category', require('./routes/category')());

app.get('/', (req, res) => {
    res.send('Welcome to Library Sytem')
})

app.listen(port, () => {
    console.log('Library System is running at http://localhost:'+port);
})