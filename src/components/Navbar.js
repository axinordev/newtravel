import React, { useState, useEffect } from 'react';
import './Navbar.css';
import main_logo from '../assets/images/main_logo.png';
import facebookIcon from "../assets/icons/facebook.png";
import instagramIcon from "../assets/icons/instagram.png";
import { FaFacebookF, FaInstagram } from "react-icons/fa"; 
import { useNavigate } from 'react-router';
import axios from "axios";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactData, setContactData] = useState(null);

  const navigate = useNavigate()
  const handleMenuToggle = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    axios
      .get("https://admin.newalliedtour.net/api/admin_contact_section/")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setContactData(response.data[0]);
        } else {
          setContactData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching contact data:", error);
      });
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            {contactData ? (
              <>
                <span>
                  PHONE: +91 {contactData.phone} / +91 {contactData.whatsapp_contact} &nbsp;
                </span>
                <span>&nbsp;| &nbsp;&nbsp;EMAIL: {contactData.email}</span>
                <span>&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
                <span>
                  <div className="nav-social">
                    {contactData.facebook_link && (
                      <a
                        href={contactData.facebook_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={facebookIcon}
                          alt="Facebook"
                          className="social-icon"
                          width={8}
                        />
                      </a>
                    )}
                    {contactData.instagram_link && (
                      <a
                        href={contactData.instagram_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={instagramIcon}
                          alt="Instagram"
                          className="social-icon"
                          width={16}
                        />
                      </a>
                    )}
                  </div>
                </span>
              </>
            ) : (
              <span>Loading contact info...</span>
            )}
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="container navbar-inner">
          <div className="navbar-logo">
            <a href="/">
              <img src={main_logo} alt="Logo" />
            </a>
          </div>

          <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
            <ul>
              <li><a href="#About" onClick={closeMenu}>About</a></li>
              <li><a href="#destination" onClick={closeMenu}>Destinations</a></li>
              <li><a href="#services" onClick={closeMenu}>Services</a></li>
              <li><a href="#plan" onClick={closeMenu}>Plan Your Trip</a></li>
              <li><a href="#testimonials" onClick={closeMenu}>Testimonials</a></li>
              <li><a href="#gallery" onClick={() => navigate("/gallery")}>Gallery</a></li>
              <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
            </ul>

            {/* ✅ Logo at the bottom */}
            <div className="mobile-bottom-logo">
              <img src={main_logo} alt="Logo" />
            </div>

            <div className="mobile-social">
              {contactData?.facebook_link && (
                <a href={contactData.facebook_link} target="_blank" rel="noopener noreferrer">
                  <FaFacebookF />
                </a>
              )}
              {contactData?.instagram_link && (
                <a href={contactData.instagram_link} target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
              )}
            </div>
          </div>

          {/* Hamburger */}
          <div className={`navbar-hamburger ${menuOpen ? 'open' : ''}`} onClick={handleMenuToggle}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
