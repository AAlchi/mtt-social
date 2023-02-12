const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js');

router.route('/create').post((req, res) => {
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;
    const username = req.body.username;
    const address = req.body.address;
    const zipCode = req.body.zipCode;
    const dob = req.body.dob;
    const password = req.body.password;

    const newUser = new User({
        fName,
        lName,
        email,
        username,
        address,
        zipCode,
        dob,
        password
    })

    newUser.save()
})

router.route('/signin').get((req, res) => {
    User.find().then(foundUsers => res.json(foundUsers))
})

module.exports = router;