import { useState, useEffect } from "react";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const useBlogSubmit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookedDests, setBookedDests] = useState([]);

  const normalize = (str) =>
    str?.normalize("NFD").replace(/\s+/g, " ").trim().toLowerCase();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) return;

    fetch(`${API_BASE}/api/booking/my?username=${username}`)
      .then((res) => res.json())
      .then((data) => {
        const destinations = data.map((b) => normalize(b.destination));
        setBookedDests(destinations);
      })
      .catch((err) => {
        console.error("Failed to fetch bookings for validation", err);
      });
  }, []);

  const submitBlog = async ({ destination, review, rating, username }) => {
    setLoading(true);
    setError(null);

    const normalizedDest = normalize(destination);
    console.log("Submitted:", normalizedDest);
    console.log("Booked Set:", bookedDests);

    if (!bookedDests.includes(normalizedDest)) {
      setError("You can only review destinations you have booked.");
      setLoading(false);
      return;
    }

    try {
      const payload = { destination, review, rating, username };

      const response = await fetch(`${API_BASE}/api/blog/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Submission failed.");

      console.log("Review submitted:", data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { submitBlog, loading, error };
};

export default useBlogSubmit;
