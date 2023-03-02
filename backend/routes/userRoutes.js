

const express = require('express');
const User = require('../models/userModel.js')
const Post = require('../models/postModel.js')
const expressAsyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userRouter = express.Router();

userRouter.route('/post').post((req, res) => {
    
    var today = new Date();
    var day = String(today.getDate()).padStart(2, '0');
    var month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var year = today.getFullYear();
    const name = req.body.name;
    const date = day + "/" + month + "/" + year;
    const image = req.body.image;
    const description = req.body.description;
    const postId = req.body.postId;
    const profilePic = req.body.profilePic;
    const username = req.body.username;
    const like = 0;

    

    const newPost = new Post({
        name,
        date,
        image,
        description,
        postId,
        profilePic,
        username,
        like,
    })

    newPost.save()
})


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
    const likes = [];

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
        likes,
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

userRouter.post('/getPost', expressAsyncHandler(async (req, res) => {
    Post.find().then(posts => res.json(posts))

    // if (post) {
    //         res.send({
    //             name: post.name,
    //             date: post.date,
    //             image: post.image,
    //             description:post.description,
    //             postId: post.postId,
    //             profilePic: post.profilePic,
    //             username: post.username,
    //         })
    //         return;
    // }
}))



userRouter.post('/getUserPost', expressAsyncHandler((req, res) => {
        Post.find({username: req.body.username}).then(posts => res.json(posts))

    // if (post) {
    //         res.send({
    //             _id: user._id,
    //             fName: user.fName,
    //             lName: user.lName,
    //             email: user.email,
    //             username: user.username,
    //             address: user.address,
    //             zipCode: user.zipCode,
    //             dob: user.dob,
    //             password: user.password,
    //             image: user.image,
    //             token: generateToken(user),
    //         })
    //         return;
        
    // }


    
}))

userRouter.post('/friendUser', expressAsyncHandler(async (req, res) => {
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

userRouter.post('/likePost', (req, res) => {

    User.findByIdAndUpdate(req.body.userid, { $push: {likes: req.body.postid}}, (err, doc) => {
      if (err) return console.log(err);
      res.json(doc);
    })

  })

    userRouter.post('/getLikedPosts', (req, res) => {
    User.findOne({email: req.body.email}).then(posts => res.json(posts))
  })
  
  userRouter.post('/getLikedPostsData', (req, res) => {
    Post.find({_id: req.body.id}).then(posts => res.json(posts))
  })
  
  
  userRouter.post('/checkLikedPosts', expressAsyncHandler(async (req, res) => {

    let user = await User.findOne({username: req.body.username});

    if (user) {
        let post = await Post.find({_id: user.likes}).then(post => res.json(post));
    }
  }))

  

  userRouter.post('/unlikePost', expressAsyncHandler(async (req, res) => {
 
    await User.findByIdAndUpdate(req.body.userid, {$pull: {likes: req.body.postid}})

    res.send({
        user: req.body.userid,
        post: req.body.postid
    })

    
    
  }))


  userRouter.post('/updateProfile', expressAsyncHandler( async (req, res) => {

    let id = req.body.id
    let first = req.body.first
    let last = req.body.last
    let usernames = req.body.usernames
    let emails = req.body.emails
    let dob = req.body.dob
    let addressed = req.body.addressed
    let zipcodes = req.body.zipcodes

    User.findByIdAndUpdate(req.body.id, {$set: {
        _id: id,
        fName: first,
        lName: last,
        email: emails,
        username: usernames,
        address: addressed,
        zipCode: zipcodes, 
        dob: dob,
        
    }}, (err, doc) => {
      if (err) return console.log(err);
      res.json(doc);
    })
   


    res.send({
        id,
        first,
        last,
        usernames,
        emails,
        dob,
        addressed,
        zipcodes
    })
  }))

  
  


module.exports = userRouter;