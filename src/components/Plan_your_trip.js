import React, { useState, useEffect } from "react";
import "./Plan_your_trip.css";
import Testimonials from "./Testimonials";

const Plan_your_trip = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destinationMain: "",
    destinationOther: "",
    travelers: "",
    departureMonth: "",
    duration: "",
    lodging: "",
    budget: "",
    fullName: "",
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
    e.stopPropagation(); // prevent outside click from removing error instantly
    if (!validateStep()) return;
    setStep((prev) => Math.min(prev + 1, 6));
    setError("");
  };

  const prevStep = (e) => {
    e.stopPropagation();
    setStep((prev) => Math.max(prev - 1, 1));
    setError("");
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.destinationMain || !formData.destinationOther) {
          setError("Please fill in both destination fields.");
          return false;
        }
        break;
      case 2:
        if (!formData.travelers) {
          setError("Please enter the number of travelers.");
          return false;
        }
        break;
      case 3:
        if (!formData.departureMonth || !formData.duration) {
          setError("Please fill in your travel time details.");
          return false;
        }
        break;
      case 4:
        if (!formData.lodging) {
          setError("Please specify your lodging preference.");
          return false;
        }
        break;
      case 5:
        if (!formData.budget) {
          setError("Please enter your budget.");
          return false;
        }
        break;
      case 6:
        if (
          !formData.fullName ||
          !formData.location ||
          !formData.email ||
          !formData.phone
        ) {
          setError("Please fill in all contact details.");
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.stopPropagation();
    if (!validateStep()) return;
    alert("Form submitted successfully!");
    setError("");
  };

  return (
    <div className="plan-trip-container" id="plan">
      <section className="section-one" onClick={(e) => e.stopPropagation()}>
        <div className="plan-form-wrapper">
          <h2 className="plan-title">PLAN YOUR TRIP</h2>

          {/* Progress Bar */}
          <div className="progress-line">
            <div
              className="progress-fill"
              style={{ width: `${((step - 1) / 5) * 100}%` }}
            ></div>
            <div
              className="progress-dot"
              style={{ left: `calc(${((step - 1) / 5) * 100}% + 0%)` }}
            ></div>
          </div>

          {/* Step Content */}
          <div className="plan-content">
            {step === 1 && (
              <>
                <h3 className="plan-question">Where would you like to travel?</h3>
                <div className="plan-field">
                  <label>
                    Which destination is most important for you to visit?
                  </label>
                  <input
                    type="text"
                    name="destinationMain"
                    value={formData.destinationMain}
                    onChange={handleChange}
                    placeholder="Enter main destination"
                  />
                </div>

                <div className="plan-field">
                  <label>Which other destinations you wish to travel?</label>
                  <input
                    type="text"
                    name="destinationOther"
                    value={formData.destinationOther}
                    onChange={handleChange}
                    placeholder="Enter other destinations"
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h3 className="plan-question">Who is traveling?</h3>
                <div className="plan-field">
                  <label>Total number of travelers:</label>
                  <input
                    type="text"
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleChange}
                    placeholder="Number of travelers"
                  />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h3 className="plan-question">When will you be traveling?</h3>
                <div className="plan-field">
                  <label>Approximate departure month</label>
                  <input
                    type="text"
                    name="departureMonth"
                    value={formData.departureMonth}
                    onChange={handleChange}
                    placeholder="Month"
                  />
                </div>
                <div className="plan-field">
                  <label>Preferred duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="Duration in days"
                  />
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h3 className="plan-question">What type of lodging do you want?</h3>
                <div className="plan-field">
                  <label>Lodging preference</label>
                  <input
                    type="text"
                    name="lodging"
                    value={formData.lodging}
                    onChange={handleChange}
                    placeholder="Hotel / Resort / Villa"
                  />
                </div>
              </>
            )}

            {step === 5 && (
              <>
                <h3 className="plan-question">Budget</h3>
                <div className="plan-field">
                  <label>What is your budget per person?</label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="Enter budget"
                  />
                </div>
              </>
            )}

            {step === 6 && (
              <>
                <h3 className="plan-question">How should we contact you?</h3>
                <div className="plan-field">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
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

          {/* Warning message shown just before buttons */}
          {error && <p className="error-text">{error}</p>}

          {/* Buttons */}
          <div className="button-group">
            {step > 1 && (
              <button className="btn back" onClick={prevStep}>
                BACK
              </button>
            )}
            {step < 6 ? (
              <button className="btn next" onClick={nextStep}>
                NEXT
              </button>
            ) : (
              <button className="btn submit" onClick={handleSubmit}>
                SUBMIT
              </button>
            )}
          </div>
        </div>
      </section>
      <Testimonials/>
    </div>
  );
};

export default Plan_your_trip;
