const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const upload = require('../middleware/upload');
const { body } = require('express-validator');

// Create user (with photo)
router.post(
  '/',
  upload.single('photo'),
  [
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('mobile_no').notEmpty().withMessage('Mobile no required'),
    body('gender').isIn(['Male','Female','Other']).withMessage('Invalid gender'),
    body('role').notEmpty().withMessage('Role required')
  ],
  userController.createUser
);

// Get all
router.get('/', userController.getUsers);

// Get single
router.get('/:id', userController.getUserById);

// Update (optionally with new photo)
router.put('/:id',
  upload.single('photo'),
  [
    body('email').optional().isEmail().withMessage('Valid email required'),
    body('gender').optional().isIn(['Male','Female','Other']).withMessage('Invalid gender'),
  ],
  userController.updateUser
);

// Delete
router.delete('/:id', userController.deleteUser);

module.exports = router;
