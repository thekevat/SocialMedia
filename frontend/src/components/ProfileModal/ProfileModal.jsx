import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../actions/userAction";
import { uploadImage } from "../../actions/uploadAction";
import { SocketContext } from "../../context/SocketContext";

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const socket=useContext(SocketContext);
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const params = useParams();
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      e.target.name === "profilepicture"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let userData = formData;

    try {
      if (profileImage) {
        const data = new FormData();
        data.append("file", profileImage);
        const res = await dispatch(uploadImage(data));
        userData.profilepicture = res.data.imageUrl; // Correct Cloudinary URL
        socket.current.emit("profile-updated", {
          userId: user._id,
          profilepicture: res.data.imageUrl,
        });
      }

      if (coverImage) {
        const data = new FormData();
        data.append("file", coverImage);
        const res = await dispatch(uploadImage(data));
        userData.coverpicture = res.data.imageUrl;
      }

      dispatch(updateUser(params.id, userData));
      setModalOpened(false); // Close modal on success
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        size="60%"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <form className="InfoForm">
          <h3>Your info</h3>
          <div>
            <input
              className="infoInput"
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              value={formData.firstname}
            />
            <input
              className="infoInput"
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              value={formData.lastname}
            />
          </div>
          <div>
            <input
              className="infoInput"
              type="text"
              name="worksAt"
              placeholder="Works At"
              onChange={handleChange}
              value={formData.worksAt}
            />
          </div>
          <div>
            <input
              className="infoInput"
              type="text"
              name="livesin"
              placeholder="Lives In"
              onChange={handleChange}
              value={formData.livesin}
            />
            <input
              className="infoInput"
              type="text"
              name="country"
              placeholder="Country"
              onChange={handleChange}
              value={formData.country}
            />
          </div>
          <div>
            <input
              className="infoInput"
              type="text"
              name="Relationship"
              placeholder="Relationship Status"
              onChange={handleChange}
              value={formData.Relationship}
            />
          </div>
          <div>
            Profile image
            <input type="file" name="profilepicture" onChange={onImageChange} />
            Cover image
            <input type="file" name="coverpicture" onChange={onImageChange} />
          </div>
          <button className="button info-button" onClick={handleSubmit}>
            Update
          </button>
        </form>
      </Modal>
    </>
  );
}
export default ProfileModal;
