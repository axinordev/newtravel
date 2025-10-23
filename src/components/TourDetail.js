import React, { useState, useEffect, useRef, memo } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "./TourDetail.css";
import "./common.css";
import PlanYourTrip from "./Plan_your_trip";

const BASE_URL = "https://admin.newalliedtour.net/api";

const TourDetail = () => {
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [aboutPoints, setAboutPoints] = useState([]);
  const [tourInfo, setTourInfo] = useState({ location: "", description: "" });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const topRef = useRef(null); // Ref for top of page

  // Scroll to top after content is fully loaded
  useEffect(() => {
    if (!loading) {
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading, id]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch images & about points
        const responseImages = await fetch(
          `${BASE_URL}/upcoming_tours_images_section/`
        );
        const dataImages = await responseImages.json();

        const filteredImages = dataImages.filter(
          (item) => item.tour === parseInt(id)
        );
        if (filteredImages.length > 0) {
          setImages(filteredImages.map((item) => item.image));
          const aboutList = filteredImages
            .map((item) => item.about?.trim())
            .filter((text) => text && text.length > 0);
          setAboutPoints(aboutList);
        }

        // Fetch location & description
        const responseInfo = await fetch(`${BASE_URL}/upcoming_tours_section/`);
        const dataInfo = await responseInfo.json();
        const filteredInfo = dataInfo.find((item) => item.id === parseInt(id));

        if (filteredInfo) {
          setTourInfo({
            location: filteredInfo.location || `Tour #${id}`,
            description: filteredInfo.description || "",
          });
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load tour data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Carousel navigation
  const handlePrevImage = () => {
    setCurrentImageIndex(
      prev => (prev === 0 ? images.length - 1 : prev - 1)
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(
      prev => (prev === images.length - 1 ? 0 : prev + 1)
    );
  };

  if (loading) return <p className="loading">Loading tour details...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="tour-detail-container" ref={topRef}>
        {/* Image Carousel */}
        {images.length > 0 ? (
          <div className="tour-image-carousel">
            <div className="carousel-arrow left" onClick={handlePrevImage}>
              &#10094;
            </div>
            <img
              src={images[currentImageIndex]}
              alt={`${tourInfo.location} ${currentImageIndex + 1}`}
              className="tour-detail-image"
              loading="lazy"
            />
            <div className="carousel-arrow right" onClick={handleNextImage}>
              &#10095;
            </div>
            <div className="carousel-indicators">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`indicator ${
                    index === currentImageIndex ? "active" : ""
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                ></span>
              ))}
            </div>
          </div>
        ) : (
          <p>No images available for this tour.</p>
        )}

        {/* Tour Info */}
        <div className="tour-detail-content">
          <h1 className="tour-name">{tourInfo.location}</h1>
          {tourInfo.description && (
            <p
              style={{
                fontSize: "17px",
                marginBottom: "20px",
                color: "#333",
              }}
            >
              {tourInfo.description}
            </p>
          )}

          <div className="tour-description">
            <h2>About this Tour</h2>
            {aboutPoints.length > 0 ? (
              <ul className="about-list">
                {aboutPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            ) : (
              <p>No additional details available.</p>
            )}
          </div>
        </div>
      </div>

      <PlanYourTrip />
    </>
  );
};

export default memo(TourDetail);
