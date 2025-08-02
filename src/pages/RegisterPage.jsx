// src/pages/PackageForm.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const PackageForm = () => {
  const location = useLocation();
  const [destination, setDestination] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    travel_date: '',
    num_people: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Extract 'package' from URL query param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const dest = params.get('package'); // key should be 'package'
    if (dest) setDestination(dest);
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!destination) {
      setError('Missing or invalid package in URL.');
      return;
    }

    try {
      const res = await axios.post('${API_BASE}/api/bookings/create', {
        username: formData.username,
        travel_date: formData.travel_date,
        num_people: formData.num_people,
        destination: destination
      });

      setMessage(res.data.message || 'Booking successful!');
      setFormData({ username: '', travel_date: '', num_people: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Booking failed.');
    }
  };

  if (!destination) {
    return <p style={{ color: 'red', textAlign: 'center' }}>Missing or invalid package in URL.</p>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Book your trip to {destination}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Your Name"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="date"
          name="travel_date"
          value={formData.travel_date}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="number"
          name="num_people"
          placeholder="Number of People"
          value={formData.num_people}
          onChange={handleChange}
          min={1}
          required
        />
        <br />
        <button type="submit">Book Now</button>
      </form>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PackageForm;
