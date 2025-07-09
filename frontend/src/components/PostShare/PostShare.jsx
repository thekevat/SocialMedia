import React, { useState, useRef, useContext } from "react";
import "./PostShare.css";

import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../actions/uploadAction";
import { uploadPost } from "../../actions/uploadAction";
import { getTimeLinePosts } from "../../actions/postAction";
import { SocketContext } from "../../context/SocketContext";

const PostShare = () => {
  const dispatch=useDispatch();
  const uploading=useSelector((state)=>state.postReducer.uploading);
  const socket=useContext(SocketContext);
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const desc = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);
  const serverPublic=process.env.REACT_APP_PUBLIC_FOLDER
  const reset=()=>{
    setImage(null);
    desc.current.value="";
  }
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
      
    }
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if(image){
      const data=new FormData();
    
      data.append("file",image);
      
      try{
       const res = await dispatch(uploadImage(data));
     
      newPost.image = res.data.imageUrl;
     
      }catch(error){
        console.log(error);
      }
    }
    dispatch(uploadPost(newPost,socket));
    
    reset();
  };
  return (
    <div className="PostShare">
      <img src={user.profilepicture || serverPublic+"profiledef.png"} />
      <div>
        <input
          ref={desc}
          required
          type="text"
          placeholder="What's Happening?"
        />
        <div className="PostOptions">
          <div
            className="Option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className="Option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>
          <div className="Option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="Option" style={{ color: "var(--schedule)" }}>
            <UilSchedule />
            Schedule
          </div>
          <button className="button ps-button" onClick={handleSubmit} disabled={uploading}>
            {uploading?"Uploading...":"Share"}
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="ImagePreview">
            <UilTimes
              style={{ color: "white" }}
              onClick={() => setImage(null)}
            />
            <img src={URL.createObjectURL(image)} />
          </div>
        )}
      </div>
    </div>
  );
};
export default PostShare;
