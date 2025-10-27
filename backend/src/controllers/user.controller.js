const User = require('../models/user.model');
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const UPLOAD_DIR = process.env.UPLOAD_DIR || 'src/uploads';

// Create user
exports.createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    const { first_name, last_name, email, mobile_no, gender, role } = req.body;

    // check duplicate email
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ message: 'Email already exists' });

    const photo = req.file ? req.file.filename : null;
    const user = await User.create({ first_name, last_name, email, mobile_no, gender, role, photo });
    return res.status(201).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ order: [['createdAt', 'DESC']] });
    return res.json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get single user
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { first_name, last_name, email, mobile_no, gender, role } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // if new email, check duplicate
    if (email && email !== user.email) {
      const exists = await User.findOne({ where: { email } });
      if (exists) return res.status(409).json({ message: 'Email already exists' });
    }

    // if new file uploaded, delete old file
    if (req.file) {
      if (user.photo) {
        const oldPath = path.join(UPLOAD_DIR, user.photo);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      user.photo = req.file.filename;
    }

    user.first_name = first_name || user.first_name;
    user.last_name  = last_name  || user.last_name;
    user.email      = email      || user.email;
    user.mobile_no  = mobile_no  || user.mobile_no;
    user.gender     = gender     || user.gender;
    user.role       = role       || user.role;

    await user.save();
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    // delete photo file if exists
    if (user.photo) {
      const p = path.join(UPLOAD_DIR, user.photo);
      if (fs.existsSync(p)) fs.unlinkSync(p);
    }
    await user.destroy();
    return res.json({ message: 'User deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
