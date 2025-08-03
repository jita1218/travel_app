import React, { useState } from "react";
import useBlogSubmit from "../hooks/useBlogSubmit";

const BlogForm = () => {
    const [formData, setFormData] = useState({
        destination: "",
        review: "",
        rating: "",
    });

    const { submitBlog, loading, error } = useBlogSubmit();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await submitBlog(formData);

        // Reset form on successful submit
        setFormData({
            destination: "",
            review: "",
            rating: "",
        });
    };

    return (
        <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
            <h2 style={{ textAlign: "center" }}>Share Your Travel Review</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <input
                    type="text"
                    name="destination"
                    placeholder="Destination"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                    style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid #ccc" }}
                />
                <textarea
                    name="review"
                    placeholder="Write your review"
                    value={formData.review}
                    onChange={handleChange}
                    rows={5}
                    required
                    style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid #ccc" }}
                />
                <input
                    type="number"
                    name="rating"
                    placeholder="Rating (1-5)"
                    value={formData.rating}
                    onChange={handleChange}
                    required
                    min="1"
                    max="5"
                    style={{ padding: "0.8rem", borderRadius: "8px", border: "1px solid #ccc" }}
                />

                {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        background: "#154a4a",
                        color: "#fff",
                        padding: "0.8rem",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "1rem",
                        cursor: "pointer",
                    }}
                >
                    {loading ? "Submitting..." : "Submit Review"}
                </button>
            </form>
        </div>
    );
};

export default BlogForm;
