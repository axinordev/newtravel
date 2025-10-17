import React, { useState, useEffect } from "react";
import "./Gallery.css";
import bannerBg from "../assets/images/gallery_banner.png";
import GetInTouch from "../components/Get_in_touch";
import Map from "../components/Map";

const Gallery = () => {
  const [activeTab, setActiveTab] = useState("images");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  // Fetch images from API
  useEffect(() => {
    fetch("https://admin.newalliedtour.net/api/gallery_image_section/")
      .then(res => res.json())
      .then(data => setImages(data.filter(i => i.image).map(i => i.image)))
      .catch(err => console.error("Failed to fetch images:", err));
  }, []);

  // Fetch videos from API
  useEffect(() => {
    fetch("https://admin.newalliedtour.net/api/gallery_video_section/")
      .then(res => res.json())
      .then(data => setVideos(data.filter(i => i.link).map(i => i.link)))
      .catch(err => console.error("Failed to fetch videos:", err));
  }, []);

  // Get YouTube video ID (works with youtu.be and watch?v= links)
  const getYoutubeId = url => {
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes("youtu.be")) return parsed.pathname.slice(1);
      if (parsed.searchParams.has("v")) return parsed.searchParams.get("v");
      return "";
    } catch {
      return "";
    }
  };

  // Generate YouTube thumbnail URL
  const getYoutubeThumbnail = url => {
    const id = getYoutubeId(url);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
  };

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
        {["videos", "images"].map(tab => (
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
              videos.map((link, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-box"
                >
                  <img
                    src={getYoutubeThumbnail(link)}
                    alt={`Video ${i + 1}`}
                    className="video-thumbnail"
                  />
                </a>
              ))
            ) : (
              <p>No videos available.</p>
            )}
          </div>
        )}
      </div>

      <GetInTouch />
      <Map />
    </div>
  );
};

export default Gallery;
