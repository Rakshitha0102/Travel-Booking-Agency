

import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-page py-5">
      <Container>
        <h2 className="text-center mb-4">Get in Touch</h2>
        <p className="text-center mb-5">
          We'd love to hear from you! Whether you have a question about bookings, feedback, or just want to say hello.
        </p>
        <Row>
          <Col md={6}>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Your Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" required />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Your Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" required />
              </Form.Group>

              <Form.Group controlId="message">
                <Form.Label>Your Message</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Write your message here..." required />
              </Form.Group>

              <Button type="submit" className="mt-3 w-100">
                Send Message
              </Button>
            </Form>
          </Col>

          <Col md={6} className="mt-4 mt-md-0">
            <div className="map-container">
              <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31106.776516305537!2d80.12568344612649!3d12.949629541257845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525fb1cef75f81%3A0xe2956fefeaa0fa80!2sChromepet%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1745927030800!5m2!1sen!2sin"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" 
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "10px" }}
                allowFullScreen=""
                
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactPage;
