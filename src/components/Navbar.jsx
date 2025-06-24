// src/components/Navbar.jsx

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) setMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <nav style={navStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                <Link to="/">
                    <img src={logo} alt="logo" style={logoStyle} />
                </Link>
                <span style={{ color: 'white', fontSize: '1.4rem', fontWeight: 'bold', fontFamily: 'Poppins, sans-serif' }}>
                    FirstTrip
                </span>
            </div>

            {isMobile && (
                <div style={hamburgerStyle} onClick={toggleMenu}>
                    <div style={bar}></div>
                    <div style={bar}></div>
                    <div style={bar}></div>
                </div>
            )}

            <ul
                style={{
                    ...navListStyle,
                    ...(isMobile ? (menuOpen ? mobileMenuOpen : { display: 'none' }) : {}),
                }}
            >
                <li><StyledLink to="/" onClick={closeMenu}>Home</StyledLink></li>
                <li><StyledLink to="/?scroll=locations" onClick={closeMenu}>Locations</StyledLink></li>
                <li><StyledLink to="/?scroll=packages" onClick={closeMenu}>Packages</StyledLink></li>
                <li><StyledLink to="/blog" onClick={closeMenu}>Blog</StyledLink></li>
                <li><StyledLink to="/about" onClick={closeMenu}>About Us</StyledLink></li>
            </ul>
        </nav>
    );
}

function StyledLink({ to, children, onClick }) {
    return (
        <Link
            to={to}
            onClick={onClick}
            style={linkStyle}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
            {children}
        </Link>
    );
}

function onHover(e) {
    e.target.style.backgroundColor = '#1e6a6a';
    e.target.style.padding = '0.4rem 1rem';
    e.target.style.borderRadius = '6px';
}
function onLeave(e) {
    e.target.style.backgroundColor = 'transparent';
    e.target.style.padding = '0';
    e.target.style.borderRadius = '0';
}

const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 2rem',
    backgroundColor: '#154a4a',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
};

const logoStyle = {
    width: '60px',
    borderRadius: '10px',
};

const navListStyle = {
    listStyle: 'none',
    display: 'flex',
    gap: '2rem',
    margin: 0,
    padding: 0,
};

const mobileMenuOpen = {
    position: 'absolute',
    top: '72px',
    right: '15px',
    backgroundColor: '#154a4a',
    padding: '0.5rem',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    zIndex: 999,
    width: '100px',
    alignItems: 'center',
    paddingBottom: '20px',
};

const linkStyle = {
    textDecoration: 'none',
    color: '#fff',
    fontWeight: '500',
    transition: '0.3s ease',
};

const hamburgerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '24px',
    height: '18px',
    cursor: 'pointer',
    border: '1px solid #fff',
    padding: '6px',
    borderRadius: '6px',
    position: 'absolute',
    top: '25px',
    right: '55px',
};

const bar = {
    height: '3px',
    width: '100%',
    backgroundColor: '#fff',
};

export default Navbar;
