import React, { useContext, useEffect, useState} from "react";
import "./ProfileCard.css";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";

const ProfileCard = ({ location }) => {
  const socket = useContext(SocketContext);
  const { user } = useSelector((state) => state.authReducer.authData);
  const { posts } = useSelector((state) => state.timelineReducer);
  
  const dispatch = useDispatch();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

 
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={user.coverpicture || serverPublic + "defaultcover.jpg"}
          alt="cover-pic"
        />
        <img
          src={user.profilepicture || serverPublic + "profiledef.png"}
          alt="profile-pic"
        />
      </div>
      <div className="ProfileName">
        <span>
          {user.firstname} {user.lastname}
        </span>
        <span>{user.worksAt ? user.worksAt : "Write about yourself"}</span>
      </div>
      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.follower.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>
          {location === "profilepage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {posts.filter((post) => post.userId === user._id).length}
                </span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === "profilepage" ? (
        ""
      ) : (
        <span style={{color:"#1E3A8A"}}>
          <Link
            style={{ textDecortion: "none", color: "inherit" }}
            to={`/profile/${user._id}`}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
