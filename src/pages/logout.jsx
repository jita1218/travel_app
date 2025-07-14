// src/pages/Logout.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const [showPopup, setShowPopup] = useState(true);
  const navigate = useNavigate();

  const handleConfirm = () => {
    localStorage.removeItem('token');
    setShowPopup(false);
    setTimeout(() => navigate('/login'), 600);
  };

  const handleCancel = () => {
    setShowPopup(false);
    setTimeout(() => navigate('/'), 600);
  };

  return (
    showPopup && (
      <div style={overlayStyle}>
        <div style={popupStyle}>
          <p style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem' }}>
            Are you sure you want to logout?
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={handleConfirm} style={confirmBtnStyle}>Yes, Logout</button>
            <button onClick={handleCancel} style={cancelBtnStyle}>Cancel</button>
          </div>
        </div>
      </div>
    )
  );
}

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
};

const popupStyle = {
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '12px',
  textAlign: 'center',
  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
  fontFamily: 'Poppins, sans-serif',
  color: '#154a4a',
};

const confirmBtnStyle = {
  padding: '0.6rem 1.4rem',
  backgroundColor: '#dc3545',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 600,
};

const cancelBtnStyle = {
  padding: '0.6rem 1.4rem',
  backgroundColor: '#6c757d',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 600,
};
