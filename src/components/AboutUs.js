// src/components/AboutUs.js

import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './AboutUs.css'; // Optional styling
import aImage from '../assets/c.png';

const AboutUs = () => {
  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background:'lightblue',
        
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
    <div className="about-us py-5">
      <Container>
        <h2 className="text-center fw-bold mb-5">🙌 About Us</h2>
        <Row className="align-items-center">
          <Col md={6}>
          <Image src={aImage} alt="Team working together"

              fluid
              rounded
            />
          </Col>
          <Col md={6}>
            <h4 className="fw-bold mb-3">Who We Are</h4>
            <p>
              We are a passionate travel and technology team dedicated to bringing you the best experiences from around the world. From curating top destinations to ensuring smooth bookings, we aim to make your travel dreams a reality.
            </p>
            <h4 className="fw-bold mb-3 mt-4">Our Mission</h4>
            <p>
              Our mission is to simplify travel for everyone — by offering trusted recommendations, easy-to-use platforms, and personalized services. Whether you’re planning a vacation, a work trip, or an adventure, we’ve got you covered.
            </p>
          </Col>
        </Row>
      </Container>
    </div></div>
  );
};

export default AboutUs;
