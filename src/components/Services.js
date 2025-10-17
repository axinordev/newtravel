import React, { useEffect, useState } from "react";
import "./Services.css";

const Services = () => {
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    fetch("https://admin.newalliedtour.net/api/service_section/")
      .then((res) => res.json())
      .then((data) => setServicesData(data))
      .catch((err) => console.error("Failed to fetch services:", err));
  }, []);

  return (
    <section id="services" className="services-section">
      <h2 className="services-title">SERVICES WE OFFER</h2>
      <div className="services-icons">
        {servicesData.map((service) => (
          <div key={service.id} className="icon-box">
            <img
              src={`https://admin.newalliedtour.net${service.image}`}
              alt={service.title}
            />
            <p className="icon-title">{service.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
