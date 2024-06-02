

const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
    {
        text: { type: "String", required: true },
        postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        replies: [
            {
                text: String,
                postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
            }
        ],
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;