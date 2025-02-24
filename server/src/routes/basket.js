const express = require('express');
const { PhoneModel } = require('../model/phone');
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware');
const { UserModel } = require('../model/user');

router.post("/:id", authMiddleware, async (req, res) => {
    console.log(req.user.userId);
    const user = await UserModel.findById(req.user.userId);
    const { id } = req.params
    if (!user.basket.includes(id)){
        user.basket.push(id)
        await user.save()
        res.status(200).json({ data: "success" })
    }else{
        res.status(400).json({ data: "phone already in the basket" })
    }
})

router.get("/", authMiddleware, async (req, res) => {
    console.log(req.user.userId);
    const user = await UserModel.findById(req.user.userId);
    const products = await PhoneModel.find({ '_id': { $in: user.basket } });
    res.status(200).json(products)
})


module.exports = router
