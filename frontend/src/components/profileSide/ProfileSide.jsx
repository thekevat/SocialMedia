import React,{useState} from "react";
import "./ProfileSide.css";
import ProfileCard from "../ProfileCard/ProfileCard";
import LogoSearch from "../LogoSearch/LogoSearch";
import FollowersCard from "../FollowersCard/FollowersCard"
const ProfileSide = () => {
  const [searchQuery,setSearchQuery]=useState("");
  return (
    <div className="ProfileSide">
       <LogoSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <ProfileCard location="homepage"/>
      <FollowersCard searchQuery={searchQuery}/>
    </div>
  );
};
export default ProfileSide;
