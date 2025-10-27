const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const userRoutes = require('./routes/user.routes');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// serve uploaded images statically
const UPLOAD_DIR = process.env.UPLOAD_DIR || 'src/uploads';
app.use('/uploads', express.static(path.join(__dirname, '..', UPLOAD_DIR)));

// API routes
app.use('/api/users', userRoutes);

// test
app.get('/', (req, res) => res.send('User CRUD API is running'));

// sync DB and start server
(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
    // create tables if not exist
    await sequelize.sync(); // use { force: true } for dev reset
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  } catch (err) {
    console.error('Failed to start', err);
  }
})();
