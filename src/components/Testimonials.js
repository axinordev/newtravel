import React, { useEffect, useState } from "react";
import "./Testimonials.css";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(
          "http://31.97.205.45:8081/api/reviews_section/"
        );
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  // Auto-slide
  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % testimonials.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [testimonials]);

  const nextTestimonial = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (loading) {
    return (
      <section className="testimonial-section" id="testimonials">
        <h2 className="testimonial-heading">CUSTOMERS SPEAK</h2>
        <p className="text-center text-white">Loading...</p>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="testimonial-section" id="testimonials">
        <h2 className="testimonial-heading">CUSTOMERS SPEAK</h2>
        <p className="text-center text-white">No testimonials available</p>
      </section>
    );
  }

  const current = testimonials[index];

  return (
    <section className="testimonial-section" id="testimonials">
      <h2 className="testimonial-heading">CUSTOMERS SPEAK</h2>

      <div className="testimonial-box">
        <button className="arrow left" onClick={prevTestimonial}>
          <FaChevronLeft />
        </button>

        <div className="testimonial-card">
          <div className="testimonial-content">
            <div className="stars">
              {[...Array(parseInt(current.rating))].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p className="testimonial-text">{current.description}</p>
            <h4 className="testimonial-name">{current.name}</h4>
          </div>
        </div>

        <button className="arrow right" onClick={nextTestimonial}>
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
