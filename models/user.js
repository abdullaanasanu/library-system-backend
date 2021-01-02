const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, minlength: 6, maxlength: 32, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: [ 'male', 'female', 'other', 'Prefer Not to Say' ], default: 'Prefer Not to Say'}
});

module.exports = mongoose.model('Users', UserSchema);