import React from "react";
import "../style/Card.css";


function Card({img, name, description, link,gradient}) {
  return(
  <div>
    <div className="productCard">
      <div className="productCard-img" style={{ "background": `${gradient}` }}><img src={img} alt=""  /></div>
      <div className="productCard-info">
        <div className="productCard-text">
          <p className="text-title">{name}</p>
          <p className="text-subtitle">{description}</p>
        </div>
        <div className="productCard-icon">
          <svg viewBox="0 0 28 25">
            <path d="M13.145 2.13l1.94-1.867 12.178 12-12.178 12-1.94-1.867 8.931-8.8H.737V10.93h21.339z"></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Card;
