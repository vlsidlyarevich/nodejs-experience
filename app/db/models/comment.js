import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    id: String,
    userId: String,
    postId: String,
    text: String,
    created_at: Date,
    updated_at: Date
});

commentSchema.pre('save', function (next) {
    const currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

commentSchema.statics.getById = function (id) {
    const query = { '_id': id };
    return this.get(query);
};

commentSchema.statics.getCommentsByPostId = function (postId) {
    const query = { 'postId': postId };
    return this.find(query);
};

commentSchema.statics.deleteById = function (id) {
    const query = { '_id': id };
    return this.findOneAndRemove(query);
};

commentSchema.statics.updateById = function (id, comment) {
    const query = { '_id': id };
    return this.findOneAndUpdate(query, comment);
};


const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
