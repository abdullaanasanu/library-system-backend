const jwt = require('jsonwebtoken');

const User = require('../models/user')

module.exports = {
    userAuth: (token, callback) => {
        jwt.verify(token, 'mern', function(err, decoded) {
            // console.log('Token Data -> ',decoded)
            User.findById(decoded.id).then((data) => {
                callback(data.username, data.email)
                // res.json({ username: data.username, email: data.email })
            })
        });
    }
}