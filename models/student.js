const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    admissionNo: { type: String, required: true},
    name: { type: String, required: true},
});

module.exports = mongoose.model('Students', StudentSchema);