// src/pages/HomePage.jsx

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import heroVideo from '../assets/hero.mp4';
import locations from '../data/locations';
import packages from '../data/packages';
import travelImg from '../assets/3a.jpg';
import foodImg from '../assets/2a.jpg';
import campImg from '../assets/camp2.jpg';
import hotelImg from '../assets/4a.jpg';

const HomePage = () => {
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const scrollTarget = params.get('scroll');
        if (scrollTarget) {
            const el = document.getElementById(scrollTarget);
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    return (
        <div style={{ width: '100%', fontFamily: "'Poppins', sans-serif" }}>
            <section
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100vh',
                    overflow: 'hidden',
                }}
            >
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 0,
                    }}
                >
                    <source src={heroVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '94%',
                        height: '100%',
                        zIndex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        padding: '0 1rem',
                    }}
                >
                    <h1
                        style={{
                            fontSize: '10vh',
                            fontWeight: '700',
                            color: '#fff',
                            transition: 'all 0.3s ease',
                            WebkitTextStroke: '0px',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.color = 'transparent';
                            e.target.style.WebkitTextStroke = '1px white';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.color = '#fff';
                            e.target.style.WebkitTextStroke = '0px';
                        }}
                    >
                        Welcome to FirstTrip Travels
                    </h1>
                    <p style={{ fontSize: '1.2rem', maxWidth: '600px', color: '#fff' }}>
                        "Explore top locations of Northeast with custom travel packages and unbeatable experiences."
                    </p>
                </div>
            </section>

            {/* 🚐 Services Section */}
            <section style={{ padding: '3rem 2rem', backgroundColor: '#fff', fontFamily: 'Poppins, sans-serif' }}>
                <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: '700', marginBottom: '2.5rem' }}>
                    We have the best services available<br />for you!
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '2rem',
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxWidth: '1000px',
                    margin: '0 auto',
                }}>
                    {[
                        { title: 'Travel Services', desc: 'Pick-up/drop', img: travelImg },
                        { title: 'Food Services', desc: 'Catering', img: foodImg },
                        { title: 'Camping Services', desc: 'Camping in Nature', img: campImg },
                        { title: 'Hotel Services', desc: 'Check-in/out', img: hotelImg },
                    ].map((item, idx) => (
                        <div key={idx} style={{
                            border: '2px solid rgba(21, 74, 74, 0.54)',
                            borderRadius: '8px',
                            padding: '2rem 1rem',
                            textAlign: 'center',
                            backgroundColor: '#fff',
                            transition: 'transform 0.3s ease',
                        }}>
                            <img src={item.img} alt={item.title} style={{ width: '90px', height: '90px', marginBottom: '1rem' }} />
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.3rem' }}>{item.title}</h3>
                            <p style={{ color: '#777', fontSize: '0.95rem' }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 🗺️ Locations Section */}
            <section id="locations" style={{ padding: '3rem 2rem', backgroundColor: '#fff' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Popular Locations</h2>
                <div style={locationGridStyle}>
                    {locations.map((loc, idx) => (
                        <div
                            key={idx}
                            style={{
                                position: 'relative',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                height: '300px',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.boxShadow = '0 0 20px rgba(21, 74, 74, 0.8)')
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)')
                            }
                        >
                            <img
                                src={loc.image}
                                alt={loc.name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                }}
                            />

                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: '1rem',
                                    left: '1rem',
                                    color: '#fff',
                                    textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
                                    zIndex: 2,
                                }}
                            >
                                <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700 }}>{loc.name}</h3>
                                <p style={{ margin: 0 }}>{loc.state}</p>
                            </div>

                            <button
                                onClick={() =>
                                    (window.location.href = `/register?place=${encodeURIComponent(loc.name)}`)
                                }
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    left: '1rem',
                                    backgroundColor: '#154a4a',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '0.4rem 1rem',
                                    borderRadius: '8px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    zIndex: 2,
                                }}
                            >
                                Register
                            </button>

                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                    zIndex: 1,
                                }}
                            ></div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 🎒 Packages */}
            <section id="packages" style={{ padding: '3rem 2rem', backgroundColor: '#f9f9f9' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Packages</h2>
                <div style={cardGridStyle}>
                    {packages.map((pkg, idx) => (
                        <div
                            key={idx}
                            style={{
                                ...cardStyle,
                                padding: '1.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            }}
                        >
                            <img src={pkg.image} alt={pkg.name} style={imgStyle} />

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '1rem',
                                gap: '1rem',
                            }}>
                                <h3 style={{ margin: 0 }}>{pkg.name}</h3>
                                <button
                                    onClick={() => window.location.href = `/register?package=${encodeURIComponent(pkg.name)}`}
                                    style={{
                                        backgroundColor: '#154a4a',
                                        color: '#fff',
                                        padding: '0.4rem 1rem',
                                        borderRadius: '6px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        marginRight: '150px',
                                        opacity: '0.9',
                                    }}
                                >
                                    Register
                                </button>
                            </div>

                            <ul style={{ marginTop: '0.5rem', paddingLeft: '1rem', textAlign: 'left' }}>
                                {pkg.features.map((feature, i) => (
                                    <li key={i} style={{ color: '#555', marginBottom: '0.25rem' }}>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

const cardGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '2rem',
};

const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    textAlign: 'center',
};

const locationGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
};

const imgStyle = {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
};

export default HomePage;
