const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { UserModel } = require('../model/user');
const { ReviewModel } = require('../model/review');
const router = express.Router();

router.post("/add-review", authMiddleware, async (req, res) => {
    const { desc, starCount } = req.body
    if (!desc || !starCount) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await UserModel.findById(req.user.userId);

    const review = await new ReviewModel({
        name: user.name,
        email: user.email,
        description: desc,
        number: starCount
    })
    await review.save();
    res.status(200).json(review);
})

router.get("/all-reviews", authMiddleware, async (req, res) => {
    if (req.user.userId !== "admin") {
        return res.status(403).json({ error: 'Only admin can view review list.' });
    }
    const reviews = await ReviewModel.find({});
    res.status(200).json(reviews);
})

router.get("/done-reviews", async (req, res) => {
    const reviews = await ReviewModel.find({ status: "done" });
    res.status(200).json(reviews);
})

router.put("/put-reviews/:id", authMiddleware, async (req, res) => {
    if (req.user.userId !== "admin") {
        return res.status(403).json({ error: 'Only admin can view review list.' });
    }
    const { status } = req.body
    const { id } = req.params

    const review = await ReviewModel.findById(id);
    review.status = status
    await review.save();
    res.status(200).json(review);
})

module.exports = router;