const express = require('express');
const router = express.Router();
const db = require('../../models');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename:function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage });


// CREATE
router.post('/', upload.single('image') , async (req, res) => {
    try {
        const image = fs.readFileSync(req.file.path);
        const encode_image = image.toString('base64');
        const { title, desc, user } = req.body;
        const newPost = await db.Post.create({ 
            user: user,
            title: title, 
            desc: desc,
            image: {
                data: new Buffer(encode_image, 'base64'),
                contentType: req.file.mimetype,
                path: req.file.path
            }
        })
        res.status(200).json(image);    
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
