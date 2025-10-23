import React, { useState, useEffect } from "react";
import "./Navbar.css";
import main_logo from "../assets/images/main_logo.png";
import facebookIcon from "../assets/icons/facebook.png";
import instagramIcon from "../assets/icons/instagram.png";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactData, setContactData] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuToggle = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  // ✅ Scroll or navigate to section logic
  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    closeMenu();

    if (location.pathname === "/") {
      // Already on home — just scroll
      const section = document.querySelector(sectionId);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to home and trigger scroll there
      navigate(`/${sectionId}`);
    }
  };

  // ✅ Fetch contact data from backend
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

  // ✅ Change background on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            {contactData ? (
              <>
                <span>
                  PHONE: +91 {contactData.phone} / +91{" "}
                  {contactData.whatsapp_contact} &nbsp;
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
          {/* Logo */}
          <div className="navbar-logo">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                closeMenu();
                navigate("/");
              }}
            >
              <img src={main_logo} alt="Logo" />
            </a>
          </div>

          {/* Nav Links */}
          <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
            <ul>
              <li>
                {location.pathname === "/" ? (
                  // ✅ On home — show "About"
                  <a
                    href="#About"
                    onClick={(e) => handleSectionClick(e, "#About")}
                  >
                    About
                  </a>
                ) : (
                  // ✅ On other pages — show "Home"
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      closeMenu();
                      navigate("/");
                    }}
                  >
                    Home
                  </a>
                )}
              </li>

              <li>
                <a
                  href="#destination"
                  onClick={(e) => handleSectionClick(e, "#destination")}
                >
                  Destinations
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleSectionClick(e, "#services")}
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#plan"
                  onClick={(e) => handleSectionClick(e, "#plan")}
                >
                  Plan Your Trip
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  onClick={(e) => handleSectionClick(e, "#testimonials")}
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="/gallery"
                  onClick={(e) => {
                    e.preventDefault();
                    closeMenu();
                    navigate("/gallery");
                  }}
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#footer"
                  onClick={(e) => handleSectionClick(e, "#footer")}
                >
                  Contact
                </a>
              </li>
            </ul>

            {/* Mobile bottom logo */}
            <div className="mobile-bottom-logo">
              <img src={main_logo} alt="Logo" />
            </div>

            {/* Mobile social icons */}
            <div className="mobile-social">
              {contactData?.facebook_link && (
                <a
                  href={contactData.facebook_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF />
                </a>
              )}
              {contactData?.instagram_link && (
                <a
                  href={contactData.instagram_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
              )}
            </div>
          </div>

          {/* Hamburger */}
          <div
            className={`navbar-hamburger ${menuOpen ? "open" : ""}`}
            onClick={handleMenuToggle}
          >
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
