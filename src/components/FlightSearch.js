
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FlightSearch() {
  const [searchData, setSearchData] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    tripType: 'one-way'
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const letterOnlyRegex = /^[A-Za-z\s]+$/;

    if (!letterOnlyRegex.test(searchData.origin) || !letterOnlyRegex.test(searchData.destination)) {
      alert("Please enter valid city or airport names (letters and spaces only).");
      return;
    }

    // Save search data to local storage
    localStorage.setItem('flightSearch', JSON.stringify(searchData));
    navigate('/flights/results');
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2 className="mb-4">Find Your Flight</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">From</label>
              <input 
                type="text" 
                className="form-control" 
                name="origin" 
                value={searchData.origin} 
                onChange={handleChange}
                pattern="[A-Za-z\s]+" 
                title="Only letters and spaces are allowed"
                required 
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">To</label>
              <input 
                type="text" 
                className="form-control" 
                name="destination" 
                value={searchData.destination} 
                onChange={handleChange}
                pattern="[A-Za-z\s]+" 
                title="Only letters and spaces are allowed"
                required 
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 mb-3">
              <label className="form-label">Departure</label>
              <input 
                type="date" 
                className="form-control" 
                name="departureDate" 
                value={searchData.departureDate} 
                onChange={handleChange} 
                required 
              />
            </div>
            {searchData.tripType === 'round-trip' && (
              <div className="col-md-3 mb-3">
                <label className="form-label">Return</label>
                <input 
                  type="date" 
                  className="form-control" 
                  name="returnDate" 
                  value={searchData.returnDate} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            )}
            <div className="col-md-3 mb-3">
              <label className="form-label">Passengers</label>
              <select 
                className="form-select" 
                name="passengers" 
                value={searchData.passengers} 
                onChange={handleChange}
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Trip Type</label>
              <select 
                className="form-select" 
                name="tripType" 
                value={searchData.tripType} 
                onChange={handleChange}
              >
                <option value="one-way">One Way</option>
                <option value="round-trip">Round Trip</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Search Flights</button>
        </form>
      </div>
    </div>
  );
}

export default FlightSearch;
