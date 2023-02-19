

const express = require('express');
const Post = require('../models/postModel.js')
const expressAsyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const postRouter = express.Router();





module.exports = postRouter;