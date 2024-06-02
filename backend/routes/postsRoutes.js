const express = require('express');
const router = express.Router();
const {addnewpost, getallposts, getpostforprofile, editpost, deletepost, getpostbyid} = require("../controllers/postController");
const { protect } = require('../middleware/authMiddleware');

router.post('/addnewpost' ,protect, addnewpost)
router.get('/getallposts' ,protect, getallposts);
router.get('/getpostforprofile/:id' ,protect, getpostforprofile);
router.put('/editpost/:id' ,protect, editpost);
router.delete('/deletepost/:id' ,protect, deletepost);
router.get('/getpostbyid/:id' ,protect, getpostbyid)

module.exports = router;