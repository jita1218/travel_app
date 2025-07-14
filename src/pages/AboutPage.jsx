// src/pages/AboutPage.jsx

import React from 'react';
import aboutImage from '../assets/aboutus.jpg';
import { FaLinkedin } from 'react-icons/fa';
import pimg from '../assets/profile.jpg';

const teamMembers = [
    {
        name: 'Member 1',
        img: pimg,
        linkedin: 'https://linkedin.com/in/member1',
    },
    {
        name: 'Member 2',
        img: pimg,
        linkedin: 'https://linkedin.com/in/member2',
    },
    {
        name: 'Member 3',
        img: pimg,
        linkedin: 'https://linkedin.com/in/member3',
    },
    {
        name: 'Member 4',
        img: pimg,
        linkedin: 'https://linkedin.com/in/member4',
    },
];

const AboutPage = () => {
    return (
        <div style={{ fontFamily: "'Poppins', sans-serif", padding: '2rem', background: '#fefefe' }}>
            <section style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
                <img
                    src={aboutImage}
                    alt="About Us"
                    style={{ maxWidth: '500px', width: '100%', borderRadius: '12px', boxShadow: '0 0 20px rgba(0,0,0,0.1)' }}
                />

                <div style={{ maxWidth: '600px' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem' }}>
                        About <span style={{ color: '#154a4a' }}>Us</span>
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: '#333', lineHeight: '1.8' }}>
                        Northeast Explorer is your gateway to unforgettable journeys across Northeast India. We connect travelers
                        with trusted hotels, scenic campsites, transport, and local guides—everything you need to explore places
                        like Tawang, Ziro, Shillong, and more.
                        <br /><br />
                        But we’re more than a trip planner—we’re a community. Share your travel stories, tips, and hidden gems
                        through our blog, and inspire others to explore the unknown.
                        <br /><br />
                        Plan smart. Travel better. Share more—with Northeast Explorer.
                    </p>
                </div>
            </section>

            {/* Team Members Section */}
            <section style={{ marginTop: '4rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Team Members</h2>
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        gap: '2rem',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {teamMembers.map((member, i) => (
                        <div
                            key={i}
                            style={{
                                width: '100px',
                                background: '#fff',
                                padding: '1rem',
                                borderRadius: '12px',
                                textAlign: 'center',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.27)',
                            }}
                        >
                            <img
                                src={member.img}
                                alt={member.name}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                    marginBottom: '0.8rem',
                                }}
                            />
                            <h4 style={{ margin: '0.5rem 0' }}>{member.name}</h4>
                            <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: '#0e76a8',
                                    fontSize: '1.5rem',
                                    display: 'inline-block',
                                    marginTop: '0.5rem',
                                }}
                            >
                                <FaLinkedin />
                            </a>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
