// components/PackageSearch.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaCalendarAlt, FaUser, FaMapMarkerAlt, FaPlane, FaHotel } from 'react-icons/fa';

// Import local images for popular packages
import caribbeanImage from '../assets/caribbean.jpg';
import europeImage from '../assets/europe.jpg';
import alaskaImage from '../assets/alaskan.jpg';
import alpsImage from '../assets/swiss.jpg';

function PackageSearch() {
  const [searchData, setSearchData] = useState({
    destination: '',
    departureDate: '',
    duration: 7,
    travelers: 2,
    packageType: 'all'
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('packageSearch', JSON.stringify(searchData));
    navigate('/packages/results');
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="mb-4"><FaMapMarkerAlt className="me-2" />Find Your Perfect Vacation Package</h2>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Destination</label>
              <div className="input-group">
                <span className="input-group-text"><FaMapMarkerAlt /></span>
                <input 
                  type="text" 
                  className="form-control" 
                  name="destination" 
                  value={searchData.destination} 
                  onChange={handleChange} 
                  placeholder="Country, city, or region"
                  required 
                />
              </div>
            </div>
            
            <div className="col-md-3">
              <label className="form-label">Departure Date</label>
              <div className="input-group">
                <span className="input-group-text"><FaCalendarAlt /></span>
                <input 
                  type="date" 
                  className="form-control" 
                  name="departureDate" 
                  value={searchData.departureDate} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            
            <div className="col-md-3">
              <label className="form-label">Duration (nights)</label>
              <select 
                className="form-select" 
                name="duration" 
                value={searchData.duration} 
                onChange={handleChange}
              >
                {[3, 4, 5, 7, 10, 14].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Night' : 'Nights'}</option>
                ))}
              </select>
            </div>
            
            <div className="col-md-4">
              <label className="form-label">Travelers</label>
              <div className="input-group">
                <span className="input-group-text"><FaUser /></span>
                <select 
                  className="form-select" 
                  name="travelers" 
                  value={searchData.travelers} 
                  onChange={handleChange}
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="col-md-4">
              <label className="form-label">Package Type</label>
              <select 
                className="form-select" 
                name="packageType" 
                value={searchData.packageType} 
                onChange={handleChange}
              >
                <option value="all">All Packages</option>
                <option value="beach">Beach Vacation</option>
                <option value="mountain">Mountain Getaway</option>
                <option value="city">City Break</option>
                <option value="cruise">Cruise Package</option>
              </select>
            </div>
            
            <div className="col-md-4">
              <label className="form-label">Budget</label>
              <select 
                className="form-select" 
                name="budget" 
                value={searchData.budget} 
                onChange={handleChange}
              >
                <option value="any">Any Budget</option>
                <option value="economy">Economy ($500-$1000)</option>
                <option value="standard">Standard ($1000-$2000)</option>
                <option value="luxury">Luxury ($2000+)</option>
              </select>
            </div>
            
            <div className="col-md-12 mt-3">
              <button type="submit" className="btn btn-primary w-100 py-3">
                <FaSearch className="me-2" /> Search Packages
              </button>
            </div>
          </div>
        </form>
      </div>
      
      {/* Popular Packages Section */}
      <div className="mt-5">
        <h4 className="mb-4">Popular Vacation Packages</h4>
        <div className="row g-4">
          {[
            { id: 1, name: 'Caribbean Paradise', type: 'beach', price: 1299, duration: 7, image: caribbeanImage },
            { id: 2, name: 'European Adventure', type: 'city', price: 1899, duration: 10, image: europeImage },
            { id: 3, name: 'Alaskan Cruise', type: 'cruise', price: 2199, duration: 7, image: alaskaImage },
            { id: 4, name: 'Swiss Alps Retreat', type: 'mountain', price: 1599, duration: 5, image: alpsImage }
          ].map(pkg => (
            <div key={pkg.id} className="col-md-3">
              <div className="card h-100 shadow-sm">
                <img 
                  src={pkg.image} 
                  className="card-img-top" 
                  alt={pkg.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{pkg.name}</h5>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="badge bg-info">{pkg.type.charAt(0).toUpperCase() + pkg.type.slice(1)}</span>
                    <span>{pkg.duration} Nights</span>
                  </div>
                  <p className="card-text">From ${pkg.price}/person</p>
                </div>
                <div className="card-footer bg-white">
                  <button 
                    className="btn btn-sm btn-outline-primary w-100"
                    onClick={() => {
                      localStorage.setItem('packageSearch', JSON.stringify({
                        destination: pkg.name.split(' ')[0],
                        departureDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0],
                        duration: pkg.duration,
                        travelers: 2,
                        packageType: pkg.type
                      }));
                      navigate('/packages/results');
                    }}
                  >
                    View Deal
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PackageSearch;