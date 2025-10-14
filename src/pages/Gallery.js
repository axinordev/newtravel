import React, { useState } from "react";
import "./Gallery.css";

// Import background and images
import bannerBg from "../assets/images/gallery_banner.png";
import img1 from "../assets/gallery/gallery1.jpg";
import img2 from "../assets/gallery/gallery2.jpg";
import img3 from "../assets/gallery/gallery3.jpg";
import img4 from "../assets/gallery/gallery4.jpg";
import img5 from "../assets/gallery/gallery5.jpg";
import img6 from "../assets/gallery/gallery6.jpg";
import img7 from "../assets/gallery/gallery7.jpg";
import img8 from "../assets/gallery/gallery8.jpg";
import img9 from "../assets/gallery/gallery9.jpg";
import img10 from "../assets/gallery/gallery10.jpg";
import img11 from "../assets/gallery/gallery11.jpg";
import img12 from "../assets/gallery/gallery12.jpg";
import img13 from "../assets/gallery/gallery12.jpg";
import img14 from "../assets/gallery/gallery14.jpg";
import img15 from "../assets/gallery/gallery15.jpg";
import img16 from "../assets/gallery/gallery16.jpg";
import img17 from "../assets/gallery/gallery17.jpg";
import img18 from "../assets/gallery/gallery18.jpg";
import img19 from "../assets/gallery/gallery19.jpg";
import GetInTouch from "../components/Get_in_touch";
import Map from "../components/Map";

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
          </div>
        ) : (
          <div className="image-grid">
            {[img1, img2, img3, img4, img5, img6,img6, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19].map((image, i) => (
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
