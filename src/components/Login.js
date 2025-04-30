import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import loginBg from '../assets/b.png'; 
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth(); // <-- Use login from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const from = location.state?.from?.pathname || '/';

  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    // Validate fields
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
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

    setIsLoading(true);
    setErrorMessage(''); // Clear any previous errors

    try {
      // Simulate API call (replace with actual API request)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // After successful login
      login(); // this updates React state AND sets localStorage
      localStorage.setItem('userEmail', email);

      // Clear the form after login
      setEmail('');
      setPassword('');

      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login failed:', err);
      setErrorMessage('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
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
      backgroundSize: 'auto', 
      backgroundAttachment: 'fixed',
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
        <h3 className="text-center mb-4">Login to TripTapp</h3>

        {location.state?.from && (
          <div className="alert alert-info">
            Please log in to access <strong>{location.state.from.pathname}</strong>
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

        <button
          className="btn btn-primary w-100"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" />
              Logging in...
            </>
          ) : 'Login'}
        </button>

        <div className="d-flex justify-content-between mt-3">
          <button
            className="btn btn-link p-0"
            onClick={() => navigate('/signup', { state: { from: location.state?.from } })}
          >
            Create Account
          </button>
          <button
            className="btn btn-link p-0 text-muted"
            onClick={() => navigate('/forget-password', { state: { from: location.state?.from } })}
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
