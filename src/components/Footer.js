import React from "react";
import "../style/Footer.css";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";
import Basket from "./Basket";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

function Footer() {
  return (
    <footer>
       <div className="content">
     <div className="left box">
       <div className="upper">
         <div className="topic">About us</div>
         <p> Unique Handlooms brings handpicked products in categories like clothing, home decor and home comfort.</p>
       </div>
       <div className="lower">
         <div className="topic">Contact us</div>
         <div className="phone">
           <p><i class="fas fa-phone-volume"></i>+91-8527708082</p>
         </div>
         <div className="email">
           <p><i class="fas fa-envelope"></i>uniquehandlooms.ghaziabad@gmail.com</p>
         </div>
       </div>
     </div>
     <div className="middle box">
       <div className="topic">Our Products</div>
       <div><p>Bedsheets and Dohars</p></div>
       <div><p>Latest Indian Clothing</p></div>
       <div><p>Comfort and cushioning</p></div>
       <div><p>Floormats and Carpets</p></div>
       <div><p>Towels and Bathing accessories</p></div>
     </div>
     <div className="right box">
       <div className="topic">Inquire us</div>
       <form action="#" >
         <input type="text" placeholder="Enter your query" />
         <button>Send</button>
         <div className="media-icons">
           <a><i class="fab fa-facebook-f"></i></a>
           <a><i class="fab fa-instagram"></i></a>
           <a><i class="fab fa-twitter"></i></a>
           <a><i class="fab fa-youtube"></i></a>
           <a><i class="fab fa-linkedin-in"></i></a>
         </div>
       </form>
     </div>
   </div>
   <div className="bottom">
     <p>Copyright © 2022 <a>Unique Handlooms</a></p>
   </div>
      {/* mobile */}
      <div className="footer">
        <Link to="/" className="footerItems ">
          <HomeRoundedIcon />
        </Link>
        <Link to="/allproducts" className="footerItems ">
          <CategoryRoundedIcon />
        </Link>
        <Link to="/account" className="footerItems ">
          <AccountCircleRoundedIcon />
        </Link>
        <Link to="/checkout" className="footerItems ">
          <Basket />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
