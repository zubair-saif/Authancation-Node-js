const express = require('express');
const router = express.Router();
const passport = require('passport');
const profileController=require('../../controlller//profile');
// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get('/',
passport.authenticate('jwt', { session: false }),
profileController.getCurrent);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', profileController.Getallprofile);

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get('/handle/:handle',profileController.Handleprofile);

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', 
profileController.getByid);

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post('/',
 passport.authenticate('jwt', { session: false }),
 profileController.editProfile);

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post('/experience',
 passport.authenticate('jwt', { session: false })
,profileController.AddExperience);

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post('/education',
passport.authenticate('jwt', { session: false }),
profileController.AddEducation

);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id',
passport.authenticate('jwt', { session: false },
profileController.deleteExperience),
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  profileController.deleteEducation
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  profileController.deleteProfile
);

module.exports = router;
