// src/components/Profile.js
import React from 'react';
import { Container, Card, Row, Col, Image, Button } from 'react-bootstrap';
import { FaUserEdit, FaHistory, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/woman.png'; // Using the same profile image

const Profile = () => {
  const { userEmail, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              {/* Profile Header */}
              <div className="text-center mb-4">
                <Image 
                  src={logo} 
                  roundedCircle 
                  width={120}
                  height={120}
                  className="border border-3 border-primary mb-3"
                />
                <h3>{userEmail}</h3>
                <p className="text-muted">Member since {new Date().toLocaleDateString()}</p>
              </div>

              {/* Profile Actions */}
              <div className="d-grid gap-3">
                <Button 
                  variant="outline-primary" 
                  className="d-flex align-items-center justify-content-between py-2"
                  onClick={() => navigate('/user-booking')}
                >
                  <span className="d-flex align-items-center">
                    <FaHistory className="me-2" /> Booking History
                  </span>
                  <span>&rarr;</span>
                </Button>

                

                
              </div>

              {/* Logout Button */}
              <div className="mt-4 pt-3 border-top">
                <Button 
                  variant="danger" 
                  className="w-100 d-flex align-items-center justify-content-center py-2"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="me-2" /> Logout
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;