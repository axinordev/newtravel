import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import "./Footer.css";
import logo from "../assets/images/white_log.png";
import facebookIcon from "../assets/icons/facebook.png";
import instagramIcon from "../assets/icons/instagram.png";

const Footer = () => {
  const [contactInfo, setContactInfo] = useState({});
  const navigate = useNavigate(); // ✅ Initialize navigation function

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch(
          "https://admin.newalliedtour.net/api/admin_contact_section/"
        );
        const data = await response.json();
        setContactInfo(data || {});
      } catch (error) {
        console.error("Error fetching contact info:", error);
        setContactInfo({});
      }
    };
    fetchContactInfo();
  }, []);

  const closeMenu = () => {
    // Optional — if you have a mobile menu
  };

  return (
    <footer id="footer" className="footer-section">
      <div className="footer-top">
        {/* Logo */}
        <div className="footer-logo">
          <img src={logo} alt="Company Logo" />
        </div>

        {/* Links */}
        <div className="footer-links">
          <a href="#About">About</a>
          <a href="#destination">Destinations</a>
          <a href="#services">Services</a>
          <a href="#plan">Plan Your Trip</a>
          <a href="#testimonials">Testimonials</a>
          {/* ✅ Updated Gallery link */}
          <a
            href="/gallery"
            onClick={(e) => {
              e.preventDefault();
              closeMenu();          // if you have a mobile menu
              navigate("/gallery"); // route to gallery page
              setTimeout(() => {
                const gallerySection = document.getElementById("gallery");
                if (gallerySection) {
                  gallerySection.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }, 50); // wait 50ms for component to mount
            }}
          >
            Gallery
          </a>

          <a href="#contact">Contact</a>
        </div>

        {/* Social Icons */}
        <div className="footer-social">
          {contactInfo.facebook_link && (
            <a
              href={contactInfo.facebook_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebookIcon} alt="Facebook" className="social-icon" />
            </a>
          )}
          {contactInfo.instagram_link && (
            <a
              href={contactInfo.instagram_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instagramIcon} alt="Instagram" className="social-icon" />
            </a>
          )}
        </div>
      </div>

      <hr className="footer-line" />

      <div className="footer-bottom">
        <p>Copyright ©2025. New Allied Tours & Travels. All rights reserved.</p>
      </div>

      <div className="footer-bottom">
        <p>Designed and developed by Axinor Technologies</p>
        <h3>AXINOR PVT.LTD</h3>
        <h4 className="cont">Kozhikode, Kerala, India</h4>
        <h3>Contact Us</h3>
        <h4 className="cont">axinortech.com</h4>
        <h4 className="cont">+91 9746577467 / +91 9446186026</h4>
      </div>
    </footer>
  );
};

export default Footer;
