import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GetInTouch from './components/Get_in_touch';
import Map from './components/Map';
import TourDetail from "./components/TourDetail";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/tour/:id" element={<TourDetail />} />
      </Routes>
      <GetInTouch />
      <Map />
      <Footer />
    </Router>

  );
}

export default App;
