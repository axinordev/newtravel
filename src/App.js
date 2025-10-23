import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GetInTouch from './components/Get_in_touch';
import Map from './components/Map';
import TourDetail from "./components/TourDetail";

// --- ScrollToTop component ---
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
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
