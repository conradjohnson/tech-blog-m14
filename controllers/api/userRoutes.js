const router = require('express').Router();
const { User } = require('../../models');

// create new user route.
router.post('/', async (req, res) => {
  try {
    
    const newUserData = await User.create(req.body);
    const newUser = newUserData.get({ plain: true });
    console.log(newUser);
    // create session with values that we will use later: user_name, user id, and logged_in flag
    req.session.save(() => {
      req.session.user_name = req.body.name;
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
    res.status(200).json(newUserData);
    });
    
  } catch (err) {
    console.log("bottom error");
    console.log(err);
    res.status(400).json(err.message);
  }
});

// route for logging in users.
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // create session with values that we will use later: user_name, user id, and logged_in flag
    req.session.save(() => {
      req.session.user_name = userData.name;
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// logout route.
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
