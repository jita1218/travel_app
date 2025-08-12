import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicyPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <div style={{ fontFamily: "'Poppins', sans-serif", padding: '2rem', background: '#fefefe' }}>
                <button
                    onClick={() => navigate("/")}
                    style={{
                        backgroundColor: '#154a4a',
                        color: '#fff',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginBottom: '1.5rem'
                    }}
                >
                    ← Back
                </button>

                <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem', color: '#154a4a' }}>
                    Privacy Policy
                </h1>
                <p style={{ fontSize: '1.1rem', color: '#333', lineHeight: '1.8', maxWidth: '900px' }}>
                    At FirstFlight, we take your privacy seriously. This Privacy Policy explains how we collect, use,
                    and protect your personal information when you use our website and services.
                    <br /><br />
                    We may collect information you provide directly to us, such as when you create an account,
                    make a booking, or contact our support team. We also collect certain information automatically,
                    like your IP address, browser type, and usage data.
                    <br /><br />
                    Your data will never be sold to third parties, and we implement strict measures to safeguard it.
                    Please review this policy regularly, as we may update it from time to time to reflect changes in
                    our practices or for legal reasons.
                </p>
            </div>
        </>
    );
};

export default PrivacyPolicyPage;
