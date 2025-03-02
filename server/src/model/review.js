const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
    number: { type: Number },
    status: { type: String, default: "pending" },
});
const ReviewModel = mongoose.model('review', reviewSchema);
module.exports.ReviewModel = ReviewModel
