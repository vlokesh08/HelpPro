const io = require("socket.io")(http, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
    AccessControlAllowOrigin: process.env.CLIENT_URL,
  
      allowedHeaders: ["my-custom-header", "Access-Control-Allow-Origin"],
      credentials: true,
    },
  });


  io.on("connection", (socket) => {
    console.log("A user connected");
  
    // Add user authentication logic here
    socket.on("authenticate", (userId) => {
      
        socket.userId = userId;
        console.log(`User ${userId} authenticated`);
    });
  
    // Join a chat room
    socket.on("join-room", async ({ otherUserId, roomId }) => {
      if(!socket.userId) {
        console.log("User1 not authenticated")
        // return;
      }
      if (!otherUserId) {
        console.log("User2 not authenticated")
        return;
      }
      const room = roomId;
      socket.join(room);
      console.log(`User ${socket.userId} joined room ${room}`);
  
      // Load previous messages
      try {
        const messagesRef = database
          .collection(`chats/${room}/messages`)
          .orderBy("timestamp", "asc");
        const snapshot = await messagesRef.get();
        const messages = snapshot.docs.map((doc) => doc.data()) || [];
        socket.emit("load-messages", messages);
      } catch (error) {
        console.error(error);
        socket.emit("error", { message: "Failed to load messages." });
      }
    });
  
    // Send a message
    socket.on("send-message", async ({ otherUserId, roomId, message }) => {
      if (!socket.userId || !otherUserId) {
        return;
      }
      const room = roomId;
      const newMessage = {
        sender: socket.userId,
        content: message.content.content,
        timestamp: Date.now(),
      };
      try {
        const messagesRef = database.collection(`chats/${room}/messages`);
        const docRef = await messagesRef.add(newMessage);
        const newLastMessage = message.content.content;
  
        const userChatRef = database.collection("userChats").doc(socket.userId);
        const otherUserChatRef = database.collection("userChats").doc(otherUserId);
  
        try {
          const doc = await userChatRef.get();
          const otherDoc = await otherUserChatRef.get();
  
          if (!doc.exists) {
            console.log("No such document!");
          }
  
          if (!otherDoc.exists) {
            console.log("No such document!");
          }
  
          // Update the last message for the current user
          const userData = doc.data();
          const chats = userData.chats;
          const updatedChats = chats.map((chat) => {
            if (chat.chatId === roomId) {
              return { ...chat, lastMessage: newLastMessage };
            }
            return chat;
          });
  
          await userChatRef.update({ chats: updatedChats });
  
          // Update the last message for the other user
          const otherUserData = otherDoc.data();
          const otherChats = otherUserData.chats;
          const otherUpdatedChats = otherChats.map((chat) => {
            if (chat.chatId === roomId) {
              return { ...chat, lastMessage: newLastMessage };
            }
            return chat;
          });
  
          await otherUserChatRef.update({ chats: otherUpdatedChats });
  
          console.log("Last message updated");
        } catch (error) {
          console.error("Error updating lastMessage:", error);
        }
        // newMessage.id = docRef.id;
        console.log("message added");
        // Emit the new message to everyone in the room
        io.to(room).emit("receive-message", newMessage);
      } catch (error) {
        console.error(error);
      }
    });
  
    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });