
const express = require('express');
const { editProfile,getDetails, getAllProfiles, getProfilesForHomePage } = require('../controllers/profileController');
const { default: verifyUser } = require('../utils/verifyUser');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/editProfile/:id',protect, editProfile)
router.post('/getDetails'  ,getDetails)
router.get('/getAllProfiles',protect, getAllProfiles);
router.get('/getProfilesForHomePage',protect, getProfilesForHomePage);

module.exports = router;