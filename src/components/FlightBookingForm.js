import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FlightBookingForm() {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [searchData, setSearchData] = useState(null);
  const [passportError, setPassportError] = useState([]);
  const [nameErrors, setNameErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const flight = localStorage.getItem('selectedFlight');
    const search = localStorage.getItem('flightSearch');
    
    if (flight && search) {
      setSelectedFlight(JSON.parse(flight));
      setSearchData(JSON.parse(search));
      
      const passengers = JSON.parse(search).passengers;
      const initialPassengers = Array(passengers).fill().map(() => ({
        firstName: '',
        lastName: '',
        dob: '',
        passport: '',
        gender: 'male',
        seatPreference: 'none'
      }));
      
      setPassengerDetails(initialPassengers);
      setNameErrors(Array(passengers).fill({ firstName: '', lastName: '' }));
    } else {
      navigate('/flights');
    }
  }, [navigate]);

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengerDetails];
    const updatedNameErrors = [...nameErrors];

    if ((field === 'firstName' || field === 'lastName') && /[^a-zA-Z\s]/.test(value)) {
      updatedNameErrors[index][field] = 'Only letters are allowed';
    } else {
      updatedNameErrors[index][field] = '';
      updatedPassengers[index][field] = value;
    }

    setNameErrors(updatedNameErrors);
    setPassengerDetails(updatedPassengers);
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({ ...prev, [name]: value }));
  };

  const validatePassport = (passportNumber) => /^[A-Za-z0-9]{6,9}$/.test(passportNumber);

  const handleSubmit = (e) => {
    e.preventDefault();

    const passportErrors = passengerDetails.map((p) => 
      !validatePassport(p.passport) ? 'Invalid passport number' : ''
    );

    if (passportErrors.some(e => e !== '')) {
      setPassportError(passportErrors);
      return;
    }

    const booking = {
      flight: selectedFlight,
      passengers: passengerDetails,
      contactInfo,
      searchData,
      bookingDate: new Date().toISOString(),
      bookingReference: `BOOK-${Math.random().toString(36).substr(2, 8).toUpperCase()}`
    };

    const existingBookings = JSON.parse(localStorage.getItem('flightBookings') || '[]');
    existingBookings.push(booking);
    localStorage.setItem('flightBookings', JSON.stringify(existingBookings));

    localStorage.removeItem('selectedFlight');
    localStorage.removeItem('flightSearch');

    navigate(`/flights/confirmation/${booking.bookingReference}`);
  };

  if (!selectedFlight || !searchData) {
    return <div className="container mt-5 text-center">Loading booking details...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <h2 className="mb-4">Complete Your Booking</h2>

          <div className="card mb-4">
            <div className="card-header"><h5>Flight Details</h5></div>
            <div className="card-body d-flex justify-content-between">
              <div>
                <h6>{selectedFlight.airline} - Flight #{selectedFlight.flightNumber}</h6>
                <p>
                  {selectedFlight.origin} to {selectedFlight.destination}<br />
                  {new Date(selectedFlight.departureDate).toLocaleDateString()} at {selectedFlight.departureTime}
                </p>
              </div>
              <div className="text-end">
                <h5>${selectedFlight.price}</h5>
                <small>{searchData.passengers} passenger(s)</small>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="card mb-4">
              <div className="card-header"><h5>Passenger Details</h5></div>
              <div className="card-body">
                {passengerDetails.map((passenger, index) => (
                  <div key={index} className="mb-4">
                    <h6>Passenger {index + 1}</h6>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={passenger.firstName}
                          onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                          required
                        />
                        {nameErrors[index]?.firstName && (
                          <div className="text-danger">{nameErrors[index].firstName}</div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={passenger.lastName}
                          onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                          required
                        />
                        {nameErrors[index]?.lastName && (
                          <div className="text-danger">{nameErrors[index].lastName}</div>
                        )}
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Date of Birth</label>
                        <input
                          type="date"
                          className="form-control"
                          value={passenger.dob}
                          onChange={(e) => handlePassengerChange(index, 'dob', e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Gender</label>
                        <select
                          className="form-select"
                          value={passenger.gender}
                          onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Passport Number</label>
                        <input
                          type="text"
                          className="form-control"
                          value={passenger.passport}
                          onChange={(e) => handlePassengerChange(index, 'passport', e.target.value)}
                          required
                        />
                        {passportError[index] && (
                          <div className="text-danger mt-2">{passportError[index]}</div>
                        )}
                      </div>
                      <div className="col-md-12">
                        <label className="form-label">Seat Preference</label>
                        <select
                          className="form-select"
                          value={passenger.seatPreference}
                          onChange={(e) => handlePassengerChange(index, 'seatPreference', e.target.value)}
                        >
                          <option value="none">No Preference</option>
                          <option value="window">Window</option>
                          <option value="aisle">Aisle</option>
                          <option value="middle">Middle</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header"><h5>Contact Information</h5></div>
              <div className="card-body row g-3">
                <div className="col-md-6">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={contactInfo.name}
                    onChange={handleContactChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={contactInfo.email}
                    onChange={handleContactChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={contactInfo.phone}
                    onChange={handleContactChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={contactInfo.address}
                    onChange={handleContactChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-lg">
                Confirm Booking
              </button>
            </div>
          </form>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header"><h5>Price Summary</h5></div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Base Fare ({searchData.passengers} x ${selectedFlight.price})</span>
                <span>${selectedFlight.price * searchData.passengers}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Taxes & Fees</span>
                <span>${Math.round(selectedFlight.price * searchData.passengers * 0.15)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>${Math.round(selectedFlight.price * searchData.passengers * 1.15)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightBookingForm;
