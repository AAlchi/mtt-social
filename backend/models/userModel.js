const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    zipCode: { type: String, required: true },
    dob: { type: Date, required: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    likes: {type: Array},
    friends: { type: Array }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;