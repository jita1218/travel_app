import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const useBlogSubmit = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const submitBlog = async ({ destination, review, rating }) => {
        setLoading(true);
        setError(null);

        try {
            const payload = { destination, review, rating };
            console.log("Submitting:", payload);

            const response = await fetch(`${API_BASE}/api/blog/review`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
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
