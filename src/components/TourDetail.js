import React, { useState, useEffect, memo } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "./TourDetail.css";
import PlanYourTrip from "./Plan_your_trip";

// Import images for tours
import canadaImg from '../assets/upcoming_tours/canada.jpg';
import vietnamImg from '../assets/upcoming_tours/vietnam.png';
import malaysiaImg from '../assets/upcoming_tours/malaysia.png';
import dubaiImg from '../assets/upcoming_tours/dubai.png';
import goaImg from '../assets/upcoming_tours/goa.jpg';
import rajasthanImg from '../assets/upcoming_tours/rajasthan.jpg';
import kashmirImg from '../assets/upcoming_tours/kashmir.jpg';
import mumbaiImg from '../assets/upcoming_tours/mumbai.jpg';
import munnarImg from '../assets/upcoming_tours/munnar.jpg';
import wayanadImg from '../assets/upcoming_tours/wayanad.jpg';

// Static tour data
const tourData = {
  international: {
    1: {
      name: 'Canada',
      images: [canadaImg, canadaImg, canadaImg],
      description: "Traverse through the majestic landscapes and vibrant cities of Canada with our exclusive tour package. Experience the beauty and excitement of Canada's top destinations in one unforgettable trip!",
      duration: 'Toronto: - Niagara Falls - Lake Minnewanka Cruise - Kamloops - Vancouver - Gondola Experience',
      highlights: ["Toronto : Immerse yourself in the diverse culture and vibrant arts scene that make Toronto, Canada's largest city and a global metropolis. Explore iconic landmarks like the CN Tower, Royal Ontario Museum, and the lively Distillery District.", "Niagara Falls : Witness the breathtaking power and beauty of one of the world's most famous natural wonders. Feel the mist on your face as you get up close to the awe-inspiring falls and experience the thrill of a boat ride through the rapids.", "Lake Minnewanka Cruise : Take a serene cruise on Lake Minnewanka, nestled in the heart of the Canadian Rockies. Surrounded by stunning mountain scenery, this peaceful boat ride offers panoramic views and a chance to spot local wildlife.", "Kamloops : Discover the charm of Kamloops, a picturesque city in British Columbia known for its outdoor activities and beautiful landscapes. Enjoy the local attractions and explore the natural beauty of the region.", "Vancouver : Vancouver, a vibrant city renowned for its stunning waterfront views, lush parks, and cultural diversity. Take advantage of the opportunity to visit Stanley Park, Granville Island, and the renowned Capilano Suspension Bridge.", "Gondola Experience : Take to the skies with an exhilarating gondola ride, offering spectacular aerial views of the stunning landscapes and towering peaks. Perfect for capturing unforgettable photos and enjoying breathtaking vistas."],
      inclusions: ['Hotel accommodation', 'Daily breakfast', 'Airport transfers', 'Guided tours', 'Travel insurance']
    },
    2: {
      name: 'Vietnam',
      images: [vietnamImg, vietnamImg, vietnamImg],
      description: "Experience Vietnam's rich cultural heritage and stunning landscapes from the ancient town of Hoi An to the historical treasures of Hue, with scenic adventures in Da Nang and Ba Na Hills.",
      duration: 'Hoi An - Da Nang - Ba Na Hills - Hue',
      highlights: ["Da Nang : Explore Da Nang's modern cityscape, serene beaches, and breathtaking Marble Mountains.", "Hoi An : Discover the charm of Hoi An's ancient streets, vibrant markets, and lantern-lit nights.", "Ba Na Hills : Enjoy a unique blend of nature and fantasy at Ba Na Hills, featuring the iconic Golden Bridge and stunning views.", "Hue : Immerse yourself in Hue's imperial history and majestic tombs along the Perfume River."],
      inclusions: ['Hotel accommodation', 'Daily breakfast', 'Airport transfers', 'Guided tours', 'Travel insurance']
    },
    3: {
      name: 'Kuching, Malaysia',
      images: [malaysiaImg, malaysiaImg, malaysiaImg],
      description: 'Set off on an unforgettable journey to Kuching, Malaysia, where culture, nature, and adventure await you.',
      highlights: ["Kuching City : Explore the vibrant streets, rich history, and mouth-watering local cuisine.", "Sarawak River Cruise : Experience the breathtaking views of Kuching from the water on a serene river cruise.", "Sarawak Cultural Village : Dive into the heart of Borneo's diverse cultural heritage.", "HuSemenggoh Nature Reserve : Get up close with the magnificent orangutans in their natural habitat."],
      inclusions: ['Hotel accommodation', 'Daily breakfast', 'Airport transfers', 'Guided tours', 'Travel insurance']
    },
    4: {
      name: 'Singapore Bali',
      images: [dubaiImg, dubaiImg, dubaiImg],
      description: "Dive into a 9 Nights/10 Days getaway blending Bali's exotic charm with Singapore's urban allure! Luxurious accommodations with expert tour guidance ensure an extraordinary journey to remember!",
      duration: '9 nights, 10 days',
      highlights: ["Wander through the breathtaking Tegalalang Rice Terrace.", "Immerse yourself in the cultural heart of Bali at Ubud Centre.", "Witness the mesmerizing sunset at Tanah Lot.", "Explore the serene beauty of Bedugal.", "Discover the ancient elegance of Taman Ayun.", "Experience the city's iconic landmarks with a Big Bus & Duck City Tour.", "Be amazed by the futuristic Gardens by the Bay.", "Get up close with exotic birds at Bird Paradise.", "Dive into fun at Sentosa Island, the ultimate playground!"],
      inclusions: ['Hotel accommodation', 'Daily breakfast', 'Airport transfers', 'Guided tours', 'Travel insurance']
    },
    5: {
      name: 'Dubai',
      images: [dubaiImg, dubaiImg, dubaiImg],
      description: 'Experience the diverse and dynamic nature of Dubai, from its modern skyscrapers to its rich cultural heritage and natural beauty.',
      duration: 'Burj Khalifa - Palm Jumeirah - The Dubai Mall - Aquaventure Waterpark - Ski Dubai',
      highlights: ["Burj Khalifa : The tallest building in the world offers stunning views of the city from its observation decks on the 124th, 125th, and 148th floors.", "The Dubai Mall : One of the largest shopping malls globally, it features over 1,200 shops, an aquarium, an ice rink, and the Dubai Fountain.", "Palm Jumeirah : An artificial archipelago, it's home to luxurious hotels, upscale restaurants, and the iconic Atlantis, The Palm resort.", "Desert Safari : Experience the thrill of dune bashing, camel riding, and sandboarding, followed by a traditional Bedouin-style dinner and entertainment.", "Dubai Miracle Garden : The world's largest flower garden features stunning floral displays and themed gardens.", "Aquaventure Waterpark : Located at Atlantis, The Palm, it's one of the largest waterparks in the world with thrilling rides and a private beach.", "Dhow Cruise : Enjoy a dinner cruise on a traditional wooden dhow, with views of the city's skyline and entertainment.", "Ski Dubai : An indoor ski resort located in the Mall of the Emirates, offering skiing, snowboarding, and penguin encounters."],
      inclusions: ['Hotel accommodation', 'Daily breakfast', 'Airport transfers', 'Guided tours', 'Travel insurance']
    }
  },
  domestic: {
    1: {
      name: 'The Golden Triangle',
      images: [goaImg, goaImg, goaImg],
      description:  "Discover the magic of India's Golden Triangle - Delhi, Agra, and Jaipur, with an exclusive package to explore the cultural heritage, stunning architecture, and vibrant traditions of India's most iconic destinations.",
      duration: 'Delhi - Agra - Jaipur',
      highlights: ["Delhi : Experience the perfect blend of history and modernity. Visit iconic landmarks and explore the vibrant capital with its rich history and modern charm.", "Agra : Witness the timeless beauty of the Taj Mahal, a symbol of love, and explore the magnificent Agra Fort. Capture breathtaking views and create memories that last a lifetime.", "Jaipur : Immerse yourself in the royal heritage of the Pink City. Marvel at the grand architecture and history and shop for traditional handicrafts at the local bazaars."],
      inclusions: ['Hotel accommodation', 'Daily breakfast', 'Airport transfers', 'Guided tours', 'Travel insurance']
    },
    2: {
      name: 'Rajasthan',
      images: [rajasthanImg, rajasthanImg, rajasthanImg],
      description: "Usher in a Royal Journey through Rajasthan! Immerse yourself in the luxury and splendor of India's most regal destinations.",
      highlights: ["Jaipur : Explore the Pink City of Jaipur; Wander through the Amber Fort, marvel at the City Palace, and capture the elegance of Hawa Mahal.", "Udaipur : Discover the romantic City of Lakes, Udaipur; Revel in the romance of Lake Pichola, explore the majestic City Palace and unwind at Jag Mandir.", "Jodhpur : Experience the Blue City of Jodhpur; Admire the grandeur of Mehrangarh Fort, indulge in the beauty of Umaid Bhawan Palace, and pay homage to Jaswant Thada."],
      inclusions: ['Hotel accommodation', 'Daily breakfast', 'Airport transfers', 'Guided tours', 'Travel insurance']
    },
    3: {
      name: 'Delhi, Madura, Vrindavan and Agra',
      images: [kashmirImg, kashmirImg, kashmirImg],
      description: "",
      duration: "",
      highlights: [],
      inclusions: ['Hotel accommodation', 'Daily breakfast', 'Airport transfers', 'Guided tours', 'Travel insurance']
    },
    4: {
      name: 'Ayodhya, Varanasi',
      images: [mumbaiImg, mumbaiImg, mumbaiImg],
      description: 'Discover the Sacred Essence of Ayodhya & Varanasi as you embark on a spiritual journey to the timeless city, where history, culture, and devotion come alive.',
      highlights: ["Ayodhya : Explore the birthplace of Lord Rama, visit the ancient temples, and experience the spiritual ambiance of this revered city.", "Varanasi : Witness the mesmerizing Ganga Aarti at Dashashwamedh Ghat, take a boat ride on the sacred Ganges, and visit the famous Kashi Vishwanath Temple."],
      inclusions: ['Hotel accommodation', 'Daily breakfast', 'Airport transfers', 'Guided tours', 'Travel insurance']
    },
  },
  kerala: {
    1: {
      name: 'Munnar - Kumarakom - Alleppey',
      images: [munnarImg, munnarImg, munnarImg],
      description: "Embrace the festive spirit and explore Kerala's lush landscapes and tranquil backwaters this season!",
      highlights: ["Munnar : Explore the sprawling tea plantations, misty mountains, and cascading waterfalls, and enjoy an exclusive tour through the stunning hill station of Munnar.", "Kumarakom : Enjoy the picturesque beauty of Kumarakom, which features lush flowery landscapes and a multicolored bird species.", "Alleppey : Alleppey will take your breath away with its emerald-green backwaters, palm-fringed lakes, and beautiful lush paddy fields. A houseboat cruise on the serene backwaters of Alleppey is an experience of a lifetime."],
      inclusions: ['Hotel accommodation', 'Daily breakfast', 'Airport transfers', 'Guided tours', 'Travel insurance']
    },
    2: {
      name: 'Kochi - Calicut - Wayanad',
      images: [wayanadImg, wayanadImg, wayanadImg],
      description: "Celebrate the festive season with an unforgettable journey through Kerala's cultural and natural splendors!",
      highlights: ["Kochi : Kochi is filled with unexpected wonders and is known for its famous historic museums, iconic fishing nets, and ancient mosques.", "Calicut : Enjoy the lush green countryside, serene beaches, historic sites, and wildlife sanctuaries. Calicut offers the laid-back charm of a distant past and the beauty of spectacular landscapes, waterfalls, beaches, and local cuisine.", "Wayanad : Wayanad, is a pristine slice of paradise that remains far from the maddening crowd. The area is renowned for its abundant camping and trekking trails, breathtaking waterfalls, caves, bird-watching sites, diverse flora and fauna, and its consistently soothing climate year-round."],
      inclusions: ['Hotel accommodation', 'Daily breakfast', 'Airport transfers', 'Guided tours', 'Travel insurance']
    },
  }
};

const TourDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [tour, setTour] = useState(null);
  
  useEffect(() => {
    // Get category from URL query parameters
    const queryParams = new URLSearchParams(window.location.search);
    const category = queryParams.get('category');
    
    if (category && tourData[category] && tourData[category][id]) {
      // If category is specified and valid, use it directly
      setTour(tourData[category][id]);
    } else {
      // Fallback to searching all categories
      for (const cat in tourData) {
        if (tourData[cat][id]) {
          setTour(tourData[cat][id]);
          break;
        }
      }
    }
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

  if (!tour) return <p className="loading">Loading tour details...</p>;

  return (
    <>
      <Navbar />
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
