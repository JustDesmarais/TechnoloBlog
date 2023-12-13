const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get all posts to populate the homepage
router.get('/', async (req, res) => {
    try {
        const blogPostData = await Post.findAll({
            raw: true, 
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });
        res.render('homepage', {
            blogPostData,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

//get posts by id to populate individual blog post pages
router.get('/post/:id', async (req, res) => {
    try {
        const blogPostData = await Post.findByPk(req.params.id, {
            raw: true,
            include: [
                {
                    model: Comment, 
                    attributes: ['content'],
                },
                {
                    model: User,
                    attribute: ['username']
                }
            ]
        });
        res.render('post', {
            ...blogPostData,
            loggedIn: req.session.loggedIn
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            raw: true,
            attributes: { excluded: ['password'] }, 
            include: [{ model: Post }], 
        });
        res.render('dashboard', {
            ...userData, 
            loggedIn: true
        })
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.loggeIn) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
  });

module.exports = router;