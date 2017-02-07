function getAllPosts(db, callback) {
    console.log("Finding all posts");
    var cursor = db.collection('posts').find();
    cursor.each(function (err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            callback();
        }
    });
}

function insertPost(db, post, callback) {
    console.log("Inserting new post: " + post);
    db.collection('posts').insertOne(post, function (error, result) {
        if (error) {
            console.log("Error due getting post: " + post);
        } else {
            console.log("Successfuly inserted post: " + post);
            callback(result)
        }
    });
}

exports.getAllPosts = getAllPosts;