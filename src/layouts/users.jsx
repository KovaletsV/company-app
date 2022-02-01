import React from "react";
import UserListPage from "../components/page/userListPage";
import UserPage from "../components/page/userPage";
import { useParams } from "react-router-dom";
import UserProvider from "../hooks/useUsers";

const Users = () => {
    const params = useParams();
    const { userId } = params;
    return (
        <UserProvider>
            {userId ? <UserPage userId={userId} /> : <UserListPage />}
        </UserProvider>
    );
};

export default Users;
