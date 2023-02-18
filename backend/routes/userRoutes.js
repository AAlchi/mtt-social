

const express = require('express');
const User = require('../models/userModel.js')
const expressAsyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userRouter = express.Router();


userRouter.route('/create').post((req, res) => {
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;
    const username = req.body.username;
    const address = req.body.address;
    const zipCode = req.body.zipCode;
    const dob = req.body.dob;
    const password = req.body.password;
    const image = req.body.image;

    const newUser = new User({
        fName,
        lName,
        email,
        username,
        address,
        zipCode,
        dob,
        password,
        image,
    })

    newUser.save()
})

const generateToken = (user) => {

    return jwt.sign(
        {
            _id: user._id,
            fName: user.fName,
            lName: user.lName,
            email: user.email,
            username: user.username,
            address: user.address,
            zipCode: user.zipCode,
            dob: user.dob,
            image: user.image,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '30d',
        }
      );
    
}



userRouter.post('/updateuser', (req, res) => {
    const id = req.body.id;
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;
    const username = req.body.username;
    const address = req.body.address;
    const zipCode = req.body.zipCode;
    const dob = req.body.dob;
    const image = req.body.image;

    User.updateOne({_id:id}, {
        $set:{
            fName: fName,
            lName: lName,
            email: email,
            username: username,
            address: address,
            zipCode: zipCode,
            dob: dob,
            image: image,
        }
    }, (err, doc) => {
        if (err) {
            return console.log(err)
        } else {
            res.json(doc)
        }
    })
})

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({email: req.body.email})

    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                fName: user.fName,
                lName: user.lName,
                email: user.email,
                username: user.username,
                address: user.address,
                zipCode: user.zipCode,
                dob: user.dob,
                password: user.password,
                image: user.image,
                token: generateToken(user),
            })
            return;
        }
        res.status(401).send("Wrong Username Or Password")
    }
}))

userRouter.post('/fetchUser', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({username: req.body.username})

    if (user) {
            res.send({
                _id: user._id,
                fName: user.fName,
                lName: user.lName,
                email: user.email,
                username: user.username,
                dob: user.dob,
                image: user.image,
                token: generateToken(user),
            })
            return;
    } else {
        res.status(401).send("Can't Find User")
    }
}))



module.exports = userRouter;