import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsOfServicePage = () => {
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
                    Terms of Service
                </h1>
                <p style={{ fontSize: '1.1rem', color: '#333', lineHeight: '1.8', maxWidth: '900px' }}>
                    Welcome to FirstTrip! By using our website and services, you agree to comply with and be bound
                    by the following terms and conditions.
                    <br /><br />
                    You agree to use our platform responsibly, only for lawful purposes, and in a way that does not infringe
                    on the rights of others. All bookings are subject to availability, and prices may change without prior notice.
                    <br /><br />
                    We reserve the right to modify or update these Terms of Service at any time. Continued use of our
                    platform after changes means you accept the updated terms.
                </p>
            </div>
        </>
    );
};

export default TermsOfServicePage;
