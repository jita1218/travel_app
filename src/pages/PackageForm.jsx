// src/pages/PackageForm.jsx

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const PackageForm = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const packageName = params.get('package');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        people: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, people } = formData;

        if (!name || !email || !people) {
            setError('All fields are required.');
            return;
        }

        setError('');
        alert(`Registration submitted for ${packageName}!\n\nName: ${name}\nEmail: ${email}\nPeople: ${people}`);
        // Integration logic goes here
        setFormData({ name: '', email: '', people: '' });
    };

    return (
        <div style={{ fontFamily: "'Poppins', sans-serif", padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>
                Register for: <span style={{ color: '#154a4a' }}>{packageName}</span>
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
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    style={inputStyle}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    style={inputStyle}
                />
                <input
                    type="number"
                    name="people"
                    placeholder="Number of People"
                    value={formData.people}
                    onChange={handleChange}
                    style={inputStyle}
                    min="1"
                />

                {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}

                <button
                    type="submit"
                    style={{
                        padding: '0.8rem',
                        background: '#154a4a',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: '600',
                        fontSize: '1rem',
                        cursor: 'pointer',
                    }}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

const inputStyle = {
    padding: '0.8rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
};

export default PackageForm;
