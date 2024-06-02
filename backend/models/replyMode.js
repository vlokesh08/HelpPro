
const mongoose = require('mongoose');


const replySchema = mongoose.Schema(
    {
        "author": { type: mongoose.Schema.Types.ObjectId, ref: "User"},
        "body": { type: "String", required: true },
        "post": { type: mongoose.Schema.Types.ObjectId, ref: "Post"},
        "likes": [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        "date": { type: "Date" },
    },
    { timestamps: true }
);

const Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;