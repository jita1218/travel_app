import React, { useState } from "react";
import axios from "axios";

const Location = () => {
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const [pois, setPois] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [activeTab, setActiveTab] = useState("pois");
  const [error, setError] = useState("");
const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const handleSearch = async () => {
    if (!region.trim()) {
      setError("Please enter a region");
      return;
    }
    setError("");
    setLoading(true);
    setPois([]);
    setHotels([]);

    try {
      const poiRes = await axios.get(`${API_BASE}/api/destination/popular?region=${region}`);
      setPois(poiRes.data.pois || []);

      const hotelRes = await axios.get(`${API_BASE}/api/destination/hotels?region=${region}`);
      setHotels(hotelRes.data.hotels || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Search Destinations</h1>

      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Enter region name..."
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>
          Search
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {/* Tabs */}
      <div style={styles.tabs}>
        <button
          style={activeTab === "pois" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("pois")}
        >
          Popular Destinations
        </button>
        <button
          style={activeTab === "hotels" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("hotels")}
        >
          Hotels
        </button>
      </div>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Cards */}
      <div style={styles.cardContainer}>
        {activeTab === "pois" &&
          pois.map((item, index) => (
            <div key={index} style={styles.card}>
              <img
                src={item.image || "https://via.placeholder.com/300x200?text=No+Image"}
                alt={item.name}
                style={styles.image}
              />
              <h3>{item.name}</h3>
              <p>{item.description || "No description available"}</p>
            </div>
          ))}

        {activeTab === "hotels" &&
          hotels.map((item, index) => (
            <div key={index} style={styles.card}>
              <img
                src={item.image || "https://via.placeholder.com/300x200?text=No+Image"}
                alt={item.name}
                style={styles.image}
              />
              <h3>{item.name}</h3>
              <p>{item.description || "No description available"}</p>
              <p><strong>Address:</strong> {item.address || "Not available"}</p>
              <p><strong>Rating:</strong> {item.rating}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: { padding: "20px", fontFamily: "Arial, sans-serif" },
  title: { textAlign: "center", marginBottom: "20px" },
  searchBox: { display: "flex", justifyContent: "center", marginBottom: "20px" },
  input: { padding: "10px", width: "60%", fontSize: "16px", border: "1px solid #ccc", borderRadius: "4px" },
  button: { padding: "10px 15px", marginLeft: "10px", fontSize: "16px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
  error: { color: "red", textAlign: "center" },
  tabs: { display: "flex", justifyContent: "center", marginBottom: "20px" },
  tab: { padding: "10px 20px", border: "1px solid #ccc", backgroundColor: "#f0f0f0", cursor: "pointer" },
  activeTab: { padding: "10px 20px", border: "1px solid #ccc", backgroundColor: "#007bff", color: "#fff" },
  cardContainer: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" },
  card: { border: "1px solid #ddd", padding: "10px", borderRadius: "8px", backgroundColor: "#fff" },
  image: { width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" },
};

export default Location;
