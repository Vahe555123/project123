const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  role: { type: String, default: 'client' },
  basket: { type: Array },
  verificationCode: String
});

const UserModel = mongoose.model('User', userSchema);
module.exports.UserModel = UserModel;