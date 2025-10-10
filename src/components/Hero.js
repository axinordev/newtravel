import React from "react";
import heroImage from "../assets/images/together_we_grow.png";
import heroImage25 from "../assets/images/25_years.png";
import "./Hero.css";

const Hero = () => {
  return (
    <>
      <section
        className="siteBanner"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="overlay"></div>
        <div className="blue-overlay"></div>
        <div className="hero-content">
          <h1 className="m-0 text-uppercase fw-lighter" data-aos="fade-up">
            Together We <strong>G</strong>r<strong>o</strong>w
          </h1>
        </div>
      </section>

      <section className="siteSection siteIntro">
        <div className="container-fluid">
          <div className="row align-items-center gx-lg-5 gy-5">
            <div className="col-lg-4 col-sm-5">
              <img
                className="img-fluid hero-badge"
                src={heroImage25}
                alt="26 years badge" 
                data-aos="zoom-out-right"
                data-aos-anchor-placement="center-bottom"
                data-aos-delay="200"
                data-aos-easing="ease-out-back"
              />
            </div>
            <div className="col-md">
              <p className="mb-3 text-white ps-xl-5 25years">
                For 26 years, we've been discovering new horizons, creating memories, and building connections together. Celebrating <span className="d-inline-block">26 years</span> of going together, growing together!
              </p>
              <p className="m-0 text-white ps-xl-5 25years">
                Since 1999, New Allied Tours and Travels has been your trusted partner in crafting unforgettable journeys. Thank you for being a part of our story. Here’s to many more adventures ahead!
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
