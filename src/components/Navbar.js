import React, { useState, useEffect } from 'react';
import './Navbar.css';
import main_logo from '../assets/images/main_logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Navbar background on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-logo">
        <img src={main_logo} alt="Logo" />
      </div>

      {/* Navbar Links */}
      <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <ul className="list-unstyled m-0">
          <li className="px-3"><a href="#about" onClick={closeMenu}>About</a></li>
          <li className="px-3"><a href="#destination" onClick={closeMenu}>Destinations</a></li>
          <li className="px-3"><a href="#services" onClick={closeMenu}>Services</a></li>
          <li className="px-3"><a href="#plan" onClick={closeMenu}>Plan Your Trip</a></li>
          <li className="px-3"><a href="#testimonials" onClick={closeMenu}>Testimonials</a></li>
          <li className="px-3"><a href="#gallery" onClick={closeMenu}>Gallery</a></li>
          <li className="px-3"><a href="#contact" onClick={closeMenu}>Contact</a></li>
        </ul>
      </div>

      {/* Hamburger Menu */}
      <div className="navbar-hamburger d-lg-none" onClick={handleMenuToggle}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;
