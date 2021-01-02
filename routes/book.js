const express = require('express');
const _ = require('lodash')

const Book = require('../models/book');
const Author = require('../models/author');
const Category = require('../models/category');

module.exports = () => {
    const app = express();

    app.post('/add', (req, res) => {
        console.log('input : ',req.body);
        Author.findById(req.body.authorId, (err, authorData) => {
            console.log('Author data -> ', authorData);
            Category.findById(req.body.categoryId, (err, categoryData) => {
                console.log('Category data -> ', categoryData);
                const newBook = new Book();
                newBook.name = req.body.name;
                newBook.author = authorData;
                newBook.category = categoryData;
                newBook.save().then(() => {
                    res.send('Book Added')
                }).catch((err) => {
                    console.log('Book Add Action Error: ',err);
                    res.send('Failed to Add Book')
                });
            })
        })
    })

    app.get('/list', (req, res) => {
        Book
            .find()
            .populate('author')
            .populate('category')
            .exec((err, data) => {
                console.log('Book Response ', data);
                res.json({books: data })
            })
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