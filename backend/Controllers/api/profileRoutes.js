const express = require('express');
const router = express.Router();
const db = require('../../models');
const multer = require('multer');
// const { base } = require('../../models/Post');
const upload = multer({ dest: "uploads/" });


// READ ALL POSTS
router.get('/profilepic', async (req, res) => {
    try {
      //res.json({profilePic:"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQx-oaTJEBgzx-vViHx_dBwccDrjKZZ1LnJS9bGKXzmid9zLAHb"});//img obj or stream of the mongo db data
      
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    } 
});

router.get('/:id', async (req, res) => {
  try {
      db.Post.findById({ _id: req.params.id }).then(post => res.status(200).json(post))
  } catch (error) {
      res.status(500).json(error);
      console.log(error);
  }
});

module.exports = router;