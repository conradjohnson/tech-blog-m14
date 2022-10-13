const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// for all root/public requests send to homeRoutes router.
router.use('/', homeRoutes);

// for all api requests, send to api router.
router.use('/api', apiRoutes);

module.exports = router;
