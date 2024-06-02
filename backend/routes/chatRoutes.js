
const express = require('express');	
const chatRouter = express.Router();
const { StreamChat } = require('stream-chat');

const apiKey = 'p7gt5vee9wee'
const apiSecret = 'b43zjj487m4zbkhnu2446ywggrqkra4vggund3abzxzfet9ptzmr9rmzzqex2wnv'
const client = new StreamChat(apiKey, apiSecret);


chatRouter.post('/token' , async (req,res)=>{
    try {
        const { userId } = req.body;


        // const userRole = client.channel('messaging', 'channel_id_here', { members: [userId], read: ['*', 'custom_channel_id'] });

        // Generate token for the user
        const token = client.createToken(userId);
    
        // Send token back to client
        res.json({ token });


      } catch (error) {
        console.error('Error generating token:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
});

module.exports = chatRouter;