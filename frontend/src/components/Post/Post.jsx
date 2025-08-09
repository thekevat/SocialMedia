import React, { useState, useEffect, useContext } from "react";
import "./Post.css";
import comment from "../../img/comment.png";
import like from "../../img/like.png";
import notlike from "../../img/notlike.png";
import share from "../../img/share.png";
import { useSelector } from "react-redux";
import { likePost } from "../../Api/PostRequest";
import { MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePostAction } from "../../actions/uploadAction";
import { getUser } from "../../Api/UserRequest";
import { SocketContext } from "../../context/SocketContext";
import { getToken } from "../../utils/auth";

const Post = ({ data }) => {
 
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
 
  const socket = useContext(SocketContext);
  const [postUser, setPostUser] = useState({});
  useEffect(() => {
    const fetchPostUser = async () => {
      try {
        const { data: userData } = await getUser(data.userId);
        setPostUser(userData);
      } catch (err) {
        console.error("Error fetching post user:", err);
      }
    };

    fetchPostUser();
  }, [data.userId]);
  const { id: profileId } = useParams(); // 'id' from URL param when on profile page

  const liked = data.likes.includes(user._id);
const likes = data.likes.length;

const handleLike = async() => {
  const token= await getToken();
  likePost(data._id, user._id,token);
  socket.current.emit("react", {
    postId: data._id,
    userId: user._id,
  });
};

  const handleDelete = (postId) => {
    dispatch(deletePostAction(postId, user._id));
    console.log("Deleting post with id:", postId);
  };

  const isOnProfilePage = profileId === user._id; // true if viewing own profile

  return (
    <div className="Post">
      <img src={data.image || ""} alt="" />

      <div className="PostReact">
        <div className="left-icons">
          <img
            src={liked ? like : notlike}
            alt=""
            style={{ cursor: "pointer" }}
            onClick={handleLike}
          />
          <img src={comment} alt="" />
          <img src={share} alt="" />
        </div>

        {isOnProfilePage && (
          <MdDelete
            className="DeleteIcon"
            onClick={() => handleDelete(data._id)}
          />
        )}
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>

      <div className="Details">
        <span>
          <b>{postUser?.firstname}</b>
        </span>
        <span>{data.desc}</span>
      </div>
    </div>
  );
};

export default Post;
