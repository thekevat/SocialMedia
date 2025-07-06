import React, { useState, useEffect, useRef, useContext } from "react";
import { getUser } from "../../Api/UserRequest";
import { getMessages } from "../../Api/messageRequest";
import "./ChatBox.css";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import { addMessages } from "../../Api/messageRequest";
import { SocketContext } from "../../context/SocketContext";

const ChatBox = ({ chat, currentUser, setSendMessage, receiveMessage }) => {
  const socket = useContext(SocketContext);
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const scroll = useRef();
  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) {
      getUserData();
    }
  }, [chat, currentUser]);
  useEffect(() => {
    setProfilePicture(userData?.profilepicture);
  }, userData);
  useEffect(() => {
    if (!socket.current) return;

    const handleProfileUpdate = ({ userId, profilepicture }) => {
      if (userId === userData?._id) {
        setProfilePicture(profilepicture);
      }
    };

    socket.current.on("profile-updated-chtb", handleProfileUpdate);

    return () => {
      socket.current.off("profile-updated-chtb", handleProfileUpdate);
    };
  }, [socket, userData]);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);
  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };
  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    try {
      const { data } = await addMessages(message);
      setMessages([...messages, data]);

      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });
    console.log(message);
  };
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <div className="ChatBox-container">
        {chat !== null ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div className="required">
                  <div>
                    <img
                      src={
                        profilePicture ||
                        process.env.REACT_APP_PUBLIC_FOLDER + "profile.png"
                      }
                      className="followerImage"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  </div>

                  <div className="name" style={{ fontSize: "0.8rem" }}>
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                </div>
              </div>
              <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
            </div>
            <div className="chat-body">
              {messages !== null
                ? messages.map((message) => (
                    <>
                      <div
                        ref={scroll}
                        className={
                          message.senderId === currentUser
                            ? "message own"
                            : "message"
                        }
                      >
                        <span>{message.text}</span>
                        <span>{format(message.createdAt)}</span>
                      </div>
                    </>
                  ))
                : ""}
            </div>
            <div className="chat-sender">
              <div>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div className="button send-button" onClick={handleSend}>
                Send
              </div>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
