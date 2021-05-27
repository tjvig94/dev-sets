const express = require('express');
const router = express.Router();
const db = require('../../models');
const path = require('path');

// CREATE
router.post('/', async (req, res) => {
    try {       
        const { desc, name, pfp, title, user, image } = req.body;
        const newPost = await db.Post.create({ 
            user: user,
            name: name,
            pfp: pfp,
            title: title, 
            desc: desc,
            image: image
        })
        res.status(200).json(newPost);    
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});

// READ ALL POSTS
router.get('/', async (req, res) => {
    try {
        db.Post.find({}).then(posts => res.status(200).json(posts))
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    } 
});

// READ ONE POST
router.get('/:id', async (req, res) => {
    try {
        db.Post.findById({ _id: req.params.id }).then(post => res.status(200).json(post))
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});

// FIND POST BY TITLE
router.get('/searching/:search', async (req, res) => {
    try {
        const posts = await db.Post.find({ title: req.params.search });
        console.log(posts);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        db.Post.findOneAndUpdate({ _id: req.params.id }, req.body).then(updatedPost => res.status(200).json(updatedPost));
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        db.Post.findById({ _id: req.params.id }).then(post => post.remove()).then(post => res.json(post));
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});

// DELETE ALL
// router.delete('/', async (req, res) => {
//     try {
//         const allPosts = await db.Post.deleteMany({});
//         res.status(200).json({ message: `Removed posts`});
//         console.log(`Removed posts.`);
//     } catch (error) {
//         res.status(500).json(error);
//         console.log(error);
//     }
// })

module.exports = router;
