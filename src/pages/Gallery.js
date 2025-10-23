import React, { useState, useEffect } from "react";
import "./Gallery.css";
import bannerBg from "../assets/images/gallery_banner.png";

const Gallery = () => {
  const [activeTab, setActiveTab] = useState("images");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  // Fetch images
  useEffect(() => {
    fetch("https://admin.newalliedtour.net/api/gallery_image_section/")
      .then((res) => res.json())
      .then((data) => setImages(data.filter((i) => i.image).map((i) => i.image)))
      .catch((err) => console.error("Failed to fetch images:", err));
  }, []);

  // Fetch videos (keep full object so we have video + thumbnail)
  useEffect(() => {
    fetch("https://admin.newalliedtour.net/api/gallery_video_section/")
      .then((res) => res.json())
      .then((data) => setVideos(data.filter((i) => i.video))) // keep full object
      .catch((err) => console.error("Failed to fetch videos:", err));
  }, []);

  return (
    <div className="gallery-container" id="gallery">
      {/* Banner */}
      <section
        className="gallery-banner"
        style={{ backgroundImage: `url(${bannerBg})` }}
      >
        <div className="banner-overlay">
          <h1 className="gallery-title">Wanderlust Captured</h1>
        </div>
      </section>

      {/* Tabs */}
      <div className="gallery-tabs">
        {["videos", "images"].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="gallery-content">
        {activeTab === "images" ? (
          <div className="image-grid">
            {images.length ? (
              images.map((img, i) => (
                <div key={i} className="img-box">
                  <img src={img} alt={`Gallery ${i + 1}`} />
                </div>
              ))
            ) : (
              <p>No images available.</p>
            )}
          </div>
        ) : (
          <div className="video-grid">
            {videos.length ? (
              videos.map((videoObj, i) => (
                <div key={i} className="video-box">
                  <video
                    src={videoObj.video}
                    poster={videoObj.thumbnail} // ✅ show thumbnail when idle
                    controls
                    className="video-player"
                  />
                </div>
              ))
            ) : (
              <p>No videos available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
