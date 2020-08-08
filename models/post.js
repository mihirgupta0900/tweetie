const mongoose = require("mongoose");
const { User } = require("./constants");
const { ObjectId } = mongoose.Schema;

const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true,
        },
        userId: {
            type: ObjectId,
            ref: User,
        },
        likes: [
            {
                userId: {
                    type: ObjectId,
                    ref: User,
                },
            },
        ],
    },
    { timestamps: true }
);

const Post = mongoose.model("post", postSchema);

module.exports = Post;
