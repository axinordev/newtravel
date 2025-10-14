import React, { useState, useEffect, memo } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import "./TourDetail.css";
import "./common.css";
import PlanYourTrip from "./Plan_your_trip";
import { tourAPI } from "../services/api";

// Import images for fallback data
import canadaImg from '../assets/upcoming_tours/canada.jpg';

// Fallback tour data (used only when API fails)
const fallbackTourData = {
  international: {
    1: {
      name: 'Canada',
      images: [canadaImg, canadaImg, canadaImg],
      description: "Traverse through the majestic landscapes and vibrant cities of Canada with our exclusive tour package. Experience the beauty and excitement of Canada's top destinations in one unforgettable trip!",
      duration: 'Toronto: - Niagara Falls - Lake Minnewanka Cruise - Kamloops - Vancouver - Gondola Experience',
      highlights: ["Toronto : Immerse yourself in the diverse culture and vibrant arts scene that make Toronto, Canada's largest city and a global metropolis. Explore iconic landmarks like the CN Tower, Royal Ontario Museum, and the lively Distillery District.", "Niagara Falls : Witness the breathtaking power and beauty of one of the world's most famous natural wonders. Feel the mist on your face as you get up close to the awe-inspiring falls and experience the thrill of a boat ride through the rapids.", "Lake Minnewanka Cruise : Take a serene cruise on Lake Minnewanka, nestled in the heart of the Canadian Rockies. Surrounded by stunning mountain scenery, this peaceful boat ride offers panoramic views and a chance to spot local wildlife.", "Kamloops : Discover the charm of Kamloops, a picturesque city in British Columbia known for its outdoor activities and beautiful landscapes. Enjoy the local attractions and explore the natural beauty of the region.", "Vancouver : Vancouver, a vibrant city renowned for its stunning waterfront views, lush parks, and cultural diversity. Take advantage of the opportunity to visit Stanley Park, Granville Island, and the renowned Capilano Suspension Bridge.", "Gondola Experience : Take to the skies with an exhilarating gondola ride, offering spectacular aerial views of the stunning landscapes and towering peaks. Perfect for capturing unforgettable photos and enjoying breathtaking vistas."],
      inclusions: ['Hotel accommodation', 'Daily breakfast', 'Airport transfers', 'Guided tours', 'Travel insurance']
    },
    // Other fallback tours removed for brevity
  }
};

const TourDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchTourData = async () => {
      setLoading(true);
      try {
        // Get category from URL query parameters
        const queryParams = new URLSearchParams(window.location.search);
        const category = queryParams.get('category');
        
        console.log(`Fetching tour with ID: ${id}, category: ${category}`);
        
        // Fetch tour data from API
        const tourData = await tourAPI.getTourById(id, category);
        console.log("Tour data received:", tourData);
        
        if (tourData && (tourData.name || tourData.title)) {
          setTour(tourData);
          setError(null);
        } else {
          console.warn("Invalid tour data format received:", tourData);
          setError("Invalid tour data format received from server");
          // Fallback to static data if API returns invalid format
          findFallbackTour(category, id);
        }
      } catch (error) {
        console.error("Error fetching tour data:", error);
        setError("Failed to load tour data. Using fallback data.");
        
        // Fallback to static data if API fails
        const searchParams = new URLSearchParams(window.location.search);
         findFallbackTour(searchParams.get('category'), id);
      } finally {
        setLoading(false);
      }
    };
    
    const findFallbackTour = (category, tourId) => {
      if (category && fallbackTourData[category] && fallbackTourData[category][tourId]) {
        setTour(fallbackTourData[category][tourId]);
      } else {
        // Search all categories in fallback data
        for (const cat in fallbackTourData) {
          if (fallbackTourData[cat] && fallbackTourData[cat][tourId]) {
            setTour(fallbackTourData[cat][tourId]);
            break;
          }
        }
      }
    };
    
    fetchTourData();
  }, [id]);

  const handlePrevImage = () => {
    if (!tour) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? tour.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    if (!tour) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === tour.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (loading) return <p className="loading">Loading tour details...</p>;
  if (error && !tour) return <p className="error">Error: {error}</p>;
  if (!tour) return <p className="error">Tour not found</p>;

  return (
    <>
      <Navbar />
      {error && <div className="error-banner">{error}</div>}
      <div className="tour-detail-container">
        {/* Image Carousel */}
        <div className="tour-image-carousel">
          <div className="carousel-arrow left" onClick={handlePrevImage}>
            &#10094;
          </div>
          <img
            src={tour.images[currentImageIndex]}
            alt={`${tour.name} ${currentImageIndex + 1}`}
            className="tour-detail-image"
            loading="lazy"
          />
          <div className="carousel-arrow right" onClick={handleNextImage}>
            &#10095;
          </div>
          <div className="carousel-indicators">
            {tour.images.map((_, index) => (
              <span
                key={index}
                className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              ></span>
            ))}
          </div>
        </div>

        {/* Tour Details */}
        <div className="tour-detail-content">
          <h1 className="tour-name">{tour.name}</h1>
          <div className="tour-meta">
            <span className="tour-duration"><i className="fas fa-clock"></i> {tour.duration}</span>
            <span className="tour-price"><i className="fas fa-tag"></i> {tour.price}</span>
          </div>
          <div className="tour-description">
            <h2>About {tour.name}</h2>
            <p>{tour.description}</p>
          </div>
          
          <div className="tour-highlights">
            <h2>Highlights</h2>
            <ul>
              {tour.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <PlanYourTrip />
    </>
  );
};

// Memoize the component for better performance
export default memo(TourDetail);
