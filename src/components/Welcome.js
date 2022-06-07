import React from 'react';
import { Link } from "react-router-dom";
import "../style/Welcome.css";

function Welcome() {
  return (
    <Link to = "/"  style={{ textDecoration: 'none' }} >
    <div className="welcome" >
      <p>Welcome to</p>
      <h5>AcrossMe </h5>
    </div>
  </Link>
  )
}

export default Welcome