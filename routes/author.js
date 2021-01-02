const express = require('express');
const _ = require('lodash')

const Author = require('../models/author');

module.exports = () => {
    const app = express();

    app.post('/add', (req, res) => {
        console.log('input : ',req.body);
        const newAuthor = new Author();
        newAuthor.name = req.body.name;
        if (typeof req.body.languages !== 'undefined') {
            newAuthor.languages = req.body.languages;
        }
        if (typeof req.body.country !== 'undefined') {
            newAuthor.country = req.body.country;
        }
        newAuthor.save().then(() => {
            res.send('Author Added')
        }).catch((err) => {
            console.log('Author Add Action Error: ',err);
            res.send('Failed to Add Author')
        });
    })

    app.get('/list', (req, res) => {
        Author.find((err, data) => {
            console.log('Author Response ', data);
            res.json({authors: _.map(data, (author) => {
                return {
                    id: author._id,
                    name: author.name
                }
            })})
        })
    })

    app.put('/update/:id', (req, res) => {
        console.log('ID -> ', req.params.id);
        Author.update({_id: req.params.id}, {
            languages: req.body.languages,
            name: req.body.name,
            country: req.body.country,
        }, (err) => {
            if (err) {
                console.log('Author Update Action Error: ', err);
                res.status(403).send('Author Update Failed')
            }else{
                res.send('Author Data Updated')
            }
            
        })
    })

    app.delete('/remove/:id', (req, res) => {
        Author.deleteOne({_id: req.params.id}, (err) => {
            if (err) {
                console.log('Author Remove Action Error: ', err);
                res.status(403).send('Author Remove Failed')
            }else{
                res.send('Author Removed')
            }
        })
    })

    return app;

}