import React from "react";
import "./Profile.css";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import PostSide from "../../components/PostSide/PostSide";
import RightSide from "../../components/RightSide/RightSide"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Profile = ()=>{
   
    return(
        <div className="Profile">
               <ProfileLeft/>
               <div className="Profile-Center">
                      <ProfileCard location="profilepage"/>
                      <PostSide/>
               </div>
               <RightSide/>
        </div>
    );
}

export default Profile;