import React, { useContext } from 'react';
import './App.css';
import NavBar from './components/navBar/navBar';
import { BrowserRouter as Router } from "react-router-dom"
import { LOGIN_PATH, HOME_PATH, USER_PATH } from './views';
import { Switch, Route } from "react-router-dom";
import HomePage from "./components/homePage/homePage";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import { UserContext } from './contexts/UserContext';

function App() {

    const { user } = useContext(UserContext)

  return (
    <Router>
        <NavBar />
        <Switch>
            <Route path={LOGIN_PATH} exact={true}>
                <Login />                
            </Route>

            <Route path={HOME_PATH} exact={true}>
                <HomePage />
            </Route>

            <Route path={USER_PATH} exact={true}>
                <Profile />
            </Route>
        </Switch>
    </Router>
  )
};

export default App;
