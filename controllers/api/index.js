const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

// for all api/users requests, send to user router
router.use('/users', userRoutes);

// for all api/posts requests, send to post router
router.use('/posts', postRoutes);

module.exports = router;
