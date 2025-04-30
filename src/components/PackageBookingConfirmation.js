import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCheckCircle, FaStar, FaPlane, FaHotel, FaCar, FaUtensils, FaSuitcase } from 'react-icons/fa';

function PackageBookingConfirmation() {
  const { bookingRef } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem('packageBookings') || '[]');
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
        <Link to="/packages" className="btn btn-primary">
          Search for Packages
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-success text-white">
          <div className="d-flex align-items-center">
            <FaCheckCircle size={32} className="me-3" />
            <div>
              <h2 className="mb-0">Package Booked!</h2>
              <p className="mb-0">Your vacation is confirmed</p>
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
              A confirmation has been sent to <strong>{booking.travelerInfo.primary.email}</strong>
            </p>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <h4>Package Details</h4>
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    
                    <div className="col-md-8">
                      <h5>{booking.package.name}</h5>
                      <div className="mb-2">
                        {[...Array(booking.package.rating)].map((_, i) => (
                          <FaStar key={i} className="text-warning" />
                        ))}
                      </div>
                      <p>
                        Destination: {booking.package.destination}<br />
                        Departure: {new Date(booking.searchData.departureDate).toLocaleDateString()}<br />
                        Duration: {booking.package.duration} Nights
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <h6>Package Includes:</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {booking.package.includes.flight && <span className="badge bg-light text-dark"><FaPlane className="me-1" /> Flight</span>}
                      {booking.package.includes.hotel && <span className="badge bg-light text-dark"><FaHotel className="me-1" /> Hotel</span>}
                      {booking.package.includes.car && <span className="badge bg-light text-dark"><FaCar className="me-1" /> Car Rental</span>}
                      {booking.package.includes.meals && <span className="badge bg-light text-dark"><FaUtensils className="me-1" /> Meals</span>}
                      {booking.package.includes.tours && <span className="badge bg-light text-dark"><FaSuitcase className="me-1" /> Tours</span>}
                    </div>
                  </div>
                </div>
              </div>
              
              <h4>Travelers</h4>
              <div className="card mb-3">
                <div className="card-body">
                  <h6>Primary Contact</h6>
                  <p>
                    <strong>{booking.travelerInfo.primary.firstName} {booking.travelerInfo.primary.lastName}</strong><br />
                    Email: {booking.travelerInfo.primary.email}<br />
                    Phone: {booking.travelerInfo.primary.phone}
                  </p>

                  <hr />

                  <h6 className="mt-3">Travelers</h6>
                  {booking.travelerInfo.travelers.map((traveler, index) => (
                    <div key={index} className="mb-2">
                      <p>
                        <strong>Traveler {index + 1}:</strong> {traveler.firstName} {traveler.lastName}<br />
                        Date of Birth: {traveler.dob}<br />
                        Passport: {traveler.passport}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <h4>Booking Summary</h4>
              <div className="card mb-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Package Price ({booking.searchData.travelers} travelers)</span>
                    <span>${booking.package.price * booking.searchData.travelers}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Taxes & Fees</span>
                    <span>${Math.round(booking.package.price * booking.searchData.travelers * 0.1)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2 text-success">
                    <span>You Saved</span>
                    <span>-${booking.package.savings * booking.searchData.travelers}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total Paid</span>
                    <span>${Math.round((booking.package.price * booking.searchData.travelers * 1.1) - (booking.package.savings * booking.searchData.travelers))}</span>
                  </div>
                </div>
              </div>

              <h4>Payment Method</h4>
              <div className="card mb-3">
                <div className="card-body">
                  <p>
                    <strong>{booking.paymentMethod === 'creditCard' ? 'Credit Card' : 'Pay at Destination'}</strong>
                  </p>
                  {booking.paymentMethod === 'creditCard' && booking.cardDetails && (
                    <div>
                      <p>Card ending in: **** **** **** {booking.cardDetails.number.slice(-4)}</p>
                      <p>Expires: {booking.cardDetails.expiry}</p>
                    </div>
                  )}
                </div>
              </div>

              <h4>Next Steps</h4>
              <div className="card">
                <div className="card-body">
                  <ol className="list-group list-group-numbered">
                    <li className="list-group-item border-0 ps-0">Check your email for booking confirmation</li>
                    <li className="list-group-item border-0 ps-0">Review travel requirements for your destination</li>
                    <li className="list-group-item border-0 ps-0">Complete any necessary check-in procedures</li>
                    <li className="list-group-item border-0 ps-0">Pack your bags and get ready for your trip!</li>
                    <li className="list-group-item border-0 ps-0">Pakage Details sent to registered email</li>
                  </ol>
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

export default PackageBookingConfirmation;