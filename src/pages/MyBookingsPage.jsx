import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (!username) return;

    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/booking/my`, {
          params: { username },
        });
        setBookings(res.data);
      } catch (err) {
        console.error('Failed to fetch bookings:', err.response?.data || err.message);
        alert('Failed to load bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [username]);


  const handleCancel = async (booking) => {
    const confirmCancel = window.confirm(`Cancel booking for ${booking.destination}?`);
    if (!confirmCancel) return;

    try {
      const res = await fetch(`${API_BASE}/api/booking/cancel`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, destination }),
        });

      setBookings((prev) => prev.filter((b) => b.destination !== booking.destination));
    } catch (err) {
      alert('Failed to cancel booking. Please try again.');
    }
  };


  const formatLabel = (key) => {
    const labels = {
      destination: 'Destination',
      travel_date: 'Travel Date',
      num_people: 'Number of People',
      created_at: 'Booked On',
    };
    return labels[key] || key;
  };

  const renderValue = (key, value) => {
    if ((key.includes('date') || key === 'created_at') && value) {
      const date = new Date(value);
      return isNaN(date)
        ? value
        : date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
    }
    return value?.toString() || 'N/A';
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>My Bookings</h2>

      {loading ? (
        <p>Loading your bookings...</p>
      ) : bookings.length === 0 ? (
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
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
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
                onClick={() => handleCancel(booking)}
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
