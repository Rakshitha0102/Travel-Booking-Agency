import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import ContactPage from './components/ContactPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import AboutUs from './components/AboutUs';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgetPassword from './components/ForgetPassword';
import FAQ from './components/FAQ';
import TermsAndConditions from './components/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy';
import FlightSearch from './components/FlightSearch';
import FlightResults from './components/FlightResults';
import FlightBookingForm from './components/FlightBookingForm';
import BookingConfirmation from './components/BookingConfirmation';
import HotelSearch from './components/HotelSearch';
import HotelResults from './components/HotelResults';
import HotelBookingForm from './components/HotelBookingForm';
import HotelBookingConfirmation from './components/HotelBookingConfirmation';
import PackageSearch from './components/PackageSearch';
import PackageResults from './components/PackageResults';
import PackageBookingForm from './components/PackageBookingForm';
import PackageBookingConfirmation from './components/PackageBookingConfirmation';
import Quote from './components/Quote';
import UserBooking from './components/UserBooking';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Profile from './components/Profile';

const App = () => {
  useEffect(() => {
    document.title = "✈️TripTapp";
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <Quote />
                </>
              }
            />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/profile" element={
  <ProtectedRoute>
    <Profile />
  </ProtectedRoute>
} />
            
            {/* Flights */}
            <Route path="/flights" element={<FlightSearch />} />
            <Route path="/flights/results" element={<FlightResults />} />
            <Route path="/flights/booking" element={
              <ProtectedRoute>
                <FlightBookingForm />
              </ProtectedRoute>
            } />
            <Route path="/flights/confirmation/:bookingRef" element={<BookingConfirmation />} />

            {/* Hotels */}
            <Route path="/hotels" element={<HotelSearch />} />
            <Route path="/hotels/results" element={<HotelResults />} />
            <Route path="/hotels/booking" element={
              <ProtectedRoute>
                <HotelBookingForm />
              </ProtectedRoute>
            } />
            <Route path="/hotels/confirmation/:bookingRef" element={<HotelBookingConfirmation />} />

            {/* Packages */}
            <Route path="/packages" element={<PackageSearch />} />
            <Route path="/packages/results" element={<PackageResults />} />
            <Route path="/packages/booking" element={
              <ProtectedRoute>
                <PackageBookingForm />
              </ProtectedRoute>
            } />
            <Route path="/packages/confirmation/:bookingRef" element={<PackageBookingConfirmation />} />

            <Route path="/user-booking" element={
              <ProtectedRoute>
                <UserBooking />
              </ProtectedRoute>
            } />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;