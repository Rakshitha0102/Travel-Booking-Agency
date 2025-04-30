// src/components/EnhancedNavbar.js
import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { FaUserCircle, FaSun, FaMoon, FaPlane, FaHotel, FaSuitcase, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import airplane from '../assets/airplane.png';
import logo from '../assets/woman.png';
const EnhancedNavbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { isAuthenticated, userEmail, logout } = useAuth();
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('bg-dark');
    document.body.classList.toggle('text-light');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar expand="lg" bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'} sticky="top" className="shadow-sm py-3">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className={`fw-bold fs-3 d-flex align-items-center ${darkMode ? 'text-warning' : 'text-primary'}`}>
          <img
            src={airplane}
            alt="TripTapp Logo"
            width="30"
            height="30"
            className="me-2"
          />
          TripTapp
        </Navbar.Brand>

        {/* Mobile Menu Toggle */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Navbar Links */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className="mx-2 fs-5">Home</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="mx-2 fs-5">Contact</Nav.Link>


        
            
            {/* Book Travel Dropdown - Only show when authenticated */}
            {isAuthenticated && (
              <NavDropdown 
                title={<span className="fs-5">Book Travel</span>} 
                id="book-travel-dropdown"
                className="mx-2"
              >
                <NavDropdown.Item as={Link} to="/flights" className="d-flex align-items-center">
                  <FaPlane className="me-2" /> Flights
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/hotels" className="d-flex align-items-center">
                  <FaHotel className="me-2" /> Hotels
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/packages" className="d-flex align-items-center">
                  <FaSuitcase className="me-2" /> Packages
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/user-booking">
                  My Bookings
                </NavDropdown.Item>
              </NavDropdown>
            )}

            {/* Dark Mode Toggle */}
            <Button 
              variant={darkMode ? 'warning' : 'dark'} 
              className="ms-3" 
              onClick={toggleDarkMode}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </Button>

            {/* User Account Dropdown */}
            <NavDropdown
              title={
                <div className="d-flex align-items-center">
                  <img 
  src={logo} 
  className="rounded-circle border me-2"
  width="32"
  height="32"
/>
                  {isAuthenticated && userEmail && (
                    <span className="ms-2 d-none d-lg-inline">{userEmail}</span>
                  )}
                </div>
              }
              id="account-dropdown"
              align="end"
              className="ms-3"
              drop={window.innerWidth < 768 ? 'start' : 'down'}
            >
              {isAuthenticated ? (
                <>
                  <NavDropdown.Item as={Link} to="/profile">  {/* Changed from /user-booking */}
  My Account
</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} className="text-danger">
                    <FaSignOutAlt className="me-2" /> Logout
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/signup">Sign Up</NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

        {/* Quick Book Button - Visible on mobile when authenticated */}
        {isAuthenticated && (
          <Button 
            as={Link} 
            to="/flights" 
            variant={darkMode ? "warning" : "primary"} 
            className="d-lg-none ms-2 fw-bold"
            size="sm"
          >
            Book
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default EnhancedNavbar;