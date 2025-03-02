require('dotenv').config();
const PORT = 3001
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/auth";
const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const uploadsPath = path.join(path.resolve(), 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

app.use(bodyParser.json());
app.use(cors())
app.use(fileUpload())
app.use('/uploads', express.static(uploadsPath));


mongoose
  .connect(url)
  .then((res) => console.log('Connected to DB'))
  .catch((error) => console.log(error))

app.use('/api/auth', require('./routes/auth'));
app.use('/api/phone', require('./routes/phone'));
app.use('/api/basket', require('./routes/basket'));
app.use('/api/review', require('./routes/review'));

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

