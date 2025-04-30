import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaCalendarAlt, FaUser, FaMapMarkerAlt } from 'react-icons/fa';

function HotelSearch() {
  const [searchData, setSearchData] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    rooms: 1
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const locationRegex = /^[A-Za-z\s]+$/;
    if (!locationRegex.test(searchData.location)) {
      alert("Please enter a valid location (letters and spaces only).");
      return;
    }

    localStorage.setItem('hotelSearch', JSON.stringify(searchData));
    navigate('/hotels/results');
  };
  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="mb-4"><FaMapMarkerAlt className="me-2" />Find Your Perfect Stay</h2>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Destination</label>
              <div className="input-group">
                <span className="input-group-text"><FaMapMarkerAlt /></span>
                <input 
                  type="text" 
                  className="form-control" 
                  name="location" 
                  value={searchData.location} 
                  onChange={handleChange} 
                  placeholder="City, hotel, or area"
                  required
                  pattern="[A-Za-z\s]+"
                  title="Only letters and spaces are allowed"
                />
              </div>
            </div>

            <div className="col-md-3">
              <label className="form-label">Check-in</label>
              <div className="input-group">
                <span className="input-group-text"><FaCalendarAlt /></span>
                <input 
                  type="date" 
                  className="form-control" 
                  name="checkIn" 
                  value={searchData.checkIn} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            <div className="col-md-3">
              <label className="form-label">Check-out</label>
              <div className="input-group">
                <span className="input-group-text"><FaCalendarAlt /></span>
                <input 
                  type="date" 
                  className="form-control" 
                  name="checkOut" 
                  value={searchData.checkOut} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            <div className="col-md-3">
              <label className="form-label">Guests</label>
              <div className="input-group">
                <span className="input-group-text"><FaUser /></span>
                <select 
                  className="form-select" 
                  name="guests" 
                  value={searchData.guests} 
                  onChange={handleChange}
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Adult' : 'Adults'}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-md-3">
              <label className="form-label">Rooms</label>
              <select 
                className="form-select" 
                name="rooms" 
                value={searchData.rooms} 
                onChange={handleChange}
              >
                {[1, 2, 3, 4].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Room' : 'Rooms'}</option>
                ))}
              </select>
            </div>

            <div className="col-md-12 mt-3">
              <button type="submit" className="btn btn-primary w-100 py-3">
                <FaSearch className="me-2" /> Search Hotels
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HotelSearch;
