import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { auth } from "./components/firebase";
import { useStateValue } from "./context/StateProvider";
import './App.css';
import Home from "./components/Home";
import Admin from "./components/Admin";
import Header from "./components/Header"
import Welcome from "./components/Welcome"


function App() {

  const [ {}, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, [dispatch]);


  return (
    <Router>
      <div className="app">
        <Routes>
        <Route
            path="/admin"
            element={[ <Header/>, <Admin />]}
          />
          <Route
            path="/"
            exact
            element={[ <Header/>, <Welcome/>, <Home />]}
          />
        </Routes>
      </div>
  </Router>
  );
}

export default App;
