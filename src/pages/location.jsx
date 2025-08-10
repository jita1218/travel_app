import React, { useState } from "react";
import axios from "axios";
import locations from "../data/locations"; // predefined list

const Location = () => {
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const [pois, setPois] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [activeTab, setActiveTab] = useState("pois");
  const [error, setError] = useState("");

  // ✅ Environment-based backend URL
  const API_BASE = import.meta.env.VITE_API_BASE_URL; // e.g. https://flaskapi.onrender.com

  const handleSearch = async () => {
    if (!region.trim()) {
      setError("Please select or enter a region");
      return;
    }
    setError("");
    setLoading(true);
    setPois([]);
    setHotels([]);

    try {
      // Fetch POIs
      const poiRes = await axios.get(`${API_BASE}/api/destination/popular?region=${region}`);
      setPois(poiRes.data.pois || []);

      // Fetch Hotels
      const hotelRes = await axios.get(`${API_BASE}/api/destination/hotels?region=${region}`);
      setHotels(hotelRes.data.hotels || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getImage = (item) => {
    return (
      item.image ||
      item.photo ||
      item.image_url ||
      item.imgUrl ||
      "https://via.placeholder.com/300x200?text=No+Image"
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Search Destinations</h1>

      {/* Dropdown + Input + Button */}
      <div style={styles.searchBox}>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          style={styles.select}
        >
          <option value="">Select a location</option>
          {locations.map((loc, index) => (
            <option key={index} value={loc.region}>
              {loc.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Or enter region name..."
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

      {loading && <p>Loading...</p>}

      {/* Cards */}
      <div style={styles.cardContainer}>
        {activeTab === "pois" &&
          pois.map((item, index) => (
            <div key={index} style={styles.card}>
              <img src={getImage(item)} alt={item.name} style={styles.image} />
              <h3>{item.name}</h3>
              <p>{item.description || "No description available"}</p>
            </div>
          ))}

        {activeTab === "hotels" &&
          hotels.map((item, index) => (
            <div key={index} style={styles.card}>
              <img src={getImage(item)} alt={item.name} style={styles.image} />
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
  searchBox: { display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" },
  select: { padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "4px" },
  input: { padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "4px", width: "200px" },
  button: { padding: "10px 15px", fontSize: "16px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
  error: { color: "red", textAlign: "center" },
  tabs: { display: "flex", justifyContent: "center", marginBottom: "20px" },
  tab: { padding: "10px 20px", border: "1px solid #ccc", backgroundColor: "#f0f0f0", cursor: "pointer" },
  activeTab: { padding: "10px 20px", border: "1px solid #ccc", backgroundColor: "#007bff", color: "#fff" },
  cardContainer: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" },
  card: { border: "1px solid #ddd", padding: "10px", borderRadius: "8px", backgroundColor: "#fff" },
  image: { width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" },
};

export default Location;
