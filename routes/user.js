const express = require('express');
const _ = require('lodash')
const bcrypt = require('bcrypt');
const saltRounds = 12;
var jwt = require('jsonwebtoken');

const Auth = require('../libs/auth');

const User = require('../models/user');

module.exports = () => {
    const app = express();

    app.post('/sign-up', (req, res) => {
        console.log('User Sign Up Info -> ', req.body);
        var { email, username, password } = req.body;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                console.log('Generated Hash -> ',hash);
                const newUser = new User();
                newUser.email = email;
                newUser.username = username;
                newUser.password = hash;
                newUser.save()
                    .then(() => {
                        res.send('User Registered Successfully!')
                    })
                    .catch((err) => {
                        console.log('User Sign Up Error -> ', err);
                        res.status(400).send('Failed to Sign Up')
                    })
            });
        });

        // res.send('Data Received');
    })

    app.post('/login', (req, res) => {
        let { email, password } = req.body;
        User.findOne({ email }).then((user) => {
            console.log('data -> ',user);
            if (user) {
                bcrypt.compare(password, user.password, function(err, result) {
                    // result == true
                    if (result) {
                        var token = jwt.sign({ id: user._id }, 'mern');
                        res.json({message: 'Login is Successfull!', token})
                    }else {
                        res.status(401).send('Invalid Password')
                    }
                });
            }else{
                res.status(401).send('User not Found');
            }
        })
        .catch((err) => {
            console.log('User Login Error -> ',err);
            res.status(401).send('Auth Failed');
        })
    })

    app.get('/profile', (req, res) => {
        if (req.headers.authorization) {
            Auth.userAuth(req.headers.authorization, (username, email) => {
                res.json({ username, email })
            })
        }else{
            res.status(401).json({ message: 'Auth Failed', code: 1 })
        }
    })

    return app;
}