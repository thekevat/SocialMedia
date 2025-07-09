import React, { useContext, useEffect, useState } from "react";
import "./FollowersCard.css";

import User from "../users/User";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Api/UserRequest";
import { getTimeLinePosts } from "../../actions/postAction";
import { SocketContext } from "../../context/SocketContext";
import { getToken } from "../../utils/auth";

const FollowersCard = ({ searchQuery = "" }) => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  const handleTokenExpiry = () => {
  alert("Session expired. Please log in again.");
  localStorage.clear();
  window.location.href = "/auth";
};


  const fetchPersons = async () => {
    const token = getToken();
    try {
      const { data } = await getAllUsers(token);
      setPersons(data);
    } catch (error) {
      if (error.response?.status === 401) {
        handleTokenExpiry();
      } else {
        console.error("alluser error:", error);
      }
    }
  };
  useEffect(() => {
    fetchPersons();
  }, []);

  useEffect(() => {
    if (!socket.current) return;

    const handleNewUser = () => {
      fetchPersons(); // refetch users on new user sign up
    };

    socket.current.on("update-userlist", handleNewUser);

    return () => {
      socket.current.off("update-userlist", handleNewUser);
    };
  }, [socket]);

  const filteredPersons = persons.filter((person) =>
    person.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleFollowChange = () => {
    dispatch(getTimeLinePosts(user._id));
  };
  return (
    <div className="FollowersCard">
      <h3>People you may know</h3>
      {filteredPersons.map((person, id) => {
        if (person._id !== user._id) {
          return (
            <User
              key={person._id}
              person={person}
              id={id}
              onFollowChange={handleFollowChange}
            />
          );
        }
      })}
    </div>
  );
};
export default FollowersCard;
