// src/hooks/useSignup.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useSignup() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async (fullName, username, password, confirmPassword) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('https://travel-app-rfuf.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, username, password, confirmPassword }),
      });

      const data = await res.json();
      console.log('API response:', data);

      if (!res.ok) throw new Error(data.error || 'Signup failed');

      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { signup, error, loading };
}
