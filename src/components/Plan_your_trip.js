import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Plan_your_trip.css";
import Testimonials from "./Testimonials";

const Plan_your_trip = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    Destination: "",
    Destination2: "",
    travelPlans: "", // step 2 field
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
    setStep((prev) => Math.min(prev + 1, 3)); // max 3 steps
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
        if (!formData.Destination) {
          setError("Please fill destination field.");
          return false;
        }
        break;
      case 2:
        if (!formData.travelPlans) {
          setError("Please share your travel plans.");
          return false;
        }
        break;
      case 3:
        if (!formData.email || !formData.phone) {
          setError("Please fill in both email and phone number.");
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
      // Send only the fields expected by backend
      const payload = {
        Destination: formData.Destination,
        Destination2: formData.Destination2,
        travelPlans: formData.travelPlans,
        email: formData.email,
        phone: formData.phone,
      };

      await axios.post(
        "https://admin.newalliedtour.net/api/enquiries/",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Form submitted successfully!");
      setFormData({
        Destination: "",
        Destination2: "",
        travelPlans: "",
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
            <div
              className="progress-fill"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>
            <div
              className="progress-dot"
              style={{ left: `calc(${((step - 1) / 2) * 100}% + 0%)` }}
            ></div>
          </div>

          <div className="plan-content">
            {step === 1 && (
              <>
                {/* <h3 className="plan-question">Which are your favourite destinations?</h3> */}
                <div className="plan-field">
                  <label>Which are your favourite destinations?</label>
                  <input
                    type="text"
                    name="Destination"
                    value={formData.Destination}
                    onChange={handleChange}
                    placeholder="Which are your favourite destinations?"
                  />
                </div>
                <div className="plan-field">
                  <label>Where do you plan to travel next?</label>
                  <input
                    type="text"
                    name="Destination2"
                    value={formData.Destination2}
                    onChange={handleChange}
                    placeholder="Where do you plan to travel next?"
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h3 className="plan-question">Share Your Travel Plans</h3>
                <div className="plan-field">
                  <label>
                    Share your travel plans with us{" "}
                    <a
                      href="mailto:queriesnewallied@gmail.com"
                      style={{ color: "#0078d7", textDecoration: "underline" }}
                    >
                      @queriesnewallied@gmail.com
                    </a>
                  </label>
                  <textarea
                    name="travelPlans"
                    value={formData.travelPlans}
                    onChange={handleChange}
                    placeholder="Write your travel plans here..."
                    rows={6} // bigger textarea
                    style={{ resize: "vertical" }} // vertical resize
                  />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="plan-field">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </div>
                <div className="plan-field">
                  <label>Phone Number:</label>
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
            {step < 3 && <button className="btn next" onClick={nextStep}>NEXT</button>}
            {step === 3 && <button className="btn submit" onClick={handleSubmit}>SUBMIT</button>}
          </div>
        </div>
      </section>
      <Testimonials />
    </div>
  );
};

export default Plan_your_trip;
