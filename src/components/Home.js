import React from "react";
import "../style/Home.css";
import Card from "./Card";
import amazon from "../images/icons/amazon2d.avif"
import flipkart from "../images/icons/flipkart2d.avif"
import swiggy from "../images/icons/swiggy.avif"

function Home() {
  return (
    <div className="home">
      <div className="homeCenter">
      {/* <img src={Hero} alt="Hero image" /> */}
        <h3>
          We make your shopping <br /> experience clear and <br /> simple
        </h3>
        <p>Buy, Explore, Compare from all the stores at one place</p>

      <div className="homeCards">
        <div className="box">
          <span></span>
          <div className="content" onClick={() => {
            const anchor = document.querySelector("#shopping")
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })}}>
            <h2>Shopping</h2>
          </div>
        </div>
        <div className="box">
          <span></span>
          <div className="content" onClick={() => {
            const anchor = document.querySelector("#travel")
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })}}>
            <h2>Travel</h2>
          </div>
        </div>
        <div className="box">
          <span></span>
          <div className="content" onClick={() => {
            const anchor = document.querySelector("#pharma")
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })}}>
            <h2>pharmaceutical</h2>
          </div>
        </div>
      </div>
      </div>
      <div className="content1">
        <h3>
          A Shopping platform that invests in you 
        </h3>
        <p>
          We bring your favourite shopping portals right under fingertips 
        </p>
        <button onClick={() => {
            const anchor = document.querySelector("#travel")
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })}}> Get Started</button>
      </div>
      <div className="content2">
        <h3 id="shopping">Shopping</h3>
         <div className="productCards">
           <Card img= {amazon} name="amazon" description="explore amazon"/>
           <Card img= {flipkart} name="flipkart" description="explore flipkart"/>
           <Card img= {swiggy} name="swiggy" description="explore swiggy"/>
         </div>
      </div>
      <div className="content2">
        <h3 id="travel">Travel</h3>
      </div>
      <div className="content2">
        <h3 id="pharma">Pharmaceuticals</h3>
      </div>
    </div>
  );
}

export default Home;
