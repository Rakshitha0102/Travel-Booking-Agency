// src/pages/PrivacyPolicy.js
import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PrivacyPolicy = () => {
  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">Privacy Policy</h2>
      <p>
        At <strong>TripTapp</strong>, we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, and safeguard your data.
      </p>

      <h5>Information We Collect</h5>
      <ul>
        <li>Personal Information: Name, email address, phone number, and payment details.</li>
        <li>Usage Data: IP address, browser type, pages visited, and time spent.</li>
      </ul>

      <h5>How We Use Your Information</h5>
      <ul>
        <li>To provide and manage your bookings.</li>
        <li>To personalize your experience on our platform.</li>
        <li>To send important notifications, updates, and promotional offers (only with your consent).</li>
      </ul>

      <h5>Data Sharing & Security</h5>
      <p>
        We do not sell or rent your personal information. Data may be shared with third-party partners (e.g., airlines, hotels) strictly for booking purposes. We implement industry-standard security measures to protect your data.
      </p>

      <h5>Your Rights</h5>
      <ul>
        <li>You have the right to access, update, or delete your information.</li>
        <li>You can opt out of promotional communications at any time.</li>
      </ul>
      <p>
        For any concerns or questions about your data, please <a href="/contact">contact us</a>.
      </p>

      <p className="text-muted">Last updated: April 29, 2025</p>
    </Container>
  );
};

export default PrivacyPolicy;
