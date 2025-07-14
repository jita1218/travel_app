import React from 'react';

export default function LogoutModal({ onConfirm, onCancel }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#fff', padding: '2rem', borderRadius: '8px', textAlign: 'center',
        minWidth: '300px'
      }}>
        <p>Are you sure you want to logout?</p>
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-around' }}>
          <button onClick={onCancel} style={{
            padding: '0.5rem 1rem', background: '#ccc',
            border: 'none', borderRadius: '4px'
          }}>Cancel</button>
          <button onClick={onConfirm} style={{
            padding: '0.5rem 1rem', background: '#dc3545',
            color: '#fff', border: 'none', borderRadius: '4px'
          }}>Logout</button>
        </div>
      </div>
    </div>
  );
}
