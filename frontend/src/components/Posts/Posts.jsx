import React, { useContext, useEffect, useMemo } from "react";
import "./Posts.css";
import { getTimeLinePosts } from "../../actions/postAction";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";

const Posts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const { posts } = useSelector((state) => state.postReducer);
  const { loading, posts: timeline } = useSelector((state) => state.timelineReducer);
  const params = useParams();
  const socket=useContext(SocketContext);
 
  useEffect(() => {
  if(!socket.current) return;
  socket.current.on("react", ({ postId , userId}) => {
    
  
    dispatch({
      type: "TOGGLE_LIKE",
      payload: { postId,userId },
    });
  });

  return () => socket.current.off("react");
}, [socket, dispatch]);

  useEffect(() => {
    dispatch(getTimeLinePosts(user._id));
  }, [dispatch, user._id]);

  const filteredPosts = useMemo(() => {
    return posts.filter(
      (post) => post.userId === user._id || user.following.includes(post.userId)
    );
  }, [posts, user]);

  const uniquePosts = useMemo(() => {
    const map = new Map();
    [...filteredPosts, ...timeline].forEach((post) => {
      map.set(post._id, post);
    });

    let result = Array.from(map.values());

    if (params.id) {
      result = result.filter((post) => post.userId === params.id);
    }

    return result;
  }, [filteredPosts, timeline, params.id]);

  return (
    <div className="Posts">
      {loading
        ? "Fetching Posts..."
        : uniquePosts.map((post, id) => (
           
            <Post key={post._id} data={post} id={id} />
          
          ))}
    </div>
  );
};

export default Posts;
