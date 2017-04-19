import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = new Schema({
    id: String,
    title: String,
    subtitle: String,
    content: String,
    author: String,
    date: Date,
    created_at: Date,
    updated_at: Date
});

postSchema.pre('save', function (next) {
    const currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

postSchema.statics.updateById = function (id, post) {
    const query = { '_id': id };
    return this.findOneAndUpdate(query, post);
};

postSchema.statics.getById = function (id) {
    const query = { '_id': id };
    return this.findOne(query);
};

postSchema.statics.deleteById = function (id) {
    const query = { '_id': id };
    return this.findOneAndRemove(query);
};


const Post = mongoose.model('Post', postSchema);
export default Post;
