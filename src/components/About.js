import React, { useState, useEffect, useRef } from "react";
import "./About.css";
import "./common.css";
import whatsappIcon from "../assets/icons/whatsapp.png";
import map_tourist from "../assets/images/map_tourist.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const placeholderImg =
  "https://via.placeholder.com/300x200/003366/FFFFFF?text=Coming+Soon";

const About = () => {
  const [aboutData, setAboutData] = useState({ title: "", description: "" });
  const [options, setOptions] = useState([]);
  const [upcomingTours, setUpcomingTours] = useState({});
  const [popularDestinations, setPopularDestinations] = useState({});
  const [upcomingTab, setUpcomingTab] = useState("");
  const [popularTab, setPopularTab] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  // --- Fetch About Section ---
  useEffect(() => {
    axios
      .get("https://admin.newalliedtour.net/api/about_section/")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data[0] : res.data;
        setAboutData({
          title: data?.title || "About Us",
          description: data?.description || "",
        });
      })
      .catch(() => setAboutData({ title: "Failed to load", description: "" }));
  }, []);

  // --- Fetch Options and dependent data dynamically ---
  useEffect(() => {
    axios
      .get("https://admin.newalliedtour.net/api/option_section/")
      .then(async (res) => {
        const fetchedOptions = res.data;
        setOptions(fetchedOptions);

        // Initialize grouped objects dynamically
        const groupedTours = {};
        const groupedDestinations = {};
        fetchedOptions.forEach((opt) => {
          groupedTours[opt.option] = [];
          groupedDestinations[opt.option] = [];
        });

        // --- Fetch Upcoming Tours ---
        const toursRes = await axios.get(
          "https://admin.newalliedtour.net/api/upcoming_tours_section/"
        );
        toursRes.data.forEach((tour) => {
          const typeName = fetchedOptions.find((opt) => opt.id === tour.type)
            ?.option;
          if (typeName) {
            groupedTours[typeName].push({
              id: tour.id,
              name: tour.location,
              image: tour.thumbnail,
              description: tour.description,
            });
          }
        });

        // --- Fetch Popular Destinations ---
        const destRes = await axios.get(
          "https://admin.newalliedtour.net/api/popular_destination_section/"
        );
        destRes.data.forEach((dest) => {
          const typeName = fetchedOptions.find((opt) => opt.id === dest.type)
            ?.option;
          if (typeName) {
            groupedDestinations[typeName].push({
              id: dest.id,
              name: dest.location,
              image: dest.thumbnail,
            });
          }
        });

        setUpcomingTours(groupedTours);
        setPopularDestinations(groupedDestinations);

        // Set default tabs to first available option
        if (fetchedOptions.length > 0) {
          setUpcomingTab(fetchedOptions[0].option);
          setPopularTab(fetchedOptions[0].option);
        }
      })
      .catch((err) => console.error("Option fetch error:", err));
  }, []);

  // --- Carousel auto-scroll ---
  useEffect(() => {
    const interval = setInterval(() => {
      const total = (popularDestinations[popularTab] || []).length;
      if (total > 0) setCurrentIndex((prev) => (prev + 1) % total);
    }, 3000);
    return () => clearInterval(interval);
  }, [popularTab, popularDestinations]);

  // --- Navigation handler ---
  const handleViewDetails = (id, category) => {
    navigate(`/tour/${id}?category=${category}`);
  };

  return (
    <div className="about-container" id="About">
      <div className="about-section">
        {/* --- ABOUT SECTION --- */}
        <div className="about-content">
          <div className="about-text">
            <h2>{aboutData.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: aboutData.description }} />
          </div>
          <div className="about-image">
            <img src={map_tourist} alt="Map of Tourist Destinations" />
          </div>
        </div>

        {/* --- UPCOMING TOURS --- */}
        <section>
          <h2 className="section-title">UPCOMING TOURS</h2>
          <div className="tab-container">
            <div className="tab-options">
              {options.map((opt) => (
                <div
                  key={opt.id}
                  className={`tab-option ${
                    upcomingTab === opt.option ? "active" : ""
                  }`}
                  onClick={() => setUpcomingTab(opt.option)}
                >
                  {opt.option.toUpperCase()}
                </div>
              ))}
            </div>
            <div className="tour-cards">
              {(upcomingTours[upcomingTab] || []).map((tour) => (
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
        <section id="destination">
          <h2 className="section-title">POPULAR DESTINATIONS</h2>
          <div className="tab-container">
            <div className="tab-options">
              {options.map((opt) => (
                <div
                  key={opt.id}
                  className={`tab-option ${
                    popularTab === opt.option ? "active" : ""
                  }`}
                  onClick={() => {
                    setPopularTab(opt.option);
                    setCurrentIndex(0);
                  }}
                >
                  {opt.option.toUpperCase()}
                </div>
              ))}
            </div>
            <div className="destinations-carousel-container">
              <div
                className="carousel-arrow left"
                onClick={() => {
                  const total = (popularDestinations[popularTab] || []).length;
                  setCurrentIndex((prev) => (prev - 1 + total) % total);
                }}
              >
                &#10094;
              </div>

              <div className="destinations-carousel" ref={carouselRef}>
                {(popularDestinations[popularTab] || []).map(
                  (destination, index) => {
                    const total = (popularDestinations[popularTab] || []).length;
                    const visibleIndex = (index - currentIndex + total) % total;
                    if (visibleIndex >= 5) return null;
                    const isActive = visibleIndex === 2;
                    return (
                      <div
                        key={`${popularTab}-${destination.id}`}
                        className={`destination-card ${
                          isActive ? "active" : ""
                        }`}
                        style={{
                          transform: isActive ? "scale(1.1)" : "scale(1)",
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
                  }
                )}
              </div>

              <div
                className="carousel-arrow right"
                onClick={() => {
                  const total = (popularDestinations[popularTab] || []).length;
                  setCurrentIndex((prev) => (prev + 1) % total);
                }}
              >
                &#10095;
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* --- WhatsApp Floating Button --- */}
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
