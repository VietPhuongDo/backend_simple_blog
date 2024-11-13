const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
