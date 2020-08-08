const mongoose = require("mongoose");
const { User, Post } = require("./constants");
const { ObjectId } = mongoose.Schema;

const Schema = mongoose.Schema;

const retweetedPostSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: User,
        required: true
    },
    postId: {
        type: ObjectId,
        ref: Post,
        required: true
    },
    withComment: {
        type: Boolean,
        default: false,
        required: true
    },
    comment: {
        type: String,
        trim: true
    }
})

const retweetedPostModel = mongoose.model('RetweetedPost', retweetedPostSchema)

module.exports = retweetedPostModel