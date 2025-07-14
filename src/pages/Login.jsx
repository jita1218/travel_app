// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import teaGardenImage from '../assets/tea_garden.jpg';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, error, loading } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${teaGardenImage})`,
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
          WebkitBackdropFilter: 'blur(6px)',
          padding: '2.5rem',
          borderRadius: '12px',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            fontSize: '2.2rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: '#154a4a',
          }}
        >
          Login to Explore
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            width: '100%',
            boxSizing: 'border-box',
            padding: '0.8rem',
            marginBottom: '1rem',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '1rem',
          }}
        />

        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '0.8rem',
              paddingRight: '2.5rem',
              border: '1px solid #ccc',
              borderRadius: '6px',
              fontSize: '1rem',
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#333',
              fontSize: '1rem',
            }}
            aria-label="Toggle password visibility"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            boxSizing: 'border-box',
            padding: '0.8rem',
            backgroundColor: '#154a4a',
            color: '#fff',
            fontWeight: '600',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && (
          <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>{error}</p>
        )}

        <p
          style={{
            marginTop: '1.5rem',
            textAlign: 'center',
            fontSize: '0.95rem',
          }}
        >
          Don't have an account?{' '}
          <Link
            to="/signup"
            style={{
              color: '#154a4a',
              fontWeight: 600,
              textDecoration: 'underline',
            }}
          >
            Sign up instead
          </Link>
        </p>
      </form>
    </div>
  );
}
