const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    uid: { type: String },
    name: { type: String },
    pfp: { type: String },
    email: { type: String }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
