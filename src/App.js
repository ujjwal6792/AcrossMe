import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import Header from "./components/Header"

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            exact
            element={[ <Header/>, <Home />]}
          />
        </Routes>
      </div>
  </Router>
  );
}

export default App;
