const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get all posts to populate the homepage
router.get('/', async (req, res) => {
    try {
        const blogPostData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        const blogPosts = blogPostData.map((post) => post.get({plain: true}));

        res.render('homepage', {
            blogPosts,
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
            //raw: true,
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
            ]
        });
        const commentData = await Comment.findAll({
            where: {
                post_id: req.params.id,
            },
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        const blogPosts = blogPostData.get({ plain: true});
        const blogComments = commentData.map((comments) => comments.get({ plain: true }));
        const sessionUser = () => {
            if (blogComments.user_id === req.session.user_id) {
                return true
            };
        };

        res.render('post', {
            ...blogPosts,
            blogComments,
            sessionUser,
            loggedIn: req.session.loggedIn
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// dashboard to view past posts of the user
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            }
        });

        const userPosts = postData.map((posts) => posts.get({ plain: true }));

        res.render('dashboard', {
            userPosts, 
            loggedIn: true
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/new-post', withAuth, (req, res) => res.render('new-post', {loggedIn: true}));
router.get('/new-comment', withAuth, (req, res) => res.render('new-comment', {loggedIn: true}));

// call to render the login page
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to the user's dashboard
    if (req.session.loggeIn) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
  });

// call to render sign-up page
router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect the request to the user's dashboard
    if (req.session.loggeIn) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('signup');
  });


module.exports = router;