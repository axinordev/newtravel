import React, { useState } from 'react';
import './Navbar.css';
import main_logo from '../assets/images/main_logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const handleMenuToggle = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<nav className="navbar">
			<div className="navbar-logo">
				<img src={main_logo} alt="Logo" />
			</div>
			<div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
                <ul className='list-unstyled d-flex m-0'>
                    <li className='px-3'><a href="#about">About</a></li>
                    <li className='px-3'><a href="#destination">Destinations</a></li>
                    <li className='px-3'><a href="#services">Services</a></li>
                    <li className='px-3'><a href="#plan">Plan Your Trip</a></li>
                    <li className='px-3'><a href="#testimonials">Testimonials</a></li>
                    <li className='px-3'><a href="#gallery">Gallery</a></li>
                    <li className='px-3'><a href="#contact">Contact</a></li>
                </ul>
                
			</div>
			<div className="hamburger d-lg-none" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" onClick={handleMenuToggle}>
				<span className="bar"></span>
				<span className="bar"></span>
				<span className="bar"></span>
			</div>
		</nav>
	);
};

export default Navbar;
