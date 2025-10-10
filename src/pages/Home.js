import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Plan_your_trip from '../components/Plan_your_trip';
import GetInTouch from '../components/Get_in_touch';
import Map from '../components/Map';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function Home() {
  return (
    <>
        <Navbar/>
      <Hero />
      <About />
      <Services />
      <Plan_your_trip />
      <GetInTouch />
      <Map />
      <Footer />
    </>
  );
}

export default Home;
