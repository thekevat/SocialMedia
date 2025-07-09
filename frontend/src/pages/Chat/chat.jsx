import React, { useEffect, useState, useContext } from "react";
import "./chat.css";
import Home from "../../img/home.png";
import Comment from "../../img/comment.png";
import Noti from "../../img/noti.png";
import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import { useSelector } from "react-redux";
import { userChats } from "../../Api/chatRequests";
import Conversation from "../../components/Conversation/Conversation";
import ChatBox from "../../components/ChatBox/ChatBox";
import { SocketContext } from "../../context/SocketContext";
import { OnlineUsersContext } from "../../context/onlineUsersContext";
import { getToken } from "../../utils/auth";
import Building from "../../img/building.png"

const Chat = () => {
  const socket = useContext(SocketContext);
  const onlineUsers = useContext(OnlineUsersContext);
  const { user } = useSelector((state) => state.authReducer.authData);

  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);

  const handleTokenExpiry = () => {
  alert("Session expired. Please log in again.");
  localStorage.clear();
  window.location.href = "/auth";
};
 
  // Fetch user's chats
  const getChats = async () => {
    const token=getToken();
    try {
      const { data } = await userChats(user._id,token);
      setChats(data);
    } catch (error) {
       if (error.response?.status === 401) {
      handleTokenExpiry();
    } else {
      console.error("chat loading error:", error);
    }
    }
  };

  useEffect(() => {
    getChats();
  }, [user]);

  // Socket listener to refresh chat list


  // Send message
  useEffect(() => {
    if (sendMessage !== null && socket.current) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Receive message
  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setReceiveMessage(data);
    };

    if (socket.current) {
      socket.current.on("receive-message", handleReceiveMessage);
    }

    return () => {
      if (socket.current)
        socket.current.off("receive-message", handleReceiveMessage);
    };
  }, [socket]);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    return onlineUsers.some((u) => u.userId === chatMember);
  };

  return (
    <div className="Chat">
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="chat-list">
            {chats.map((chat, i) => (
              <div key={i} onClick={() => setCurrentChat(chat)}>
                <Conversation
                  data={chat}
                  currentUserId={user._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="Right-side-chat"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <div className="Navicons">
            <Link to="../home">
             <img src={Building} style={{height:"30px", width:"auto"}}/>
            </Link>
            <UilSetting />
            <img src={Noti} alt="notifications" />
            <Link to="../chat">
              <img src={Comment} alt="chat" />
            </Link>
          </div>
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receiveMessage={receiveMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
