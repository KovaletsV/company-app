import React from "react";
import UserListPage from "../components/page/userListPage";
import UserPage from "../components/page/userPage";
import { useParams } from "react-router-dom";

const Users = () => {
    const params = useParams();
    const { userId } = params;
    return <>{userId ? <UserPage userId={userId} /> : <UserListPage />}</>;
};

export default Users;
