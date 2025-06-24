// src/pages/RegisterPage.jsx

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RegisterPage = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const preselectedPlace = query.get('place');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        age: '',
        gender: '',
        departure: '',
        returnDate: '',
        destination: '',
        termsAccepted: false,
        travelType: 'Single',
        groupSize: '',
    });

    useEffect(() => {
        if (preselectedPlace) {
            setFormData((prev) => ({
                ...prev,
                destination: preselectedPlace,
            }));
        }
    }, [preselectedPlace]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.phone.length < 10 || isNaN(formData.phone)) {
            alert('Phone number must be at least 10 digits and numeric.');
            return;
        }

        if (formData.travelType === 'Group' && (!formData.groupSize || parseInt(formData.groupSize) < 2)) {
            alert('Please enter valid number of people for group travel (at least 2).');
            return;
        }

        if (!formData.destination) {
            alert('Please select a travel destination.');
            return;
        }

        console.log('Form submitted:', formData);
        alert('Registration successful!');
    };

    return (
        <div style={{ fontFamily: 'Poppins, sans-serif', padding: '2rem', backgroundColor: '#f2f2f2' }}>
            <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', maxWidth: '700px', margin: 'auto' }}>
                <h2 style={{ textAlign: 'center' }}>Register <span style={{ color: '#154a4a' }}>Here</span></h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email-Id" value={formData.email} onChange={handleChange} required />
                    <input type="tel" name="phone" placeholder="Phone No." value={formData.phone} onChange={handleChange} required />
                    <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />

                    <div>
                        <h4>Gender</h4>
                        <label style={{ marginRight: '1rem' }}><input type="radio" name="gender" value="Male" onChange={handleChange} required /> Male</label>
                        <label><input type="radio" name="gender" value="Female" onChange={handleChange} /> Female</label>
                    </div>

                    <div>
                        <h4>Departure</h4>
                        <input type="datetime-local" name="departure" value={formData.departure} onChange={handleChange} required />
                    </div>

                    <div>
                        <h4>Return</h4>
                        <input type="datetime-local" name="returnDate" value={formData.returnDate} onChange={handleChange} required />
                    </div>

                    <div>
                        <h4>Travel Destination</h4>
                        {['Kaziranga National Park', 'Tawang', 'Shillong', 'Gangtok', 'Kohima', 'Aizawl', 'Agartala', 'Majuli'].map((dest, i) => (
                            <label key={i} style={{ marginRight: '1rem' }}>
                                <input
                                    type="radio"
                                    name="destination"
                                    value={dest}
                                    checked={formData.destination === dest}
                                    onChange={handleChange}
                                /> {dest}
                            </label>
                        ))}
                    </div>

                    <div>
                        <h4>Number of People</h4>
                        <label style={{ marginRight: '1rem' }}>
                            <input
                                type="radio"
                                name="travelType"
                                value="Single"
                                checked={formData.travelType === 'Single'}
                                onChange={handleChange}
                                required
                            /> Single
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="travelType"
                                value="Group"
                                checked={formData.travelType === 'Group'}
                                onChange={handleChange}
                            /> Group
                        </label>
                    </div>

                    {formData.travelType === 'Group' && (
                        <input
                            type="number"
                            name="groupSize"
                            placeholder="How many people?"
                            min="2"
                            value={formData.groupSize}
                            onChange={handleChange}
                            required
                        />
                    )}

                    <label>
                        <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} required />
                        I accept the Terms & Conditions.
                    </label>

                    <button type="submit" style={{ padding: '0.75rem', backgroundColor: '#154a4a', color: '#fff', border: 'none', borderRadius: '4px' }}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
