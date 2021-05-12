import React from 'react';
import './App.css';
import Login from './components/Login/Login';
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <>
          <div className="body">
            
          </div>
        </>
      )}
    </div>
  );
}

export default App;