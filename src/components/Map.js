import React from "react";
import "./Map.css";

const Map = () => {
  return (
    <section id="map" className="map-section">
      <div className="map-container">
        
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.7251338213614!2d76.29344357483546!3d9.956811773776845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0872c0ced3f179%3A0x1217ade09e56f744!2sNew%20Allied%20Tours%20%26%20Travels!5e0!3m2!1sen!2sin!4v1759833254516!5m2!1sen!2sin" 
        title="New Allied Tours Location"
        width="600" 
        height="450" 
        style={{border:0}}
         allowFullScreen="" 
         loading="lazy" 
         referrerPolicy="no-referrer-when-downgrade">
         </iframe>
      </div>
    </section>
  );
};

export default Map;
