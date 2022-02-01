import React from "react";
import { Redirect, Route, Switch } from "react-router";
import UserPage from "./userPage";
import EditUserPage from "../ui/editPage";
import UserListPage from "./userListPage";

const UsersRouter = () => {
    return (
        <>
            <Switch>
                <Route path="/users/:id/edit" component={EditUserPage} />
                <Route path="/users/:id" exact component={UserPage} />
                <Route path="/users/" component={UserListPage} />
                <Redirect to="/users/" />
            </Switch>
        </>
    );
};

export default UsersRouter;
