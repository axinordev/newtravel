import React, { useEffect, useState } from "react";
import heroImage25 from "../assets/images/25_years.png"; // Badge image
import togetherWeGrow from "../assets/images/together_we_grow.png"; // Fixed hero banner
import "./Hero.css";

const Hero = () => {
  const [heroDescription, setHeroDescription] = useState("Loading..."); // Only description from API
  const [introDescription, setIntroDescription] = useState("Loading..."); // Intro section

  // Fetch hero description from API
  useEffect(() => {
    fetch("http://admin.newalliedtour.net:8081/api/hero_section/")
      .then((res) => res.json())
      .then((data) => {
        const description = data.description || "TOGETHER WE GROW";
        setHeroDescription(description);
      })
      .catch(() => setHeroDescription("TOGETHER WE GROW"));
  }, []);

  // Fetch intro section data
  useEffect(() => {
    fetch("http://admin.newalliedtour.net:8081/api/anniversary_section/")
      .then((res) => res.json())
      .then((data) => {
        setIntroDescription(data.description || "");
      })
      .catch(() => setIntroDescription(""));
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        className="siteBanner"
        style={{
          backgroundImage: `url(${togetherWeGrow})`
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
