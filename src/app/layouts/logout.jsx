import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const Logout = () => {
    const { logout } = useAuth();
    useEffect(() => {
        logout();
    }, []);
    return (
        <div>
            <h1>log</h1>
        </div>
    );
};

export default Logout;
