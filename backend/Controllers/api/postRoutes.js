const express = require('express');
const router = express.Router();
const db = require('../../models');
const path = require('path');

// CREATE
router.post('/', async (req, res) => {
    try {       
        const newPost = await db.Post.create(req.body)
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

// READ ONE POST BY ID
// router.get('/:id', async (req, res) => {
//     try {
//         db.Post.findById({ _id: req.params.id }).then(post => res.status(200).json(post))
//     } catch (error) {
//         res.status(500).json(error);
//         console.log(error);
//     }
// });

// READ SOME POSTS
router.get('/some/some', async (req, res) => {
    try {
        const posts = await db.Post.find({}).limit(5);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});

// SEARCH POSTS
router.get('/:search', async (req, res) => {
    try {
        const postsByTitle = await db.Post.find({ title: { $regex:  req.params.search, $options: 'i' } });
        const postsByDesc = await db.Post.find({ desc: { $regex: req.params.search, $options: 'i' } });
        const postsByUser = await db.Post.find({ name: { $regex: req.params.search, $options: 'i' } });
        const posts = postsByTitle.concat(postsByDesc).concat(postsByUser).slice(0, 5);
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
