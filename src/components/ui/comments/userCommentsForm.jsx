import { React, useState } from "react";
import PropTypes from "prop-types";
import API from "../../../API";

const UserCommentsForm = ({ userId, allUsers, setCommentUser }) => {
    const [data, setData] = useState({ name: "" });
    const [textMessage, setTextMessage] = useState("");
    const handleChangeUser = ({ target }) => {
        setData(prevState => ({
            ...prevState,
            pageId: userId,
            userId: target.value,
        }));
    };
    const handleSubmit = e => {
        e.preventDefault();
        const newDate = { ...data, content: textMessage };
        setTextMessage("");
        API.comments.add(newDate);
        API.comments
            .fetchCommentsForUser(userId)
            .then(data => setCommentUser(data));
    };
    const handleChange = ({ target }) => {
        setTextMessage(target.value);
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="card mb-2">
                    <div className="card-body">
                        <div>
                            <h2>New comment</h2>
                            <div className="mb-4">
                                <select
                                    className="form-select"
                                    name="userName"
                                    value={data._id}
                                    onChange={handleChangeUser}
                                >
                                    <option>Choose your user</option>
                                    {allUsers &&
                                        allUsers.map(user => (
                                            <option
                                                key={user._id}
                                                value={user._id}
                                            >
                                                {user.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="exampleFormControlTextarea1"
                                    className="form-label"
                                >
                                    Сообщение
                                </label>
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    value={textMessage}
                                    onChange={handleChange}
                                ></textarea>
                                <button
                                    type="submit"
                                    className="btn btn-primary mx-auto mt-2"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

UserCommentsForm.propTypes = {
    userId: PropTypes.string,
    allUsers: PropTypes.array,
    setCommentUser: PropTypes.func,
};

export default UserCommentsForm;
