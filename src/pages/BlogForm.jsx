// src/pages/BlogForm.jsx

import React, { useState } from 'react';

const BlogForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        place: '',
        description: '',
        images: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            images: Array.from(e.target.files),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted Blog:', formData);
        alert('Blog submitted successfully!');
        // Reset
        setFormData({
            name: '',
            email: '',
            place: '',
            description: '',
            images: [],
        });
    };

    return (
        <div style={{ padding: '2rem', fontFamily: "'Poppins', sans-serif", maxWidth: '600px', margin: 'auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Share Your Blog</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email ID"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }}
                />
                <input
                    type="text"
                    name="place"
                    placeholder="Place Name"
                    value={formData.place}
                    onChange={handleChange}
                    required
                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }}
                />
                <textarea
                    name="description"
                    placeholder="Your Travel Story"
                    rows="5"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }}
                />
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{ padding: '0.5rem' }}
                />
                <button
                    type="submit"
                    style={{
                        background: '#154a4a',
                        color: '#fff',
                        padding: '0.8rem',
                        border: 'none',
                        borderRadius: '8px',
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

export default BlogForm;
