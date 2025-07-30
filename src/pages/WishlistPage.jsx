import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const WishlistPage = () => {
  const [items, setItems] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (!username) return;

    axios.get(`${API_BASE}/wishlist/get`, {
      params: { username }
    })
      .then((res) => setItems(res.data))
      .catch((err) => console.error('Failed to fetch wishlist:', err));
  }, [username]);

  const handleRemove = async (destination) => {
    try {
      await axios.delete(`${API_BASE}/wishlist/remove`, {
        data: { username, destination }
      });

      // Update the UI
      setItems((prevItems) =>
        prevItems.filter((item) => item.destination !== destination)
      );
    } catch (err) {
      console.error('Failed to remove from wishlist:', err);
      alert('Failed to remove item. Please try again.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>My Wishlist</h2>
      {items.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map((item, i) => (
            <li key={i} style={{ marginBottom: '2rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
              <h3>{item.destination}</h3>
              {item.image && <img src={item.image} alt={item.destination} width="200" />}
              <p>{item.description}</p>
              <button
                onClick={() => handleRemove(item.destination)}
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginTop: '0.5rem'
                }}
              >
                Remove from Wishlist
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishlistPage;
