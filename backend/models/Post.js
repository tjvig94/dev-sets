const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String },
    desc: { type: String },
    image: { data: Buffer, contentType: String },
    user: { type: String, required: true }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
