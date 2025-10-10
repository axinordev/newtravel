import React, { useState } from "react";
import "./Gallery.css";

// Import background and images
import bannerBg from "../assets/images/gallery_banner.png";
import img1 from "../assets/upcoming_tours/alappuzha.jpg";
import img2 from "../assets/upcoming_tours/canada.jpg";
import img3 from "../assets/upcoming_tours/delhi.jpg";
import img4 from "../assets/upcoming_tours/goa.jpg";
import img5 from "../assets/upcoming_tours/dubai.png";
import img6 from "../assets/upcoming_tours/goa.jpg";
import Navbar from "../components/Navbar";
import GetInTouch from "../components/Get_in_touch";
import Map from "../components/Map";
import Footer from "../components/Footer";

const Gallery = () => {
  const [activeTab, setActiveTab] = useState("videos");

  return (
    <div className="gallery-container" id="gallery">
      {/* Banner Section */}

      <section
        className="gallery-banner"
        style={{ backgroundImage: `url(${bannerBg})` }}
      >
        <div className="banner-overlay">
          <h1 className="gallery-title">Wanderlust Captured</h1>
        </div>
      </section>

      {/* Tabs Section */}
      <div className="gallery-tabs">
        <button
          className={`tab-btn ${activeTab === "videos" ? "active" : ""}`}
          onClick={() => setActiveTab("videos")}
        >
          Videos
        </button>
        <button
          className={`tab-btn ${activeTab === "images" ? "active" : ""}`}
          onClick={() => setActiveTab("images")}
        >
          Images
        </button>
      </div>

      {/* Content Section */}
      <div className="gallery-content">
        {activeTab === "videos" ? (
          <div className="video-grid">
            <iframe
              src="https://www.youtube.com/embed/5qap5aO4i9A"
              title="Dubai Tour"
              allowFullScreen
            ></iframe>
            <iframe
              src="https://www.youtube.com/embed/oUFJJNQGwhk"
              title="Europe Tour"
              allowFullScreen
            ></iframe>
            <iframe
              src="https://www.youtube.com/embed/JGwWNGJdvx8"
              title="Thailand Trip"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="image-grid">
            {[img1, img2, img3, img4, img5, img6].map((image, i) => (
              <div key={i} className="img-box">
                <img src={image} alt={`Gallery ${i + 1}`} />
              </div>
            ))}
          </div>
        )}
      </div>
      <GetInTouch/>
      <Map/>
    </div>
  );
};

export default Gallery;
