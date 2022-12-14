const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');


//homepage route
router.get('/',  async (req, res) => {
  try {
    const postData = await Post.findAll({
      order: [['title', 'ASC']],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      // this will tell the homepage the users object and the logged_in value of the 
      // req.session.logged_in tag. 
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get blog post
router.get('/post/:id',  async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include:[{model: Comment}]
      });
    
      const post = postData.get({ plain: true });
      const user_name = req.session.user_name;
      const user_id = req.session.user_id;
      const is_post_author = (user_id === post.user_id);
            
      res.render('post', { post, user_name, is_post_author, logged_in: req.session.logged_in});
    } catch (err) {
      console.log(err);
      res.status(500).json(err.message);
    }
  });

  router.get('/edit-post/:id',  async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const postData = await Post.findByPk(req.params.id);
  
      const post = postData.get({ plain: true });
      console.log(post);
      res.render('edit-post', {post, logged_in: req.session.logged_in});
    } catch (err) {
      res.status(500).json(err);
    }
  });

// get profile page.  checks for authentication
router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
      });
  
      const user = userData.get({ plain: true });
      const userId = user.id;
      console.log(userId);
      const postData = await Post.findAll({
        where: {
            user_id:user.id,
        },
        order: [['title', 'ASC']],
      });
  
      const posts = postData.map((post) => post.get({ plain: true }));
      
      console.log(user);
      res.render('profile', {
        ...user,
       posts,
       logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });


// login page route.
router.get('/login', (req, res) => {
  // if user is already logged in, send them back to homepage.
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
