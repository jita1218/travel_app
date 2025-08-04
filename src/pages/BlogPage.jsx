import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BlogPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(
          `${API_BASE}/wishlist/get?username=${username}`
        );
        setWishlist(response.data.destinations || []);
        if ((response.data.destinations || []).length === 0) {
          setMessage("You can only review destinations you have booked.");
        }
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
        setMessage("Something went wrong.");
      }
    };

    if (username) {
      fetchWishlist();
    } else {
      setMessage("You are not logged in.");
    }
  }, [API_BASE, username]);

  const handleReviewClick = (destination) => {
    navigate("/review", { state: { destination } });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center mt-6">Write a Review</h1>
      {message && <p className="text-red-500 text-center mt-4">{message}</p>}

      <div className="flex flex-wrap justify-center mt-6">
        {wishlist.map((destination, index) => (
          <div
            key={index}
            className="max-w-xs mx-2 mb-4 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
            onClick={() => handleReviewClick(destination)}
          >
            <img
              className="w-full h-48 object-cover"
              src={destination.image}
              alt={destination.name}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{destination.name}</h2>
              <p className="text-gray-600 text-sm">{destination.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
