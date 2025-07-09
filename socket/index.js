const io = require("socket.io")(process.env.PORT || 8800, {
  cors: {
    origin:  process.env.FRONTEND_URL || "http://localhost:3000",
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  // Add new user to active user pool
  socket.on("add-new-user", (newUserId) => {
    const alreadyExists = activeUsers.some(
      (user) => user.userId === newUserId || user.socketId === socket.id
    );

    if (!alreadyExists) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
      console.log("✅ User added to activeUsers:", newUserId);
    }

    io.emit("get-users", activeUsers); // Notify all clients of new online list
  });

  // Respond to manual request to get online users
  socket.on("get-online-users", () => {
    socket.emit("get-users", activeUsers);
  });

  // Handle sending a message
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((u) => u.userId === receiverId);
    if (user) {
      io.to(user.socketId).emit("receive-message", data);
    }
  });

  // Follow: Notify the followed user
  socket.on("user-follow", ({ userId, followedUserId }) => {
    const followedUser = activeUsers.find((u) => u.userId === followedUserId);
    if (followedUser) {
      io.to(followedUser.socketId).emit("update-followers", {
        type: "follow",
        userId,
      });
    }
  });

  // Unfollow: Notify the unfollowed user
  socket.on("user-unfollow", ({ userId, unfollowedUserId }) => {
    const unfollowedUser = activeUsers.find(
      (u) => u.userId === unfollowedUserId
    );
    if (unfollowedUser) {
      io.to(unfollowedUser.socketId).emit("update-followers", {
        type: "unfollow",
        userId,
      });
    }
  });

  // Notify all users of a profile picture update
  socket.on("profile-updated", ({ userId, profilepicture }) => {
    socket.broadcast.emit("profile-updated", { userId, profilepicture });
  });

  socket.on("profile-updated", ({ userId, profilepicture }) => {
    socket.broadcast.emit("profile-updated-conv", { userId, profilepicture });
  });
  socket.on("profile-updated", ({ userId, profilepicture }) => {
    socket.broadcast.emit("profile-updated-chtb", { userId, profilepicture });
  });
  socket.on("new-post", ({ post }) => {
    if (post && post.userId) {
      console.log("📡 Broadcasting new post:", post);
      io.emit("receive-post", post);
    } else {
      console.warn("⚠️ Invalid post received:", post);
    }
  });
  socket.on("react", ({ postId, userId }) => {
    io.emit("react", { postId, userId });
  });
socket.on("new-register-user",(user)=>{
  socket.broadcast.emit("update-userlist",user);
})
  // Handle disconnect
  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((u) => u.socketId !== socket.id);
    console.log("❌ Disconnected:", socket.id);
    io.emit("get-users", activeUsers);
  });
});
console.log("running");