// API service for backend communication
const API_BASE_URL = 'https://admin.newalliedtour.net/api'; // Updated with actual backend URL

// Generic fetch function with error handling
const fetchFromAPI = async (endpoint, options = {}) => {
  try {
    console.log(`Fetching from: ${API_BASE_URL}${endpoint}`);
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      console.error(`API error: ${response.status} for ${endpoint}`);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Data received for ${endpoint}:`, data);
    return data;
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

// Tour related API calls
export const tourAPI = {
  // Get all tours
  getAllTours: () => fetchFromAPI('/tours'),
  
  // Get tours by category
  getToursByCategory: (category) => fetchFromAPI(`/tours/category/${category}`),
  
  // Get a specific tour by ID
  getTourById: (id, category) => {
    const endpoint = category 
      ? `/tours/${id}?category=${category}` 
      : `/tours/${id}`;
    return fetchFromAPI(endpoint);
  },
  
  // Get upcoming tours
  getUpcomingTours: () => fetchFromAPI('/tours/upcoming'),
  
  // Get popular destinations
  getPopularDestinations: () => fetchFromAPI('/tours/popular'),
};

// About section API calls
export const aboutAPI = {
  getAboutContent: () => fetchFromAPI('/about_section'),
};

// Upcoming tours API calls
export const upcomingToursAPI = {
  getUpcomingTours: (category) => {
    const endpoint = category 
      ? `/upcoming_tours?category=${category}` 
      : '/upcoming_tours';
    return fetchFromAPI(endpoint);
  },
};

// Gallery related API calls
export const galleryAPI = {
  getGalleryImages: () => fetchFromAPI('/gallery'),
};

// Testimonial related API calls
export const testimonialAPI = {
  getTestimonials: () => fetchFromAPI('/testimonials'),
};

export default {
  tourAPI,
  galleryAPI,
  testimonialAPI,
};