const express = require('express');
const _ = require('lodash')

const Student = require('../models/student');

module.exports = () => {
    const app = express();

    app.post('/add', (req, res) => {
        console.log('input : ',req.body);
        const newStudent = new Student();
        newStudent.admissionNo = req.body.admissionNo;
        newStudent.name = req.body.name;
        newStudent.save().then((student) => {
            res.json({
                message: 'Student Added',
                id: student._id
            })
        }).catch((err) => {
            console.log('Student Add Action Error: ',err);
            res.send('Failed to Add Student')
        });
    })

    app.get('/list', (req, res) => {
        Student.find((err, data) => {
            console.log('Student Response ', data);
            res.json({students: _.map(data, (student) => {
                return {
                    id: student._id,
                    name: student.name,
                    admissionNo: student.admissionNo
                }
            })})
        })
    })

    app.put('/update/:id', (req, res) => {
        console.log('ID -> ', req.params.id);
        Student.update({_id: req.params.id}, {
            admissionNo: req.body.admissionNo,
            name: req.body.name
        }, (err) => {
            if (err) {
                console.log('Student Update Action Error: ', err);
                res.status(403).send('Student Update Failed')
            }else{
                res.send('Student Data Updated')
            }
            
        })
    })

    app.delete('/remove/:id', (req, res) => {
        console.log('Student Remove ID -> ', req.params.id);
        Student.deleteOne({_id: req.params.id}, (err) => {
            if (err) {
                console.log('Student Remove Action Error: ', err);
                res.status(403).send('Student Remove Failed')
            }else{
                res.send('Student Removed')
            }
        })
    })

    return app;

}