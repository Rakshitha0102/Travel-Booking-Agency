
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaWifi, FaSwimmingPool, FaParking, FaUtensils } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';


import hotel1 from '../assets/grand.jpg';
import hotel2 from '../assets/seaside.jpg';
import hotel3 from '../assets/mountain.webp';
import hotel4 from '../assets/urban.avif';
import hotel5 from '../assets/royal.avif';
import hotel6 from '../assets/tranquil.jpg';
import hotel7 from '../assets/bth.jpg';
import hotel8 from '../assets/paradise.jpg';

function HotelResults() {
  const [hotels, setHotels] = useState([]);
  const [searchData, setSearchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 500,
    rating: 0,
    amenities: []
  });
  const navigate = useNavigate();

  useEffect(() => {
    const savedSearch = localStorage.getItem('hotelSearch');
    if (savedSearch) {
      setSearchData(JSON.parse(savedSearch));
      
      setTimeout(() => {
        const mockHotels = generateMockHotels(JSON.parse(savedSearch));
        setHotels(mockHotels);
        setLoading(false);
      }, 1000);
    } else {
      navigate('/hotels');
    }
  }, [navigate]);

  const handleSelectHotel = (hotel) => {
    localStorage.setItem('selectedHotel', JSON.stringify(hotel));
    navigate('/hotels/booking');
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? checked 
          ? [...prev.amenities, value]
          : prev.amenities.filter(a => a !== value)
        : value
    }));
  };

  const filteredHotels = hotels.filter(hotel => {
    return (
      hotel.price >= filters.minPrice &&
      hotel.price <= filters.maxPrice &&
      hotel.rating >= filters.rating &&
      (filters.amenities.length === 0 || 
       filters.amenities.every(a => hotel.amenities.includes(a)))
    );
  });

  if (loading) {
    return <div className="container mt-5 text-center">Loading hotels...</div>;
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
                    max="500"
                    step="10"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                  />
                  <input
                    type="range"
                    className="form-range"
                    min="0"
                    max="500"
                    step="10"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>
              
              <h6>Star Rating</h6>
              <div className="mb-3">
                {[5, 4, 3, 2, 1].map(stars => (
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
              </div>
              
              <h6>Amenities</h6>
              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="wifi"
                    value="wifi"
                    checked={filters.amenities.includes('wifi')}
                    onChange={handleFilterChange}
                  />
                  <label className="form-check-label" htmlFor="wifi">
                    <FaWifi className="me-2" /> Free WiFi
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="pool"
                    value="pool"
                    checked={filters.amenities.includes('pool')}
                    onChange={handleFilterChange}
                  />
                  <label className="form-check-label" htmlFor="pool">
                    <FaSwimmingPool className="me-2" /> Swimming Pool
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="parking"
                    value="parking"
                    checked={filters.amenities.includes('parking')}
                    onChange={handleFilterChange}
                  />
                  <label className="form-check-label" htmlFor="parking">
                    <FaParking className="me-2" /> Free Parking
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="restaurant"
                    value="restaurant"
                    checked={filters.amenities.includes('restaurant')}
                    onChange={handleFilterChange}
                  />
                  <label className="form-check-label" htmlFor="restaurant">
                    <FaUtensils className="me-2" /> Restaurant
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
                {searchData.location} | 
                Check-in: {new Date(searchData.checkIn).toLocaleDateString()} | 
                Check-out: {new Date(searchData.checkOut).toLocaleDateString()}
              </p>
              <p>Guests: {searchData.guests} | Rooms: {searchData.rooms}</p>
            </div>
          </div>
          
          {filteredHotels.length === 0 ? (
            <div className="alert alert-warning">No hotels found matching your criteria.</div>
          ) : (
            <div className="list-group">
              {filteredHotels.map((hotel, index) => (
                <div key={index} className="list-group-item list-group-item-action mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img 
                        src={hotel.image} 
                        className="img-fluid rounded-start h-100" 
                        alt={hotel.name}
                        style={{objectFit: 'cover', minHeight: '200px'}}
                      />
                    </div>
                    <div className="col-md-5">
                      <div className="card-body">
                        <h5 className="card-title">{hotel.name}</h5>
                        <div className="mb-2">
                          {[...Array(hotel.rating)].map((_, i) => (
                            <FaStar key={i} className="text-warning" />
                          ))}
                        </div>
                        <p className="card-text">
                          <small className="text-muted">
                            <FaMapMarkerAlt className="me-1" /> {hotel.location}
                          </small>
                        </p>
                        <div className="amenities mb-2">
                          {hotel.amenities.includes('wifi') && <span className="badge bg-light text-dark me-1"><FaWifi /> WiFi</span>}
                          {hotel.amenities.includes('pool') && <span className="badge bg-light text-dark me-1"><FaSwimmingPool /> Pool</span>}
                          {hotel.amenities.includes('parking') && <span className="badge bg-light text-dark me-1"><FaParking /> Parking</span>}
                          {hotel.amenities.includes('restaurant') && <span className="badge bg-light text-dark me-1"><FaUtensils /> Restaurant</span>}
                        </div>
                        <p className="card-text">{hotel.description.substring(0, 100)}...</p>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="card-body h-100 d-flex flex-column justify-content-between">
                        <div className="text-end">
                          <h4 className="text-primary">${hotel.price}</h4>
                          <small className="text-muted">per night</small>
                          <p className="text-success">Free cancellation</p>
                        </div>
                        <button 
                          className="btn btn-primary w-100"
                          onClick={() => handleSelectHotel(hotel)}
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

// Helper function to generate mock hotel data
function generateMockHotels(searchData) {
  const hotelNames = [
    "Grand Plaza Hotel",
    "Seaside Resort",
    "Mountain View Inn",
    "Urban Suites",
    "Royal Palace Hotel",
    "Tranquil Gardens Resort",
    "Business Tower Hotel",
    "Paradise Beach Resort"
  ];
  
  const locations = [
    "Downtown", "Beachfront", "City Center", "Near Airport", 
    "Mountain Area", "Suburban", "Shopping District", "Historic District"
  ];
  
  const amenitiesList = ['wifi', 'pool', 'parking', 'restaurant'];
  
  // Array of imported images
  const hotelImages = [
    hotel1, hotel2, hotel3, hotel4,
    hotel5, hotel6, hotel7, hotel8
  ];
  
  const hotels = [];
  
  for (let i = 0; i < 8; i++) {
    const rating = Math.floor(Math.random() * 3) + 3; // 3-5 stars
    const amenities = [];
    
    // Random amenities (at least 2)
    while (amenities.length < 2 || Math.random() > 0.5) {
      const randomAmenity = amenitiesList[Math.floor(Math.random() * amenitiesList.length)];
      if (!amenities.includes(randomAmenity)) {
        amenities.push(randomAmenity);
      }
    }
    
    hotels.push({
      id: `hotel-${i}`,
      name: hotelNames[i],
      location: `${searchData.location} ${locations[i]}`,
      rating,
      price: Math.floor(Math.random() * 300) + 50, // $50-$350
      amenities,
      description: `A wonderful ${rating}-star hotel located in the ${locations[i]} area. Featuring ${amenities.join(', ')} and more.`,
      image: hotelImages[i]
    });
  }
  
  return hotels;
}

export default HotelResults;
