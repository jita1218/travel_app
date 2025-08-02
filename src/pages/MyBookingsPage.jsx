import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (!username) return;

    axios.get(`${API_BASE}/api/bookings/${username}`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error('Failed to fetch bookings:', err));
  }, [username]);

  const handleCancel = async (bookingId) => {
    try {
      await axios.delete(`${API_BASE}/api/bookings/${bookingId}`);
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (err) {
      console.error('Failed to cancel booking:', err);
      alert('Failed to cancel booking. Please try again.');
    }
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
              <h3>{booking.packageName}</h3>
              <p><strong>Travel Date:</strong> {new Date(booking.travelDate).toLocaleDateString()}</p>
              <p><strong>Price:</strong> ₹{booking.totalPrice}</p>
              <button
                onClick={() => handleCancel(booking._id)}
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
