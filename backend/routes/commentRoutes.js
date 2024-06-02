
const express = require('express');

const router = express.Router();

const {addComment, getComments, deleteComment, addReply, getReplies} = require('../controllers/commentsController');
const { protect } = require('../middleware/authMiddleware');

router.post('/addComment', protect,addComment);
router.get('/getComments/:id',getComments);
router.delete('/deleteComment/:id',protect,deleteComment);
router.post('/addReply',protect,addReply);
router.get('/getReplies/:id',getReplies);

module.exports = router;