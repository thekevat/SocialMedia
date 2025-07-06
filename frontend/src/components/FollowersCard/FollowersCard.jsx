import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import { Followers } from "../../Data/FollowersData";
import User from "../users/User";
import { useSelector } from "react-redux";
import { getAllUsers } from "../../Api/UserRequest";

const FollowersCard = ({searchQuery=""}) => {
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);
  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUsers();
      setPersons(data);
     
    };
    fetchPersons();
  }, []);


  const filteredPersons = persons.filter((person) =>
    person.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="FollowersCard">
      <h3>People you may know</h3>
      {filteredPersons.map((person, id) => {
        if (person._id !== user._id) {
          return <User  key={person._id} person={person} id={id} />;
        }
      })}
    </div>
  );
};
export default FollowersCard;
