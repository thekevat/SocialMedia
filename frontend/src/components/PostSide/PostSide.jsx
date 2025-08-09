import React from 'react';
import "./PostSide.css";
import PostShare from '../PostShare/PostShare';
import Posts from '../Posts/Posts';
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
const PostSide = () =>{
      const location = useLocation();

    const isOnProfilePage = location.pathname.startsWith("/profile");
    const {user}=useSelector((state)=>state.authReducer.authData);
    const params=useParams();
    const profileUserId=params.id;
    return(
        <div className="PostSide">
            {(!isOnProfilePage || (user._id===profileUserId)) &&   <PostShare/>}
              
                <Posts/>
        </div>
    );
}
export default PostSide;
