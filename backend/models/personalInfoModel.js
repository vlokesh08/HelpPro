const mongoose = require("mongoose");

const personalInfoSchema = mongoose.Schema(
  {
    username: { type: "String", unique: true, required: true },
    about: { type: "String" },
    email: { type: "String" },
    pic: {
      type: "String",
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    firstName: { type: "String" },
    lastName: { type: "String" },
    country: { type: "String" },
    city: { type: "String" },
    state: { type: "String" },
    zipcode: { type: "String" },
    phone: { type: "String" },
    address: { type: "String" },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    posts : [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      }
    ],
  },
  { timestaps: true }
);

const PersonalInfo = mongoose.model("PersonalInfo", personalInfoSchema);

module.exports = PersonalInfo;
