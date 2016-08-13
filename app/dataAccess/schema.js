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

exports.Post = Post;

var post = new Post({
    id: 1, title: 'kek', subtitle: 'kekes', content: 'keks',
    date: '12.12.12', author: 'mr kek'
});

post.save(function (err) {
    if (err)
        console.log(err);
    else
        console.log(post);
});