const express = require('express');
const router = express.Router();
const passport = require('passport');
const postController=require('../../controlller/post');
const linkeUnlikeController=require('../../controlller/likeController');
const comments=require('../../controlller/comments');

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/',postController.get);

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', postController.getById);

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post('/',passport.authenticate('jwt', { session: false }),postController.createPost);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id',passport.authenticate('jwt', { session: false }),postController.deletePost);

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post('/like/:id',passport.authenticate('jwt', { session: false }),linkeUnlikeController.Like);

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post('/unlike/:id',passport.authenticate('jwt', { session: false }),linkeUnlikeController.Unlike);

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post('/comment/:id',passport.authenticate('jwt', { session: false }),comments.Createcomments);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete('/comment/:id/:comment_id',passport.authenticate('jwt', { session: false }),comments.deleteComments);

module.exports = router;
