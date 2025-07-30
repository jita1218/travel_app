import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import heroVideo from '../assets/hero.mp4';
import locations from '../data/locations';
import packages from '../data/packages';
import travelImg from '../assets/3a.jpg';
import foodImg from '../assets/2a.jpg';
import campImg from '../assets/camp2.jpg';
import hotelImg from '../assets/4a.jpg';
import LogoutModal from '../components/LogoutModal';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const [likedLocations, setLikedLocations] = useState([]);
  const [likedPackages, setLikedPackages] = useState([]);

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      navigate('/');
    }
  };
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!username) return;

      try {
        const response = await axios.get(`https://travel-app-rfuf.onrender.com/api/wishlist/get`, {
          params: { username }
        });

        const data = response.data || [];

        const locationNames = [];
        const packageNames = [];

        data.forEach((item) => {
          const name = item.destination;
          const isLocation = locations.some((loc) => loc.name === name);
          if (isLocation) {
            locationNames.push(name);
          } else {
            packageNames.push(name);
          }
        });

        setLikedLocations(locationNames);
        setLikedPackages(packageNames);
      } catch (err) {
        console.error('Failed to fetch wishlist:', err);
      }
    };

    fetchWishlist();
  }, [username]);

  const handleToggleWishlist = async (item, type) => {
    if (!username) return;

    const isLocation = type === 'location';
    const likedState = isLocation ? likedLocations : likedPackages;
    const setLikedState = isLocation ? setLikedLocations : setLikedPackages;
    const alreadyLiked = likedState.includes(item.name);

    const payload = {
      username,
      destination: item.name,
    };

    try {
      if (alreadyLiked) {
        await axios.delete(`${API_BASE}/wishlist/remove`, { data: payload });
        setLikedState((prev) => prev.filter((n) => n !== item.name));
      } else {
        await axios.post(`${API_BASE}/wishlist/add`, payload);
        setLikedState((prev) => [...prev, item.name]);
      }
    } catch (err) {
      if (err.response?.status === 409) {
        console.warn('Already in wishlist');
        setLikedState((prev) => [...prev, item.name]);
      } else {
        console.error('Wishlist toggle failed:', err);
        alert('Failed to update wishlist.');
      }
    }

  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollTarget = params.get('scroll');
    if (scrollTarget) {
      const el = document.getElementById(scrollTarget);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div style={{ width: '100%', fontFamily: "'Poppins', sans-serif" }}>
      <section
        style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        <div
          style={{ position: 'absolute', top: 0, left: 0, width: '94%', height: '100%', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 1rem' }}
        >
          <h1
            style={{ fontSize: '10vh', fontWeight: '700', color: '#fff', transition: 'all 0.3s ease', WebkitTextStroke: '0px' }}
            onMouseEnter={(e) => {
              e.target.style.color = 'transparent';
              e.target.style.WebkitTextStroke = '1px white';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#fff';
              e.target.style.WebkitTextStroke = '0px';
            }}
          >
            Welcome to FirstTrip Travels
          </h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '600px', color: '#fff' }}>
            "Explore top locations of Northeast with custom travel packages and unbeatable experiences."
          </p>
        </div>

        <div
          style={{ position: 'absolute', top: '1.5rem', right: '2rem', zIndex: 10, display: 'flex', gap: '1rem' }}
        >
          {!token ? (
            <>
              <Link to="/login" style={{ ...authBtnStyle, backgroundColor: '#154a4a' }}>Login</Link>
              <Link to="/signup" style={{ ...authBtnStyle, backgroundColor: '#198754' }}>Signup</Link>
            </>
          ) : (
            <>
              <Link to="/wishlist" style={{ ...authBtnStyle, backgroundColor: '#0d6efd' }}>Wishlist</Link>
              <button onClick={handleLogout} style={{ ...authBtnStyle, backgroundColor: '#dc3545' }}>Logout</button>
            </>
          )}
        </div>
      </section>

      {/* Services Section - no changes */}

      {/* Locations Section - Heart added */}
      <section id="locations" style={{ padding: '3rem 2rem', backgroundColor: '#fff' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Popular Locations</h2>
        <div style={locationGridStyle}>
          {locations.map((loc, idx) => (
            <div key={idx} style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', height: '300px' }}>
              <img src={loc.image} alt={loc.name} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} />
              <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', color: '#fff', textShadow: '1px 1px 3px rgba(0,0,0,0.6)', zIndex: 2 }}>
                <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700 }}>{loc.name}</h3>
                <p style={{ margin: 0 }}>{loc.state}</p>
              </div>
              <button onClick={() => window.location.href = `/register?place=${encodeURIComponent(loc.name)}`} style={{ position: 'absolute', top: '1rem', left: '1rem', backgroundColor: '#154a4a', color: '#fff', border: 'none', padding: '0.4rem 1rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', zIndex: 2 }}>Register</button>
              {token && (
                <button
                  onClick={() => handleToggleWishlist(loc, 'location')}
                  style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', zIndex: 2 }}
                  title="Toggle wishlist"
                >
                  {likedLocations.includes(loc.name) ? (
                    <FaHeart color="red" size={20} />
                  ) : (
                    <FaRegHeart color="white" size={20} />
                  )}
                </button>
              )}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.1)', zIndex: 1 }} />
            </div>
          ))}
        </div>
      </section>

      {/* Packages Section - Heart added */}
      <section id="packages" style={{ padding: '3rem 2rem', backgroundColor: '#f9f9f9' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Packages</h2>
        <div style={cardGridStyle}>
          {packages.map((pkg, idx) => (
            <div key={idx} style={{ ...cardStyle, padding: '1.5rem' }}>
              <img src={pkg.image} alt={pkg.name} style={imgStyle} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <h3>{pkg.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <button onClick={() => window.location.href = `/register-package?package=${encodeURIComponent(pkg.name)}`} style={{ backgroundColor: '#154a4a', color: '#fff', padding: '0.4rem 1rem', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 600, opacity: 0.9 }}>Register</button>
                  {token && (
                    <button onClick={() => handleToggleWishlist(pkg, 'package')} style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '8px' }} title="Toggle wishlist">
                      {likedPackages.includes(pkg.name) ? <FaHeart color="red" size={20} /> : <FaRegHeart color="#555" size={20} />}
                    </button>
                  )}
                </div>
              </div>
              <ul style={{ marginTop: '0.5rem', paddingLeft: '1rem', textAlign: 'left' }}>
                {pkg.features.map((feature, i) => (
                  <li key={i} style={{ color: '#555', marginBottom: '0.25rem' }}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const authBtnStyle = {
  padding: '0.5rem 1rem',
  color: '#fff',
  borderRadius: '6px',
  fontWeight: 600,
  textDecoration: 'none',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

const cardGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '2rem',
};

const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  textAlign: 'center',
};

const locationGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '2rem',
};

const imgStyle = {
  width: '100%',
  height: '300px',
  objectFit: 'cover',
};

export default HomePage;
