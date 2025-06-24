// src/pages/BlogPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tawang1 from '../assets/tawang1.jpg';
import tawang2 from '../assets/tawang2.jpg';
import tawang3 from '../assets/tawang3.jpg';
import shillong1 from '../assets/shillong1.jpg';
import shillong2 from '../assets/shillong2.jpg';

const blogs = [
    {
        place: 'Tawang',
        datetime: '2025-06-20 14:30',
        description:
            'Tawang was serene and breathtaking. Monasteries, snow-capped mountains, and warm local hospitality made this trip amazing.',
        images: [tawang1, tawang2, tawang3],
        author: 'Ananya Roy',
    },
    {
        place: 'Shillong',
        datetime: '2025-06-18 10:00',
        description:
            'Shillong is magical. The blend of pine forests, waterfalls, and music scene offers a unique experience for every traveler.',
        images: [shillong1, shillong2],
        author: 'Rahul Deka',
    },
];

const BlogPage = () => {
    const [modal, setModal] = useState({ open: false, images: [], index: 0 });
    const navigate = useNavigate();

    const handleImageClick = (images, index) => {
        setModal({ open: true, images, index });
    };

    const closeModal = () => {
        setModal({ open: false, images: [], index: 0 });
    };

    const handleKeyDown = (e) => {
        if (!modal.open) return;
        if (e.key === 'ArrowRight') {
            setModal((prev) => ({
                ...prev,
                index: (prev.index + 1) % prev.images.length,
            }));
        } else if (e.key === 'ArrowLeft') {
            setModal((prev) => ({
                ...prev,
                index: (prev.index - 1 + prev.images.length) % prev.images.length,
            }));
        } else if (e.key === 'Escape') {
            closeModal();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [modal]);

    return (
        <div style={{ padding: '2rem', fontFamily: "'Poppins', sans-serif" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <h1 style={{ marginLeft: '5rem' }}>Traveler Blogs</h1>
                <button
                    onClick={() => navigate('/blogform')}
                    style={{
                        marginRight: '5rem',
                        padding: '0.5rem 1rem',
                        backgroundColor: '#154a4a',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        cursor: 'pointer',
                    }}
                >
                    Blog
                </button>
            </div>

            {blogs.map((blog, i) => (
                <div
                    key={i}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        background: 'rgba(212, 237, 225, 0.9)',
                        marginBottom: '2rem',
                        padding: '1rem',
                        borderRadius: '12px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.26)',
                        maxWidth: '900px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                >
                    <div style={{ flex: '1 1 70%' }}>
                        <h3 style={{ margin: 0 }}>
                            <strong>{blog.place}</strong>{' '}
                            <span style={{ fontWeight: 400, fontSize: '0.9rem', color: '#666' }}>
                                ({blog.datetime})
                            </span>
                        </h3>
                        <p style={{ marginTop: '1rem', lineHeight: 1.5 }}>{blog.description}</p>
                        <p style={{ fontStyle: 'italic', color: '#444' }}>— {blog.author}</p>
                    </div>

                    <div
                        style={{
                            flex: '1 1 30%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            cursor: 'pointer',
                        }}
                        onClick={() => handleImageClick(blog.images, 0)}
                    >
                        <img
                            src={blog.images[0]}
                            alt="preview"
                            style={{
                                width: '180px',
                                height: '180px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                            }}
                        />
                        {blog.images.length > 1 && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    background: 'rgba(0,0,0,0.6)',
                                    color: '#fff',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '20px',
                                    fontSize: '1rem',
                                }}
                            >
                                +{blog.images.length - 1}
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {modal.open && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        height: '100vh',
                        width: '100vw',
                        background: 'rgba(0, 128, 128, 0.95)',
                        zIndex: 9999,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <button
                        onClick={closeModal}
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '30px',
                            background: 'white',
                            borderRadius: '50%',
                            border: 'none',
                            fontSize: '1.4rem',
                            width: '40px',
                            height: '40px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                        }}
                    >
                        ×
                    </button>
                    <img
                        src={modal.images[modal.index]}
                        alt="modal"
                        style={{ maxHeight: '90%', maxWidth: '90%', borderRadius: '8px' }}
                    />
                </div>
            )}
        </div>
    );
};

export default BlogPage;
