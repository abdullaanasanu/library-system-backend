const express = require('express');
const _ = require('lodash')
const moment = require('moment');

const Book = require('../models/book');
const Staff = require('../models/staff');
const Student = require('../models/student');
const BookBorrow = require('../models/bookBorrow');

module.exports = () => {
    const app = express();

    app.post('/add', (req, res) => {
        console.log('input : ',req.body);
        // Checking Book is Valid
        Book.findById(req.body.bookId, (err, bookData) => {
            console.log('Book data -> ', bookData);
            // Checking Staff is Valid
            Staff.findById(req.body.staffId, (err, staffData) => {
                console.log('Category data -> ', staffData);
                // Checking Student is Valid
                Student.findById(req.body.studentId, (err, studentData) => {
                    // Fetching any existing borrow detail of the book
                    // BookBorrow.find({ book: req.body.bookId  })
                    const newBookBorrow = new BookBorrow();
                    newBookBorrow.book = bookData;
                    newBookBorrow.assignedBy = staffData;
                    newBookBorrow.takenBy = studentData;
                    newBookBorrow.borrowedDate = moment().format('YYYY-MM-DD');
                    newBookBorrow.dueDate = moment().add(req.body.days, 'days').format('YYYY-MM-DD');
                    newBookBorrow.save().then(() => {
                        res.send('Borrow Added')
                    }).catch((err) => {
                        console.log('Book Borrow Add Action Error: ',err);
                        res.send('Failed to Add Book Borrow')
                    });
                })
            })
        })
    })

    app.get('/list', (req, res) => {
        BookBorrow
            .find()
            .populate('book')
            .populate('takenBy')
            .populate('assignedBy')
            .exec((err, data) => {
                console.log('Error -> ', err);
                res.json({ borrowedBooks: data })
            })
            // .populate('book')
            // .populate('takenBy')
            // .populate('assignedBy')
            // .exec((err, data) => {
            //     console.log('Book Borrow Response ', data);
            //     res.json({borrowedBooks: data })
            // })
    })

    // app.put('/update/:id', (req, res) => {
    //     console.log('ID -> ', req.params.id);
    //     Student.update({_id: req.params.id}, {
    //         admissionNo: req.body.admissionNo,
    //         name: req.body.name
    //     }, (err) => {
    //         if (err) {
    //             console.log('Student Update Action Error: ', err);
    //             res.status(403).send('Student Update Failed')
    //         }else{
    //             res.send('Student Data Updated')
    //         }
            
    //     })
    // })

    // app.delete('/remove/:admissionNo', (req, res) => {
    //     Student.deleteOne({admissionNo: req.params.admissionNo}, (err) => {
    //         if (err) {
    //             console.log('Student Remove Action Error: ', err);
    //             res.status(403).send('Student Remove Failed')
    //         }else{
    //             res.send('Student Removed')
    //         }
    //     })
    // })

    return app;

}

