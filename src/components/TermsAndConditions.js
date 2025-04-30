// src/pages/TermsAndConditions.js
import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TermsAndConditions = () => {
  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">Terms and Conditions</h2>
      <p>
        Welcome to <strong>TripTapp</strong>. By accessing or using our services, you agree to be bound by these Terms and Conditions. Please read them carefully.
      </p>

      <h5>1. Use of Services</h5>
      <p>
        You must be at least 18 years old to use our services. You agree to provide accurate, current, and complete information when making a booking or creating an account.
      </p>

      <h5>2. Booking Policy</h5>
      <ul>
        <li>All bookings are subject to availability and confirmation.</li>
        <li>Prices may change based on demand and availability.</li>
        <li>Ensure your travel documents are valid before booking.</li>
      </ul>

      <h5>3. Cancellations & Refunds</h5>
      <p>
        Cancellation policies vary by service provider (airlines, hotels, etc.). Refunds will be processed based on those policies. TripTapp charges a nominal service fee for cancellations.
      </p>

      <h5>4. User Conduct</h5>
      <ul>
        <li>You agree not to misuse or interfere with our platform or services.</li>
        <li>Unauthorized access or data scraping is strictly prohibited.</li>
      </ul>

      <h5>5. Intellectual Property</h5>
      <p>
        All content, branding, and trademarks on this website are the property of TripTapp. You may not use any materials without written permission.
      </p>

      <h5>6. Limitation of Liability</h5>
      <p>
        TripTapp is not liable for any loss or damage arising from the use or inability to use the services, including but not limited to missed flights or hotel issues.
      </p>

      <h5>7. Governing Law</h5>
      <p>
        These Terms are governed by and construed in accordance with the laws of India. Any disputes will be handled in courts located in Tamil Nadu, India.
      </p>

      <p>
        For questions or concerns regarding these terms, please <a href="/contact">contact us</a>.
      </p>

      <p className="text-muted">Last updated: April 29, 2025</p>
    </Container>
  );
};

export default TermsAndConditions;
