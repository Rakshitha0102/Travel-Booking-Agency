// src/pages/FAQ.js
import React from 'react';
import { Container, Accordion } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const FAQ = () => {
  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">Frequently Asked Questions</h2>
      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>What is TripTapp?</Accordion.Header>
          <Accordion.Body>
            TripTap is your all-in-one platform for booking flights, hotels, and travel experiences. We simplify your travel planning and offer great deals.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>How do I cancel or modify a booking?</Accordion.Header>
          <Accordion.Body>
            You can cancel or modify bookings from your account dashboard. Go to "My Bookings", choose the reservation, and select the desired action.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Are there any hidden charges?</Accordion.Header>
          <Accordion.Body>
            No. TripTapp is transparent with pricing. The final cost is clearly shown before checkout. However, taxes or service charges by hotels or airlines may apply.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Can I contact customer support?</Accordion.Header>
          <Accordion.Body>
            Yes, our support team is available 24/7. Visit the <a href="/contact">Contact Us</a> page to reach out via email or live chat.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>Do I need to create an account to book?</Accordion.Header>
          <Accordion.Body>
            You can browse without an account, but bookings require a free TripTapp account so we can save your itinerary and manage your bookings.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default FAQ;
