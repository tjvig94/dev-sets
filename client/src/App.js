import React from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom"
import MainContainer from "./components/mainContainer"

function App() {

  return (
    <Router>
      <MainContainer />
    </Router>
  )
}

export default App;