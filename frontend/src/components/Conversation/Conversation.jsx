import React, { useEffect, useState, useContext } from "react";
import { getUser } from "../../Api/UserRequest";
import { SocketContext } from "../../context/SocketContext";

const Conversation = ({ data, currentUserId, online }) => {
  const [userData, setUserData] = useState(null);
  const socket = useContext(SocketContext);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId);

    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, [data, currentUserId]); // ✅ now refetches when data changes
  useEffect(() => {
    setProfilePicture(userData?.profilepicture);
  }, [userData]);
  useEffect(() => {
    if (!socket.current) return;

    const handleProfileUpdate = ({ userId, profilepicture }) => {
      if (userId === userData?._id) {
        setProfilePicture(profilepicture);
      }
    };

    socket.current.on("profile-updated-conv", handleProfileUpdate);

    return () => {
      socket.current.off("profile-updated-conv", handleProfileUpdate);
    };
  }, [socket, userData]);
  return (
    <>
      <div className="follower conversation">
        <div className="required">
          <div>
            {online && <div className="online-dot"></div>}
            <img
              src={
                profilePicture ||
                process.env.REACT_APP_PUBLIC_FOLDER + "profile.png"
              }
              className="followerImage"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              alt="profile"
            />
          </div>

          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span>
              {userData?.firstname} {userData?.lastname}
            </span>
            {online ? (
              <span className="online">Online</span>
            ) : (
              <span className="offline">Offline</span>
            )}
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
