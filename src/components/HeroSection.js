import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import Typical from 'react-typical';
import './HeroSection.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // <-- Import useNavigate

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate(); // <-- Initialize navigate

  const handleSearch = () => {
    if (query.trim()) window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };

  return (
    <div className="hero-section d-flex align-items-center justify-content-center text-center">
      <Container>
        <h1 className="display-2 fw-bold mb-4">
          Explore the World with{' '}
          <span style={{ color: '#0d6efd' }}>
  <div className="typical-wrapper">
    <Typical
      steps={[
        'TripTapp ✈️', 2000,
        'Book Flights ✈️', 2000,
        'Find Hotels 🏨', 2000,
        'Discover Adventures 🌍', 2000,
      ]}
      loop={Infinity}
      wrapper="b"
    />
  </div>
</span>
        </h1>
        <p className="lead mb-4 fs-5" style={{ color: '#0d6efd' }}>
          Find your next adventure. Book flights, hotels, and experiences — all in one place.
        </p>

      
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Button variant="primary" size="lg" onClick={() => navigate('/hotels')}>
            Hotels
          </Button>
          <Button variant="success" size="lg" onClick={() => navigate('/flights')}>
            Flights
          </Button>
          <Button variant="warning" size="lg" onClick={() => navigate('/packages')}>
            Packages
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default HeroSection;
