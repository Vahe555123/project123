const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String }, 
});
const PhoneModel = mongoose.model('phone', phoneSchema);
module.exports.PhoneModel = PhoneModel
