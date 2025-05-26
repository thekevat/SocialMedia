import React, { useEffect, useState } from "react";
import "./ProfileCard.css";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom';
const ProfileCard = ({location}) => {
  
  const {user}=useSelector((state)=>state.authReducer.authData);
  const {posts}=useSelector((state)=>state.timelineReducer);

  const serverPublic=process.env.REACT_APP_PUBLIC_FOLDER
 
    
  return (
    <div class="ProfileCard">
      <div className="ProfileImages">
        <img src={user.coverpicture?serverPublic+user.coverpicture:serverPublic+"defaultcover.jpg"} alt="cover-pic" />
        <img src={user.profilepicture?serverPublic+user.profilepicture:serverPublic+"profile.png"} alt="profile-pic" />
      </div>
      <div className="ProfileName">
        <span>{user.firstname} {user.lastname}</span>
        <span>{user.worksAt?user.worksAt:"Write about yourself"}</span>
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
          {location==="profilepage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{posts.filter((post)=>post.userId===user._id).length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div >
      {location==="profilepage" ? "" : <span><Link style={{textDecortion:"none",color:"inherit"}} to={`/profile/${user._id}`}>My Profile</Link></span>}
    </div>
  );
};

export default ProfileCard;
