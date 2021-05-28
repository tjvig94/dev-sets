const express = require('express');
const router = express.Router();

const postRoutes = require('./postRoutes');
const profileRoutes = require('./profileRoutes');
const userRoutes = require('./userRoutes');

router.use('/post', postRoutes);
router.use('/profile', profileRoutes);
router.use('/users', userRoutes);

module.exports = router;
