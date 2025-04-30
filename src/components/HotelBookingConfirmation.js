// components/HotelBookingConfirmation.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCheckCircle, FaStar, FaMapMarkerAlt, FaBed, FaUser } from 'react-icons/fa';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

function HotelBookingConfirmation() {
  const { bookingRef } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem('hotelBookings') || '[]');
    const foundBooking = bookings.find(b => b.bookingReference === bookingRef);
    
    if (foundBooking) {
      setBooking(foundBooking);
    }
    setLoading(false);
  }, [bookingRef]);

  if (loading) {
    return <div className="container mt-5 text-center">Loading booking details...</div>;
  }

  if (!booking) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          Booking not found. Please check your booking reference.
        </div>
        <Link to="/hotels" className="btn btn-primary">
          Search for Hotels
        </Link>
      </div>
    );
  }

  const nights = Math.ceil(
    (new Date(booking.searchData.checkOut) - new Date(booking.searchData.checkIn)) / (1000 * 60 * 60 * 24)
  );
  const totalPrice = booking.hotel.price * nights * booking.rooms.length;

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-success text-white">
          <div className="d-flex align-items-center">
            <FaCheckCircle size={32} className="me-3" />
            <div>
              <h2 className="mb-0">Booking Confirmed!</h2>
              <p className="mb-0">Your reservation is complete</p>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="alert alert-success">
            <h4 className="alert-heading">Thank you for your booking!</h4>
            <p>
              Your booking reference is: <strong>{booking.bookingReference}</strong>
            </p>
            <p>
              A confirmation has been sent to <strong>{booking.guestInfo.email}</strong>
            </p>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <h4>Hotel Details</h4>
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    
                    <div className="col-md-8">
                      <h5>{booking.hotel.name}</h5>
                      <div className="mb-2">
                        {[...Array(booking.hotel.rating)].map((_, i) => (
                          <FaStar key={i} className="text-warning" />
                        ))}
                      </div>
                      <p>
                        <FaMapMarkerAlt className="me-1" /> {booking.hotel.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <h4>Stay Details</h4>
              <div className="card mb-3">
                <div className="card-body">
                  <p>
                    <strong>Check-in:</strong> {new Date(booking.searchData.checkIn).toLocaleDateString()}<br />
                    <strong>Check-out:</strong> {new Date(booking.searchData.checkOut).toLocaleDateString()}<br />
                    <strong>Duration:</strong> {nights} {nights === 1 ? 'Night' : 'Nights'}
                  </p>
                  <p>
                    <strong>Guests:</strong> {booking.searchData.guests} Adults
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <h4>Booking Summary</h4>
              <div className="card mb-3">
                <div className="card-body">
                  <h5>Rooms</h5>
                  {booking.rooms.map((room, index) => (
                    <div key={index} className="mb-2">
                      <p className="mb-1">
                        <FaBed className="me-2" /> Room {index + 1}: {room.type.charAt(0).toUpperCase() + room.type.slice(1)} Room
                      </p>
                      <small className="text-muted">
                        {room.adults} {room.adults === 1 ? 'Adult' : 'Adults'}{room.children > 0 && `, ${room.children} ${room.children === 1 ? 'Child' : 'Children'}`}
                      </small>
                    </div>
                  ))}
                  
                  <hr />
                  
                  <div className="d-flex justify-content-between mb-1">
                    <span>Room Charges:</span>
                    <span>${booking.hotel.price * nights * booking.rooms.length}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span>Taxes & Fees:</span>
                    <span>${Math.round(totalPrice * 0.12)}</span>
                  </div>
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total Paid:</span>
                    <span>${Math.round(totalPrice * 1.12)}</span>
                  </div>
                </div>
              </div>
              
              <h4>Guest Information</h4>
              <div className="card">
                <div className="card-body">
                  <p>
                    <strong>{booking.guestInfo.firstName} {booking.guestInfo.lastName}</strong><br />
                    <FaEnvelope className="me-1" /> {booking.guestInfo.email}<br />
                    <FaPhone className="me-1" /> {booking.guestInfo.phone}
                  </p>
                  {booking.guestInfo.specialRequests && (
                    <>
                      <h5>Special Requests</h5>
                      <p>{booking.guestInfo.specialRequests}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <Link to="/" className="btn btn-primary me-2">
              Back to Home
            </Link>
            <button className="btn btn-outline-primary me-2">
              Print Confirmation
            </button>
            <Link to="/user-booking" className="btn btn-outline-secondary">
                                      View All Bookings
                                    </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelBookingConfirmation;