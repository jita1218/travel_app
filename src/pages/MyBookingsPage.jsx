import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (!username) return;

    axios.get(`${API_BASE}/api/booking/my`, {
      params: { username }
    })
      .then((res) => setBookings(res.data))
      .catch((err) => console.error('Failed to fetch bookings:', err));
  }, [username]);

  const handleCancel = async (destination) => {
    try {
      await axios.post(`${API_BASE}/api/bookings/cancel`, {
        username,
        destination,
      });

      // Remove the cancelled booking from state
      setBookings((prev) => prev.filter((b) => b.destination !== destination));
    } catch (err) {
      console.error('Failed to cancel booking:', err.response?.data || err.message);
      alert('Failed to cancel booking. Please try again.');
    }
  };

  // Custom label formatter
  const formatLabel = (key) => {
    switch (key) {
      case 'destination':
        return 'Destination';
      case 'travel_date':
        return 'Travel Date';
      case 'num_people':
        return 'Number of People';
      case 'created_at':
        return 'Booked On';
      default:
        return key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    }
  };

  // Custom value formatter
  const renderValue = (key, value) => {
    if ((key.includes('date') || key === 'created_at') && value) {
      const date = new Date(value);
      return isNaN(date) ? value : date.toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    }
    return value?.toString() || 'N/A';
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>You haven’t booked anything yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {bookings.map((booking) => (
            <li
              key={booking._id}
              style={{
                marginBottom: '2rem',
                border: '1px solid #ccc',
                padding: '1rem',
                borderRadius: '8px',
              }}
            >
              {Object.entries(booking).map(([key, value]) => {
                if (['_id', '__v'].includes(key)) return null;
                return (
                  <p key={key}>
                    <strong>{formatLabel(key)}:</strong> {renderValue(key, value)}
                  </p>
                );
              })}
              <button
                onClick={() => handleCancel(booking.destination)}
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginTop: '0.5rem',
                }}
              >
                Cancel Booking
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookingsPage;
