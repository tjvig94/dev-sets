const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String },
    desc: { type: String },
    image: { type: String },
    favorites: { type: Number },
    user: { type: String, required: true },
    date: {type: Date, default: Date.now}
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
