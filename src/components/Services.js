import React from "react";
import "./Services.css";

import icon1 from "../assets/icons/car_icon.png";
import icon2 from "../assets/icons/flight_icon.png";
import icon3 from "../assets/icons/beach_icon.png";
import icon4 from "../assets/icons/sailboat_icon.png";
import icon5 from "../assets/icons/passport_icon.png";
import icon6 from "../assets/icons/usa_icon.png";
import icon7 from "../assets/icons/hotel_icon.png";
import icon8 from "../assets/icons/insurance_icon.png";
import icon9 from "../assets/icons/visa_icon.png";

const servicesData = [
  { icon: icon1, title: "Holiday Packages" },
  { icon: icon2, title: "Air Ticketing" },
  { icon: icon3, title: "Hotel Booking" },
  { icon: icon4, title: "Passport Services" },
  { icon: icon5, title: "Car Hire" },
  { icon: icon6, title: "Cruise Booking" },
  { icon: icon7, title: "Travel Insurance" },
  { icon: icon8, title: "Visa Services" },
  { icon: icon9, title: "US Passport Renewal" },
];

const Services = () => {
  return (
    <section id="services" className="services-section">
      <h2 className="services-title">SERVICES WE OFFER</h2>
      <div className="services-icons">
        {servicesData.map((service, index) => (
          <div key={index} className="icon-box">
            <img src={service.icon} alt={service.title} />
            <p className="icon-title">{service.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;


