import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const useBlogSubmit = (bookings = []) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const normalize = (str) => str.trim().toLowerCase();

  const submitBlog = async ({ destination, review, rating, username }) => {
    setLoading(true);
    setError(null);

    const normalizedDest = normalize(destination);
    const bookedDests = bookings.map((b) => normalize(b.destination));

    console.log("Submitted:", normalizedDest);
    console.log("Booked   :", bookedDests);

    // Check if destination is in booked destinations
    if (!bookedDests.includes(normalizedDest)) {
      setError("You can only review destinations you have booked.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        destination: destination.trim(), // Send original casing to backend
        review,
        rating,
        username,
      };

      const response = await fetch(`${API_BASE}/api/blog/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Submission failed:", data);
        throw new Error(data.error || "Failed to submit");
      }

      console.log("Review submitted:", data);
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { submitBlog, loading, error };
};

export default useBlogSubmit;
