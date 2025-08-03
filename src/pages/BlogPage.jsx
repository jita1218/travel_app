import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch("https://travel-app-rfuf.onrender.com/api/blog/reviews");
                const data = await res.json();

                const validBlogs = data.filter(
                    (blog) => blog.destination && blog.review && blog.rating
                );
                setBlogs(validBlogs);
            } catch (err) {
                console.error("Error fetching blogs:", err);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div style={{ padding: "2rem", fontFamily: "'Poppins', sans-serif" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }}>
                <h1 style={{ marginLeft: "5rem" }}>Traveler Blogs</h1>
                <button
                    onClick={() => navigate("/blogform")}
                    style={{
                        marginRight: "5rem",
                        padding: "0.5rem 1rem",
                        backgroundColor: "#154a4a",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "1rem",
                        cursor: "pointer",
                    }}
                >
                    Blog
                </button>
            </div>

            {blogs.length === 0 ? (
                <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#666" }}>
                    No blogs found.
                </p>
            ) : (
                blogs.map((blog, i) => (
                    <div
                        key={i}
                        style={{
                            background: "#e9f6f2",
                            marginBottom: "2rem",
                            padding: "1rem",
                            borderRadius: "12px",
                            maxWidth: "800px",
                            margin: "1rem auto",
                            boxShadow: "0 0 6px rgba(0,0,0,0.1)",
                        }}
                    >
                        <h3 style={{ margin: 0 }}>{blog.destination}</h3>
                        <p style={{ margin: "1rem 0" }}>{blog.review}</p>
                        <p style={{ fontStyle: "italic" }}>Rating: {blog.rating}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default BlogPage;
