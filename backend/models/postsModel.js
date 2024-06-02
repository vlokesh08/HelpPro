
const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
    {
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
        title: { type: "String", required: true },
        body: { type: "String", required: true },
        pics: 
            [{type: "String"}]
        ,
        techstack : [
            { type: "String" }
        ],
        links : [
            { type: "String" }
        ],
        bounty : [
            { type: "String" }
        ],
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PersonalInfo"
        },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment", 
                postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
            }
        ],
        date: { type: "Date" },

    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;