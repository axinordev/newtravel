import React, { useEffect, useState } from "react";
import "./Hero.css";

const Hero = () => {
  const [heroDescription, setHeroDescription] = useState("Loading...");
  const [heroImage, setHeroImage] = useState(""); // Hero background image
  const [introDescription, setIntroDescription] = useState("Loading...");
  const [anniversaryImage, setAnniversaryImage] = useState(""); // ✅ Anniversary badge image

  // Fetch hero section from API
  useEffect(() => {
    fetch("https://admin.newalliedtour.net/api/hero_section/")
      .then((res) => res.json())
      .then((data) => {
        setHeroDescription(data.description || "TOGETHER WE GROW");
        setHeroImage(data.image || "");
      })
      .catch(() => {
        setHeroDescription("TOGETHER WE GROW");
        setHeroImage("");
      });
  }, []);

  // Fetch anniversary section (description + image)
  useEffect(() => {
    fetch("https://admin.newalliedtour.net/api/anniversary_section/")
      .then((res) => res.json())
      .then((data) => {
        const anniversaryData = Array.isArray(data) ? data[0] : data;
        setIntroDescription(anniversaryData.description || "");
        setAnniversaryImage(anniversaryData.logo || ""); // <-- Fetch image dynamically
      })
      .catch(() => {
        setIntroDescription("");
        setAnniversaryImage(""); // fallback
      });
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

      {/* Intro / Anniversary Section */}
      <section className="siteSection siteIntro">
        <div className="container-fluid">
          <div className="row align-items-center d-flex gx-5">
            <div className="col-lg-4 col-12">
              {anniversaryImage && (
                <img
                  className="img-fluid hero-badge"
                  src={anniversaryImage}
                  alt="Anniversary Badge"
                  data-aos="zoom-out-right"
                  data-aos-anchor-placement="center-bottom"
                  data-aos-delay="200"
                  data-aos-easing="ease-out-back"
                />
              )}
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
