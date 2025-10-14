import React, { useState, useRef, useEffect } from 'react';
import './About.css';
import whatsappIcon from '../assets/icons/whatsapp.png';
import map_tourist from '../assets/images/map_tourist.png';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Import images for upcoming tours
import canadaImg from '../assets/upcoming_tours/canada.jpg';
import vietnamImg from '../assets/upcoming_tours/vietnam.png';
import malaysiaImg from '../assets/upcoming_tours/malaysia.png';
import dubaiImg from '../assets/upcoming_tours/dubai.png';
import thailandImg from '../assets/upcoming_tours/thailand.jpg';
import azerbaijanImg from '../assets/upcoming_tours/azerbaijan.jpg';
import goaImg from '../assets/upcoming_tours/goa.jpg';
import rajasthanImg from '../assets/upcoming_tours/rajasthan.jpg';
import kashmirImg from '../assets/upcoming_tours/kashmir.jpg';
import munnarImg from '../assets/upcoming_tours/munnar.jpg';
import wayanadImg from '../assets/upcoming_tours/wayanad.jpg';
import thekkadyImg from '../assets/upcoming_tours/thekkady.jpg';
import alappuzhaImg from '../assets/upcoming_tours/alappuzha.jpg';
import singaporebaliImg from '../assets/upcoming_tours/singaporeBaliTour.png';
import ayodhyaImg from '../assets/upcoming_tours/AyodhyaVaranasi.jpg';
import goldenTriangleImg from '../assets/upcoming_tours/golden.jpg';
import delhiMadhura from '../assets/upcoming_tours/delhimadura.jpg'
import munnarKumarakamImg from '../assets/upcoming_tours/munnarkumarakam.jpg'
import kochiCalicutWayanadImg from '../assets/upcoming_tours/kochicalicut.jpg'
import himachalImg from '../assets/upcoming_tours/himachal.jpg'

// Placeholder for missing images
const placeholderImg = 'https://via.placeholder.com/300x200/003366/FFFFFF?text=Coming+Soon';

// ---------- CONSTANT DATA ----------
const upcomingTours = {
  international: [
    { id: 1, name: 'Canada', image: canadaImg },
    { id: 2, name: 'Vietnam', image: vietnamImg },
    { id: 3, name: 'Kuching, Malaysia', image: malaysiaImg },
    { id: 4, name: 'Singapore Bali', image: singaporebaliImg },
    { id: 5, name: 'Dubai', image: dubaiImg },
    
  ],
  domestic: [
    { id: 1, name: 'The Golden Triangle', image: goldenTriangleImg },
    { id: 2, name: 'Rajasthan', image: rajasthanImg },
    { id: 3, name: 'Delhi, Madura, Vrindavan and Agra', image: delhiMadhura },
    { id: 4, name: 'Ayodhya, Varanasi', image: ayodhyaImg },
    
  ],
  kerala: [
    { id: 1, name: 'Munnar, Kumarakam and Alleppey', image: munnarKumarakamImg },
    { id: 2, name: 'Kochi, Calicut and Wayanad', image: kochiCalicutWayanadImg },
  ],
};

const popularDestinations = {
  international: [
    { id: 1, name: 'Europe', image: canadaImg },
    { id: 2, name: 'Vietnam', image: azerbaijanImg },
    { id: 3, name: 'Azerbaijan', image: malaysiaImg },
    { id: 4, name: 'Dubai', image: dubaiImg },
    { id: 5, name: 'Thailand', image: thailandImg },
  ],
  domestic: [
    { id: 1, name: 'Kashmir', image: kashmirImg },
    { id: 2, name: 'Rajasthan', image: rajasthanImg },
    { id: 3, name: 'Himachal Pradesh', image: himachalImg },
    { id: 4, name: 'Goa', image: goaImg },
  ],
  kerala: [
    { id: 1, name: 'Munnar', image: munnarImg },
    { id: 2, name: 'Wayanad', image: wayanadImg },
    { id: 3, name: 'Alappuzha', image: alappuzhaImg },
    { id: 4, name: 'Thekkady', image: thekkadyImg },
  ],
};

