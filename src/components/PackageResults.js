// components/PackageResults.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaPlane, FaHotel, FaCar, FaUtensils, FaSuitcase } from 'react-icons/fa';

function PackageResults() {
  const [packages, setPackages] = useState([]);
  const [searchData, setSearchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 3000,
    rating: 0,
    packageType: 'all'
  });
  const navigate = useNavigate();

  useEffect(() => {
    const savedSearch = localStorage.getItem('packageSearch');
    if (savedSearch) {
      setSearchData(JSON.parse(savedSearch));
      
      setTimeout(() => {
        const mockPackages = generateMockPackages(JSON.parse(savedSearch));
        setPackages(mockPackages);
        setLoading(false);
      }, 1000);
    } else {
      navigate('/packages');
    }
  }, [navigate]);

  const handleSelectPackage = (pkg) => {
    localStorage.setItem('selectedPackage', JSON.stringify(pkg));
    navigate('/packages/booking');
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredPackages = packages.filter(pkg => {
    return (
      pkg.price >= filters.minPrice &&
      pkg.price <= filters.maxPrice &&
      pkg.rating >= filters.rating &&
      (filters.packageType === 'all' || pkg.type === filters.packageType)
    );
  });

  if (loading) {
    return <div className="container mt-5 text-center">Loading packages...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h5>Filters</h5>
            </div>
            <div className="card-body">
              <h6>Price Range</h6>
              <div className="mb-3">
                <label className="form-label">${filters.minPrice} - ${filters.maxPrice}</label>
                <div className="d-flex justify-content-between">
                  <input
                    type="range"
                    className="form-range"
                    min="0"
                    max="3000"
                    step="100"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                  />
                  <input
                    type="range"
                    className="form-range"
                    min="0"
                    max="3000"
                    step="100"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>
              
              <h6>Package Type</h6>
              <div className="mb-3">
                <select
                  className="form-select"
                  name="packageType"
                  value={filters.packageType}
                  onChange={handleFilterChange}
                >
                  <option value="all">All Types</option>
                  <option value="beach">Beach Vacation</option>
                  <option value="mountain">Mountain Getaway</option>
                  <option value="city">City Break</option>
                  <option value="cruise">Cruise Package</option>
                </select>
              </div>
              
              <h6>Star Rating</h6>
              <div className="mb-3">
                {[5, 4, 3].map(stars => (
                  <div key={stars} className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="rating"
                      id={`rating-${stars}`}
                      value={stars}
                      checked={filters.rating === stars}
                      onChange={handleFilterChange}
                    />
                    <label className="form-check-label" htmlFor={`rating-${stars}`}>
                      {[...Array(stars)].map((_, i) => (
                        <FaStar key={i} className="text-warning" />
                      ))}
                    </label>
                  </div>
                ))}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="rating"
                    id="rating-0"
                    value="0"
                    checked={filters.rating === 0}
                    onChange={handleFilterChange}
                  />
                  <label className="form-check-label" htmlFor="rating-0">
                    Any Rating
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-9">
          <div className="card mb-4">
            <div className="card-body">
              <h5>Search Details</h5>
              <p>
                {searchData.destination} | 
                Departure: {new Date(searchData.departureDate).toLocaleDateString()} | 
                Duration: {searchData.duration} Nights
              </p>
              <p>Travelers: {searchData.travelers}</p>
            </div>
          </div>
          
          {filteredPackages.length === 0 ? (
            <div className="alert alert-warning">No packages found matching your criteria.</div>
          ) : (
            <div className="list-group">
              {filteredPackages.map((pkg, index) => (
                <div key={index} className="list-group-item list-group-item-action mb-3">
                  <div className="row g-0">
                    <div className="col-md-8">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h5 className="card-title mb-1">{pkg.name}</h5>
                            <div className="mb-2">
                              {[...Array(pkg.rating)].map((_, i) => (
                                <FaStar key={i} className="text-warning" />
                              ))}
                              <span className="ms-2 badge bg-info">
                                {pkg.type.charAt(0).toUpperCase() + pkg.type.slice(1)}
                              </span>
                            </div>
                          </div>
                          <div className="text-end">
                            <h4 className="text-primary mb-0">${pkg.price}</h4>
                            <small className="text-muted">per person</small>
                            <p className="text-success mb-0">Save ${pkg.savings}!</p>
                          </div>
                        </div>
                        
                        <p className="card-text mt-2">{pkg.description.substring(0, 120)}...</p>
                        
                        <div className="package-includes mt-3">
                          <h6>Includes:</h6>
                          <div className="d-flex flex-wrap gap-2">
                            {pkg.includes.flight && <span className="badge bg-light text-dark"><FaPlane className="me-1" /> Flight</span>}
                            {pkg.includes.hotel && <span className="badge bg-light text-dark"><FaHotel className="me-1" /> Hotel</span>}
                            {pkg.includes.car && <span className="badge bg-light text-dark"><FaCar className="me-1" /> Car Rental</span>}
                            {pkg.includes.meals && <span className="badge bg-light text-dark"><FaUtensils className="me-1" /> Meals</span>}
                            {pkg.includes.tours && <span className="badge bg-light text-dark"><FaSuitcase className="me-1" /> Tours</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card-body h-100 d-flex flex-column justify-content-end">
                        <button 
                          className="btn btn-primary w-100 mt-2"
                          onClick={() => handleSelectPackage(pkg)}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper function to generate mock package data
function generateMockPackages(searchData) {
  const packageTypes = ['beach', 'mountain', 'city', 'cruise'];
  const destinations = [
    'Caribbean', 'Europe', 'Hawaii', 'Mexico', 
    'Japan', 'Australia', 'Canada', 'Alaska'
  ];
  
  const packages = [];
  
  for (let i = 0; i < 8; i++) {
    const type = searchData.packageType === 'all' 
      ? packageTypes[Math.floor(Math.random() * packageTypes.length)]
      : searchData.packageType;
    
    const destination = searchData.destination || destinations[Math.floor(Math.random() * destinations.length)];
    
    const basePrice = type === 'cruise' 
      ? Math.floor(Math.random() * 1000) + 1000
      : type === 'city'
        ? Math.floor(Math.random() * 800) + 600
        : Math.floor(Math.random() * 700) + 500;
    
    const rating = Math.floor(Math.random() * 2) + 3; // 3-5 stars
    
    packages.push({
      id: `pkg-${i}`,
      name: `${destination} ${type === 'beach' ? 'Beach Paradise' 
        : type === 'mountain' ? 'Mountain Retreat' 
        : type === 'city' ? 'City Adventure' 
        : 'Cruise Package'}`,
      type,
      destination,
      duration: searchData.duration,
      departureDate: searchData.departureDate,
      rating,
      price: basePrice,
      savings: Math.floor(basePrice * 0.15),
      description: `Experience the perfect ${searchData.duration}-night ${type} vacation in ${destination}. This all-inclusive package offers everything you need for a memorable trip.`,
      includes: {
        flight: Math.random() > 0.3,
        hotel: true,
        car: type === 'city' || type === 'mountain',
        meals: Math.random() > 0.5,
        tours: Math.random() > 0.7
      }
    });
  }
  
  return packages;
}

export default PackageResults;