import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

// Asset and data imports (assuming they are in the correct paths)
import heroVideo from '../assets/hero.mp4';
import locations from '../data/locations';
import packages from '../data/packages';

const API_BASE = import.meta.env.VITE_API_BASE_URL;



// --- Custom Hook: useWishlist ---
// Encapsulates all wishlist logic for reusability and separation of concerns.
const useWishlist = (username) => {
  const [likedLocations, setLikedLocations] = useState([]);
  const [likedPackages, setLikedPackages] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!username) return;

      try {
        const response = await axios.get(`${API_BASE}/api/wishlist/get`, {
          params: { username }
        });

        const data = response.data || [];
        const locationNames = [];
        const packageNames = [];
        
        // SUGGESTION: The API should return the item type ('location' or 'package').
        // This check against a local array is brittle.
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

  const handleToggleWishlist = useCallback(async (item, type) => {
    if (!username) return;

    const isLocation = type === 'location';
    const likedState = isLocation ? likedLocations : likedPackages;
    const setLikedState = isLocation ? setLikedLocations : setLikedPackages;
    const alreadyLiked = likedState.includes(item.name);
    
    // Store original state to revert on error
    const originalState = [...likedState];

    // Optimistic UI update
    if (alreadyLiked) {
      setLikedState((prev) => prev.filter((n) => n !== item.name));
    } else {
      setLikedState((prev) => [...prev, item.name]);
    }

    try {
      if (alreadyLiked) {
        await axios.delete(`${API_BASE}/api/wishlist/remove`, { data: { username, destination: item.name } });
      } else {
        await axios.post(`${API_BASE}/api/wishlist/add`, { username, destination: item.name });
      }
    } catch (err) {
      console.error('Wishlist toggle failed:', err);
      alert('Failed to update wishlist. Please try again.');
      // --- FIX: Revert state on API error ---
      setLikedState(originalState);
    }
  }, [username, likedLocations, likedPackages]);

  return { likedLocations, likedPackages, handleToggleWishlist };
};


// --- Component: LogoutModal ---
const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h4>Confirm Logout</h4>
        <p>Are you sure you want to logout?</p>
        <div style={modalActionsStyle}>
          <button onClick={onClose} style={{ ...modalButtonStyle, backgroundColor: '#6c757d' }}>Cancel</button>
          <button onClick={onConfirm} style={{ ...modalButtonStyle, backgroundColor: '#dc3545' }}>Logout</button>
        </div>
      </div>
    </div>
  );
};

