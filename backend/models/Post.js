const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String },
    desc: { type: String },
    image: { type: String },
    favorites: { type: Number },
    user: { type: String, required: true },
    name: { type: String },
    pfp: { type: String },
    date: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    fileName: { type: String }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
