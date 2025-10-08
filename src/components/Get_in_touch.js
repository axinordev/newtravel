import React from "react";
import "./Get_in_touch.css";

const GetInTouch = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* LEFT SIDE - CONTACT DETAILS */}
        <div className="contact-info">
          <h2>GET IN TOUCH</h2>

          <div className="info-block">
            <h4>ADDRESS</h4>
            <p>New Allied Tours & Travels</p>
            <p>(A Unit of Cochin Tours & Travels Pvt Ltd)</p>
            <p>G-308, Panampilly Nagar, Cochin-682036,</p>
            <p>Kerala - India.</p>
          </div>

          <div className="info-block">
            <h4>PHONE</h4>
            <p>+91 484 4028084 / +91 7558825552</p>
          </div>

          <div className="info-block">
            <h4>WHATSAPP</h4>
            <p>+91 7558825552</p>
          </div>

          <div className="info-block">
            <h4>EMAIL</h4>
            <p>tours@newalliedtour.net</p>
          </div>
        </div>

        {/* RIGHT SIDE - CONTACT FORM */}
        <div className="contact-form">
          <form>
            <input type="text" placeholder="Full Name*" required />
            <input type="tel" placeholder="Phone Number*" required />
            <input type="email" placeholder="Email*" required />
            <textarea placeholder="Your Message" rows="5"></textarea>
            <button type="submit">SEND MESSAGE</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