const AuthButtons = ({ isLoggedIn, onLogoutClick }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleDropdown = () => setShowMenu(prev => !prev);
  const closeMenu = () => setShowMenu(false);

  return (
    <div style={{ position: 'absolute', top: '1.5rem', right: '2rem', zIndex: 10 }}>
      <div style={dropdownContainerStyle}>
        <button onClick={toggleDropdown} style={{ ...authBtnStyle }}>
          {isLoggedIn ? 'My Profile' : 'Create Profile'}
        </button>

        {showMenu && (
          <div style={dropdownMenuStyle}>
            {!isLoggedIn ? (
              <>
                <Link to="/login" style={dropdownBtnStyle} onClick={closeMenu}>Login</Link>
                <Link to="/signup" style={dropdownBtnStyle} onClick={closeMenu}>Signup</Link>
              </>
            ) : (
              <>
                <Link to="/wishlist" style={dropdownBtnStyle} onClick={closeMenu}>Wishlist</Link>
                <Link to="/my-bookings" style={dropdownBtnStyle} onClick={closeMenu}>My Bookings</Link>
                <button onClick={() => { onLogoutClick(); closeMenu(); }} style={dropdownBtnStyle}>
                  Sign Out
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


// --- Component: LocationCard ---
const LocationCard = ({ loc, isLiked, onToggle, isLoggedIn }) => {
  const navigate = useNavigate();
  return (
    <div style={locationCardStyle}>
      <img src={loc.image} alt={loc.name} style={locationImgStyle} />
      <div style={locationOverlayStyle} />
      <div style={locationContentStyle}>
        <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700 }}>{loc.name}</h3>
        <p style={{ margin: 0 }}>{loc.state}</p>
      </div>
      <button onClick={() => navigate(`/register-package?package=${encodeURIComponent(loc.name)}`)} style={registerBtnStyle}>Register</button>
      {isLoggedIn && (
        <button onClick={() => onToggle(loc, 'location')} style={wishlistBtnStyle} title="Toggle wishlist">
          {isLiked ? <FaHeart color="red" size={20} /> : <FaRegHeart color="white" size={20} />}
        </button>
      )}
    </div>
  );
};


// --- Component: PackageCard ---
const PackageCard = ({ pkg, isLiked, onToggle, isLoggedIn }) => {
  const navigate = useNavigate();
  return (
    <div style={packageCardStyle}>
      <img src={pkg.image} alt={pkg.name} style={packageImgStyle} />
      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
          <h3>{pkg.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button onClick={() => navigate(`/register-package?package=${encodeURIComponent(pkg.name)}`)} style={pkgRegisterBtnStyle}>Register</button>
            {isLoggedIn && (
              <button onClick={() => onToggle(pkg, 'package')} style={pkgWishlistBtnStyle} title="Toggle wishlist">
                {isLiked ? <FaHeart color="red" size={20} /> : <FaRegHeart color="#555" size={20} />}
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
    </div>
  );
};


// --- Main Component: HomePage ---
const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const isLoggedIn = !!token;
  
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { likedLocations, likedPackages, handleToggleWishlist } = useWishlist(username);

  // Scroll to section based on URL parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollTarget = params.get('scroll');
    if (scrollTarget) {
      const el = document.getElementById(scrollTarget);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLogoutModalOpen(false);
    navigate('/');
  };

  return (
    <div style={{ width: '100%', fontFamily: "'Poppins', sans-serif" }}>
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
      
      <section style={heroSectionStyle}>
        <video autoPlay muted loop playsInline style={heroVideoStyle}>
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div style={heroContentStyle}>
          <h1 style={heroTitleStyle}>Welcome to FirstTrip Travels</h1>
          <p style={heroSubtitleStyle}>"Explore top locations of Northeast with custom travel packages and unbeatable experiences."</p>
        </div>
        <AuthButtons isLoggedIn={isLoggedIn} onLogoutClick={() => setIsLogoutModalOpen(true)} />
      </section>

      <section id="locations" style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Popular Locations</h2>
        <div style={gridStyle}>
          {locations.map((loc) => (
            <LocationCard
              key={loc.name}
              loc={loc}
              isLiked={likedLocations.includes(loc.name)}
              onToggle={handleToggleWishlist}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      </section>

      <section id="packages" style={{ ...sectionStyle, backgroundColor: '#f9f9f9' }}>
        <h2 style={sectionTitleStyle}>Packages</h2>
        <div style={gridStyle}>
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.name}
              pkg={pkg}
              isLiked={likedPackages.includes(pkg.name)}
              onToggle={handleToggleWishlist}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      </section>
    </div>
  );
};


//login sign in button style
const dropdownBtnStyle = {
  width: '104px',             
  padding: '0.4rem 1rem',
  borderRadius: '4px',
  border: '2px solid black',
  backgroundColor: 'transparent',
  color: 'black',
  cursor: 'pointer',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'block',         
  transition: 'background-color 0.5s',
};

const dropdownContainerStyle = {
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'inline-block',
};

const dropdownMenuStyle = {
  position: 'absolute',
  top: '23px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.1rem',
  marginTop: '0.25rem',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  padding: '0.5rem',
  borderRadius: '0.25rem',
  zIndex: 999,
  alignItems: 'center', 
};



const authBtnStyle = {
  width: '140px',  
  fontWeight:'600',            
  padding: '0.4rem 1rem',
  borderRadius: '4px',
  border: '2px solid black',
  backgroundColor: 'transparent',
  color: 'black',
  cursor: 'pointer',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'block',        
  transition: 'background-color 0.5s',
};


// --- Styles --- (Defined outside components to prevent re-creation on render)

//const authBtnStyle = { padding: '0.5rem 1rem', color: '#fff', borderRadius: '6px', fontWeight: 600, textDecoration: 'none', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' };
const sectionStyle = { padding: '3rem 2rem' };
const sectionTitleStyle = { textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' };
const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' };

// Hero Section Styles
const heroSectionStyle = { position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' };
const heroVideoStyle = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 };
const heroContentStyle = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 1rem' };
const heroTitleStyle = { fontSize: '10vh', fontWeight: '700', color: '#fff' };
const heroSubtitleStyle = { fontSize: '1.2rem', maxWidth: '600px', color: '#fff' };

// Location Card Styles
const locationCardStyle = { position: 'relative', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', height: '350px' };
const locationImgStyle = { width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 };
const locationOverlayStyle = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)', zIndex: 1 };
const locationContentStyle = { position: 'absolute', bottom: '1rem', left: '1rem', color: '#fff', textShadow: '1px 1px 3px rgba(0,0,0,0.6)', zIndex: 2 };
const registerBtnStyle = { position: 'absolute', top: '1rem', left: '1rem', backgroundColor: '#154a4a', color: '#fff', border: 'none', padding: '0.4rem 1rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', zIndex: 2 };
const wishlistBtnStyle = { position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', zIndex: 2 };

// Package Card Styles
const packageCardStyle = { backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column' };
const packageImgStyle = { width: '100%', height: '220px', objectFit: 'cover' };
const pkgRegisterBtnStyle = { backgroundColor: '#154a4a', color: '#fff', padding: '0.4rem 1rem', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 600 };
const pkgWishlistBtnStyle = { background: 'none', border: 'none', cursor: 'pointer', marginLeft: '8px' };

// Modal Styles
const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const modalContentStyle = { backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 5px 15px rgba(0,0,0,0.3)', width: '90%', maxWidth: '400px', textAlign: 'center' };
const modalActionsStyle = { display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' };
const modalButtonStyle = { padding: '0.5rem 1.2rem', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', color: '#fff' };

export default HomePage;
