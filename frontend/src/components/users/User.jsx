import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../actions/userAction";
import { SocketContext } from "../../context/SocketContext";

const User = ({ person,onFollowChange }) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const { user } = useSelector((state) => state.authReducer.authData);

  // Local states
  const [following, setFollowing] = useState(
    user.following.includes(person._id)
  );
  const [profilePicture, setProfilePicture] = useState(person.profilepicture);

  // Listen for real-time profile picture update
  useEffect(() => {
    if (!socket.current) return;

    const handleProfileUpdate = ({ userId, profilepicture }) => {
      if (userId === person._id) {
        setProfilePicture(profilepicture);
      }
    };

    socket.current.on("profile-updated", handleProfileUpdate);

    return () => {
      socket.current.off("profile-updated", handleProfileUpdate);
    };
  }, [socket, person._id]);

  // Follow/unfollow logic
  const handleClick = async() => {
    if (following) {
      await dispatch(unFollowUser(person._id, user));
      socket.current.emit("user-unfollow", {
        userId: user._id,
        unfollowedUserId: person._id,
      });

      socket.current.emit("refresh-chats", {
        targetUserId: person._id,
      });
    } else {
      await dispatch(followUser(person._id, user));
      socket.current.emit("user-follow", {
        userId: user._id,
        followedUserId: person._id,
      });

      socket.current.emit("refresh-chats", {
        targetUserId: person._id,
      });
    }

    setFollowing((prev) => !prev);
    if (onFollowChange) onFollowChange();
  };

  return (
    <div className="Follower">
      <div>
        <img
          src={profilePicture || serverPublic+"profiledef.png"}
          className="FollowerImage"
          alt="Profile"
        />
        <div className="Name">
          <span>{person.firstname}</span>
        </div>
      </div>
      <button
        className={`button button-fc ${following ? "unFollowButton" : ""}`}
        onClick={handleClick}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default User;
