const express = require('express');
const _ = require('lodash')

const Category = require('../models/category');

module.exports = () => {
    const app = express();

    app.get('/list', (req, res) => {
        Category.find((err, data) => {
            console.log('Category Response ', data);
            res.json({categories: _.map(data, (category) => {
                return {
                    id: category._id,
                    name: category.name
                }
            })})
        })
    })

    return app;

}