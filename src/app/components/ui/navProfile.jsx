import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const NavProfile = () => {
    const { currentUser } = useAuth();
    const [isOpen, setOpen] = useState(false);

    const toogleMenu = () => {
        setOpen((prevState) => !prevState);
    };
    return (
        <div className="dropdown" onClick={toogleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{currentUser.name}</div>
                <img
                    src={`https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                    )
                        .toString(36)
                        .substring(7)}.svg`}
                    alt=""
                    height="40"
                    className="img-responsive rounded-circle"
                />
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? "show" : "")}>
                <Link to={`users/${currentUser._id}`}>Profile</Link>
                <Link to="logout" className="dropdown-item">
                    LogOut
                </Link>
            </div>
        </div>
    );
};

export default NavProfile;
