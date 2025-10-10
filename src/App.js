import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GetInTouch from './components/Get_in_touch';
import Map from './components/Map';

function App() {
  return (
<Router>
  <Navbar /> {/* Always visible */}
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/gallery" element={<Gallery />} />
  </Routes>
  <GetInTouch/>
  <Map/>
  <Footer /> {/* Always visible */}
</Router>
  );
}

export default App;