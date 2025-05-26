import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../actions/userAction";

const User = ({person}) => {
  const serverPublic=process.env.REACT_APP_PUBLIC_FOLDER
  const dispatch=useDispatch();
 
  const {user}=useSelector((state)=>state.authReducer.authData);
  const [following,setFollowing]=useState(user.following.includes(person._id));
  const handleClick=()=>{
     following?dispatch(unFollowUser(person._id,user)):dispatch(followUser(person._id,user));
     setFollowing((prev)=>!prev)
  }
  return (
    <div className="Follower">
      <div>
        <img src={person.profilepicture?serverPublic+person.profilepicture:serverPublic+"profile.png"} className="FollowerImage" />
        <div className="Name">
          <span>{person.firstname}</span>
          {/* <span>{person.username}</span> */}
        </div>
      </div>
      <button className={following?"button button-fc unFollowButton":"button button-fc"} onClick={handleClick}>{following?"Unfollow":"Follow"}</button>
    </div>
  );
};

export default User;
