const express = require('express');
const router = express.Router();
const db = require('../../models');
const path = require('path');

// CREATE
router.post('/', async (req, res) => {
    try {
        let user = await db.User.find({ uid: req.body.uid });
        if (user.length !== 0) return res.status(200).json({ message: `${user[0].name} has an account already. Logging in!`});
        user = await db.User.create(req.body);
        res.status(200).json(user); 
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// RETRIEVE ALL USERS
router.get('/', async (req, res) => {
    try {
        const users = await db.User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
})

// RETRIEVE USERS BY NAME
router.get('/:name', async (req, res) => {
    try {
        const users = await db.User.find({ name: req.params.name });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router;
