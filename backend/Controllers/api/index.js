const express = require('express');
const router = express.Router();

const postRoutes = require('./postRoutes');
const profileRoutes = require('./profileRoutes');

router.use('/post', postRoutes)
router.use('/profile', profileRoutes)

module.exports = router;
