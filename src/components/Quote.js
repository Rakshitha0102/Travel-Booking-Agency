import React, { useState } from 'react';
import { FaUmbrellaBeach, FaMountain, FaCity, FaShip, 
         FaThumbsUp, FaShieldAlt, FaHeadset, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const blogPosts = [
  {
    title: "Top 10 Beaches for 2024",
    excerpt: "Discover this year's most breathtaking beach destinations...",
    content: "From the Maldives to Maui, this list features serene coastlines, vibrant coral reefs, and hidden coves waiting to be explored. Whether you're looking for relaxation or adventure, these beaches offer something for everyone."
  },
  {
    title: "Packing Hacks for Stress-Free Travel",
    excerpt: "How to pack efficiently for any type of vacation...",
    content: "Say goodbye to overpacking! Learn how to roll clothes, use packing cubes, and choose the right luggage to make your travel hassle-free and organized."
  },
  {
    title: "Hidden Gems in Europe",
    excerpt: "Underrated destinations to avoid the crowds this summer...",
    content: "Explore offbeat towns like Český Krumlov, Hallstatt, and Dinant that boast charm, history, and fewer tourists — perfect for a unique European getaway."
  }
];

const DefaultPage = () => {
  const navigate = useNavigate();
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleSubscribe = () => {
    navigate('/');
  };

  const openBlog = (index) => setSelectedBlog(blogPosts[index]);
  const closeBlog = () => setSelectedBlog(null);

  return (
    <div className="home-page">

      {/* Vacation Types */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Explore by Vacation Type</h2>
          <div className="row g-4">
            {[
              { icon: <FaUmbrellaBeach size={48} />, title: "Beach Vacations", desc: "Sun, sand, and relaxation" },
              { icon: <FaMountain size={48} />, title: "Mountain Getaways", desc: "Fresh air and stunning views" },
              { icon: <FaCity size={48} />, title: "City Breaks", desc: "Culture, shopping, and nightlife" },
              { icon: <FaShip size={48} />, title: "Cruises", desc: "All-inclusive ocean adventures" }
            ].map((item, index) => (
              <div key={index} className="col-md-3">
                <div className="card h-100 border-0 shadow-sm text-center p-4">
                  <div className="text-primary mb-3">{item.icon}</div>
                  <h5>{item.title}</h5>
                  <p className="text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Book With Us */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Why Book With Us?</h2>
          <div className="row g-4">
            {[
              { icon: <FaThumbsUp size={36} />, title: "Best Price Guarantee", desc: "We'll match or beat any competitor's price" },
              { icon: <FaShieldAlt size={36} />, title: "Flexible Cancellation", desc: "Free cancellation on most bookings" },
              { icon: <FaHeadset size={36} />, title: "24/7 Customer Support", desc: "Our travel experts are always available" }
            ].map((item, index) => (
              <div key={index} className="col-md-4">
                <div className="d-flex">
                  <div className="me-4 text-primary">{item.icon}</div>
                  <div>
                    <h5>{item.title}</h5>
                    <p className="text-muted">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">What Our Travelers Say</h2>
          <div className="row g-4">
            {[
              { name: "Rakshitha M.", quote: "The booking process was so easy and our vacation was perfect!" },
              { name: "Harshini C.", quote: "Great prices and excellent customer service when we needed to make changes." },
              { name: "Brindha K", quote: "Found an amazing deal we couldn't get anywhere else. Will book again!" }
            ].map((item, index) => (
              <div key={index} className="col-md-4">
                <div className="card h-100 p-4 shadow-sm">
                  <div className="mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-warning" />
                    ))}
                  </div>
                  <p className="fst-italic">"{item.quote}"</p>
                  <p className="fw-bold mt-auto mb-0">— {item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5 bg-primary text-white">
        <div className="container text-center">
          <h2 className="mb-4">Ready for Your Next Adventure?</h2>
          <p className="lead mb-4">Sign up for exclusive deals and travel inspiration</p>
          <div className="d-flex justify-content-center">
            <div className="input-group mb-3" style={{ maxWidth: '500px' }}>
              <input 
                type="email" 
                className="form-control" 
                placeholder="Your email address" 
              />
              <button 
                className="btn btn-dark"
                onClick={handleSubscribe}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Tips/Blog Preview */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Travel Tips & Inspiration</h2>
          <div className="row g-4">
            {blogPosts.map((item, index) => (
              <div key={index} className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <h5>{item.title}</h5>
                    <p className="text-muted">{item.excerpt}</p>
                    <button className="btn btn-link ps-0" onClick={() => openBlog(index)}>
                      Read more
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Modal */}
      <Modal show={!!selectedBlog} onHide={closeBlog} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedBlog?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedBlog?.content}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeBlog}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default DefaultPage;
