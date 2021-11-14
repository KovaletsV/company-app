import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import EditPage from "../../ui/editPage";
import API from "../../../API";

const EditUserPage = () => {
    const [user, setUser] = useState();
    const params = useParams();
    const { userId } = params;

    useEffect(() => {
        API.users.getById(userId).then(data => setUser(data));
        console.log(user);
    }, []);
    return <div className="container mt-5"></div>;
};

export default EditUserPage;
