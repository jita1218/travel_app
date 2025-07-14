// src/pages/Signup.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';
import tawangImage from '../assets/tawang4.jpg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { signup, error, loading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(fullName, username, password, confirmPassword);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${tawangImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(6px)',
          padding: '2.5rem',
          borderRadius: '12px',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        }}
      >
        <h2 style={{ textAlign: 'center', fontSize: '2.2rem', fontWeight: 700, marginBottom: '1.5rem', color: '#154a4a' }}>
          Create Your Account
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={inputStyle}
        />

        <div style={inputContainerStyle}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ ...inputStyle, marginBottom: 0 }}
          />
          <span onClick={() => setShowPassword(!showPassword)} style={eyeStyle}>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        <div style={inputContainerStyle}>
          <input
            type={showConfirm ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ ...inputStyle, marginBottom: 0 }}
          />
          <span onClick={() => setShowConfirm(!showConfirm)} style={eyeStyle}>
            {showConfirm ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.8rem',
            backgroundColor: '#198754',
            color: '#fff',
            fontWeight: 600,
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
            marginTop: '1.5rem',
          }}
        >
          {loading ? 'Signing up...' : 'Signup'}
        </button>

        {error && (
          <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>{error}</p>
        )}

        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.95rem' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#154a4a', fontWeight: 600, textDecoration: 'underline' }}>
            Login instead
          </Link>
        </p>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '0.8rem',
  marginBottom: '1rem',
  border: '1px solid #ccc',
  borderRadius: '6px',
  fontSize: '1rem',
};

const inputContainerStyle = {
  position: 'relative',
  marginBottom: '1.5rem',
};

const eyeStyle = {
  position: 'absolute',
  top: '50%',
  right: '1rem',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  fontSize: '1.2rem',
  color: '#555',
};
