import React from "react";
import Users from "./layouts/users";
import Navbar from "./components/ui/navBar";
import { Route, Switch, Redirect } from "react-router";
import Main from "./layouts/main";
import Login from "./layouts/login";
import EditUserPage from "./components/ui/editPage";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQualities";
import { ToastContainer } from "react-toastify";

const App = () => {
    return (
        <>
            <Navbar />
            <Switch>
                <ProfessionProvider>
                    <QualitiesProvider>
                        <Route
                            path="/users/:userId/edit"
                            component={EditUserPage}
                        />
                        <Route path="/users/:userId?" component={Users} />
                        <Route path="/login:type?" component={Login} />
                        <Route exact path="/" component={Main} />
                        <Redirect to="/" />
                    </QualitiesProvider>
                </ProfessionProvider>
            </Switch>
            <ToastContainer />
        </>
    );
};

export default App;
