const express = require('express');
const router = express.Router();
const db = require('../../models');
const multer = require('multer');
// const { base } = require('../../models/Post');
// const upload = multer({ dest: "uploads/" });


// CREATE
router.post('/', upload.single('image') , async (req, res) => {
    try {
        const { title, desc, user } = req.body;
        db.Post.create({ 
            user: user,
            title: title, 
            desc: desc,
            image: {
                data: req.file.filename,
                contentType: 'image/png'
            }
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
