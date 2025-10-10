import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Plan_your_trip from '../components/Plan_your_trip';



function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Plan_your_trip />
    </>
  );
}

export default Home;
