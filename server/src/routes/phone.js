const express = require('express');
const { PhoneModel } = require('../model/phone');
const router = express.Router()
const path = require("path")
const fs = require('fs')
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: 'Image file is required' });
    }
    console.log(req.files);
    
    const image = req.files.image;
    const updateImage = Date.now() + image.name
    const uploadPath = path.join(path.resolve(), '/uploads', updateImage);

    await image.mv(uploadPath);

    const newPhone = new PhoneModel({
      name: req.body.name,
      brand: req.body.brand,
      price: req.body.price,
      imageUrl: updateImage
    });
    await newPhone.save();
    res.status(201).json(newPhone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const phones = await PhoneModel.find();
    res.status(200).json(phones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const phone = await PhoneModel.findById(req.params.id);
    if (!phone) return res.status(404).json({ message: 'Phone not found' });

    res.status(200).json(phone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Обновление телефона
router.put('/:id', async (req, res) => {
  try {
    const phone = await PhoneModel.findById(req.params.id);
    if (!phone) return res.status(404).json({ message: 'Phone not found' });

    phone.name = req.body.name || phone.name;
    phone.brand = req.body.brand || phone.brand;
    phone.price = req.body.price || phone.price;

    if (req.files && req.files.image) {
      const image = req.files.image;
      const uploadPath = path.join(path.resolve(), '/src/uploads', image.name);
      await image.mv(uploadPath);
      phone.imageUrl = `/uploads/${image.name}`;
    }

    await phone.save();
    res.status(200).json(phone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  console.log(req.user);
  if (req.user.userId !== "admin") {
    return res.status(403).json({ error: 'Only admin can delete phones.' });
  }
  try {
    const phone = await PhoneModel.findById(req.params.id);
    if (!phone) return res.status(404).json({ message: 'Phone not found' });
    const imagePath = path.join(path.resolve(), "uploads", phone.imageUrl)
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath, () => { })
    }
    await PhoneModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Phone deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router