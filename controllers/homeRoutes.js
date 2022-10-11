const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');


// we can send an array of functions to check various things.  In this case,
// we're only sending one function 'withAuth' to use when getting the '/' path in our 
// webapp.  'withAuth' is checking to see if the req.session.logged_in is set to true. 
// if it is set to true, it allows the request to proceed to our async function. 
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

// Use withAuth middleware to prevent access to route
router.get('/post/:id',  async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const postData = await Post.findByPk(req.params.id);
  
      const post = postData.get({ plain: true });
      console.log(post);
      res.render('post', {post});
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Use withAuth middleware to prevent access to route
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
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });


  
router.get('/login', (req, res) => {
  // if user is already logged in, send them back to homepage.
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
