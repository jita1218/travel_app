import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const useBlogSubmit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const normalize = (str) =>
    str
      ?.normalize("NFD")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

  const submitBlog = async ({ destination, review, rating, username }) => {
    setLoading(true);
    setError(null);

    const normalizedDest = normalize(destination);
    const raw = localStorage.getItem("bookedDestinations") || "[]";
    const bookedDests = JSON.parse(raw).map((d) => normalize(d));
    const bookedSet = new Set(bookedDests); // ✅ Fix here

    console.log("Submitted:", normalizedDest);
    console.log("Booked Set:", [...bookedSet]);

    if (!bookedSet.has(normalizedDest)) {
      setError("You can only review destinations you have booked.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        destination: destination.trim(),
        review,
        rating,
        username,
      };

      const response = await fetch(`${API_BASE}/api/blog/review`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Submission failed:", data);
        throw new Error(data.error || "Failed to submit review.");
      }

      console.log("Review submitted successfully:", data);
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
