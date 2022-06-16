import React from 'react'
import "../style/TopDeals.css"
import shoppingcart from "../images/shoppingcart.svg"
import milton from "../images/milton.avif"


function TopDeals() {
  return (<div className='topDeals'>
    <div className="card">
    <div className="card-img">
       <img src={milton} alt="milton water bottle" /> 
    </div>
    <div className="card-info">
      <p className="text-title"> Designer bottle </p>
      <p className="text-body">flat 60% discount on milton metal bottle</p>
    </div>
  </div>
   <div className="card-footer">
   <span className="text-title text-price">₹690</span>
   <div className="card-button">
    <img src={shoppingcart} alt='grab the deal icon' />
   </div>
 </div>
 </div>  )
}

export default TopDeals