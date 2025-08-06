// src/pages/AboutPage.jsx

import React from 'react';
import aboutImage from '../assets/aboutus.jpg';
import { FaLinkedin } from 'react-icons/fa';
import tomojitImg from '../assets/tomojit.jpg';
import birajImg from '../assets/biraj.jpg';
import jituImg from '../assets/jitu.jpg';
import tarunImg from '../assets/tarun.jpg';


const teamMembers = [
    {
        name: 'Tomojit',
        img: tomojitImg,
        linkedin: 'https://www.linkedin.com/in/tomojit-purkayastha-4b7a8636b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    },
    {
        name: 'Biraj',
        img: birajImg,
        linkedin: 'https://www.linkedin.com/in/biraj-roy-04803b258/',
    },
    {
        name: 'Jitu',
        img: jituImg,
        linkedin: 'https://www.linkedin.com/in/jitu-verma',
    },
    {
        name: 'Tarun',
        img: tarunImg,
        linkedin: 'https://www.linkedin.com/in/tarunchandak2k04?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
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
                                width: '110px',
                                background: '#fff',
                                padding: '1rem',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '12px',
                                textAlign: 'center',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.27)',
                            }}
                        >
                            <img
                                src={member.img}
                                alt={member.name}
                                style={{
                                    width: '110px',
                                    height: '110px',
                                    objectFit: 'cover',
                                    borderRadius: '55px',
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
