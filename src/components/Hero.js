import React, { useEffect, useState } from "react";
import heroImage25 from "../assets/images/25_years.png"; // Badge image
import "./Hero.css";

const Hero = () => {
  const [heroDescription, setHeroDescription] = useState("Loading...");
  const [heroImage, setHeroImage] = useState(""); // <-- For hero background
  const [introDescription, setIntroDescription] = useState("Loading...");

  // Fetch hero section from API
  useEffect(() => {
    fetch("https://admin.newalliedtour.net/api/hero_section/")
      .then((res) => res.json())
      .then((data) => {
        setHeroDescription(data.description || "TOGETHER WE GROW");
        setHeroImage(data.image || ""); // <-- Set image URL from API
      })
      .catch(() => {
        setHeroDescription("TOGETHER WE GROW");
        setHeroImage(""); // fallback to empty or default image
      });
  }, []);

  // Fetch intro section
  useEffect(() => {
    fetch("https://admin.newalliedtour.net/api/anniversary_section/")
      .then((res) => res.json())
      .then((data) => setIntroDescription(data.description || ""))
      .catch(() => setIntroDescription(""));
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        className="siteBanner"
        style={{
          backgroundImage: heroImage ? `url(${heroImage})` : "none"
        }}
      >
        <div className="overlay"></div>
        <div className="blue-overlay"></div>
        <div className="hero-content">
          <h1 className="m-0 text-uppercase fw-lighter" data-aos="fade-up">
            {heroDescription}
          </h1>
        </div>
      </section>

      {/* Intro Section */}
      <section className="siteSection siteIntro">
        <div className="container-fluid">
          <div className="row align-items-center d-flex gx-5">
            <div className="col-lg-4 col-12">
              <img
                className="img-fluid hero-badge"
                src={heroImage25}
                alt="25 years badge"
                data-aos="zoom-out-right"
                data-aos-anchor-placement="center-bottom"
                data-aos-delay="200"
                data-aos-easing="ease-out-back"
              />
            </div>
            <div className="col-lg-8 col-12">
              <p
                className="mb-3 text-white ps-xl-5 25years"
                dangerouslySetInnerHTML={{ __html: introDescription }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
