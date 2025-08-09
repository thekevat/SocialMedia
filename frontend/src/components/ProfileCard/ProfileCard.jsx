import React, { useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import "./ProfileCard.css";
import { getUser } from "../../Api/UserRequest";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";

const ProfileCard = ({ location }) => {
  const socket = useContext(SocketContext);
  const { user } = useSelector((state) => state.authReducer.authData);
  const { posts } = useSelector((state) => state.timelineReducer);
  const params = useParams();
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState(user);
 
  const dispatch = useDispatch();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
  const fetchProfileUser = async () => {
    if (profileUserId === user._id || !profileUserId) {
      setProfileUser(user);
    } else {
      try {
        const { data } = await getUser(profileUserId); // ✅ no need to use UserApi.getUser if already imported as getUser
        setProfileUser(data);
      } catch (error) {
        console.error("Failed to fetch profile user", error);
      }
    }
  };

  fetchProfileUser(); // ✅ call it outside the function
}, [profileUserId, user]);

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={profileUser.coverpicture || serverPublic + "defaultcover.jpg"}
          alt="cover-pic"
        />
        <img
          src={profileUser.profilepicture || serverPublic + "profiledef.png"}
          alt="profile-pic"
        />
      </div>
      <div className="ProfileName">
        <span>
          {profileUser.firstname} {profileUser.lastname}
        </span>
        <span>{user.worksAt ? user.worksAt : "Write about yourself"}</span>
      </div>
      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{profileUser.follower.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{profileUser.following.length}</span>
            <span>Following</span>
          </div>
          {location === "profilepage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {posts.filter((post) => post.userId === profileUser._id).length}
                </span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === "profilepage" ? (
        ""
      ) : (
        <span style={{color:"#1E3A8A"}}>
          <Link
            style={{ textDecortion: "none", color: "inherit" }}
            to={`/profile/${user._id}`}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
