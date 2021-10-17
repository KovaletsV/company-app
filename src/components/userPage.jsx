import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import API from "../API";
import { useHistory, useParams } from "react-router-dom";

const UserPage = () => {
  const history = useHistory();
  const [user, setUser] = useState();
  const params = useParams();
  const { userId } = params;
  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data));
  }, []);
  const handleAllUsers = () => {
    history.replace("/users");
  };
  if (user) {
    return (
      <>
        <h3>{user._id}</h3>
        <h3>{user.name}</h3>
        <h3>{user.profession.name}</h3>
        {user.qualities.map((qual) => (
          <Quality key={qual._id} {...qual} />
        ))}
        <h3>{user.completedMeetings}</h3>
        <h3>{user.rate}</h3>

        <button
          onClick={() => {
            handleAllUsers();
          }}
        >
          Все пользователи
        </button>
      </>
    );
  }
  return "Loading";
};

UserPage.propTypes = {
  userId: PropTypes.string,
};

export default UserPage;
