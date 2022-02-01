import React from "react";
import Users from "./layouts/users";
import Navbar from "./components/ui/navBar";
import { Route, Switch, Redirect } from "react-router";
import Main from "./layouts/main";
import Login from "./layouts/login";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQuality";
import { ToastContainer } from "react-toastify";

const App = () => {
    return (
        <>
            <Navbar />
            <Switch>
                <ProfessionProvider>
                    <QualitiesProvider>
                        <Route path="/users/:id?" component={Users} />
                        <Route path="/login/:type?" component={Login} />
                    </QualitiesProvider>
                </ProfessionProvider>
                <Route path="/" exact component={Main} />
                <Redirect to="/" />
            </Switch>
            <ToastContainer />
        </>
    );
};

export default App;
