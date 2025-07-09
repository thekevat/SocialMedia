import React,{useState} from "react";
import "./RightSide.css";
import Home from "../../img/home.png";
import Comment from "../../img/comment.png";
import Noti from "../../img/noti.png";
import {UilSetting} from "@iconscout/react-unicons";
import TrendCard from "../../components/TrendCard/TrendCard"
import ShareModal from "../ShareModal/ShareModal";
import {Link} from "react-router-dom"
import Building from "../../img/building.png"

const RightSide = () =>{
      const [modalOpened,setModalOpened]=useState(false);
    return(
        <div className="RightSide">
             <div className="Navicons">
                <Link to={"../home"}><img src={Building} style={{height:"30px", width:"auto"}}/></Link>
                <UilSetting/>
                <img src={Noti}/>
              <Link to={"../chat"}><img src={Comment}/></Link>
              </div>
              <TrendCard/>
              <button class="button r-button" onClick={()=>setModalOpened(true)}>Share</button>
              <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened}/>
        </div>
       
    );
}

export default RightSide;