import React from "react";
import Login from "./Login/Login"
import NavBar from "./navBar/navBar";
import { Switch, Route } from "react-router-dom";
import { HOME_PATH, USER_PATH } from "../views";
import { useStateValue } from '../StateProvider';


function MainContainer() {
    const [{ user }, dispatch] = useStateValue();

    return (
        <div className="app">
            <NavBar />
            <Switch>
                <Route path={HOME_PATH} exact={true}>
                    {!user ? (
                        <Login />
                    ) : (
                        <>
                            <div className="body">
                            </div>
                        </>
                    )}
                </Route>
            </Switch>
        </div>
    );
}

export default MainContainer;