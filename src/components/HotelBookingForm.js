// components/HotelBookingForm.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaBed, FaCreditCard, FaEnvelope, FaPhone, FaStar, FaMapMarkerAlt } from 'react-icons/fa';


function HotelBookingForm() {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [guestInfo, setGuestInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [roomSelection, setRoomSelection] = useState([]);
  const [searchData, setSearchData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const hotel = localStorage.getItem('selectedHotel');
    const search = localStorage.getItem('hotelSearch');
    
    if (hotel && search) {
      setSelectedHotel(JSON.parse(hotel));
      setSearchData(JSON.parse(search));
      
      // Initialize room selection based on number of rooms
      const rooms = JSON.parse(search).rooms;
      const initialRooms = Array(rooms).fill().map(() => ({
        type: 'standard',
        adults: 1,
        children: 0
      }));
      
      setRoomSelection(initialRooms);
    } else {
      navigate('/hotels');
    }
  }, [navigate]);

  const handleGuestInfoChange = (e) => {
    const { name, value } = e.target;
    setGuestInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleRoomChange = (index, field, value) => {
    const updatedRooms = [...roomSelection];
    updatedRooms[index][field] = value;
    setRoomSelection(updatedRooms);
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const booking = {
      hotel: selectedHotel,
      guestInfo,
      rooms: roomSelection,
      searchData,
      paymentMethod,
      cardDetails: paymentMethod === 'creditCard' ? cardDetails : null,
      bookingDate: new Date().toISOString(),
      bookingReference: `HOTEL-${Math.random().toString(36).substr(2, 8).toUpperCase()}`
    };
    
    const existingBookings = JSON.parse(localStorage.getItem('hotelBookings') || '[]');
    existingBookings.push(booking);
    localStorage.setItem('hotelBookings', JSON.stringify(existingBookings));
    
    localStorage.removeItem('selectedHotel');
    localStorage.removeItem('hotelSearch');
    
    navigate(`/hotels/confirmation/${booking.bookingReference}`);
  };

  if (!selectedHotel || !searchData) {
    return <div className="container mt-5 text-center">Loading booking details...</div>;
  }

  // Calculate total price
  const nights = Math.ceil(
    (new Date(searchData.checkOut) - new Date(searchData.checkIn)) / (1000 * 60 * 60 * 24)
  );
  const totalPrice = selectedHotel.price * nights * roomSelection.length;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Complete Your Hotel Booking</h2>
      
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h5>Hotel Details</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <img 
                    src={selectedHotel.image} 
                    className="img-fluid rounded" 
                    alt={selectedHotel.name}
                  />
                </div>
                <div className="col-md-8">
                  <h4>{selectedHotel.name}</h4>
                  <div className="mb-2">
                    {[...Array(selectedHotel.rating)].map((_, i) => (
                      <FaStar key={i} className="text-warning" />
                    ))}
                  </div>
                  <p>
                    <FaMapMarkerAlt className="me-1" /> {selectedHotel.location}
                  </p>
                  <p>
                    Check-in: {new Date(searchData.checkIn).toLocaleDateString()} | 
                    Check-out: {new Date(searchData.checkOut).toLocaleDateString()} | 
                    {nights} {nights === 1 ? 'Night' : 'Nights'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="card mb-4">
              <div className="card-header">
                <h5>Guest Information</h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">First Name</label>
                    <div className="input-group">
                      <span className="input-group-text"><FaUser /></span>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={guestInfo.firstName}
                        onChange={handleGuestInfoChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={guestInfo.lastName}
                      onChange={handleGuestInfoChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <div className="input-group">
                      <span className="input-group-text"><FaEnvelope /></span>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={guestInfo.email}
                        onChange={handleGuestInfoChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone Number</label>
                    <div className="input-group">
                      <span className="input-group-text"><FaPhone /></span>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={guestInfo.phone}
                        onChange={handleGuestInfoChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Special Requests</label>
                    <textarea
                      className="form-control"
                      name="specialRequests"
                      value={guestInfo.specialRequests}
                      onChange={handleGuestInfoChange}
                      rows="3"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card mb-4">
              <div className="card-header">
                <h5>Room Selection</h5>
              </div>
              <div className="card-body">
                {roomSelection.map((room, index) => (
                  <div key={index} className="mb-4 border-bottom pb-3">
                    <h6>Room {index + 1}</h6>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Room Type</label>
                        <select
                          className="form-select"
                          value={room.type}
                          onChange={(e) => handleRoomChange(index, 'type', e.target.value)}
                        >
                          <option value="standard">Standard Room</option>
                          <option value="deluxe">Deluxe Room</option>
                          <option value="suite">Suite</option>
                          <option value="family">Family Room</option>
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label className="form-label">Adults</label>
                        <select
                          className="form-select"
                          value={room.adults}
                          onChange={(e) => handleRoomChange(index, 'adults', parseInt(e.target.value))}
                        >
                          {[1, 2, 3, 4].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label className="form-label">Children</label>
                        <select
                          className="form-select"
                          value={room.children}
                          onChange={(e) => handleRoomChange(index, 'children', parseInt(e.target.value))}
                        >
                          {[0, 1, 2, 3].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="card mb-4">
              <div className="card-header">
                <h5>Payment Method</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="creditCard"
                      value="creditCard"
                      checked={paymentMethod === 'creditCard'}
                      onChange={() => setPaymentMethod('creditCard')}
                    />
                    <label className="form-check-label" htmlFor="creditCard">
                      <FaCreditCard className="me-2" /> Credit Card
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="payAtHotel"
                      value="payAtHotel"
                      checked={paymentMethod === 'payAtHotel'}
                      onChange={() => setPaymentMethod('payAtHotel')}
                    />
                    <label className="form-check-label" htmlFor="payAtHotel">
                      Pay at Hotel
                    </label>
                  </div>
                </div>
                
                {paymentMethod === 'creditCard' && (
                  <div className="row g-3">
                    <div className="col-md-12">
                      <label className="form-label">Card Number</label>
                      <input
                        type="text"
                        className="form-control"
                        name="number"
                        value={cardDetails.number}
                        onChange={handleCardChange}
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Name on Card</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={cardDetails.name}
                        onChange={handleCardChange}
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Expiry Date</label>
                      <input
                        type="text"
                        className="form-control"
                        name="expiry"
                        value={cardDetails.expiry}
                        onChange={handleCardChange}
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">CVV</label>
                      <input
                        type="text"
                        className="form-control"
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={handleCardChange}
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-lg py-3">
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
        
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5>Price Summary</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Room Price ({nights} nights x {roomSelection.length} rooms)</span>
                <span>${selectedHotel.price * nights * roomSelection.length}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Taxes & Fees</span>
                <span>${Math.round(totalPrice * 0.12)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>${Math.round(totalPrice * 1.12)}</span>
              </div>
            </div>
          </div>
          
          <div className="card mt-4">
            <div className="card-header">
              <h5>Cancellation Policy</h5>
            </div>
            <div className="card-body">
              <p className="text-success">
                <strong>Free cancellation</strong> until {new Date(
                  new Date(searchData.checkIn).setDate(new Date(searchData.checkIn).getDate() - 1)
                ).toLocaleDateString()}
              </p>
              <p className="small text-muted">
                Cancel before this date for a full refund. After this date, the first night will be charged.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelBookingForm;