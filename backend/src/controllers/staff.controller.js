const Staff = require('../models/staff.model');
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const UPLOAD_DIR = process.env.UPLOAD_DIR || 'src/uploads';

// Create Staff
exports.createStaff = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    const { first_name, last_name, email, mobile_no, gender, role } = req.body;

    // check duplicate email
    const exists = await Staff.findOne({ where: { email } });
    if (exists) return res.status(409).json({ message: 'Email already exists' });

    const photo = req.file ? req.file.filename : null;
    const staff = await Staff.create({ first_name, last_name, email, mobile_no, gender, role, photo });
    return res.status(201).json(staff);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all staffs
exports.getStaffs = async (req, res) => {
  try {
    const staffs = await Staff.findAll({ order: [['createdAt', 'DESC']] });
    return res.json(staffs);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get single staff
exports.getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findByPk(req.params.id);
    if (!staff) return res.status(404).json({ message: 'Staff not found' });
    return res.json(staff);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update Staff
exports.updateStaff = async (req, res) => {
  try {
    const { first_name, last_name, email, mobile_no, gender, role } = req.body;
    const staff = await Staff.findByPk(req.params.id);
    if (!staff) return res.status(404).json({ message: 'Staff not found' });

    // if new email, check duplicate
    if (email && email !== staff.email) {
      const exists = await Staff.findOne({ where: { email } });
      if (exists) return res.status(409).json({ message: 'Email already exists' });
    }

    // if new file uploaded, delete old file
    if (req.file) {
      if (staff.photo) {
        const oldPath = path.join(UPLOAD_DIR, staff.photo);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      staff.photo = req.file.filename;
    }

    staff.first_name = first_name || staff.first_name;
    staff.last_name  = last_name  || staff.last_name;
    staff.email      = email      || staff.email;
    staff.mobile_no  = mobile_no  || staff.mobile_no;
    staff.gender     = gender     || staff.gender;
    staff.role       = role       || staff.role;

    await staff.save();
    return res.json(staff);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete Staff
exports.deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByPk(req.params.id);
    if (!staff) return res.status(404).json({ message: 'Staff not found' });
    // delete photo file if exists
    if (staff.photo) {
      const p = path.join(UPLOAD_DIR, staff.photo);
      if (fs.existsSync(p)) fs.unlinkSync(p);
    }
    await staff.destroy();
    return res.json({ message: 'Staff deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
