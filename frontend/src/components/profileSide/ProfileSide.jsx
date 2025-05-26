import React from "react";
import "./ProfileSide.css";
import ProfileCard from "../ProfileCard/ProfileCard";
import LogoSearch from "../LogoSearch/LogoSearch";
import FollowersCard from "../FollowersCard/FollowersCard"
const ProfileSide = () => {
  return (
    <div className="ProfileSide">
      <LogoSearch />
      <ProfileCard location="homepage"/>
      <FollowersCard/>
    </div>
  );
};
export default ProfileSide;
