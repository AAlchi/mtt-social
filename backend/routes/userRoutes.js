

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
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '30d',
        }
      );
    
}

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
                token: generateToken(user),
            })
            return;
        }
        res.status(401).send("Wrong Username Or Password")
    }
}))


// router.route('/signin').get((req, res) => {
//     User.find({email: req.body.email}).then(foundUsers => res.json(foundUsers))
//     res.status(401).send({email: req.body.email})
// })

// userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
//     const user = await User.findOne({email: req.body.email});

//     if (user) {
//         if (bcrypt.compareSync(req.body.password, user.password)) {
//             res.send({
//                 _id: user._id,
//                 fName: user.fName,
//                 lName: user.lName,
//                 email: user.email,
//                 username: user.username,
//                 address: user.address,
//                 zipCode: user.zipCode,
//                 dob: user.dob,
//                 password: user.password,
//                 token: generateToken(user),
//             })
//             return;
//         }
//     }
//     res.status(401).send("Wrong Username Or Password")
// }        
// ))

  
module.exports = userRouter;