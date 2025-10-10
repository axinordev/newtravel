import React, { useEffect, useState } from "react";
import "./Testimonials.css";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";

// 👇 Import your user images (add them in src/assets/testimonials/)
import user1 from "../assets/testimonials/user1.jpg";
import user2 from "../assets/testimonials/user1.jpg";
import user3 from "../assets/testimonials/user1.jpg";

const testimonials = [
  {
    id: 1,
    text: "Great trip by all means. Congratulations and thanks to Capt Shastry and his office support team.",
    name: "Mr RajMohan",
    image: user1,
  },
  {
    id: 2,
    text: "Children had a great time. They enjoyed very much. They were really sad to come back. Thank you so much for this great opportunity.... A school exchange program in Singapore.",
    name: "School Exchange Program - Singapore",
    image: user2,
  },
  {
    id: 3,
    text: "Excellent coordination and hospitality. Truly memorable experience for all our students.",
    name: "Student Group - Malaysia Tour",
    image: user3,
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const nextTestimonial = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 4000); // Auto slide every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="testimonial-section" id="testimonials">
      <h2 className="testimonial-heading">CUSTOMERS SPEAK</h2>
      <div className="testimonial-box">
        <button className="arrow left" onClick={prevTestimonial}>
          <FaChevronLeft />
        </button>

        <div className="testimonial-card">
          <div className="user-image-wrapper">
            <img
              src={testimonials[index].image}
              alt={testimonials[index].name}
              className="user-image"
            />
          </div>

          <div className="testimonial-content">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p className="testimonial-text">{testimonials[index].text}</p>
            <h4 className="testimonial-name">{testimonials[index].name}</h4>
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
