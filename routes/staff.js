const express = require('express');
const _ = require('lodash')

const Staff = require('../models/staff');

module.exports = () => {
    const app = express();

    app.post('/add', (req, res) => {
        console.log('input : ',req.body);
        const newStaff = new Staff();
        newStaff.empId = req.body.empId;
        newStaff.name = req.body.name;
        newStaff.save().then(() => {
            res.send('Staff Added')
        }).catch((err) => {
            console.log('Staff Add Action Error: ',err);
            res.send('Failed to Add Staff')
        });
    })

    app.get('/list', (req, res) => {
        Staff.find((err, data) => {
            console.log('Staff Response ', data);
            res.json({staffs: _.map(data, (staff) => {
                return {
                    id: staff._id,
                    name: staff.name,
                    empId: staff.empId
                }
            })})
        })
    })

    app.put('/update/:id', (req, res) => {
        console.log('ID -> ', req.params.id);
        Staff.update({_id: req.params.id}, {
            empId: req.body.empId,
            name: req.body.name
        }, (err) => {
            if (err) {
                console.log('Staff Update Action Error: ', err);
                res.status(403).send('Staff Update Failed')
            }else{
                res.send('Staff Data Updated')
            }
            
        })
    })

    app.delete('/remove/:empId', (req, res) => {
        Staff.deleteOne({empId: req.params.empId}, (err) => {
            if (err) {
                console.log('Staff Remove Action Error: ', err);
                res.status(403).send('Staff Remove Failed')
            }else{
                res.send('Staff Removed')
            }
        })
    })

    return app;

}