import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Plan_your_trip.css";
import Testimonials from "./Testimonials";

const Plan_your_trip = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    Destination: "",
    Destination2: "",
    Number_of_People: "",
    Departure_Month: "",
    Trip_Duration: "",
    lodging_preference: "",
    budget_per_person: "",
    how_strict_budget: "",
    full_name: "",
    location: "",
    email: "",
    phone: "",
    Age_Groups: "",
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
        if (!formData.Destination || !formData.Destination2) {
          setError("Please fill in both destination fields.");
          return false;
        }
        break;
      case 2:
        if (!formData.Number_of_People) {
          setError("Please select number of travelers.");
          return false;
        }
        break;
      case 3:
        if (!formData.Departure_Month || !formData.Trip_Duration) {
          setError("Please fill in your travel time details.");
          return false;
        }
        break;
      case 4:
        if (!formData.lodging_preference) {
          setError("Please specify your lodging preference.");
          return false;
        }
        break;
      case 5:
        if (!formData.budget_per_person || !formData.how_strict_budget) {
          setError("Please enter your budget and select budget type.");
          return false;
        }
        break;
      case 6:
        if (
          !formData.full_name ||
          !formData.location ||
          !formData.email ||
          !formData.phone ||
          !formData.Age_Groups
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
        Number_of_People: "",
        Departure_Month: "",
        Trip_Duration: "",
        lodging_preference: "",
        budget_per_person: "",
        how_strict_budget: "",
        full_name: "",
        location: "",
        email: "",
        phone: "",
        Age_Groups: "",
      });
      setStep(1);
      setError("");
    } catch (err) {
      console.error(err.response ? err.response.data : err);
      setError("Failed to submit form. Please check all fields.");
    }
  };

  // Dropdown options
  const numberOfPeopleOptions = ["1","2","3","4","5","6","7","8","9","10+"];
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const tripDurations = ["1 Day","2 Days","3 Days","4 Days","5 Days","6 Days","7 Days","8 Days","9 Days","10 Days","11 Days","12 Days","13 Days","14+ Days"];
  const lodgingOptions = ["5 Star","4 Star","3 Star","2 Star","Camping"];
  const budgetTypes = ["Estimate","Flexible","Maximum"];
  const ageGroups = ["5 and below","6-11","12-17","18-35","36-49","50-64","65+"];

  return (
    <div className="plan-trip-container" id="plan">
      <section className="section-one" onClick={(e) => e.stopPropagation()}>
        <div className="plan-form-wrapper">
          <h2 className="plan-title">PLAN YOUR TRIP</h2>

          <div className="progress-line">
            <div className="progress-fill" style={{ width: `${((step - 1)/5)*100}%` }}></div>
            <div className="progress-dot" style={{ left: `calc(${((step-1)/5)*100}% + 0%)` }}></div>
          </div>

          <div className="plan-content">
            {step === 1 && (
              <>
                <h3 className="plan-question">Where would you like to travel?</h3>
                <div className="plan-field">
                  <label>Main destination</label>
                  <input type="text" name="Destination" value={formData.Destination} onChange={handleChange} placeholder="Enter main destination"/>
                </div>
                <div className="plan-field">
                  <label>Other destinations</label>
                  <input type="text" name="Destination2" value={formData.Destination2} onChange={handleChange} placeholder="Enter other destinations"/>
                </div>
              </>
            )}

            {step === 2 && (
              <div className="plan-field">
                <label>Total number of travelers</label>
                <select name="Number_of_People" value={formData.Number_of_People} onChange={handleChange} className="styled-dropdown">
                  <option value="">Select</option>
                  {numberOfPeopleOptions.map((num) => <option key={num} value={num}>{num}</option>)}
                </select>
              </div>
            )}

            {step === 3 && (
              <>
                <div className="plan-field">
                  <label>Departure Month</label>
                  <select name="Departure_Month" value={formData.Departure_Month} onChange={handleChange} className="styled-dropdown">
                    <option value="">Select month</option>
                    {months.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className="plan-field">
                  <label>Trip Duration</label>
                  <select name="Trip_Duration" value={formData.Trip_Duration} onChange={handleChange} className="styled-dropdown">
                    <option value="">Select duration</option>
                    {tripDurations.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </>
            )}

            {step === 4 && (
              <div className="plan-field">
                <label>Lodging Preference</label>
                <select name="lodging_preference" value={formData.lodging_preference} onChange={handleChange} className="styled-dropdown">
                  <option value="">Select lodging</option>
                  {lodgingOptions.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            )}

            {step === 5 && (
              <>
                <div className="plan-field">
                  <label>Budget per person</label>
                  <input type="number" className="budget" name="budget_per_person" value={formData.budget_per_person} onChange={handleChange} placeholder="Enter budget"/>
                </div>
                <div className="plan-field">
                  <label>How strict is your budget?</label>
                  <select name="how_strict_budget" value={formData.how_strict_budget} onChange={handleChange} className="styled-dropdown">
                    <option value="">Select</option>
                    {budgetTypes.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </>
            )}

            {step === 6 && (
              <>
                <div className="plan-field">
                  <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Full Name"/>
                </div>
                <div className="plan-field">
                  <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location"/>
                </div>
                <div className="plan-field">
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email"/>
                </div>
                <div className="plan-field">
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number"/>
                </div>
                <div className="plan-field">
                  <label>Age Group</label>
                  <select name="Age_Groups" value={formData.Age_Groups} onChange={handleChange} className="styled-dropdown">
                    <option value="">Select Age Group</option>
                    {ageGroups.map((age) => <option key={age} value={age}>{age}</option>)}
                  </select>
                </div>
              </>
            )}
          </div>

          {error && <p className="error-text">{error}</p>}

          <div className="button-group">
            {step > 1 && <button className="btn back" onClick={prevStep}>BACK</button>}
            {step < 6 ? (
              <button className="btn next" onClick={nextStep}>NEXT</button>
            ) : (
              <button className="btn submit" onClick={handleSubmit}>SUBMIT</button>
            )}
          </div>
        </div>
      </section>
      <Testimonials/>
    </div>
  );
};

export default Plan_your_trip;
