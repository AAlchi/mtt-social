const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    postId: { type: String, required: true },
    profilePic: { type: String, required: true },
    username: { type: String, required: true },
    like: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;