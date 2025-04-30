// components/BookingConfirmation.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function BookingConfirmation() {
  const { bookingRef } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve booking from local storage
    const bookings = JSON.parse(localStorage.getItem('flightBookings') || '[]');
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
        <Link to="/flights" className="btn btn-primary">
          Search for Flights
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-success text-white">
          <h2>Booking Confirmed!</h2>
        </div>
        <div className="card-body">
          <div className="alert alert-success">
            <h4 className="alert-heading">Thank you for your booking!</h4>
            <p>
              Your booking reference is: <strong>{booking.bookingReference}</strong>
            </p>
            <p>
              A confirmation has been sent to <strong>{booking.contactInfo.email}</strong>
            </p>
            <p>
              Package Details sent to <strong>{booking.contactInfo.email}</strong>
            </p>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <h4>Flight Details</h4>
              <div className="card mb-3">
                <div className="card-body">
                  <h5>{booking.flight.airline} - Flight #{booking.flight.flightNumber}</h5>
                  <p>
                    <strong>{booking.flight.origin}</strong> to <strong>{booking.flight.destination}</strong>
                  </p>
                  <p>
                    Departure: {new Date(booking.flight.departureDate).toLocaleDateString()} at {booking.flight.departureTime}
                  </p>
                  <p>Duration: {booking.flight.duration}</p>
                  <p>Passengers: {booking.passengers.length}</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <h4>Passenger Information</h4>
              <div className="card">
                <div className="card-body">
                  {booking.passengers.map((passenger, index) => (
                    <div key={index} className="mb-3">
                      <h6>Passenger {index + 1}</h6>
                      <p>
                        {passenger.firstName} {passenger.lastName}<br />
                        DOB: {passenger.dob}<br />
                        Passport: {passenger.passport}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <h4>Contact Information</h4>
            <div className="card">
              <div className="card-body">
                <p>
                  <strong>{booking.contactInfo.name}</strong><br />
                  {booking.contactInfo.email}<br />
                  {booking.contactInfo.phone}<br />
                  {booking.contactInfo.address}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <Link to="/" className="btn btn-primary me-2">
              Back to Home
            </Link>
            <button className="btn btn-outline-primary">
              Print Booking Confirmation
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

export default BookingConfirmation;