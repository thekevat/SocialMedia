import React, { useState } from "react";

import LogoSearch from "../../components/LogoSearch/LogoSearch";
import FollowersCard from "../../components/FollowersCard/FollowersCard";
import InfoCard from "../InfoCard/InfoCard";

const ProfileLeft = () =>{
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <div className="ProfileSide">
                <LogoSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                <InfoCard/>
                <FollowersCard searchQuery={searchQuery}/>
        </div>
    )
}

export default ProfileLeft;