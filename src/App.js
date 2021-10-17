import React from "react";
import Users from "./components/users";
import Navbar from "./components/navBar";
import { Route, Switch } from "react-router";
import Main from "./components/main";
import Login from "./components/login";
import UserPage from "./components/userPage";

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route
          path="/users/:userId"
          render={(props) => <UserPage {...props} />}
        />
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users" component={Users} />
      </Switch>
    </>
  );
};

export default App;
