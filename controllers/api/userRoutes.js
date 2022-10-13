const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  console.log('new user attempt! name:' + req.body.name);
  try {
    
    const newUser = await User.create(req.body);

    // if (!userData) {
    //   console.log("couldn't create");
    //   res.status(400)
    //   .json({message:"didn't create"});
    //   return;
    // }
    // req.session.save(() => {  
    //   req.session.user_id = userData.id;
    //   req.session.logged_in = true;
    // });
    
    res.status(200).json(newUser);
    
    
  } catch (err) {
    console.log("bottom error");
    console.log(err);
    res.status(400).json(err.message);
  }
});

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