import React from "react";
import Users from "./layouts/users";
import Navbar from "./components/ui/navBar";
import { Route, Switch, Redirect } from "react-router";
import Main from "./layouts/main";
import Login from "./layouts/login";
import EditUserPage from "./components/ui/editPage";

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/users/:userId/edit" component={EditUserPage} />
        <Route path="/users/:userId?" component={Users} />
        <Route path="/login:type?" component={Login} />
        <Route exact path="/" component={Main} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default App;
