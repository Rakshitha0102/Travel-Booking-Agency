import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import loginBg from '../assets/b.png'; // Using the same background image

const ForgotPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePasswordReset = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setErrorMessage('Please enter your email address');
      return;
    }

    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      // Simulate API call (replace with actual password reset request)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Password reset link sent to your email!');
      navigate('/login', { state: { from: location.state?.from } });
    } catch (err) {
      console.error('Password reset failed:', err);
      setErrorMessage('Failed to send reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlePasswordReset();
    }
  };

  return (
    <div
    className="d-flex justify-content-center align-items-center vh-100"
    style={{
      background: `
        linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
        url(${loginBg}) repeat
      `,
      backgroundSize: 'auto', // This allows the image to repeat at its original size
      backgroundAttachment: 'fixed', // Optional: makes the background fixed during scrolling
      minHeight: '100vh'
    }}
  >
      <div className="card p-4" style={{
        maxWidth: '400px',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        border: 'none',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
      }}>
        <h3 className="text-center mb-4">Reset Your Password</h3>

        {errorMessage && (
          <div className="alert alert-danger">
            {errorMessage}
          </div>
        )}

        <div className="mb-3">
          <label className="form-label" htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyPress}
            required
          />
          <div className="form-text">We'll send a reset link to your email</div>
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={handlePasswordReset}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" />
              Sending...
            </>
          ) : 'Send Reset Link'}
        </button>

        <div className="d-flex justify-content-between mt-3">
          <button
            className="btn btn-link p-0"
            onClick={() => navigate('/login')}
          >
            Remember your password? Login
          </button>
          <button
            className="btn btn-link p-0"
            onClick={() => navigate('/signup')}
          >
            Need an account? Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;