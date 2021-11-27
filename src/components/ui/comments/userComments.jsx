import React from "react";
import PropTypes from "prop-types";
import API from "../../../API";
import { getDate } from "../../../utils/date";

const UserComments = ({ userId, allUsers, commentUser, setCommentUser }) => {
    const removeComment = id => {
        API.comments.remove(id);
        API.comments
            .fetchCommentsForUser(userId)
            .then(data => setCommentUser(data));
    };
    const getUserName = id => {
        if (allUsers) {
            const userName = allUsers.filter(userName => userName._id === id);
            return userName[0].name;
        }
    };
    const sortedData = commentUser.sort((a, b) => b.created_at - a.created_at);
    return (
        <div className="card mb-3">
            <div className="card-body ">
                <h2>Comments</h2>
                <hr />
                {sortedData &&
                    sortedData.map(comment => {
                        return (
                            <div
                                className="bg-light card-body  mb-3"
                                key={comment._id}
                            >
                                <div className="row">
                                    <div className="col">
                                        <div className="d-flex flex-start ">
                                            <img
                                                src={`https://avatars.dicebear.com/api/avataaars/${(
                                                    Math.random() + 1
                                                )
                                                    .toString(36)
                                                    .substring(7)}.svg`}
                                                className="rounded-circle shadow-1-strong me-3"
                                                alt="avatar"
                                                width="65"
                                                height="65"
                                            />
                                            <div className="flex-grow-1 flex-shrink-1">
                                                <div className="mb-4">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="mb-1 ">
                                                            {`${getUserName(
                                                                comment.userId,
                                                            )}`}
                                                            <span className="small">
                                                                ~
                                                                {getDate(
                                                                    comment.created_at,
                                                                )}
                                                            </span>
                                                        </p>
                                                        <button
                                                            className="btn btn-sm text-primary d-flex align-items-center"
                                                            onClick={() =>
                                                                removeComment(
                                                                    comment._id,
                                                                )
                                                            }
                                                        >
                                                            <i className="bi bi-x-lg"></i>
                                                        </button>
                                                    </div>
                                                    <p className="small mb-0">
                                                        {comment.content}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

UserComments.propTypes = {
    userId: PropTypes.string,
    commentUser: PropTypes.array,
    setCommentUser: PropTypes.func,
    allUsers: PropTypes.array,
};

export default UserComments;
