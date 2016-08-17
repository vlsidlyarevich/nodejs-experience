var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/posts');

var postSchema = new mongoose.Schema({
    id: Number,
    title: String,
    subtitle: String,
    content: String,
    date: String,
    author: String,
    updated_at: {type: Date, default: Date.now}
});

var Post = mongoose.model('Post', postSchema);

exports.postSchema  = postSchema;
module.exports = Post;