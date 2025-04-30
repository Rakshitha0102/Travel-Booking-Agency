import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import loginBg from '../assets/b.png'; // Using the same background image as login

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const from = location.state?.from?.pathname || '/';

  const handleSignup = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    // Validate fields
    if (!email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid email format.');
      return;
    }

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        'Password must be at least 8 characters long and include:\n' +
        '- One uppercase letter\n' +
        '- One lowercase letter\n' +
        '- One number\n' +
        '- One special character'
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      // Simulate API call (replace with actual signup request)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // After successful signup, automatically log the user in
      login(email);
      localStorage.setItem('userEmail', email);

      // Clear form
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      navigate(from, { replace: true });
    } catch (err) {
      console.error('Signup failed:', err);
      setErrorMessage('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignup();
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
        <h3 className="text-center mb-4">Create Your TripTapp Account</h3>

        {location.state?.from && (
          <div className="alert alert-info">
            Please sign up to access <strong>{location.state.from.pathname}</strong>
          </div>
        )}

        {errorMessage && (
          <div className="alert alert-danger">
            {errorMessage}
          </div>
        )}

        <div className="mb-3">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyPress}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyPress}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyDown={handleKeyPress}
            required
          />
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={handleSignup}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" />
              Creating Account...
            </>
          ) : 'Sign Up'}
        </button>

        <div className="text-center mt-3">
  <button
    className="btn btn-link p-0 d-block mx-auto"
    onClick={() => navigate('/login', { state: { from: location.state?.from } })}
  >
    Already have an account? Login
  </button>
  <button
    className="btn btn-link p-0 text-muted d-block mx-auto"
    onClick={() => navigate('/forget-password', { state: { from: location.state?.from } })}
  >
    Forgot Password?
  </button>
</div>
      </div>
    </div>
  );
};

export default Signup;