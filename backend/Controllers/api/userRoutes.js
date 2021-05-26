const express = require('express');
const router = express.Router();
const db = require('../../models');
const path = require('path');

// CREATE
router.post('/', async (req, res) => {
    try {
        let user = await db.User.find({ uid: req.body.uid});
        if (user) {
            user = await db.User.create(req.body);
        };
        res.status(200).json(user); 
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// RETRIEVE
router.get('/', async (req, res) => {
    try {
        const users = await db.User.find({ name: req.body.name });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router;
