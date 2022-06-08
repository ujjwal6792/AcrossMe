import React from "react";
import "../style/Home.css";
import "../style/HomeMobile.css";
import Card from "./Card";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import firebase from "./firebase";
import Header from "./Header";

// import amazon from "../images/icons/amazon2d.avif"
// import flipkart from "../images/icons/flipkart2d.avif"
// import swiggy from "../images/icons/swiggy.avif"

function Home() {
  const [shopping, setShopping] = useState([]);
  const [grocery, setGrocery] = useState([]);
  const [travel, setTravel] = useState([]);
  const [pharma, setPharma] = useState([]);
  const shoppingRef = firebase.firestore().collection("Shopping");
  const groceryRef = firebase.firestore().collection("grocery");
  const travelRef = firebase.firestore().collection("travel");
  const pharmaRef = firebase.firestore().collection("pharma");

  useEffect(() => {
    shoppingRef.get().then((collections) => {
      setShopping(
        collections.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
    groceryRef.get().then((collections) => {
      setGrocery(
        collections.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      travelRef.get().then((collections) => {
        setTravel(
          collections.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
      pharmaRef.get().then((collections) => {
        setPharma(
          collections.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
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
              <h2>Pharmacy</h2>
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
          {shopping.map((item) => (
            <Card
              key={item.id}
              img={item.img}
              name={item.name}
              description={item.description}
              link={item.link}
              gradient={item.gradient}
            />
          ))}
        </div>
      </div>
      <div className="content2">
        <h3 id="grocery">Grocery</h3>
        <div className="productCards">
          {grocery.map((item) => (
            <Card
              key={item.id}
              img={item.img}
              name={item.name}
              description={item.description}
              link={item.link}
              gradient={item.gradient}
            />
          ))}
        </div>
      </div>
      <div className="content2">
        <h3 id="travel">Travel</h3>
        <div className="productCards">
          {travel.map((item) => (
            <Card
              key={item.id}
              img={item.img}
              name={item.name}
              description={item.description}
              link={item.link}
              gradient={item.gradient}
            />
          ))}
        </div>
      </div>
      <div className="content2">
        <h3 id="pharma">Pharmaceuticals</h3>
        <div className="productCards">
          {pharma.map((item) => (
            <Card
              key={item.id}
              img={item.img}
              name={item.name}
              description={item.description}
              link={item.link}
              gradient={item.gradient}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
