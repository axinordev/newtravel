import React, { useEffect, useState } from "react";
import "./Get_in_touch.css";

const GetInTouch = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState("");

  // Fetch contact info from API
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch(
          "http://31.97.205.45:8081/api/admin_contact_section/"
        );
        const data = await response.json();
        setContactInfo(data || {});
      } catch (error) {
        console.error("Error fetching contact info:", error);
        setContactInfo({});
      }
    };
    fetchContactInfo();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("Submitting...");
    try {
      const response = await fetch(
        "http://31.97.205.45:8081/api/get_in_touch/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        setSubmitStatus("Message sent successfully!");
        setFormData({ fullname: "", phone: "", email: "", message: "" });
      } else {
        setSubmitStatus("Failed to send message.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("Error submitting form.");
    }
  };

  if (!contactInfo) {
    return (
      <section className="contact-section" id="contact">
        <div className="contact-container">
          <p className="text-center text-white">Loading contact info...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* LEFT SIDE - CONTACT DETAILS */}
        <div className="contact-info">
          <h2>GET IN TOUCH</h2>

          <div className="info-block">
            <h4>ADDRESS</h4>
            <p>{contactInfo.address}</p>
          </div>

          <div className="info-block">
            <h4>PHONE</h4>
            <p>
              +91 {contactInfo.phone || "N/A"} / +91{" "}
              {contactInfo.whatsapp_contact || "N/A"}
            </p>
          </div>

          <div className="info-block">
            <h4>WHATSAPP</h4>
            {contactInfo.whatsapp_contact ? (
              <p
                href={
                  contactInfo.whatsapp_link ||
                  `https://wa.me/${contactInfo.whatsapp_contact}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                +91 {contactInfo.whatsapp_contact}
              </p>
            ) : (
              "N/A"
            )}
          </div>

          <div className="info-block">
            <h4>EMAIL</h4>
            <p>{contactInfo.email || "N/A"}</p>
          </div>

          {/* SOCIAL LINKS */}
         <div className="info-block social-links">
            {contactInfo.facebook_link && (
              <a
                href={contactInfo.facebook_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                
              </a>
            )}
            {contactInfo.instagram_link && (
              <a
                href={contactInfo.instagram_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                
              </a>
            )}
            {contactInfo.x_link && (
              <a
                href={contactInfo.x_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                
              </a>
            )}
            {contactInfo.youtube_link && (
              <a
                href={contactInfo.youtube_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                
              </a> 
            )}
          </div>
        </div> 

        {/* RIGHT SIDE - CONTACT FORM */}
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullname"
              placeholder="Full Name*"
              required
              value={formData.fullname}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number*"
              required
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email*"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <button type="submit">SEND MESSAGE</button>
            {submitStatus && <p className="submit-status">{submitStatus}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
