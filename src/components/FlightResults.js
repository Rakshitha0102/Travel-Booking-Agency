// components/FlightResults.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FlightResults() {
  const [flights, setFlights] = useState([]);
  const [searchData, setSearchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve search data from local storage
    const savedSearch = localStorage.getItem('flightSearch');
    if (savedSearch) {
      setSearchData(JSON.parse(savedSearch));
      // Simulate API call with timeout
      setTimeout(() => {
        // Mock flight data - in a real app, this would come from an API
        const mockFlights = generateMockFlights(JSON.parse(savedSearch));
        setFlights(mockFlights);
        setLoading(false);
      }, 1000);
    } else {
      // No search data found, redirect to search page
      navigate('/flights');
    }
  }, [navigate]);

  const handleSelectFlight = (flight) => {
    // Save selected flight to local storage
    localStorage.setItem('selectedFlight', JSON.stringify(flight));
    navigate('/flights/booking');
  };

  if (loading) {
    return <div className="container mt-5 text-center">Loading flights...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Available Flights</h2>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Search Details</h5>
          <p className="card-text">
            {searchData.origin} to {searchData.destination} | 
            Departure: {new Date(searchData.departureDate).toLocaleDateString()}
            {searchData.returnDate && ` | Return: ${new Date(searchData.returnDate).toLocaleDateString()}`}
          </p>
          <p className="card-text">Passengers: {searchData.passengers}</p>
        </div>
      </div>
      
      {flights.length === 0 ? (
        <div className="alert alert-warning">No flights found for your search criteria.</div>
      ) : (
        <div className="list-group">
          {flights.map((flight, index) => (
            <div key={index} className="list-group-item list-group-item-action mb-3">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{flight.airline}</h5>
                <small>Flight #{flight.flightNumber}</small>
              </div>
              <div className="row mt-2">
                <div className="col-md-3">
                  <p className="mb-1">
                    <strong>{flight.departureTime}</strong> - {flight.origin}
                  </p>
                  <small>{new Date(flight.departureDate).toLocaleDateString()}</small>
                </div>
                <div className="col-md-3">
                  <p className="mb-1">
                    <strong>{flight.arrivalTime}</strong> - {flight.destination}
                  </p>
                  <small>{new Date(flight.arrivalDate).toLocaleDateString()}</small>
                </div>
                <div className="col-md-3">
                  <p className="mb-1">{flight.duration}</p>
                  <small>{flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop(s)`}</small>
                </div>
                <div className="col-md-3 text-end">
                  <h5 className="text-primary">${flight.price}</h5>
                  <button 
                    className="btn btn-sm btn-primary"
                    onClick={() => handleSelectFlight(flight)}
                  >
                    Select
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

// Helper function to generate mock flight data
function generateMockFlights(searchData) {
  const airlines = ['Delta', 'United', 'American', 'Southwest', 'JetBlue'];
  const flights = [];
  
  for (let i = 0; i < 5; i++) {
    const departureHour = Math.floor(Math.random() * 24);
    const durationHours = Math.floor(Math.random() * 6) + 1;
    
    flights.push({
      airline: airlines[Math.floor(Math.random() * airlines.length)],
      flightNumber: Math.floor(Math.random() * 9000) + 1000,
      origin: searchData.origin,
      destination: searchData.destination,
      departureDate: searchData.departureDate,
      departureTime: `${departureHour}:${Math.random() > 0.5 ? '00' : '30'}`,
      arrivalDate: searchData.departureDate, // Same day for simplicity
      arrivalTime: `${(departureHour + durationHours) % 24}:${Math.random() > 0.5 ? '00' : '30'}`,
      duration: `${durationHours}h ${Math.random() > 0.5 ? '0m' : '30m'}`,
      stops: Math.random() > 0.7 ? 1 : 0,
      price: Math.floor(Math.random() * 500) + 100
    });
  }
  
  return flights;
}

export default FlightResults;