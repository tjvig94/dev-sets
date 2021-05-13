const express = require('express');
const router = express.Router();
const db = require('../../models');

// CREATE
router.post('/', async (req, res) => {
    try {
        const { title, desc, image, user } = req.body;
        db.Post.create({ 
            title: title, 
            desc: desc,
            image: image,
            user: user
        }).then(post => res.status(200).json(post))      
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
})

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

module.exports = router;
