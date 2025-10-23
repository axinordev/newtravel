import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import PlanYourTrip from "../components/Plan_your_trip";
import Favicon from "../assets/upcoming_tours/NA_Favicon.jpg";

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const section = document.querySelector(location.hash);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 100); // small delay ensures the page has rendered
      }
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>New Allied Tours & Travels</title>
        <link rel="icon" type="image/png" href={Favicon} />
        <meta property="og:title" content="New Allied Tours - Explore the World" />
        <meta property="og:description" content="Plan your perfect trip with New Allied Tours." />
        <meta property="og:image" content="%PUBLIC_URL%/social-preview.png" />
      </Helmet>

      <Hero />
      <About />
      <Services />
      <PlanYourTrip />
    </>
  );
}

export default Home;
