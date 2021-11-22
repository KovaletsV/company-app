import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import API from "../../../API";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import UserComments from "../../ui/comments/userComments";
import UserCommentsForm from "../../ui/comments/userCommentsForm.jsx";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    const [allUsers, setAllUsers] = useState();
    const [commentUser, setCommentUser] = useState();
    useEffect(() => {
        API.users.getById(userId).then(data => setUser(data));
        API.users.fetchAll().then(data => setAllUsers(data));
    }, []);
    useEffect(() => {
        API.comments
            .fetchCommentsForUser(userId)
            .then(data => setCommentUser(data));
    }, []);
    if (user) {
        return (
            <>
                <div className="container">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <UserCard user={user} />
                            <QualitiesCard data={user.qualities} />
                            <MeetingsCard user={user} />
                        </div>

                        <div className="col-md-8">
                            <UserCommentsForm
                                userId={userId}
                                allUsers={allUsers}
                                setCommentUser={setCommentUser}
                            />
                            <UserComments
                                userId={userId}
                                allUsers={allUsers}
                                commentUser={commentUser}
                                setCommentUser={setCommentUser}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return "Loading...";
};

UserPage.propTypes = {
    userId: PropTypes.string,
};

export default UserPage;
