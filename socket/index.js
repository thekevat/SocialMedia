const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  socket.on("add-new-user", (newUserId) => {
    if (
      !activeUsers.some(
        (user) => user.userId === newUserId || user.socketId === socket.id
      )
    ) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
     
    }

    io.emit("get-users", activeUsers);
  });
  socket.on('send-message',(data)=>{
    const {receiverId}=data;
    const user=activeUsers.find((user)=>user.userId===receiverId);
  
    if(user){
      io.to(user.socketId).emit("receive-message",data);
    }
  })
  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
  
    io.emit("get-users", activeUsers);
  });
});
