import React from "react";
import "./Footer.css";
import logo from "../assets/images/white_log.png";       // your logo
import facebookIcon from "../assets/icons/facebook.png"; // your facebook icon
import instagramIcon from "../assets/icons/instagram.png"; // your instagram icon

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-top">
        {/* Logo */}
        <div className="footer-logo">
          <img src={logo} alt="Company Logo" />
        </div>

        {/* Links */}
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#destination">Destinations</a>
          <a href="#services">Services</a>
          <a href="#plan">Plan Your Trip</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        </div>

        {/* Social Icons */}
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={facebookIcon} alt="Facebook" className="social-icon" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram" className="social-icon" />
          </a>
        </div>
      </div>

      <hr className="footer-line" />

      <div className="footer-bottom">
        <p>Copyright ©2025. New Allied Tours & Travels. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
