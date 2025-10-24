import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Plan_your_trip.css";
import Testimonials from "./Testimonials";

const Plan_your_trip = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    Destination: "",
    Destination2: "",
    full_name: "",
    location: "",
    email: "",
    phone: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOutsideClick = () => setError("");

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const nextStep = (e) => {
    e.stopPropagation();
    if (!validateStep()) return;
    setStep((prev) => Math.min(prev + 1, 2)); // max 2 steps
    setError("");
  };

  const prevStep = (e) => {
    e.stopPropagation();
    setStep((prev) => Math.max(prev - 1, 1)); // min 1 step
    setError("");
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.Destination || !formData.Destination2) {
          setError("Please fill in both destination fields.");
          return false;
        }
        break;
      case 2:
        if (!formData.full_name || !formData.location || !formData.email || !formData.phone) {
          setError("Please fill in all contact details.");
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.stopPropagation();
    if (!validateStep()) return;

    try {
      await axios.post(
        "https://admin.newalliedtour.net/api/enquiries/",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Form submitted successfully!");
      setFormData({
        Destination: "",
        Destination2: "",
        full_name: "",
        location: "",
        email: "",
        phone: "",
      });
      setStep(1);
      setError("");
    } catch (err) {
      console.error(err.response ? err.response.data : err);
      setError("Failed to submit form. Please check all fields.");
    }
  };

  return (
    <div className="plan-trip-container" id="plan">
      <section className="section-one" onClick={(e) => e.stopPropagation()}>
        <div className="plan-form-wrapper">
          <h2 className="plan-title">PLAN YOUR TRIP</h2>

          <div className="progress-line">
            <div className="progress-fill" style={{ width: `${((step - 1) / 1) * 100}%` }}></div>
            <div className="progress-dot" style={{ left: `calc(${((step - 1) / 1) * 100}% + 0%)` }}></div>
          </div>

          <div className="plan-content">
            {step === 1 && (
              <>
                <h3 className="plan-question">Where would you like to travel?</h3>
                <div className="plan-field">
                  <label>Where would you like to travel?</label>
                  <input
                    type="text"
                    name="Destination"
                    value={formData.Destination}
                    onChange={handleChange}
                    placeholder="Enter main destination"
                  />
                </div>
                <div className="plan-field">
                  <label>Where do you plan to travel next?</label>
                  <input
                    type="text"
                    name="Destination2"
                    value={formData.Destination2}
                    onChange={handleChange}
                    placeholder="Enter other destination"
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="plan-field">
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Full Name"
                  />
                </div>
                <div className="plan-field">
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location"
                  />
                </div>
                <div className="plan-field">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </div>
                <div className="plan-field">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                  />
                </div>
              </>
            )}
          </div>

          {error && <p className="error-text">{error}</p>}

          <div className="button-group">
            {step > 1 && <button className="btn back" onClick={prevStep}>BACK</button>}
            {step === 1 && <button className="btn next" onClick={nextStep}>NEXT</button>}
            {step === 2 && <button className="btn submit" onClick={handleSubmit}>SUBMIT</button>}
          </div>
        </div>
      </section>
      <Testimonials />
    </div>
  );
};

export default Plan_your_trip;
