// src/components/Footer.js
import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { FaFacebookF, FaXTwitter, FaInstagram } from 'react-icons/fa6';
import './Footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <div className="footer bg-light text-light pt-5 pb-3 mt-5">
      <Container>
        <Row className="mb-4">
          <Col md={6}>
            <h4 className="text-warning">TripTapp</h4>
            <p className="text-muted">
              Your go-to platform for booking flights, hotels, and travel experiences.
              We make travel easy and enjoyable with the best prices and support.
            </p>
          </Col>

          <Col md={3}>
            <h6 className="text-warning mb-3">Quick Links</h6>
            <Nav className="flex-column">
              <Nav.Link href="/about" className="footer-link">About Us</Nav.Link>
              <Nav.Link href="/contact" className="footer-link">Contact</Nav.Link>
              <Nav.Link href="/faq" className="footer-link">FAQ</Nav.Link>
              <Nav.Link href="/privacy-policy" className="footer-link">Privacy Policy</Nav.Link>
              <Nav.Link href="/terms-and-conditions" className="footer-link">Terms & Conditions</Nav.Link>
            </Nav>
          </Col>

          <Col md={3}>
            <h6 className="text-warning mb-3">Follow Us</h6>
            <Nav className="flex-column">
              <Nav.Link href="https://www.facebook.com/" className="footer-link d-flex align-items-center gap-2">
                <FaFacebookF /> Facebook
              </Nav.Link>
              <Nav.Link href="https://x.com/" className="footer-link d-flex align-items-center gap-2">
                <FaXTwitter /> X
              </Nav.Link>
              <Nav.Link href="https://www.instagram.com/" className="footer-link d-flex align-items-center gap-2">
                <FaInstagram /> Instagram
              </Nav.Link>
            </Nav>
          </Col>
        </Row>

        <hr className="footer-line" />

        <Row className="text-center">
          <Col>
            <p className="mb-0 text-muted">© {new Date().getFullYear()} TripTapp. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
