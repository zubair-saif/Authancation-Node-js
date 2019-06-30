const express = require('express');
const router = express.Router();

const userController=require('../../controlller/users');


// Load User model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post('/register',userController.register);

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login',userController.login);

module.exports = router;
