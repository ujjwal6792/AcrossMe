import React from "react";
import "../style/Home.css";
import Card from "./Card";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import firebase from "./firebase";

// import amazon from "../images/icons/amazon2d.avif"
// import flipkart from "../images/icons/flipkart2d.avif"
// import swiggy from "../images/icons/swiggy.avif"

function Home() {
  const [website, setWebsite] = useState([]);
  const websiteRef = firebase.firestore().collection("websites");

  useEffect(() => {
    websiteRef.get().then((collections) => {
      setWebsite(
        collections.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  }, []);
  return (
    <div className="home">
      <div className="homeCenter">
        <h3>
          We make your shopping <br /> experience clear and <br /> simple
        </h3>
        <p>Buy, Explore, Compare from all the stores at one place</p>
      </div>
      <div className="homeCards">
          <div className="homeCardsBox">
            <div className="box">
              <span></span>
              <div
                className="content"
                onClick={() => {
                  const anchor = document.querySelector("#shopping");
                  anchor.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
              >
                <h2>Shopping</h2>
              </div>
            </div>
          </div>

          <div className="homeCardsBox">
            <div className="box">
              <span></span>
              <div
                className="content"
                onClick={() => {
                  const anchor = document.querySelector("#travel");
                  anchor.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
              >
                <h2>Travel</h2>
              </div>
            </div>
          </div>
        
          <div className="homeCardsBox">
            <div className="box">
              <span></span>
              <div
                className="content"
                onClick={() => {
                  const anchor = document.querySelector("#pharma");
                  anchor.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
              >
                <h2>pharmaceutical</h2>
              </div>
            </div>
          </div>
        </div>


      <div className="content1">
        <h3>A Shopping platform that invests in you</h3>
        <p>We bring your favourite shopping portals right under fingertips</p>
        <button
          onClick={() => {
            const anchor = document.querySelector("#travel");
            anchor.scrollIntoView({ behavior: "smooth", block: "center" });
          }}
        >
          {" "}
          Get Started
        </button>
      </div>
      <div className="content2">
        <h3 id="shopping">Shopping</h3>
        <div className="productCards">
          {website.map((item) => (
            <Card
            key={item.id}
              img={item.img}
              name={item.name}
              description= { item.description}
              link={item.link}
              gradient={item.gradient}
            />
          ))}
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
