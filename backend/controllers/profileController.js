// Instead of import PersonalInfo from "../models/personalInfoModel";
const PersonalInfo = require("../models/personalInfoModel");
const User = require("../models/userModel");

const getDetails = async (req, res) => {
    try {
        const { username } = req.body;
        const profile = await PersonalInfo.findOne({
            username,
        }).populate("posts");
        if (profile) {
            res.json(profile);
        }
        else {
            res.status(404);
            throw new Error("Profile not found");
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const editProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, about, firstName, lastName, pic, country, streetAddress, city, region, postalCode } = req.body;
        const pro = await User.findOneAndUpdate({
            username:id,
        }, {
            $set: {
                pic: pic,
            }
        });

        const profile = await PersonalInfo.findOneAndUpdate({
            username:id,
        },{
            $set: {
                about: about,
                firstName: firstName,
                lastName: lastName ,
                country: country ,
                address: streetAddress ,
                pic:pic,
                city: city ,
                state: region ,
                zipcode: postalCode ,
            }
        }
        
        );
        if(pro && profile){
            res.status(201).json({
                _id: pro._id,
                username: pro.username,
                email: pro.email,
                pic: pro.pic,
                token: generateToken(pro._id),
              });
        }
        else{    
            res.status(404);
            throw new Error("Profile not found");
        }

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllProfiles = async (req, res) => {
    try {
        const profiles = await PersonalInfo.find({},{username:1,email:1,firstName:1,lastName:1,pic:1}).exec();
        res.json(profiles);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getProfilesForHomePage = async (req, res) => {
    try {
        const profiles = await PersonalInfo.find({},{username:1,email:1,firstName:1,lastName:1,pic:1}).limit(5).exec();
        res.json(profiles);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { editProfile , getDetails , getAllProfiles , getProfilesForHomePage};