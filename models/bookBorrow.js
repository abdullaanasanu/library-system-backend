const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BookBorrowSchema = new Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Books', required: true},
    takenBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Students', required: true},
    assignedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Staffs', required: true},
    borrowedDate: {type: Date, required: true},
    dueDate: {type: Date, required: true}
});

module.exports = mongoose.model('BookBorrow', BookBorrowSchema);