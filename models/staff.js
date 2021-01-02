const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const StaffSchema = new Schema({
    empId: { type: String, required: true, unique: true},
    name: { type: String, required: true},
});

StaffSchema.method.details = (staff) => {
    return {
        empId: staff.empId,
        name: staff.name
    }
}

module.exports = mongoose.model('Staffs', StaffSchema);