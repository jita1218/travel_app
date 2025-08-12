// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
    const footerStyle = {
        backgroundColor: '#154a4a',
        color: '#fff',
        padding: '2rem 2rem',
        fontFamily: "'Poppins', sans-serif",
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        maxWidth: '1200px',
        margin: '0 auto',
        gap:'10rem',
    };

    const columnStyle = {
        flex: '1 1 200px',
        marginBottom: '1rem',
    };

    const headingStyle = {
        fontSize: '22px',
        fontWeight: '700',
        marginBottom: '1rem',
        display: 'inline-block',
        paddingBottom: '5px',
    };

    const linkStyle = {
        display: 'block',
        color: '#fff',
        textDecoration: 'none',
        marginBottom: '0.8rem',
        fontSize: '1rem',
    };

    const socialStyle = {
        display: 'flex',
        gap: '1.5rem',
        marginTop: '1rem',
    };

    const iconWrapper = {
        fontSize: '24px',
        backgroundColor: '#fff',
        color: '#154a4a',
        borderRadius: '50%',
        height: '40px',
        width: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'transform 0.3s ease',
    };

    const endStyle = {
        textAlign: 'center',
        paddingTop: '1rem',
        fontSize: '15px',
        color: '#eee',
    };

    return (
        <footer style={footerStyle}>
            <div style={containerStyle}>
                {/* About Column */}
                <div style={columnStyle}>
                    <h4 style={headingStyle}>FirstTrip</h4>
                    <p style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>
                        FirstTrip is your trusted travel companion, helping you explore destinations with ease.
                        We aim to make your trips memorable and hassle-free.
                    </p>
                </div>

                {/* Quick Links */}
                <div style={columnStyle}>
                    <h4 style={headingStyle}>Quick Links</h4>
                    <a href="/about" style={linkStyle}>About Us</a>
                    <a href="/privacy-policy" style={linkStyle}>Privacy Policy</a>
                    <a href="/terms-of-service" style={linkStyle}>Terms of Service</a>
                </div>

                {/* Connect */}
                <div style={columnStyle}>
                    <h4 style={headingStyle}>Connect</h4>
                    <div style={socialStyle}>
                        <a href="https://dummy.facebook.com" target="_blank" rel="noreferrer" style={iconWrapper}>
                            <i className='bx bxl-facebook'></i>
                        </a>
                        <a href="https://dummy.instagram.com" target="_blank" rel="noreferrer" style={iconWrapper}>
                            <i className='bx bxl-instagram'></i>
                        </a>
                        <a href="https://dummy.twitter.com" target="_blank" rel="noreferrer" style={iconWrapper}>
                            <i className='bx bxl-twitter'></i>
                        </a>
                        <a href="https://dummy.linkedin.com" target="_blank" rel="noreferrer" style={iconWrapper}>
                            <i className='bx bxl-linkedin'></i>
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div style={endStyle}>
                <p>Copyright © 2025 Firsttrip Travels All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
