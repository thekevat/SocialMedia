import React from "react";
import Logo from "../../img/logo.png";
import { useLocation } from "react-router-dom";
import "./LogoSearch.css";
import { UilSearch } from "@iconscout/react-unicons";
const LogoSearch = ({ searchQuery, setSearchQuery }) => {
  const location=useLocation();
  const isChatPage=location.pathname.startsWith("/chat");
  return (
    <div className="LogoSearch">
      <img src={Logo} alt="logo of site" />
      {!isChatPage && <div className="Search">
        <input
          type="text"
          placeholder="#Explore"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="s-icon">
          <UilSearch />
        </div>
      </div>}
    </div>
  );
};
export default LogoSearch;
