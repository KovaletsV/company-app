import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import API from "../../../API";
import { validator } from "../../../utils/validator";

const UserCommentsForm = ({ userId, allUsers, setCommentUser }) => {
    const [data, setData] = useState();
    const [textMessage, setTextMessage] = useState("");
    const [errors, setErrors] = useState({});

    const handleChangeUser = ({ target }) => {
        setData(prevState => ({
            ...prevState,
            pageId: userId,
            userId: target.value,
        }));
    };

    const validatorConfig = {
        textMessage: {
            isRequired: {
                message: "Please write a comment",
            },
        },
    };
    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = e => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newDate = { ...data, content: textMessage };
        setData();
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
                                    name="userId"
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
                                    error={errors.textMessage}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary mx-auto mt-2"
                            >
                                Send
                            </button>
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
