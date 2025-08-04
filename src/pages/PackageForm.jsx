import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const PackageForm = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const destination = params.get('package');

  const [formData, setFormData] = useState({
    username: '',
    travel_date: null,
    num_people: '',
  });

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setFormData((prev) => ({ ...prev, username: savedUsername }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, travel_date, num_people } = formData;

    if (!username || !travel_date || !num_people) {
      setError('All fields are required.');
      setSuccessMsg('');
      return;
    }

    if (Number(num_people) < 1) {
      setError('At least one person must be traveling.');
      setSuccessMsg('');
      return;
    }

    const formattedDate = travel_date.toISOString().split('T')[0];

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/booking/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          destination,
          travel_date: formattedDate,
          num_people: Number(num_people),
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Booking failed.');

      setSuccessMsg(`Trip to ${destination} booked successfully!`);
      setError('');
      setFormData({ ...formData, travel_date: null, num_people: '' });
    } catch (err) {
      setError(err.message);
      setSuccessMsg('');
    } finally {
      setLoading(false);
    }
  };

  if (!destination) {
    return <p style={{ color: 'red', textAlign: 'center' }}>Missing or invalid package in URL.</p>;
  }

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>
        Book your trip to: <span style={{ color: '#154a4a' }}>{destination}</span>
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem',
          background: '#f7f7f7',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.18)',
        }}
      >
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Your Name"
          style={inputStyle}
          required
        />

        <DatePicker
          selected={formData.travel_date}
          onChange={(date) => setFormData((prev) => ({ ...prev, travel_date: date }))}
          placeholderText="Select Travel Date"
          dateFormat="yyyy-MM-dd"
          minDate={new Date()}
          required
          className="custom-datepicker"
        />

        <input
          type="number"
          name="num_people"
          value={formData.num_people}
          onChange={handleChange}
          placeholder="Number of People"
          min="1"
          style={inputStyle}
          required
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.8rem',
            background: loading ? '#999' : '#154a4a',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '1rem',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      <style>{`
        .custom-datepicker {
          padding: 0.8rem;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 1rem;
          width: 100%;
        }
        .react-datepicker__header {
          background-color: #154a4a;
          color: white;
        }
        .react-datepicker__day--selected {
          background-color: #154a4a !important;
        }
      `}</style>
    </div>
  );
};

const inputStyle = {
  padding: '0.8rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '1rem',
  width: '100%',
};

export default PackageForm;
