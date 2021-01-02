const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    name: { type: String, required: true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Author'},
});

module.exports = mongoose.model('Books', BookSchema);