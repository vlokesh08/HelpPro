
const monngoose = require('mongoose');

const chatSchema = mongoose.Schema(
    {
        sender : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        chats : [
            {
                type : monngoose.Schema.Types.ObjectId,
                ref: "Chat",
            },
        ],
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
    },
    { timestamps: true }
);


const ChatUser = mongoose.model("ChatUser", chatUSerSchema);

module.exports = ChatUser;

