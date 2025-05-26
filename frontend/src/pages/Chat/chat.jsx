import React, { useEffect, useRef, useState } from "react";
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
import { io } from "socket.io-client";
const Chat = () => {
  const [chats, setChats] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const socket = useRef();

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        console.log(data);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user]);
  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("add-new-user", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);
  useEffect(() => {
    socket.current.on("receive-message", (data) => [setReceiveMessage(data)]);
  }, []);
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };
  return (
    <div className="Chat">
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="chat-list">
            {chats.map((chat) => (
              <div onClick={() => setCurrentChat(chat)}>
                <Conversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)}/>
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
            <Link to={"../home"}>
              <img src={Home} />
            </Link>
            <UilSetting />
            <img src={Noti} />
            <Link to={"../chat"}>
              <img src={Comment} />
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
