"use strict";

import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var userSchema = new Schema({
    id: String,
    firstName: String,
    secondName: String,
    username: String,
    password: String,
    email: String,
    created_at: Date,
    updated_at: Date
});

userSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});

userSchema.statics.updateById = function (id, user) {
    const query = { '_id': id };
    return this.findOneAndUpdate(query, user);
};

userSchema.statics.getById = function (id) {
    const query = { '_id': id };
    return this.findOne(query);
};

userSchema.statics.deleteById = function (id) {
    const query = { '_id': id };
    return this.findOneAndRemove(query);
};

userSchema.statics.getByUsername = function (username) {
    const query = { 'username': username };
    return this.findOne(query);
};

var User = mongoose.model('User', userSchema);
export {User};