// ---------- COMPONENT ----------
const About = () => {
  const [aboutDescription, setAboutDescription] = useState('Loading...');
  const [upcomingTab, setUpcomingTab] = useState('international');
  const [popularTab, setPopularTab] = useState('international');
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const navigate = useNavigate();

  // Navigate to tour detail page
  const handleViewDetails = (id, category) => {
    navigate(`/tour/${id}?category=${category}`);
  };

  // --- Fetch about description from backend ---
  useEffect(() => {
    axios
      .get('http://31.97.205.45:8081/api/about_section/')
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data[0] : res.data;
        setAboutDescription(data?.description || '');
      })
      .catch(() => setAboutDescription('Failed to load content.'));
  }, []);

  // --- Auto-scroll popular destinations carousel ---
  useEffect(() => {
    const interval = setInterval(() => {
      const total = popularDestinations[popularTab].length;
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 3000);

    return () => clearInterval(interval);
  }, [popularTab]);

  // --- Handlers ---
  const handleUpcomingTabChange = (tab) => setUpcomingTab(tab);

  const handlePopularTabChange = (tab) => {
    setPopularTab(tab);
    setCurrentIndex(0);
  };

  const handlePrev = () => {
    const total = popularDestinations[popularTab].length;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + total) % total);
  };

  const handleNext = () => {
    const total = popularDestinations[popularTab].length;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % total);
  };

  return (
    <div className="about-container" id="About">
      <div className="about-section">
        {/* --- ABOUT SECTION --- */}
        <div className="about-content">
          <div className="about-text">
            <h2>NEW ALLIED TOURS AND TRAVELS</h2>
            <p dangerouslySetInnerHTML={{ __html: aboutDescription }} />
          </div>
          <div className="about-image">
            <img src={map_tourist} alt="Map of Tourist Destinations" />
          </div>
        </div>

        {/* --- UPCOMING TOURS --- */}
        <section>
          <h2 id="#destination" className="section-title">UPCOMING TOURS</h2>
          <div className="tab-container">
            <div className="tab-options">
              {['international', 'domestic', 'kerala'].map((tab) => (
                <div
                  key={tab}
                  className={`tab-option ${upcomingTab === tab ? 'active' : ''}`}
                  onClick={() => handleUpcomingTabChange(tab)}
                >
                  {tab.toUpperCase()}
                </div>
              ))}
            </div>
            <div className="tour-cards">
              {upcomingTours[upcomingTab].slice(0, 5).map((tour) => (
                <div className="tour-card" key={`${upcomingTab}-${tour.id}`}>
                  <div className="card-image">
                    <img src={tour.image || placeholderImg} alt={tour.name} />
                  </div>
                  <div className="card-content">
                    <span className="tour-name">{tour.name}</span>
                    <button
                      type="button"
                      className="view-details-btn"
                      onClick={() => handleViewDetails(tour.id, upcomingTab)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- POPULAR DESTINATIONS --- */}
        <section>
          <h2 className="section-title">POPULAR DESTINATIONS</h2>
          <div className="tab-container">
            <div className="tab-options">
              {['international', 'domestic', 'kerala'].map((tab) => (
                <div
                  key={tab}
                  className={`tab-option ${popularTab === tab ? 'active' : ''}`}
                  onClick={() => handlePopularTabChange(tab)}
                >
                  {tab.toUpperCase()}
                </div>
              ))}
            </div>
            <div className="destinations-carousel-container">
              <div className="carousel-arrow left" onClick={handlePrev}>
                &#10094;
              </div>
              <div className="destinations-carousel" ref={carouselRef}>
                {popularDestinations[popularTab].map((destination, index) => {
                  const visibleIndex = (index - currentIndex + popularDestinations[popularTab].length) % popularDestinations[popularTab].length;
                  if (visibleIndex >= 5) return null;

                  const isActive = visibleIndex === 2;
                  return (
                    <div
                      key={`${popularTab}-${destination.id}`}
                      className={`destination-card ${isActive ? 'active' : ''}`}
                      style={{
                        transform: isActive ? 'scale(1.1)' : 'scale(1)',
                        zIndex: isActive ? 2 : 1,
                      }}
                    >
                      <div className="card-image">
                        <img
                          src={destination.image || placeholderImg}
                          alt={destination.name}
                        />
                      </div>
                      <div className="card-content">
                        <h3>{destination.name}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="carousel-arrow right" onClick={handleNext}>
                &#10095;
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* --- WhatsApp Floating --- */}
      <a
        href="https://wa.me/1234567890"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={whatsappIcon} alt="Chat on WhatsApp" />
      </a>
    </div>
  );
};

export default About;
