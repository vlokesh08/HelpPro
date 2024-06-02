
const Comment = require('../models/commentModel')
const Post = require('../models/postsModel');

const addComment = async (req, res) => {
    const { postId, comment } = req.body;
    try {
        const post = await Post.findById(postId);
        if (post) {
            const newComment = new Comment({
                text:comment,
                postId,
                postedBy: req.user._id,
            });
            await newComment.save();
            post.comments.push(newComment);
            await post.save();

            res.json(newComment);
        }
        else {
            res.status(404);
            throw new Error("Post not found");
        }
    }

    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getComments = async (req, res) => {
    const postId = req.params.id;
    try {
        const comments = await Comment.find({postId})
            .populate('postedBy', '-password')
            .populate({
                path: 'replies',
                populate: {
                    path: 'postedBy',
                    select: '-password' // Exclude password field if it exists
                }
            })
            .exec();   
        res.json(comments);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteComment = async (req, res) => {
    const commentId = req.params.id;
    try {
        const comment = await Comment
            .findByIdAndDelete(commentId)
            .exec();
        const post = await Post.findById(comment.postId);
        post.comments = post.comments.filter((comment) => comment.toString() !== commentId);
        await post.save();
        res.json(comment);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const addReply = async (req, res) => {
    const { commentId, reply } = req.body;
    try {
        const comment = await Comment.findById(commentId);
        if (comment) {
            comment.replies.push({
                text: reply,
                postedBy: req.user._id,
            });
            await comment.save();
            res.json(comment);
        }
        else {
            res.status(404);
            throw new Error("Comment not found");
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getReplies = async (req, res) => {
    const commentId = req.params.id;
    try {
        const comment = await Comment.findById(commentId);
        if (comment) {
            res.json(comment.replies);
        }
        else {
            res.status(404);
            throw new Error("Comment not found");
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = { addComment, getComments, deleteComment, addReply, getReplies};