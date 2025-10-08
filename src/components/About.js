import React, { useState, useRef } from 'react';
import './About.css';
import whatsappIcon from '../assets/icons/whatsapp.png';
import map_tourist from '../assets/images/map_tourist.png';

// Import images for upcoming tours
import canadaImg from '../assets/upcoming_tours/canada.jpg';
import vietnamImg from '../assets/upcoming_tours/vietnam.png';
import malaysiaImg from '../assets/upcoming_tours/malaysia.png';
import dubaiImg from '../assets/upcoming_tours/dubai.png';

// Use placeholder for missing images
const placeholderImg = 'https://via.placeholder.com/300x200/003366/FFFFFF?text=Coming+Soon';

const About = () => {
  const [upcomingTab, setUpcomingTab] = useState('international');
  const [popularTab, setPopularTab] = useState('international');
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const upcomingTours = {
    international: [
      { id: 1, name: 'Canada', image: canadaImg },
      { id: 2, name: 'Vietnam', image: vietnamImg },
      { id: 3, name: 'Kuching, Malaysia', image: malaysiaImg },
      { id: 4, name: 'Dubai', image: dubaiImg },
      { id: 5, name: 'Thailand', image: placeholderImg },
    ],
    domestic: [
      { id: 1, name: 'Goa', image: placeholderImg },
      { id: 2, name: 'Rajasthan', image: placeholderImg },
      { id: 3, name: 'Kashmir', image: placeholderImg },
      { id: 4, name: 'Mumbai', image: placeholderImg },
      { id: 5, name: 'Delhi', image: placeholderImg },
    ],
    kerala: [
      { id: 1, name: 'Munnar', image: placeholderImg },
      { id: 2, name: 'Wayanad', image: placeholderImg },
      { id: 3, name: 'Alleppey', image: placeholderImg },
      { id: 4, name: 'Kovalam', image: placeholderImg },
      { id: 5, name: 'Thekkady', image: placeholderImg },
    ],
  };

  const popularDestinations = {
    international: [
      { id: 1, name: 'Portugal', image: placeholderImg },
      { id: 2, name: 'Vietnam', image: vietnamImg },
      { id: 3, name: 'Azerbaijan', image: placeholderImg },
      { id: 4, name: 'Dubai', image: dubaiImg },
      { id: 5, name: 'Thailand', image: placeholderImg },
      { id: 6, name: 'Canada', image: canadaImg },
      { id: 7, name: 'Malaysia', image: malaysiaImg },
    ],
    domestic: [
      { id: 1, name: 'Delhi', image: placeholderImg },
      { id: 2, name: 'Mumbai', image: placeholderImg },
      { id: 3, name: 'Kolkata', image: placeholderImg },
      { id: 4, name: 'Chennai', image: placeholderImg },
      { id: 5, name: 'Bangalore', image: placeholderImg },
      { id: 6, name: 'Hyderabad', image: placeholderImg },
      { id: 7, name: 'Jaipur', image: placeholderImg },
    ],
    kerala: [
      { id: 1, name: 'Kochi', image: placeholderImg },
      { id: 2, name: 'Trivandrum', image: placeholderImg },
      { id: 3, name: 'Kozhikode', image: placeholderImg },
      { id: 4, name: 'Thrissur', image: placeholderImg },
      { id: 5, name: 'Kannur', image: placeholderImg },
      { id: 6, name: 'Kollam', image: placeholderImg },
      { id: 7, name: 'Alappuzha', image: placeholderImg },
    ],
  };

  const handleUpcomingTabChange = (tab) => {
    setUpcomingTab(tab);
  };

  const handlePopularTabChange = (tab) => {
    setPopularTab(tab);
    setCurrentIndex(0);
  };

  const handlePrev = () => {
    const destinations = popularDestinations[popularTab];
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNext = () => {
    const destinations = popularDestinations[popularTab];
    setCurrentIndex((prevIndex) => 
      prevIndex < destinations.length - 5 ? prevIndex + 1 : destinations.length - 5
    );
  };

  return (
    <div className="about-container">
      <div className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2>NEW ALLIED TOURS AND TRAVELS</h2>
            <p>
              New Allied Tours & Travels, founded in 1999, brings over 25 years of travel industry expertise to your vacation planning. IATA accredited and recognized for our exceptional service, we offer a full range of services including online ticketing, hotel reservations, visa and passport assistance, tours, travel insurance, and luxury vehicle rentals. We also assist in renewal of US passports. Recognized by the Government of India and accredited by the International Air Transport Association, we ensure top-tier service and exceptional travel experiences. Our headquarters in Hyampally Nagar, Kochi, is always ready to welcome you, and we grow together, one journey at a time.
            </p>
          </div>
          <div className="about-image">
            <img src={map_tourist} alt="New Allied Tours" />
          </div>
        </div>

        <section>
          <h2 className="section-title">UPCOMING TOURS</h2>
          <div className="tab-container">
            <div className="tab-options">
              <div
                className={`tab-option ${upcomingTab === 'international' ? 'active' : ''}`}
                onClick={() => handleUpcomingTabChange('international')}
              >
                INTERNATIONAL
              </div>
              <div
                className={`tab-option ${upcomingTab === 'domestic' ? 'active' : ''}`}
                onClick={() => handleUpcomingTabChange('domestic')}
              >
                DOMESTIC
              </div>
              <div
                className={`tab-option ${upcomingTab === 'kerala' ? 'active' : ''}`}
                onClick={() => handleUpcomingTabChange('kerala')}
              >
                KERALA
              </div>
            </div>
            <div className="tour-cards">
              {upcomingTours[upcomingTab].slice(0, 5).map((tour, index) => (
                <div className="tour-card" key={tour.id}>
                  <div className="card-image">
                    <img src={tour.image} alt={tour.name} />
                  </div>
                  <div className="card-content">
                    <h3>{tour.name}</h3>
                    <button className="view-details-btn">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="section-title">POPULAR DESTINATIONS</h2>
          <div className="tab-container">
            <div className="tab-options">
              <div
                className={`tab-option ${popularTab === 'international' ? 'active' : ''}`}
                onClick={() => handlePopularTabChange('international')}
              >
                INTERNATIONAL
              </div>
              <div
                className={`tab-option ${popularTab === 'domestic' ? 'active' : ''}`}
                onClick={() => handlePopularTabChange('domestic')}
              >
                DOMESTIC
              </div>
              <div
                className={`tab-option ${popularTab === 'kerala' ? 'active' : ''}`}
                onClick={() => handlePopularTabChange('kerala')}
              >
                KERALA
              </div>
            </div>
            <div className="destinations-carousel-container">
              <div className="carousel-arrow left" onClick={handlePrev}>
                &#10094;
              </div>
              <div className="destinations-carousel" ref={carouselRef}>
                {popularDestinations[popularTab].slice(currentIndex, currentIndex + 5).map((destination, index) => {
                  const isActive = index === 2;
                  return (
                    <div
                      className={`destination-card ${isActive ? 'active' : ''}`}
                      key={destination.id}
                      style={{
                        transform: isActive ? 'scale(1.1)' : 'scale(1)',
                        zIndex: isActive ? 2 : 1
                      }}
                    >
                      <div className="card-image">
                        <img src={destination.image} alt={destination.name} />
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
      <a href="https://wa.me/1234567890" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <img src={whatsappIcon} alt="WhatsApp" />
      </a>
    </div>
  );
};

export default About;