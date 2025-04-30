// components/UserBookings.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlane, FaHotel, FaGift, FaUser, FaCalendarAlt, FaMapMarkerAlt, FaBed } from 'react-icons/fa';

function UserBookings() {
  const [activeTab, setActiveTab] = useState('flights');
  const [bookings, setBookings] = useState({
    flights: [],
    hotels: [],
    packages: []
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Load all booking types from storage with proper fallbacks
    setBookings({
      flights: JSON.parse(localStorage.getItem('flightBookings') || '[]'),
      hotels: JSON.parse(localStorage.getItem('hotelBookings') || '[]'),
      packages: JSON.parse(localStorage.getItem('packageBookings') || '[]')
    });
  }, []);

  const cancelBooking = (type, id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      const updated = bookings[type].filter(item => item.bookingReference !== id);
      setBookings(prev => ({ ...prev, [type]: updated }));
      localStorage.setItem(`${type}Bookings`, JSON.stringify(updated));
    }
  };

  // Helper to calculate nights for hotel stays
  const calculateNights = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;
    const diff = new Date(checkOut) - new Date(checkIn);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Helper to render guests information
  const renderGuests = (guests) => {
    if (!guests) return '0 guests';
    if (typeof guests === 'number') return `${guests} guest${guests !== 1 ? 's' : ''}`;
    return `${guests.adults || 0} adult${guests.adults !== 1 ? 's' : ''}${
      guests.children ? `, ${guests.children} child${guests.children !== 1 ? 'ren' : ''}` : ''
    }`;
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Bookings</h2>
      
      {/* Tab Navigation */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'flights' ? 'active' : ''}`}
            onClick={() => setActiveTab('flights')}
          >
            <FaPlane className="me-2" /> Flights
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'hotels' ? 'active' : ''}`}
            onClick={() => setActiveTab('hotels')}
          >
            <FaHotel className="me-2" /> Hotels
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'packages' ? 'active' : ''}`}
            onClick={() => setActiveTab('packages')}
          >
            <FaGift className="me-2" /> Packages
          </button>
        </li>
      </ul>

      {/* Content Tabs */}
      {bookings[activeTab].length === 0 ? (
        <div className="alert alert-info">
          No {activeTab} bookings found. <Link to={`/${activeTab}`}>Browse {activeTab}</Link>
        </div>
      ) : (
        <div className="list-group">
          {bookings[activeTab].map((booking, index) => (
            <div key={index} className="list-group-item list-group-item-action mb-3">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">
                  {activeTab === 'flights' && (
                    <>
                      <FaPlane className="me-2" />
                      {booking.flight?.origin || 'N/A'} → {booking.flight?.destination || 'N/A'}
                    </>
                  )}
                  {activeTab === 'hotels' && (
                    <>
                      <FaHotel className="me-2" />
                      {booking.hotel?.name || 'Hotel Booking'}
                    </>
                  )}
                  {activeTab === 'packages' && (
                    <>
                      <FaGift className="me-2" />
                      {booking.package?.name || 'Travel Package'}
                    </>
                  )}
                </h5>
                <small className="text-muted">
                  Ref: {booking.bookingReference || 'N/A'}
                </small>
              </div>

              <div className="mb-2">
                {activeTab === 'flights' && (
                  <>
                    <span className="badge bg-primary me-2">
                      <FaCalendarAlt className="me-1" />
                      {booking.flight?.departureDate ? new Date(booking.flight.departureDate).toLocaleDateString() : 'N/A'}
                    </span>
                    <span>
                      <FaUser className="me-1" />
                      {booking.passengers?.length || 0} passenger{booking.passengers?.length !== 1 ? 's' : ''}
                    </span>
                  </>
                )}

                {activeTab === 'hotels' && (
                  <>
                    <span className="badge bg-primary me-2">
                      <FaCalendarAlt className="me-1" />
                      {booking.searchData?.checkIn ? new Date(booking.searchData.checkIn).toLocaleDateString() : 'N/A'} -{' '}
                      {booking.searchData?.checkOut ? new Date(booking.searchData.checkOut).toLocaleDateString() : 'N/A'}
                    </span>
                    <span>
                      <FaBed className="me-1" />
                      {booking.rooms?.length || 0} room{booking.rooms?.length !== 1 ? 's' : ''}, {renderGuests(booking.searchData?.guests)}
                    </span>
                    {booking.hotel?.location && (
                      <span className="ms-2">
                        <FaMapMarkerAlt className="me-1" />
                        {booking.hotel.location}
                      </span>
                    )}
                  </>
                )}

                {activeTab === 'packages' && (
                  <>
                   
                  </>
                )}
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <strong className="text-success">
                  ${activeTab === 'flights' 
                    ? booking.flight 
                      ? Math.round(booking.flight.price * (booking.passengers?.length || 1) * 1.15) 
                      : 0
                    : activeTab === 'hotels'
                      ? booking.hotel
                        ? Math.round(booking.hotel.price * calculateNights(
                            booking.searchData?.checkIn, 
                            booking.searchData?.checkOut
                          ) * (booking.rooms?.length || 1) * 1.12)
                        : 0
                      : booking.package
                        ? booking.package.price
                        : 0
                  }
                </strong>
                <div>
                  <Link
                    to={`/${activeTab}/confirmation/${booking.bookingReference}`}
                    className="btn btn-sm btn-outline-primary me-2"
                  >
                    View Details
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => cancelBooking(activeTab, booking.bookingReference)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserBookings;