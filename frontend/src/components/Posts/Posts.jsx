import React, { useEffect } from "react";
import "./Posts.css";
import { getTimeLinePosts } from "../../actions/postAction";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import {useParams} from "react-router-dom";

const Posts = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.authReducer.authData);
  let {posts}=useSelector((state)=>state.postReducer);
  let params=useParams();
  useEffect(() => {
     dispatch(getTimeLinePosts(user._id));
   }, []);
  let { loading } = useSelector((state) => state.timelineReducer);
  let timeline=useSelector((state)=>state.timelineReducer.posts);
  let filteredPosts = posts.filter((post) => (post.userId === user._id || user.following.includes(post.userId)));
  let combined=[...filteredPosts,...timeline];
  
  if(params.id) combined=combined.filter((post)=>post.userId===params.id);
 
  return (
  
    <div className="Posts">
      {loading
        ? "Fetching Posts..."
        : combined.map((post, id) => {
            return <Post data={post} id={id} />;
          })}
    </div>
  );
};
export default Posts;
