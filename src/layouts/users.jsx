import React from "react";
import UserList from "../components/userList";
import UserPage from "../components/userPage";
import { useParams } from "react-router-dom";

const Users = () => {
  const params = useParams();
  const { userId } = params;
  return <>{userId ? <UserPage userId={userId} /> : <UserList />}</>;
};

export default Users;
