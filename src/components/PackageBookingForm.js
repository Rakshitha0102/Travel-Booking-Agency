// components/PackageBookingForm.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaPlane, FaHotel, FaCar, FaUtensils, FaSuitcase, FaCreditCard ,FaStar} from 'react-icons/fa';

function PackageBookingForm() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [travelerInfo, setTravelerInfo] = useState({
    primary: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    travelers: []
  });
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [searchData, setSearchData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const pkg = localStorage.getItem('selectedPackage');
    const search = localStorage.getItem('packageSearch');
    
    if (pkg && search) {
      setSelectedPackage(JSON.parse(pkg));
      setSearchData(JSON.parse(search));
      
      // Initialize traveler info
      const travelers = JSON.parse(search).travelers;
      const initialTravelers = Array(travelers).fill().map((_, i) => ({
        id: i,
        firstName: '',
        lastName: '',
        dob: '',
        passport: ''
      }));
      
      setTravelerInfo({
        primary: {
          firstName: '',
          lastName: '',
          email: '',
          phone: ''
        },
        travelers: initialTravelers
      });
    } else {
      navigate('/packages');
    }
  }, [navigate]);

  const handlePrimaryChange = (e) => {
    const { name, value } = e.target;
    setTravelerInfo(prev => ({
      ...prev,
      primary: {
        ...prev.primary,
        [name]: value
      }
    }));
  };

  const handleTravelerChange = (index, field, value) => {
    const updatedTravelers = [...travelerInfo.travelers];
    updatedTravelers[index][field] = value;
    setTravelerInfo(prev => ({
      ...prev,
      travelers: updatedTravelers
    }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const booking = {
      package: selectedPackage,
      travelerInfo,
      searchData,
      paymentMethod,
      cardDetails: paymentMethod === 'creditCard' ? cardDetails : null,
      bookingDate: new Date().toISOString(),
      bookingReference: `PKG-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      totalPrice: selectedPackage.price * searchData.travelers
    };
    
    const existingBookings = JSON.parse(localStorage.getItem('packageBookings') || '[]');
    existingBookings.push(booking);
    localStorage.setItem('packageBookings', JSON.stringify(existingBookings));
    
    localStorage.removeItem('selectedPackage');
    localStorage.removeItem('packageSearch');
    
    navigate(`/packages/confirmation/${booking.bookingReference}`);
  };

  if (!selectedPackage || !searchData) {
    return <div className="container mt-5 text-center">Loading booking details...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Complete Your Package Booking</h2>
      
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h5>Package Details</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <img 
                    src={selectedPackage.image} 
                    className="img-fluid rounded" 
                    alt={selectedPackage.name}
                  />
                </div>
                <div className="col-md-8">
                  <h4>{selectedPackage.name}</h4>
                  <div className="mb-2">
                    {[...Array(selectedPackage.rating)].map((_, i) => (
                      <FaStar key={i} className="text-warning" />
                    ))}
                  </div>
                  <p>
                    Destination: {selectedPackage.destination}<br />
                    Departure: {new Date(searchData.departureDate).toLocaleDateString()}<br />
                    Duration: {selectedPackage.duration} Nights
                  </p>
                  
                  <div className="package-includes mt-3">
                    <h6>Package Includes:</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {selectedPackage.includes.flight && <span className="badge bg-light text-dark"><FaPlane className="me-1" /> Flight</span>}
                      {selectedPackage.includes.hotel && <span className="badge bg-light text-dark"><FaHotel className="me-1" /> Hotel</span>}
                      {selectedPackage.includes.car && <span className="badge bg-light text-dark"><FaCar className="me-1" /> Car Rental</span>}
                      {selectedPackage.includes.meals && <span className="badge bg-light text-dark"><FaUtensils className="me-1" /> Meals</span>}
                      {selectedPackage.includes.tours && <span className="badge bg-light text-dark"><FaSuitcase className="me-1" /> Tours</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="card mb-4">
              <div className="card-header">
                <h5>Primary Contact Information</h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={travelerInfo.primary.firstName}
                      onChange={handlePrimaryChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={travelerInfo.primary.lastName}
                      onChange={handlePrimaryChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={travelerInfo.primary.email}
                      onChange={handlePrimaryChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={travelerInfo.primary.phone}
                      onChange={handlePrimaryChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card mb-4">
              <div className="card-header">
                <h5>Traveler Details</h5>
              </div>
              <div className="card-body">
                {travelerInfo.travelers.map((traveler, index) => (
                  <div key={index} className="mb-4 border-bottom pb-3">
                    <h6>Traveler {index + 1}</h6>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={traveler.firstName}
                          onChange={(e) => handleTravelerChange(index, 'firstName', e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={traveler.lastName}
                          onChange={(e) => handleTravelerChange(index, 'lastName', e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Date of Birth</label>
                        <input
                          type="date"
                          className="form-control"
                          value={traveler.dob}
                          onChange={(e) => handleTravelerChange(index, 'dob', e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Passport Number</label>
                        <input
                          type="text"
                          className="form-control"
                          value={traveler.passport}
                          onChange={(e) => handleTravelerChange(index, 'passport', e.target.value)}
                          required
                        />
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
                      id="payLater"
                      value="payLater"
                      checked={paymentMethod === 'payLater'}
                      onChange={() => setPaymentMethod('payLater')}
                    />
                    <label className="form-check-label" htmlFor="payLater">
                      Pay Later (At Destination)
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
                Confirm Package Booking
              </button>
            </div>
          </form>
        </div>
        
        <div className="col-md-4">
          <div className="card sticky-top" style={{top: '20px'}}>
            <div className="card-header">
              <h5>Price Summary</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Package Price ({searchData.travelers} travelers)</span>
                <span>${selectedPackage.price * searchData.travelers}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Taxes & Fees</span>
                <span>${Math.round(selectedPackage.price * searchData.travelers * 0.1)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2 text-success">
                <span>You Save</span>
                <span>-${selectedPackage.savings * searchData.travelers}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>${Math.round((selectedPackage.price * searchData.travelers * 1.1) - (selectedPackage.savings * searchData.travelers))}</span>
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
                  new Date(searchData.departureDate).setDate(new Date(searchData.departureDate).getDate() - 14)
                ).toLocaleDateString()}
              </p>
              <p className="small text-muted">
                Cancel before this date for a full refund. After this date, cancellation fees may apply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageBookingForm;