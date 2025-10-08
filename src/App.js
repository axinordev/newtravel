import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import 'bootstrap/dist/css/bootstrap.min.css';
import Services from './components/Services';
import Map from './components/Map';
import Footer from './components/Footer';
import About from './components/About';
import GetInTouch from './components/Get_in_touch';
import Plan_your_trip from './components/Plan_your_trip';

function App() {
  return (
    <>
      <Navbar />
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

export default App;
