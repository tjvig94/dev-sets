import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import './Login.css';
import { auth, provider } from '../../firebase';
import { UserContext } from '../../contexts/UserContext';


function Login() {

  const { user, login, logout } = useContext(UserContext);

  const signIn = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        login(result.user)
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__logo">

        <img
          src="./images/dev.png"
          alt="dev-logo"
        />

      </div>
      {(user == null) ? (
      <Button type="submit" onClick={signIn}>
        Sign In
      </Button>
        ) : (
          <Button type="button" onClick={logout}>Logout</Button>
        )}
    </div>
  );
}

export default Login;